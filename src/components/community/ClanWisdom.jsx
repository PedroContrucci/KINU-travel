import React, { useState } from 'react'
import { 
  Users, Star, ThumbsUp, ThumbsDown, Search,
  Award, Crown, Sparkles, MapPin, Clock, Heart,
  ChevronRight, Utensils, Hotel, Share2,
  CheckCircle, TrendingUp, Globe, Plus
} from 'lucide-react'

// Curated Sources
const CURATION_SOURCES = {
  clan: { name: 'Sabedoria do Clã', icon: Users, color: 'emerald', description: 'Validado pela comunidade KINU' },
  michelin: { name: 'Guia Michelin', icon: Award, color: 'red', description: 'Excelência gastronômica mundial' },
  condenast: { name: 'Condé Nast Traveler', icon: Crown, color: 'amber', description: 'Curadoria de luxo e experiências' }
}

const CURATED_ITINERARIES = [
  {
    id: 'paris-romantic-7d', title: 'Paris Romântica em 7 Dias', destination: 'Paris', emoji: '🗼',
    duration: '7 dias', profile: 'romantic', curator: 'condenast', author: 'Condé Nast Traveler',
    rating: 4.9, reviews: 1247, saves: 8934, featured: true,
    highlights: ['Jantar na Torre Eiffel', 'Pôr do sol em Montmartre', 'Cruzeiro privado no Sena'],
    tags: ['Romântico', 'Gastronômico', 'Cultural'],
    preview: [
      { day: 1, title: 'Chegada & Marais', activities: ['Check-in Le Marais', 'Jantar em bistrot local'] },
      { day: 2, title: 'Arte & Amor', activities: ['Louvre pela manhã', 'Jardim das Tulherias'] },
      { day: 3, title: 'Montmartre', activities: ['Sacré-Cœur ao nascer do sol', 'Café des Deux Moulins'] },
    ]
  },
  {
    id: 'tokyo-foodie-10d', title: 'Tóquio para Foodies', destination: 'Tóquio', emoji: '🏯',
    duration: '10 dias', profile: 'foodie', curator: 'michelin', author: 'Guia Michelin',
    rating: 4.8, reviews: 892, saves: 6721, featured: true,
    highlights: ['3 restaurantes Michelin', 'Mercado Tsukiji às 5h', 'Aula de ramen autêntico'],
    tags: ['Gastronômico', 'Cultural', 'Aventura'],
    preview: [
      { day: 1, title: 'Tsukiji & Ginza', activities: ['Mercado Tsukiji 5h', 'Sushi breakfast'] },
      { day: 2, title: 'Shibuya & Ramen', activities: ['Shibuya Crossing', 'Aula de ramen'] },
    ]
  },
  {
    id: 'lisbon-family-5d', title: 'Lisboa em Família', destination: 'Lisboa', emoji: '🚃',
    duration: '5 dias', profile: 'family', curator: 'clan', author: '@MariaV',
    rating: 4.7, reviews: 456, saves: 3421, featured: false,
    highlights: ['Oceanário com crianças', 'Pastel de Belém na fábrica', 'Eléctrico 28 sem fila'],
    tags: ['Família', 'Cultural', 'Fácil'],
    preview: [
      { day: 1, title: 'Belém', activities: ['Torre de Belém', 'Pastéis de Belém'] },
      { day: 2, title: 'Oceanário', activities: ['Oceanário (manhã)', 'Teleférico'] },
    ]
  },
  {
    id: 'bali-adventure-14d', title: 'Bali: Espírito & Aventura', destination: 'Bali', emoji: '🌴',
    duration: '14 dias', profile: 'adventure', curator: 'clan', author: '@BrunoS',
    rating: 4.9, reviews: 723, saves: 5892, featured: true,
    highlights: ['Nascer do sol no Mt. Batur', 'Retiro de yoga em Ubud', 'Surf em Uluwatu'],
    tags: ['Aventura', 'Espiritual', 'Natureza'],
    preview: [
      { day: 1, title: 'Seminyak', activities: ['Praia Seminyak', 'Beach club'] },
      { day: 2, title: 'Ubud', activities: ['Terraços de arroz', 'Monkey Forest'] },
    ]
  },
]

