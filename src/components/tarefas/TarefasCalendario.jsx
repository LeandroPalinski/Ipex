
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const getStatusColorClass = (status) => {
  switch (status) {
    case "Concluída": return "bg-green-100 text-green-700 border-green-300";
    case "Em andamento": return "bg-blue-100 text-blue-700 border-blue-300";
    case "Pendente": return "bg-amber-100 text-amber-700 border-amber-300";
    case "Não iniciada": return "bg-gray-100 text-gray-700 border-gray-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const TarefasCalendario = ({ tarefas }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); 

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ key: `empty-${i}`, empty: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ key: `day-${day}`, day });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Tarefas ({new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })})</CardTitle>
        <CardDescription>Visualize suas tarefas organizadas por data de prazo.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2 text-sm font-medium text-muted-foreground">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(item => {
              if (item.empty) return <div key={item.key} className="border rounded-md min-h-[80px]"></div>;
              
              const dayDate = new Date(currentYear, currentMonth, item.day);
              const tarefasDoDia = tarefas.filter(tarefa => {
                const prazoDate = new Date(tarefa.prazo + "T00:00:00"); // Ensure prazo is treated as local date
                return prazoDate.getFullYear() === currentYear &&
                       prazoDate.getMonth() === currentMonth &&
                       prazoDate.getDate() === item.day;
              });

              const isToday = item.day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();

              return (
                <div 
                  key={item.key} 
                  className={`border rounded-md min-h-[100px] p-1.5 flex flex-col ${
                    isToday ? 'bg-primary/10 border-primary' : 'bg-background'
                  }`}
                >
                  <div className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{item.day}</div>
                  {tarefasDoDia.length > 0 && (
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                      {tarefasDoDia.map((tarefa) => (
                        <div 
                          key={tarefa.id} 
                          className={`text-[10px] px-1.5 py-0.5 rounded-sm border truncate ${getStatusColorClass(tarefa.status)}`}
                          title={tarefa.titulo}
                        >
                          {tarefa.titulo}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TarefasCalendario;
