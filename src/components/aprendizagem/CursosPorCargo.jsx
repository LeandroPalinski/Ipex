
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CursosPorCargo = ({ cursos }) => {
  const cargosUnicos = Array.from(new Set(cursos.map(c => c.cargo).filter(c => c !== "Todos")));
  const cursosPorCargoAgrupados = ["Engenheiro", "Supervisor", "Gerente", "Arquiteto", "Vendedor", ...cargosUnicos.filter(c => !["Engenheiro", "Supervisor", "Gerente", "Arquiteto", "Vendedor"].includes(c))].map(cargo => ({
    cargo,
    cursos: cursos.filter(curso => curso.cargo === cargo || curso.cargo === "Todos")
  }));


  return (
    <Card>
      <CardHeader>
        <CardTitle>Cursos por Cargo</CardTitle>
        <CardDescription>
          Visualize os cursos recomendados para cada cargo na empresa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cursosPorCargoAgrupados.map(({ cargo, cursos: cursosDoCargo }) => (
            <div key={cargo}>
              <h3 className="text-lg font-medium mb-2 text-primary">{cargo}</h3>
              <div className="space-y-2">
                {cursosDoCargo
                  .sort((a,b) => a.titulo.localeCompare(b.titulo))
                  .map(curso => (
                  <div key={curso.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        curso.progresso === 100 ? 'bg-green-500' : 
                        curso.progresso > 0 ? 'bg-amber-500' : 'bg-gray-300'
                      }`}></div>
                      <span>{curso.titulo}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{curso.progresso}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CursosPorCargo;
