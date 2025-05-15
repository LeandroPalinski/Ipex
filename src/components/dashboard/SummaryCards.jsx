
import React from "react";
import { motion } from "framer-motion";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { BookOpen, CheckSquare, FileText, TrendingUp } from "lucide-react";

const SummaryCards = ({ data, itemVariants }) => {
  const {
    treinamentosConcluidos,
    totalTreinamentos,
    progressoMedioTreinamentos,
    tarefasConcluidas,
    totalTarefas,
    processosConformidade,
    totalProcessos,
  } = data;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Treinamentos Concluídos"
        value={`${treinamentosConcluidos}/${totalTreinamentos}`}
        icon={<BookOpen className="h-6 w-6 text-primary" />}
        description="Total de treinamentos finalizados"
        color="primary"
        variants={itemVariants}
      />
      <SummaryCard
        title="Progresso Médio"
        value={`${progressoMedioTreinamentos.toFixed(0)}%`}
        icon={<TrendingUp className="h-6 w-6 text-green-500" />}
        description="Média de progresso nos treinamentos"
        color="green"
        variants={itemVariants}
      />
      <SummaryCard
        title="Tarefas Concluídas"
        value={`${tarefasConcluidas}/${totalTarefas}`}
        icon={<CheckSquare className="h-6 w-6 text-blue-500" />}
        description="Total de tarefas finalizadas"
        color="blue"
        variants={itemVariants}
      />
      <SummaryCard
        title="Processos de Qualidade"
        value={`${processosConformidade}/${totalProcessos}`}
        icon={<FileText className="h-6 w-6 text-amber-500" />}
        description="Processos em conformidade"
        color="amber"
        variants={itemVariants}
      />
    </div>
  );
};

export default SummaryCards;
