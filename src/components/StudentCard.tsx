import { Student } from "@/lib/students";
import { useNavigate } from "react-router-dom";

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/student/${student.id}`)}
      className="group flex flex-col items-center rounded-lg border border-border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-fade-in w-full"
    >
      <img
        src={student.photoUrl}
        alt={student.name}
        className="mb-3 h-20 w-20 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=A31F34&color=fff&size=200`;
        }}
      />
      <h3 className="text-sm font-semibold text-foreground">{student.name}</h3>
      <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
        {student.section}
      </span>
      <p className="mt-2 text-xs text-muted-foreground text-center">{student.targetIndustry}</p>
    </button>
  );
};

export default StudentCard;
