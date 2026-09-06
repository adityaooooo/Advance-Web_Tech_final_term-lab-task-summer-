import PropTypes from 'prop-types';
import StatBadge from './StatBadge.jsx';

/**
 * Top banner: title, tagline, primary nav, and a strip of
 * roll-up stats reusing the same StatBadge shown on each card.
 */
function DashboardHeader({ title, tagline, totalStudents, averageGpa, favoritesCount }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1 className="dashboard-header__title">{title}</h1>
        <p className="dashboard-header__tagline">{tagline}</p>
        <div className="dashboard-header__stats">
          <StatBadge label="Students" value={totalStudents} />
          <StatBadge label="Average GPA" value={averageGpa.toFixed(2)} />
          <StatBadge label="Favorites" value={favoritesCount} />
        </div>
      </div>

      <nav>
        <ul className="dashboard-header__nav">
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#students">Students</a>
          </li>
          <li>
            <a href="#courses">Courses</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  totalStudents: PropTypes.number.isRequired,
  averageGpa: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number,
};

DashboardHeader.defaultProps = {
  tagline: '',
  favoritesCount: 0,
};

export default DashboardHeader;
