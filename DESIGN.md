# Design Philosophy — Estimate Review Helper

This document consolidates the design intent, visual language, tone rules, and accessibility expectations for the app. It is the single reference for any agent or engineer making UI, copy, or styling decisions.

For screen-level copy and flow, see `SCREENS-v1-dwelling.md`.  
For data model and engineering scope, see `README.md`.

---

## 1. Who we're designing for

The primary user is a homeowner or renter who has just experienced a major property loss — fire, flood, windstorm, earthquake. They are likely:

- **Stressed and overwhelmed.** They may be displaced, grieving, or exhausted from weeks of claim logistics.
- **Non-technical.** They have never read a construction estimate before and do not know trade terminology.
- **On a phone or borrowed laptop.** Screen size and input precision cannot be assumed.
- **Low on trust.** They may feel the system is not working in their favor. The app must never reinforce that feeling.

The goal is not just usability — it is **emotional safety**. Every screen should leave the user feeling: *"I've got this. I know what to ask about."*

---

## 2. Trauma-informed design principles

This app is explicitly **trauma-informed**. That means every design and copy decision must pass these filters:

| Principle | What it means in practice |
|---|---|
| **Reduce cognitive load** | One screen, one task. Minimal choices. No multi-step reasoning required to answer a question. |
| **No jargon** | Never use insurance or construction terms without an inline plain-language explanation. |
| **Supportive, not blaming** | Error states and helper text should reassure, not scold. The user did nothing wrong. |
| **Validate uncertainty** | "I'm not sure" is always a valid answer. It generates a gentle flag in the summary, not a warning. |
| **Calm, not alarming** | Even when the app surfaces a potential gap in coverage, the tone is informational and empowering — never urgent, scary, or legalistic. |
| **Respect autonomy** | The app is a guide, not a judge. It helps the user form questions, not conclusions. |
| **Privacy as care** | Data stays on the device by default. The explanation is simple and reassuring: "Your answers stay on your device." |

---

## 3. Tone and copy rules

**Overall tone:** Calm, validating, non-alarmist, plain language.

### Do / Don't examples

| Don't | Do |
|---|---|
| "Error: invalid input." | "That doesn't look quite right — try entering just the number." |
| "WARNING: O&P missing!" | "We didn't see Overhead & Profit listed. This is something worth asking your adjuster about." |
| "You failed to upload a PDF." | "No PDF yet — that's okay. You can add one later, or continue without." |
| "Your estimate is deficient in…" | "Based on your answers, here are some things worth bringing up…" |
| "N/A" or "No issues found." | "Based on your answers, no major gaps stood out. If something still feels off, trust that instinct — come back and add notes at any time." |

### Copy guidelines

- **Sentence case** for all headings and buttons (not Title Case or ALL CAPS).
- **Short paragraphs.** Two to three sentences maximum per block.
- **Direct address.** Say "your estimate," "your home," "your adjuster" — not "the estimate" or "the policyholder."
- **Active voice.** "We'll guide you" not "You will be guided."
- **No exclamation marks** in body copy. They feel performative under stress.
- **Contractions are fine.** "You don't need to know" reads warmer than "You do not need to know."

---

## 4. Visual design system

### 4.1 Palette rationale

The palette is intentionally warm and grounded. Cold blues and clinical whites feel institutional — exactly the wrong tone for someone dealing with an insurer. Instead:

- **Warm stone neutrals** (`stone-100` through `stone-900`) for backgrounds, text, and borders. Feels like paper, not software.
- **Deep warm blue** (`#1e3a5f`) for primary actions. Authoritative and trustworthy without being corporate or cold.
- **Warm amber** (`amber-50` / `amber-200` / `amber-800`) for tips and encouraging nudges. Soft and inviting — draws attention without alarm.
- **Soft blue** (`#eff6ff` / `#bfdbfe` / `#1e3a8a`) for neutral informational callouts. Calm context, no urgency.
- **Red** (`danger-*` tokens) reserved strictly for destructive actions (e.g., "Delete all my data"). Never used for user input errors or missing answers.
- **Green** (`success-*` tokens) for positive confirmation only (e.g., save indicators).

### 4.2 Typography rationale

