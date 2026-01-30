# 🌿 KINU — The Travel OS (MVP 1.0)

> "Onde a sabedoria do clã encontra a precisão da engenharia."

## 📦 Conteúdo do Projeto

```
kinu-mvp/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout, Navbar, Sidebar
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── trip/            # Trip Planner + Leilão Reverso
│   │   ├── currency/        # Motor Cambial Preditivo
│   │   ├── packing/         # Smart Packing 3D
│   │   ├── concierge/       # KINU AI (Chat persistente)
│   │   ├── guide/           # Guia de Destino (Visto, Vacinas, Frases)
│   │   ├── finops/          # FinOps Dashboard (Real vs Planejado)
│   │   └── community/       # Sabedoria do Clã
│   ├── context/             # TripContext (estado global)
│   ├── data/                # 50 destinos + 100 roteiros JSON
│   └── index.css            # Estilos globais + Design System
├── tailwind.config.js       # Tema Horizonte Vivo
├── vite.config.js           # Configuração Vite
└── package.json             # Dependências
```

## 🎨 Design System "Horizonte Vivo"

| Token | Cor | Uso |
|-------|-----|-----|
| `kinu-night` | `#0F172A` | Background principal |
| `kinu-deep` | `#1E293B` | Cards e superfícies |
| `kinu-emerald` | `#10B981` | Acento principal |
| `kinu-gold` | `#EAB308` | Insights da IA (Fio de Ouro) |
| `kinu-horizon` | `#0EA5E9` | Acento secundário |

**Tipografia:**
- **Títulos:** Outfit
- **Corpo:** Plus Jakarta Sans
- **Código:** JetBrains Mono

## 🚀 Como Rodar

### 1. Extrair e instalar dependências:
```bash
unzip kinu-mvp-v1.zip
cd kinu-mvp
npm install
```

### 2. Rodar em desenvolvimento:
```bash
npm run dev
```

### 3. Build para produção:
```bash
npm run build
```

## ✨ Funcionalidades Implementadas

### 🏠 Dashboard
- Visão geral da viagem atual
- Cards de estatísticas (próxima viagem, orçamento, câmbio)
- Alertas de Jet Lag
- Previsão do tempo
- Teaser da Sabedoria do Clã

### 🗺️ Trip Planner
- Seletor de dias interativo
- Itinerário drag-and-drop
- **Leilão Reverso Simulado** — fornecedores competem!
- Filtros por tipo de atividade
- Sugestões da IA baseadas em clima

### 💰 Motor Cambial
- Conversor de moedas em tempo real
- Gráfico de tendência (12 meses)
- **Previsão preditiva** com IA
- Alertas de oportunidade
- Estratégia de conversão sugerida

### 🧳 Smart Packing 3D
- Seletor de tipo de mala
- **Visualização 3D** do peso
- Lista de itens por categoria
- Cálculo automático de peso
- Sugestões baseadas em clima/destino

### 🤖 KINU AI (Concierge)
- Chat persistente (flutuante)
- Voz do "Irmão Experiente"
- Respostas contextuais (clima, câmbio, restaurantes, jet lag)
- Sugestões de alteração de roteiro em tempo real

### 📖 Guia de Destino
- Requisitos de Visto (ESTA, ETA, etc.)
- Vacinas obrigatórias/recomendadas
- Seguro viagem
- **Frases do Clã** no idioma local (com copiar)
- Dicas validadas pela comunidade

### 📊 FinOps Dashboard
- Orçamento Total vs. Gasto
- Breakdown por categoria
- Transações recentes
- Status visual (dentro/fora do budget)
- Insights do Nexo

### 👥 Sabedoria do Clã
- Dicas ranqueadas por votos
- Validação por algoritmo de relevância cultural
- Tags de destino
- Sistema de upvote/downvote

## 📱 Responsivo
O layout se adapta a desktop, tablet e mobile.

## 🔧 Próximos Passos (MVP 1.1)

- [ ] Conectar Supabase (autenticação + DB)
- [ ] API real de câmbio (ExchangeRate)
- [ ] API de clima (OpenWeather)
- [ ] Integração Amadeus (voos)
- [ ] PWA para mobile
- [ ] Notificações push

---

## 📄 Licença

Projeto proprietário — KINU © 2025

---

**Desenvolvido com 🌿 pela equipe KINU**
