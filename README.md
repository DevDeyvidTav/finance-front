# Frontend - Financial Organizer

Interface web construída com Next.js 14 usando App Router e TypeScript.

## Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── dashboard/         # Área autenticada
│   ├── auth/              # Fluxo de autenticação
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── layout/           # Layouts
│   └── providers/        # Providers (React Query, etc)
├── contexts/             # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
└── lib/                  # Utilitários
    └── api.ts           # Cliente HTTP
```

## Páginas Principais

### Públicas
- `/` - Landing page com login

### Autenticadas
- `/dashboard` - Dashboard principal
- `/dashboard/cards` - Gerenciamento de cartões
- `/dashboard/transactions` - Transações
- `/dashboard/incomes` - Receitas
- `/dashboard/loans` - Empréstimos
- `/dashboard/financings` - Financiamentos

## Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Query** - Gerenciamento de estado servidor
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## Rodando o Projeto

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm run start
```

## Variáveis de Ambiente

Criar arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Build e Deploy

```bash
npm run build
npm run start
```

Para deploy, considere:
- Vercel (recomendado para Next.js)
- Netlify
- AWS Amplify
- Docker + qualquer cloud provider


