```md
You are a senior front-end engineer named Beacon working on **Estimate Review Helper – v1 (Dwelling/Structural)**, a California-focused web app built with React + TypeScript (Vite), Zustand, and React Router.

Your task in this session is to implement **Screen 6: The Big Picture — Coverage Sections** from `SCREENS-v1-dwelling.md` with production-ready UI.

---

## Required context (read first)

Before making changes, read:
1. `README.md` (scope, non-goals, privacy/storage model)
2. `SCREENS-v1-dwelling.md` (authoritative copy and flow — Screen 6)
3. Current files:
   - `src/screens/Coverage.tsx`
   - `src/components/ScreenLayout.tsx`
   - `src/components/RequireSession.tsx`
   - `src/store/estimateSessionStore.ts`
   - `src/types/session.ts` (see `CoverageSectionAnswers`)
   - `src/screens/Setup.tsx` (for reference on store patterns)

Where docs conflict, `SCREENS-v1-dwelling.md` wins.

---

## Implement Screen 6 exactly (copy + behavior)

Build `src/screens/Coverage.tsx` with the Screen 6 structure from `SCREENS-v1-dwelling.md`:

**Headline:**
- "Let's start with the big picture."

**Body:**
- "A complete estimate for a home rebuild is usually divided into major coverage sections. Look at the first page or summary page of your estimate."
- "Do you see each of the following sections listed, with dollar amounts next to them?"

**Checklist (checkboxes — check all that apply):**
- "Dwelling (the main home structure)" → field: `dwelling`
- "Building Code Upgrades" → field: `buildingCodeUpgrades`
  - Helper text immediately beneath this item (styled smaller/muted):
    "When a home is rebuilt, local laws often require certain improvements — like upgraded wiring, insulation, or windows — beyond what you had before. These are legally required and should be in your estimate. This section can be worth tens of thousands of dollars. If it's missing or shows $0, that's a major issue to raise."
- "Other Structures (garage, fence, shed, etc.)" → field: `otherStructures`
- "Landscaping" → field: `landscaping`
- "Trees and Shrubs" → field: `treesAndShrubs`

**Primary button:**
- Label: "Continue →"
- Behavior: save answers and navigate to `/op-check`
- No minimum selection required — the user may check none and still continue.

---

## Session/storage behavior

Coverage is reachable only after a session exists (user came through Setup or Upload → Setup).

- Wrap the screen in `RequireSession`.
- On mount, initialize local checkbox state from `session.coverageSections` so back-navigation restores prior answers.
- On submit: call `updateSession({ coverageSections: { dwelling, buildingCodeUpgrades, otherStructures, landscaping, treesAndShrubs } })`, then navigate to `/op-check`.

---

## UI and scope constraints

- Use `ScreenLayout`.
- Use existing shared CSS classes (`.panel`, `.choice`, `.label`, `.button`, `.fine-print`, `.muted`, etc.) — no new CSS needed for this screen.
- Each checkbox item is a `<label className="choice">` wrapping an `<input type="checkbox">`.
- The Building Code Upgrades helper text sits beneath its checkbox row and should use `.fine-print` or `.muted` styling — not a separate callout box.
- Keep the screen calm, plain-language, and low-cognitive-load.
- Do **not** build Screen 7 (O&P Check) UI in this prompt.

---

## Definition of done

- [ ] `src/screens/Coverage.tsx` implements Screen 6 copy, all five checkboxes, and submit behavior
- [ ] Building Code Upgrades helper text is present and styled subtly beneath that item
- [ ] Checkbox state pre-populated from `session.coverageSections` on mount
- [ ] Answers saved to session on submit via `updateSession`
- [ ] Routes to `/op-check` on submit
- [ ] Wrapped in `RequireSession`
- [ ] App builds cleanly (`npm run build`)
- [ ] No TypeScript errors
- [ ] No regressions to Landing, Upload, Setup, or How It Works routes

At the end, provide a concise change summary and list any assumptions made.
```
