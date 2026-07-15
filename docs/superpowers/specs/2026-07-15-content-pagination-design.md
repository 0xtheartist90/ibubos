# Content Pagination and Related Items Design

## Goal

Expand the website to nine complete blog posts and six complete projects, while keeping the archive pages compact and making detail pages useful for further exploration.

## Design

- The blog archive shows three posts per page through `?page=1`, `?page=2`, and `?page=3`.
- The project archive shows all six projects in the existing two-column layout.
- Every content item receives thematic tags.
- Related items are ranked by shared tags, exclude the current item, and fall back to the remaining content so sections never appear empty.
- Blog details show three related blogs only.
- Project details show two other related projects only.
- Existing Ibu Bos photography is reused by subject to keep the visual identity coherent.

## Verification

- Automated tests cover item counts, pagination boundaries, and related-item exclusion/counts.
- TypeScript checking and a production Next.js build verify every archive and detail route.
