# Lab 2 — State & Effects

Extends Lab 1 with interactivity: a simulated fetch, live search, sorting,
and a favorites count lifted up to the header.

## Run it

```bash
npm install
npm run dev
```

## Where each task lives

| Task | File(s) |
|---|---|
| 1. Simulated API fetch + spinner | `src/App.jsx` (`useState`/`useEffect` + `setTimeout`), `src/components/Spinner.jsx` |
| 2. Live search | `src/components/SearchBar.jsx`, filtering logic in `src/App.jsx` (`visibleStudents`) |
| 3. Favorite toggle & state lifting | `src/App.jsx` owns `favoriteIds` (a `Set`) and `toggleFavorite`; passed down to `StudentCard.jsx` as `isFavorite`/`onToggleFavorite`, and the count flows to `DashboardHeader.jsx` |
| 4. Dynamic document title | `useEffect` in `src/App.jsx`, keyed on the visible student count |
| 5. Sort controls | `src/components/SortControls.jsx`, applied in `src/App.jsx` before render |

## A note on task 3

The brief describes local `useState` inside the card *and* lifting state to
`App`. Keeping the boolean in two places at once invites the two copies
drifting out of sync, so this implementation uses a single source of truth:
`App` holds the `Set` of favorite ids, and `StudentCard` is a controlled
component driven by the `isFavorite` prop. That's the actual point of the
"state lifting" topic this lab is teaching — one owner, shared down.
