import { useState } from 'react';
import PropTypes from 'prop-types';
import { useStudents } from '../context/StudentContext.jsx';

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '', courses: '' };

/**
 * Registration form for adding a new student to the roster.
 * Validates inline, adds to StudentContext on success, resets itself,
 * and tells the parent so it can show a success notification.
 */
function AddStudentForm({ onAdded }) {
  const { students, addStudent } = useStudents();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    const trimmedName = form.name.trim();
    const trimmedMajor = form.major.trim();
    const trimmedId = form.studentId.trim();

    if (!trimmedName) {
      nextErrors.name = 'Full name is required.';
    }

    if (!trimmedId) {
      nextErrors.studentId = 'Student ID is required.';
    } else if (!/^\d+$/.test(trimmedId)) {
      nextErrors.studentId = 'Student ID must contain only digits.';
    } else if (students.some((student) => String(student.id) === trimmedId)) {
      nextErrors.studentId = 'That ID is already taken.';
    }

    if (!trimmedMajor) {
      nextErrors.major = 'Major is required.';
    }

    const gpaText = form.gpa.trim();
    const gpaValue = Number(gpaText);
    if (!gpaText || Number.isNaN(gpaValue)) {
      nextErrors.gpa = 'GPA is required.';
    } else if (gpaValue < 0 || gpaValue > 4.0) {
      nextErrors.gpa = 'GPA must be between 0 and 4.0.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const trimmedName = form.name.trim();
    const courses = form.courses
      .split(',')
      .map((course) => course.trim())
      .filter(Boolean);

    addStudent({
      id: Number(form.studentId.trim()),
      name: trimmedName,
      major: form.major.trim(),
      gpa: Number(form.gpa),
      credits: 0,
      courses,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        trimmedName
      )}&backgroundColor=5b6472`,
    });

    setForm(EMPTY_FORM);
    setErrors({});
    onAdded(trimmedName);
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="student-name">Full name</label>
        <input id="student-name" value={form.name} onChange={handleChange('name')} />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="student-id">Student ID</label>
        <input id="student-id" value={form.studentId} onChange={handleChange('studentId')} />
        {errors.studentId && <p className="form-error">{errors.studentId}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="student-major">Major</label>
        <input id="student-major" value={form.major} onChange={handleChange('major')} />
        {errors.major && <p className="form-error">{errors.major}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="student-gpa">GPA</label>
        <input
          id="student-gpa"
          value={form.gpa}
          onChange={handleChange('gpa')}
          placeholder="0.0 – 4.0"
        />
        {errors.gpa && <p className="form-error">{errors.gpa}</p>}
      </div>

      <div className="form-field form-field--wide">
        <label htmlFor="student-courses">Courses (comma-separated)</label>
        <input
          id="student-courses"
          value={form.courses}
          onChange={handleChange('courses')}
          placeholder="Data Structures, Statistics"
        />
      </div>

      <button type="submit" className="form-submit">
        Add student
      </button>
    </form>
  );
}

AddStudentForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

export default AddStudentForm;
