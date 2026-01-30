import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Plane, Calendar, Wallet, TrendingUp, TrendingDown,
  MapPin, Users, Sparkles, ArrowRight, Sun, CloudRain,
  Clock, AlertCircle
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'

export default function DashboardHome() {
  const { currentTrip, trips, notifications } = useTripContext()

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">
            Bom dia, Viajante! 🌿
          </h1>
          <p className="text-kinu-gray-400">
            O Nexo identificou <span className="text-kinu-gold font-medium">2 insights</span> para sua viagem.
          </p>
        </div>
        <Link to="/trip/new" className="btn-silk flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Nova Viagem
        </Link>
      </div>

      {/* AI Insights Banner */}
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
              O Euro caiu 3.2% esta semana! Considerando sua viagem para Paris em março, 
              este pode ser um bom momento para converter parte do orçamento.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/currency" className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
                Ver Análise Cambial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="text-sm text-kinu-gray-400 hover:text-kinu-white transition-colors">
                Ignorar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Plane className="w-5 h-5" />}
          label="Próxima Viagem"
          value="44 dias"
          subtext="Paris, França"
          trend="info"
        />
        <StatCard 
          icon={<Wallet className="w-5 h-5" />}
          label="Orçamento"
          value="R$ 15.000"
          subtext="R$ 2.340 já reservado"
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
          label="Atividades"
          value="12"
          subtext="8 confirmadas"
          trend="neutral"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Trip Card */}
        <div className="lg:col-span-2 glass-card p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">Viagem Atual</h2>
            <Link to="/trip/trip-001" className="text-kinu-emerald hover:text-kinu-emerald-light transition-colors text-sm flex items-center gap-1">
              Ver detalhes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-start gap-6">
            {/* Destination Preview */}
            <div className="w-32 h-32 rounded-kinu-lg bg-gradient-to-br from-kinu-emerald/20 to-kinu-horizon/20 flex items-center justify-center text-6xl">
              🗼
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-2xl font-bold">Paris</h3>
                <span className="px-2 py-1 rounded-full bg-kinu-emerald/20 text-kinu-emerald text-xs font-medium">
                  Planejando
                </span>
              </div>
              <p className="text-kinu-gray-400 mb-4">França • 15-22 Março 2025 • 2 viajantes</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-kinu-gray-400">Progresso do planejamento</span>
                  <span className="text-kinu-emerald font-medium">65%</span>
                </div>
                <div className="progress-kinu">
                  <div className="progress-kinu-fill" style={{ width: '65%' }}></div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Link to="/trip/trip-001" className="btn-silk text-sm py-2">
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
                { day: 'Sáb 15', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '12°' },
                { day: 'Dom 16', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '14°' },
                { day: 'Seg 17', icon: <CloudRain className="w-5 h-5 text-kinu-horizon" />, temp: '10°' },
                { day: 'Ter 18', icon: <CloudRain className="w-5 h-5 text-kinu-horizon" />, temp: '11°' },
                { day: 'Qua 19', icon: <Sun className="w-5 h-5 text-kinu-gold" />, temp: '13°' },
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

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Jet Lag Alert */}
          <div className="glass-card p-5 border-l-4 border-l-kinu-gold">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-kinu-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-kinu-gold mb-1">Alerta Jet Lag</h4>
                <p className="text-sm text-kinu-gray-300">
                  Paris está +4h do seu fuso. O Nexo preparou um protocolo de adaptação 
                  para os primeiros 2 dias.
                </p>
                <Link to="/trip/trip-001" className="text-kinu-gold text-sm mt-2 inline-flex items-center gap-1 hover:underline">
                  Ver protocolo <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Activities */}
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Próximas Reservas</h3>
            <div className="space-y-3">
              {[
                { name: 'Louvre - Ingresso', date: '15 Mar, 10:00', status: 'confirmed' },
                { name: 'Torre Eiffel - Skip line', date: '16 Mar, 18:00', status: 'pending' },
                { name: 'Cruzeiro no Sena', date: '17 Mar, 20:00', status: 'confirmed' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-kinu-surface/30">
                  <div>
                    <p className="font-medium text-sm">{activity.name}</p>
                    <p className="text-xs text-kinu-gray-500">{activity.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.status === 'confirmed' 
                      ? 'bg-kinu-emerald/20 text-kinu-emerald' 
                      : 'bg-kinu-gold/20 text-kinu-gold'
                  }`}>
                    {activity.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>

      {/* Other Trips */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold">Outras Viagens</h2>
          <Link to="/trip/new" className="text-kinu-emerald hover:text-kinu-emerald-light transition-colors text-sm flex items-center gap-1">
            Nova viagem <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.filter(t => t.id !== 'trip-001').map(trip => (
            <Link 
              key={trip.id}
              to={`/trip/${trip.id}`}
              className="p-4 rounded-kinu-lg bg-kinu-surface/30 border border-kinu-surface hover:border-kinu-emerald/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{trip.image}</span>
                <div>
                  <h4 className="font-medium">{trip.destination}</h4>
                  <p className="text-sm text-kinu-gray-400">{trip.country}</p>
                  <p className="text-xs text-kinu-gray-500">{trip.dates}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-kinu-gray-500">Progresso</span>
                  <span className="text-kinu-emerald">{trip.progress}%</span>
                </div>
                <div className="progress-kinu h-1">
                  <div className="progress-kinu-fill" style={{ width: `${trip.progress}%` }}></div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Add New Trip Card */}
          <Link 
            to="/trip/new"
            className="p-4 rounded-kinu-lg border-2 border-dashed border-kinu-surface hover:border-kinu-emerald/50 transition-all flex items-center justify-center min-h-[140px]"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-kinu-surface/50 flex items-center justify-center mx-auto mb-2">
                <Plane className="w-6 h-6 text-kinu-gray-400" />
              </div>
              <p className="text-sm text-kinu-gray-400">Adicionar viagem</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, label, value, subtext, trend }) {
  const trendColors = {
    positive: 'text-kinu-emerald',
    negative: 'text-red-400',
    neutral: 'text-kinu-gray-400',
    info: 'text-kinu-horizon'
  }

  return (
    <div className="glass-card p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-kinu-surface/50">
          {icon}
        </div>
        <span className={`text-xs ${trendColors[trend]}`}>{subtext}</span>
      </div>
      <p className="text-kinu-gray-400 text-sm mb-1">{label}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
    </div>
  )
}
