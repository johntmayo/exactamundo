# Estimate Review Helper – Engineer Brief (v1)

## 1. Overview

**Goal:**
Build a luddite-friendly web app that helps homeowners review property damage repair/rebuild estimates (often Xactimate-style PDFs) and identify items to question or add, without requiring them to understand estimating software or insurance jargon.

**High-level value proposition:**

- User uploads an estimate PDF.
- App walks them through a plain-language, room-by-room and system-by-system checklist inspired by United Policyholders (UP) guidance.
- App generates an editable summary ("issues to raise with your adjuster/insurer") that the user can copy into an email or letter.

No direct integration with insurer systems or Xactimate is required for v1.

---

## 2. Users and Context

**Primary user:**

- Homeowner or renter after a major loss (fire, wind, water, etc.).
- Stressed, overwhelmed, often non-technical; may be on a laptop or phone.
- Typically has a PDF estimate emailed or downloaded from their insurer or contractor.

**Key constraints:**

- Must be **extremely simple** and low-friction; minimal signup friction.
- Must reduce cognitive load, not add to it.
- Must feel empowering: "I've got this; I know what to ask about."

---

## 3. v1 Scope

### 3.1 Core User Flow

1. **Landing / Intro**
   - Brief explanation of purpose: "Help you review your repair estimate step-by-step, in plain language."
   - Clear reassurance: no connection to insurer; user in control.

2. **Upload Estimate**
   - Upload PDF from device.
   - Basic validation (PDF only, size limit, friendly error messages).
   - Optional embedded viewer so user can see the PDF while answering questions.

3. **Quick Setup**
   - Ask:
     - Type of loss (e.g., fire, wind, water, "other").
     - Short nickname for this estimate (e.g., "Main House Fire") for local saving.

4. **Area Selection**
   - Show a checklist of common areas:
     - Kitchen, Living Room, Bedrooms, Bathrooms, Garage, Roof/Exterior, Other interior, Other exterior.
   - User selects which areas are relevant to their estimate.

5. **Room-by-Room Checklist**

   For each selected area, show a short sequence (5–8) of very simple questions, e.g.:

   - Floors: "Did this room have anything special (hardwood, stone, custom tile, radiant heat)?"
   - Walls/ceiling: "Any special finishes (crown molding, wainscoting, custom paint)?"
   - Built-ins: "Any built-in cabinets, shelves, benches, or desks?"
   - Windows/doors: "Any large or specialty windows or doors?"
   - Fixtures: "Any special light fixtures, fans, or other permanent fixtures?"

   UX details:
   - Mostly yes/no with optional short text fields when "Yes."
   - Single, focused question per screen on mobile.

6. **Global "Common Issues" Checklist**

   Short checklist of cross-cutting issues:

   - "Has anyone talked to you about building code upgrades (bringing things up to current code)?"
   - "Is your home in an area where construction tends to be more expensive or harder to access?"
   - "Are you planning to rebuild the same home, or something different?"
   - "Is there anything you know is missing from the estimate already?"

7. **Summary Generation**

   - Combine user inputs into a structured list of points, grouped by area and by global issues.
   - Present as a plain-language, editable text block the user can copy/paste.
   - Example output:

   ```text
   Kitchen
   - Custom tile backsplash and built-in pantry shelving may not be fully listed in the estimate.
   - Please confirm these items are included in demolition and replacement.

   Whole house / general
   - Please confirm whether required code upgrades (electrical, insulation, etc.) are included.
   ```

8. **Export / Save**
   - Let users:
     - Copy text to clipboard.
     - Download as a `.txt` or `.md` file.
   - Auto-save progress locally so they can come back later.

---

## 4. Non-Goals for v1

- No direct integration with insurers, Xactimate, or other claim systems.
- No dollar calculations or automated "underpayment" judgments.
- No user accounts required (optional later).
- No attempt to be a full legal or public-adjuster-level advising tool.

---

## 5. Technical Approach (Proposed)

### 5.1 Platform & Stack

- **App type:** Single-page web application.
- **Front-end:**
  - React or another mainstream framework (e.g., Vue or Svelte) — dev can choose, but React is fine.
  - TypeScript strongly preferred for maintainability.
