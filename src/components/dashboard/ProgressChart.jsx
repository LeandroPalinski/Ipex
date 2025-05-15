
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const dataTimeline = [
  { name: 'Jan', progresso: 30, tarefas: 10 },
  { name: 'Fev', progresso: 45, tarefas: 15 },
  { name: 'Mar', progresso: 50, tarefas: 20 },
  { name: 'Abr', progresso: 65, tarefas: 18 },
  { name: 'Mai', progresso: 70, tarefas: 25 },
];

const ProgressChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do Progresso e Tarefas</CardTitle>
        <CardDescription>Linha do tempo do progresso geral e tarefas concluídas nos últimos meses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataTimeline}>
            <defs>
              <linearGradient id="colorProgresso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTarefas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))" }} />
            <Area type="monotone" dataKey="progresso" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProgresso)" name="Progresso (%)" />
            <Area type="monotone" dataKey="tarefas" stroke="hsl(var(--secondary-foreground))" fillOpacity={1} fill="url(#colorTarefas)" name="Tarefas Concluídas" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
