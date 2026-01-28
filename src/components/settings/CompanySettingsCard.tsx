import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Save } from "lucide-react";
import { CompanySettings, defaultCompanySettings } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Consulting",
  "Other",
];

export function CompanySettingsCard() {
  const [settings, setSettings] = useState<CompanySettings>(defaultCompanySettings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof CompanySettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Settings Saved",
      description: "Company settings have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Information
        </CardTitle>
        <CardDescription>
          Manage your company's basic information and branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select
              value={settings.industry}
              onValueChange={(value) => handleChange("industry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter company address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter company email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={settings.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="Enter website URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / GSTIN</Label>
            <Input
              id="taxId"
              value={settings.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              placeholder="Enter tax identification number"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
