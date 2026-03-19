## Understanding re-rendering cycle

State change
   ↓
Render Phase (calculate)
   ↓
Diffing (compare)
   ↓
Commit Phase (update DOM)
   ↓
UI updated


- Component re-renders when
  - State change
  - props change
  - context change
  - parent re-renders
  - if we use redux then when store updates


React doesn’t check “did UI change?”
It checks “did something possibly change?”

## Unnecessary re-renders
    - When parent rerenders, child re-renders
    - when we pass object, array or functions as a prop. On every re-render a new object is created
    - State placed too high
    - Context overuse
    - State update that does not update state

## Solution to unnecessary re-renders
    - Child re-rendering - use React.memo
    - Function prop Changing -  use useCallback hook
    - Array/Object prop changing - use useMemo hook
    - Move state down to the specific component
    - Split the bix context to smaller ones

    👉 Value → useMemo
    👉 Function → useCallback
    👉 Component → React.memo


## Component lifecycle
    - Mount → Update → Update → Update → Unmount
  - Mount phase
    - React calls your component → Creates DOM → Shows UI
  - Updating Phase (Re-render)
    - Prop change, state change, etc
  - Unmounting Phase (Component removed)
    - Route change, conditional rendering, etc
  - In functional component `useEffect` can be used to handle all phases
  - React renders first → updates UI → THEN runs `useEffect`
  - Cleanup function runs to clean up the previous effect before the next effect runs and when the component unmounts, preventing memory leaks and stale data.

```
useEffect(() => {
    // mount and update phase
    return () => {
        // unmount phasse
    }
}, [dependencies]);

```

## Rules to check if the DOM changes
    - If element change then full change
      - div -> span
    - If any property changed then it will change only that property in the real DOM
      - like className of a button
    - If any key changed for a list
      - then it will change only the element with that particular key, not the whole list
    - Thats why we dont use index as keys because index can change if we add a value at first position of the list
    - Thats why we can use key on a child componenet also, so if any value change in parent, and we are not sending that value as prop to child and we want to re-render the child then we can set a key on the child component.
  
```
items.map(item => (
  <li key={item.id}>{item.name}</li>
));

```

## Keys rules
    - React compares the keys of 2 component to check if update is required.
    - If keys are same, no update of the component.
    - Even if keys are same, the props sent to the component can be changed.




    # 🚀 REACT ADVANCED ROADMAP

## 📌 Goal

Become a **production-ready React developer** (not just tutorial-level)

---

# 🧱 PHASE 1: DEEP REACT FUNDAMENTALS (1–2 weeks)

* Understand rendering cycle (VERY IMPORTANT)
* Re-renders (why & when)
* Virtual DOM vs Real DOM
* Component lifecycle (mental model)
* Controlled vs uncontrolled components
* Keys & reconciliation.
* Reconciliation algorithm (how React decides what changed)

✅ Task:

* Build a form-heavy app (login + validation)

---

# ⚛️ PHASE 2: ADVANCED REACT PATTERNS (2–3 weeks)

* Custom Hooks (must master)
* Compound Components
* Render Props
* Context API (proper usage)
* State colocation vs global state
* Prop drilling vs alternatives

✅ Task:

* Build reusable UI components library

---

# 🧠 PHASE 3: STATE MANAGEMENT (2 weeks)

1. Context + useReducer
2. Redux Toolkit (industry standard)
   OR Zustand (modern lightweight)

Focus:

* When to use global state
* Avoid over-engineering

✅ Task:

* Add global state to previous project

---

# ⚡ PHASE 4: PERFORMANCE OPTIMIZATION (2 weeks)

* React.memo
* useMemo & useCallback
* Avoid unnecessary re-renders
* Code splitting (lazy + Suspense)
* React DevTools profiling

Advanced:

* Concurrent rendering basics
* Hydration understanding

✅ Task:

* Optimize an existing project (measure before/after)

---

# 🌐 PHASE 5: NEXT.JS (MUST) (2–3 weeks)

* Routing (App Router)
* Server Components
* SSR / SSG
* API Routes
* Data fetching patterns

✅ Task:

* Convert a React app into Next.js

---

# 🧪 PHASE 6: TESTING (1–2 weeks)

* Jest (unit testing)
* React Testing Library
* Basic E2E (Cypress / Playwright)

✅ Task:

* Add tests to your project

---

# 🧰 PHASE 7: TOOLING & DEV ENV

* Vite
* ESLint + Prettier
* Git (branching, PRs)
* npm / pnpm

---

# 🧩 PHASE 8: JAVASCRIPT (CRITICAL)

* Closures
* Event loop
* Promises & async/await
* Debounce / throttle
* Array methods (map, reduce, filter)
* Object references vs primitives

✅ Rule:
Weak JavaScript = Weak React

---

# 🔗 PHASE 9: BACKEND BASICS (2–3 weeks)

* REST APIs
* Fetch / Axios
* Authentication (JWT)
* Node.js basics
* Database basics

✅ Task:

* Build full-stack mini app

---

# 🤖 PHASE 10: AI-ASSISTED DEVELOPMENT

* Use AI to:

  * Generate components
  * Refactor code
* Learn:

  * Prompting
  * Code review mindset

Rule:
AI helps you write code, not think.

---

# 🎯 PHASE 11: PROJECTS (MOST IMPORTANT)

Build 3–4 real-world apps:

1. E-commerce app
2. Dashboard (charts + auth)
3. Real-time app (chat / notifications)
4. SaaS-style app

Requirements:

* API integration
* Authentication
* Clean folder structure
* Performance optimization

---

# 📅 WEEKLY STRUCTURE

Mon–Wed:

* Learn concepts

Thu–Fri:

* Apply in project

Weekend:

* Build + debug + improve

---

# 🧠 FINAL RULES

* Don’t just watch tutorials → BUILD
* Don’t memorize → UNDERSTAND
* Don’t depend on AI → VERIFY AI
* Think like an engineer, not a coder

---

# 🏁 END GOAL

You should be able to:

* Build scalable React apps
* Debug production issues
* Optimize performance
* Design architecture
* Use AI effectively

---

🔥 If you complete this properly → you're ahead of 80–90% developers
