import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { StudentProvider, useStudents } from './context/StudentContext.jsx';
import DashboardHeader from './components/DashboardHeader.jsx';
import StudentCard from './components/StudentCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import SortControls from './components/SortControls.jsx';
import Spinner from './components/Spinner.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import Notification from './components/Notification.jsx';

/**
 * Everything below the providers reads its data from context, so this
 * component takes no props at all.
 */
function Dashboard() {
  const { visibleStudents, isLoading, query } = useStudents();
  const [notification, setNotification] = useState('');

  // Task 4 — auto-dismiss the success notification after 3 seconds
  useEffect(() => {
    if (!notification) return undefined;
    const timer = setTimeout(() => setNotification(''), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="A snapshot of every learner enrolled this term."
      />

      <Notification message={notification} />

      <section className="panel" aria-labelledby="add-student-heading">
        <h2 id="add-student-heading" className="panel__title">
          Add a student
        </h2>
        <AddStudentForm onAdded={(name) => setNotification(`${name} was added to the roster.`)} />
      </section>

      <div className="toolbar">
        <SearchBar />
        <SortControls />
      </div>

      {isLoading ? (
        <Spinner label="Fetching student records…" />
      ) : (
        <main id="students" className="student-grid">
          {visibleStudents.map((student) => (
            <StudentCard key={student.id} {...student} />
          ))}
          {visibleStudents.length === 0 && (
            <p className="empty-state">No students match “{query}”.</p>
          )}
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <Dashboard />
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;
