import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../../database.types";

// TBD: Put this on a .env file
const supabaseUrl = "https://tgbnpswoepgjefkmcwot.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYm5wc3dvZXBnamVma21jd290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMjkxNzUsImV4cCI6MjAxNjcwNTE3NX0.tZdS2NDK65f-c8xdO5o8N4sxjtZWpUYZsyYCfGwWm5Q";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
