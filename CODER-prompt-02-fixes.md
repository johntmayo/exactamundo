You are a senior front-end engineer working on **Estimate Review Helper – v1 (Dwelling/Structural)**, a California-focused web app built with React + TypeScript (Vite) and Zustand.

Two bugs were found in the scaffold you built. Fix both before any screen implementation begins.

---

## Fix 1 — Add missing system check IDs to `SYSTEM_CHECK_IDS`

**File:** `src/types/session.ts`

**Problem:** `SYSTEM_CHECK_IDS` is missing two items that appear in Screen 8 of the UX spec (`SCREENS-v1-dwelling.md`) under the "Exterior and Site" group:
- Landscaping
- Trees and Shrubs

**Fix:** Add `'landscaping'` and `'trees-and-shrubs'` to the `SYSTEM_CHECK_IDS` array, between `'retaining-walls'` and `'antenna-satellite-dish'`.

---

## Fix 2 — Add session hydration on app startup

**Problem:** The Zustand store (`src/store/estimateSessionStore.ts`) initializes with `session: null`. The storage layer already has `getLastActiveSessionId()` and `loadSession()`, but nothing calls them when the app first loads. A page refresh wipes the store even though data is in localStorage.

**Fix — Part A:** Add a `hydrateSession` action to the Zustand store in `src/store/estimateSessionStore.ts`.

The action should:
1. Call `getLastActiveSessionId()` from storage.
2. If an ID is found, call `loadSession(id)` from storage and set `session` in the store.
3. If no ID is found or the session cannot be loaded, leave `session` as `null`.
4. Return the loaded session (or `null`) so the caller can decide where to route.

**Fix — Part B:** Call `hydrateSession` once on app mount in `src/App.tsx`.

Use a `useEffect` with an empty dependency array. After hydration, do not force any navigation — just let the store be populated. Routing decisions (e.g., showing Resume vs. Landing) are handled by individual screens.

**Fix — Part C:** Give `RequireSession` real logic in `src/components/RequireSession.tsx`.

It should:
1. Read `session` from the Zustand store.
2. If `session` is `null`, redirect to `/` using React Router's `<Navigate>`.
3. If `session` is present, render `children`.

This component will be used to wrap routes that require an active session (e.g., `/coverage`, `/op-check`, `/systems`, and all subsequent screens). Do not apply it to routes yet — just implement the component correctly.

---

## Definition of done

- [ ] `'landscaping'` and `'trees-and-shrubs'` present in `SYSTEM_CHECK_IDS` in the correct position
- [ ] `hydrateSession` action added to the Zustand store
- [ ] `hydrateSession` called on mount in `App.tsx`
- [ ] `RequireSession` redirects to `/` when `session === null`, renders children otherwise
- [ ] Project still runs (`npm run dev`) without errors
- [ ] No TypeScript errors
