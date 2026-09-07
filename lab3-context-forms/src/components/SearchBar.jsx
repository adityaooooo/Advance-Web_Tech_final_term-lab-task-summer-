import { useStudents } from '../context/StudentContext.jsx';

/**
 * Reads and writes the search query straight from StudentContext —
 * no props needed, no drilling through App.
 */
function SearchBar() {
  const { query, setQuery } = useStudents();

  return (
    <label className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name or major…"
        aria-label="Search students by name or major"
      />
    </label>
  );
}

export default SearchBar;
