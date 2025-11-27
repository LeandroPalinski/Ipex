import { useState, useEffect, useCallback } from 'react';
import { tasksService } from '@/api/tasks';
import { useToast } from '@/components/ui/use-toast';

export const useTasks = (filters = {}, options = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  const { toast } = useToast();

  // Carregar tarefas
  const loadTasks = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);

    const result = await tasksService.list(filters, { page, limit: pagination.limit });

    if (result.error) {
      setError(result.error);
      toast({
        title: 'Erro ao carregar tarefas',
        description: result.error,
        variant: 'destructive'
      });
    } else {
      setTasks(result.data || []);
      if (result.pagination) {
        setPagination(result.pagination);
      }
    }

    setLoading(false);
  }, [filters, pagination.limit, toast]);

  // Criar tarefa
  const createTask = async (taskData) => {
    const result = await tasksService.create(taskData);

    if (result.error) {
      toast({
        title: 'Erro ao criar tarefa',
        description: result.error,
        variant: 'destructive'
      });
      return { success: false, error: result.error };
    }

    toast({
      title: 'Tarefa criada',
      description: `"${result.data.title}" foi criada com sucesso.`
    });

    // Recarregar lista
    await loadTasks(pagination.page);

    return { success: true, data: result.data };
  };

  // Atualizar tarefa
  const updateTask = async (id, updates) => {
    const result = await tasksService.update(id, updates);

    if (result.error) {
      toast({
        title: 'Erro ao atualizar tarefa',
        description: result.error,
        variant: 'destructive'
      });
      return { success: false, error: result.error };
    }

    toast({
      title: 'Tarefa atualizada',
      description: `"${result.data.title}" foi atualizada.`
    });

    // Atualizar lista localmente
    setTasks(tasks.map(t => t.id === id ? result.data : t));

    return { success: true, data: result.data };
  };

  // Deletar tarefa
  const deleteTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const result = await tasksService.delete(id);

    if (result.error) {
      toast({
        title: 'Erro ao deletar tarefa',
        description: result.error,
        variant: 'destructive'
      });
      return { success: false, error: result.error };
    }

    toast({
      title: 'Tarefa deletada',
      description: task ? `"${task.title}" foi removida.` : 'Tarefa removida.',
      variant: 'destructive'
    });

    // Atualizar lista localmente
    setTasks(tasks.filter(t => t.id !== id));

    return { success: true };
  };

  // Carregar tarefas ao montar ou quando filtros mudarem
  useEffect(() => {
    if (options.autoLoad !== false) {
      loadTasks(1);
    }
  }, [loadTasks, options.autoLoad]);

  return {
    tasks,
    loading,
    error,
    pagination,
    loadTasks,
    createTask,
    updateTask,
    deleteTask
  };
};
