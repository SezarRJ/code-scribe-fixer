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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_project_scores: {
        Row: {
          ai_insights: Json | null
          badge_level: string | null
          business_model_score: number | null
          calculated_at: string
          created_at: string
          financial_health_score: number | null
          id: string
          innovation_score: number | null
          market_potential_score: number | null
          overall_score: number | null
          recommendations: string[] | null
          risk_assessment_score: number | null
          startup_id: string
          team_execution_score: number | null
        }
        Insert: {
          ai_insights?: Json | null
          badge_level?: string | null
          business_model_score?: number | null
          calculated_at?: string
          created_at?: string
          financial_health_score?: number | null
          id?: string
          innovation_score?: number | null
          market_potential_score?: number | null
          overall_score?: number | null
          recommendations?: string[] | null
          risk_assessment_score?: number | null
          startup_id: string
          team_execution_score?: number | null
        }
        Update: {
          ai_insights?: Json | null
          badge_level?: string | null
          business_model_score?: number | null
          calculated_at?: string
          created_at?: string
          financial_health_score?: number | null
          id?: string
          innovation_score?: number | null
          market_potential_score?: number | null
          overall_score?: number | null
          recommendations?: string[] | null
          risk_assessment_score?: number | null
          startup_id?: string
          team_execution_score?: number | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      data_room_access_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          data_room_id: string
          id: string
          investor_id: string
          nda_document_url: string | null
          nda_signed_at: string | null
          requested_at: string
          status: Database["public"]["Enums"]["verification_status"] | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          data_room_id: string
          id?: string
          investor_id: string
          nda_document_url?: string | null
          nda_signed_at?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          data_room_id?: string
          id?: string
          investor_id?: string
          nda_document_url?: string | null
          nda_signed_at?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_data_room_access_room"
            columns: ["data_room_id"]
            isOneToOne: false
            referencedRelation: "data_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      data_room_documents: {
        Row: {
          created_at: string
          data_room_id: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          data_room_id: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          data_room_id?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_data_room_documents_room"
            columns: ["data_room_id"]
            isOneToOne: false
            referencedRelation: "data_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      data_rooms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          startup_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          startup_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          startup_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      investor_profiles: {
        Row: {
          accreditation_verified: boolean | null
          company_fund_name: string | null
          created_at: string
          geographic_focus: string[] | null
          id: string
          investor_type: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website: string | null
          preferred_industries: string[] | null
          preferred_stages:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max: number | null
          ticket_size_min: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accreditation_verified?: boolean | null
          company_fund_name?: string | null
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website?: string | null
          preferred_industries?: string[] | null
          preferred_stages?:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accreditation_verified?: boolean | null
          company_fund_name?: string | null
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website?: string | null
          preferred_industries?: string[] | null
          preferred_stages?:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          connection_id: string
          content: string | null
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          is_read: boolean | null
          meeting_link: string | null
          meeting_time: string | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          connection_id: string
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean | null
          meeting_link?: string | null
          meeting_time?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          connection_id?: string
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean | null
          meeting_link?: string | null
          meeting_time?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_messages_connection"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "connections"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_event_participants: {
        Row: {
          event_id: string
          id: string
          is_presenter: boolean | null
          registered_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          is_presenter?: boolean | null
          registered_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          is_presenter?: boolean | null
          registered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pitch_participants_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "pitch_events"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number | null
          event_date: string
          event_type: Database["public"]["Enums"]["event_type"] | null
          id: string
          is_active: boolean | null
          max_participants: number | null
          meeting_link: string | null
          registration_deadline: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number | null
          event_date: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          meeting_link?: string | null
          registration_deadline?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number | null
          event_date?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          meeting_link?: string | null
          registration_deadline?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          phone: string | null
          preferred_language: string | null
          profile_image_url: string | null
          trust_score: number | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      service_provider_profiles: {
        Row: {
          business_license_verified: boolean | null
          company_name: string
          created_at: string
          id: string
          portfolio_website: string | null
          service_type: string | null
          target_clients: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          business_license_verified?: boolean | null
          company_name: string
          created_at?: string
          id?: string
          portfolio_website?: string | null
          service_type?: string | null
          target_clients?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          business_license_verified?: boolean | null
          company_name?: string
          created_at?: string
          id?: string
          portfolio_website?: string | null
          service_type?: string | null
          target_clients?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      startup_profiles: {
        Row: {
          country_incorporation: string | null
          created_at: string
          funding_needed: number | null
          funding_raised: number | null
          id: string
          industry: string | null
          pitch_deck_url: string | null
          stage: Database["public"]["Enums"]["startup_stage"] | null
          startup_name: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          country_incorporation?: string | null
          created_at?: string
          funding_needed?: number | null
          funding_raised?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          stage?: Database["public"]["Enums"]["startup_stage"] | null
          startup_name: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          country_incorporation?: string | null
          created_at?: string
          funding_needed?: number | null
          funding_raised?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          stage?: Database["public"]["Enums"]["startup_stage"] | null
          startup_name?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          is_active: boolean | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          starts_at: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          starts_at?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          starts_at?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_url: string
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_url: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_url?: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string
          user_id?: string
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
      connection_status: "pending" | "accepted" | "declined"
      document_type:
        | "government_registration"
        | "founder_kyc"
        | "domain_validation"
        | "accreditation_proof"
        | "proof_of_funds"
        | "business_license"
      event_type: "pitch_event" | "demo_day" | "networking"
      investor_type: "angel" | "vc" | "family-office" | "corporate-vc"
      message_type: "text" | "file" | "meeting_invite" | "data_room_request"
      startup_stage: "idea" | "seed" | "early" | "growth" | "expansion"
      subscription_plan: "free" | "pro" | "premium" | "elite"
      user_type: "startup" | "investor" | "service-provider"
      verification_status: "pending" | "in_review" | "approved" | "rejected"
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
    Enums: {
      connection_status: ["pending", "accepted", "declined"],
      document_type: [
        "government_registration",
        "founder_kyc",
        "domain_validation",
        "accreditation_proof",
        "proof_of_funds",
        "business_license",
      ],
      event_type: ["pitch_event", "demo_day", "networking"],
      investor_type: ["angel", "vc", "family-office", "corporate-vc"],
      message_type: ["text", "file", "meeting_invite", "data_room_request"],
      startup_stage: ["idea", "seed", "early", "growth", "expansion"],
      subscription_plan: ["free", "pro", "premium", "elite"],
      user_type: ["startup", "investor", "service-provider"],
      verification_status: ["pending", "in_review", "approved", "rejected"],
    },
  },
} as const
