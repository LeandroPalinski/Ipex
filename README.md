# Academia IPEX - Sistema de Aprendizagem e Gestão

Sistema web completo para gerenciamento de aprendizagem corporativa e tarefas, desenvolvido para construtoras e empresas do setor.

## 🚀 Funcionalidades

### Dashboard Principal
- Métricas de progresso geral
- Estatísticas de aprendizagem e tarefas
- Gráficos de evolução temporal
- Visão geral dos cursos em andamento

### Sistema de Aprendizagem
- Catálogo completo de cursos
- Trilhas de aprendizagem por cargo
- Sistema de certificados
- Acompanhamento de progresso
- Filtros por categoria e status

### Gerenciamento de Tarefas
- Criação e gestão de tarefas
- Controle de prazos e responsáveis
- Diferentes status e prioridades
- Categorização por tipo de atividade

### Interface Moderna
- Design responsivo e profissional
- Animações suaves
- Navegação intuitiva
- Componentes acessíveis

## 🛠️ Tecnologias

- **React 18** - Framework frontend
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Animações
- **Radix UI** - Componentes de interface
- **Supabase** - Backend e autenticação
- **React Router** - Roteamento
- **Recharts** - Gráficos e visualizações

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/LeandroPalinski/Ipex.git
cd Ipex
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔐 Credenciais de Teste

Para testar a aplicação, use:
- **Email**: teste@exemplo.com
- **Senha**: 123456

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🔒 Segurança

- Credenciais sensíveis armazenadas em variáveis de ambiente
- Sistema de fallback para garantir funcionamento
- Validação de entrada e tratamento de erros
- Componentes seguros e acessíveis

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Temas e Cores

O sistema utiliza uma paleta de cores profissional:
- Verde principal: #10B981 (sucesso, progresso)
- Azul: #3B82F6 (informação, links)
- Vermelho: #EF4444 (alertas, prioridade alta)
- Cinza: Tons variados para texto e backgrounds

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base de UI
│   ├── dashboard/      # Componentes do dashboard
│   ├── aprendizagem/   # Componentes de aprendizagem
│   └── tarefas/        # Componentes de tarefas
├── pages/              # Páginas da aplicação
├── lib/                # Utilitários e configurações
├── data/               # Dados mock e constantes
└── assets/             # Recursos estáticos
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Entre em contato através do email do projeto

## 🚀 Deploy

A aplicação pode ser facilmente implantada em:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

Para deploy automático, configure as variáveis de ambiente na plataforma escolhida.

