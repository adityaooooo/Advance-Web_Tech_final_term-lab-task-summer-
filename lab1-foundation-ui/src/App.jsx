import DashboardHeader from './components/DashboardHeader.jsx';
import StudentCard from './components/StudentCard.jsx';
import { initialStudents } from './data/students.js';

function App() {
  const students = initialStudents;
  const averageGpa =
    students.reduce((sum, student) => sum + student.gpa, 0) / students.length;

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="A snapshot of every learner enrolled this term."
        totalStudents={students.length}
        averageGpa={averageGpa}
      />

      <main id="students" className="student-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            id={student.id}
            avatar={student.avatar}
            gpa={student.gpa}
            major={student.major}
            credits={student.credits}
            courses={student.courses}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
