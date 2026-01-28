import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanySettingsCard } from "@/components/settings/CompanySettingsCard";
import { UserPreferencesCard } from "@/components/settings/UserPreferencesCard";
import { NotificationSettingsCard } from "@/components/settings/NotificationSettingsCard";
import { Settings as SettingsIcon, Building2, User, Bell } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and application preferences
            </p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
