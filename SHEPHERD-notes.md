# SHEPHERD Notes

_Last updated: 2026-03-01 (post-prompt-05 review)_

---

## Status

- **Project phase:** Scaffold complete. Data model, store, and routing are built. All 14 screen stubs exist. Ready for screen-by-screen implementation.
- **Stack:** React + TypeScript (Vite), Zustand, React Router.
- **Source of truth:** `README.md` (engineer brief, data model, non-goals) and `SCREENS-v1-dwelling.md` (screen-by-screen UX copy and flow).
- **README is now in sync with SCREENS.** §3.1 flow, §5.0 stack decisions, and §5.2 data model were all updated by Beacon.
- **Prompt 02 fixes verified complete.** `SYSTEM_CHECK_IDS` now includes `landscaping` + `trees-and-shrubs` in the correct position; store hydration exists and is called on app mount; `RequireSession` redirects to `/` when `session === null`; `npm run build` succeeds with no TypeScript errors.
- **Screen 1 (Landing) implemented and reviewed.** Copy, CTA route (`/upload`), and local-only privacy line are in place; build is clean; smoke navigation Landing → Upload passes. CSS design system introduced (CSS variables, warm stone palette, Lora/Inter type).
- **Screen 2 (Upload) implemented and reviewed.** Copy exact, validation correct (PDF type + 20 MB), only `pdfFileName` stored, both nav paths confirmed. One code-level fix applied by Shepherd: redundant `createSession` return spread removed from `handleUploadAndContinue`.
- **Screen 3 (Quick Setup) implemented and reviewed.** All copy, radio options, and values match spec. Null-session vs existing-session logic correct. Nickname default, disabled-state validation, and `/how-it-works` route all verified. No corrections needed.
- **Screen 5 (How It Works) implemented (beyond prompt scope) — three spec deviations corrected by Shepherd.** Beacon replaced the spec's "two things" body copy with a six-step numbered list, wrote the wrong button label ("Let's go" vs. "Let's start"), and paraphrased the tip box. Shepherd rewrote `HowItWorks.tsx` to match `SCREENS-v1-dwelling.md` exactly and removed the now-dead CSS block. Build verified clean after correction.
- **Next queued implementation:** Screen 6 (Coverage Sections) via `CODER-prompt-06-coverage.md`.

## Working Conventions

- **Coder agent alias:** `Beacon`
- Use `Beacon` in Shepherd-to-Coder handoff prompts and status notes for consistency.

---

## Known Issues / Gaps

### ~~1. README flow diverges significantly from SCREENS~~ — RESOLVED
Beacon updated README §3.1 to match the 14-screen flow from SCREENS.

### ~~2. README data model does not reflect SCREENS additions~~ — RESOLVED
Beacon updated README §5.2 and implemented the full TypeScript type in `/src/types/session.ts`, including all four missing answer shapes.

### 3. Progress indicator "Step 3 of 5" on Screen 9 is likely wrong
Screen 9 (Room Selection) shows "Step 3 of 5" but the actual flow has more than five distinct phases: (1) Big Picture / Coverage, (2) O&P, (3) Systems Check, (4) Room-by-Room, (5) Site & Access, (6) Global Issues. The step count and labeling need to be defined precisely before engineering builds the progress indicator. Consider grouping Screens 6–8 into one "Big Picture" phase and Screens 11–12 into one "Property & Global" phase.

### 4. ~~Title 24 item is California-specific~~ — RESOLVED
The tool is California-only. Title 24 language on Screen 8 is correct as written. No change needed.

### 5. O&P language passes the Shepherd test — standing watch item
Screen 7 says O&P is "typically around 10% each (20% combined)." This is correctly framed as "typical," not as a legal entitlement. No change needed now. But this is a standing watch item: any future edit to this screen must preserve the "typical" framing and must not imply a guaranteed or legally required amount.

### 6. "I'm not sure" answers need a defined summary behavior
The Global UI Notes say "I'm not sure" should contribute a soft flag to the summary ("You were unsure whether X was included — worth confirming with your adjuster"). This is not yet defined in the data model or summary generation logic. The summary template on Screen 13 shows no "I'm not sure" output examples. This must be specified before the summary screen is built.

### ~~8. Bug — `landscaping` and `trees-and-shrubs` missing from `SYSTEM_CHECK_IDS`~~ — RESOLVED
Verified in `/src/types/session.ts`: both IDs were added between `'retaining-walls'` and `'antenna-satellite-dish'`.

### ~~9. No session hydration on app startup~~ — RESOLVED
Verified:
- `hydrateSession` exists in `/src/store/estimateSessionStore.ts` and returns loaded session or `null`.
- `App.tsx` calls hydration once on mount.
- `RequireSession` now redirects to `/` when no active session exists.

### 7. Empty-state summary threshold is undefined
The Global UI Notes define an empty-state summary: "Based on your answers, no major gaps stood out. If something still feels off, trust that instinct…" Good copy. But the trigger condition is not specified — does it fire when every answer is "No," or also when every answer is "I'm not sure"? A rule is needed.

---

## Open Questions

### From README §10 (unresolved engineer questions)

1. **Framework choice:** React vs. Vue vs. Svelte? React + TypeScript is the stated default. Needs a decision before work begins.
2. **State management:** Simple React state + Context vs. Zustand/Redux? Given multi-step, multi-room flow with back-navigation, a lightweight global store (Zustand) is likely warranted. Needs a decision.
3. **PDF UX:** Side-by-side on desktop, bottom-sheet toggle on mobile (per Screen 14 Global UI Notes). Best PDF.js wrapper for React? Needs a spike.
4. **AI summarization structure:** How to structure the summary payload so an LLM post-processing call can be added later without restructuring the data model. Must be decided at data model design time.
5. **Telemetry:** Minimal, privacy-respecting analytics. No decision yet. Must not capture any claim content.

### New questions identified during Shepherd review

6. ~~**Target geography**~~ — **RESOLVED: California only.** Title 24 language, wildfire zone examples, and UP guidance are all appropriate as written. README should state "California" explicitly in the overview so this is never ambiguous to a future engineer or contributor.

7. **Rooms with all-standard answers: include in summary or omit?** If a user selects a room but answers "Standard / basic" to every question, should that room be silently omitted from the summary, or should there be a confirming line ("Living Room: no special items flagged")?

8. **Summary language when no PDF was uploaded.** Screen 2 allows continuing without a PDF. Screen 13's example output says things like "does not appear in the estimate." If there is no PDF, this language needs to be conditional ("if your estimate does not include…" rather than asserting it does not appear).

9. **Is Settings accessible from anywhere in the flow, or only post-summary?** Screen 14 exists but its navigation entry point is not specified. A persistent header icon is implied by the "always visible back button" note but not stated.

10. **Resume re-entry UX: session list or exact question?** Screen 4 handles returning to a prior session, but it is not specified whether the user resumes at the exact question they left on or at the start of the section. Auto-save behavior is defined; re-entry destination is not.
