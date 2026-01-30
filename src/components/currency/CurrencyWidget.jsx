import React, { useState } from 'react'
import { 
  TrendingUp, TrendingDown, ArrowRight, RefreshCw, 
  Sparkles, AlertCircle, Clock, Calendar, Bell
} from 'lucide-react'

// Simulated currency data
const currencies = [
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 5.42, change: -3.2 },
  { code: 'USD', name: 'Dólar', symbol: '$', flag: '🇺🇸', rate: 4.95, change: -1.1 },
  { code: 'GBP', name: 'Libra', symbol: '£', flag: '🇬🇧', rate: 6.28, change: +0.8 },
  { code: 'JPY', name: 'Iene', symbol: '¥', flag: '🇯🇵', rate: 0.033, change: -2.4 },
]

// Simulated historical data for chart
const historicalData = {
  EUR: [
    { date: 'Jan', value: 5.65 },
    { date: 'Fev', value: 5.58 },
    { date: 'Mar', value: 5.70 },
    { date: 'Abr', value: 5.62 },
    { date: 'Mai', value: 5.55 },
    { date: 'Jun', value: 5.48 },
    { date: 'Jul', value: 5.52 },
    { date: 'Ago', value: 5.60 },
    { date: 'Set', value: 5.45 },
    { date: 'Out', value: 5.50 },
    { date: 'Nov', value: 5.55 },
    { date: 'Dez', value: 5.42 },
  ],
  prediction: [
    { date: 'Jan', value: 5.38 },
    { date: 'Fev', value: 5.35 },
    { date: 'Mar', value: 5.30 },
  ]
}

