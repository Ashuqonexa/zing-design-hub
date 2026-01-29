import { Bell, Mail, Smartphone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function NotificationSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Choose how and when you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Label className="text-base font-medium">Email Notifications</Label>
          </div>
          
          <div className="ml-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Leave Request Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when leave requests are approved or rejected</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Payroll Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive salary slip and payment notifications</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Attendance Alerts</Label>
                <p className="text-sm text-muted-foreground">Daily attendance reminders and late notifications</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">Receive weekly HR summary report</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <Label className="text-base font-medium">Push Notifications</Label>
          </div>
          
          <div className="ml-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">Show desktop notifications for important updates</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Clock-in Reminders</Label>
                <p className="text-sm text-muted-foreground">Remind to clock in at work hours</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Meeting Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify 15 minutes before scheduled meetings</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        {/* In-App Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Label className="text-base font-medium">In-App Notifications</Label>
          </div>
          
          <div className="ml-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Announcements</Label>
                <p className="text-sm text-muted-foreground">Company announcements and updates</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Task Assignments</Label>
                <p className="text-sm text-muted-foreground">Notifications for new task assignments</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Team Updates</Label>
                <p className="text-sm text-muted-foreground">Updates from your team and department</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Notification Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
