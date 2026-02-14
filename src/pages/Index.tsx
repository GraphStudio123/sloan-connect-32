import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus } from "lucide-react";
import { getStudents } from "@/lib/students";
import StudentCard from "@/components/StudentCard";
import SloanLogo from "@/components/SloanLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const students = useMemo(() => getStudents(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.preMbaEmployer.toLowerCase().includes(q) ||
        s.targetIndustry.toLowerCase().includes(q)
    );
  }, [students, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <SloanLogo className="h-8" />
            <div>
              <h1 className="text-xl font-bold text-primary tracking-tight">Sloan Connect</h1>
              <p className="text-xs text-muted-foreground">MIT Sloan MBA Directory</p>
            </div>
          </div>
          <Button onClick={() => navigate("/add")} size="sm">
            <UserPlus className="mr-1.5 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="container py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, or industry…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Grid */}
      <main className="container pb-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No students found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((student, i) => (
              <div key={student.id} style={{ animationDelay: `${i * 40}ms` }}>
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
