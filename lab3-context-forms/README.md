# Lab 3 — Context & Forms



## Where each task lives

| Task | File(s) |
|---|---|
| 1. ThemeContext (light/dark) | `src/context/ThemeContext.jsx`; toggle button in `src/components/DashboardHeader.jsx`; dark palette in `src/index.css` under `:root[data-theme='dark']` |
| 2. StudentContext & refactor | `src/context/StudentContext.jsx` holds students, query, sortBy, favorites; `SearchBar.jsx`, `SortControls.jsx`, `StudentCard.jsx`, and `DashboardHeader.jsx` all read it via `useStudents()` instead of taking those values as props |
| 3. AddStudentForm + validation | `src/components/AddStudentForm.jsx` |
| 4. Submission + notification | `addStudent()` in `StudentContext.jsx`; the 3-second auto-dismiss timer lives in `src/App.jsx` (`Dashboard` component), rendered by `src/components/Notification.jsx` |
| 5. Remove student + localStorage | `removeStudent()` and the two persistence `useEffect`s in `StudentContext.jsx`; the Remove button is in `StudentCard.jsx` |

