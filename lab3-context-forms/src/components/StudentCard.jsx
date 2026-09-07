import PropTypes from 'prop-types';
import StatBadge from './StatBadge.jsx';
import CourseTag from './CourseTag.jsx';
import { getCourseColor } from '../data/students.js';
import { useStudents } from '../context/StudentContext.jsx';

/**
 * Renders a single student's summary: avatar, identity, key stats,
 * and the courses they're enrolled in. Still takes the student's own
 * fields as props (that's just normal parent → child data), but pulls
 * cross-cutting state — favorites and removal — from StudentContext
 * instead of having App drill callbacks down to it.
 */
function StudentCard({ name, id, avatar, gpa, major, credits, courses }) {
  const { favoriteIds, toggleFavorite, removeStudent } = useStudents();
  const isFavorite = favoriteIds.has(id);

  return (
    <article className="student-card">
      <div className="student-card__top">
        <img className="student-card__avatar" src={avatar} alt={`${name}'s avatar`} />
        <div>
          <p className="student-card__name">{name}</p>
          <p className="student-card__id">ID {id}</p>
        </div>
        <button
          type="button"
          className={`favorite-btn${isFavorite ? ' is-active' : ''}`}
          onClick={() => toggleFavorite(id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
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

      <button type="button" className="remove-btn" onClick={() => removeStudent(id)}>
        Remove student
      </button>
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
