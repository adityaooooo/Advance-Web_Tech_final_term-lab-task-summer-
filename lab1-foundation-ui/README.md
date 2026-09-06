# Lab 1 — Foundation UI

Static Student Dashboard built from reusable components.

| Task | File(s) |
|---|---|
| 1. StudentCard | `src/components/StudentCard.jsx` (5 students in `src/data/students.js`) |
| 2. CourseTag | `src/components/CourseTag.jsx`, used inside `StudentCard.jsx` |
| 3. StatBadge | `src/components/StatBadge.jsx` — reused in `StudentCard.jsx` (GPA, Credits) and `DashboardHeader.jsx` (Students, Average GPA) |
| 4. DashboardHeader & styling | `src/components/DashboardHeader.jsx`, tokens in `src/index.css` (`:root` block has 20+ custom properties covering color, type, spacing) |
| 5. App composition & PropTypes | `src/App.jsx`; every component file has a matching `propTypes` block |

## Notes

- Avatars are generated on the fly from initials via the DiceBear API (`api.dicebear.com`) — no local images needed, but you'll need internet access when the page loads them.
- `getCourseColor()` in `src/data/students.js` maps a course name to a consistent pill color wherever it's used.
