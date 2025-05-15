
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { tarefasIniciaisData } from "@/data/tarefasData";
import TarefaCard from "@/components/tarefas/TarefaCard";
import TarefaFormDialog from "@/components/tarefas/TarefaFormDialog";
import TarefasCalendario from "@/components/tarefas/TarefasCalendario";
import TarefasEstatisticas from "@/components/tarefas/TarefasEstatisticas";

const Tarefas = () => {
  const { toast } = useToast();
  const [tarefas, setTarefas] = React.useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefasAcademia");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : tarefasIniciaisData;
  });
  
  const [filtroStatus, setFiltroStatus] = React.useState("todas");
  const [filtroPrioridade, setFiltroPrioridade] = React.useState("todas");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("tarefasAcademia", JSON.stringify(tarefas));
  }, [tarefas]);

  const tarefasFiltradas = React.useMemo(() => {
    return tarefas.filter(tarefa => {
      const matchStatus = filtroStatus === "todas" || tarefa.status === filtroStatus;
      const matchPrioridade = filtroPrioridade === "todas" || tarefa.prioridade === filtroPrioridade;
      return matchStatus && matchPrioridade;
    });
  }, [filtroStatus, filtroPrioridade, tarefas]);

  const handleSaveTarefa = (tarefaEditada) => {
    if (tarefaSelecionada) {
      setTarefas(tarefas.map(t => t.id === tarefaEditada.id ? tarefaEditada : t));
      toast({ title: "Tarefa atualizada!", description: `"${tarefaEditada.titulo}" foi atualizada.`});
    } else {
      setTarefas([tarefaEditada, ...tarefas]);
      toast({ title: "Tarefa criada!", description: `"${tarefaEditada.titulo}" foi adicionada.` });
    }
    setTarefaSelecionada(null);
  };

  const handleEditTarefa = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setIsFormOpen(true);
  };
  
  const handleDeleteTarefa = (id) => {
    const tarefaExcluida = tarefas.find(t => t.id === id);
    setTarefas(tarefas.filter(t => t.id !== id));
    toast({ title: "Tarefa excluída!", description: `"${tarefaExcluida.titulo}" foi removida.`, variant: "destructive" });
  };

  const handleConcluirTarefa = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, status: "Concluída" } : t));
    toast({ title: "Tarefa concluída!", description: "Ótimo trabalho!" });
  };

  const handleIniciarTarefa = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, status: "Em andamento" } : t));
    toast({ title: "Tarefa iniciada/retomada!" });
  };

  const containerVariants = {
    hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Tarefas</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie suas tarefas e responsabilidades.</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="flex items-center">
            <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="bg-background border rounded-md px-3 py-2 text-sm w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos Status</SelectItem>
                <SelectItem value="Não iniciada">Não iniciada</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluída">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
              <SelectTrigger className="bg-background border rounded-md px-3 py-2 text-sm w-[160px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Prioridades</SelectItem>
                <SelectItem value="Baixa">Baixa</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => { setTarefaSelecionada(null); setIsFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="lista" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lista">Lista de Tarefas</TabsTrigger>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lista" className="mt-6">
            {tarefasFiltradas.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tarefasFiltradas.map((tarefa) => (
                  <TarefaCard 
                    key={tarefa.id} 
                    tarefa={tarefa} 
                    onConcluir={handleConcluirTarefa}
                    onIniciar={handleIniciarTarefa}
                    onEdit={handleEditTarefa}
                    onDelete={handleDeleteTarefa}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-3" />
                <h3 className="text-lg font-medium">Nenhuma tarefa encontrada</h3>
                <p>Não há tarefas que correspondam aos filtros selecionados.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendario" className="mt-6">
            <TarefasCalendario tarefas={tarefas} />
          </TabsContent>
          
          <TabsContent value="estatisticas" className="mt-6">
            <TarefasEstatisticas tarefas={tarefas} />
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <TarefaFormDialog 
        isOpen={isFormOpen} 
        setIsOpen={setIsFormOpen}
        tarefa={tarefaSelecionada}
        onSave={handleSaveTarefa}
      />
    </motion.div>
  );
};

export default Tarefas;
