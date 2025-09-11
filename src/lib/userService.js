import { supabase } from './supabaseClient';

export const userService = {
  // Buscar todos os usuários (apenas para administradores/diretores/gerentes)
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Buscar usuário por ID
  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Criar novo usuário
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: userData.email,
          name: userData.name,
          hierarchy: userData.hierarchy,
          function: userData.function,
          sector: userData.sector,
          password_hash: userData.password, // Em produção, isso deve ser hasheado
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Atualizar usuário
  async updateUser(id, userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          email: userData.email,
          name: userData.name,
          hierarchy: userData.hierarchy,
          function: userData.function,
          sector: userData.sector,
          ...(userData.password && { password_hash: userData.password })
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Deletar usuário
  async deleteUser(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },

  // Ativar/Desativar usuário
  async toggleUserStatus(id, isActive) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ is_active: isActive })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Buscar permissões do usuário atual
  async getCurrentUserPermissions() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('users')
        .select('hierarchy')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const { data: permissions, error: permError } = await supabase
        .from('permissions')
        .select('*')
        .eq('hierarchy', data.hierarchy);

      if (permError) throw permError;
      return { data: permissions, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Verificar se usuário tem permissão específica
  async hasPermission(permissionType) {
    try {
      const { data: permissions } = await this.getCurrentUserPermissions();
      if (!permissions || permissions.length === 0) return false;

      const permission = permissions[0];
      switch (permissionType) {
        case 'manage_users':
          return permission.can_manage_users;
        case 'assign_tasks':
          return permission.can_assign_tasks;
        case 'view_all_tasks':
          return permission.can_view_all_tasks;
        case 'write':
          return permission.can_write;
        case 'delete':
          return permission.can_delete;
        default:
          return permission.can_read;
      }
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      return false;
    }
  }
};

export const taskService = {
  // Buscar tarefas baseado na hierarquia do usuário
  async getTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_user:assigned_to(name, email),
          creator:created_by(name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Criar nova tarefa
  async createTask(taskData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...taskData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Atualizar tarefa
  async updateTask(id, taskData) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Atribuir tarefa a usuário
  async assignTask(taskId, userId) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ assigned_to: userId })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
};

