import React, { useState } from 'react'
import { 
  Wallet, TrendingUp, TrendingDown, PieChart, Plus,
  ArrowUpRight, ArrowDownRight, Sparkles, Filter,
  Plane, Hotel, Utensils, Camera, ShoppingBag, Car
} from 'lucide-react'

const categories = [
  { id: 'flights', name: 'Voos', icon: Plane, color: '#0EA5E9', planned: 4500, spent: 4200 },
  { id: 'accommodation', name: 'Hospedagem', icon: Hotel, color: '#10B981', planned: 3500, spent: 3200 },
  { id: 'food', name: 'Alimentação', icon: Utensils, color: '#EAB308', planned: 2000, spent: 850 },
  { id: 'activities', name: 'Atividades', icon: Camera, color: '#8B5CF6', planned: 2500, spent: 1100 },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag, color: '#EC4899', planned: 1500, spent: 0 },
  { id: 'transport', name: 'Transporte', icon: Car, color: '#F97316', planned: 1000, spent: 200 },
]

const transactions = [
  { id: 1, description: 'Passagem Air France', category: 'flights', amount: 4200, date: '2025-01-15', status: 'confirmed' },
  { id: 2, description: 'Hotel Le Marais (7 noites)', category: 'accommodation', amount: 3200, date: '2025-01-20', status: 'confirmed' },
  { id: 3, description: 'Ingresso Louvre', category: 'activities', amount: 95, date: '2025-02-01', status: 'pending' },
  { id: 4, description: 'Torre Eiffel Skip-line', category: 'activities', amount: 180, date: '2025-02-01', status: 'pending' },
  { id: 5, description: 'Cruzeiro Sena', category: 'activities', amount: 120, date: '2025-02-05', status: 'pending' },
  { id: 6, description: 'Jantar Montmartre', category: 'food', amount: 250, date: '2025-02-10', status: 'estimated' },
  { id: 7, description: 'Café e lanches (estimado)', category: 'food', amount: 600, date: '2025-02-10', status: 'estimated' },
  { id: 8, description: 'Metrô Paris (carnet)', category: 'transport', amount: 200, date: '2025-02-15', status: 'estimated' },
  { id: 9, description: 'Versalhes Day Trip', category: 'activities', amount: 150, date: '2025-02-12', status: 'pending' },
  { id: 10, description: 'Seguro Viagem', category: 'flights', amount: 350, date: '2025-01-10', status: 'confirmed' },
]

