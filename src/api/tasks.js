import { supabase, handleSupabaseError, paginate } from './supabase';

export const tasksService = {
  /**
   * Listar tarefas com filtros opcionais
   */
  async list(filters = {}, pagination = { page: 1, limit: 50 }) {
    try {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          board:boards(id, title),
          group:groups(id, name)
        `, { count: 'exact' });

      // Aplicar filtros
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      
      if (filters.board_id) {
        query = query.eq('board_id', filters.board_id);
      }
      
      if (filters.group_id) {
        query = query.eq('group_id', filters.group_id);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Aplicar ordenação
      query = query.order('created_at', { ascending: false });

      // Aplicar paginação
      query = paginate(query, pagination.page, pagination.limit);

      const { data, error, count } = await query;

      if (error) return handleSupabaseError(error);

      return { 
        data, 
        error: null,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: count,
          totalPages: Math.ceil(count / pagination.limit)
        }
      };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Buscar uma tarefa por ID
   */
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          board:boards(id, title),
          group:groups(id, name),
          comments:task_comments(*, author:profiles(id, full_name, avatar_url)),
          files:task_files(*)
        `)
        .eq('id', id)
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Criar nova tarefa
   */
  async create(taskData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          created_by: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select(`
          *,
          board:boards(id, title),
          group:groups(id, name)
        `)
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Atualizar tarefa
   */
  async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          board:boards(id, title),
          group:groups(id, name)
        `)
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Deletar tarefa
   */
  async delete(id) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) return handleSupabaseError(error);

      return { data: true, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Adicionar comentário a uma tarefa
   */
  async addComment(taskId, content) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('task_comments')
        .insert({
          task_id: taskId,
          author_id: user.id,
          content,
          created_at: new Date().toISOString()
        })
        .select('*, author:profiles(id, full_name, avatar_url)')
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  /**
   * Anexar arquivo a uma tarefa
   */
  async attachFile(taskId, file) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Upload do arquivo para o storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${taskId}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('task-files')
        .upload(fileName, file);

      if (uploadError) return handleSupabaseError(uploadError);

      // Obter URL pública do arquivo
      const { data: { publicUrl } } = supabase.storage
        .from('task-files')
        .getPublicUrl(fileName);

      // Registrar arquivo na tabela task_files
      const { data, error } = await supabase
        .from('task_files')
        .insert({
          task_id: taskId,
          file_name: file.name,
          file_path: fileName,
          file_url: publicUrl,
          file_size: file.size,
          file_type: file.type,
          uploaded_by: user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) return handleSupabaseError(error);

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error);
    }
  }
};
