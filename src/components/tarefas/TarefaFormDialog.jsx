
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TarefaFormDialog = ({ isOpen, setIsOpen, tarefa, onSave }) => {
  const [formData, setFormData] = React.useState({
    titulo: "",
    descricao: "",
    prazo: "",
    prioridade: "Média",
    status: "Pendente",
    categoria: "Geral",
    responsavel: "",
  });

  React.useEffect(() => {
    if (tarefa) {
      setFormData({
        ...tarefa,
        prazo: tarefa.prazo ? new Date(tarefa.prazo).toISOString().split('T')[0] : ""
      });
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        prazo: "",
        prioridade: "Média",
        status: "Pendente",
        categoria: "Geral",
        responsavel: "",
      });
    }
  }, [tarefa, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: tarefa ? tarefa.id : Date.now() });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{tarefa ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
          <DialogDescription>
            {tarefa ? "Atualize os detalhes da tarefa." : "Preencha os detalhes da nova tarefa."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titulo" className="text-right">Título</Label>
            <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">Descrição</Label>
            <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prazo" className="text-right">Prazo</Label>
            <Input id="prazo" name="prazo" type="date" value={formData.prazo} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prioridade" className="text-right">Prioridade</Label>
            <Select name="prioridade" value={formData.prioridade} onValueChange={(value) => handleSelectChange("prioridade", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baixa">Baixa</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Não iniciada">Não iniciada</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluída">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoria" className="text-right">Categoria</Label>
            <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="responsavel" className="text-right">Responsável</Label>
            <Input id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleChange} className="col-span-3" />
          </div>
        
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">{tarefa ? "Salvar Alterações" : "Criar Tarefa"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TarefaFormDialog;
