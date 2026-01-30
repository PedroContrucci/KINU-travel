import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Globe, Calendar, Users, Heart, Compass, Utensils,
  Wallet, Sparkles, ArrowRight, ArrowLeft, Check,
  MapPin, Plane, Baby, Briefcase, Zap, Crown,
  Sun, Snowflake, Search, Star, Clock
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'
import toast from 'react-hot-toast'

// Destination suggestions
const POPULAR_DESTINATIONS = [
  { id: 'paris', name: 'Paris', country: 'França', emoji: '🗼', tags: ['Romântico', 'Cultura'] },
  { id: 'tokyo', name: 'Tóquio', country: 'Japão', emoji: '🏯', tags: ['Cultura', 'Gastronomia'] },
  { id: 'lisbon', name: 'Lisboa', country: 'Portugal', emoji: '🚃', tags: ['Fácil', 'Gastronomia'] },
  { id: 'bali', name: 'Bali', country: 'Indonésia', emoji: '🌴', tags: ['Aventura', 'Praia'] },
  { id: 'nyc', name: 'Nova York', country: 'EUA', emoji: '🗽', tags: ['Urbano', 'Compras'] },
  { id: 'rome', name: 'Roma', country: 'Itália', emoji: '🏛️', tags: ['História', 'Gastronomia'] },
  { id: 'barcelona', name: 'Barcelona', country: 'Espanha', emoji: '🏖️', tags: ['Praia', 'Arquitetura'] },
  { id: 'london', name: 'Londres', country: 'Reino Unido', emoji: '🎡', tags: ['Cultura', 'História'] },
]

// Travel profiles
const TRAVEL_PROFILES = [
  { id: 'romantic', name: 'Romântico', icon: Heart, description: 'Viagem a dois, experiências especiais', color: 'pink-500' },
  { id: 'family', name: 'Família', icon: Baby, description: 'Com crianças, atividades para todos', color: 'blue-500' },
  { id: 'adventure', name: 'Aventura', icon: Compass, description: 'Trilhas, esportes, adrenalina', color: 'orange-500' },
  { id: 'foodie', name: 'Gastronômico', icon: Utensils, description: 'Restaurantes, mercados, culinária local', color: 'amber-500' },
  { id: 'budget', name: 'Econômico', icon: Wallet, description: 'Máximo com mínimo investimento', color: 'green-500' },
  { id: 'luxury', name: 'Luxo', icon: Crown, description: 'Experiências premium, sem limites', color: 'purple-500' },
  { id: 'business', name: 'Bleisure', icon: Briefcase, description: 'Negócios + lazer combinados', color: 'slate-500' },
  { id: 'solo', name: 'Solo', icon: Zap, description: 'Viajando sozinho(a), flexibilidade total', color: 'cyan-500' },
]

// Budget ranges
const BUDGET_RANGES = [
  { id: 'economic', label: 'Econômico', range: 'R$ 3.000 - 5.000', description: 'Hostels, transporte público, comida local' },
  { id: 'moderate', label: 'Moderado', range: 'R$ 5.000 - 10.000', description: 'Hotéis 3-4★, mix de experiências' },
  { id: 'comfort', label: 'Confortável', range: 'R$ 10.000 - 20.000', description: 'Hotéis 4-5★, restaurantes selecionados' },
  { id: 'luxury', label: 'Luxo', range: 'R$ 20.000+', description: 'Hotéis 5★, experiências exclusivas' },
]

