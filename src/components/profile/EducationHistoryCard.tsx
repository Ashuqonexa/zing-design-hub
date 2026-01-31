import { useState } from "react";
import { GraduationCap, Plus, X, Calendar, Building2, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  grade?: string;
  description?: string;
}

const degreeTypes = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "MBA",
  "Diploma",
  "Certificate",
  "Other",
] as const;

const mockEducation: Education[] = [
  {
    id: "1",
    institution: "Indian Institute of Technology, Delhi",
    degree: "Bachelor's Degree",
    fieldOfStudy: "Computer Science & Engineering",
    startDate: "2013-07",
    endDate: "2017-05",
    isCurrent: false,
    grade: "8.5 CGPA",
    description: "Specialized in software engineering and machine learning.",
  },
  {
    id: "2",
    institution: "Delhi Public School, R.K. Puram",
    degree: "High School Diploma",
    fieldOfStudy: "Science (PCM)",
    startDate: "2011-04",
    endDate: "2013-03",
    isCurrent: false,
    grade: "95%",
  },
];

export function EducationHistoryCard() {
  const [education, setEducation] = useState<Education[]>(mockEducation);
  const [isAdding, setIsAdding] = useState(false);

  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
    description: "",
  });

  const resetForm = () => {
    setNewEducation({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      grade: "",
      description: "",
    });
    setIsAdding(false);
  };

  const handleAddEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree || !newEducation.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in institution, degree, and start date.",
        variant: "destructive",
      });
      return;
    }

    const edu: Education = {
      id: Date.now().toString(),
      ...newEducation,
      endDate: newEducation.isCurrent ? undefined : newEducation.endDate,
      grade: newEducation.grade?.trim() || undefined,
      description: newEducation.description?.trim() || undefined,
    };

    setEducation([edu, ...education]);
    resetForm();

    toast({
      title: "Education Added",
      description: `${edu.degree} from ${edu.institution} has been added.`,
    });
  };

  const handleRemoveEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
    toast({
      title: "Education Removed",
      description: "Education entry has been removed.",
    });
  };

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
            <CardDescription>
              Your academic qualifications and degrees
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Education Form */}
        {isAdding && (
          <div className="rounded-lg border p-4 space-y-4 bg-muted/30">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="institution" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Institution *
                </Label>
                <Input
                  id="institution"
                  placeholder="e.g., University of Delhi"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree *</Label>
                <Select
                  value={newEducation.degree}
                  onValueChange={(value) => setNewEducation({ ...newEducation, degree: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Field of Study
                </Label>
                <Input
                  id="fieldOfStudy"
                  placeholder="e.g., Computer Science"
                  value={newEducation.fieldOfStudy}
                  onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade / GPA</Label>
                <Input
                  id="grade"
                  placeholder="e.g., 8.5 CGPA or 85%"
                  value={newEducation.grade}
                  onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="eduStartDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date *
                </Label>
                <Input
                  id="eduStartDate"
                  type="month"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eduEndDate">End Date</Label>
                <Input
                  id="eduEndDate"
                  type="month"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  disabled={newEducation.isCurrent}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="eduIsCurrent"
                checked={newEducation.isCurrent}
                onCheckedChange={(checked) =>
                  setNewEducation({ ...newEducation, isCurrent: checked === true, endDate: "" })
                }
              />
              <Label htmlFor="eduIsCurrent" className="font-normal">
                I am currently studying here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eduDescription">Description</Label>
              <Textarea
                id="eduDescription"
                placeholder="Achievements, activities, or relevant coursework..."
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddEducation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Education List */}
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="relative rounded-lg border p-4 hover:bg-muted/30 transition-colors"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveEducation(edu.id)}
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>

              <div className="pr-10 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    {edu.fieldOfStudy && (
                      <p className="text-sm text-muted-foreground">{edu.fieldOfStudy}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(edu.startDate)} — {edu.isCurrent ? "Present" : edu.endDate ? formatDate(edu.endDate) : "N/A"}
                      </span>
                      {edu.grade && (
                        <span className="font-medium text-primary">
                          Grade: {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm text-muted-foreground ml-11">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
          {education.length === 0 && !isAdding && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No education history added yet. Click "Add Education" to add your first entry.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
