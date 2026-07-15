# Editorial Archives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the blog and project archive heroes and reduce related content to compact, secondary navigation.

**Architecture:** Archive routes select an existing featured content item and render an editorial image/text composition. Related content uses a dedicated compact row component, keeping full archive cards exclusive to archive pages.

**Tech Stack:** Next.js 15, React 19, TypeScript, Next Image, CSS/Tailwind utilities, Node test runner.

---

### Task 1: Regression coverage

**Files:**
- Modify: `tests/content.test.ts`
- Create: `tests/presentation.test.ts`

- [ ] Test that featured archive items resolve to valid content.
- [ ] Test that related content no longer imports full archive card components.
- [ ] Run `npm test` and confirm the presentation test fails.

### Task 2: Editorial archive heroes

**Files:**
- Modify: `src/app/blogs/page.tsx`
- Modify: `src/app/projecten/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Add featured image, metadata, and direct content link to each hero.
- [ ] Mirror the image/text order between blogs and projects.
- [ ] Add responsive editorial styling without overlapping elements.

### Task 3: Compact related content

**Files:**
- Modify: `src/components/content/RelatedContent.tsx`
- Modify: `src/app/globals.css`

- [ ] Replace full cards with compact image/title rows.
- [ ] Reduce section spacing and heading scale.
- [ ] Keep three blog rows and two project rows.

### Task 4: Verification

- [ ] Run `npm test` and `npm run type-check`.
- [ ] Verify blog/project archives and both detail types at desktop and mobile sizes.
- [ ] Run a clean `npm run build` after stopping the development server.