export default function NewTripWizard({ onClose }) {
  const navigate = useNavigate()
  const { createTrip } = useTripContext()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Form state
  const [tripData, setTripData] = useState({
    destination: null,
    customDestination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    profile: null,
    budget: null,
    interests: [],
    specialRequests: ''
  })

  const totalSteps = 5

  const updateData = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch(step) {
      case 1: return tripData.destination || tripData.customDestination
      case 2: return tripData.startDate && tripData.endDate
      case 3: return tripData.profile
      case 4: return tripData.budget
      case 5: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleCreateTrip()
    }
  }

  const handleCreateTrip = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const dest = tripData.destination || POPULAR_DESTINATIONS.find(d => 
      d.name.toLowerCase() === tripData.customDestination.toLowerCase()
    ) || { 
      id: tripData.customDestination.toLowerCase().replace(/\s/g, '-'),
      name: tripData.customDestination,
      country: '',
      emoji: '🌍'
    }

    const newTrip = {
      destination: dest.name,
      destination_id: dest.id,
      country: dest.country,
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      travelers: tripData.travelers,
      profile: tripData.profile,
      status: 'planning',
      budget_planned: getBudgetAmount(tripData.budget),
      budget_spent: 0,
      currency: 'BRL',
      progress: 15,
      image: dest.emoji,
    }

    const { data, error } = await createTrip(newTrip)
    
    setIsGenerating(false)
    
    if (!error) {
      toast.success('Viagem criada! O Nexo está gerando seu roteiro...')
      onClose?.()
      navigate(`/trip/${data?.id || 'new'}`)
    }
  }

  const getBudgetAmount = (budgetId) => {
    const amounts = { economic: 4000, moderate: 7500, comfort: 15000, luxury: 30000 }
    return amounts[budgetId] || 10000
  }

  const getDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 0
    const start = new Date(tripData.startDate)
    const end = new Date(tripData.endDate)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-kinu-surface">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-kinu-emerald to-kinu-horizon">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Nova Viagem</h2>
                <p className="text-sm text-kinu-gray-400">Passo {step} de {totalSteps}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-kinu-gray-400 hover:text-white text-2xl">&times;</button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${
                i < step ? 'bg-kinu-emerald' : 'bg-kinu-surface'
              }`} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Destination */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Globe className="w-12 h-12 mx-auto mb-4 text-kinu-emerald" />
                <h3 className="font-display text-2xl font-bold mb-2">Para onde você quer ir?</h3>
                <p className="text-kinu-gray-400">Escolha um destino popular ou digite o seu</p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-400" />
                <input
                  type="text"
                  placeholder="Digite um destino..."
                  value={tripData.customDestination}
                  onChange={(e) => {
                    updateData('customDestination', e.target.value)
                    updateData('destination', null)
                  }}
                  className="input-kinu pl-12 text-lg py-4"
                />
              </div>

              {/* Popular Destinations */}
              <div>
                <p className="text-sm text-kinu-gray-500 mb-3">Destinos populares:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {POPULAR_DESTINATIONS.map(dest => (
                    <button
                      key={dest.id}
                      onClick={() => {
                        updateData('destination', dest)
                        updateData('customDestination', '')
                      }}
                      className={`p-4 rounded-kinu-lg text-left transition-all ${
                        tripData.destination?.id === dest.id
                          ? 'bg-kinu-emerald/20 border-2 border-kinu-emerald'
                          : 'bg-kinu-surface/50 border-2 border-transparent hover:border-kinu-emerald/30'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{dest.emoji}</span>
                      <p className="font-medium">{dest.name}</p>
                      <p className="text-xs text-kinu-gray-500">{dest.country}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dates */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-kinu-emerald" />
                <h3 className="font-display text-2xl font-bold mb-2">Quando você vai viajar?</h3>
                <p className="text-kinu-gray-400">Selecione as datas da sua viagem</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Data de ida</label>
                  <input
                    type="date"
                    value={tripData.startDate}
                    onChange={(e) => updateData('startDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-kinu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Data de volta</label>
                  <input
                    type="date"
                    value={tripData.endDate}
                    onChange={(e) => updateData('endDate', e.target.value)}
                    min={tripData.startDate || new Date().toISOString().split('T')[0]}
                    className="input-kinu"
                  />
                </div>
              </div>

              {getDuration() > 0 && (
                <div className="p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/30 text-center">
                  <p className="text-kinu-emerald font-medium">
                    <Clock className="w-4 h-4 inline mr-2" />
                    {getDuration()} dias de viagem
                  </p>
                </div>
              )}

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-kinu-gray-400 mb-3">Quantos viajantes?</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateData('travelers', Math.max(1, tripData.travelers - 1))}
                    className="w-12 h-12 rounded-full bg-kinu-surface hover:bg-kinu-surface/80 flex items-center justify-center text-xl"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-kinu-gray-400" />
                    <span className="text-2xl font-bold w-8 text-center">{tripData.travelers}</span>
                  </div>
                  <button
                    onClick={() => updateData('travelers', Math.min(10, tripData.travelers + 1))}
                    className="w-12 h-12 rounded-full bg-kinu-surface hover:bg-kinu-surface/80 flex items-center justify-center text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Travel Profile */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Compass className="w-12 h-12 mx-auto mb-4 text-kinu-emerald" />
                <h3 className="font-display text-2xl font-bold mb-2">Qual é o estilo da viagem?</h3>
                <p className="text-kinu-gray-400">Isso nos ajuda a personalizar seu roteiro</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {TRAVEL_PROFILES.map(profile => {
                  const Icon = profile.icon
                  return (
                    <button
                      key={profile.id}
                      onClick={() => updateData('profile', profile.id)}
                      className={`p-4 rounded-kinu-lg text-left transition-all ${
                        tripData.profile === profile.id
                          ? 'bg-kinu-emerald/20 border-2 border-kinu-emerald'
                          : 'bg-kinu-surface/50 border-2 border-transparent hover:border-kinu-emerald/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-${profile.color}/20`}>
                          <Icon className={`w-5 h-5 text-${profile.color}`} />
                        </div>
                        <span className="font-medium">{profile.name}</span>
                      </div>
                      <p className="text-xs text-kinu-gray-500">{profile.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-kinu-emerald" />
                <h3 className="font-display text-2xl font-bold mb-2">Qual é seu orçamento?</h3>
                <p className="text-kinu-gray-400">Para {tripData.travelers} pessoa(s), {getDuration()} dias</p>
              </div>

              <div className="space-y-3">
                {BUDGET_RANGES.map(budget => (
                  <button
                    key={budget.id}
                    onClick={() => updateData('budget', budget.id)}
                    className={`w-full p-4 rounded-kinu-lg text-left transition-all ${
                      tripData.budget === budget.id
                        ? 'bg-kinu-emerald/20 border-2 border-kinu-emerald'
                        : 'bg-kinu-surface/50 border-2 border-transparent hover:border-kinu-emerald/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{budget.label}</span>
                      <span className="text-kinu-emerald font-bold">{budget.range}</span>
                    </div>
                    <p className="text-sm text-kinu-gray-500">{budget.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Summary & Generate */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-kinu-gold" />
                <h3 className="font-display text-2xl font-bold mb-2">Tudo pronto!</h3>
                <p className="text-kinu-gray-400">Confira os detalhes e deixe o Nexo criar seu roteiro</p>
              </div>

              {/* Summary Card */}
              <div className="glass-card p-6 bg-gradient-to-br from-kinu-emerald/10 to-kinu-horizon/10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">
                    {tripData.destination?.emoji || '🌍'}
                  </span>
                  <div>
                    <h4 className="font-display text-2xl font-bold">
                      {tripData.destination?.name || tripData.customDestination}
                    </h4>
                    <p className="text-kinu-gray-400">
                      {tripData.destination?.country || 'Destino personalizado'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-kinu-surface/50">
                    <p className="text-xs text-kinu-gray-500 mb-1">Datas</p>
                    <p className="font-medium">
                      {new Date(tripData.startDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - {new Date(tripData.endDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-xs text-kinu-emerald">{getDuration()} dias</p>
                  </div>
                  <div className="p-3 rounded-lg bg-kinu-surface/50">
                    <p className="text-xs text-kinu-gray-500 mb-1">Viajantes</p>
                    <p className="font-medium">{tripData.travelers} pessoa(s)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-kinu-surface/50">
                    <p className="text-xs text-kinu-gray-500 mb-1">Estilo</p>
                    <p className="font-medium">{TRAVEL_PROFILES.find(p => p.id === tripData.profile)?.name}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-kinu-surface/50">
                    <p className="text-xs text-kinu-gray-500 mb-1">Orçamento</p>
                    <p className="font-medium">{BUDGET_RANGES.find(b => b.id === tripData.budget)?.range}</p>
                  </div>
                </div>
              </div>

              {/* AI Features Preview */}
              <div className="p-4 rounded-kinu-lg bg-kinu-gold/10 border border-kinu-gold/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-kinu-gold" />
                  <span className="font-medium text-kinu-gold">O Nexo vai gerar:</span>
                </div>
                <ul className="space-y-2 text-sm text-kinu-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-kinu-emerald" />
                    Roteiro dia-a-dia personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-kinu-emerald" />
                    Sugestões de restaurantes (Michelin + Clã)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-kinu-emerald" />
                    Protocolo anti jet lag
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-kinu-emerald" />
                    Análise cambial e melhor momento de compra
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-kinu-emerald" />
                    Lista de malas otimizada para o clima
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Generating State */}
          {isGenerating && (
            <div className="absolute inset-0 bg-kinu-night/90 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-kinu-emerald to-kinu-horizon flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-white animate-spin" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">O Nexo está trabalhando...</h3>
                <p className="text-kinu-gray-400">Gerando seu roteiro personalizado</p>
                <div className="mt-4 space-y-2 text-sm text-kinu-gray-500">
                  <p className="animate-pulse">🔍 Analisando destino...</p>
                  <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>🗓️ Organizando dias...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1s' }}>✨ Aplicando curadoria do Clã...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-kinu-surface flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose?.()}
            className="flex items-center gap-2 text-kinu-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Voltar' : 'Cancelar'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed() || isGenerating}
            className="btn-silk flex items-center gap-2 disabled:opacity-50"
          >
            {step === totalSteps ? (
              <>
                <Sparkles className="w-5 h-5" />
                Criar Viagem
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
