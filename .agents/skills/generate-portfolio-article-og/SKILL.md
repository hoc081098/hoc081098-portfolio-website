---
name: generate-portfolio-article-og
description: Generate, compare, select, integrate, and validate semantically faithful Open Graph visuals for articles in the hoc081098 Next.js MDX portfolio. Use when asked to create or regenerate a custom article OG image, propose social-preview art directions, improve an article share card's visual impact, or wire a selected visual into openGraph.images while preserving unrelated worktree changes.
---

# Generate Portfolio Article OG

## Establish the live contract

1. Read the nearest `AGENTS.md` completely.
2. Inspect `git status`, the existing diff, the complete target `page.mdx`, the live Open Graph renderer, and representative articles using both generated and static previews.
3. Record every pre-existing changed or untracked path. Treat it as user-owned and do not edit, format, stage, move, or delete it.
4. Resolve the requested mode:
   - **Prompt only:** return the semantic brief and final prompt without generating or changing files.
   - **Concept preview:** generate alternatives but do not change article metadata.
   - **Generate and integrate:** generate, select as directed, save, wire, and validate.
   - **Review:** inspect an existing OG image for semantic and preview quality without editing unless explicitly requested.
5. If the target article cannot be inferred safely, ask for its slug. Otherwise proceed without unnecessary questions.

Use the installed `imagegen` skill and its built-in image-generation path for raster artwork. For an exact technical diagram, code sample, logo, or typography-heavy card, prefer deterministic SVG, HTML/CSS, or `ImageResponse` rendering instead of asking an image model to reproduce exact syntax.

## Build a semantic brief

Read the article body, metadata, code examples, diagrams, and series context before choosing an art direction. Extract:

- the central thesis in one sentence;
- two to four concepts essential to that thesis;
- the relationship between them, such as flow, transformation, contrast, hierarchy, or alternatives;
- one visual metaphor that preserves that relationship;
- any misleading interpretation the artwork must avoid.

Do not reduce the article to its language or framework logo. The visual must represent the article's actual claim and be explainable in one sentence. If no honest figurative metaphor exists, use a restrained abstract composition based on the real relationship.

## Generate previews

Read [references/og-image-prompt.md](references/og-image-prompt.md) completely before shaping the image prompt.

Unless the user requests one direction or immediate integration, generate three distinct previews:

1. Abstract conceptual metaphor.
2. Structured technical-editorial composition.
3. Bold minimal symbolic composition.

Issue one built-in image-generation call per direction. Do not use minor prompt variations as substitutes for genuinely different concepts.

For every direction:

- target a landscape composition that can be cleanly cropped to `1200 × 630` (`1.91:1`);
- preserve a safe area and clear negative space where deterministic title copy will appear;
- keep one dominant focal point and at most two to four meaningful motifs;
- derive the palette from the live portfolio or article-series theme;
- prohibit generated words, code, logos, labels, and watermarks;
- optimize for recognition at small social-preview size, not full-resolution detail;
- inspect the output for semantic mistakes, accidental glyphs, artifacts, weak hierarchy, and unsafe cropping.

Present each preview with its final prompt and a one-sentence explanation of how it represents the article. Do not update `openGraph.images` before the user selects a preview unless they explicitly authorized autonomous selection or one-shot integration.

## Select the strongest direction

When asked to recommend or select, compare candidates using this order:

1. Semantic fidelity to the central thesis.
2. Immediate legibility at roughly 10% scale.
3. Focal hierarchy and curiosity without clickbait.
4. Sufficient copy-safe negative space.
5. Fit with the portfolio and any article-series theme.
6. Distinctiveness from generic technology artwork.

Reject a visually attractive candidate if it suggests the wrong technical relationship. Iterate with one targeted correction at a time and repeat all critical invariants.

## Finalize and integrate

Only integrate a selected or explicitly auto-selected direction.

1. Copy the chosen project-bound asset into the target article directory. Use a descriptive name such as `og-background.png` or `og-background-v2.png`; never overwrite an existing asset without explicit approval.
2. Crop or compose the final card to exactly `1200 × 630`. Keep meaningful content within a `64 px` outer safe area and verify the actual pixel dimensions.
3. Render the title, article label, author, and domain deterministically with the repository's code-native OG renderer when the card requires in-image text. Do not send the artwork back through an image model to add text.
4. Inspect the live metadata convention before editing. Reuse the existing generated `/api/og` preview when custom artwork does not add meaningful value.
5. When a static final image is the selected OG asset, use a static import and expose intrinsic dimensions plus useful alt text:

```ts
const images = [
  {
    url: articleOgImage.src,
    width: articleOgImage.width,
    height: articleOgImage.height,
    alt: 'Specific description of the article preview artwork',
  },
]
```

6. Keep alt text concise and descriptive; do not stuff keywords. Preserve the current Twitter-card convention if the repository defines one.
7. Do not bump `lastUpdatedAt` for an image-only or metadata-only change unless the live repository convention requires it.

## Validate and report

For an integrated result:

- verify the final asset is exactly `1200 × 630`, has the intended format, and remains clear as a thumbnail;
- run Prettier only on files changed for this task;
- run `git diff --check` and reread the scoped diff;
- run `NEXT_PUBLIC_SITE_URL=https://portfolio.hoc081098.dev pnpm build` unless the user limits validation;
- inspect the rendered article metadata and confirm `og:image`, dimensions, and alt text resolve correctly;
- compare final `git status` with the initial snapshot and confirm all pre-existing files remain byte-for-byte unchanged when practical.

Report the semantic brief, selected direction, final prompt, generated asset paths, integration choice, validation performed, and preserved unrelated changes. Do not commit, stage, push, or publish unless the user explicitly asks.
