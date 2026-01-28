export interface CompanySettings {
  companyName: string;
  companyLogo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  industry: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  timezone: string;
  currency: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  leaveApprovals: boolean;
  payrollAlerts: boolean;
  attendanceReminders: boolean;
  systemUpdates: boolean;
  weeklyReports: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export const defaultCompanySettings: CompanySettings = {
  companyName: "Qonexa Technologies",
  companyLogo: "",
  address: "123 Business Park, Bangalore, Karnataka 560001",
  phone: "+91 80 1234 5678",
  email: "hr@qonexa.com",
  website: "https://qonexa.com",
  taxId: "GSTIN12345678",
  industry: "Technology",
};

export const defaultUserPreferences: UserPreferences = {
  theme: "light",
  language: "en",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "12h",
  timezone: "Asia/Kolkata",
  currency: "INR",
};

export const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  leaveApprovals: true,
  payrollAlerts: true,
  attendanceReminders: true,
  systemUpdates: false,
  weeklyReports: true,
  pushNotifications: true,
  smsNotifications: false,
};
