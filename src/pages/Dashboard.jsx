
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckSquare, TrendingUp } from "lucide-react";
import { cursosData } from "@/data/aprendizagemData";
import { tarefasIniciaisData } from "@/data/tarefasData";
import SummaryCard from "@/components/dashboard/SummaryCard";
import LearningProgress from "@/components/dashboard/LearningProgress";
import PendingTasks from "@/components/dashboard/PendingTasks";
import QualityProcesses from "@/components/dashboard/QualityProcesses";
import ProgressChart from "@/components/dashboard/ProgressChart";

const Dashboard = () => {
  const totalCursos = cursosData.length;
  const cursosEmAndamento = cursosData.filter(curso => curso.progresso > 0 && curso.progresso < 100).length;
  const cursosConcluidos = cursosData.filter(curso => curso.progresso === 100).length;
  
  const totalTarefas = tarefasIniciaisData.length;
  const tarefasConcluidas = tarefasIniciaisData.filter(tarefa => tarefa.status === "Concluída").length;
  const tarefasPendentes = totalTarefas - tarefasConcluidas;
  
  const progressoGeral = totalCursos > 0 ? Math.round(
    cursosData.reduce((acc, curso) => acc + curso.progresso, 0) / totalCursos
  ) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Progresso Geral" icon={TrendingUp}>
          <div className="text-3xl font-bold">{progressoGeral}%</div>
          <Progress value={progressoGeral} className="mt-3" />
          <p className="mt-2 text-xs text-muted-foreground">
            Seu progresso em todos os cursos e tarefas
          </p>
        </SummaryCard>

        <SummaryCard title="Aprendizagem" icon={BookOpen}>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-2xl md:text-3xl font-bold">{totalCursos}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{cursosEmAndamento}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{cursosConcluidos}</div>
              <p className="text-xs text-muted-foreground">Concluídos</p>
            </div>
          </div>
        </SummaryCard>

        <SummaryCard title="Tarefas" icon={CheckSquare}>
           <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-2xl md:text-3xl font-bold">{totalTarefas}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{tarefasPendentes}</div>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{tarefasConcluidas}</div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
          </div>
        </SummaryCard>
      </div>

      <motion.div variants={itemVariants}>
        <ProgressChart />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="aprendizagem" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="aprendizagem">Aprendizagem</TabsTrigger>
            <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
            <TabsTrigger value="processos">Processos</TabsTrigger>
          </TabsList>
          <TabsContent value="aprendizagem" className="mt-6">
            <LearningProgress data={cursosData.filter(c => c.progresso < 100 && c.progresso > 0).slice(0, 5)} />
          </TabsContent>
          <TabsContent value="tarefas" className="mt-6">
            <PendingTasks data={tarefasIniciaisData} />
          </TabsContent>
          <TabsContent value="processos" className="mt-6">
            <QualityProcesses />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
