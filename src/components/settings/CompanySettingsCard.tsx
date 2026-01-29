import { Building2, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CompanySettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Company Information
        </CardTitle>
        <CardDescription>
          Manage your company's basic information and branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" defaultValue="Qonexa Technologies Pvt. Ltd." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNo">Registration Number</Label>
            <Input id="registrationNo" defaultValue="U72200MH2020PTC123456" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </Label>
          <Textarea 
            id="address" 
            defaultValue="123 Business Park, Sector 5, Gurugram, Haryana - 122001, India"
            rows={2}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </Label>
            <Input id="phone" defaultValue="+91 124 456 7890" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input id="email" type="email" defaultValue="hr@qonexa.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </Label>
          <Input id="website" defaultValue="https://www.qonexa.com" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gst">GST Number</Label>
            <Input id="gst" defaultValue="27AAACC1234D1ZH" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input id="pan" defaultValue="AAACC1234D" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
