
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zgymykkrtsrxmxiqqcbi.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneW15a2tydHNyeG14aXFxY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzM3MTMsImV4cCI6MjA0ODI0OTcxM30.Xr3VqQWqHMx7Gg0_WxKxQOvCJLPF8Ov8_KGBmYqPqhI";

// Debug logs (remover em produção)
console.log("[Supabase Config]");
console.log("URL:", supabaseUrl);
console.log("Key (primeiros 20 chars):", supabaseAnonKey.substring(0, 20) + "...");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
