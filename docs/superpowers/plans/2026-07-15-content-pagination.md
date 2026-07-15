# Content Pagination Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add nine paginated blogs, six projects, and related content to every detail page.

**Architecture:** Keep content in `src/lib/content.ts`, where pure helpers handle pagination and tag-based relevance. Archive and detail routes consume those helpers, while shared card components keep presentation consistent.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node test runner, CSS/Tailwind utilities.

---

### Task 1: Content behavior

**Files:**
- Create: `tests/content.test.ts`
- Modify: `src/lib/content.ts`

- [ ] Write failing tests for counts, pagination, and related content.
- [ ] Run `node --test tests/content.test.ts` and confirm the missing behavior fails.
- [ ] Add tags, six blogs, four projects, and the pure helper functions.
- [ ] Run the tests and confirm they pass.

### Task 2: Archive pagination

**Files:**
- Modify: `src/app/blogs/page.tsx`
- Modify: `src/app/projecten/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Read and validate the `page` query parameter.
- [ ] Render exactly three blog cards and accessible pagination links.
- [ ] Keep all six project cards visible in the current layout.

### Task 3: Related detail content of the same type

**Files:**
- Create: `src/components/content/BlogCard.tsx`
- Create: `src/components/content/ProjectCard.tsx`
- Create: `src/components/content/RelatedContent.tsx`
- Modify: `src/app/blogs/[slug]/page.tsx`
- Modify: `src/app/projecten/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Extract reusable archive cards.
- [ ] Add only related blogs beneath blog details and only related projects beneath project details.
- [ ] Add compact responsive styling.

### Task 4: Verification

- [ ] Run `node --test tests/content.test.ts`.
- [ ] Run `npm run type-check`.
- [ ] Stop the development server, clear `.next`, and run `npm run build`.
- [ ] Confirm all nine blog and six project detail routes are generated.
