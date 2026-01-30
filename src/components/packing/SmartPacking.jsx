import React, { useState } from 'react'
import { 
  Package, Plus, Minus, AlertTriangle, Check, 
  Shirt, Footprints, Sparkles, Scale, Ruler,
  Umbrella, Camera, Pill, Laptop
} from 'lucide-react'

const luggageTypes = [
  { id: 'carry-on', name: 'Mala de Mão', dimensions: '55x40x20cm', maxWeight: 10, icon: '🧳' },
  { id: 'checked', name: 'Mala Despachada', dimensions: '70x50x30cm', maxWeight: 23, icon: '🛄' },
  { id: 'backpack', name: 'Mochila', dimensions: '45x35x20cm', maxWeight: 8, icon: '🎒' },
]

const itemCategories = [
  { 
    id: 'clothes', 
    name: 'Roupas', 
    icon: Shirt, 
    color: 'kinu-emerald',
    items: [
      { name: 'Camiseta', weight: 0.2, qty: 0 },
      { name: 'Calça Jeans', weight: 0.6, qty: 0 },
      { name: 'Casaco', weight: 0.8, qty: 0 },
      { name: 'Vestido/Camisa Social', weight: 0.3, qty: 0 },
      { name: 'Pijama', weight: 0.3, qty: 0 },
      { name: 'Roupa Íntima', weight: 0.05, qty: 0 },
      { name: 'Meias (par)', weight: 0.05, qty: 0 },
    ]
  },
  { 
    id: 'shoes', 
    name: 'Calçados', 
    icon: Footprints, 
    color: 'kinu-horizon',
    items: [
      { name: 'Tênis', weight: 0.8, qty: 0 },
      { name: 'Sapato Social', weight: 0.6, qty: 0 },
      { name: 'Sandália', weight: 0.4, qty: 0 },
      { name: 'Chinelo', weight: 0.2, qty: 0 },
    ]
  },
  { 
    id: 'accessories', 
    name: 'Acessórios', 
    icon: Umbrella, 
    color: 'kinu-gold',
    items: [
      { name: 'Guarda-chuva', weight: 0.4, qty: 0 },
      { name: 'Óculos de Sol', weight: 0.1, qty: 0 },
      { name: 'Cinto', weight: 0.2, qty: 0 },
      { name: 'Bolsa/Necessaire', weight: 0.3, qty: 0 },
    ]
  },
  { 
    id: 'electronics', 
    name: 'Eletrônicos', 
    icon: Laptop, 
    color: 'purple-400',
    items: [
      { name: 'Notebook', weight: 1.5, qty: 0 },
      { name: 'Tablet', weight: 0.5, qty: 0 },
      { name: 'Câmera', weight: 0.8, qty: 0 },
      { name: 'Carregadores', weight: 0.3, qty: 0 },
      { name: 'Adaptador de Tomada', weight: 0.1, qty: 0 },
    ]
  },
  { 
    id: 'hygiene', 
    name: 'Higiene', 
    icon: Pill, 
    color: 'pink-400',
    items: [
      { name: 'Kit Higiene', weight: 0.5, qty: 0 },
      { name: 'Medicamentos', weight: 0.2, qty: 0 },
      { name: 'Protetor Solar', weight: 0.2, qty: 0 },
    ]
  },
]

