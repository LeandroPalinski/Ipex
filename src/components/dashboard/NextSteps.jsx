
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

const NextSteps = ({ treinamentos, tarefas }) => {
  const navigate = useNavigate();

  const treinosEmAndamento = treinamentos.filter(t => t.progresso > 0 && t.progresso < 100).slice(0, 2);
  const tarefasPendentes = tarefas.filter(t => t.status === "Pendente" || t.status === "Não iniciada" || t.status === "Em andamento").slice(0, 1);
  
  const hasActions = treinosEmAndamento.length > 0 || tarefasPendentes.length > 0;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary" />
          Seus Próximos Passos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {treinosEmAndamento.map(t => (
          <div key={`treino-${t.id}`} className="flex items-center justify-between p-3 bg-background/70 rounded-md">
            <div>
              <p className="font-medium">{t.titulo}</p>
              <p className="text-sm text-muted-foreground">Continuar Treinamento</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/aprendizagem')}>Ver</Button>
          </div>
        ))}
        {tarefasPendentes.map(t => (
          <div key={`tarefa-${t.id}`} className="flex items-center justify-between p-3 bg-background/70 rounded-md">
            <div>
              <p className="font-medium">{t.titulo}</p>
              <p className="text-sm text-muted-foreground">Tarefa Pendente</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/tarefas')}>Ver</Button>
          </div>
        ))}
        {!hasActions && (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhuma ação imediata pendente. Bom trabalho!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NextSteps;
