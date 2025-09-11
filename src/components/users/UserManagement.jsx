import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Users, Plus, Edit, Trash2, Search, Shield, UserCheck, UserX } from 'lucide-react';
import { userService } from '@/lib/userService';

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHierarchy, setFilterHierarchy] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hierarchy: 'usuario',
    function: '',
    sector: ''
  });

  const hierarchyOptions = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'diretor', label: 'Diretor' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'usuario', label: 'Usuário' }
  ];

  const sectorOptions = [
    'Administração',
    'Engenharia',
    'Arquitetura',
    'Obras',
    'Vendas',
    'Marketing',
    'Financeiro',
    'Recursos Humanos',
    'Jurídico',
    'Suprimentos'
  ];

  const functionOptions = [
    'Diretor Geral',
    'Gerente de Projetos',
    'Engenheiro Civil',
    'Arquiteto',
    'Mestre de Obras',
    'Vendedor',
    'Analista de Marketing',
    'Contador',
    'Analista de RH',
    'Advogado',
    'Comprador'
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await userService.getAllUsers();
    
    if (error) {
      toast({
        title: 'Erro ao carregar usuários',
        description: error,
        variant: 'destructive'
      });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (editingUser) {
        result = await userService.updateUser(editingUser.id, formData);
      } else {
        result = await userService.createUser(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: editingUser ? 'Usuário atualizado' : 'Usuário criado',
        description: `${formData.name} foi ${editingUser ? 'atualizado' : 'criado'} com sucesso.`
      });

      setIsDialogOpen(false);
      resetForm();
      loadUsers();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      hierarchy: user.hierarchy,
      function: user.function,
      sector: user.sector
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (user) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      return;
    }

    const { error } = await userService.deleteUser(user.id);
    
    if (error) {
      toast({
        title: 'Erro ao excluir usuário',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Usuário excluído',
        description: `${user.name} foi excluído com sucesso.`
      });
      loadUsers();
    }
  };

  const handleToggleStatus = async (user) => {
    const { error } = await userService.toggleUserStatus(user.id, !user.is_active);
    
    if (error) {
      toast({
        title: 'Erro ao alterar status',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Status alterado',
        description: `${user.name} foi ${!user.is_active ? 'ativado' : 'desativado'}.`
      });
      loadUsers();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      hierarchy: 'usuario',
      function: '',
      sector: ''
    });
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHierarchy = filterHierarchy === 'all' || user.hierarchy === filterHierarchy;
    return matchesSearch && matchesHierarchy;
  });

  const getHierarchyColor = (hierarchy) => {
    const colors = {
      administrador: 'bg-red-100 text-red-800',
      diretor: 'bg-purple-100 text-purple-800',
      gerente: 'bg-blue-100 text-blue-800',
      usuario: 'bg-gray-100 text-gray-800'
    };
    return colors[hierarchy] || colors.usuario;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Usuários
                </CardTitle>
                <CardDescription>
                  Gerencie usuários, hierarquias e permissões do sistema
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingUser ? 'Atualize as informações do usuário' : 'Adicione um novo usuário ao sistema'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          {editingUser ? 'Nova Senha' : 'Senha'}
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="col-span-3"
                          required={!editingUser}
                          placeholder={editingUser ? 'Deixe em branco para manter' : ''}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hierarchy" className="text-right">
                          Hierarquia
                        </Label>
                        <Select
                          value={formData.hierarchy}
                          onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {hierarchyOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="function" className="text-right">
                          Função
                        </Label>
                        <Select
                          value={formData.function}
                          onValueChange={(value) => setFormData({ ...formData, function: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione uma função" />
                          </SelectTrigger>
                          <SelectContent>
                            {functionOptions.map((func) => (
                              <SelectItem key={func} value={func}>
                                {func}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sector" className="text-right">
                          Setor
                        </Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) => setFormData({ ...formData, sector: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione um setor" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectorOptions.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : (editingUser ? 'Atualizar' : 'Criar')}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterHierarchy} onValueChange={setFilterHierarchy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Hierarquias</SelectItem>
                  {hierarchyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{user.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHierarchyColor(user.hierarchy)}`}>
                            {hierarchyOptions.find(h => h.value === user.hierarchy)?.label}
                          </span>
                          {!user.is_active && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inativo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.function} • {user.sector}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.is_active ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum usuário encontrado
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserManagement;

