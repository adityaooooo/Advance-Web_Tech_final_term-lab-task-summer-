import PropTypes from 'prop-types';

/**
 * A small styled pill used to display a course name in a chosen color.
 */
function CourseTag({ courseName, color }) {
  return (
    <span className="course-tag" style={{ backgroundColor: color }}>
      {courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string,
};

CourseTag.defaultProps = {
  color: '#5b6472',
};

export default CourseTag;
