# AGENTS.md — AI Agent Guide for hoc081098 Portfolio

## Project Overview

Next.js 14 (App Router) portfolio website for Petrus Nguyễn Thái Học (hoc081098). Built with TypeScript, Tailwind CSS
v4, and MDX for blog articles. Deployed on Vercel.

## Developer Workflows

```bash
pnpm dev       # Start dev server (uses pnpm, not npm/yarn)
pnpm build     # Production build
pnpm lint      # ESLint via next lint
```

**Required env var:** `NEXT_PUBLIC_SITE_URL` — must be set for the RSS feed (`/feed.xml`) to work.

## Architecture

```
src/
  app/          # Next.js App Router pages
  components/   # Shared UI components
  data/         # Static content (projects, socials, work history)
  lib/          # Utilities (article discovery, date formatting)
  images/       # Static assets (imported in components/data files)
  styles/       # tailwind.css + prism.css
```

### Key Data Flow

- **Site content** lives in `src/data/` — edit `project-data.ts`, `social-data.ts`, `work-data.ts`, or
  `article-series.ts` for content changes; all re-exported from `src/data/index.ts`.
- **Articles** are MDX files at `src/app/articles/<slug>/page.mdx`. Discovery uses `fast-glob` in `src/lib/articles.ts`
  — no manual registration needed.
- **RSS feed** at `/feed.xml/route.ts` fetches rendered article HTML at runtime using `cheerio` to extract content, then
  builds the XML feed. The `data-mdx-content` attribute on `<Prose>` in `ArticleLayout.tsx` is the scraping target.

## Adding a New Article

1. Create `src/app/articles/<slug>/page.mdx`.
2. Export a named `article` object and a `metadata` object, and a default export wrapping `ArticleLayout`:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'hoc081098',
  createdAt: 'YYYY-MM-DD',
  lastUpdatedAt: 'YYYY-MM-DDTHH:mm:ssZ',
  title: 'Article Title',
  description: 'Short description.',
  language: 'vi', // Omit for English articles.
  tags: ['kotlin', 'android', 'jetpack-compose', 'state-management'],
}

export const metadata = {
  title: article.title,
  description: article.description,
  keywords: article.tags,
  openGraph: {
    type: 'article',
    publishedTime: article.createdAt,
    modifiedTime: article.lastUpdatedAt,
  },
}

export default (props) => <ArticleLayout article={article} {...props} />

Article body here...
```

3. Images go in `src/images/articles/<slug>/` and are imported directly in MDX using the `<Image>` component (provided
   via `mdx-components.tsx`).
4. Keep `createdAt` as a date-only `YYYY-MM-DD` value, but derive that calendar date from UTC rather than the machine or
   user's local timezone. Update `lastUpdatedAt` on every content edit and normalize it to a UTC RFC 3339 instant ending
   in `Z`.

## Technical Article Writing Rules

Apply these rules when drafting, importing, editing, or reviewing a technical article:

- **Structure:** Use one `#` headline and a clear `##`/`###` hierarchy. Keep each section focused on one main concept.
  The introduction should establish the problem; the conclusion should consolidate the mental model instead of merely
  repeating the body.
- **Vietnamese and English:** Use Vietnamese for sentence structure and explanation, but retain canonical English
  technical terms such as `static type`, `runtime`, `member lookup`, `dynamic invocation`, `null safety`, and
  `bottom type`. Do not force an awkward Vietnamese translation, and do not insert English into ordinary prose when it
  makes the sentence less natural. Prefer vocabulary that Vietnamese engineers actually use while keeping a professional
  tone.
- **Technical accuracy:** Use the official terminology of the language, framework, or specification. Distinguish similar
  concepts explicitly, such as dynamic dispatch versus dynamic invocation. Verify important claims against official
  documentation, specifications, source code, compiler diagnostics, or runtime behavior. The conclusion must not claim
  more than the prose and examples establish.
