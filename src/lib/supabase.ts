// @ts-nocheck
import { createClient } from '@supabase/supabase-js';

// ここで環境変数の中身を確認
console.log('VITE_SUPABASE_URL=', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY=', import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SavedSpot = {
  id: number;
  url: string;
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  thumbnail?: string;
  created_at?: string;
};

export type Plan = {
  id: number;
  date: string;
  name: string;
  created_at?: string;
};

export type PlanItem = {
  id: number;
  plan_id: number;
  spot_id: number;
  order: number;
  created_at?: string;
}; 