export default function CurrencyWidget() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [amount, setAmount] = useState(1000)
  const [alertSet, setAlertSet] = useState(false)

  const selected = currencies.find(c => c.code === selectedCurrency)
  const convertedAmount = (amount * selected.rate).toFixed(2)
  
  // Calculate best time indicator
  const currentRate = selected.rate
  const avgRate = 5.55 // Simulated average
  const percentFromAvg = ((currentRate - avgRate) / avgRate * 100).toFixed(1)
  const isBelowAvg = currentRate < avgRate

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Motor Cambial</h1>
          <p className="text-kinu-gray-400">Previsão de 12 meses e análise em tempo real</p>
        </div>
        <button className="btn-silk-outline flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* AI Insight */}
      {isBelowAvg && (
        <div className="glass-gold rounded-kinu-xl p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-kinu-gold/20">
              <Sparkles className="w-6 h-6 text-kinu-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-kinu-gold mb-1">
                🎯 Momento favorável para compra!
              </h3>
              <p className="text-kinu-gray-300 mb-3">
                O {selected.name} está {Math.abs(percentFromAvg)}% abaixo da média dos últimos 12 meses. 
                Considerando sua viagem para Paris em março, este pode ser um bom momento para 
                converter parte do orçamento.
              </p>
              <div className="flex items-center gap-3">
                <button className="btn-gold text-sm py-2 px-4">
                  Simular Compra
                </button>
                <button 
                  onClick={() => setAlertSet(true)}
                  className={`text-sm py-2 px-4 rounded-full transition-colors ${
                    alertSet 
                      ? 'bg-kinu-emerald/20 text-kinu-emerald' 
                      : 'text-kinu-gray-400 hover:text-kinu-white'
                  }`}
                >
                  {alertSet ? '✓ Alerta Ativo' : 'Criar Alerta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Converter */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Conversor</h2>
          
          <div className="space-y-4">
            {/* From BRL */}
            <div>
              <label className="text-sm text-kinu-gray-400 mb-2 block">De</label>
              <div className="flex items-center gap-3 p-4 rounded-kinu-lg bg-kinu-surface/50">
                <span className="text-2xl">🇧🇷</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-transparent text-2xl font-bold focus:outline-none"
                  />
                  <span className="text-sm text-kinu-gray-500">BRL - Real</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-kinu-surface/50">
                <ArrowRight className="w-5 h-5 text-kinu-emerald rotate-90" />
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="text-sm text-kinu-gray-400 mb-2 block">Para</label>
              <div className="flex items-center gap-3 p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/30">
                <span className="text-2xl">{selected.flag}</span>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-kinu-emerald">
                    {selected.symbol} {(amount / selected.rate).toFixed(2)}
                  </p>
                  <span className="text-sm text-kinu-gray-500">{selected.code} - {selected.name}</span>
                </div>
              </div>
            </div>

            {/* Rate Info */}
            <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-kinu-gray-400">Taxa atual</span>
                <span className="font-mono font-medium">1 {selected.code} = R$ {selected.rate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-kinu-gray-400">Variação semanal</span>
                <span className={`flex items-center gap-1 font-medium ${
                  selected.change < 0 ? 'text-kinu-emerald' : 'text-red-400'
                }`}>
                  {selected.change < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  {selected.change}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold">Tendência {selected.code}/BRL</h2>
            <div className="flex items-center gap-2">
              {currencies.map(c => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedCurrency === c.code
                      ? 'bg-kinu-emerald text-white'
                      : 'bg-kinu-surface/50 text-kinu-gray-400 hover:text-white'
                  }`}
                >
                  {c.flag} {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="relative h-64 mb-4">
            {/* Y Axis */}
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-kinu-gray-500">
              <span>5.80</span>
              <span>5.60</span>
              <span>5.40</span>
              <span>5.20</span>
            </div>
            
            {/* Chart Area */}
            <div className="ml-14 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="border-t border-kinu-surface/50"></div>
                ))}
              </div>
              
              {/* Historical Line (SVG) */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Historical data path */}
                <path
                  d={`M 0 ${100 - (historicalData.EUR[0].value - 5.2) * 200} ${historicalData.EUR.map((d, i) => 
                    `L ${(i / 11) * 100}% ${100 - (d.value - 5.2) * 200}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  className="drop-shadow-lg"
                />
                
                {/* Prediction path (dashed) */}
                <path
                  d={`M 100% ${100 - (historicalData.EUR[11].value - 5.2) * 200} 
                      L 110% ${100 - (5.38 - 5.2) * 200}
                      L 120% ${100 - (5.35 - 5.2) * 200}
                      L 130% ${100 - (5.30 - 5.2) * 200}`}
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                
                {/* Current point */}
                <circle cx="100%" cy={`${100 - (5.42 - 5.2) * 200}`} r="6" fill="#10B981" />
              </svg>

              {/* X Axis Labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-kinu-gray-500 pt-2 border-t border-kinu-surface/50">
                {['Jan', 'Mar', 'Mai', 'Jul', 'Set', 'Nov', 'Jan*', 'Mar*'].map((m, i) => (
                  <span key={i} className={i > 5 ? 'text-kinu-gold' : ''}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-kinu-emerald"></div>
              <span className="text-kinu-gray-400">Histórico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-kinu-gold" style={{ borderTop: '2px dashed' }}></div>
              <span className="text-kinu-gray-400">Previsão IA</span>
            </div>
          </div>

          {/* Prediction Insight */}
          <div className="mt-6 p-4 rounded-kinu-lg bg-kinu-gold/10 border border-kinu-gold/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-kinu-gold" />
              <span className="font-medium text-kinu-gold">Previsão do Nexo</span>
            </div>
            <p className="text-sm text-kinu-gray-300">
              Com base em indicadores econômicos e padrões históricos, o modelo prevê que o {selected.name} 
              pode atingir <strong className="text-kinu-emerald">R$ 5.30</strong> até março de 2025. 
              Considerando sua viagem, recomendamos compra parcelada.
            </p>
          </div>
        </div>
      </div>

      {/* Currency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currencies.map(currency => (
          <div 
            key={currency.code}
            onClick={() => setSelectedCurrency(currency.code)}
            className={`glass-card p-5 cursor-pointer transition-all ${
              selectedCurrency === currency.code 
                ? 'border-kinu-emerald shadow-kinu' 
                : 'card-hover'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currency.flag}</span>
                <span className="font-medium">{currency.code}</span>
              </div>
              <span className={`flex items-center gap-1 text-sm ${
                currency.change < 0 ? 'text-kinu-emerald' : 'text-red-400'
              }`}>
                {currency.change < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                {currency.change}%
              </span>
            </div>
            <p className="font-display text-2xl font-bold mb-1">R$ {currency.rate}</p>
            <p className="text-sm text-kinu-gray-500">{currency.name}</p>
          </div>
        ))}
      </div>

      {/* Budget Allocation Suggestion */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg font-semibold mb-4">💡 Estratégia de Conversão Sugerida</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-kinu-emerald" />
              <span className="font-medium">Agora</span>
            </div>
            <p className="text-2xl font-bold text-kinu-emerald mb-1">40%</p>
            <p className="text-sm text-kinu-gray-400">R$ 6.000 do orçamento</p>
            <p className="text-xs text-kinu-gray-500 mt-2">Aproveitar taxa atual favorável</p>
          </div>
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 border border-kinu-surface">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-kinu-gray-400" />
              <span className="font-medium">Janeiro</span>
            </div>
            <p className="text-2xl font-bold mb-1">35%</p>
            <p className="text-sm text-kinu-gray-400">R$ 5.250 do orçamento</p>
            <p className="text-xs text-kinu-gray-500 mt-2">Previsão: R$ 5.35</p>
          </div>
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 border border-kinu-surface">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-kinu-gray-400" />
              <span className="font-medium">Fevereiro</span>
            </div>
            <p className="text-2xl font-bold mb-1">25%</p>
            <p className="text-sm text-kinu-gray-400">R$ 3.750 do orçamento</p>
            <p className="text-xs text-kinu-gray-500 mt-2">Reserva para imprevistos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
