# Detail Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move related blog and project links from a prominent bottom section into a compact right-hand detail sidebar.

**Architecture:** Both detail routes share CSS layout contracts (`detail-layout` and `detail-sidebar`) while retaining their type-specific related components. Desktop uses an article/sidebar grid; mobile stacks the sidebar after the article.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS/Tailwind utilities, Node test runner.

---

### Task 1: Layout regression test

- [ ] Extend `tests/presentation.test.ts` to require the shared grid and sidebar on both detail routes.
- [ ] Run `npm test` and confirm the new assertion fails.

### Task 2: Detail grid and sidebar

- [ ] Wrap article and related content in `detail-layout` on both routes.
- [ ] Apply `detail-sidebar` to related content.
- [ ] Reduce heading, row, image, and spacing scale.
- [ ] Add desktop sticky positioning and mobile single-column fallback.

### Task 3: Verification

- [ ] Run tests and type checking.
- [ ] Verify blog and project details at desktop and mobile widths.
- [ ] Run a clean production build and restart localhost.
