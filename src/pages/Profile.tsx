import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProfilePhotoCard } from "@/components/profile/ProfilePhotoCard";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { EmploymentInfoCard } from "@/components/profile/EmploymentInfoCard";
import { EmergencyContactCard } from "@/components/profile/EmergencyContactCard";
import { BankDetailsCard } from "@/components/profile/BankDetailsCard";
import { DocumentUploadCard } from "@/components/profile/DocumentUploadCard";
import { SkillsCertificationsCard } from "@/components/profile/SkillsCertificationsCard";
import { WorkHistoryCard } from "@/components/profile/WorkHistoryCard";
import { EducationHistoryCard } from "@/components/profile/EducationHistoryCard";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Profile() {
  const {
    profile,
    loading,
    saving,
    updatePersonalInfo,
    updateEmergencyContact,
    updateBankDetails,
    updateAvatar,
  } = useProfile();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const personalInfo = {
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    dateOfBirth: profile?.date_of_birth || "",
    gender: profile?.gender || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    pincode: profile?.pincode || "",
    panNumber: profile?.pan_number || "",
    aadharNumber: profile?.aadhar_number || "",
  };

  const emergencyContact = {
    name: profile?.emergency_contact_name || "",
    relationship: profile?.emergency_contact_relationship || "",
    phone: profile?.emergency_contact_phone || "",
    alternatePhone: profile?.emergency_contact_alternate_phone || "",
    address: profile?.emergency_contact_address || "",
  };

  const bankDetails = {
    accountHolderName: profile?.bank_account_holder_name || "",
    accountNumber: profile?.bank_account_number || "",
    confirmAccountNumber: profile?.bank_account_number || "",
    bankName: profile?.bank_name || "",
    branchName: profile?.bank_branch_name || "",
    ifscCode: profile?.bank_ifsc_code || "",
    accountType: profile?.bank_account_type || "",
    isVerified: profile?.bank_verified || false,
  };

  const employmentInfo = {
    employeeId: profile?.employee_id || "Not assigned",
    department: profile?.department || "Not assigned",
    designation: profile?.designation || profile?.job_title || "Not assigned",
    joiningDate: profile?.joining_date || new Date().toISOString().split("T")[0],
    employmentType: profile?.employment_type || "Full-time",
    reportingManager: profile?.reporting_manager || "Not assigned",
    workLocation: profile?.work_location || "Not assigned",
    status: (profile?.employment_status as "active" | "on-leave" | "inactive") || "active",
  };

  const fullName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "User";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">
            View and manage your personal information
          </p>
        </div>

        {/* Profile Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Photo */}
          <div className="lg:col-span-1">
            <ProfilePhotoCard
              currentPhoto={profile?.avatar_url || undefined}
              name={fullName}
              onPhotoChange={updateAvatar}
              saving={saving}
            />
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard
              info={personalInfo}
              onSave={updatePersonalInfo}
              saving={saving}
            />
            <EmploymentInfoCard info={employmentInfo} />
            <EmergencyContactCard
              contact={emergencyContact}
              onSave={updateEmergencyContact}
              saving={saving}
            />
            <BankDetailsCard
              details={bankDetails}
              onSave={updateBankDetails}
              saving={saving}
            />
            <WorkHistoryCard />
            <EducationHistoryCard />
            <DocumentUploadCard />
            <SkillsCertificationsCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
