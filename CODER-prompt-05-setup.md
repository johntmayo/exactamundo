```md
You are a senior front-end engineer named Beacon working on **Estimate Review Helper – v1 (Dwelling/Structural)**, a California-focused web app built with React + TypeScript (Vite), Zustand, and React Router.

Your task in this session is to implement **Screen 3: Quick Setup** from `SCREENS-v1-dwelling.md` with production-ready UI.

---

## Required context (read first)

Before making changes, read:
1. `README.md` (scope, non-goals, privacy/storage model)
2. `SCREENS-v1-dwelling.md` (authoritative copy and flow)
3. Current files:
   - `src/screens/Setup.tsx`
   - `src/components/ScreenLayout.tsx`
   - `src/store/estimateSessionStore.ts`
   - `src/types/session.ts` (see `LossType` union)
   - `src/screens/Upload.tsx` (for reference on session/store patterns)

Where docs conflict, `SCREENS-v1-dwelling.md` wins.

---

## Implement Screen 3 exactly (copy + behavior)

Build `src/screens/Setup.tsx` with the Screen 3 structure from `SCREENS-v1-dwelling.md`:

**Headline:**
- "Let's get you set up."

**Question 1:**
- Label: "What caused the damage to your home?"
- Choices (radio buttons):
  - "Fire or smoke" → value: `'fire'`
  - "Wind or storm" → value: `'wind'`
  - "Water or flooding" → value: `'water'`
  - "Earthquake" → value: `'earthquake'`
  - "Something else" → value: `'other'`

**Question 2:**
- Label: "Give this review a short name so we can save your progress."
- Input type: text
- Placeholder: `e.g., "Main House Fire" or "Storm Damage 2025"`
- Helper text beneath input: "This is just for you — it stays on this device."

**Primary button:**
- Label: "Continue →"
- Behavior: save answers and navigate to `/how-it-works`

---

## Session/storage behavior — important

Setup is reachable whether or not the user uploaded a PDF. That means `session` in the Zustand store may be `null` when Setup loads (user skipped Upload).

Handle both cases:
- If `session` is `null` when the user submits: call `createSession({ nickname, lossType })`.
- If `session` already exists: call `updateSession({ nickname, lossType })`.

**Do not wrap Setup in `RequireSession`.** It is one of the screens that can create the session.

After saving, navigate to `/how-it-works`.

---

## Validation

- Require a loss type selection before the button is enabled.
- Nickname field: if left blank, default to `'Untitled Review'` on submit (do not show a hard error — just fill in the default quietly).

---

## UI and scope constraints

- Use `ScreenLayout`.
- Use existing shared CSS classes (`.panel`, `.choice`, `.label`, `.input`, `.button`, `.fine-print`, `.muted`, etc.) — no new CSS needed for this screen.
- Keep the screen calm, plain-language, and low-cognitive-load.
- Do **not** build Screen 4 (Resume) or Screen 5 (How It Works) UI in this prompt.

---

## Definition of done

- [ ] `src/screens/Setup.tsx` implements Screen 3 copy, both questions, and submit behavior
- [ ] Loss type saved as `LossType` value in session
- [ ] Nickname saved in session (defaults to `'Untitled Review'` if blank)
- [ ] Works whether session was `null` (skip path) or already existed (upload path)
- [ ] Routes to `/how-it-works` on submit
- [ ] App builds cleanly (`npm run build`)
- [ ] No TypeScript errors
- [ ] No regressions to Landing or Upload routes

At the end, provide a concise change summary and list any assumptions made.
```
