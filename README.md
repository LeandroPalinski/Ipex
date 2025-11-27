# IPEX ONE - Plataforma de Gestão Administrativa

![IPEX Construtora](public/logo.png)

## 📋 Sobre o Projeto

**IPEX ONE** é uma plataforma de gestão administrativa completa desenvolvida para a IPEX Construtora. A plataforma centraliza e facilita o gerenciamento de tarefas, treinamentos, equipe e processos administrativos da empresa.

## ✨ Funcionalidades

### 🎯 Gestão de Tarefas
- Criação, edição e exclusão de tarefas
- Filtros por status e prioridade
- Visualização em calendário
- Estatísticas e métricas
- Comentários e anexos

### 📚 Sistema de Aprendizagem
- Cursos e treinamentos
- Progresso de aprendizagem
- Certificados
- Filtros por cargo e categoria

### 📄 Gestão de Processos
- Documentos e procedimentos
- Versionamento de documentos
- Histórico de alterações
- Upload de arquivos

### 👤 Perfil do Usuário
- Informações pessoais
- Upload de avatar
- Alteração de senha
- Integrações

### 🏢 Workspaces e Boards
- Organização por workspaces
- Boards estilo Kanban
- Gestão de equipes
- Permissões por role

## 🚀 Tecnologias

### Frontend
- **React** 18.2.0
- **Vite** 4.4.5
- **Tailwind CSS** 3.3.3
- **Radix UI** (componentes acessíveis)
- **Framer Motion** (animações)
- **Recharts** (gráficos)
- **Lucide React** (ícones)

### Backend/Database
- **Supabase** (PostgreSQL)
- **Supabase Auth** (autenticação)
- **Supabase Storage** (armazenamento de arquivos)
- **Row Level Security** (RLS)

## 🎨 Branding

A plataforma utiliza as cores oficiais da IPEX Construtora:
- **Verde IPEX**: #C4D600
- **Preto**: #000000

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/LeandroPalinski/Ipex.git
cd Ipex
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
ipex-one/
├── public/
│   └── logo.png
├── src/
│   ├── api/                    # Camada de API/Serviços
│   │   ├── supabase.js
│   │   ├── tasks.js
│   │   └── profiles.js
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes UI reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   ├── contexts/               # React Contexts
│   │   └── AuthContext.jsx
│   ├── hooks/                  # Custom Hooks
│   │   ├── useTasks.js
│   │   └── useProfile.js
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tarefas.jsx
│   │   ├── Aprendizagem.jsx
│   │   ├── Processos.jsx
│   │   └── Perfil.jsx
│   ├── lib/                    # Bibliotecas e utilitários
│   │   ├── supabaseClient.jsx
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔐 Autenticação

A plataforma utiliza Supabase Auth para autenticação. Usuários de teste:

- **leandro@ipex.com**
- **ti@ipexconstrutora.com.br**

## 🗄️ Banco de Dados

### Tabelas Principais

- **profiles** - Perfis de usuários
- **workspaces** - Organizações/Workspaces
- **workspace_members** - Membros de workspaces
- **groups** - Grupos dentro de workspaces
- **boards** - Quadros/Boards de tarefas
- **tasks** - Tarefas
- **task_comments** - Comentários de tarefas
- **task_files** - Arquivos anexados a tarefas
- **user_documents** - Documentos de usuários
- **shortcuts** - Atalhos personalizados
- **activity_log** - Log de atividades

### Storage Buckets

- **avatars** (público) - Fotos de perfil
- **documents** (privado) - Documentos da empresa
- **task-files** (público) - Anexos de tarefas

## 🔒 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Autenticação via Supabase Auth
- Validação de dados no frontend e backend
- Políticas de acesso baseadas em roles

## 📈 Roadmap

### Versão 1.0 (Atual)
- [x] Autenticação funcional
- [x] Gestão de perfil
- [x] Interface completa
- [x] Branding IPEX
- [x] Camada de API
- [x] Custom hooks

### Versão 1.1 (Próxima)
- [ ] Integração completa com Supabase
- [ ] CRUD de tarefas funcional
- [ ] Upload de arquivos
- [ ] Sistema de notificações
- [ ] Boards Kanban

### Versão 2.0 (Futuro)
- [ ] Sistema de aprendizagem completo
- [ ] Gestão de processos integrada
- [ ] Analytics e relatórios
- [ ] Notificações em tempo real
- [ ] Mobile app (PWA)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é propriedade da IPEX Construtora. Todos os direitos reservados.

## 📞 Suporte

Para suporte, entre em contato:
- Email: ti@ipexconstrutora.com.br
- Website: https://ipexconstrutora.com.br

---

**Desenvolvido com ❤️ para IPEX Construtora**

![Verde IPEX](https://via.placeholder.com/100x30/C4D600/000000?text=IPEX+ONE)
