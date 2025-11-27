import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zgymykkrtsrxmxiqqcbi.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneW15a2tydHNyeG14aXFxY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzM3MTMsImV4cCI6MjA0ODI0OTcxM30.Xr3VqQWqHMx7Gg0_WxKxQOvCJLPF8Ov8_KGBmYqPqhI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para tratamento de erros
export const handleSupabaseError = (error) => {
  console.error('Supabase Error:', error);
  
  if (error.code === 'PGRST116') {
    return { error: 'Registro não encontrado' };
  }
  
  if (error.code === '23505') {
    return { error: 'Este registro já existe' };
  }
  
  if (error.code === '42501') {
    return { error: 'Sem permissão para esta operação' };
  }
  
  return { error: error.message || 'Erro ao processar requisição' };
};

// Helper para paginação
export const paginate = (query, page = 1, limit = 50) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return query.range(from, to);
};
