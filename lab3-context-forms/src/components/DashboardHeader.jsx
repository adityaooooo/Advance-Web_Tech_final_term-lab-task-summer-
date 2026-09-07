import PropTypes from 'prop-types';
import StatBadge from './StatBadge.jsx';
import { useStudents } from '../context/StudentContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * Top banner: title, tagline, stats, nav, and the theme toggle.
 * Stats and theme come from context now instead of being drilled
 * down from App as props.
 */
function DashboardHeader({ title, tagline }) {
  const { students, averageGpa, favoriteIds } = useStudents();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-header">
      <div>
        <h1 className="dashboard-header__title">{title}</h1>
        <p className="dashboard-header__tagline">{tagline}</p>
        <div className="dashboard-header__stats">
          <StatBadge label="Students" value={students.length} />
          <StatBadge label="Average GPA" value={averageGpa.toFixed(2)} />
          <StatBadge label="Favorites" value={favoriteIds.size} />
        </div>
      </div>

      <div className="dashboard-header__right">
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

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
};

DashboardHeader.defaultProps = {
  tagline: '',
};

export default DashboardHeader;
