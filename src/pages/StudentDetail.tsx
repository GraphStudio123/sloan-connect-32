import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Mail, Phone, Briefcase, Target } from "lucide-react";
import { getStudent } from "@/lib/students";
import { Button } from "@/components/ui/button";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = getStudent(id || "");

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center gap-3 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Back to Directory</h1>
        </div>
      </header>

      <main className="container max-w-lg py-8 animate-fade-in">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <img
            src={student.photoUrl}
            alt={student.name}
            className="h-28 w-28 rounded-full object-cover ring-4 ring-primary/20"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=A31F34&color=fff&size=200`;
            }}
          />
          <h2 className="mt-4 text-2xl font-bold text-foreground">{student.name}</h2>
          <span className="mt-1.5 inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {student.section}
          </span>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-4 rounded-lg border border-border bg-card p-5">
          <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Pre-MBA Employer" value={student.preMbaEmployer} />
          <InfoRow icon={<Target className="h-4 w-4" />} label="Target Industry" value={student.targetIndustry} />
          <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={student.email} />
          <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={student.phone} />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {student.linkedinUrl && (
            <Button asChild className="flex-1" variant="default">
              <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </a>
            </Button>
          )}
          <Button asChild className="flex-1" variant="outline">
            <a href={`mailto:${student.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email Classmate
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default StudentDetail;
