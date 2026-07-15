# Ibu Bos Content Admin Design

## Goal

Build a small, private content-management area inside the existing Next.js application so Maartje and Aura can manage blogs and projects without editing code.

## Confirmed Workflow

- Maartje and Aura share one administrator login with full access.
- New blogs and projects start as drafts.
- Drafts have a private preview and can be published explicitly.
- Saving changes to an already published item updates the live site immediately.
- Deleting content always requires confirmation.
- The editor stays deliberately simple: structured text fields, up to three heading/body sections, tags, and one cover image.
- There are no roles, revision history, scheduled publishing, or general page editing.

## Architecture

- The admin lives at `/admin` in the same Next.js application.
- A signed, HTTP-only session cookie protects all admin pages and upload endpoints.
- One username and a scrypt password hash are supplied through environment variables. No user table is needed.
- Neon Postgres stores blog and project records through Drizzle ORM.
- Vercel Blob stores new cover images. Existing local images remain valid during migration.
- A content repository exposes asynchronous public and admin queries. Public queries return published records only; admin queries include drafts.
- If `DATABASE_URL` is absent, public pages use the existing static content so local development and the current website remain functional. The admin shows a setup message instead of pretending writes succeeded.
- Admin mutations revalidate the homepage and the complete same-type route tree (`/blogs` or `/projecten`), including every detail page. This is required because tag changes, publishing, unpublishing, and deletion can change related-content rankings on records other than the edited item.

## Content Model

One `content_entries` table stores the shared fields and type-specific data:

- `id`, `type` (`blog` or `project`), `status` (`draft` or `published`)
- `slug`, `title`, `description`, `image`, `label`, `intro`, `tags`
- `sections` as validated JSON containing up to three heading/body pairs
- Blog fields: `readTime`, `takeaway`
- Project fields: `facts`, `outcome`
- `createdAt`, `updatedAt`, `publishedAt`

Slugs are generated from titles for new items and must remain unique across each content type. Published public URLs keep the existing `/blogs/[slug]` and `/projecten/[slug]` structure.

### Validation Rules

- Common required fields: title (2-120 characters), description (10-300), image URL, label (2-40), intro (10-1,200), one to three sections, and one to six tags.
- Each section requires a heading (2-120 characters) and body (10-5,000). Empty optional section rows are discarded; partially filled rows are rejected.
- Tags are trimmed, lowercased, deduplicated, and limited to 2-30 characters each.
- Blogs require read time (2-30 characters) and takeaway (10-1,000). Project-only fields are stored as `null`.
- Projects require one to six facts (2-120 characters each) and an outcome (10-1,000). Blog-only fields are stored as `null`.
- A slug is generated on creation. It can be edited while an item has never been published, but title edits never regenerate it automatically. After first publication the slug is locked to preserve public URLs.

### Ordering And Publication

- Public archive items are ordered by `publishedAt` descending and then slug ascending for deterministic ties.
- The newest published item is the featured blog or project.
- Related content is ranked by shared-tag count, then `publishedAt` descending, then slug ascending.
- Admin lists and dashboard recency are ordered by `updatedAt` descending.
- First publication sets `publishedAt`. Subsequent saves and republication retain that original date.
- A published item can be returned to draft only through an explicit confirmed “Unpublish” action. It disappears from public queries but retains `publishedAt`, so republishing does not reorder the archive.

## Admin Experience

- `/admin/login`: shared username/password form with generic invalid-credentials feedback.
- `/admin`: counts and recent content, with direct actions to create a blog or project.
- `/admin/blogs` and `/admin/projecten`: compact tables with status, updated date, edit, preview, and delete actions.
- New/edit forms reuse a shared structured editor and show a clear warning when saving a published item will update the live page.
- Cover images can be uploaded directly to Vercel Blob or left as the current image URL.
- Preview routes require the admin session and render the public detail composition with draft data.
- A visible logout action clears the shared session on every admin screen.

## Migration And Deployment

- A checked-in SQL migration creates the schema.
- An idempotent seed command imports the existing nine blogs and six projects as published records. It inserts by type and slug and skips existing records so reruns never overwrite admin changes.
- Seeded records receive deterministic publication timestamps that preserve the current array order: the first item uses `2025-01-15T12:00:00Z` and each following item is one day older within its content type. This keeps the current featured items and archive order unchanged.
- `.env.example` documents `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `AUTH_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD_HASH`.
- A password-hash helper and deployment README make handoff reproducible.
- Production deployment requires importing the Git repository, attaching Neon and Blob, adding auth variables, running migration and seed commands, and connecting the domain.

## Safety And Validation

- All server mutations validate input with Zod and require an authenticated session.
- Session cookies are HTTP-only, same-site strict, secure in production, and expire after a bounded period.
- Password comparisons use Node's timing-safe cryptographic primitives.
- Image values must be either an existing local `/images/...` path or an HTTPS URL whose hostname matches `*.public.blob.vercel-storage.com`. `next.config.ts` uses the same remote-image hostname pattern, so every accepted Blob URL can render through Next Image without a separate host variable.
- Direct Blob upload token issuance requires an authenticated admin session and validates JPEG, PNG, or WebP with a 10 MB maximum. The provider callback does not depend on the browser cookie; Vercel Blob's `handleUpload` verifies its signed callback and no database mutation is performed from that callback.
- Delete uses an explicit confirmation screen/action and removes the database record. Managed Blob cleanup is best-effort and runs only after confirming no other content record references that URL. Replaced or abandoned uploads are not automatically deleted in this first version.
- Database errors return useful admin feedback without leaking credentials or stack traces.
- Deployment documentation recommends a Vercel Firewall rate-limit rule for `/admin/login`; authentication responses stay generic so usernames cannot be enumerated.

## Verification

- Unit tests cover slug creation, form validation, draft/public filtering, session signing/expiry, and content mapping.
- Route-level source tests cover admin protection and draft/publish behavior.
- Existing presentation/content tests remain green.
- Type checking and a clean production build verify public and admin routes.
- Browser checks cover login, dashboard, create draft, preview, publish, live edit, and delete at desktop and mobile widths when a test database is configured.
