import PropTypes from 'prop-types';
import StatBadge from './StatBadge.jsx';
import CourseTag from './CourseTag.jsx';
import { getCourseColor } from '../data/students.js';

/**
 * Renders a single student's summary: avatar, identity, key stats,
 * and the courses they're enrolled in.
 */
function StudentCard({ name, id, avatar, gpa, major, credits, courses }) {
  return (
    <article className="student-card">
      <div className="student-card__top">
        <img className="student-card__avatar" src={avatar} alt={`${name}'s avatar`} />
        <div>
          <p className="student-card__name">{name}</p>
          <p className="student-card__id">ID {id}</p>
        </div>
      </div>

      <p className="student-card__major">{major}</p>

      <div className="student-card__stats">
        <StatBadge label="GPA" value={gpa.toFixed(2)} compact />
        <StatBadge label="Credits" value={credits} compact />
      </div>

      <div className="student-card__courses">
        {courses.map((course) => (
          <CourseTag key={course} courseName={course} color={getCourseColor(course)} />
        ))}
      </div>
    </article>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  credits: PropTypes.number,
  courses: PropTypes.arrayOf(PropTypes.string),
};

StudentCard.defaultProps = {
  credits: 0,
  courses: [],
};

export default StudentCard;
