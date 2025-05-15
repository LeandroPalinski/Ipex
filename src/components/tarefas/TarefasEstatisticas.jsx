
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const getStatusColor = (status) => {
  switch (status) {
    case "Concluída": return "hsl(var(--primary))";
    case "Em andamento": return "#3b82f6"; 
    case "Pendente": return "#f59e0b";
    case "Não iniciada": return "#9ca3af";
    default: return "#9ca3af";
  }
};

const TarefasEstatisticas = ({ tarefas }) => {
  const statusData = ["Concluída", "Em andamento", "Pendente", "Não iniciada"].map(status => {
    const count = tarefas.filter(t => t.status === status).length;
    return { name: status, value: count, fill: getStatusColor(status) };
  });

  const categorias = Array.from(new Set(tarefas.map(t => t.categoria)));
  const categoriaData = categorias.map(categoria => {
    const count = tarefas.filter(t => t.categoria === categoria).length;
    return { name: categoria, value: count };
  });

  const tarefasProximas = tarefas
    .filter(t => t.status !== "Concluída" && new Date(t.prazo) >= new Date())
    .sort((a, b) => new Date(a.prazo) - new Date(b.prazo))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas de Tarefas</CardTitle>
        <CardDescription>Resumo do seu desempenho e progresso nas tarefas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-medium mb-2 text-center">Status das Tarefas</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-center">Tarefas por Categoria</h3>
             <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoriaData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Tarefas" fill="hsl(var(--primary))" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Tarefas com Prazo Próximo (Top 5)</h3>
          {tarefasProximas.length > 0 ? (
            <div className="space-y-2">
              {tarefasProximas.map(tarefa => (
                <div key={tarefa.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2`} style={{backgroundColor: getStatusColor(tarefa.status)}}></div>
                    <span>{tarefa.titulo}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-sm text-muted-foreground text-center">Nenhuma tarefa com prazo próximo.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TarefasEstatisticas;
