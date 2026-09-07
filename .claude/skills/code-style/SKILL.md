---
name: code-style
description: DRY and KISS conventions for this kiosk codebase - where reusable logic lives and how to keep components thin. Load before adding non-trivial logic to a component or service.
---

# Code style: DRY and KISS

This is a small Create React App kiosk display. Keep it simple and keep logic out of components.

## Where logic goes

- **`src/components/<Name>/index.jsx`** — rendering only. A component should fetch data (via a service + `useQuery`) and hand it to helpers; it should not contain parsing, formatting, filtering, or "pick the right item" logic inline. If a component needs more than a couple of one-line expressions to prepare data for JSX, that logic belongs in a helper.
- **`src/utils/`** — pure, reusable functions with no React and no side effects (formatting, parsing, selection logic). One concern per file (e.g. `formatTime.js`, `events.js`). Anything reusable across more than one component, or that has edge cases worth unit-testing in isolation, belongs here.
- **`src/services/*.service.js`** — the only place `axios`/network calls happen. Services fetch and return data; they don't format or filter it for display.
- **`src/lib/constants.js`** — static config (URLs, ids, per-hub data). No logic.
- **`src/custom_hooks/`** — stateful React hooks (subscriptions, timers, anything using `useState`/`useEffect`).

## DRY

- If the same formatting/parsing shows up in a second place, move it to `src/utils/` immediately rather than copy-pasting — don't wait for a third occurrence in a codebase this size.
- Don't wrap a single obvious expression in a named helper just to have a helper. DRY is about not repeating logic, not about avoiding inline code entirely.

## KISS

- Prefer a plain function over a class, hook, or abstraction layer unless React state/lifecycle is actually needed.
- A helper should do one thing (parse a timestamp, format a time, pick an event) — don't fold unrelated concerns into one function.
- Components should always render *something* sensible — prefer a helper that returns a safe default (e.g. `selectEvent` always returns an event object) over conditionally rendering "empty" states in the component.
