# Ibu Bos Content Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a secure shared admin that manages draft and published blogs/projects backed by Neon Postgres and Vercel Blob while preserving the current public design.

**Architecture:** Introduce validated domain models and an async repository that reads Postgres when configured and falls back to current seed content for public pages. Protect `/admin` with a signed shared session, implement server-action CRUD and private previews, then migrate public pages from static arrays to the repository. Direct client uploads use authenticated Vercel Blob token issuance.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Zod, Drizzle ORM, Neon serverless Postgres, Vercel Blob, Node crypto, Node test runner.

---

## File Map

- `src/lib/content/types.ts`: public and admin content types.
- `src/lib/content/seed.ts`: existing nine blogs and six projects, unchanged as migration/fallback data.
- `src/lib/content/validation.ts`: Zod forms, slug normalization, image validation, form mapping.
- `src/lib/content/ranking.ts`: pagination and deterministic related-content ranking.
- `src/lib/content/repository.ts`: async public/admin content interface and static fallback.
- `src/lib/db/client.ts`, `src/lib/db/schema.ts`: Neon/Drizzle connection and table schema.
- `src/lib/admin/session.ts`, `src/lib/admin/auth.ts`: signed sessions and shared credentials.
- `src/lib/admin/actions.ts`: authenticated CRUD/publication mutations and revalidation.
- `src/app/admin/**`: login, dashboard, lists, editor, previews, and admin layout.
- `src/app/api/admin/upload/route.ts`: authenticated Blob client-upload token endpoint.
- `src/components/admin/**`: focused admin forms, table, status, image uploader, and shell.
- `drizzle.config.ts`, `drizzle/0000_content_entries.sql`: reproducible Drizzle generation and production migration configuration.
- `scripts/seed-content.ts`, `scripts/hash-password.ts`: idempotent migration seed and credential helper.
- `.env.example`, `docs/backend-deployment.md`: handoff configuration and deployment runbook.

### Task 1: Dependencies, schema, and configuration

**Files:** `package.json`, `package-lock.json`, `next.config.ts`, `.env.example`, `drizzle.config.ts`, `drizzle/0000_content_entries.sql`, `src/lib/db/schema.ts`, `src/lib/db/client.ts`

- [ ] Add a source-level test asserting required environment keys, remote Blob image pattern, schema constraints, and migration presence.
- [ ] Run the test and confirm it fails because the backend files do not exist.
- [ ] Install `drizzle-orm`, `@neondatabase/serverless`, and `@vercel/blob`; install `drizzle-kit` and `tsx` as development dependencies.
- [ ] Define the `content_entries` schema with type/status checks, unique `(type, slug)`, JSON sections, nullable type-specific fields, and timestamps.
- [ ] Configure Drizzle Kit for `src/lib/db/schema.ts`, the `drizzle` output directory, PostgreSQL dialect, and `DATABASE_URL`, so both generation and migration scripts are executable.
- [ ] Add a lazy database client that returns `null` when `DATABASE_URL` is absent and never connects at module import time.
- [ ] Permit HTTPS `*.public.blob.vercel-storage.com` images in Next config and document all environment keys.
- [ ] Run the focused test and type checking.

### Task 2: Domain validation and ranking

**Files:** `src/lib/content/types.ts`, `src/lib/content/validation.ts`, `src/lib/content/ranking.ts`, `tests/admin-content.test.ts`

- [ ] Write failing tests for slug normalization, stable slugs on edit, required/optional fields, section/tag normalization, type-inapplicable null fields, pagination, public ordering, and related ranking.
- [ ] Run `node --test tests/admin-content.test.ts` and confirm failures are caused by missing behavior.
- [ ] Implement strict Zod schemas and pure mapping helpers for blog/project form payloads.
- [ ] Implement deterministic pagination, ordering, and same-type related ranking.
- [ ] Run the focused test until green, then run the existing content tests.

### Task 3: Repository and seed fallback

**Files:** `src/lib/content/seed.ts`, `src/lib/content/repository.ts`, `src/lib/content.ts`, `tests/content-repository.test.ts`

- [ ] Move static content into `seed.ts` without changing values or current order.
- [ ] Write failing repository-contract tests using an injected in-memory adapter for published filtering, drafts, featured items, CRUD, slug uniqueness, and publication timestamps.
- [ ] Implement repository functions for public lists/details, admin lists/details, create, update, publish, unpublish, and delete.
- [ ] Make public reads use seed content when no database exists; make admin writes return a typed setup error instead of mutating memory.
- [ ] Keep `src/lib/content.ts` as a compatibility export for pure types/seed helpers during migration.
- [ ] Run repository, existing content, and type tests.

### Task 4: Shared authentication

**Files:** `src/lib/admin/session.ts`, `src/lib/admin/auth.ts`, `src/app/admin/login/page.tsx`, `src/app/admin/login/actions.ts`, `src/app/admin/logout/actions.ts`, `middleware.ts`, `scripts/hash-password.ts`, `tests/admin-auth.test.ts`

