import { useStudents } from '../context/StudentContext.jsx';

const OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'name', label: 'Name (A–Z)' },
  { id: 'gpa', label: 'GPA (High–Low)' },
];

/**
 * Reads and writes the sort preference straight from StudentContext.
 */
function SortControls() {
  const { sortBy, setSortBy } = useStudents();

  return (
    <div className="sort-controls" role="group" aria-label="Sort students">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`sort-controls__btn${sortBy === option.id ? ' is-active' : ''}`}
          onClick={() => setSortBy(option.id)}
          aria-pressed={sortBy === option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortControls;
