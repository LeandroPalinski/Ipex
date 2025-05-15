
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cursosData } from "@/data/aprendizagemData";
import CursoCard from "@/components/aprendizagem/CursoCard";
import CursosPorCargo from "@/components/aprendizagem/CursosPorCargo";
import Certificados from "@/components/aprendizagem/Certificados";

const Aprendizagem = () => {
  const { toast } = useToast();
  const [filtroCategoria, setFiltroCategoria] = React.useState("todos");
  const [filtroStatus, setFiltroStatus] = React.useState("todos");

  const handleCursoAction = (id, actionType) => {
    const curso = cursosData.find(c => c.id === id);
    if (actionType === "continuar") {
        toast({
            title: `Curso "${curso.titulo}" continuado`,
            description: "Você continuou de onde parou.",
        });
    } else if (actionType === "iniciar") {
        toast({
            title: `Curso "${curso.titulo}" iniciado`,
            description: "Boa jornada de aprendizado!",
        });
    }
  };

  const cursosFiltrados = React.useMemo(() => {
    let filtrados = [...cursosData];

    if (filtroCategoria !== "todos") {
      filtrados = filtrados.filter(curso => curso.categoria.toLowerCase() === filtroCategoria);
    }

    if (filtroStatus === "em-andamento") {
      filtrados = filtrados.filter(curso => curso.progresso > 0 && curso.progresso < 100);
    } else if (filtroStatus === "concluidos") {
      filtrados = filtrados.filter(curso => curso.progresso === 100);
    } else if (filtroStatus === "nao-iniciados") {
      filtrados = filtrados.filter(curso => curso.progresso === 0);
    }
    
    return filtrados;
  }, [filtroCategoria, filtroStatus]);
  
  const categoriasUnicas = ["todos", ...Array.from(new Set(cursosData.map(c => c.categoria.toLowerCase())))];

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
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academia de Aprendizagem</h1>
          <p className="text-muted-foreground">
            Desenvolva suas habilidades e conhecimentos para crescer na empresa.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <select 
              className="bg-background border rounded-md px-3 py-2 text-sm capitalize"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              {categoriasUnicas.map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat === "todos" ? "Todas as Categorias" : cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
             <select 
              className="bg-background border rounded-md px-3 py-2 text-sm"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos os Status</option>
              <option value="em-andamento">Em andamento</option>
              <option value="concluidos">Concluídos</option>
              <option value="nao-iniciados">Não iniciados</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="cursos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cursos">Cursos Disponíveis</TabsTrigger>
            <TabsTrigger value="por-cargo">Trilhas por Cargo</TabsTrigger>
            <TabsTrigger value="certificados">Meus Certificados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cursos" className="mt-6">
            {cursosFiltrados.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cursosFiltrados.map((curso) => (
                        <CursoCard key={curso.id} curso={curso} onAction={handleCursoAction} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">Nenhum curso encontrado para os filtros selecionados.</p>
            )}
          </TabsContent>
          
          <TabsContent value="por-cargo" className="mt-6">
            <CursosPorCargo cursos={cursosData} />
          </TabsContent>
          
          <TabsContent value="certificados" className="mt-6">
            <Certificados cursosConcluidos={cursosData.filter(c => c.progresso === 100)} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Aprendizagem;
