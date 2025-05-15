
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Users, Play, CheckCircle } from "lucide-react";

const CursoCard = ({ curso, onAction }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full flex flex-col overflow-hidden card-hover">
        <div className="relative h-40 bg-gradient-to-r from-primary/80 to-primary/60">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-white opacity-30" />
          </div>
          <div className="absolute top-2 right-2 bg-background/90 text-xs font-medium px-2 py-1 rounded-full shadow">
            {curso.categoria}
          </div>
        </div>
        <CardHeader>
          <CardTitle>{curso.titulo}</CardTitle>
          <CardDescription className="h-12 overflow-hidden text-ellipsis">{curso.descricao}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Progresso</span>
                <span className="text-sm font-medium">{curso.progresso}%</span>
              </div>
              <Progress value={curso.progresso} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                <span>{curso.modulosConcluidos}/{curso.modulos} módulos</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{curso.cargo}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {curso.progresso === 100 ? (
            <Button className="w-full" variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Concluído
            </Button>
          ) : curso.progresso > 0 ? (
            <Button className="w-full" onClick={() => onAction(curso.id, "continuar")}>
              <Play className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          ) : (
            <Button className="w-full" variant="outline" onClick={() => onAction(curso.id, "iniciar")}>
              <Play className="mr-2 h-4 w-4" />
              Iniciar
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CursoCard;