- **Markdown emphasis:** Use backticks for types, APIs, identifiers, keywords, operators, and code literals. Use italics
  sparingly for concepts or mental models and bold only for genuine key takeaways. Do not overuse emphasis or emoji.
- **Code examples:** Keep examples syntactically and conceptually coherent unless they intentionally demonstrate an
  error. Use English identifiers and comments, align comments within the same code block, and label compile-time errors,
  runtime errors, and expected results clearly. Preserve semicolons when the demonstrated language requires them.
- **Editorial style:** Preserve the author's voice but remove slang that weakens a professional technical article. Avoid
  repetition, unsupported absolute claims, and unnecessarily long sentences. Keep terminology consistent from the title
  through the conclusion.
- **Punctuation and source formatting:** Do not use semicolons in article prose. Wrap Markdown and MDX source at a
  maximum of 120 characters, remove trailing whitespace, and prefer reference-style Markdown links when inline URLs
  would exceed the limit.
- **Final checks:** Run Prettier with `printWidth: 120`, run `git diff --check`, confirm that prose contains no
  semicolons, and perform a final consistency pass across the title, prose, code, comments, visuals, captions, and
  conclusion.

## Article Tagging

- Keep tags useful for filtering, not attribution. Do not use author/team/social tags such as `hoc081098`,
  `rx_mobile_team`, `rx-mobile-team`, `kotlindev`, `androiddev`, or `iosdev`.
- Prefer a compact taxonomy: programming language, platform/framework/library, then the core technical subjects.
- Use kebab-case tag names (`jetpack-compose`, `value-class`, `reactive-programming`) and avoid duplicate aliases such
  as underscore variants.
- Keep each article focused, usually around 4-9 tags. Avoid one-off implementation-detail tags unless they are likely to
  become a reusable topic page.
- Tags remain topic filters and are independent from article series.

## Article Series

- Define ordered, one-level series in `src/data/article-series.ts`; article URLs remain flat at `/articles/<slug>`.
- `articleSlugs` order defines Part 1, Part 2, and so on. Every slug must match an existing article, and an article may
  appear in at most one series.
- Series are exposed at `/series` and `/series/<series-slug>`. Articles in a series automatically render the series
  label and Previous/Next navigation.

## Conventions & Patterns

- **No semicolons, single quotes** — enforced by Prettier (`prettier.config.js`).
- **Tailwind CSS v4** with `@tailwindcss/postcss`; config is in `src/styles/tailwind.css`. Class ordering managed by
  `prettier-plugin-tailwindcss`.
- **Icons** — use `@phosphor-icons/react/ssr` (SSR-safe import) for static components. In client components, use
  `@phosphor-icons/react`. See `src/components/icons/index.ts` for the social icon map pattern.
- **Dark mode** — via `next-themes` with `attribute="class"`. `ThemeWatcher` in `providers.tsx` syncs to OS preference.
  Always provide `dark:` Tailwind variants.
- **`AppContext`** in `providers.tsx` tracks `previousPathname` for the back-button in `ArticleLayout`. Access it via
  `useContext(AppContext)` in client components.
- **Path alias** `@/` maps to `src/` (configured in `tsconfig.json`).
- **`pageExtensions`** in `next.config.mjs` includes `mdx`, so MDX files are treated as pages.

## Key Files

| File                               | Purpose                                         |
| ---------------------------------- | ----------------------------------------------- |
| `src/data/index.ts`                | Single export barrel for all site content       |
| `src/data/article-series.ts`       | Ordered, one-level article series registry      |
| `src/lib/articles.ts`              | Article discovery + metadata extraction         |
| `src/app/feed.xml/route.ts`        | RSS feed — scrapes rendered HTML                |
| `src/components/ArticleLayout.tsx` | Wraps every MDX article page                    |
| `mdx-components.tsx`               | Global MDX component overrides (adds `<Image>`) |
| `src/app/providers.tsx`            | Theme + navigation context providers            |
