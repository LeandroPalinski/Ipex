import { supabase, handleSupabaseError } from './supabase';

export const profilesService = {
  /**
   * Buscar perfil do usuário atual
   */
  async getCurrentProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: 'Usuário não autenticado' };
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Buscar perfil por ID
   */
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Atualizar perfil
   */
  async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Upload de avatar
   */
  async uploadAvatar(file) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: 'Usuário não autenticado' };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      
      // Upload do arquivo
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) return handleSupabaseError(uploadError);

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Atualizar perfil com nova URL do avatar
      const { data, error } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)
        .select()
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Listar todos os perfis (para seleção de membros)
   */
  async list(filters = {}) {
    try {
      let query = supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, role, department');

      if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      if (filters.role) {
        query = query.eq('role', filters.role);
      }

      if (filters.department) {
        query = query.eq('department', filters.department);
      }

      query = query.order('full_name', { ascending: true });

      const { data, error } = await query;

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }
};
