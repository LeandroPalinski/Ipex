
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { FileText, UploadCloud, History, MessageSquare, Users, Search, PlusCircle, Edit2, Trash2, Download, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const processosIniciais = [
  { 
    id: 1, 
    titulo: "POP - Alvenaria Estrutural", 
    descricao: "Procedimento Operacional Padrão para execução de alvenaria estrutural em edifícios.",
    categoria: "Execução", 
    versao: "2.1", 
    dataAtualizacao: "2025-04-15",
    responsavel: "Eng. Ana B.",
    tags: ["alvenaria", "pop", "estrutura"],
    arquivos: [
      { nome: "POP_Alvenaria_v2.1.pdf", tipo: "pdf", tamanho: "2.5 MB", dataUpload: "2025-04-15" }
    ],
    historico: [
      { versao: "2.1", data: "2025-04-15", autor: "Eng. Ana B.", obs: "Revisão anual e inclusão de novas técnicas." },
      { versao: "2.0", data: "2024-03-10", autor: "Eng. Ana B.", obs: "Atualização de normas." },
    ],
    observacoes: "Este POP é crítico para a qualidade estrutural. Treinamento obrigatório para novas equipes."
  },
  { 
    id: 2, 
    titulo: "Manual de Integração de Novos Colaboradores", 
    descricao: "Guia completo para o processo de onboarding de novos funcionários na construtora.",
    categoria: "RH", 
    versao: "1.5", 
    dataAtualizacao: "2025-05-01",
    responsavel: "RH Dept.",
    tags: ["integração", "rh", "manual"],
    arquivos: [
      { nome: "Manual_Integracao_v1.5.docx", tipo: "docx", tamanho: "800 KB", dataUpload: "2025-05-01" },
      { nome: "Formulario_Cadastro.pdf", tipo: "pdf", tamanho: "150 KB", dataUpload: "2025-05-01" },
    ],
    historico: [
      { versao: "1.5", data: "2025-05-01", autor: "Carla M.", obs: "Adicionadas seções sobre cultura e benefícios." },
    ],
    observacoes: "Entregar cópia física e digital para todo novo colaborador no primeiro dia."
  },
  {
    id: 3,
    titulo: "Plano de Gerenciamento de Resíduos da Construção",
    descricao: "Diretrizes para coleta, separação, transporte e descarte adequado de resíduos gerados nos canteiros.",
    categoria: "Ambiental",
    versao: "3.0",
    dataAtualizacao: "2025-03-20",
    responsavel: "Eng. Ambiental S.",
    tags: ["resíduos", "pgrcc", "ambiental", "sustentabilidade"],
    arquivos: [
      { nome: "PGRCC_Construtora_v3.0.pdf", tipo: "pdf", tamanho: "1.2 MB", dataUpload: "2025-03-20" }
    ],
    historico: [
       { versao: "3.0", data: "2025-03-20", autor: "Eng. Ambiental S.", obs: "Atualização conforme nova legislação municipal." }
    ],
    observacoes: "Fiscalização rigorosa da aplicação deste plano é essencial."
  }
];

const ArquivoItem = ({ arquivo }) => (
  <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50 hover:bg-muted/80 transition-colors">
    <div className="flex items-center gap-2">
      <FileText className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-medium">{arquivo.nome}</p>
        <p className="text-xs text-muted-foreground">{arquivo.tipo.toUpperCase()} - {arquivo.tamanho} - {new Date(arquivo.dataUpload).toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
    <div className="flex gap-1">
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const Processos = () => {
  const { toast } = useToast();
  const [processos, setProcessos] = React.useState(processosIniciais);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedProcesso, setSelectedProcesso] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState("new"); 
  const [newArquivo, setNewArquivo] = React.useState(null);
  const [newObservacao, setNewObservacao] = React.useState("");

  const filteredProcessos = processos.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenForm = (mode, processoData = null) => {
    setFormMode(mode);
    setSelectedProcesso(processoData);
    setIsFormOpen(true);
  };

  const handleSaveProcesso = (data) => {
    if (formMode === "edit" && selectedProcesso) {
      setProcessos(processos.map(p => p.id === selectedProcesso.id ? {...selectedProcesso, ...data, dataAtualizacao: new Date().toISOString().split('T')[0]} : p));
      toast({ title: "Processo Atualizado", description: `O processo "${data.titulo}" foi atualizado.` });
    } else {
      const novoProcesso = { 
        id: Date.now(), 
        ...data, 
        dataAtualizacao: new Date().toISOString().split('T')[0],
        arquivos: [],
        historico: [{ versao: data.versao, data: new Date().toISOString().split('T')[0], autor: data.responsavel, obs: "Criação inicial do processo."}],
        observacoes: ""
      };
      setProcessos([novoProcesso, ...processos]);
      toast({ title: "Processo Criado", description: `O processo "${data.titulo}" foi criado.` });
    }
    setIsFormOpen(false);
    setSelectedProcesso(null);
  };
  
  const handleDeleteProcesso = (id) => {
    const processoExcluido = processos.find(p => p.id === id);
    setProcessos(processos.filter(p => p.id !== id));
    toast({ title: "Processo Excluído", description: `"${processoExcluido.titulo}" foi removido.`, variant: "destructive"});
    if(selectedProcesso && selectedProcesso.id === id) setSelectedProcesso(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedProcesso) {
      const novoArquivo = {
        nome: file.name,
        tipo: file.name.split('.').pop(),
        tamanho: `${(file.size / (1024*1024)).toFixed(2)} MB`,
        dataUpload: new Date().toISOString().split('T')[0]
      };
      const processoAtualizado = {
        ...selectedProcesso,
        arquivos: [...selectedProcesso.arquivos, novoArquivo],
        historico: [
          { versao: selectedProcesso.versao, data: new Date().toISOString().split('T')[0], autor: "Usuário Atual", obs: `Arquivo "${novoArquivo.nome}" adicionado.` },
          ...selectedProcesso.historico
        ]
      };
      setProcessos(processos.map(p => p.id === selectedProcesso.id ? processoAtualizado : p));
      setSelectedProcesso(processoAtualizado);
      toast({ title: "Arquivo Adicionado", description: `"${novoArquivo.nome}" foi adicionado ao processo.`});
      setNewArquivo(null); // Clear the input
    }
  };

  const handleAddObservacao = () => {
    if (newObservacao.trim() === "" || !selectedProcesso) return;
    const processoAtualizado = {
      ...selectedProcesso,
      observacoes: selectedProcesso.observacoes ? `${selectedProcesso.observacoes}\n\n---\n[${new Date().toLocaleString('pt-BR')}] ${newObservacao}` : `[${new Date().toLocaleString('pt-BR')}] ${newObservacao}`,
      historico: [
        { versao: selectedProcesso.versao, data: new Date().toISOString().split('T')[0], autor: "Usuário Atual", obs: `Nova observação adicionada.` },
        ...selectedProcesso.historico
      ]
    };
    setProcessos(processos.map(p => p.id === selectedProcesso.id ? processoAtualizado : p));
    setSelectedProcesso(processoAtualizado);
    toast({ title: "Observação Adicionada"});
    setNewObservacao("");
  };


  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 }}};
  const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 }};

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Processos e Documentos</h1>
          <p className="text-muted-foreground">Centralize e gerencie os processos e documentos da sua empresa.</p>
        </div>
        <Button onClick={() => handleOpenForm("new")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Processo
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Buscar processos por título, descrição ou tag..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-6">
        <motion.div variants={itemVariants} className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          {filteredProcessos.length > 0 ? filteredProcessos.map(p => (
            <Card 
              key={p.id} 
              className={`cursor-pointer card-hover ${selectedProcesso?.id === p.id ? 'border-primary ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedProcesso(p)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.titulo}</CardTitle>
                <CardDescription className="text-xs">{p.categoria} - v{p.versao}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground pb-3">
                Atualizado em: {new Date(p.dataAtualizacao).toLocaleDateString('pt-BR')} por {p.responsavel}
              </CardContent>
            </Card>
          )) : (
             <p className="text-center text-muted-foreground py-8">Nenhum processo encontrado.</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          {selectedProcesso ? (
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedProcesso.titulo}</CardTitle>
                    <CardDescription>{selectedProcesso.categoria} | Versão: {selectedProcesso.versao} | Responsável: {selectedProcesso.responsavel}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" onClick={() => handleOpenForm("edit", selectedProcesso)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteProcesso(selectedProcesso.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  {selectedProcesso.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[calc(70vh-180px)] overflow-y-auto pr-1">
                <p className="text-sm">{selectedProcesso.descricao}</p>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center"><UploadCloud className="h-4 w-4 mr-2 text-primary"/> Arquivos Anexados</h4>
                  {selectedProcesso.arquivos.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProcesso.arquivos.map(arq => <ArquivoItem key={arq.nome} arquivo={arq} />)}
                    </div>
                  ) : <p className="text-xs text-muted-foreground">Nenhum arquivo anexado.</p>}
                  <div className="mt-2">
                    <Label htmlFor="file-upload" className="text-xs text-primary hover:underline cursor-pointer flex items-center">
                      <PlusCircle className="h-3 w-3 mr-1"/> Adicionar arquivo
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} ref={ref => setNewArquivo(ref)}/>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center"><History className="h-4 w-4 mr-2 text-primary"/> Histórico de Versões</h4>
                  <div className="space-y-1 text-xs">
                    {selectedProcesso.historico.map((h, i) => (
                      <div key={i} className="p-1.5 bg-muted/30 rounded-sm">
                        <strong>v{h.versao}</strong> ({new Date(h.data).toLocaleDateString('pt-BR')}) por {h.autor}: <em>{h.obs}</em>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-primary"/> Observações</h4>
                  {selectedProcesso.observacoes ? (
                     <Textarea value={selectedProcesso.observacoes} readOnly rows={selectedProcesso.observacoes.split('\n').length + 1} className="text-xs bg-muted/30"/>
                  ) : <p className="text-xs text-muted-foreground">Nenhuma observação geral.</p>}
                   <div className="mt-2 space-y-1">
                    <Textarea 
                      placeholder="Adicionar nova observação..." 
                      value={newObservacao}
                      onChange={(e) => setNewObservacao(e.target.value)}
                      className="text-xs"
                      rows={2}
                    />
                    <Button size="sm" onClick={handleAddObservacao} disabled={newObservacao.trim() === ""}>Adicionar Observação</Button>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Última atualização: {new Date(selectedProcesso.dataAtualizacao).toLocaleDateString('pt-BR')}
              </CardFooter>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground border rounded-lg p-8">
              <FileText className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">Selecione um processo</p>
              <p className="text-sm text-center">Clique em um processo na lista à esquerda para ver seus detalhes.</p>
            </div>
          )}
        </motion.div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === "edit" ? "Editar Processo" : "Novo Processo"}</DialogTitle>
            <DialogDescription>
              {formMode === "edit" ? "Atualize os detalhes do processo." : "Preencha os detalhes do novo processo."}
            </DialogDescription>
          </DialogHeader>
          <ProcessoForm initialData={selectedProcesso} onSubmit={handleSaveProcesso} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

const ProcessoForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    titulo: initialData?.titulo || "",
    descricao: initialData?.descricao || "",
    categoria: initialData?.categoria || "",
    versao: initialData?.versao || "1.0",
    responsavel: initialData?.responsavel || "",
    tags: initialData?.tags?.join(", ") || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div>
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="versao">Versão</Label>
          <Input id="versao" name="versao" value={formData.versao} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <Label htmlFor="responsavel">Responsável</Label>
        <Input id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} />
      </div>
      <DialogFooter>
        <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
        <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Processo"}</Button>
      </DialogFooter>
    </form>
  );
};

export default Processos;