export default function SmartPacking() {
  const [selectedLuggage, setSelectedLuggage] = useState('checked')
  const [categories, setCategories] = useState(itemCategories)
  const [showSuggestion, setShowSuggestion] = useState(true)

  const luggage = luggageTypes.find(l => l.id === selectedLuggage)
  
  // Calculate total weight
  const totalWeight = categories.reduce((acc, cat) => {
    return acc + cat.items.reduce((itemAcc, item) => itemAcc + (item.weight * item.qty), 0)
  }, 0)

  const weightPercentage = (totalWeight / luggage.maxWeight) * 100
  const isOverweight = totalWeight > luggage.maxWeight

  const updateItemQty = (categoryId, itemIndex, delta) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const newItems = [...cat.items]
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          qty: Math.max(0, newItems[itemIndex].qty + delta)
        }
        return { ...cat, items: newItems }
      }
      return cat
    }))
  }

  // AI suggestion based on trip
  const applySuggestion = () => {
    setCategories(prev => prev.map(cat => {
      const suggestions = {
        clothes: { 'Camiseta': 5, 'Calça Jeans': 2, 'Casaco': 1, 'Roupa Íntima': 7, 'Meias (par)': 7 },
        shoes: { 'Tênis': 1, 'Sapato Social': 1 },
        accessories: { 'Guarda-chuva': 1, 'Óculos de Sol': 1 },
        electronics: { 'Carregadores': 1, 'Adaptador de Tomada': 1 },
        hygiene: { 'Kit Higiene': 1, 'Medicamentos': 1 }
      }
      
      if (suggestions[cat.id]) {
        return {
          ...cat,
          items: cat.items.map(item => ({
            ...item,
            qty: suggestions[cat.id][item.name] || 0
          }))
        }
      }
      return cat
    }))
    setShowSuggestion(false)
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Smart Packing 3D</h1>
          <p className="text-kinu-gray-400">Simulador inteligente de malas para sua viagem</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-silk-outline flex items-center gap-2">
            <Package className="w-4 h-4" />
            Salvar Lista
          </button>
        </div>
      </div>

      {/* AI Suggestion */}
      {showSuggestion && (
        <div className="glass-gold rounded-kinu-xl p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-kinu-gold/20">
              <Sparkles className="w-6 h-6 text-kinu-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-kinu-gold mb-1">
                Sugestão do Nexo para Paris (7 dias, Março)
              </h3>
              <p className="text-kinu-gray-300 mb-3">
                Considerando o clima de primavera em Paris (8-15°C, possibilidade de chuva), 
                preparei uma lista otimizada com camadas e proteção contra chuva.
              </p>
              <div className="flex items-center gap-3">
                <button onClick={applySuggestion} className="btn-gold text-sm py-2 px-4">
                  Aplicar Sugestão
                </button>
                <button 
                  onClick={() => setShowSuggestion(false)}
                  className="text-sm text-kinu-gray-400 hover:text-kinu-white transition-colors"
                >
                  Ignorar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Luggage Visualization */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Visualização 3D</h2>
          
          {/* Luggage Type Selector */}
          <div className="flex gap-2 mb-6">
            {luggageTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedLuggage(type.id)}
                className={`flex-1 p-3 rounded-kinu-lg text-center transition-all ${
                  selectedLuggage === type.id
                    ? 'bg-kinu-emerald/20 border border-kinu-emerald text-kinu-emerald'
                    : 'bg-kinu-surface/30 border border-kinu-surface hover:border-kinu-emerald/30'
                }`}
              >
                <span className="text-2xl block mb-1">{type.icon}</span>
                <span className="text-xs">{type.name}</span>
              </button>
            ))}
          </div>

          {/* 3D Box Visualization */}
          <div className="relative h-64 flex items-center justify-center mb-6" style={{ perspective: '500px' }}>
            <div 
              className="relative transition-all duration-500"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-20deg) rotateY(-30deg)',
              }}
            >
              {/* Luggage Body */}
              <div 
                className={`w-40 h-48 rounded-lg border-4 transition-colors ${
                  isOverweight 
                    ? 'border-red-500 bg-red-500/20' 
                    : 'border-kinu-emerald bg-kinu-emerald/20'
                }`}
                style={{
                  background: `linear-gradient(to top, ${
                    isOverweight ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.4)'
                  } ${Math.min(weightPercentage, 100)}%, transparent ${Math.min(weightPercentage, 100)}%)`
                }}
              >
                {/* Fill Level Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${isOverweight ? 'text-red-400' : 'text-kinu-emerald'}`}>
                      {totalWeight.toFixed(1)}kg
                    </p>
                    <p className="text-sm text-kinu-gray-400">de {luggage.maxWeight}kg</p>
                  </div>
                </div>
              </div>

              {/* Handle */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-kinu-surface rounded-t-lg"></div>
              
              {/* Wheels */}
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-kinu-surface rounded-full"></div>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-kinu-surface rounded-full"></div>
            </div>
          </div>

          {/* Weight Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-kinu-gray-400">Capacidade utilizada</span>
              <span className={isOverweight ? 'text-red-400' : 'text-kinu-emerald'}>
                {weightPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-kinu-surface overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverweight ? 'bg-red-500' : 'bg-gradient-to-r from-kinu-emerald to-kinu-horizon'
                }`}
                style={{ width: `${Math.min(weightPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Warning */}
          {isOverweight && (
            <div className="p-4 rounded-kinu-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-400">Excesso de peso!</p>
                <p className="text-sm text-kinu-gray-400">
                  Remova {(totalWeight - luggage.maxWeight).toFixed(1)}kg para evitar taxas extras.
                </p>
              </div>
            </div>
          )}

          {!isOverweight && totalWeight > 0 && (
            <div className="p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/30 flex items-start gap-3">
              <Check className="w-5 h-5 text-kinu-emerald flex-shrink-0" />
              <div>
                <p className="font-medium text-kinu-emerald">Dentro do limite!</p>
                <p className="text-sm text-kinu-gray-400">
                  Ainda tem espaço para {(luggage.maxWeight - totalWeight).toFixed(1)}kg.
                </p>
              </div>
            </div>
          )}

          {/* Dimensions Info */}
          <div className="mt-4 p-4 rounded-kinu-lg bg-kinu-surface/30">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-4 h-4 text-kinu-gray-400" />
              <span className="text-sm text-kinu-gray-400">Dimensões</span>
            </div>
            <p className="font-mono text-lg">{luggage.dimensions}</p>
          </div>
        </div>

        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {categories.map(category => {
            const Icon = category.icon
            const categoryWeight = category.items.reduce((acc, item) => acc + (item.weight * item.qty), 0)
            
            return (
              <div key={category.id} className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${category.color}/20`}>
                      <Icon className={`w-5 h-5 text-${category.color}`} />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <span className="text-sm text-kinu-gray-400">
                    {categoryWeight.toFixed(1)}kg
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        item.qty > 0 ? 'bg-kinu-emerald/10' : 'bg-kinu-surface/30'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-kinu-gray-500">{item.weight}kg cada</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQty(category.id, idx, -1)}
                          className="p-1.5 rounded-lg bg-kinu-surface hover:bg-kinu-surface/80 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateItemQty(category.id, idx, 1)}
                          className="p-1.5 rounded-lg bg-kinu-emerald/20 hover:bg-kinu-emerald/30 text-kinu-emerald transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Summary */}
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Resumo</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 text-center">
                <Scale className="w-6 h-6 mx-auto mb-2 text-kinu-gray-400" />
                <p className="text-2xl font-bold">{totalWeight.toFixed(1)}kg</p>
                <p className="text-xs text-kinu-gray-500">Peso Total</p>
              </div>
              <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 text-center">
                <Package className="w-6 h-6 mx-auto mb-2 text-kinu-gray-400" />
                <p className="text-2xl font-bold">
                  {categories.reduce((acc, cat) => acc + cat.items.reduce((a, i) => a + i.qty, 0), 0)}
                </p>
                <p className="text-xs text-kinu-gray-500">Itens</p>
              </div>
              <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-kinu-gray-400" />
                <p className="text-2xl font-bold">{(luggage.maxWeight - totalWeight).toFixed(1)}kg</p>
                <p className="text-xs text-kinu-gray-500">Espaço Livre</p>
              </div>
              <div className={`p-4 rounded-kinu-lg text-center ${
                isOverweight ? 'bg-red-500/10' : 'bg-kinu-emerald/10'
              }`}>
                {isOverweight ? (
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-400" />
                ) : (
                  <Check className="w-6 h-6 mx-auto mb-2 text-kinu-emerald" />
                )}
                <p className={`text-2xl font-bold ${isOverweight ? 'text-red-400' : 'text-kinu-emerald'}`}>
                  {isOverweight ? 'Excesso' : 'OK'}
                </p>
                <p className="text-xs text-kinu-gray-500">Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
