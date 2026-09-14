import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yokjzesnkbnqecrcjopr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlva2p6ZXNua2JucWVjcmNqb3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzY3NzgsImV4cCI6MjEwMzY1Mjc3OH0.yNWnhagS86UDvBRvfo0FVSLKy7CFOD9053MZF5c15Mc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

