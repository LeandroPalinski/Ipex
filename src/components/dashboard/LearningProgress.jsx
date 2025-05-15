
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Clock } from "lucide-react";

const LearningProgress = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cursos em Andamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((curso) => (
            <div key={curso.id} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{curso.titulo}</span>
                <span className="text-sm text-muted-foreground">{curso.progresso}%</span>
              </div>
              <Progress value={curso.progresso} />
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-muted-foreground">{curso.categoria}</span>
                <span className="text-xs text-muted-foreground">
                  {curso.progresso === 100 ? (
                    <span className="flex items-center text-green-600">
                      <Award className="mr-1 h-3 w-3" /> Concluído
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" /> Em andamento
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
