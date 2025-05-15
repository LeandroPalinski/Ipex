
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lzjuwqfgnviomdbjfvif.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6anV3cWZnbnZpb21kYmpmdmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjExNjQsImV4cCI6MjA2MjczNzE2NH0.TDoTKQmzx6Uc2UmbWrWvCSjTZC9bM9kHPH95q5GIv-s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
