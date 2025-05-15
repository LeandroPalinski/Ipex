
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, CheckSquare, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: BookOpen,
    iconColor: "text-blue-500",
    text: "Você iniciou o treinamento \"Normas Técnicas ABNT\"",
    time: "2 horas atrás",
  },
  {
    id: 2,
    icon: CheckSquare,
    iconColor: "text-green-500",
    text: "Tarefa \"Revisão de Documentação\" concluída",
    time: "Ontem",
  },
  {
    id: 3,
    icon: FileText,
    iconColor: "text-amber-500",
    text: "Processo \"Segurança em Altura\" consultado",
    time: "3 dias atrás",
  },
];

const RecentActivity = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Atividade Recente (Simulada)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center text-sm p-3 bg-background/70 rounded-md">
            <activity.icon className={`h-4 w-4 mr-2 ${activity.iconColor}`} />
            <span>{activity.text} <span className="text-muted-foreground">- {activity.time}</span></span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
