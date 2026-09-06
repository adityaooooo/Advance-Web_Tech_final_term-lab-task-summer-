import PropTypes from 'prop-types';

const OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'name', label: 'Name (A–Z)' },
  { id: 'gpa', label: 'GPA (High–Low)' },
];

/**
 * Segmented control for choosing how the student list is ordered.
 */
function SortControls({ sortBy, onChange }) {
  return (
    <div className="sort-controls" role="group" aria-label="Sort students">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`sort-controls__btn${sortBy === option.id ? ' is-active' : ''}`}
          onClick={() => onChange(option.id)}
          aria-pressed={sortBy === option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

SortControls.propTypes = {
  sortBy: PropTypes.oneOf(['default', 'name', 'gpa']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortControls;
