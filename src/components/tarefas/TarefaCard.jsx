
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckSquare, Calendar, AlertTriangle, CheckCircle, Edit, Trash2 } from "lucide-react";

const getStatusInfo = (status) => {
  switch (status) {
    case "Concluída": return { color: "bg-green-500", textColor: "text-green-700", icon: <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> };
    case "Em andamento": return { color: "bg-blue-500", textColor: "text-blue-700", icon: <Clock className="mr-2 h-4 w-4 text-blue-500" /> };
    case "Pendente": return { color: "bg-amber-500", textColor: "text-amber-700", icon: <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" /> };
    case "Não iniciada": return { color: "bg-gray-400", textColor: "text-gray-700", icon: <Clock className="mr-2 h-4 w-4 text-gray-400" /> };
    default: return { color: "bg-gray-400", textColor: "text-gray-700", icon: <Clock className="mr-2 h-4 w-4 text-gray-400" /> };
  }
};

const getPrioridadeInfo = (prioridade) => {
  switch (prioridade) {
    case "Alta": return { color: "text-red-500", bgColor: "bg-red-100" };
    case "Média": return { color: "text-amber-600", bgColor: "bg-amber-100" };
    case "Baixa": return { color: "text-green-600", bgColor: "bg-green-100" };
    default: return { color: "text-gray-500", bgColor: "bg-gray-100" };
  }
};

const TarefaCard = ({ tarefa, onConcluir, onIniciar, onEdit, onDelete }) => {
  const statusInfo = getStatusInfo(tarefa.status);
  const prioridadeInfo = getPrioridadeInfo(tarefa.prioridade);

  const isAtrasada = new Date(tarefa.prazo) < new Date() && tarefa.status !== "Concluída";

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 350 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className={`h-1.5 ${statusInfo.color}`}></div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{tarefa.titulo}</CardTitle>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${prioridadeInfo.bgColor} ${prioridadeInfo.color}`}>
              {tarefa.prioridade}
            </div>
          </div>
          <CardDescription className="text-xs h-10 overflow-y-auto">{tarefa.descricao}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 flex-grow">
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              {statusInfo.icon}
              <span>Status: <span className={`font-medium ${statusInfo.textColor}`}>{tarefa.status}</span></span>
            </div>
            <div className={`flex items-center ${isAtrasada ? 'text-red-500 font-semibold' : ''}`}>
              <Calendar className={`mr-2 h-4 w-4 ${isAtrasada ? 'text-red-500' : 'text-muted-foreground'}`} />
              <span>
                Prazo: {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}
                {isAtrasada && " (Atrasada)"}
              </span>
            </div>
            <div className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Categoria: {tarefa.categoria}</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Responsável: {tarefa.responsavel}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-3">
          <Button variant="ghost" size="icon" onClick={() => onEdit(tarefa)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(tarefa.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          {tarefa.status === "Não iniciada" && (
            <Button variant="outline" size="sm" onClick={() => onIniciar(tarefa.id)}>
              <Clock className="mr-2 h-4 w-4" /> Iniciar
            </Button>
          )}
          {tarefa.status === "Pendente" && (
            <Button variant="outline" size="sm" onClick={() => onIniciar(tarefa.id)}>
              <Clock className="mr-2 h-4 w-4" /> Retomar
            </Button>
          )}
          {(tarefa.status === "Pendente" || tarefa.status === "Em andamento") && (
            <Button size="sm" onClick={() => onConcluir(tarefa.id)}>
              <CheckCircle className="mr-2 h-4 w-4" /> Concluir
            </Button>
          )}
          {tarefa.status === "Concluída" && (
            <Button variant="outline" size="sm" disabled className="border-green-500 text-green-500">
              <CheckCircle className="mr-2 h-4 w-4" /> Concluída
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TarefaCard;
