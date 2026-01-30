import React, { useState } from 'react'
import { 
  Users, ThumbsUp, ThumbsDown, MessageCircle, Star,
  Filter, TrendingUp, Clock, MapPin, Sparkles,
  Check, AlertCircle, Globe, Award, Flame
} from 'lucide-react'

// Simulated clan wisdom data with relevance scores
const clanTips = [
  {
    id: 1,
    destination: 'Paris',
    category: 'transporte',
    tip: 'O metrô de Paris fecha à 1h15, mas o último trem sai às 0h40 da maioria das estações. Planeje com 30 min de margem!',
    author: 'MariaViajante',
    authorTrips: 47,
    authorBadge: 'expert',
    votes: 567,
    downvotes: 12,
    relevanceScore: 0.94,
    verified: true,
    createdAt: '2024-11-15',
    comments: 23,
    tags: ['metrô', 'noite', 'transporte'],
  },
  {
    id: 2,
    destination: 'Paris',
    category: 'gastronomia',
    tip: 'Croissant mais autêntico e barato: padarias fora das áreas turísticas. Evite as perto de pontos famosos - são 3x mais caras e menos frescas.',
    author: 'PedroGourmet',
    authorTrips: 32,
    authorBadge: 'foodie',
    votes: 423,
    downvotes: 8,
    relevanceScore: 0.91,
    verified: true,
    createdAt: '2024-10-20',
    comments: 45,
    tags: ['comida', 'economia', 'café'],
  },
  {
    id: 3,
    destination: 'Tóquio',
    category: 'economia',
    tip: 'Compre o JR Pass ANTES de sair do Brasil. Só funciona assim e economiza muito em Shinkansen (trem-bala)!',
    author: 'AndreNihon',
    authorTrips: 12,
    authorBadge: 'verified',
    votes: 789,
    downvotes: 5,
    relevanceScore: 0.97,
    verified: true,
    createdAt: '2024-12-01',
    comments: 67,
    tags: ['trem', 'economia', 'planejamento'],
  },
  {
    id: 4,
    destination: 'Roma',
    category: 'cultura',
    tip: 'Reserve Vaticano e Coliseu online com antecedência. Filas de 3+ horas sem reserva, e você perde meio dia de viagem.',
    author: 'CamilaBella',
    authorTrips: 28,
    authorBadge: 'expert',
    votes: 654,
    downvotes: 15,
    relevanceScore: 0.92,
    verified: true,
    createdAt: '2024-09-10',
    comments: 34,
    tags: ['reserva', 'museu', 'fila'],
  },
  {
    id: 5,
    destination: 'Nova York',
    category: 'transporte',
    tip: 'MetroCard ilimitado de 7 dias ($34) vale muito a pena se você pretende usar metrô mais de 2x por dia. Faz a matemática!',
    author: 'FernandaNYC',
    authorTrips: 56,
    authorBadge: 'expert',
    votes: 512,
    downvotes: 22,
    relevanceScore: 0.88,
    verified: true,
    createdAt: '2024-08-25',
    comments: 28,
    tags: ['metrô', 'economia', 'transporte'],
  },
  {
    id: 6,
    destination: 'Paris',
    category: 'cultura',
    tip: 'Louvre nas quartas de manhã é o dia mais vazio. Sexta à noite também funciona bem e tem entrada gratuita para menores de 26 anos da UE.',
    author: 'LucasArte',
    authorTrips: 19,
    authorBadge: 'verified',
    votes: 389,
    downvotes: 11,
    relevanceScore: 0.89,
    verified: true,
    createdAt: '2024-11-28',
    comments: 19,
    tags: ['museu', 'horário', 'economia'],
  },
  {
    id: 7,
    destination: 'Bali',
    category: 'transporte',
    tip: 'Alugue scooter - é a melhor forma de explorar. Precisa de CNH internacional, mas o aluguel custa só ~R$30/dia. Negocie sempre!',
    author: 'BrunoSurf',
    authorTrips: 8,
    authorBadge: 'adventurer',
    votes: 445,
    downvotes: 33,
    relevanceScore: 0.85,
    verified: true,
    createdAt: '2024-07-15',
    comments: 52,
    tags: ['scooter', 'liberdade', 'economia'],
  },
  {
    id: 8,
    destination: 'Lisboa',
    category: 'gastronomia',
    tip: 'Pastel de Belém original só existe na fábrica em Belém. Todas as outras são "pastéis de nata". Chegue antes das 10h para evitar fila.',
    author: 'CarlosLisboa',
    authorTrips: 23,
    authorBadge: 'foodie',
    votes: 567,
    downvotes: 8,
    relevanceScore: 0.93,
    verified: true,
    createdAt: '2024-10-05',
    comments: 41,
    tags: ['comida', 'autêntico', 'horário'],
  },
]

const categories = [
  { id: 'all', label: 'Todas', icon: Globe },
  { id: 'transporte', label: 'Transporte', icon: MapPin },
  { id: 'gastronomia', label: 'Gastronomia', icon: Star },
  { id: 'cultura', label: 'Cultura', icon: Award },
  { id: 'economia', label: 'Economia', icon: TrendingUp },
]

const badges = {
  expert: { label: 'Expert', color: 'kinu-gold', icon: Award },
  foodie: { label: 'Foodie', color: 'pink-400', icon: Star },
  adventurer: { label: 'Aventureiro', color: 'kinu-horizon', icon: Flame },
  verified: { label: 'Verificado', color: 'kinu-emerald', icon: Check },
}

