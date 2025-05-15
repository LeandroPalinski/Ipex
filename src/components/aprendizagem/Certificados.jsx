
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const Certificados = ({ cursosConcluidos }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Certificados</CardTitle>
        <CardDescription>
          Certificados obtidos após a conclusão dos cursos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cursosConcluidos.length > 0 ? (
          <div className="space-y-4">
            {cursosConcluidos.map(curso => (
              <div key={curso.id} className="flex items-center justify-between border p-4 rounded-md shadow-sm">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <h4 className="font-medium">{curso.titulo}</h4>
                    <p className="text-sm text-muted-foreground">Concluído em {new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Baixar Certificado
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium">Nenhum certificado ainda</h3>
            <p className="text-muted-foreground">
              Complete os cursos para obter seus certificados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Certificados;