const COMMUNITY_TIPS = [
  { id: 1, destination: 'Paris', tip: 'Reserve o Louvre para quarta-feira às 9h. É o dia mais vazio.', author: '@MariaV', avatar: '👩', upvotes: 456, downvotes: 12, verified: true, category: 'culture', timestamp: '2 dias atrás' },
  { id: 2, destination: 'Tóquio', tip: 'Compre o JR Pass ANTES de viajar, só funciona assim.', author: '@AndrewK', avatar: '👨', upvotes: 892, downvotes: 23, verified: true, category: 'transport', timestamp: '1 semana atrás' },
  { id: 3, destination: 'Lisboa', tip: 'O melhor câmbio fica na Rua Augusta, não no aeroporto.', author: '@PedroL', avatar: '🧔', upvotes: 234, downvotes: 8, verified: true, category: 'money', timestamp: '3 dias atrás' },
  { id: 4, destination: 'Bali', tip: 'Alugue scooter em Ubud (CNH internacional obrigatória).', author: '@LauraM', avatar: '👱‍♀️', upvotes: 567, downvotes: 45, verified: true, category: 'transport', timestamp: '5 dias atrás' },
]

const MICHELIN_PICKS = [
  { name: 'Narisawa', city: 'Tóquio', stars: 2, cuisine: 'Inovadora', price: '$$$$', emoji: '🍽️' },
  { name: 'Le Cinq', city: 'Paris', stars: 3, cuisine: 'Francesa', price: '$$$$', emoji: '🥂' },
  { name: 'Belcanto', city: 'Lisboa', stars: 2, cuisine: 'Portuguesa', price: '$$$', emoji: '🍷' },
]

const CONDENAST_HOTELS = [
  { name: 'Aman Tokyo', city: 'Tóquio', rating: 'Gold List 2024', style: 'Minimalista', price: '$$$$', emoji: '🏨' },
  { name: 'Le Bristol', city: 'Paris', rating: 'Gold List 2024', style: 'Palácio', price: '$$$$', emoji: '🏰' },
]

