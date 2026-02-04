import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileData {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  pan_number: string | null;
  aadhar_number: string | null;
  department: string | null;
  job_title: string | null;
  employee_id: string | null;
  designation: string | null;
  joining_date: string | null;
  employment_type: string | null;
  reporting_manager: string | null;
  work_location: string | null;
  employment_status: string | null;
  emergency_contact_name: string | null;
  emergency_contact_relationship: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_alternate_phone: string | null;
  emergency_contact_address: string | null;
  bank_account_holder_name: string | null;
  bank_account_number: string | null;
  bank_name: string | null;
  bank_branch_name: string | null;
  bank_ifsc_code: string | null;
  bank_account_type: string | null;
  bank_verified: boolean | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      
      // Set email from auth user if not in profile
      setProfile({
        ...data,
        email: data.email || user.email,
      } as ProfileData);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    if (!user || !profile) return { error: new Error("No user or profile") };

    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return { error };
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = async (info: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    panNumber: string;
    aadharNumber: string;
  }) => {
    return updateProfile({
      first_name: info.firstName,
      last_name: info.lastName,
      phone: info.phone,
      date_of_birth: info.dateOfBirth || null,
      gender: info.gender,
      address: info.address,
      city: info.city,
      state: info.state,
      pincode: info.pincode,
      pan_number: info.panNumber,
      aadhar_number: info.aadharNumber,
    });
  };

  const updateEmergencyContact = async (contact: {
    name: string;
    relationship: string;
    phone: string;
    alternatePhone: string;
    address: string;
  }) => {
    return updateProfile({
      emergency_contact_name: contact.name,
      emergency_contact_relationship: contact.relationship,
      emergency_contact_phone: contact.phone,
      emergency_contact_alternate_phone: contact.alternatePhone,
      emergency_contact_address: contact.address,
    });
  };

  const updateBankDetails = async (details: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    ifscCode: string;
    accountType: string;
  }) => {
    return updateProfile({
      bank_account_holder_name: details.accountHolderName,
      bank_account_number: details.accountNumber,
      bank_name: details.bankName,
      bank_branch_name: details.branchName,
      bank_ifsc_code: details.ifscCode,
      bank_account_type: details.accountType,
    });
  };

  const updateAvatar = async (avatarUrl: string) => {
    return updateProfile({ avatar_url: avatarUrl });
  };

  return {
    profile,
    loading,
    saving,
    fetchProfile,
    updateProfile,
    updatePersonalInfo,
    updateEmergencyContact,
    updateBankDetails,
    updateAvatar,
  };
}
