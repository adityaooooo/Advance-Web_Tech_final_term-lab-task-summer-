import PropTypes from 'prop-types';

/**
 * Success toast. App owns the auto-dismiss timer; this component
 * just renders (or doesn't) based on whether there's a message.
 */
function Notification({ message }) {
  if (!message) return null;

  return (
    <div className="notification" role="status">
      {message}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: '',
};

export default Notification;
