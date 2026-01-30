import { AlertCircle, Phone, User, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone: string;
  address: string;
}

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onContactChange?: (contact: EmergencyContact) => void;
}

export function EmergencyContactCard({ contact, onContactChange }: EmergencyContactCardProps) {
  const handleSave = () => {
    toast({
      title: "Emergency Contact Updated",
      description: "Your emergency contact information has been saved.",
    });
  };

  const handleChange = (field: keyof EmergencyContact, value: string) => {
    onContactChange?.({ ...contact, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Emergency Contact
        </CardTitle>
        <CardDescription>
          Person to contact in case of emergency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Name
            </Label>
            <Input
              id="contactName"
              value={contact.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Relationship
            </Label>
            <Select
              value={contact.relationship}
              onValueChange={(value) => handleChange("relationship", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="emergencyPhone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="emergencyPhone"
              value={contact.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alternatePhone">Alternate Phone</Label>
            <Input
              id="alternatePhone"
              value={contact.alternatePhone}
              onChange={(e) => handleChange("alternatePhone", e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyAddress">Address</Label>
          <Input
            id="emergencyAddress"
            value={contact.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Contact's address"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Contact</Button>
        </div>
      </CardContent>
    </Card>
  );
}
