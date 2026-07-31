#!/usr/bin/env python3
"""Synchronize a portfolio page.mdx body into its standalone Markdown mirror."""

from __future__ import annotations

import argparse
import html
import os
import re
import sys
from pathlib import Path


DEFAULT_EXPORT = re.compile(r"^export default\b.*$", re.MULTILINE)
ARTICLE_STRING = r"^\s*{field}:\s*(['\"])(.*?)\1,?\s*$"
READING_TIME = re.compile(r"^\s*estimatedReadingTime:\s*(\d+),?\s*$", re.MULTILINE)
IMPORT_IMAGE = re.compile(
    r"^import\s+([A-Za-z_$][\w$]*)\s+from\s+['\"]([^'\"]+\.(?:png|jpe?g|webp|gif|svg))['\"]\s*$",
    re.IGNORECASE | re.MULTILINE,
)
MARKDOWN_IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
IMAGE_ELEMENT = re.compile(r"<Image\b(?P<attrs>.*?)\s*/>", re.DOTALL)
CENTERED_IMAGE = re.compile(
    r"<p\s+[^>]*align=['\"]center['\"][^>]*>\s*(?P<image><Image\b.*?\s*/>)\s*</p>",
    re.DOTALL | re.IGNORECASE,
)
FENCE = re.compile(r"^\s*(```+|~~~+)")


class SyncError(RuntimeError):
    pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mdx", type=Path, required=True, help="Source page.mdx")
    parser.add_argument(
        "--markdown", type=Path, required=True, help="Standalone Markdown mirror"
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true", help="Update the Markdown mirror")
    mode.add_argument(
        "--check", action="store_true", help="Exit non-zero when the mirror is stale"
    )
    return parser.parse_args()


def extract_article_string(source: str, field: str) -> str:
    match = re.search(ARTICLE_STRING.format(field=re.escape(field)), source, re.MULTILINE)
    if not match:
        raise SyncError(f"Could not read article.{field} from MDX")
    quote, value = match.groups()
    return value.replace(f"\\{quote}", quote).replace("\\\\", "\\")


def extract_mdx_body(source: str) -> str:
    match = DEFAULT_EXPORT.search(source)
    if not match:
        raise SyncError("Could not find the default ArticleLayout export")
    body = source[match.end() :].lstrip("\r\n")
    if not body.strip():
        raise SyncError("MDX article body is empty")
    return body.rstrip() + "\n"


def find_repo_root(start: Path) -> Path | None:
    for candidate in (start, *start.parents):
        if (candidate / "package.json").is_file() and (candidate / "src").is_dir():
            return candidate
    return None


def import_destination(import_path: str, mdx: Path, markdown: Path) -> str:
    if import_path.startswith("@/"):
        root = find_repo_root(mdx.parent)
        if root is None:
            raise SyncError(f"Could not resolve aliased image import: {import_path}")
        asset = root / "src" / import_path[2:]
    elif import_path.startswith("."):
        asset = (mdx.parent / import_path).resolve()
    else:
        raise SyncError(f"Unsupported image import path: {import_path}")

    destination = Path(os.path.relpath(asset, markdown.parent.resolve())).as_posix()
    return destination if destination.startswith(".") else f"./{destination}"


def existing_image_destinations(source: str) -> dict[str, list[str]]:
    result: dict[str, list[str]] = {}
    for alt, destination in MARKDOWN_IMAGE.findall(source):
        result.setdefault(alt, []).append(destination)
    return result


def attribute(attrs: str, name: str) -> str | None:
    quoted = re.search(rf"\b{name}\s*=\s*(['\"])(.*?)\1", attrs, re.DOTALL)
    if quoted:
        return html.unescape(quoted.group(2))
    expression = re.search(rf"\b{name}\s*=\s*\{{\s*([^}}]+?)\s*\}}", attrs, re.DOTALL)
    return expression.group(1).strip() if expression else None


def convert_images(
    body: str,
    imports: dict[str, str],
    mdx: Path,
    markdown: Path,
    existing: dict[str, list[str]],
) -> str:
    used_destinations: dict[str, int] = {}

    def convert_element(element: str) -> str:
        match = IMAGE_ELEMENT.fullmatch(element.strip())
        if not match:
            raise SyncError(f"Unsupported Image JSX: {element.strip()[:80]}")
        attrs = match.group("attrs")
        alt = attribute(attrs, "alt")
        src = attribute(attrs, "src")
        if alt is None or src is None:
            raise SyncError("Every converted Image must have static src and alt attributes")

        known = existing.get(alt, [])
        index = used_destinations.get(alt, 0)
        if index < len(known):
            destination = known[index]
            used_destinations[alt] = index + 1
        else:
            variable = src.removesuffix(".src").strip()
            import_path = imports.get(variable)
            if import_path is None:
                if src.startswith(("./", "../")):
                    import_path = src
                else:
                    raise SyncError(f"Could not resolve Image src expression: {src}")
            destination = import_destination(import_path, mdx, markdown)

        return f"![{alt}]({destination})"

    def process_chunk(chunk: str) -> str:
        chunk = CENTERED_IMAGE.sub(lambda match: convert_element(match.group("image")), chunk)
        return IMAGE_ELEMENT.sub(lambda match: convert_element(match.group(0)), chunk)

    output: list[str] = []
    chunk: list[str] = []
    active_fence: str | None = None

    for line in body.splitlines(keepends=True):
        fence_match = FENCE.match(line)
        if fence_match:
            if active_fence is None:
                output.append(process_chunk("".join(chunk)))
                chunk.clear()
                active_fence = fence_match.group(1)[0]
            elif fence_match.group(1)[0] == active_fence:
                active_fence = None
            output.append(line)
        elif active_fence is None:
            chunk.append(line)
        else:
            output.append(line)

    output.append(process_chunk("".join(chunk)))
    return "".join(output)


def render_markdown(mdx: Path, markdown: Path, current: str) -> str:
    source = mdx.read_text(encoding="utf-8")
    title = extract_article_string(source, "title")
    reading_match = READING_TIME.search(source)
    imports = dict(IMPORT_IMAGE.findall(source))
    body = extract_mdx_body(source)
    body = convert_images(
        body,
        imports,
        mdx.resolve(),
        markdown.resolve(),
        existing_image_destinations(current),
    )

    first_line = current.splitlines()[0] if current.splitlines() else ""
    heading = first_line if first_line.startswith("# ") else f"# {title}"
    preamble = f"{heading}\n\n"
    if reading_match:
        preamble += (
            f"> Estimated reading time: {reading_match.group(1)} minutes\n\n"
        )
    return preamble + body.lstrip("\r\n")


def main() -> int:
    args = parse_args()
    try:
        if not args.mdx.is_file():
            raise SyncError(f"MDX file does not exist: {args.mdx}")
        if not args.markdown.is_file():
            raise SyncError(f"Markdown mirror does not exist: {args.markdown}")

        current = args.markdown.read_text(encoding="utf-8")
        expected = render_markdown(args.mdx, args.markdown, current)

        if current == expected:
            print(f"Up to date: {args.markdown}")
            return 0
        if args.check:
            print(f"Stale Markdown mirror: {args.markdown}", file=sys.stderr)
            return 1

        args.markdown.write_text(expected, encoding="utf-8")
        print(f"Updated: {args.markdown}")
        return 0
    except SyncError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
