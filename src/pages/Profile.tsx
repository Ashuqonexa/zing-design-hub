import { useState } from "react";
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
export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@qonexa.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1992-05-15",
    gender: "male",
    address: "123 Sector 15, DLF Phase 2",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122001",
    panNumber: "ABCPS1234K",
    aadharNumber: "1234 5678 9012",
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: "Sunita Sharma",
    relationship: "spouse",
    phone: "+91 98765 12345",
    alternatePhone: "",
    address: "123 Sector 15, DLF Phase 2, Gurugram",
  });

  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "Amit Sharma",
    accountNumber: "1234567890123456",
    confirmAccountNumber: "1234567890123456",
    bankName: "HDFC Bank",
    branchName: "Sector 15, Gurugram",
    ifscCode: "HDFC0001234",
    accountType: "Savings",
    isVerified: true,
  });

  const employmentInfo = {
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Senior Software Engineer",
    joiningDate: "2021-03-15",
    employmentType: "Full-time",
    reportingManager: "Priya Patel",
    workLocation: "Gurugram Office",
    status: "active" as const,
  };

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
              currentPhoto="https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
              name={`${personalInfo.firstName} ${personalInfo.lastName}`}
              onPhotoChange={(url) => console.log("Photo changed:", url)}
            />
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard
              info={personalInfo}
              onInfoChange={setPersonalInfo}
            />
            <EmploymentInfoCard info={employmentInfo} />
            <EmergencyContactCard
              contact={emergencyContact}
              onContactChange={setEmergencyContact}
            />
            <BankDetailsCard
              details={bankDetails}
              onDetailsChange={setBankDetails}
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
