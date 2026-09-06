import { useEffect, useMemo, useState } from 'react';
import DashboardHeader from './components/DashboardHeader.jsx';
import StudentCard from './components/StudentCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import SortControls from './components/SortControls.jsx';
import Spinner from './components/Spinner.jsx';
import { initialStudents } from './data/students.js';

function App() {
  // Task 1 — simulated API fetch
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (!isCancelled) {
        setStudents(initialStudents);
        setIsLoading(false);
      }
    }, 1500);

    // Cleanup: cancel the "in-flight" request if the component unmounts
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Task 2 — live search
  const [query, setQuery] = useState('');

  // Task 3 — favorites, lifted from StudentCard up to App
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  const toggleFavorite = (id) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Task 5 — sort preference
  const [sortBy, setSortBy] = useState('default');

  const visibleStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = normalizedQuery
      ? students.filter(
          (student) =>
            student.name.toLowerCase().includes(normalizedQuery) ||
            student.major.toLowerCase().includes(normalizedQuery)
        )
      : students;

    const sorted = [...filtered];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'gpa') {
      sorted.sort((a, b) => b.gpa - a.gpa);
    }
    // 'default' keeps the original fetch order — no sort needed

    return sorted;
  }, [students, query, sortBy]);

  // Task 4 — dynamic document title
  useEffect(() => {
    if (isLoading) {
      document.title = 'Dashboard — Loading…';
      return;
    }
    const count = visibleStudents.length;
    document.title = `Dashboard — ${count} Student${count === 1 ? '' : 's'}`;
  }, [visibleStudents.length, isLoading]);

  const averageGpa = students.length
    ? students.reduce((sum, student) => sum + student.gpa, 0) / students.length
    : 0;

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="A snapshot of every learner enrolled this term."
        totalStudents={students.length}
        averageGpa={averageGpa}
        favoritesCount={favoriteIds.size}
      />

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <SortControls sortBy={sortBy} onChange={setSortBy} />
      </div>

      {isLoading ? (
        <Spinner label="Fetching student records…" />
      ) : (
        <main id="students" className="student-grid">
          {visibleStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              credits={student.credits}
              courses={student.courses}
              isFavorite={favoriteIds.has(student.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
          {visibleStudents.length === 0 && (
            <p className="empty-state">No students match “{query}”.</p>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
