import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const TripContext = createContext()

export const useTripContext = () => {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTripContext must be used within TripProvider')
  }
  return context
}

// Demo data
const DEMO_TRIPS = [
  {
    id: 'trip-001',
    destination: 'Paris',
    country: 'França',
    destination_id: 'paris',
    start_date: '2025-03-15',
    end_date: '2025-03-22',
    travelers: 2,
    profile: 'romantic',
    status: 'planning',
    budget_planned: 15000,
    budget_spent: 8680,
    currency: 'BRL',
    progress: 65,
    image: '🗼',
    created_at: new Date().toISOString()
  },
  {
    id: 'trip-002',
    destination: 'Tóquio',
    country: 'Japão',
    destination_id: 'tokyo',
    start_date: '2025-06-10',
    end_date: '2025-06-20',
    travelers: 2,
    profile: 'adventure',
    status: 'draft',
    budget_planned: 25000,
    budget_spent: 0,
    currency: 'BRL',
    progress: 25,
    image: '🏯',
    created_at: new Date().toISOString()
  }
]

const DEMO_ACTIVITIES = [
  { id: 1, trip_id: 'trip-001', day: 1, name: 'Torre Eiffel - Skip the Line', type: 'culture', duration: '2-3h', price: 180, rating: 4.8, image: '🗼', status: 'confirmed' },
  { id: 2, trip_id: 'trip-001', day: 2, name: 'Museu do Louvre', type: 'culture', duration: '4-5h', price: 95, rating: 4.9, image: '🖼️', status: 'confirmed' },
  { id: 3, trip_id: 'trip-001', day: 2, name: 'Cruzeiro no Rio Sena', type: 'photo', duration: '1-2h', price: 120, rating: 4.7, image: '🚢', status: 'pending' },
  { id: 4, trip_id: 'trip-001', day: 3, name: 'Jantar em Montmartre', type: 'food', duration: '2-3h', price: 250, rating: 4.6, image: '🍷', status: 'pending' },
  { id: 5, trip_id: 'trip-001', day: 5, name: 'Palácio de Versalhes', type: 'culture', duration: '5-6h', price: 150, rating: 4.8, image: '🏰', status: 'confirmed' },
]

const DEMO_EXPENSES = [
  { id: 1, trip_id: 'trip-001', name: 'Passagem LATAM - GRU-CDG', category: 'flights', amount: 4200, date: '2025-01-15', status: 'paid' },
  { id: 2, trip_id: 'trip-001', name: 'Hotel Le Marais - 7 noites', category: 'hotels', amount: 3800, date: '2025-01-20', status: 'paid' },
  { id: 3, trip_id: 'trip-001', name: 'Louvre - Skip the line', category: 'activities', amount: 180, date: '2025-02-01', status: 'paid' },
  { id: 4, trip_id: 'trip-001', name: 'Torre Eiffel - Ingresso', category: 'activities', amount: 300, date: '2025-02-01', status: 'pending' },
  { id: 5, trip_id: 'trip-001', name: 'Cruzeiro no Sena', category: 'activities', amount: 200, date: '2025-02-05', status: 'pending' },
]

