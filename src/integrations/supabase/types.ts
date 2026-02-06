export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      employee_documents: {
        Row: {
          description: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          uploaded_at: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          description?: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          uploaded_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          description?: string | null
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          uploaded_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          date_of_joining: string
          department: string
          designation: string
          email: string
          employee_id: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          date_of_joining?: string
          department: string
          designation: string
          email: string
          employee_id: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          date_of_joining?: string
          department?: string
          designation?: string
          email?: string
          employee_id?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aadhar_number: string | null
          address: string | null
          avatar_url: string | null
          bank_account_holder_name: string | null
          bank_account_number: string | null
          bank_account_type: string | null
          bank_branch_name: string | null
          bank_ifsc_code: string | null
          bank_name: string | null
          bank_verified: boolean | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          department: string | null
          designation: string | null
          email: string | null
          emergency_contact_address: string | null
          emergency_contact_alternate_phone: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          employee_id: string | null
          employment_status: string | null
          employment_type: string | null
          first_name: string | null
          gender: string | null
          id: string
          job_title: string | null
          joining_date: string | null
          last_name: string | null
          pan_number: string | null
          phone: string | null
          pincode: string | null
          reporting_manager: string | null
          state: string | null
          updated_at: string
          user_id: string
          work_location: string | null
        }
        Insert: {
          aadhar_number?: string | null
          address?: string | null
          avatar_url?: string | null
          bank_account_holder_name?: string | null
          bank_account_number?: string | null
          bank_account_type?: string | null
          bank_branch_name?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          bank_verified?: boolean | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          emergency_contact_address?: string | null
          emergency_contact_alternate_phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employee_id?: string | null
          employment_status?: string | null
          employment_type?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          job_title?: string | null
          joining_date?: string | null
          last_name?: string | null
          pan_number?: string | null
          phone?: string | null
          pincode?: string | null
          reporting_manager?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          work_location?: string | null
        }
        Update: {
          aadhar_number?: string | null
          address?: string | null
          avatar_url?: string | null
          bank_account_holder_name?: string | null
          bank_account_number?: string | null
          bank_account_type?: string | null
          bank_branch_name?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          bank_verified?: boolean | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          emergency_contact_address?: string | null
          emergency_contact_alternate_phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employee_id?: string | null
          employment_status?: string | null
          employment_type?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          job_title?: string | null
          joining_date?: string | null
          last_name?: string | null
          pan_number?: string | null
          phone?: string | null
          pincode?: string | null
          reporting_manager?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          work_location?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
