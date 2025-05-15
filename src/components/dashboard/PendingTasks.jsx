
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PendingTasks = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas Pendentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.filter(t => !t.concluida).map((tarefa) => (
            <div key={tarefa.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full mr-3 ${tarefa.concluida ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span className={tarefa.concluida ? 'line-through text-muted-foreground' : ''}>
                  {tarefa.titulo}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Prazo: {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
           {data.filter(t => !t.concluida).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhuma tarefa pendente no momento.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTasks;
