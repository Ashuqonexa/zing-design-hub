import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, Bell, Shield } from "lucide-react";
import { CompanySettingsCard } from "@/components/settings/CompanySettingsCard";
import { UserPreferencesCard } from "@/components/settings/UserPreferencesCard";
import { NotificationSettingsCard } from "@/components/settings/NotificationSettingsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your company and personal preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <CompanySettingsCard />
          </TabsContent>

          <TabsContent value="preferences">
            <UserPreferencesCard />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettingsCard />
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Section */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Change Password</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => handleSave("password")}>
                    Update Password
                  </Button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                {/* Session Management */}
                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-base font-medium">Active Sessions</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Chrome on Windows</p>
                        <p className="text-xs text-muted-foreground">Last active: Just now • Mumbai, India</p>
                      </div>
                      <span className="text-xs text-primary font-medium">Current</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Safari on iPhone</p>
                        <p className="text-xs text-muted-foreground">Last active: 2 hours ago • Delhi, India</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    Sign Out All Other Sessions
                  </Button>
                </div>

                {/* Login Alerts */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSave("security")}>Save Security Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
