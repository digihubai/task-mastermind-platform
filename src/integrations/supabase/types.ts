export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_tool_usage: {
        Row: {
          action: string
          created_at: string | null
          icon_type: string
          id: string
          tool: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          icon_type: string
          id?: string
          tool: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          icon_type?: string
          id?: string
          tool?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_data: {
        Row: {
          avg_time_on_site: number | null
          bounce_rate: number | null
          conversions: number | null
          created_at: string | null
          date: string
          id: string
          page_views: number | null
          unique_visitors: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avg_time_on_site?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          date?: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avg_time_on_site?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          date?: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      seo_analytics: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          timeframe: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json
          id?: string
          timeframe: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          timeframe?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      seo_campaigns: {
        Row: {
          avg_position: number
          backlinks: number
          created_at: string | null
          end_date: string | null
          id: string
          keyword_count: number
          name: string
          page_count: number
          start_date: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avg_position?: number
          backlinks?: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          keyword_count?: number
          name: string
          page_count?: number
          start_date: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avg_position?: number
          backlinks?: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          keyword_count?: number
          name?: string
          page_count?: number
          start_date?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      seo_content: {
        Row: {
          content: string | null
          created_at: string | null
          date: string
          id: string
          keywords: string[]
          platform: string
          seo_score: number
          status: string
          title: string
          updated_at: string | null
          url: string | null
          user_id: string | null
          word_count: number
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          date: string
          id?: string
          keywords?: string[]
          platform?: string
          seo_score?: number
          status?: string
          title: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          word_count?: number
        }
        Update: {
          content?: string | null
          created_at?: string | null
          date?: string
          id?: string
          keywords?: string[]
          platform?: string
          seo_score?: number
          status?: string
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          word_count?: number
        }
        Relationships: []
      }
      seo_keywords: {
        Row: {
          change: number
          created_at: string | null
          difficulty: string
          id: string
          keyword: string
          position: number
          updated_at: string | null
          user_id: string | null
          volume: number
        }
        Insert: {
          change?: number
          created_at?: string | null
          difficulty?: string
          id?: string
          keyword: string
          position?: number
          updated_at?: string | null
          user_id?: string | null
          volume?: number
        }
        Update: {
          change?: number
          created_at?: string | null
          difficulty?: string
          id?: string
          keyword?: string
          position?: number
          updated_at?: string | null
          user_id?: string | null
          volume?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
