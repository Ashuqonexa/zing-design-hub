import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Save, Mail, Smartphone, MessageSquare } from "lucide-react";
import { NotificationSettings, defaultNotificationSettings } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

interface NotificationItemProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

function NotificationItem({ id, label, description, checked, onCheckedChange, icon }: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
        <div className="space-y-0.5">
          <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export function NotificationSettingsCard() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Control how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">Notification Channels</h4>
          <div className="bg-muted/50 rounded-lg px-4">
            <NotificationItem
              id="emailNotifications"
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
              icon={<Mail className="h-4 w-4" />}
            />
            <NotificationItem
              id="pushNotifications"
              label="Push Notifications"
              description="Receive browser push notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleChange("pushNotifications", checked)}
              icon={<Bell className="h-4 w-4" />}
            />
            <NotificationItem
              id="smsNotifications"
              label="SMS Notifications"
              description="Receive important alerts via SMS"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleChange("smsNotifications", checked)}
              icon={<Smartphone className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">Notification Types</h4>
          <div className="bg-muted/50 rounded-lg px-4">
            <NotificationItem
              id="leaveApprovals"
              label="Leave Approvals"
              description="Get notified when leave requests are approved or rejected"
              checked={settings.leaveApprovals}
              onCheckedChange={(checked) => handleChange("leaveApprovals", checked)}
            />
            <NotificationItem
              id="payrollAlerts"
              label="Payroll Alerts"
              description="Receive alerts about salary processing and payslips"
              checked={settings.payrollAlerts}
              onCheckedChange={(checked) => handleChange("payrollAlerts", checked)}
            />
            <NotificationItem
              id="attendanceReminders"
              label="Attendance Reminders"
              description="Daily reminders to clock in and out"
              checked={settings.attendanceReminders}
              onCheckedChange={(checked) => handleChange("attendanceReminders", checked)}
            />
            <NotificationItem
              id="weeklyReports"
              label="Weekly Reports"
              description="Receive weekly summary reports every Monday"
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => handleChange("weeklyReports", checked)}
            />
            <NotificationItem
              id="systemUpdates"
              label="System Updates"
              description="Get notified about new features and updates"
              checked={settings.systemUpdates}
              onCheckedChange={(checked) => handleChange("systemUpdates", checked)}
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
