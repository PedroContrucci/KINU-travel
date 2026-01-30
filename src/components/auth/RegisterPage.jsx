import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Globe, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, isDemoMode } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password, fullName)
    if (!error) {
      navigate(isDemoMode ? '/' : '/login')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-kinu-night bg-grid gradient-radial flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-kinu-emerald to-kinu-horizon shadow-kinu mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">KINU</h1>
          <p className="text-kinu-gray-400">Junte-se ao Clã</p>
        </div>

        {isDemoMode && (
          <div className="mb-6 p-3 rounded-kinu-lg bg-kinu-gold/10 border border-kinu-gold/30 text-center">
            <div className="flex items-center justify-center gap-2 text-kinu-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Modo Demo</span>
            </div>
          </div>
        )}

        <div className="glass-card p-8">
          <h2 className="font-display text-xl font-semibold mb-6 text-center">Criar sua conta</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-500" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome" className="input-kinu pl-11" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com" className="input-kinu pl-11" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-500" />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres"
                  className="input-kinu pl-11 pr-11" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-kinu-gray-500 hover:text-kinu-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kinu-gray-400 mb-2">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kinu-gray-500" />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita a senha"
                  className="input-kinu pl-11" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-silk py-3 disabled:opacity-50">
              {loading ? 'Criando...' : 'Criar conta'}
            </button>
          </form>

          <p className="text-center mt-6 text-kinu-gray-400">
            Já tem conta? <Link to="/login" className="text-kinu-emerald hover:underline font-medium">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
