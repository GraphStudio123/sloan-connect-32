import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { addStudent, SECTIONS } from "@/lib/students";
import SloanLogo from "@/components/SloanLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AddStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    section: "",
    preMbaEmployer: "",
    targetIndustry: "",
    linkedinUrl: "",
    email: "",
    phone: "",
    photoUrl: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.section || !form.email) {
      toast({ title: "Missing fields", description: "Name, section, and email are required.", variant: "destructive" });
      return;
    }
    addStudent(form);
    toast({ title: "Profile saved!", description: `${form.name} has been added to the directory.` });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center gap-3 py-4">
          <SloanLogo className="h-8" />
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Add to Cohort</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container max-w-lg space-y-5 py-6">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
        </div>

        <div className="space-y-1.5">
          <Label>Section *</Label>
          <Select value={form.section} onValueChange={(v) => update("section", v)}>
            <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
            <SelectContent>
              {SECTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="employer">Pre-MBA Employer</Label>
          <Input id="employer" value={form.preMbaEmployer} onChange={(e) => update("preMbaEmployer", e.target.value)} placeholder="Company name" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="industry">Target Industry</Label>
          <Input id="industry" value={form.targetIndustry} onChange={(e) => update("targetIndustry", e.target.value)} placeholder="e.g. Tech / Product" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" type="url" value={form.linkedinUrl} onChange={(e) => update("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/…" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@sloan.mit.edu" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1-617-555-0000" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="photo">Photo URL</Label>
          <Input id="photo" type="url" value={form.photoUrl} onChange={(e) => update("photoUrl", e.target.value)} placeholder="https://…" />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default AddStudent;
