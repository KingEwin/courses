@AGENTS.md

# CineTrack — Project Context

This is a school React project (g4.2026.react) — film tracker app inspired by Letterboxd, with a Nintendo DS visual aesthetic. **Deadline: tonight, 2026-05-03.**

## Where to find context

Read these before making decisions:

- `.planning/PROJECT.md` — what we're building, why, scope, constraints, key decisions
- `.planning/ROADMAP.md` — 4-phase delivery plan, success criteria, descope strategy
- `.planning/REQUIREMENTS.md` — 45 v1 requirements with traceability
- `.planning/STATE.md` — current position, accumulated context

## Stack (frozen)

- Next.js 16 App Router + React 19 + TypeScript 5
- Tailwind CSS 4
- Prisma ORM + PostgreSQL (Docker local)
- Zustand (client store)
- TMDB API (server-side only — `TMDB_API_KEY`)

## Hard rules

- Next.js 16 has breaking changes vs training data — consult `node_modules/next/dist/docs/` before any Next-specific code.
- TMDB API key NEVER on client (`TMDB_API_KEY`, not `NEXT_PUBLIC_*`). All TMDB calls go through Next.js server routes / server actions.
- `any` is forbidden in delivered code (ARCH-04).
- CRUD path is the safety net (40/90 pts of grade). If anything must be cut, cut style/TMDB before CRUD.
- Style aesthetic = DS accents on a normal layout. **Not** a full double-screen frame.

## Grading rubric (steers priority decisions)

| Pts | Item |
|-----|------|
| 20 | CRUD (consult / add / edit / delete) |
| 20 | React fundamentals |
| 15 | Store usage (Zustand) |
| 15 | Architecture & separation of concerns |
| 15 | Code cleanliness |
| 5  | App style |

## Workflow notes

- Mode: YOLO (auto-approve), coarse granularity, parallelization enabled.
- No research / no plan_check / no verifier — speed mode for deadline.
- Submission must include `AI_USAGE.md` documenting AI involvement (prof requirement).
