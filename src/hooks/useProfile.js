import { useState, useEffect } from 'react';
import { profilesService } from '@/api/profiles';
import { useToast } from '@/components/ui/use-toast';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Carregar perfil do usuário atual
  const loadProfile = async () => {
    setLoading(true);
    setError(null);

    const result = await profilesService.getCurrentProfile();

    if (result.error) {
      setError(result.error);
    } else {
      setProfile(result.data);
    }

    setLoading(false);
  };

  // Atualizar perfil
  const updateProfile = async (updates) => {
    if (!profile) return { success: false, error: 'Perfil não carregado' };

    const result = await profilesService.update(profile.id, updates);

    if (result.error) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: result.error,
        variant: 'destructive'
      });
      return { success: false, error: result.error };
    }

    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas com sucesso.'
    });

    setProfile(result.data);

    return { success: true, data: result.data };
  };

  // Upload de avatar
  const uploadAvatar = async (file) => {
    const result = await profilesService.uploadAvatar(file);

    if (result.error) {
      toast({
        title: 'Erro ao fazer upload do avatar',
        description: result.error,
        variant: 'destructive'
      });
      return { success: false, error: result.error };
    }

    toast({
      title: 'Avatar atualizado',
      description: 'Sua foto de perfil foi atualizada.'
    });

    setProfile(result.data);

    return { success: true, data: result.data };
  };

  // Carregar perfil ao montar
  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile,
    uploadAvatar
  };
};
