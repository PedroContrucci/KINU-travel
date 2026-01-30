import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Bell, Search, Menu, User, Sparkles, LogOut,
  TrendingUp, CloudRain, ChevronDown, Settings
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onMenuToggle }) {
  const { currentTrip } = useTripContext()
  const { user, signOut, isDemoMode } = useAuth()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, type: 'insight', message: 'Euro caiu 3.2%! Bom momento para comprar.', read: false },
    { id: 2, type: 'weather', message: 'Previsão de chuva em Paris dia 17.', read: false },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Viajante'

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 glass border-b border-kinu-surface/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-kinu-surface/50 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kinu-gray-400" />
            <input 
              type="text"
              placeholder="Buscar destinos, atividades..."
              className="input-kinu pl-10 w-64 lg:w-80"
            />
          </div>
        </div>

        {/* Center: Current Trip Badge */}
        {currentTrip && (
          <Link 
            to={`/trip/${currentTrip.id}`}
            className="hidden md:flex items-center gap-3 px-4 py-2 glass-card hover:border-kinu-emerald/50 transition-all"
          >
            <span className="text-2xl">{currentTrip.image || '🌍'}</span>
            <div>
              <p className="text-sm font-medium">{currentTrip.destination}</p>
              <p className="text-xs text-kinu-gray-400">
                {new Date(currentTrip.start_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} • Planejando
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-kinu-gray-400" />
          </Link>
        )}

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Demo Badge */}
          {isDemoMode && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-kinu-gold/10 border border-kinu-gold/30">
              <Sparkles className="w-4 h-4 text-kinu-gold" />
              <span className="text-xs text-kinu-gold font-medium">Demo</span>
            </div>
          )}

          {/* AI Insight Badge */}
          <div className="hidden lg:flex insight-badge">
            <Sparkles className="w-4 h-4" />
            <span>Euro -3.2%</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-kinu-surface/50 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-kinu-gold text-kinu-night text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card p-4 animate-fade-in">
                <h3 className="font-display font-semibold mb-3">Insights do Nexo</h3>
                <div className="space-y-3">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id}
                      className={`p-3 rounded-lg ${
                        notif.type === 'insight' 
                          ? 'bg-kinu-gold/10 border border-kinu-gold/20' 
                          : 'bg-kinu-horizon/10 border border-kinu-horizon/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notif.type === 'insight' ? (
                          <TrendingUp className="w-5 h-5 text-kinu-gold flex-shrink-0" />
                        ) : (
                          <CloudRain className="w-5 h-5 text-kinu-horizon flex-shrink-0" />
                        )}
                        <p className="text-sm">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-kinu-surface/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kinu-emerald to-kinu-horizon flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden lg:block text-sm font-medium">{userName}</span>
              <ChevronDown className="hidden lg:block w-4 h-4 text-kinu-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 glass-card p-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-kinu-surface mb-2">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-kinu-gray-500">{user?.email}</p>
                </div>
                
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-kinu-surface/50 text-left text-sm transition-colors">
                  <Settings className="w-4 h-4 text-kinu-gray-400" />
                  Configurações
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-left text-sm text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
