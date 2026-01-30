import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Shield, Syringe, FileText, Globe, MessageCircle,
  ChevronRight, Check, AlertTriangle, Info, Volume2,
  Plane, Clock, Thermometer, Banknote, Users
} from 'lucide-react'
import destinations from '../../data/destinations.json'

const visaStatus = {
  'dispensado_90dias': { label: 'Dispensado (90 dias)', color: 'kinu-emerald', icon: Check },
  'esta_obrigatorio': { label: 'ESTA Obrigatório', color: 'kinu-gold', icon: AlertTriangle },
  'eta_obrigatorio': { label: 'ETA Obrigatório', color: 'kinu-gold', icon: AlertTriangle },
  'na_chegada_30dias': { label: 'Visto na chegada', color: 'kinu-horizon', icon: Info },
  'obrigatorio': { label: 'Visto obrigatório', color: 'red-400', icon: AlertTriangle },
}

export default function DestinationGuide() {
  const { destination: destId } = useParams()
  const [selectedDestination, setSelectedDestination] = useState(destId || 'paris')
  const [playingPhrase, setPlayingPhrase] = useState(null)

  const destination = destinations.destinations.find(d => d.id === selectedDestination) || destinations.destinations[0]
  const visa = visaStatus[destination.visa?.br] || visaStatus['dispensado_90dias']
  const VisaIcon = visa.icon

  // Simulate pronunciation
  const playPronunciation = (phrase) => {
    setPlayingPhrase(phrase)
    setTimeout(() => setPlayingPhrase(null), 1500)
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Guia do Destino</h1>
          <p className="text-kinu-gray-400">Tudo que você precisa saber antes de embarcar</p>
        </div>
      </div>

      {/* Destination Selector */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {destinations.destinations.slice(0, 8).map(dest => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestination(dest.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-kinu-lg transition-all ${
                selectedDestination === dest.id
                  ? 'bg-gradient-to-r from-kinu-emerald/20 to-kinu-horizon/10 border border-kinu-emerald'
                  : 'bg-kinu-surface/30 hover:bg-kinu-surface/50 border border-transparent'
              }`}
            >
              <span className="text-2xl">{dest.emoji}</span>
              <div className="text-left">
                <p className="font-medium text-sm">{dest.name}</p>
                <p className="text-xs text-kinu-gray-500">{dest.country}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Destination Header Card */}
      <div className="glass-card p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-kinu-emerald/10 to-kinu-horizon/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative flex items-start gap-6">
          <div className="text-8xl">{destination.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-3xl font-bold">{destination.name}</h2>
              <span className="px-3 py-1 rounded-full bg-kinu-surface/50 text-sm">
                {destination.country}
              </span>
            </div>
            <p className="text-kinu-gray-400 mb-4">{destination.continent}</p>
            
            <div className="flex flex-wrap gap-2">
              {destination.tags?.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-kinu-emerald/10 text-kinu-emerald text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-kinu-lg bg-kinu-surface/30">
              <Thermometer className="w-5 h-5 mx-auto mb-2 text-kinu-gold" />
              <p className="text-lg font-bold">{destination.avgTemp?.summer}°C</p>
              <p className="text-xs text-kinu-gray-500">Verão</p>
            </div>
            <div className="text-center p-4 rounded-kinu-lg bg-kinu-surface/30">
              <Clock className="w-5 h-5 mx-auto mb-2 text-kinu-horizon" />
              <p className="text-lg font-bold">UTC{destination.utcOffset >= 0 ? '+' : ''}{destination.utcOffset}</p>
              <p className="text-xs text-kinu-gray-500">Fuso</p>
            </div>
            <div className="text-center p-4 rounded-kinu-lg bg-kinu-surface/30">
              <Banknote className="w-5 h-5 mx-auto mb-2 text-kinu-emerald" />
              <p className="text-lg font-bold">{destination.currency}</p>
              <p className="text-xs text-kinu-gray-500">Moeda</p>
            </div>
            <div className="text-center p-4 rounded-kinu-lg bg-kinu-surface/30">
              <Shield className="w-5 h-5 mx-auto mb-2 text-kinu-emerald" />
              <p className="text-lg font-bold">{destination.safetyScore}/10</p>
              <p className="text-xs text-kinu-gray-500">Segurança</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requirements Column */}
        <div className="space-y-6">
          {/* Visa */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-kinu-emerald/20">
                <FileText className="w-5 h-5 text-kinu-emerald" />
              </div>
              <h3 className="font-display font-semibold">Visto para Brasileiros</h3>
            </div>
            
            <div className={`p-4 rounded-kinu-lg bg-${visa.color}/10 border border-${visa.color}/30`}>
              <div className="flex items-center gap-3">
                <VisaIcon className={`w-6 h-6 text-${visa.color}`} />
                <div>
                  <p className={`font-medium text-${visa.color}`}>{visa.label}</p>
                  <p className="text-sm text-kinu-gray-400">
                    {destination.visa?.br === 'esta_obrigatorio' 
                      ? 'Solicite online em travel.state.gov'
                      : destination.visa?.br === 'eta_obrigatorio'
                      ? 'Solicite online antes da viagem'
                      : 'Passaporte válido por 6 meses'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vaccines */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-kinu-horizon/20">
                <Syringe className="w-5 h-5 text-kinu-horizon" />
              </div>
              <h3 className="font-display font-semibold">Vacinas</h3>
            </div>
            
            {destination.vaccines?.length > 0 ? (
              <ul className="space-y-2">
                {destination.vaccines.map((vaccine, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-kinu-gold" />
                    <span>{vaccine.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/30">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-kinu-emerald" />
                  <span className="text-kinu-emerald">Nenhuma vacina obrigatória</span>
                </div>
                <p className="text-sm text-kinu-gray-400 mt-2">
                  Recomendamos estar com as vacinas básicas em dia.
                </p>
              </div>
            )}
          </div>

          {/* Insurance */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-kinu-gold/20">
                <Shield className="w-5 h-5 text-kinu-gold" />
              </div>
              <h3 className="font-display font-semibold">Seguro Viagem</h3>
            </div>
            
            <div className="p-4 rounded-kinu-lg bg-kinu-surface/30">
              <p className="text-sm text-kinu-gray-300 mb-3">
                {destination.continent === 'Europa' 
                  ? 'Obrigatório para países do Tratado de Schengen. Cobertura mínima de €30.000.'
                  : 'Altamente recomendado. Cobertura sugerida: USD 50.000.'}
              </p>
              <button className="w-full btn-silk-outline text-sm py-2">
                Cotar Seguro
              </button>
            </div>
          </div>
        </div>

        {/* Phrases Column */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-kinu-gold/20">
                <MessageCircle className="w-5 h-5 text-kinu-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Frases do Clã</h3>
                <p className="text-sm text-kinu-gray-400">Essenciais em {destination.language}</p>
              </div>
            </div>
            <span className="section-tag text-xs">
              <Users className="w-3 h-3" />
              Validado pelo Clã
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.phrases && Object.entries(destination.phrases).map(([key, value]) => {
              const labels = {
                hello: 'Olá',
                thanks: 'Obrigado',
                please: 'Por favor',
                sorry: 'Desculpa',
                howMuch: 'Quanto custa?'
              }
              
              return (
                <div 
                  key={key}
                  className="p-4 rounded-kinu-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-kinu-gray-400">{labels[key]}</span>
                    <button 
                      onClick={() => playPronunciation(key)}
                      className="p-2 rounded-lg bg-kinu-gold/20 hover:bg-kinu-gold/30 transition-colors"
                    >
                      <Volume2 className={`w-4 h-4 text-kinu-gold ${playingPhrase === key ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                  <p className="font-display text-xl font-semibold">{value}</p>
                </div>
              )
            })}
          </div>

          {/* Clan Tips */}
          <div className="mt-6 pt-6 border-t border-kinu-surface">
            <h4 className="font-medium mb-4">💡 Dicas do Clã para {destination.name}</h4>
            <div className="space-y-3">
              {destination.clanTips?.map((tip, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-kinu-lg bg-kinu-emerald/10 border border-kinu-emerald/20"
                >
                  <p className="text-sm text-kinu-gray-300 mb-2">"{tip.tip}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-kinu-gray-500">@{tip.author}</span>
                    <span className="text-xs text-kinu-emerald flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {tip.votes} votos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">🌟 Destaques Imperdíveis</h3>
        <div className="flex flex-wrap gap-3">
          {destination.highlights?.map((highlight, i) => (
            <div 
              key={i}
              className="px-4 py-3 rounded-kinu-lg bg-kinu-surface/30 hover:bg-kinu-emerald/10 hover:border-kinu-emerald/30 border border-transparent transition-all cursor-pointer"
            >
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Time to Visit */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">📅 Melhor Época para Visitar</h3>
        <div className="flex gap-2">
          {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((month, i) => {
            const monthNum = i + 1
            const isBest = destination.bestMonths?.includes(monthNum)
            
            return (
              <div 
                key={month}
                className={`flex-1 py-3 rounded-lg text-center text-sm transition-all ${
                  isBest 
                    ? 'bg-kinu-emerald/20 text-kinu-emerald border border-kinu-emerald/30' 
                    : 'bg-kinu-surface/30 text-kinu-gray-500'
                }`}
              >
                {month}
              </div>
            )
          })}
        </div>
        <p className="text-sm text-kinu-gray-400 mt-3">
          🟢 Meses em destaque são ideais para visitar, considerando clima e eventos locais.
        </p>
      </div>
    </div>
  )
}
