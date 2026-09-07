import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { initialStudents } from '../data/students.js';

const STORAGE_KEY = 'student-dashboard:students';

const StudentContext = createContext(undefined);

function readStoredStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Single source of truth for the roster, search query, sort order,
 * and favorites — everything that used to be prop-drilled through App.
 */
export function StudentProvider({ children }) {
  const [students, setStudents] = useState(readStoredStudents);
  const [isLoading, setIsLoading] = useState(() => readStoredStudents().length === 0);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  // Task 5 (carried over fetch simulation from Lab 2) — only "fetch" when
  // nothing was rehydrated from localStorage.
  useEffect(() => {
    if (students.length > 0) {
      setIsLoading(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
    // Intentionally empty deps: this simulated fetch should only ever run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Task 5 — persist the roster on every change, rehydrated above on load.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // Storage may be unavailable (private browsing, quota) — safe to ignore.
    }
  }, [students]);

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

  const addStudent = (student) => {
    setStudents((current) => [...current, student]);
  };

  const removeStudent = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id));
    setFavoriteIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

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
    return sorted;
  }, [students, query, sortBy]);

  const averageGpa = students.length
    ? students.reduce((sum, student) => sum + student.gpa, 0) / students.length
    : 0;

  const value = useMemo(
    () => ({
      students,
      visibleStudents,
      isLoading,
      query,
      setQuery,
      sortBy,
      setSortBy,
      favoriteIds,
      toggleFavorite,
      addStudent,
      removeStudent,
      averageGpa,
    }),
    [students, visibleStudents, isLoading, query, sortBy, favoriteIds, averageGpa]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used inside a <StudentProvider>.');
  }
  return context;
}
