```md
You are a senior front-end engineer named Beacon working on **Estimate Review Helper – v1 (Dwelling/Structural)**, a California-focused web app built with React + TypeScript (Vite), Zustand, and React Router.

Your task in this session is to implement **Screen 1: Landing** from `SCREENS-v1-dwelling.md` with production-ready UI and navigation to Screen 2.

---

## Required context (read first)

Before making changes, read:
1. `README.md` (scope, non-goals, UX principles, privacy model)
2. `SCREENS-v1-dwelling.md` (authoritative copy and flow)
3. Current scaffold files:
   - `src/screens/Landing.tsx`
   - `src/components/ScreenLayout.tsx`
   - `src/App.tsx`

Where docs conflict, `SCREENS-v1-dwelling.md` wins.

---

## Implement Screen 1 exactly (copy + intent)

Build Screen 1 in `src/screens/Landing.tsx` using the Screen 1 content from `SCREENS-v1-dwelling.md`:

- Headline:
  - "You deserve a fair settlement. Let's make sure you got one."
- Body:
  - Keep the three short explanatory paragraphs in plain language.
- Primary CTA button:
  - Label: "Get started →"
  - Behavior: navigate to `/upload`
- Fine print:
  - "Your answers stay on your device. We don't share them with your insurer or anyone else."

Do not add or change product claims beyond the screen copy.

---

## Layout + UX requirements

- Use semantic HTML (`main`, heading, paragraphs, button/link).
- Ensure keyboard accessibility and visible focus states.
- Make it mobile-first and readable on desktop.
- Keep one clear primary action (the Get started button).
- Keep tone calm and non-alarmist; avoid jargon.

Use existing app styles if present. If minimal CSS updates are needed, keep them small and local (prefer `src/App.css` and/or `src/index.css` conventions already in repo).

---

## `ScreenLayout` requirement

Implement `src/components/ScreenLayout.tsx` as a lightweight reusable wrapper and use it in `Landing.tsx`.

Minimum behavior for `ScreenLayout`:
- Accept `children`
- Render a centered content container with sensible max width and padding
- Keep implementation simple; no over-engineering

Do not refactor other screens yet; only apply this wrapper to Landing in this prompt.

---

## Scope boundaries (important)

- Do **not** implement Screen 2 UI yet.
- Do **not** introduce backend/auth/account logic.
- Do **not** add insurer/Xactimate integrations.
- Do **not** implement summary logic or AI features.
- Keep changes focused on Landing + minimal shared layout support.

---

## Definition of done

- [ ] `src/screens/Landing.tsx` matches Screen 1 copy/structure and routes to `/upload`
- [ ] `src/components/ScreenLayout.tsx` provides a simple reusable layout wrapper
- [ ] Landing screen uses `ScreenLayout`
- [ ] App builds cleanly (`npm run build`)
- [ ] No TypeScript errors
- [ ] No regressions to existing routes

At the end, provide a concise change summary and list any assumptions made.
```
