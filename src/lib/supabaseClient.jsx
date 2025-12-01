
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zgymykkrtsrxmxiqqcbi.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_ltaNA7nnVozoSCOcZIjg";

// Debug logs (remover em produção)
console.log("[Supabase Config]");
console.log("URL:", supabaseUrl);
console.log("Key (primeiros 20 chars):", supabaseAnonKey.substring(0, 20) + "...");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
