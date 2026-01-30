import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bell, Search, Menu, User, Sparkles, 
  TrendingUp, CloudRain, ChevronDown 
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'

export default function Navbar({ onMenuToggle }) {
  const { notifications, userProfile, currentTrip } = useTripContext()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

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

          <div className="relative">
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
            <span className="text-2xl">🗼</span>
            <div>
              <p className="text-sm font-medium">{currentTrip.destination}</p>
              <p className="text-xs text-kinu-gray-400">15-22 Mar • Planejando</p>
            </div>
            <ChevronDown className="w-4 h-4 text-kinu-gray-400" />
          </Link>
        )}

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
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
          <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-kinu-surface/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kinu-emerald to-kinu-horizon flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden lg:block text-sm font-medium">{userProfile.name}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
