import { useState } from "react";
import { Briefcase, Plus, X, Calendar, Building2, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

const mockWorkHistory: WorkExperience[] = [
  {
    id: "1",
    company: "Tech Solutions Pvt Ltd",
    position: "Software Engineer",
    location: "Bangalore, Karnataka",
    startDate: "2019-06",
    endDate: "2021-02",
    isCurrent: false,
    description: "Developed and maintained web applications using React and Node.js. Led a team of 3 junior developers.",
  },
  {
    id: "2",
    company: "Digital Innovations Inc",
    position: "Junior Developer",
    location: "Hyderabad, Telangana",
    startDate: "2017-07",
    endDate: "2019-05",
    isCurrent: false,
    description: "Built RESTful APIs and integrated third-party services. Participated in agile sprints.",
  },
];

export function WorkHistoryCard() {
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(mockWorkHistory);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newExperience, setNewExperience] = useState<Omit<WorkExperience, "id">>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const resetForm = () => {
    setNewExperience({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
    setIsAdding(false);
  };

  const handleAddExperience = () => {
    if (!newExperience.company.trim() || !newExperience.position.trim() || !newExperience.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in company, position, and start date.",
        variant: "destructive",
      });
      return;
    }

    const experience: WorkExperience = {
      id: Date.now().toString(),
      ...newExperience,
      endDate: newExperience.isCurrent ? undefined : newExperience.endDate,
    };

    setWorkHistory([experience, ...workHistory]);
    resetForm();

    toast({
      title: "Experience Added",
      description: `${experience.position} at ${experience.company} has been added.`,
    });
  };

  const handleRemoveExperience = (id: string) => {
    setWorkHistory(workHistory.filter((exp) => exp.id !== id));
    toast({
      title: "Experience Removed",
      description: "Work experience has been removed.",
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
              <Briefcase className="h-5 w-5 text-primary" />
              Work History
            </CardTitle>
            <CardDescription>
              Your previous positions and work experience
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Experience Form */}
        {isAdding && (
          <div className="rounded-lg border p-4 space-y-4 bg-muted/30">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company *
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., Acme Corporation"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  placeholder="e.g., Senior Developer"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Maharashtra"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.isCurrent}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCurrent"
                checked={newExperience.isCurrent}
                onCheckedChange={(checked) => 
                  setNewExperience({ ...newExperience, isCurrent: checked === true, endDate: "" })
                }
              />
              <Label htmlFor="isCurrent" className="font-normal">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your responsibilities and achievements..."
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Work History List */}
        <div className="space-y-4">
          {workHistory.map((exp) => (
            <div
              key={exp.id}
              className="relative rounded-lg border p-4 hover:bg-muted/30 transition-colors"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveExperience(exp.id)}
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>

              <div className="pr-10 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-muted-foreground ml-11">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
          {workHistory.length === 0 && !isAdding && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No work history added yet. Click "Add Experience" to add your first entry.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