- **Backend:**
  - v1 can be front-end-only with no user accounts: all data stored in browser `localStorage` or `IndexedDB`.
  - If a backend is needed (for file storage, telemetry, or future accounts), a lightweight Node/Express or serverless approach is fine.

### 5.2 Data Model (v1)

At minimum, per "estimate session":

```ts
EstimateSession {
  id: string;               // UUID
  nickname: string;         // "Main House Fire"
  lossType: 'fire' | 'wind' | 'water' | 'other';
  areas: AreaSelection[];   // which rooms/areas selected
  answersByArea: {
    [areaId: string]: AreaAnswers;
  };
  globalAnswers: GlobalAnswers;
  createdAt: string;
  updatedAt: string;
}
```

`AreaAnswers` and `GlobalAnswers` are small, schema-defined objects mirroring the checklists.

**Storage:**
- `localStorage` or `IndexedDB` keyed by `EstimateSession.id`.
- Optional "last active session" key for quick resume.

### 5.3 PDF Handling (v1)

- Treat PDF primarily as a **viewing aid**, not a structured data source.
- Use a client-side PDF viewer component (e.g., PDF.js wrapper) to show the document alongside questions.
- No need to OCR or parse line items in v1.

This keeps the implementation simple and robust against template variations across carriers.

---

## 6. Saving & Privacy

### 6.1 Saving Behavior

Auto-save to device as soon as the user:

- Uploads a PDF, OR
- Answers the first question.

On returning to the site with existing sessions, show:

- "Continue a previous review" (list by nickname & date).
- "Start a new review."

### 6.2 Privacy Model

- By default, all data stays on the device (`localStorage` / `IndexedDB`).
- Clear, non-technical explanation on first use:
  - *"Your answers are saved on this device so you don't lose your work. You can erase them at any time."*
- A **"Delete all my data from this device"** button in Settings.
- Later, an optional account system could sync sessions to the cloud, but v1 should not depend on it.

---

## 7. AI Usage (v1)

AI is "nice to have," not required to ship v1. If used, it should:

- Only post-process the **summary text**, not make coverage or underpayment determinations.
- Take a simple, structured payload (areas + bullet points) and return a cleaned-up, user-friendly narrative.
- Always keep the user in control: show the AI-generated draft with a clear option to edit before copying/sending.

The app should function fully without AI in case of outages or cost constraints.

---

## 8. UX & Content Principles

- Use plain English; avoid jargon like "scope of loss" or "OH&P," or explain it inline in very simple terms.
- One screen, one task.
- Large tap targets and readable fonts for older or stressed users.
- Mobile-first design; many users will be on phones.
- Accessibility: color-contrast compliant, keyboard navigable, screen-reader friendly.
- Tone: calm, non-alarmist, validating. The app is a guide, not a judge.

---

## 9. Success Criteria for v1

**Qualitative:**

A non-technical homeowner can:

- Upload a PDF.
- Complete the guided questions in 10–20 minutes.
- Walk away with a concrete list of 5–20 points to raise with their adjuster/insurer.
- Report feeling "more confident" about discussing their estimate.

**Technical:**

- No required backend or login for basic use.
- Works on current versions of Chrome, Safari, Firefox, Edge, and mobile browsers.
- Handles PDF files up to a reasonable size (e.g., 10–20 MB) without crashing.

---

## 10. Open Questions for Engineer Input

1. **Framework choice:** any strong preference (React vs. others) given maintainability and hiring market?
2. **State management:** simple React state + Context vs. a library (e.g., Redux, Zustand) given multi-step flow?
3. **PDF UX:** best approach for side-by-side view on desktop and simple toggle on mobile.
4. **Future-proofing for AI:** how to structure the data model so adding an AI summarization endpoint later is straightforward.
5. **Telemetry:** minimal, privacy-respecting analytics (e.g., completion rates per step) without collecting personal claim details.

---

## 11. Next Steps

1. Review this brief with engineering lead.
2. Confirm/adjust stack, storage approach, and PDF viewer choice.
3. Create a simple click-through prototype (even static) to validate flow and wording with a few real users or UP advisors.
4. Then move into implementation of v1.
#   e x a c t a m u n d o  
 