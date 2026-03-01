```md
You are a senior front-end engineer named Beacon working on **Estimate Review Helper – v1 (Dwelling/Structural)**, a California-focused web app built with React + TypeScript (Vite), Zustand, and React Router.

Your task in this session is to implement **Screen 2: Upload Your Estimate** from `SCREENS-v1-dwelling.md` with production-ready UI and correct navigation into Setup.

---

## Required context (read first)

Before making changes, read:
1. `README.md` (scope, non-goals, privacy/storage model)
2. `SCREENS-v1-dwelling.md` (authoritative copy and flow)
3. Current files:
   - `src/screens/Upload.tsx`
   - `src/screens/Landing.tsx`
   - `src/components/ScreenLayout.tsx`
   - `src/store/estimateSessionStore.ts`
   - `src/types/session.ts`

Where docs conflict, `SCREENS-v1-dwelling.md` wins.

---

## Implement Screen 2 exactly (copy + behavior)

Build `src/screens/Upload.tsx` with the Screen 2 structure and language from `SCREENS-v1-dwelling.md`:

- Headline:
  - "First, upload your estimate."
- Body:
  - Keep the two explanatory paragraphs in plain language.
- Upload area text:
  - "[Tap or click to upload a PDF]"
  - "Accepted format: PDF · Max size: 20 MB"
- Primary button:
  - Label: "Upload and continue →"
- Skip option:
  - "Don't have your estimate yet? Continue without it →"
  - Include helper parenthetical: "(You can upload it later — but having it open nearby will help.)"

---

## Validation and error handling requirements

Implement client-side file validation:

1. Accept only PDF files.
2. Enforce max size 20 MB.
3. If invalid type, show this exact message:
   - "That file doesn't look like a PDF. Please try again."
4. If file exceeds limit, show this exact message:
   - "That file is too large. Try a compressed version, or contact us for help."

Implementation details:
- Use an `<input type="file">` with `accept="application/pdf,.pdf"`.
- Show error feedback in accessible text near the upload control.
- Keep keyboard accessibility and visible focus states.

---

## Session/storage behavior (v1 local-only)

When user clicks **Upload and continue →** with a valid file selected:

- Ensure there is an active session in Zustand:
  - If `session` exists, update it.
  - If `session` is `null`, create one via `createSession()`.
- Save only the file name to the session (`pdfFileName`), not the file contents.
- Navigate to `/setup`.

When user clicks **Continue without it →**:
- Navigate to `/setup` without requiring a file.

Do not implement PDF rendering in this prompt.

---

## UI and scope constraints

- Use `ScreenLayout` for consistency.
- Reuse existing shared styles/classes where practical; keep CSS changes minimal.
- Keep the screen calm, plain-language, and low-cognitive-load.

Do **not**:
- Add backend uploads or cloud storage.
- Add account/auth features.
- Build Screen 3 UI in this prompt.
- Parse PDF contents.

---

## Definition of done

- [ ] `src/screens/Upload.tsx` implements Screen 2 copy and layout
- [ ] File input validates PDF type and 20 MB limit with exact error strings
- [ ] "Upload and continue →" stores `pdfFileName` in local session and routes to `/setup`
- [ ] "Continue without it →" routes to `/setup`
- [ ] App builds cleanly (`npm run build`)
- [ ] No TypeScript errors
- [ ] No regressions to Landing route

At the end, provide a concise change summary and list assumptions.
```