export function TripProvider({ children }) {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [activities, setActivities] = useState([])
  const [expenses, setExpenses] = useState([])
  const [packingItems, setPackingItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load user data
  useEffect(() => {
    if (user) {
      loadUserData()
    } else {
      setTrips([])
      setCurrentTrip(null)
      setActivities([])
      setExpenses([])
      setLoading(false)
    }
  }, [user])

  const loadUserData = async () => {
    setLoading(true)
    
    if (isDemoMode) {
      // Load demo data
      setTrips(DEMO_TRIPS)
      setCurrentTrip(DEMO_TRIPS[0])
      setActivities(DEMO_ACTIVITIES)
      setExpenses(DEMO_EXPENSES)
      setLoading(false)
      return
    }

    try {
      // Load trips
      const { data: tripsData, error: tripsError } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (tripsError) throw tripsError
      setTrips(tripsData || [])
      
      if (tripsData?.length > 0) {
        setCurrentTrip(tripsData[0])
        
        // Load activities for current trip
        const { data: activitiesData } = await supabase
          .from('activities')
          .select('*')
          .eq('trip_id', tripsData[0].id)
          .order('day', { ascending: true })
        
        setActivities(activitiesData || [])

        // Load expenses
        const { data: expensesData } = await supabase
          .from('expenses')
          .select('*')
          .eq('trip_id', tripsData[0].id)
          .order('date', { ascending: false })
        
        setExpenses(expensesData || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Erro ao carregar dados')
    }
    
    setLoading(false)
  }

  // Create trip
  const createTrip = async (tripData) => {
    if (isDemoMode) {
      const newTrip = {
        ...tripData,
        id: `trip-${Date.now()}`,
        user_id: 'demo',
        created_at: new Date().toISOString(),
        progress: 0,
        budget_spent: 0
      }
      setTrips(prev => [newTrip, ...prev])
      setCurrentTrip(newTrip)
      toast.success('Viagem criada!')
      return { data: newTrip, error: null }
    }

    const { data, error } = await supabase
      .from('trips')
      .insert([{ ...tripData, user_id: user.id }])
      .select()
      .single()

    if (error) {
      toast.error('Erro ao criar viagem')
      return { error }
    }

    setTrips(prev => [data, ...prev])
    setCurrentTrip(data)
    toast.success('Viagem criada!')
    return { data, error: null }
  }

  // Update trip
  const updateTrip = async (tripId, updates) => {
    if (isDemoMode) {
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, ...updates } : t))
      if (currentTrip?.id === tripId) {
        setCurrentTrip(prev => ({ ...prev, ...updates }))
      }
      return { error: null }
    }

    const { error } = await supabase
      .from('trips')
      .update(updates)
      .eq('id', tripId)

    if (error) {
      toast.error('Erro ao atualizar viagem')
      return { error }
    }

    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, ...updates } : t))
    if (currentTrip?.id === tripId) {
      setCurrentTrip(prev => ({ ...prev, ...updates }))
    }
    return { error: null }
  }

  // Add activity
  const addActivity = async (activityData) => {
    if (isDemoMode) {
      const newActivity = {
        ...activityData,
        id: Date.now(),
        trip_id: currentTrip.id
      }
      setActivities(prev => [...prev, newActivity])
      toast.success('Atividade adicionada!')
      return { data: newActivity, error: null }
    }

    const { data, error } = await supabase
      .from('activities')
      .insert([{ ...activityData, trip_id: currentTrip.id }])
      .select()
      .single()

    if (error) {
      toast.error('Erro ao adicionar atividade')
      return { error }
    }

    setActivities(prev => [...prev, data])
    toast.success('Atividade adicionada!')
    return { data, error: null }
  }

  // Add expense
  const addExpense = async (expenseData) => {
    if (isDemoMode) {
      const newExpense = {
        ...expenseData,
        id: Date.now(),
        trip_id: currentTrip.id
      }
      setExpenses(prev => [newExpense, ...prev])
      
      // Update budget spent
      const newSpent = (currentTrip.budget_spent || 0) + expenseData.amount
      updateTrip(currentTrip.id, { budget_spent: newSpent })
      
      toast.success('Gasto adicionado!')
      return { data: newExpense, error: null }
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([{ ...expenseData, trip_id: currentTrip.id }])
      .select()
      .single()

    if (error) {
      toast.error('Erro ao adicionar gasto')
      return { error }
    }

    setExpenses(prev => [data, ...prev])
    
    // Update budget spent
    const newSpent = (currentTrip.budget_spent || 0) + expenseData.amount
    await updateTrip(currentTrip.id, { budget_spent: newSpent })
    
    toast.success('Gasto adicionado!')
    return { data, error: null }
  }

  // Select trip
  const selectTrip = async (tripId) => {
    const trip = trips.find(t => t.id === tripId)
    if (trip) {
      setCurrentTrip(trip)
      
      if (isDemoMode) {
        setActivities(DEMO_ACTIVITIES.filter(a => a.trip_id === tripId))
        setExpenses(DEMO_EXPENSES.filter(e => e.trip_id === tripId))
        return
      }

      // Load activities and expenses for selected trip
      const { data: activitiesData } = await supabase
        .from('activities')
        .select('*')
        .eq('trip_id', tripId)
        .order('day', { ascending: true })
      
      setActivities(activitiesData || [])

      const { data: expensesData } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', tripId)
        .order('date', { ascending: false })
      
      setExpenses(expensesData || [])
    }
  }

  const value = {
    trips,
    currentTrip,
    activities,
    expenses,
    packingItems,
    loading,
    createTrip,
    updateTrip,
    addActivity,
    addExpense,
    selectTrip,
    setCurrentTrip,
    refreshData: loadUserData
  }

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}
