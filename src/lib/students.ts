export interface Student {
  id: string;
  name: string;
  section: string;
  preMbaEmployer: string;
  targetIndustry: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  photoUrl: string;
}

export const SECTIONS = ["Ocean", "Mountain", "Desert", "Jungle", "Pilot", "River", "Forest"] as const;

const SEED_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Aisha Patel",
    section: "Ocean",
    preMbaEmployer: "McKinsey & Company",
    targetIndustry: "Tech / Product Management",
    linkedinUrl: "https://linkedin.com/in/aishapatel",
    email: "aisha.patel@sloan.mit.edu",
    phone: "+1-617-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Marcus Chen",
    section: "Mountain",
    preMbaEmployer: "Goldman Sachs",
    targetIndustry: "Venture Capital",
    linkedinUrl: "https://linkedin.com/in/marcuschen",
    email: "marcus.chen@sloan.mit.edu",
    phone: "+1-617-555-0102",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    section: "Desert",
    preMbaEmployer: "Google",
    targetIndustry: "Entrepreneurship",
    linkedinUrl: "https://linkedin.com/in/sofiarodriguez",
    email: "sofia.rodriguez@sloan.mit.edu",
    phone: "+1-617-555-0103",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "David Okonkwo",
    section: "Jungle",
    preMbaEmployer: "Deloitte",
    targetIndustry: "Healthcare",
    linkedinUrl: "https://linkedin.com/in/davidokonkwo",
    email: "david.okonkwo@sloan.mit.edu",
    phone: "+1-617-555-0104",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Emily Tanaka",
    section: "Pilot",
    preMbaEmployer: "Amazon",
    targetIndustry: "Supply Chain / Operations",
    linkedinUrl: "https://linkedin.com/in/emilytanaka",
    email: "emily.tanaka@sloan.mit.edu",
    phone: "+1-617-555-0105",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "James Wright",
    section: "Ocean",
    preMbaEmployer: "Tesla",
    targetIndustry: "Clean Energy",
    linkedinUrl: "https://linkedin.com/in/jameswright",
    email: "james.wright@sloan.mit.edu",
    phone: "+1-617-555-0106",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "7",
    name: "Priya Sharma",
    section: "Mountain",
    preMbaEmployer: "BCG",
    targetIndustry: "Private Equity",
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    email: "priya.sharma@sloan.mit.edu",
    phone: "+1-617-555-0107",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "8",
    name: "Carlos Mendez",
    section: "Desert",
    preMbaEmployer: "JPMorgan Chase",
    targetIndustry: "Fintech",
    linkedinUrl: "https://linkedin.com/in/carlosmendez",
    email: "carlos.mendez@sloan.mit.edu",
    phone: "+1-617-555-0108",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "9",
    name: "Lena Kim",
    section: "Jungle",
    preMbaEmployer: "Microsoft",
    targetIndustry: "AI / Machine Learning",
    linkedinUrl: "https://linkedin.com/in/lenakim",
    email: "lena.kim@sloan.mit.edu",
    phone: "+1-617-555-0109",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "10",
    name: "Omar Hassan",
    section: "Pilot",
    preMbaEmployer: "Bain & Company",
    targetIndustry: "Social Impact",
    linkedinUrl: "https://linkedin.com/in/omarhassan",
    email: "omar.hassan@sloan.mit.edu",
    phone: "+1-617-555-0110",
    photoUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  },
];

const STORAGE_KEY = "sloan-connect-students";

function initStorage(): Student[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_STUDENTS));
  return SEED_STUDENTS;
}

export function getStudents(): Student[] {
  return initStorage();
}

export function getStudent(id: string): Student | undefined {
  return getStudents().find((s) => s.id === id);
}

export function addStudent(student: Omit<Student, "id">): Student {
  const students = getStudents();
  const newStudent: Student = { ...student, id: Date.now().toString() };
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return newStudent;
}
