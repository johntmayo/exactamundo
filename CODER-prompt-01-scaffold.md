You are a senior front-end engineer working on a project called **Estimate Review Helper – v1 (Dwelling/Structural)**. This is a California-focused, luddite-friendly web app that helps homeowners review insurance repair/rebuild estimates (Xactimate-style PDFs) and generate a plain-language list of questions to raise with their adjuster.

Internal workflow note: this coding agent may be referred to as **Beacon** in Shepherd handoffs and status notes.

Your job in this session is to do the pre-build groundwork: make two stack decisions, update the README to match the authoritative screen spec, and scaffold the project. Do not build any UI screens yet.

---

## The project documents

The project has two source-of-truth documents. Read both before doing anything:

1. `README.md` — engineer brief covering architecture, data model, privacy model, and non-goals. **Warning:** the flow section (§3.1) and data model (§5.2) are out of date and need to be updated as part of this task (see below).

2. `SCREENS-v1-dwelling.md` — the authoritative screen-by-screen UX copy and flow, 14 screens total. Where README and SCREENS conflict, SCREENS wins.

---

## Task 1: Make and record two stack decisions

Add a new section to `README.md` called **§5.0 Stack Decisions** (insert it before §5.1) recording these choices:

- **Framework:** React + TypeScript (Vite)
- **State management:** Zustand

For state management, note the reason: the flow has 14 screens, multi-room answer state, and back-navigation — simple React Context would become unwieldy.

---

## Task 2: Fix README §3.1 — update the flow to match SCREENS

Replace the current 8-step flow list in README §3.1 with the correct 14-screen flow from `SCREENS-v1-dwelling.md`:

1. Landing
2. Upload Estimate
3. Quick Setup
4. Resume (returning users only)
5. How to Use This Tool
6. Coverage Sections check
7. Overhead & Profit check
8. Systems Check (grouped trade checklist)
9. Room Selection
10. Room Checklist (repeated per room)
11. Site and Access questions
12. Global Issues checklist
13. Summary (editable, exportable)
14. Settings

---

## Task 3: Fix README §5.2 — extend the data model

Replace the current `EstimateSession` type in README §5.2 with this extended version:

```ts
EstimateSession {
  id: string;                         // UUID
  nickname: string;                   // e.g. "Main House Fire"
  lossType: 'fire' | 'wind' | 'water' | 'earthquake' | 'other';
  coverageSections: CoverageSectionAnswers;
  opCheck: OPCheckAnswer;
  systemsCheck: SystemsCheckAnswers;
  areas: AreaSelection[];
  answersByArea: {
    [areaId: string]: AreaAnswers;
  };
  siteAndAccess: SiteAccessAnswers;
  globalAnswers: GlobalAnswers;
  pdfFileName?: string;               // optional; PDF is not stored, just the name
  createdAt: string;
  updatedAt: string;
}
```

Add a brief note that `CoverageSectionAnswers`, `OPCheckAnswer`, `SystemsCheckAnswers`, `SiteAccessAnswers`, and `GlobalAnswers` are small schema-defined objects mirroring their respective screens. Full TypeScript definitions will be implemented in code.

---

## Task 4: Scaffold the project

Set up the project in this repository with the following structure:

```
/src
  /store          — Zustand store (estimateSession slice)
  /types          — TypeScript types for EstimateSession and all answer shapes
  /screens        — one file per screen (empty components for now)
  /components     — shared UI components (empty for now)
  /lib
    storage.ts    — localStorage read/write wrapper for EstimateSession
  App.tsx         — routing shell (React Router or similar)
  main.tsx
```

- Implement the full `EstimateSession` TypeScript type and all sub-types in `/src/types`.
- Implement the Zustand store with `createSession`, `updateSession`, and `loadSession` actions.
- Implement the `storage.ts` localStorage wrapper (save, load, list all sessions, delete by id, delete all).
- Leave all screen components as empty stubs — just the file and a placeholder export. Do not build any UI yet.
- Wire up auto-save: whenever the Zustand store's session state changes, write to localStorage automatically.

---

## Definition of done for this session

- [ ] README §5.0 added with stack decisions
- [ ] README §3.1 updated to 14-screen flow
- [ ] README §5.2 updated with extended data model
- [ ] Project scaffolded with the directory structure above
- [ ] Full TypeScript types implemented in `/src/types`
- [ ] Zustand store implemented with auto-save to localStorage
- [ ] `storage.ts` wrapper implemented
- [ ] All 14 screen stub files created in `/src/screens`
- [ ] Project runs (`npm run dev`) without errors