export default function ClanWisdom() {
  const [activeTab, setActiveTab] = useState('itineraries')
  const [selectedProfile, setSelectedProfile] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedItineraries, setSavedItineraries] = useState([])

  const profiles = [
    { id: 'all', label: 'Todos', icon: Globe },
    { id: 'romantic', label: 'Romântico', icon: Heart },
    { id: 'family', label: 'Família', icon: Users },
    { id: 'adventure', label: 'Aventura', icon: TrendingUp },
    { id: 'foodie', label: 'Gastronômico', icon: Utensils },
  ]

  const filteredItineraries = CURATED_ITINERARIES.filter(it => {
    const matchesProfile = selectedProfile === 'all' || it.profile === selectedProfile
    const matchesSource = selectedSource === 'all' || it.curator === selectedSource
    const matchesSearch = it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         it.destination.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesProfile && matchesSource && matchesSearch
  })

  const toggleSave = (id) => setSavedItineraries(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const sourceColors = { clan: 'emerald', michelin: 'red', condenast: 'amber' }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Sabedoria do Clã 🌿</h1>
          <p className="text-kinu-gray-400">Roteiros curados pela comunidade, Michelin e Condé Nast Traveler</p>
        </div>
        <button className="btn-silk flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Compartilhar Roteiro
        </button>
      </div>

      {/* Curation Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(CURATION_SOURCES).map(([key, source]) => {
          const Icon = source.icon
          const isActive = selectedSource === key
          return (
            <button key={key} onClick={() => setSelectedSource(selectedSource === key ? 'all' : key)}
              className={`glass-card p-5 text-left transition-all ${isActive ? 'border-kinu-emerald shadow-kinu' : 'card-hover'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${key === 'michelin' ? 'bg-red-500/20' : key === 'condenast' ? 'bg-amber-500/20' : 'bg-kinu-emerald/20'}`}>
                  <Icon className={`w-5 h-5 ${key === 'michelin' ? 'text-red-500' : key === 'condenast' ? 'text-amber-500' : 'text-kinu-emerald'}`} />
                </div>
                <h3 className="font-semibold">{source.name}</h3>
              </div>
              <p className="text-sm text-kinu-gray-400">{source.description}</p>
            </button>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-kinu-surface pb-4">
        {[
          { id: 'itineraries', label: 'Roteiros Curados', icon: MapPin },
          { id: 'tips', label: 'Dicas do Clã', icon: Users },
          { id: 'michelin', label: 'Michelin Picks', icon: Award },
          { id: 'hotels', label: 'Condé Nast Hotels', icon: Hotel },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id ? 'bg-kinu-emerald/20 text-kinu-emerald' : 'text-kinu-gray-400 hover:text-kinu-white'
            }`}>
            <tab.icon className="w-4 h-4" />{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'itineraries' && (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-400" />
              <input type="text" placeholder="Buscar destinos, roteiros..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="input-kinu pl-11 w-full" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {profiles.map(profile => (
                <button key={profile.id} onClick={() => setSelectedProfile(profile.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedProfile === profile.id ? 'bg-kinu-emerald text-white' : 'bg-kinu-surface/50 text-kinu-gray-400 hover:text-kinu-white'
                  }`}>
                  <profile.icon className="w-4 h-4" />{profile.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItineraries.map(it => (
              <ItineraryCard key={it.id} itinerary={it} saved={savedItineraries.includes(it.id)} onSave={() => toggleSave(it.id)} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'tips' && (
        <div className="space-y-4">
          {COMMUNITY_TIPS.map(tip => <TipCard key={tip.id} tip={tip} />)}
          <div className="glass-card p-6 text-center border-2 border-dashed border-kinu-surface">
            <Users className="w-12 h-12 mx-auto mb-4 text-kinu-gray-500" />
            <h3 className="font-semibold mb-2">Compartilhe sua sabedoria!</h3>
            <p className="text-sm text-kinu-gray-400 mb-4">Ajude outros viajantes com dicas que você descobriu.</p>
            <button className="btn-silk-outline">Adicionar Dica</button>
          </div>
        </div>
      )}

      {activeTab === 'michelin' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-red-500/30" style={{background: 'linear-gradient(to right, rgba(239,68,68,0.1), transparent)'}}>
            <div className="flex items-center gap-4">
              <Award className="w-10 h-10 text-red-500" />
              <div>
                <h2 className="font-display text-xl font-semibold">Seleção Guia Michelin</h2>
                <p className="text-sm text-kinu-gray-400">Restaurantes estrelados nos seus destinos</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MICHELIN_PICKS.map((r, i) => (
              <div key={i} className="glass-card p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{r.emoji}</span>
                    <div><h3 className="font-semibold">{r.name}</h3><p className="text-sm text-kinu-gray-400">{r.city}</p></div>
                  </div>
                  <div className="flex">{Array.from({length: r.stars}).map((_, i) => <Star key={i} className="w-4 h-4 text-red-500 fill-red-500" />)}</div>
                </div>
                <div className="flex justify-between text-sm"><span className="text-kinu-gray-400">{r.cuisine}</span><span className="text-kinu-emerald">{r.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hotels' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-amber-500/30" style={{background: 'linear-gradient(to right, rgba(245,158,11,0.1), transparent)'}}>
            <div className="flex items-center gap-4">
              <Crown className="w-10 h-10 text-amber-500" />
              <div>
                <h2 className="font-display text-xl font-semibold">Condé Nast Traveler Gold List</h2>
                <p className="text-sm text-kinu-gray-400">Os melhores hotéis do mundo</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONDENAST_HOTELS.map((h, i) => (
              <div key={i} className="glass-card p-5 card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{h.emoji}</span>
                  <div><h3 className="font-semibold">{h.name}</h3><p className="text-sm text-kinu-gray-400">{h.city}</p></div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium">{h.rating}</span>
                  <span className="text-xs text-kinu-gray-500">{h.style}</span>
                </div>
                <span className="text-sm text-kinu-emerald">{h.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ItineraryCard({ itinerary, saved, onSave }) {
  const [expanded, setExpanded] = useState(false)
  const source = CURATION_SOURCES[itinerary.curator]
  const SourceIcon = source.icon
  const colorClass = itinerary.curator === 'michelin' ? 'text-red-500 bg-red-500/20' : itinerary.curator === 'condenast' ? 'text-amber-500 bg-amber-500/20' : 'text-kinu-emerald bg-kinu-emerald/20'

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{itinerary.emoji}</span>
            <div>
              <h3 className="font-display font-semibold">{itinerary.title}</h3>
              <div className="flex items-center gap-2 text-sm text-kinu-gray-400">
                <MapPin className="w-3 h-3" />{itinerary.destination}<span>•</span><Clock className="w-3 h-3" />{itinerary.duration}
              </div>
            </div>
          </div>
          <button onClick={onSave} className={`p-2 rounded-lg transition-colors ${saved ? 'bg-kinu-emerald/20 text-kinu-emerald' : 'hover:bg-kinu-surface/50'}`}>
            <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${colorClass}`}>
            <SourceIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{itinerary.author}</span>
          </div>
          {itinerary.curator === 'clan' && <div className="flex items-center gap-1 text-xs text-kinu-gray-500"><CheckCircle className="w-3 h-3 text-kinu-emerald" />Verificado</div>}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1"><Star className="w-4 h-4 text-kinu-gold fill-kinu-gold" /><span>{itinerary.rating}</span><span className="text-kinu-gray-500">({itinerary.reviews})</span></div>
          <div className="flex items-center gap-1 text-kinu-gray-400"><Heart className="w-4 h-4" /><span>{itinerary.saves.toLocaleString()}</span></div>
        </div>

        <div className="space-y-2 mb-4">
          {itinerary.highlights.map((h, i) => <div key={i} className="flex items-center gap-2 text-sm"><Sparkles className="w-3 h-3 text-kinu-gold" /><span className="text-kinu-gray-300">{h}</span></div>)}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {itinerary.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-full bg-kinu-surface/50 text-xs text-kinu-gray-400">{tag}</span>)}
        </div>

        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-3 rounded-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors">
          <span className="text-sm font-medium">Ver prévia</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {expanded && (
        <div className="border-t border-kinu-surface p-5 bg-kinu-surface/20">
          {itinerary.preview.map((day, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-kinu-emerald/20 text-kinu-emerald text-xs font-bold flex items-center justify-center">{day.day}</span>
                <span className="font-medium text-sm">{day.title}</span>
              </div>
              <div className="ml-8 space-y-1">{day.activities.map((a, j) => <p key={j} className="text-sm text-kinu-gray-400">• {a}</p>)}</div>
            </div>
          ))}
          <button className="w-full btn-silk mt-4">Usar Este Roteiro</button>
        </div>
      )}
    </div>
  )
}

function TipCard({ tip }) {
  const [votes, setVotes] = useState({ up: tip.upvotes, down: tip.downvotes })
  const [userVote, setUserVote] = useState(null)

  const handleVote = (type) => {
    if (userVote === type) { setUserVote(null); setVotes(prev => ({ ...prev, [type]: prev[type] - 1 })) }
    else { if (userVote) setVotes(prev => ({ ...prev, [userVote]: prev[userVote] - 1 })); setUserVote(type); setVotes(prev => ({ ...prev, [type]: prev[type] + 1 })) }
  }

  const score = votes.up - votes.down

  return (
    <div className="glass-card p-5">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => handleVote('up')} className={`p-2 rounded-lg transition-colors ${userVote === 'up' ? 'bg-kinu-emerald/20 text-kinu-emerald' : 'hover:bg-kinu-surface/50'}`}><ThumbsUp className="w-5 h-5" /></button>
          <span className={`font-bold ${score > 0 ? 'text-kinu-emerald' : 'text-kinu-gray-400'}`}>{score}</span>
          <button onClick={() => handleVote('down')} className={`p-2 rounded-lg transition-colors ${userVote === 'down' ? 'bg-red-500/20 text-red-400' : 'hover:bg-kinu-surface/50'}`}><ThumbsDown className="w-5 h-5" /></button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{tip.avatar}</span>
            <span className="font-medium">{tip.author}</span>
            {tip.verified && <CheckCircle className="w-4 h-4 text-kinu-emerald" />}
            <span className="text-xs text-kinu-gray-500">• {tip.timestamp}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-full bg-kinu-horizon/20 text-kinu-horizon text-xs">{tip.destination}</span>
            <span className="px-2 py-0.5 rounded-full bg-kinu-surface/50 text-kinu-gray-400 text-xs">{tip.category}</span>
          </div>
          <p className="text-kinu-gray-300 mb-3">{tip.tip}</p>
          <div className="flex items-center gap-4 text-xs text-kinu-gray-500">
            <span>{Math.round((votes.up / (votes.up + votes.down)) * 100)}% acham útil</span>
            <button className="flex items-center gap-1 hover:text-kinu-white"><Share2 className="w-3 h-3" />Compartilhar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
