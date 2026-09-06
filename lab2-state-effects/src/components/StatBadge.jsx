import PropTypes from 'prop-types';

/**
 * Generic label/value pair, e.g. "GPA — 3.8" or "Credits — 90".
 * `compact` renders it inline for tight spaces like a student card.
 */
function StatBadge({ label, value, compact }) {
  return (
    <div className={`stat-badge${compact ? ' stat-badge--compact' : ''}`}>
      <span className="stat-badge__label">{label}</span>
      <span className="stat-badge__value">{value}</span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  compact: PropTypes.bool,
};

StatBadge.defaultProps = {
  compact: false,
};

export default StatBadge;
