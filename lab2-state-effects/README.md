# Lab 2 — State & Effects


## Where each task lives

| Task | File(s) |
|---|---|
| 1. Simulated API fetch + spinner | `src/App.jsx` (`useState`/`useEffect` + `setTimeout`), `src/components/Spinner.jsx` |
| 2. Live search | `src/components/SearchBar.jsx`, filtering logic in `src/App.jsx` (`visibleStudents`) |
| 3. Favorite toggle & state lifting | `src/App.jsx` owns `favoriteIds` (a `Set`) and `toggleFavorite`; passed down to `StudentCard.jsx` as `isFavorite`/`onToggleFavorite`, and the count flows to `DashboardHeader.jsx` |
| 4. Dynamic document title | `useEffect` in `src/App.jsx`, keyed on the visible student count |
| 5. Sort controls | `src/components/SortControls.jsx`, applied in `src/App.jsx` before render |


