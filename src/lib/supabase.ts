import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RadioStation {
  id?: string;
  email: string;
  station_name: string;
  slogan?: string;
  transmission_type: string;
  website: string;
  stream_url: string;
  country: string;
  state: string;
  city: string;
  additional_message?: string;
  receive_copy: boolean;
  created_at?: string;
  updated_at?: string;
}