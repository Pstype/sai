export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          status: 'draft' | 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          status: 'draft' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          status?: 'draft' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          project_id: string;
          url: string | null;
          name: string | null;
          size: number | null;
          duration: number | null;
          original_file_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          url?: string | null;
          name?: string | null;
          size?: number | null;
          duration?: number | null;
          original_file_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          url?: string | null;
          name?: string | null;
          size?: number | null;
          duration?: number | null;
          original_file_id?: string | null;
          created_at?: string;
        };
      };
      audio_layers: {
        Row: {
          id: string;
          project_id: string;
          url: string | null;
          type: 'music' | 'sfx';
          audio_file_id: string | null;
          created_at: string;
          updated_at: string;
          status: 'pending' | 'generated';
        };
        Insert: {
          id?: string;
          project_id: string;
          url?: string | null;
          type: 'music' | 'sfx';
          audio_file_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status: 'pending' | 'generated';
        };
        Update: {
          id?: string;
          project_id?: string;
          url?: string | null;
          type?: 'music' | 'sfx';
          audio_file_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: 'pending' | 'generated';
        };
      };
      // Add other tables as needed
    };
  };
};

export type RealtimePostgresChangesPayload<T> = {
  commit_timestamp: string;
  errors: unknown[];
  new: T;
  old: T;
  schema: string;
  table: string;
  type: 'INSERT' | 'UPDATE' | 'DELETE';
};