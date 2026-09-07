import PropTypes from 'prop-types';

/**
 * Small inline loading indicator shown while student data
 * is "in flight" from the simulated API call.
 */
function Spinner({ label }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__circle" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

Spinner.propTypes = {
  label: PropTypes.string,
};

Spinner.defaultProps = {
  label: 'Loading students…',
};

export default Spinner;
