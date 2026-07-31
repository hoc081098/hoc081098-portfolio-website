---
name: sync-portfolio-article-mdx
description: Convert preserved Markdown articles and images into hoc081098 portfolio page.mdx routes with validated article metadata, tags, language, responsive images, and either a selected local Open Graph image or the repository's generated default. Also synchronize an authoritative MDX body back into its standalone Markdown source. Use for publishing, migrating, updating, reviewing, or reverse-syncing portfolio articles in this Next.js MDX repository.
---

# Publish and Sync Portfolio Articles

## Establish the live contract

1. Read the nearest `AGENTS.md` completely before editing. Treat its current metadata and validation rules as authoritative over examples in this skill.
2. Inspect `git status`, the source `.md`, accompanying assets, the target article directory, `src/lib/articles.ts`, the Open Graph route, and two representative `page.mdx` files.
3. Determine the requested direction:
   - **Publish:** standalone Markdown and assets to `src/app/articles/<slug>/page.mdx`.
   - **Reverse sync:** current `page.mdx` body back to the preserved standalone Markdown.
   - **Both:** publish first, validate the route, then reverse-sync only after later MDX content edits.
4. Preserve unrelated worktree changes. Never move, delete, or rewrite original `.md` and image artifacts during initial publishing unless the user explicitly requests it.
5. Treat `page.mdx` as authoritative for the article body only when the user explicitly requests reverse synchronization.

## Publish Markdown as MDX

### Build article metadata

- Derive the route slug from the user-provided directory or filename and keep it kebab-case.
- Use the Markdown H1 as the title. Remove the H1 and standalone reading-time line from the MDX body because `ArticleLayout` renders article chrome.
- Write a short, faithful description from the article's actual scope. Do not add claims absent from the article.
- Keep tags compact and reusable according to the current `AGENTS.md`: language, platform/framework/library, then core technical topics. Keep tags independent from article series.
- Set `language: 'vi'` for Vietnamese articles. Omit `language` for English unless the live schema says otherwise.
- Preserve a known publication date as date-only `createdAt`. If no reliable date exists, ask the user rather than inventing one.
- Set `lastUpdatedAt` to the current UTC instant, normalized to `YYYY-MM-DDTHH:mm:ssZ`, whenever article content is edited.
- Preserve a supplied reading time. Otherwise estimate it from prose and code, round to a positive integer, and expose it as `estimatedReadingTime`.
- Include `keywords: article.tags`, `publishedTime: article.createdAt`, and `modifiedTime: article.lastUpdatedAt` in metadata.

Use the current repository shape, normally:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'hoc081098',
  createdAt: 'YYYY-MM-DD',
  lastUpdatedAt: 'YYYY-MM-DDTHH:mm:ssZ',
  title: 'Article title',
  description: 'Faithful summary.',
  estimatedReadingTime: 8,
  language: 'vi',
  tags: ['kotlin', 'functional-programming', 'error-handling'],
}

export const metadata = {
  title: article.title,
  description: article.description,
  keywords: article.tags,
  openGraph: {
    type: 'article',
    publishedTime: article.createdAt,
    modifiedTime: article.lastUpdatedAt,
    images: [],
  },
}

export default (props) => <ArticleLayout article={article} {...props} />
```

### Choose the Open Graph preview

Follow this precedence:

1. If the user names an existing image, use that image.
2. If the user asks to choose among several existing images and the choice is visually meaningful, list the plausible candidates and get their selection.
3. If no image is selected or no suitable image exists, use the repository's generated article preview. Do not choose an arbitrary in-body screenshot merely because one exists.

For a selected statically imported image, reuse the same import when it also appears in the body:

```mdx
images: [
   {
      url: articleImage.src,
      width: articleImage.width,
      height: articleImage.height,
      alt: 'Specific, useful description of the preview image',
   },
]
```

For the generated default:

```mdx
images: [
   {
      url: `/api/og?type=article&title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description)}`,
      width: 1200,
      height: 630,
   },
]
```

Verify these patterns against the live Open Graph route before using them.

### Convert article images

1. Inventory candidate images and inspect their intrinsic dimensions.
2. Import local images statically. Keep route-local source artifacts route-local; use the repository's established image directory for other assets.
3. Convert Markdown image syntax to the repository's MDX `<Image>` component with accurate alt text.
4. Keep large diagrams and screenshots responsive without letting them dominate the article:

```mdx
<Image
  src={articleImage}
  alt="Useful description"
  sizes="(min-width: 768px) 42rem, calc(100vw - 3rem)"
  className="mx-auto h-auto w-full max-w-2xl"
/>
```

5. Avoid upscaling a small source image. Prefer `className="mx-auto h-auto max-w-full"` without `w-full`, or choose a smaller `max-w-*` matching its role.
6. Preserve prose, code, heading order, links, and emphasis during format conversion. Do not mix unsolicited editorial rewrites into publishing work.

## Reverse-sync MDX to Markdown

1. Confirm that the standalone Markdown is the intended mirror and that the user requested an update to it.
2. Preserve the Markdown-native preamble: H1, optional estimated-reading-time blockquote, and relative asset convention.
3. Copy only the MDX article body after the default `ArticleLayout` export. Remove imports, JavaScript metadata, and JSX-only wrappers.
4. Convert `<Image>` elements back to `![alt](relative-path)` while preserving existing Markdown image destinations when their alt text matches.
5. Do not alter the MDX file or image artifacts merely to perform a reverse sync.
6. If the current task edited the MDX body, ensure `lastUpdatedAt` was updated. If the task only mirrors already-existing MDX content into Markdown, do not bump it again.

Use the bundled deterministic helper for the normal repository pattern:

```bash
python3 <skill-directory>/scripts/sync_mdx_to_markdown.py \
  --mdx src/app/articles/<slug>/page.mdx \
  --markdown src/app/articles/<slug>/<source>.md \
  --write

python3 <skill-directory>/scripts/sync_mdx_to_markdown.py \
  --mdx src/app/articles/<slug>/page.mdx \
  --markdown src/app/articles/<slug>/<source>.md \
  --check
```

The helper preserves the Markdown H1 markup, updates its reading time from `article`, preserves known image destinations, converts statically imported MDX images, and compares the canonical result. If it rejects custom JSX or an unresolved image expression, stop and normalize that case explicitly instead of silently dropping content.

## Validate proportionally

For every change:

- Run Prettier on changed Markdown/MDX files and `git diff --check`.
- Re-read the actual diff and confirm only intended files changed.
- Check fenced-code markers are balanced.
- For an article pair, run the reverse-sync helper with `--check` after writing.

For a new or edited MDX route:

- Run `NEXT_PUBLIC_SITE_URL=https://portfolio.hoc081098.dev pnpm build` unless the user limits verification.
- Inspect the rendered route when requested or when responsive image behavior changed. Check at least one narrow and one desktop viewport.
- Verify title, description, language, tags, timestamps, Open Graph image, image alt text, and responsive sizing.

For a Markdown-only reverse sync where `page.mdx` and assets remain byte-for-byte unchanged, do not run a production build solely for the mirror file. State that limitation clearly.

Do not commit, push, or publish unless the user asks.
