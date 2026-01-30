import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  Home, Map, Wallet, Package, BookOpen, 
  PieChart, Users, Settings, ChevronLeft,
  Sparkles, Globe
} from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard', description: 'Visão geral' },
  { path: '/trip', icon: Map, label: 'Viagens', description: 'Planejar roteiro' },
  { path: '/currency', icon: Wallet, label: 'Câmbio', description: 'Motor preditivo' },
  { path: '/packing', icon: Package, label: 'Malas', description: 'Smart Packing 3D' },
  { path: '/guide', icon: BookOpen, label: 'Guia', description: 'Destinos' },
  { path: '/finops', icon: PieChart, label: 'FinOps', description: 'Real vs Planejado' },
  { path: '/clan', icon: Users, label: 'Clã', description: 'Sabedoria coletiva' },
]

export default function Sidebar({ isOpen, onToggle }) {
  const location = useLocation()

  return (
    <aside className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    } glass border-r border-kinu-surface/50`}>
      
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kinu-emerald to-kinu-horizon flex items-center justify-center shadow-kinu">
            <Globe className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div className="animate-fade-in">
              <h1 className="font-display font-bold text-xl">KINU</h1>
              <p className="text-xs text-kinu-gray-400">Travel OS</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-kinu-surface/50 transition-colors hidden lg:flex"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform ${!isOpen && 'rotate-180'}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path))
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-kinu-emerald/20 to-kinu-horizon/10 border border-kinu-emerald/30 text-kinu-emerald-light' 
                      : 'hover:bg-kinu-surface/50 text-kinu-gray-300 hover:text-kinu-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-kinu-emerald/20' 
                      : 'bg-kinu-surface/30 group-hover:bg-kinu-surface/50'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {isOpen && (
                    <div className="animate-fade-in">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-kinu-gray-500">{item.description}</p>
                    </div>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* AI Assistant Quick Access */}
      {isOpen && (
        <div className="absolute bottom-20 left-3 right-3">
          <div className="glass-gold rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-kinu-gold" />
              <span className="font-medium text-kinu-gold">KINU AI</span>
            </div>
            <p className="text-xs text-kinu-gray-300 mb-3">
              Seu irmão experiente está online e pronto para ajudar.
            </p>
            <button className="w-full btn-gold text-sm py-2">
              Conversar
            </button>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="absolute bottom-4 left-3 right-3">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-kinu-surface/50 text-kinu-gray-400 hover:text-kinu-white transition-colors"
        >
          <div className="p-2 rounded-lg bg-kinu-surface/30">
            <Settings className="w-5 h-5" />
          </div>
          {isOpen && <span className="animate-fade-in">Configurações</span>}
        </NavLink>
      </div>
    </aside>
  )
}
