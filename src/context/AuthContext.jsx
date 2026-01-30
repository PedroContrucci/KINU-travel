import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// Demo user for when Supabase is not configured
const DEMO_USER = {
  id: 'demo-user-001',
  email: 'demo@kinu.travel',
  user_metadata: {
    full_name: 'Viajante KINU',
    avatar_url: null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (isDemoMode) {
      // Demo mode - check localStorage
      const demoSession = localStorage.getItem('kinu_demo_session')
      if (demoSession) {
        setUser(DEMO_USER)
        setSession({ user: DEMO_USER })
      }
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sign Up
  const signUp = async (email, password, fullName) => {
    if (isDemoMode) {
      localStorage.setItem('kinu_demo_session', 'true')
      setUser({ ...DEMO_USER, email, user_metadata: { full_name: fullName } })
      setSession({ user: DEMO_USER })
      toast.success('Conta demo criada!')
      return { error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (error) {
      toast.error(error.message)
      return { error }
    }

    toast.success('Conta criada! Verifique seu email.')
    return { data, error: null }
  }

  // Sign In
  const signIn = async (email, password) => {
    if (isDemoMode) {
      localStorage.setItem('kinu_demo_session', 'true')
      setUser({ ...DEMO_USER, email })
      setSession({ user: DEMO_USER })
      toast.success('Login demo realizado!')
      return { error: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error(error.message)
      return { error }
    }

    toast.success('Bem-vindo de volta!')
    return { data, error: null }
  }

  // Sign In with Google
  const signInWithGoogle = async () => {
    if (isDemoMode) {
      localStorage.setItem('kinu_demo_session', 'true')
      setUser(DEMO_USER)
      setSession({ user: DEMO_USER })
      toast.success('Login demo com Google!')
      return { error: null }
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      toast.error(error.message)
    }

    return { data, error }
  }

  // Sign Out
  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem('kinu_demo_session')
      setUser(null)
      setSession(null)
      toast.success('Logout realizado!')
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Até logo!')
    }
  }

  // Reset Password
  const resetPassword = async (email) => {
    if (isDemoMode) {
      toast.success('Email de recuperação enviado (demo)')
      return { error: null }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      toast.error(error.message)
      return { error }
    }

    toast.success('Email de recuperação enviado!')
    return { error: null }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    isDemoMode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
