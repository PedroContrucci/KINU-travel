# 🌿 KINU — The Travel OS (v2.0 - Production Ready)

> "Onde a sabedoria do clã encontra a precisão da engenharia."

## ✨ O que há de novo na v2?

| Feature | v1 (Mockup) | v2 (Funcional) |
|---------|-------------|----------------|
| Login/Cadastro | ❌ | ✅ Email + Google |
| Dados persistentes | ❌ | ✅ Supabase |
| Links compartilháveis | ❌ | ✅ vercel.json |
| Modo Demo | ❌ | ✅ Funciona sem backend |

---

## 🚀 Deploy Rápido (Vercel)

### Opção A: Sem Backend (Modo Demo)

1. **Suba o código para GitHub**
2. **Conecte ao Vercel**
3. **Deploy!**

O app funciona em modo demo sem configurar Supabase.

### Opção B: Com Backend (Supabase)

1. **Crie conta no [Supabase](https://supabase.com)** (gratuito)

2. **Crie um novo projeto**

3. **Execute o schema SQL:**
   - Vá em SQL Editor
   - Cole o conteúdo de `supabase/schema.sql`
   - Execute

4. **Copie as credenciais:**
   - Settings → API
   - Copie `Project URL` e `anon public key`

5. **Configure no Vercel:**
   - Settings → Environment Variables
   - Adicione:
     ```
     VITE_SUPABASE_URL=https://seu-projeto.supabase.co
     VITE_SUPABASE_ANON_KEY=sua-chave-anon
     ```

6. **Redeploy!**

---

## 💻 Desenvolvimento Local

```bash
# 1. Clone/extraia o projeto
cd kinu-mvp-v2

# 2. Instale dependências
npm install

# 3. (Opcional) Configure Supabase
cp .env.example .env
# Edite .env com suas credenciais

# 4. Rode o servidor
npm run dev

# 5. Acesse http://localhost:5173
```

---

## 📁 Estrutura do Projeto

```
kinu-mvp-v2/
├── src/
│   ├── components/
│   │   ├── auth/           # Login, Register, ProtectedRoute
│   │   ├── layout/         # Layout, Navbar, Sidebar
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── trip/           # Trip Planner + Leilão Reverso
│   │   ├── currency/       # Motor Cambial Preditivo
│   │   ├── packing/        # Smart Packing 3D
│   │   ├── concierge/      # KINU AI Chat
│   │   ├── guide/          # Guia de Destino
│   │   ├── finops/         # FinOps Dashboard
│   │   └── community/      # Sabedoria do Clã
│   ├── context/
│   │   ├── AuthContext.jsx # Autenticação
│   │   └── TripContext.jsx # Dados de viagens
│   ├── lib/
│   │   └── supabase.js     # Cliente Supabase
│   └── data/
│       └── destinations.json
├── supabase/
│   └── schema.sql          # Schema do banco de dados
├── vercel.json             # Fix para rotas SPA
└── .env.example            # Variáveis de ambiente
```

---

## 🔐 Autenticação

O app suporta:

- ✅ **Email/Senha** - Cadastro e login tradicionais
- ✅ **Google OAuth** - Login com um clique
- ✅ **Modo Demo** - Funciona sem backend configurado

### Configurar Google OAuth (opcional):

1. No Supabase: Authentication → Providers → Google
2. Configure com credenciais do Google Cloud Console
3. Adicione redirect URL

---

## 🗄️ Banco de Dados

### Tabelas principais:

| Tabela | Descrição |
|--------|-----------|
| `trips` | Viagens do usuário |
| `activities` | Atividades por dia |
| `expenses` | Gastos e transações |
| `packing_items` | Itens da mala |
| `clan_tips` | Dicas da comunidade |
| `user_preferences` | Preferências do usuário |

### RLS (Row Level Security):

Cada usuário só vê seus próprios dados. Segurança nativa do Supabase.

---

## 🎨 Design System "Horizonte Vivo"

| Token | Cor | Uso |
|-------|-----|-----|
| `kinu-night` | `#0F172A` | Background |
| `kinu-deep` | `#1E293B` | Cards |
| `kinu-emerald` | `#10B981` | Acento principal |
| `kinu-gold` | `#EAB308` | Insights IA |
| `kinu-horizon` | `#0EA5E9` | Acento secundário |

---

## 🛠️ Funcionalidades

### ✅ Implementadas

- [x] Sistema de autenticação completo
- [x] Dashboard com visão geral
- [x] Planejador de viagens por dia
- [x] Leilão Reverso (simulado)
- [x] Motor Cambial com gráficos
- [x] Smart Packing com cálculo de peso
- [x] KINU AI Chat (simulado)
- [x] Guia de destino (visto, vacinas, frases)
- [x] FinOps Dashboard
- [x] Sabedoria do Clã

### 🔜 Próximos passos

- [ ] API real de câmbio (ExchangeRate)
- [ ] API de clima (OpenWeather)
- [ ] Integração Amadeus (voos)
- [ ] Notificações push
- [ ] PWA mobile
- [ ] KINU AI com GPT

---

## 🐛 Solução de Problemas

### "Page Not Found" ao compartilhar link

O `vercel.json` já está configurado. Se o problema persistir:

1. Verifique se o arquivo está na raiz do projeto
2. Faça redeploy no Vercel

### App não carrega dados

1. Verifique se as variáveis de ambiente estão configuradas
2. Em modo demo, os dados são salvos no localStorage

### Erro de CORS no Supabase

1. No Supabase: Settings → API
2. Adicione seu domínio em "Additional Redirect URLs"

---

## 📄 Licença

Projeto proprietário — KINU © 2025

---

## 🙋 Suporte

- Email: suporte@kinu.travel
- Docs: docs.kinu.travel

---

**Desenvolvido com 🌿 pela equipe KINU**

*"Valide barato. Escale com confiança."*
