// Maps a course name to a pill color so the same course always
// reads the same way wherever it appears on the dashboard.
export const courseColors = {
  'Data Structures': '#3B5BA5',
  Algorithms: '#3B5BA5',
  'Calculus II': '#7A4FB5',
  'Linear Algebra': '#7A4FB5',
  'Organic Chemistry': '#B5533B',
  Thermodynamics: '#B5533B',
  'Database Systems': '#2E8B6E',
  'Operating Systems': '#2E8B6E',
  Microeconomics: '#C9A227',
  'World History': '#8A6D3B',
  Statistics: '#3B5BA5',
  'Digital Logic': '#2E8B6E',
};

export const getCourseColor = (name) => courseColors[name] || '#5B6472';

export const initialStudents = [
  {
    id: 1042,
    name: 'Amara Chowdhury',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Amara%20Chowdhury&backgroundColor=3B5BA5',
    major: 'Computer Science',
    gpa: 3.8,
    credits: 96,
    courses: ['Data Structures', 'Algorithms', 'Database Systems'],
  },
  {
    id: 1078,
    name: 'Rafiq Islam',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Rafiq%20Islam&backgroundColor=7A4FB5',
    major: 'Mathematics',
    gpa: 3.4,
    credits: 88,
    courses: ['Calculus II', 'Linear Algebra', 'Statistics'],
  },
  {
    id: 1103,
    name: 'Nadia Rahman',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Nadia%20Rahman&backgroundColor=B5533B',
    major: 'Chemical Engineering',
    gpa: 3.95,
    credits: 102,
    courses: ['Organic Chemistry', 'Thermodynamics'],
  },
  {
    id: 1119,
    name: 'Tanvir Ahmed',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Tanvir%20Ahmed&backgroundColor=2E8B6E',
    major: 'Computer Science',
    gpa: 3.1,
    credits: 74,
    courses: ['Operating Systems', 'Digital Logic', 'Database Systems'],
  },
  {
    id: 1140,
    name: 'Farah Hossain',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Farah%20Hossain&backgroundColor=C9A227',
    major: 'Economics',
    gpa: 3.6,
    credits: 90,
    courses: ['Microeconomics', 'Statistics', 'World History'],
  },
];
