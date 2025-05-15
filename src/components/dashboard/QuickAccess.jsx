
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckSquare, FileText, Users, Zap } from "lucide-react";

const QuickAccess = () => {
  const navigate = useNavigate();

  const accessItems = [
    {
      label: "Central de Treinamentos",
      description: "Explore todos os treinamentos",
      icon: BookOpen,
      path: "/aprendizagem",
    },
    {
      label: "Minhas Tarefas",
      description: "Gerencie suas pendências",
      icon: CheckSquare,
      path: "/tarefas",
    },
    {
      label: "Processos de Qualidade",
      description: "Consulte os procedimentos",
      icon: FileText,
      path: "/processos",
    },
    {
      label: "Meu Perfil",
      description: "Atualize suas informações",
      icon: Users,
      path: "/perfil",
    },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-6 w-6 mr-2 text-primary" />
          Acesso Rápido às Funcionalidades
        </CardTitle>
        <CardDescription>
          Navegue rapidamente para as seções mais importantes.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {accessItems.map((item) => (
          <Button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full justify-start text-left h-auto py-3 gradient-bg text-primary-foreground hover:opacity-90"
          >
            <item.icon className="mr-3 h-5 w-5" />
            <div>
              <p className="font-semibold">{item.label}</p>
              <p className="text-xs opacity-80">{item.description}</p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