- **Lora** (serif) for headings. Serif type feels human, literary, and approachable — more like a letter than a software interface. It signals "someone is talking to you," not "a system is processing you."
- **Inter** (sans-serif) for body text. Highly legible at small sizes, optimized for screens, neutral enough to stay out of the way.
- **Base size: ~17px** (`1.0625rem`). Larger than the typical 16px default because the user may be reading on a phone in poor conditions, fatigued, or older.
- **Line height: 1.72.** Generous leading improves readability for longer passages and reduces the feeling of density.

### 4.3 Spacing and shape

- **Rounded corners** (`0.625rem` default, `0.875rem` for cards). Softness signals approachability.
- **Generous padding** on buttons (`0.72rem 1.25rem` default, larger for primary CTAs). Big tap targets for stressed, imprecise tapping.
- **Max content width: 680px.** Keeps line lengths comfortable and avoids overwhelming horizontal space.
- **Subtle shadows** (`0 1px 2px rgba(0,0,0,0.04)` on cards). Present but quiet — structure without weight.
- **Smooth transitions** (`cubic-bezier(0.4, 0, 0.2, 1)`). Nothing snaps or jolts. Movement is calm.

---

## 5. Component usage guide

### Buttons

| Class | When to use |
|---|---|
| `.button.primary` | The single main action on a screen ("Get started," "Continue," "Next"). One per screen. |
| `.button` (default) | Secondary actions like "Back" or "Skip for now." |
| `.button.subtle` | Low-emphasis actions within a panel. |
| `.button.danger` | Destructive actions only (delete data). Never for validation or warnings. |
| `.link-button` | Inline text-level actions ("Learn more," "Edit"). |

### Callouts

| Class | When to use |
|---|---|
| `.tip` (amber) | Encouraging nudges and helpful suggestions. Warm tone. Example: "Look for notes in that section — good estimates explain their assumptions." |
| `.tip.info` (blue) | Neutral context or factual background. No action required. Example: "Overhead & Profit is typically around 10% each." |
| `.danger-callout` (red) | Data-loss warnings only. Never for missing answers or coverage gaps. |

### Form controls

- **Radio/checkbox groups (`.choice`)**: Use for Yes / No / I'm not sure patterns. "I'm not sure" must always be present where the user is being asked about their estimate.
- **Text areas (`.textarea`)**: For optional notes the user can add. Always optional — never require free-text input.
- **Labels (`.label`)**: Always visible. No placeholder-only inputs.

### Panels

- **`.panel`** (white, subtle shadow): Primary content cards for question groups.
- **`.panel.nested`** (stone background, no shadow): Sub-sections within a panel.

---

## 6. Accessibility targets

**Target: WCAG 2.1 AA compliance.**

### Requirements

- **Color contrast:** All text meets 4.5:1 against its background (3:1 for large text). The stone palette was chosen with this in mind — verify any new color combinations.
- **Keyboard navigation:** Every interactive element must be reachable and operable via keyboard. Tab order must follow visual order.
- **Focus visibility:** All focusable elements use a visible `3px solid` focus ring (`:focus-visible`). Never suppress or hide focus indicators.
- **Screen reader support:** Use semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<fieldset>`, `<legend>`). All images need `alt` text. All icon-only buttons need `aria-label`. Use `.sr-only` for screen-reader-only context.
- **Form labels:** Every input must have an associated `<label>` or `aria-label`. No placeholder-as-label patterns.
- **Touch targets:** Minimum 44x44px for all interactive elements (buttons, checkboxes, radio inputs, links).
- **Motion:** Transitions are short (200ms) and use `prefers-reduced-motion` media query where applicable. No animations that convey meaning — they are decorative only.
- **Language:** `lang="en"` on the HTML root. Plain language (aim for 6th–8th grade reading level).

---

## 7. Patterns to preserve

These patterns are defined in `SCREENS-v1-dwelling.md` under "Global UI Notes" and must be maintained across all screens:

- **Progress indicator** on every checklist screen. Shows section name and step count.
- **Back button** always visible. Never destroys prior answers.
- **"I'm not sure" option** on every estimate-related question. Generates a soft summary flag, not a warning.
- **Auto-save indicator**: small, unobtrusive — "Progress saved on this device ✓"
- **PDF viewer**: side-by-side on desktop, toggle bottom sheet on mobile.
- **Fine print / disclaimer** on landing and summary screens. Clearly states the tool is not legal advice.

---

## 8. The north star

When in doubt about any design decision, ask:

> *Would a stressed, grieving, non-technical homeowner feel calmer and more capable after seeing this screen — or more overwhelmed?*

If the answer is "more overwhelmed," simplify.