export default function FinOpsDashboard() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAddExpense, setShowAddExpense] = useState(false)

  const totalPlanned = categories.reduce((acc, cat) => acc + cat.planned, 0)
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0)
  const remaining = totalPlanned - totalSpent
  const percentUsed = (totalSpent / totalPlanned) * 100

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === activeFilter)

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">FinOps Pessoal</h1>
          <p className="text-kinu-gray-400">Real vs. Planejado • Paris, 15-22 Mar 2025</p>
        </div>
        <button 
          onClick={() => setShowAddExpense(true)}
          className="btn-silk flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Gasto
        </button>
      </div>

      {/* AI Insight */}
      <div className="glass-gold rounded-kinu-xl p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-kinu-gold/20">
            <Sparkles className="w-6 h-6 text-kinu-gold" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-kinu-gold mb-1">
              💰 Análise do Nexo
            </h3>
            <p className="text-kinu-gray-300">
              Você está <strong className="text-kinu-emerald">12% abaixo</strong> do planejado em hospedagem! 
              Esse saving de R$ 300 pode ser realocado para experiências gastronômicas, 
              onde você tem margem de apenas R$ 150 restantes.
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-kinu-gray-400 text-sm">Orçamento Total</span>
            <Wallet className="w-5 h-5 text-kinu-gray-400" />
          </div>
          <p className="font-display text-2xl font-bold">R$ {totalPlanned.toLocaleString()}</p>
          <p className="text-xs text-kinu-gray-500 mt-1">Planejado</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-kinu-gray-400 text-sm">Gasto Atual</span>
            <TrendingUp className="w-5 h-5 text-kinu-horizon" />
          </div>
          <p className="font-display text-2xl font-bold text-kinu-horizon">R$ {totalSpent.toLocaleString()}</p>
          <p className="text-xs text-kinu-gray-500 mt-1">{percentUsed.toFixed(0)}% do orçamento</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-kinu-gray-400 text-sm">Disponível</span>
            <ArrowDownRight className="w-5 h-5 text-kinu-emerald" />
          </div>
          <p className="font-display text-2xl font-bold text-kinu-emerald">R$ {remaining.toLocaleString()}</p>
          <p className="text-xs text-kinu-gray-500 mt-1">{(100 - percentUsed).toFixed(0)}% restante</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-kinu-gray-400 text-sm">Economia</span>
            <TrendingDown className="w-5 h-5 text-kinu-emerald" />
          </div>
          <p className="font-display text-2xl font-bold text-kinu-emerald">R$ 650</p>
          <p className="text-xs text-kinu-gray-500 mt-1">vs. planejado inicial</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget by Category */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-6">Real vs. Planejado</h2>
          
          <div className="space-y-6">
            {categories.map(category => {
              const Icon = category.icon
              const percent = (category.spent / category.planned) * 100
              const isOver = category.spent > category.planned
              
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: category.color }} />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">R$ {category.spent.toLocaleString()}</span>
                      <span className="text-kinu-gray-500"> / R$ {category.planned.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 rounded-full bg-kinu-surface overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 relative"
                      style={{ 
                        width: `${Math.min(percent, 100)}%`,
                        backgroundColor: isOver ? '#EF4444' : category.color
                      }}
                    >
                      {/* Planned marker */}
                      {percent < 100 && (
                        <div 
                          className="absolute right-0 top-0 h-full w-0.5 bg-white/50"
                          style={{ right: '0' }}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs ${isOver ? 'text-red-400' : 'text-kinu-gray-500'}`}>
                      {percent.toFixed(0)}% utilizado
                    </span>
                    <span className={`text-xs ${
                      category.planned - category.spent >= 0 ? 'text-kinu-emerald' : 'text-red-400'
                    }`}>
                      {category.planned - category.spent >= 0 ? '+' : ''}
                      R$ {(category.planned - category.spent).toLocaleString()} {category.planned - category.spent >= 0 ? 'disponível' : 'excedido'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pie Chart Visualization */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-6">Distribuição</h2>
          
          {/* Simple Pie Chart */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {(() => {
                let currentAngle = 0
                return categories.map((cat, i) => {
                  const percent = (cat.planned / totalPlanned) * 100
                  const angle = (percent / 100) * 360
                  const startAngle = currentAngle
                  currentAngle += angle
                  
                  const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                  const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                  const endX = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
                  const endY = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)
                  const largeArc = angle > 180 ? 1 : 0
                  
                  return (
                    <path
                      key={cat.id}
                      d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                      fill={cat.color}
                      stroke="#0F172A"
                      strokeWidth="1"
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  )
                })
              })()}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{percentUsed.toFixed(0)}%</p>
                <p className="text-xs text-kinu-gray-500">usado</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {categories.map(cat => {
              const Icon = cat.icon
              return (
                <div key={cat.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-kinu-gray-400">{cat.name}</span>
                  </div>
                  <span className="font-medium">{((cat.planned / totalPlanned) * 100).toFixed(0)}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-semibold">Histórico de Transações</h2>
          
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-kinu-gray-400" />
            <select 
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="input-kinu py-2 text-sm"
            >
              <option value="all">Todas</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kinu-surface">
                <th className="text-left py-3 px-4 text-sm font-medium text-kinu-gray-400">Descrição</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-kinu-gray-400">Categoria</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-kinu-gray-400">Data</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-kinu-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-kinu-gray-400">Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => {
                const category = categories.find(c => c.id === transaction.category)
                const Icon = category?.icon || Wallet
                
                return (
                  <tr key={transaction.id} className="border-b border-kinu-surface/50 hover:bg-kinu-surface/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${category?.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: category?.color }} />
                        </div>
                        <span className="font-medium">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-kinu-gray-400">{category?.name}</td>
                    <td className="py-4 px-4 text-kinu-gray-400">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'confirmed' 
                          ? 'bg-kinu-emerald/20 text-kinu-emerald'
                          : transaction.status === 'pending'
                          ? 'bg-kinu-gold/20 text-kinu-gold'
                          : 'bg-kinu-surface text-kinu-gray-400'
                      }`}>
                        {transaction.status === 'confirmed' ? 'Confirmado' : 
                         transaction.status === 'pending' ? 'Pendente' : 'Estimado'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold">
                      R$ {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
