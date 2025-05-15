
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const TreinamentosPorCargo = ({ treinamentos }) => {
  const cargosUnicos = Array.from(new Set(treinamentos.map(t => t.cargo).filter(c => c !== "Todos")));
  const treinamentosPorCargoAgrupados = ["Engenheiro", "Supervisor", "Gerente", "Arquiteto", "Vendedor", ...cargosUnicos.filter(c => !["Engenheiro", "Supervisor", "Gerente", "Arquiteto", "Vendedor"].includes(c))].map(cargo => ({
    cargo,
    treinamentos: treinamentos.filter(treinamento => treinamento.cargo === cargo || treinamento.cargo === "Todos")
  }));


  return (
    <Card>
      <CardHeader>
        <CardTitle>Treinamentos por Cargo</CardTitle>
        <CardDescription>
          Visualize os treinamentos recomendados para cada cargo na empresa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {treinamentosPorCargoAgrupados.map(({ cargo, treinamentos: treinamentosDoCargo }) => (
            <div key={cargo}>
              <h3 className="text-lg font-medium mb-2 text-primary">{cargo}</h3>
              <div className="space-y-2">
                {treinamentosDoCargo
                  .sort((a,b) => a.titulo.localeCompare(b.titulo))
                  .map(treinamento => (
                  <div key={treinamento.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        treinamento.progresso === 100 ? 'bg-green-500' : 
                        treinamento.progresso > 0 ? 'bg-amber-500' : 'bg-gray-300'
                      }`}></div>
                      <span>{treinamento.titulo}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{treinamento.progresso}%</span>
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

export default TreinamentosPorCargo;
