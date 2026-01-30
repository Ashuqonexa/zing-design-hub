import { useState } from "react";
import { Award, Plus, X, Star, Calendar, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
}

interface Certification {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

const proficiencyColors = {
  beginner: "bg-slate-500",
  intermediate: "bg-blue-500",
  advanced: "bg-purple-500",
  expert: "bg-green-500",
};

const proficiencyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const mockSkills: Skill[] = [
  { id: "1", name: "React", proficiency: "expert" },
  { id: "2", name: "TypeScript", proficiency: "advanced" },
  { id: "3", name: "Node.js", proficiency: "advanced" },
  { id: "4", name: "PostgreSQL", proficiency: "intermediate" },
  { id: "5", name: "AWS", proficiency: "intermediate" },
];

const mockCertifications: Certification[] = [
  {
    id: "1",
    name: "AWS Solutions Architect",
    issuingOrg: "Amazon Web Services",
    issueDate: "2023-06-15",
    expiryDate: "2026-06-15",
    credentialId: "AWS-SAA-123456",
  },
  {
    id: "2",
    name: "Professional Scrum Master I",
    issuingOrg: "Scrum.org",
    issueDate: "2022-03-20",
    credentialId: "PSM-789012",
  },
];

export function SkillsCertificationsCard() {
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications);
  
  // New skill form
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState<Skill["proficiency"]>("intermediate");
  
  // New certification form
  const [newCertName, setNewCertName] = useState("");
  const [newCertOrg, setNewCertOrg] = useState("");
  const [newCertIssueDate, setNewCertIssueDate] = useState("");
  const [newCertExpiryDate, setNewCertExpiryDate] = useState("");
  const [newCertCredentialId, setNewCertCredentialId] = useState("");

  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      toast({
        title: "Skill name required",
        description: "Please enter a skill name.",
        variant: "destructive",
      });
      return;
    }

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      proficiency: newSkillProficiency,
    };

    setSkills([...skills, newSkill]);
    setNewSkillName("");
    setNewSkillProficiency("intermediate");

    toast({
      title: "Skill Added",
      description: `${newSkill.name} has been added to your skills.`,
    });
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleAddCertification = () => {
    if (!newCertName.trim() || !newCertOrg.trim() || !newCertIssueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in certification name, issuing organization, and issue date.",
        variant: "destructive",
      });
      return;
    }

    const newCert: Certification = {
      id: Date.now().toString(),
      name: newCertName.trim(),
      issuingOrg: newCertOrg.trim(),
      issueDate: newCertIssueDate,
      expiryDate: newCertExpiryDate || undefined,
      credentialId: newCertCredentialId.trim() || undefined,
    };

    setCertifications([...certifications, newCert]);
    setNewCertName("");
    setNewCertOrg("");
    setNewCertIssueDate("");
    setNewCertExpiryDate("");
    setNewCertCredentialId("");

    toast({
      title: "Certification Added",
      description: `${newCert.name} has been added to your certifications.`,
    });
  };

  const handleRemoveCertification = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Skills & Certifications
        </CardTitle>
        <CardDescription>
          Showcase your professional skills and certifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Skills ({skills.length})</TabsTrigger>
            <TabsTrigger value="certifications">Certifications ({certifications.length})</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            {/* Add Skill Form */}
            <div className="flex gap-2 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  placeholder="e.g., Python, Project Management"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
              </div>
              <div className="w-40 space-y-2">
                <Label>Proficiency</Label>
                <Select
                  value={newSkillProficiency}
                  onValueChange={(v) => setNewSkillProficiency(v as Skill["proficiency"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center gap-2 py-1.5 px-3"
                >
                  <Star className={`h-3 w-3 ${proficiencyColors[skill.proficiency]} rounded-full`} />
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({proficiencyLabels[skill.proficiency]})
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-muted-foreground py-4">
                  No skills added yet. Add your first skill above.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            {/* Add Certification Form */}
            <div className="rounded-lg border p-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="certName">Certification Name *</Label>
                  <Input
                    id="certName"
                    placeholder="e.g., AWS Solutions Architect"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certOrg" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Issuing Organization *
                  </Label>
                  <Input
                    id="certOrg"
                    placeholder="e.g., Amazon Web Services"
                    value={newCertOrg}
                    onChange={(e) => setNewCertOrg(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="certIssueDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Issue Date *
                  </Label>
                  <Input
                    id="certIssueDate"
                    type="date"
                    value={newCertIssueDate}
                    onChange={(e) => setNewCertIssueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certExpiryDate">Expiry Date</Label>
                  <Input
                    id="certExpiryDate"
                    type="date"
                    value={newCertExpiryDate}
                    onChange={(e) => setNewCertExpiryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    placeholder="Optional"
                    value={newCertCredentialId}
                    onChange={(e) => setNewCertCredentialId(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleAddCertification}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </div>

            {/* Certifications List */}
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">{cert.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuingOrg}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Issued: {cert.issueDate}</span>
                      {cert.expiryDate && <span>Expires: {cert.expiryDate}</span>}
                      {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCertification(cert.id)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {certifications.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No certifications added yet. Add your first certification above.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
