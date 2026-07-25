# CLAUDE.md

## Project
Personal portfolio site for Vedansh Sharma (Software Engineer / Competitive Programmer, B.Tech CS @ Manipal University Jaipur). Space-themed background with a Samsung One UI–inspired design language (squircles, frosted glassmorphism, soft diffuse shadows, tactile spring animations). Live at vedanshsharma.vercel.app, deployed on Vercel.

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-based `@theme`, no tailwind.config file), `clsx` + `tailwind-merge` via `cn()` helper
- **Animation:** Framer Motion (`motion.div`, `useMotionValue`/`useSpring`/`useTransform` for pointer-driven effects)
- **Smooth scroll:** Lenis
- **3D/visual:** `cobe` for the globe component
- **Icons:** Lucide React
- **HTTP:** axios (used server-side only, in the stats API route)

## Architecture
- `src/app/` — route segments (App Router): `page.tsx` (home), `about/`, `projects/`, `certificates/`, `contact/`, `stats/`. `layout.tsx` wraps everything in `SmoothScroll` + `StarfieldBackground`. `template.tsx` likely drives per-route transitions.
- `src/app/api/stats/route.ts` — single API route. Fetches/scrapes competitive-programming stats (LeetCode via GraphQL, CodeChef via HTML regex scraping, HackerRank via undocumented REST endpoints). All external calls are best-effort with try/catch per source; scraping is inherently brittle to upstream markup changes.
- `src/components/ui/` — all custom components live flat in this one directory (no further nesting, no separate `layout`/`sections` split). Notable: `Navbar.tsx` (macOS-dock-style magnification nav), `Hero.tsx`, `Projects.tsx` (project list is **hardcoded inline**, not generated from `repos.json`), `Globe.tsx`, `StarfieldBackground.tsx`, `BlurText.tsx`, `InteractiveGrid.tsx`, `TechMarquee.tsx`, `CodingStats.tsx`, `SmoothScroll.tsx`.
- `src/lib/utils.ts` — just the `cn()` classname helper.
- Theme tokens (colors, radius) are defined as CSS custom properties in `globals.css` under `@theme`/`:root`, consumed via Tailwind color classes (`bg-primary`, `text-muted-foreground`, etc.). Primary accent is purple (`#7c3aed`); background is near-black (`#09090b`).

## Conventions
- Most interactive components are `"use client"`.
- Squircle radii (`rounded-2xl`/`rounded-3xl`/`rounded-[2rem]`) + `bg-white/5`–`/20` translucent surfaces + `backdrop-blur` are the standard way to render One UI–style glass surfaces — prefer this over flat borders/pill shapes for new UI.
- Non-text scroll-in reveals (cards, buttons, links) use Framer Motion `initial`/`whileInView`/`viewport={{ once: true }}` patterns (see `page.tsx`).
- Text reveals go through `BlurText.tsx`, which drives its own `whileInView` + `variants`/`staggerChildren` internally (word/letter-by-letter blur+fade+slide). Never wrap a `BlurText` in another `whileInView` container — an outer scroll-trigger animating opacity/y around it double-animates the same text and reads as an abrupt, desynced landing (this caused a real bug, fixed by removing the redundant wrappers in `page.tsx` and `Projects.tsx`).
- Path alias `@/*` → `src/*`.

## Housekeeping notes
- `dev-err.log`, `dev-out.log`, `server.log`, `start_log.txt` are currently tracked in git despite being log output — leave as-is unless the user asks to clean this up; don't add new log files to tracking.
- Scratch/handoff files (e.g. a stray `AI_HANDOFF.md`, a `repos.json` dump of GitHub API data) have shown up in the repo root before as leftover working material from prior AI sessions and were removed once superseded — if similar files reappear, treat them as disposable scratch, not source of truth, and check with the user before deleting.

## Workflow rules
- Propose one change at a time and wait for local review before moving to the next; only `git commit`/`git push` after the user explicitly approves that specific change.
- Never commit or push notes/handoff/scratch files (e.g. `AI_HANDOFF.md`, `repos.json`, ad hoc logs) to the repo.