export default function ClanWisdom() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDestination, setSelectedDestination] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [votedTips, setVotedTips] = useState({})

  // Get unique destinations
  const destinations = [...new Set(clanTips.map(t => t.destination))]

  // Filter and sort tips
  let filteredTips = clanTips
    .filter(tip => selectedCategory === 'all' || tip.category === selectedCategory)
    .filter(tip => selectedDestination === 'all' || tip.destination === selectedDestination)

  if (sortBy === 'relevance') {
    filteredTips = filteredTips.sort((a, b) => b.relevanceScore - a.relevanceScore)
  } else if (sortBy === 'votes') {
    filteredTips = filteredTips.sort((a, b) => b.votes - a.votes)
  } else if (sortBy === 'recent') {
    filteredTips = filteredTips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const handleVote = (tipId, type) => {
    setVotedTips(prev => ({
      ...prev,
      [tipId]: prev[tipId] === type ? null : type
    }))
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Sabedoria do Clã</h1>
          <p className="text-kinu-gray-400">Dicas validadas pela comunidade KINU</p>
        </div>
        <button className="btn-silk flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Compartilhar Dica
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <Users className="w-6 h-6 mx-auto mb-2 text-kinu-emerald" />
          <p className="font-display text-2xl font-bold">12.847</p>
          <p className="text-sm text-kinu-gray-400">Membros do Clã</p>
        </div>
        <div className="glass-card p-5 text-center">
          <MessageCircle className="w-6 h-6 mx-auto mb-2 text-kinu-horizon" />
          <p className="font-display text-2xl font-bold">3.456</p>
          <p className="text-sm text-kinu-gray-400">Dicas Validadas</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Globe className="w-6 h-6 mx-auto mb-2 text-kinu-gold" />
          <p className="font-display text-2xl font-bold">127</p>
          <p className="text-sm text-kinu-gray-400">Destinos Cobertos</p>
        </div>
        <div className="glass-card p-5 text-center">
          <ThumbsUp className="w-6 h-6 mx-auto mb-2 text-pink-400" />
          <p className="font-display text-2xl font-bold">98.2%</p>
          <p className="text-sm text-kinu-gray-400">Taxa de Aprovação</p>
        </div>
      </div>

      {/* AI Relevance Explanation */}
      <div className="glass-gold rounded-kinu-xl p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-kinu-gold/20">
            <Sparkles className="w-6 h-6 text-kinu-gold" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-kinu-gold mb-1">
              🧠 Algoritmo de Relevância Cultural
            </h3>
            <p className="text-kinu-gray-300 text-sm">
              Cada dica é pontuada por nosso algoritmo que considera: <strong>votos da comunidade</strong> (40%), 
              <strong>experiência do autor</strong> (25%), <strong>recência</strong> (20%) e 
              <strong>verificação de fatos</strong> (15%). Dicas com score &gt; 0.85 recebem selo de destaque.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Destination Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-kinu-gray-400" />
            <select 
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="input-kinu py-2 text-sm"
            >
              <option value="all">Todos os destinos</option>
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-kinu-emerald text-white'
                      : 'bg-kinu-surface/50 text-kinu-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <Filter className="w-4 h-4 text-kinu-gray-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-kinu py-2 text-sm"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="votes">Mais votadas</option>
              <option value="recent">Mais recentes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTips.map(tip => {
          const badge = badges[tip.authorBadge]
          const BadgeIcon = badge?.icon || Check
          const userVote = votedTips[tip.id]
          
          return (
            <div 
              key={tip.id}
              className={`glass-card p-6 card-hover ${
                tip.relevanceScore >= 0.9 ? 'border-kinu-gold/30' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kinu-emerald to-kinu-horizon flex items-center justify-center text-white font-bold">
                    {tip.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tip.author}</span>
                      {badge && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-${badge.color}/20 text-${badge.color}`}>
                          <BadgeIcon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-kinu-gray-500">{tip.authorTrips} viagens</p>
                  </div>
                </div>
                
                {/* Relevance Score */}
                {tip.relevanceScore >= 0.9 && (
                  <div className="insight-badge">
                    <Sparkles className="w-3 h-3" />
                    {(tip.relevanceScore * 100).toFixed(0)}%
                  </div>
                )}
              </div>

              {/* Destination Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-full bg-kinu-surface/50 text-xs text-kinu-gray-400">
                  📍 {tip.destination}
                </span>
                <span className="px-2 py-1 rounded-full bg-kinu-surface/50 text-xs text-kinu-gray-400">
                  {tip.category}
                </span>
                {tip.verified && (
                  <span className="px-2 py-1 rounded-full bg-kinu-emerald/20 text-xs text-kinu-emerald flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verificado
                  </span>
                )}
              </div>

              {/* Tip Content */}
              <p className="text-kinu-gray-300 mb-4 leading-relaxed">
                "{tip.tip}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tip.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 rounded-full bg-kinu-emerald/10 text-kinu-emerald text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-kinu-surface">
                {/* Voting */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleVote(tip.id, 'up')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      userVote === 'up'
                        ? 'bg-kinu-emerald/20 text-kinu-emerald'
                        : 'hover:bg-kinu-surface/50 text-kinu-gray-400'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{tip.votes + (userVote === 'up' ? 1 : 0)}</span>
                  </button>
                  <button 
                    onClick={() => handleVote(tip.id, 'down')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      userVote === 'down'
                        ? 'bg-red-500/20 text-red-400'
                        : 'hover:bg-kinu-surface/50 text-kinu-gray-400'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{tip.downvotes + (userVote === 'down' ? 1 : 0)}</span>
                  </button>
                </div>

                {/* Comments & Date */}
                <div className="flex items-center gap-4 text-sm text-kinu-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {tip.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(tip.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="btn-silk-outline">
          Carregar mais dicas
        </button>
      </div>
    </div>
  )
}
