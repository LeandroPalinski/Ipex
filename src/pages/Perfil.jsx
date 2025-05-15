
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Edit3, Save, Mail, Phone, Briefcase, MapPin, Link as LinkIcon, CheckCircle, AlertCircle as CircleAlert } from 'lucide-react';

const IntegrationsCard = () => {
  const integrations = [
    { name: "Google Agenda", icon: <img  alt="Google Calendar Icon" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1649433391719-2e784576d044" />, connected: true },
    { name: "Google Drive", icon: <img  alt="Google Drive Icon" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1667984390553-7f439e6ae401" />, connected: false },
    { name: "Trello", icon: <img  alt="Trello Icon" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1608403810239-ac22e2c3bac7" />, connected: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações</CardTitle>
        <CardDescription>Conecte suas ferramentas favoritas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
            <div className="flex items-center">
              {integration.icon}
              <span className="font-medium">{integration.name}</span>
            </div>
            {integration.connected ? (
              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                <CheckCircle className="h-4 w-4 mr-1.5" /> Conectado
              </Button>
            ) : (
              <Button variant="secondary" size="sm">
                <LinkIcon className="h-4 w-4 mr-1.5" /> Conectar
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


const Perfil = () => {
  const { toast } = useToast();
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    avatar_url: "",
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setUserData({
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
          role: user.user_metadata?.role || "Colaborador",
          department: user.user_metadata?.department || "Não especificado",
          avatar_url: user.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user.email}?size=100`,
        });
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.auth.updateUser({
      data: { 
        full_name: userData.full_name,
        phone: userData.phone,
        role: userData.role,
        department: userData.department,
        avatar_url: userData.avatar_url,
      }
    });

    if (error) {
      toast({ title: "Erro ao atualizar perfil", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas." });
      setIsEditing(false);
    }
  };
  
  const handleChangePassword = async () => {
    if(newPassword !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if(newPassword.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter no mínimo 6 caracteres.", variant: "destructive" });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Erro ao alterar senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha alterada!", description: "Sua senha foi atualizada com sucesso." });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 }};

  if (!user) return <div className="p-6">Carregando perfil...</div>;

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 }} }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-3 border-2 border-primary shadow-md">
              <AvatarImage src={userData.avatar_url} alt={userData.full_name} />
              <AvatarFallback>{userData.full_name?.substring(0,2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userData.full_name || "Nome do Usuário"}</CardTitle>
            <CardDescription>{userData.role} - {userData.department}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!isEditing ? (
              <div className="space-y-4">
                <InfoItem icon={<Mail className="h-4 w-4 text-primary"/>} label="Email" value={userData.email} />
                <InfoItem icon={<Phone className="h-4 w-4 text-primary"/>} label="Telefone" value={userData.phone || "Não informado"} />
                <Button className="w-full mt-4" onClick={() => setIsEditing(true)}>
                  <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input id="full_name" name="full_name" value={userData.full_name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email (não editável)</Label>
                  <Input id="email" name="email" value={userData.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="role">Cargo</Label>
                  <Input id="role" name="role" value={userData.role} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Input id="department" name="department" value={userData.department} onChange={handleInputChange} />
                </div>
                 <div>
                  <Label htmlFor="avatar_url">URL do Avatar</Label>
                  <Input id="avatar_url" name="avatar_url" value={userData.avatar_url} onChange={handleInputChange} placeholder="https://exemplo.com/avatar.png"/>
                </div>
                <div className="flex gap-2">
                    <Button className="w-full" onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                    </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Mantenha sua conta segura atualizando sua senha regularmente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres"/>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
             {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-destructive flex items-center"><CircleAlert className="h-3 w-3 mr-1"/>As senhas não coincidem.</p>
            )}
            <Button onClick={handleChangePassword} disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}>
              Atualizar Senha
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <IntegrationsCard />
      </motion.div>

    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="mr-3 text-primary">{icon}</span>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default Perfil;