- [ ] Write failing tests for scrypt password verification, timing-safe invalid credentials, signed session creation, tamper rejection, and expiry.
- [ ] Implement shared username/password verification from environment variables and an HTTP-only signed session cookie.
- [ ] Protect `/admin/:path*` in middleware while allowing `/admin/login`; redirect authenticated login visits to `/admin`.
- [ ] Add accessible login/logout actions with generic errors and a password-hash CLI helper.
- [ ] Run auth tests, type checking, and verify missing auth configuration produces a safe setup message.

### Task 5: Migrate public routes to asynchronous content

**Files:** `src/app/page.tsx`, `src/app/(delete-this-and-modify-page.tsx)/HomePage.tsx`, `src/app/blogs/page.tsx`, `src/app/blogs/[slug]/page.tsx`, `src/app/projecten/page.tsx`, `src/app/projecten/[slug]/page.tsx`, `src/components/content/RelatedContent.tsx`, `tests/public-content-routes.test.ts`

- [ ] Add failing source/contract tests requiring public routes to call async repository queries and never expose drafts.
- [ ] Convert archive, detail, metadata, related, and homepage featured queries to async repository functions.
- [ ] Remove static `generateStaticParams` assumptions so newly published slugs resolve without a rebuild.
- [ ] Preserve the existing card/detail props and public HTML/CSS composition.
- [ ] Run all tests and verify all current static fallback routes still render without database variables.

### Task 6: Admin dashboard and structured editors

**Files:** `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/blogs/page.tsx`, `src/app/admin/projecten/page.tsx`, `src/app/admin/blogs/new/page.tsx`, `src/app/admin/blogs/[id]/page.tsx`, `src/app/admin/projecten/new/page.tsx`, `src/app/admin/projecten/[id]/page.tsx`, `src/components/admin/AdminShell.tsx`, `src/components/admin/ContentTable.tsx`, `src/components/admin/ContentEditor.tsx`, `src/components/admin/SubmitButton.tsx`, `src/lib/admin/actions.ts`, `tests/admin-actions.test.ts`

- [ ] Write failing action tests for new drafts, explicit publication, immediate updates to published items, confirmed unpublish/delete, route-tree revalidation calls, and slug locking whenever `publishedAt` is non-null (including after unpublish).
- [ ] Implement authenticated server actions using validation and repository interfaces.
- [ ] Preserve the original non-null `publishedAt` through unpublish and republication; never unlock or regenerate that record's slug.
- [ ] Build compact dashboard/list pages with status, updated time, edit, preview, publish/unpublish, and confirmed delete actions.
- [ ] Build one structured editor that switches blog/project fields and supports one to three section pairs.
- [ ] Add explicit messaging that published-item saves update the live website immediately.
- [ ] Add focused admin styles to `src/app/globals.css` and hide public navigation/footer through a small route-aware site chrome component.
- [ ] Run action tests, presentation tests, and type checking.

### Task 7: Blob upload and draft preview

**Files:** `src/app/api/admin/upload/route.ts`, `src/components/admin/ImageUploader.tsx`, `src/lib/admin/blob.ts`, `src/app/admin/preview/blogs/[id]/page.tsx`, `src/app/admin/preview/projecten/[id]/page.tsx`, `src/components/content/BlogDetail.tsx`, `src/components/content/ProjectDetail.tsx`, `tests/admin-upload.test.ts`

- [ ] Write failing tests for session-required token issuance, image MIME/size validation, accepted Blob hostnames, and rejected arbitrary URLs.
- [ ] Implement Vercel Blob `handleUpload` token issuance and signed callback handling.
- [ ] Add a direct-upload client control with progress/error state and a retained URL field for existing local images.
- [ ] Implement best-effort managed Blob deletion that first queries all content for another reference; test shared URLs are retained, unreferenced managed URLs are deleted, and local/arbitrary URLs are ignored.
- [ ] Extract current detail compositions into reusable components and render draft previews through authenticated admin routes.
- [ ] Run upload/preview tests and verify the existing public detail appearance remains unchanged.

### Task 8: Migration, seed, and handoff

**Files:** `scripts/seed-content.ts`, `docs/backend-deployment.md`, `package.json`, `tests/seed-content.test.ts`

- [ ] Write a failing test for deterministic publication dates and insert-on-conflict-do-nothing seed behavior.
- [ ] Implement the seed command and package scripts: `db:generate`, `db:migrate`, `db:seed`, and `auth:hash`.
- [ ] Document GitHub/Vercel import, Neon/Blob attachment, environment variables, password creation, migration, seed, domain, firewall rate limit, backup, and smoke-test steps.
- [ ] Run the seed test and dry-run mapping without a production database.

### Task 9: End-to-end verification

- [ ] Stop the dev server before touching `.next`, run `npm test`, `npm run type-check`, and `npm run build`, then restart `npm run dev`.
- [ ] Verify public fallback pages, admin setup state, login configuration errors, and all generated routes without secrets.
- [ ] If a test database and Blob token are available, exercise create draft, preview, publish, live edit, unpublish, and delete in the browser.
- [ ] Confirm no secrets or local environment files are tracked and review the final git diff for unrelated changes.
