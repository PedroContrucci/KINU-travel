import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plane, Calendar, Wallet, TrendingUp, TrendingDown,
  MapPin, Users, Sparkles, ArrowRight, Sun, CloudRain,
  Clock, Plus, Globe, Compass, Heart, Zap
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'
import { useAuth } from '../../context/AuthContext'
import NewTripWizard from '../trip/NewTripWizard'

export default function DashboardHome() {
  const { currentTrip, trips, loading } = useTripContext()
  const { user } = useAuth()
  const [showWizard, setShowWizard] = useState(false)

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Viajante'
  const hasTrips = trips.length > 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Globe className="w-12 h-12 mx-auto mb-4 text-kinu-emerald animate-pulse" />
          <p className="text-kinu-gray-400">Carregando suas viagens...</p>
        </div>
      </div>
    )
  }

  // Empty State - First Time User
  if (!hasTrips) {
    return (
      <>
        <EmptyState userName={userName} onCreateTrip={() => setShowWizard(true)} />
        {showWizard && <NewTripWizard onClose={() => setShowWizard(false)} />}
      </>
    )
  }

  // Normal Dashboard with trips
  return (
    <>
      <div className="space-y-6 animate-slide-up">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">
              Olá, {userName}! 🌿
            </h1>
            <p className="text-kinu-gray-400">
              {currentTrip ? (
                <>Faltam <span className="text-kinu-emerald font-medium">{getDaysUntil(currentTrip.start_date)} dias</span> para {currentTrip.destination}!</>
              ) : (
                'O Nexo está pronto para ajudar.'
              )}
            </p>
          </div>
          <button onClick={() => setShowWizard(true)} className="btn-silk flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Viagem
          </button>
        </div>

        {/* AI Insight Banner */}
        <div className="glass-gold rounded-kinu-xl p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-kinu-gold/20">
              <Sparkles className="w-6 h-6 text-kinu-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-kinu-gold mb-1">
                Insight do Nexo
              </h3>
              <p className="text-kinu-gray-300 mb-3">
                O Euro caiu 3.2% esta semana! Considerando sua viagem para {currentTrip?.destination || 'Europa'}, 
                este pode ser um bom momento para converter parte do orçamento.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/currency" className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
                  Ver Análise Cambial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<Plane className="w-5 h-5" />}
            label="Próxima Viagem"
            value={currentTrip ? `${getDaysUntil(currentTrip.start_date)} dias` : '-'}
            subtext={currentTrip?.destination || 'Nenhuma viagem'}
            trend="info"
          />
          <StatCard 
            icon={<Wallet className="w-5 h-5" />}
            label="Orçamento"
            value={currentTrip ? `R$ ${(currentTrip.budget_planned || 0).toLocaleString()}` : '-'}
            subtext={currentTrip ? `R$ ${(currentTrip.budget_spent || 0).toLocaleString()} gasto` : '-'}
            trend="neutral"
          />
          <StatCard 
            icon={<TrendingDown className="w-5 h-5 text-kinu-emerald" />}
            label="EUR / BRL"
            value="R$ 5,42"
            subtext="-3.2% esta semana"
            trend="positive"
          />
          <StatCard 
            icon={<Calendar className="w-5 h-5" />}
            label="Viagens"
            value={trips.length.toString()}
            subtext={`${trips.filter(t => t.status === 'planning').length} em planejamento`}
            trend="neutral"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Trip Card */}
          {currentTrip && (
            <div className="lg:col-span-2 glass-card p-6 card-hover">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold">Viagem Atual</h2>
                <Link to={`/trip/${currentTrip.id}`} className="text-kinu-emerald hover:text-kinu-emerald-light transition-colors text-sm flex items-center gap-1">
                  Ver detalhes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-kinu-lg bg-gradient-to-br from-kinu-emerald/20 to-kinu-horizon/20 flex items-center justify-center text-6xl">
                  {currentTrip.image || '🌍'}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-2xl font-bold">{currentTrip.destination}</h3>
                    <span className="px-2 py-1 rounded-full bg-kinu-emerald/20 text-kinu-emerald text-xs font-medium">
                      {currentTrip.status === 'planning' ? 'Planejando' : currentTrip.status}
                    </span>
                  </div>
                  <p className="text-kinu-gray-400 mb-4">
                    {currentTrip.country} • {formatDateRange(currentTrip.start_date, currentTrip.end_date)} • {currentTrip.travelers} viajante(s)
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-kinu-gray-400">Progresso do planejamento</span>
                      <span className="text-kinu-emerald font-medium">{currentTrip.progress || 0}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-kinu-surface overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-kinu-emerald to-kinu-horizon transition-all" 
                           style={{ width: `${currentTrip.progress || 0}%` }} />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-3">
                    <Link to={`/trip/${currentTrip.id}`} className="btn-silk text-sm py-2">
                      Continuar Planejamento
                    </Link>
                    <Link to="/packing" className="btn-silk-outline text-sm py-2">
                      Preparar Malas
                    </Link>
                  </div>
                </div>
              </div>

              {/* Weather Preview */}
              <div className="mt-6 pt-6 border-t border-kinu-surface">
                <h4 className="text-sm font-medium text-kinu-gray-400 mb-3">Previsão para sua viagem</h4>
                <div className="flex items-center gap-4">
                  {[
                    { day: 'Sáb', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '12°' },
                    { day: 'Dom', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '14°' },
                    { day: 'Seg', icon: <CloudRain className="w-5 h-5 text-kinu-horizon" />, temp: '10°' },
                    { day: 'Ter', icon: <CloudRain className="w-5 h-5 text-kinu-horizon" />, temp: '11°' },
                    { day: 'Qua', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '13°' },
                  ].map((day, i) => (
                    <div key={i} className="flex-1 text-center p-3 rounded-lg bg-kinu-surface/30">
                      <p className="text-xs text-kinu-gray-500 mb-1">{day.day}</p>
                      {day.icon}
                      <p className="text-sm font-medium mt-1">{day.temp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Jet Lag Alert */}
            {currentTrip && (
              <div className="glass-card p-5 border-l-4 border-l-kinu-gold">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-kinu-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-kinu-gold mb-1">Alerta Jet Lag</h4>
                    <p className="text-sm text-kinu-gray-300">
                      {currentTrip.destination} está em fuso diferente. O Nexo preparou um protocolo de adaptação.
                    </p>
                    <Link to={`/trip/${currentTrip.id}`} className="text-kinu-gold text-sm mt-2 inline-flex items-center gap-1 hover:underline">
                      Ver protocolo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Clan Wisdom Teaser */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Sabedoria do Clã</h3>
                <Link to="/clan" className="text-kinu-emerald text-sm hover:underline">Ver mais</Link>
              </div>
              <div className="p-4 rounded-lg bg-kinu-emerald/10 border border-kinu-emerald/20">
                <p className="text-sm text-kinu-gray-300 italic mb-3">
                  "Reserve o Louvre para quarta-feira de manhã. É o dia mais vazio da semana."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-kinu-gray-500">@MariaV • 234 votos</span>
                  <div className="flex items-center gap-1 text-kinu-emerald text-xs">
                    <Users className="w-3 h-3" />
                    Validado pelo Clã
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <Link to="/currency" className="flex items-center gap-3 p-3 rounded-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors">
                  <TrendingDown className="w-5 h-5 text-kinu-emerald" />
                  <span className="text-sm">Ver câmbio</span>
                </Link>
                <Link to="/packing" className="flex items-center gap-3 p-3 rounded-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors">
                  <Plane className="w-5 h-5 text-kinu-horizon" />
                  <span className="text-sm">Preparar malas</span>
                </Link>
                <Link to="/guide" className="flex items-center gap-3 p-3 rounded-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors">
                  <Globe className="w-5 h-5 text-kinu-gold" />
                  <span className="text-sm">Guia de destino</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Trips */}
        {trips.length > 1 && (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">Outras Viagens</h2>
              <button onClick={() => setShowWizard(true)} className="text-kinu-emerald hover:text-kinu-emerald-light transition-colors text-sm flex items-center gap-1">
                Nova viagem <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips.filter(t => t.id !== currentTrip?.id).map(trip => (
                <Link key={trip.id} to={`/trip/${trip.id}`}
                  className="p-4 rounded-kinu-lg bg-kinu-surface/30 border border-kinu-surface hover:border-kinu-emerald/30 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{trip.image || '🌍'}</span>
                    <div>
                      <h4 className="font-medium">{trip.destination}</h4>
                      <p className="text-sm text-kinu-gray-400">{trip.country}</p>
                      <p className="text-xs text-kinu-gray-500">{formatDateRange(trip.start_date, trip.end_date)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {showWizard && <NewTripWizard onClose={() => setShowWizard(false)} />}
    </>
  )
}

// Empty State Component
function EmptyState({ userName, onCreateTrip }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-lg">
        {/* Welcome Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-kinu-emerald/20 to-kinu-horizon/20 flex items-center justify-center">
            <Globe className="w-16 h-16 text-kinu-emerald animate-float" />
          </div>
          <div className="absolute -top-2 -right-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <span className="text-4xl">✨</span>
          </div>
          <div className="absolute -bottom-2 -left-8 animate-bounce" style={{ animationDelay: '1s' }}>
            <span className="text-4xl">🌿</span>
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold mb-4">
          Bem-vindo ao KINU, {userName}! 🌿
        </h1>
        <p className="text-xl text-kinu-gray-400 mb-8">
          Onde a sabedoria do clã encontra a precisão da engenharia.
        </p>

        <p className="text-kinu-gray-400 mb-8 max-w-md mx-auto">
          Vamos criar sua primeira viagem? O Nexo vai usar inteligência artificial 
          combinada com curadoria Michelin e Condé Nast para criar um roteiro 
          perfeito para você.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
            <Sparkles className="w-6 h-6 text-kinu-gold mb-2" />
            <h3 className="font-medium mb-1">Roteiro Inteligente</h3>
            <p className="text-xs text-kinu-gray-500">IA que aprende seu estilo</p>
          </div>
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
            <Users className="w-6 h-6 text-kinu-emerald mb-2" />
            <h3 className="font-medium mb-1">Sabedoria do Clã</h3>
            <p className="text-xs text-kinu-gray-500">Dicas de viajantes reais</p>
          </div>
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
            <TrendingDown className="w-6 h-6 text-kinu-horizon mb-2" />
            <h3 className="font-medium mb-1">Motor Cambial</h3>
            <p className="text-xs text-kinu-gray-500">Previsão de 12 meses</p>
          </div>
          <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
            <Clock className="w-6 h-6 text-purple-400 mb-2" />
            <h3 className="font-medium mb-1">Anti Jet Lag</h3>
            <p className="text-xs text-kinu-gray-500">Protocolo personalizado</p>
          </div>
        </div>

        <button onClick={onCreateTrip} className="btn-silk text-lg px-8 py-4 flex items-center gap-3 mx-auto">
          <Plane className="w-6 h-6" />
          Criar Minha Primeira Viagem
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-sm text-kinu-gray-500 mt-6">
          Leva menos de 2 minutos ⚡
        </p>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, label, value, subtext, trend }) {
  const trendColors = { positive: 'text-kinu-emerald', negative: 'text-red-400', neutral: 'text-kinu-gray-400', info: 'text-kinu-horizon' }
  return (
    <div className="glass-card p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-kinu-surface/50">{icon}</div>
        <span className={`text-xs ${trendColors[trend]}`}>{subtext}</span>
      </div>
      <p className="text-kinu-gray-400 text-sm mb-1">{label}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
    </div>
  )
}

// Helper functions
function getDaysUntil(dateStr) {
  if (!dateStr) return 0
  const target = new Date(dateStr)
  const today = new Date()
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return Math.max(0, diff)
}

function formatDateRange(start, end) {
  if (!start || !end) return ''
  const s = new Date(start)
  const e = new Date(end)
  return `${s.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${e.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`
}
