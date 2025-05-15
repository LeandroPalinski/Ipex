
import React from "react";
import { Filter } from "lucide-react";

const AprendizagemFiltros = ({ 
  categoriasUnicas, 
  filtroCategoria, 
  setFiltroCategoria, 
  filtroStatus, 
  setFiltroStatus 
}) => {
  return (
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
  );
};

export default AprendizagemFiltros;
