import PropTypes from 'prop-types';

/**
 * Controlled search input. The parent owns the query string so it
 * can derive the filtered student list from it.
 */
function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or major…"
        aria-label="Search students by name or major"
      />
    </label>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
