# Lab 3 — Context & Forms

Extends Lab 2 with global state via Context, a validated Add Student
form, and localStorage persistence.

## Run it

```bash
npm install
npm run dev
```

## Where each task lives

| Task | File(s) |
|---|---|
| 1. ThemeContext (light/dark) | `src/context/ThemeContext.jsx`; toggle button in `src/components/DashboardHeader.jsx`; dark palette in `src/index.css` under `:root[data-theme='dark']` |
| 2. StudentContext & refactor | `src/context/StudentContext.jsx` holds students, query, sortBy, favorites; `SearchBar.jsx`, `SortControls.jsx`, `StudentCard.jsx`, and `DashboardHeader.jsx` all read it via `useStudents()` instead of taking those values as props |
| 3. AddStudentForm + validation | `src/components/AddStudentForm.jsx` |
| 4. Submission + notification | `addStudent()` in `StudentContext.jsx`; the 3-second auto-dismiss timer lives in `src/App.jsx` (`Dashboard` component), rendered by `src/components/Notification.jsx` |
| 5. Remove student + localStorage | `removeStudent()` and the two persistence `useEffect`s in `StudentContext.jsx`; the Remove button is in `StudentCard.jsx` |

## Design notes

- **Why context, not more props.** `StudentCard` still receives its own
  student's fields (`name`, `gpa`, etc.) as plain props from the `.map()`
  in `App.jsx` — that's ordinary parent → child data, not drilling. What
  moved into context is the *cross-cutting* state (favorites, remove,
  search, sort) that used to have to pass through `App` and every
  intermediate component just to reach a button several levels down.
- **Persistence strategy.** On first mount, `StudentProvider` reads
  `localStorage`. If a roster is already saved there, it skips the
  simulated fetch entirely and loads instantly. If not, it runs the same
  1.5s simulated fetch from Lab 2, then a second `useEffect` writes
  `students` back to `localStorage` on every change (add, remove, or the
  initial fetch landing) — so a refresh always reflects the last state.
- To start over with a clean slate, clear `localStorage` for the page
  (dev tools → Application → Local Storage) or open in a private window.
