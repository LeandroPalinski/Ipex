
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";

const processosData = [
  { id: 1, nome: "Procedimento Operacional Padrão (POP)", atualizado: "10/05/2025", colaboradores: 5 },
  { id: 2, nome: "Normas de Segurança (NR-18)", atualizado: "12/05/2025", colaboradores: 12 },
  { id: 3, nome: "Checklist de Qualidade de Concretagem", atualizado: "01/05/2025", colaboradores: 8 },
  { id: 4, nome: "Manual de Integração de Novos Colaboradores", atualizado: "15/04/2025", colaboradores: 20 },
];

const QualityProcesses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processos de Qualidade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {processosData.map((processo, index) => (
            <div 
              key={processo.id} 
              className={`flex items-center justify-between p-4 ${index < processosData.length -1 ? 'border-b' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{processo.nome}</p>
                  <p className="text-sm text-muted-foreground">Atualizado em {processo.atualizado}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{processo.colaboradores} colaboradores</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityProcesses;
