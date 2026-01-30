import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const TripContext = createContext()

export const useTripContext = () => {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTripContext must be used within TripProvider')
  return context
}

export function TripProvider({ children }) {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [activities, setActivities] = useState([])
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

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
      // Check localStorage for demo data
      const savedTrips = localStorage.getItem('kinu_demo_trips')
      if (savedTrips) {
        const parsedTrips = JSON.parse(savedTrips)
        setTrips(parsedTrips)
        if (parsedTrips.length > 0) {
          setCurrentTrip(parsedTrips[0])
          loadTripData(parsedTrips[0].id)
        }
      }
      // If no saved trips, start fresh (empty state)
      setLoading(false)
      return
    }

    try {
      const { data: tripsData, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTrips(tripsData || [])
      
      if (tripsData?.length > 0) {
        setCurrentTrip(tripsData[0])
        await loadTripData(tripsData[0].id)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Erro ao carregar dados')
    }
    
    setLoading(false)
  }

  const loadTripData = async (tripId) => {
    if (isDemoMode) {
      const savedActivities = localStorage.getItem(`kinu_demo_activities_${tripId}`)
      const savedExpenses = localStorage.getItem(`kinu_demo_expenses_${tripId}`)
      setActivities(savedActivities ? JSON.parse(savedActivities) : [])
      setExpenses(savedExpenses ? JSON.parse(savedExpenses) : [])
      return
    }

    const { data: activitiesData } = await supabase
      .from('activities').select('*').eq('trip_id', tripId).order('day', { ascending: true })
    setActivities(activitiesData || [])

    const { data: expensesData } = await supabase
      .from('expenses').select('*').eq('trip_id', tripId).order('date', { ascending: false })
    setExpenses(expensesData || [])
  }

  // Create trip
  const createTrip = async (tripData) => {
    const newTrip = {
      ...tripData,
      id: isDemoMode ? `trip-${Date.now()}` : undefined,
      user_id: isDemoMode ? 'demo' : user.id,
      created_at: new Date().toISOString(),
      progress: tripData.progress || 15,
      budget_spent: tripData.budget_spent || 0
    }

    if (isDemoMode) {
      const updatedTrips = [newTrip, ...trips]
      setTrips(updatedTrips)
      setCurrentTrip(newTrip)
      localStorage.setItem('kinu_demo_trips', JSON.stringify(updatedTrips))
      
      // Generate initial activities based on trip profile
      const generatedActivities = generateInitialActivities(newTrip)
      setActivities(generatedActivities)
      localStorage.setItem(`kinu_demo_activities_${newTrip.id}`, JSON.stringify(generatedActivities))
      
      toast.success('Viagem criada com sucesso!')
      return { data: newTrip, error: null }
    }

    const { data, error } = await supabase
      .from('trips')
      .insert([newTrip])
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
      const updatedTrips = trips.map(t => t.id === tripId ? { ...t, ...updates } : t)
      setTrips(updatedTrips)
      localStorage.setItem('kinu_demo_trips', JSON.stringify(updatedTrips))
      if (currentTrip?.id === tripId) setCurrentTrip(prev => ({ ...prev, ...updates }))
      return { error: null }
    }

    const { error } = await supabase.from('trips').update(updates).eq('id', tripId)
    if (error) {
      toast.error('Erro ao atualizar viagem')
      return { error }
    }

    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, ...updates } : t))
    if (currentTrip?.id === tripId) setCurrentTrip(prev => ({ ...prev, ...updates }))
    return { error: null }
  }

  // Add activity
  const addActivity = async (activityData) => {
    const newActivity = {
      ...activityData,
      id: isDemoMode ? Date.now() : undefined,
      trip_id: currentTrip.id
    }

    if (isDemoMode) {
      const updatedActivities = [...activities, newActivity]
      setActivities(updatedActivities)
      localStorage.setItem(`kinu_demo_activities_${currentTrip.id}`, JSON.stringify(updatedActivities))
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

  // Remove activity
  const removeActivity = async (activityId) => {
    if (isDemoMode) {
      const updatedActivities = activities.filter(a => a.id !== activityId)
      setActivities(updatedActivities)
      localStorage.setItem(`kinu_demo_activities_${currentTrip.id}`, JSON.stringify(updatedActivities))
      return { error: null }
    }

    const { error } = await supabase.from('activities').delete().eq('id', activityId)
    if (!error) setActivities(prev => prev.filter(a => a.id !== activityId))
    return { error }
  }

  // Add expense
  const addExpense = async (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: isDemoMode ? Date.now() : undefined,
      trip_id: currentTrip.id
    }

    if (isDemoMode) {
      const updatedExpenses = [newExpense, ...expenses]
      setExpenses(updatedExpenses)
      localStorage.setItem(`kinu_demo_expenses_${currentTrip.id}`, JSON.stringify(updatedExpenses))
      
      const newSpent = (currentTrip.budget_spent || 0) + expenseData.amount
      await updateTrip(currentTrip.id, { budget_spent: newSpent })
      
      toast.success('Gasto adicionado!')
      return { data: newExpense, error: null }
    }

    const { data, error } = await supabase.from('expenses').insert([newExpense]).select().single()
    if (error) {
      toast.error('Erro ao adicionar gasto')
      return { error }
    }

    setExpenses(prev => [data, ...prev])
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
      await loadTripData(tripId)
    }
  }

  // Reset demo data
  const resetDemoData = () => {
    if (isDemoMode) {
      localStorage.removeItem('kinu_demo_trips')
      trips.forEach(t => {
        localStorage.removeItem(`kinu_demo_activities_${t.id}`)
        localStorage.removeItem(`kinu_demo_expenses_${t.id}`)
      })
      setTrips([])
      setCurrentTrip(null)
      setActivities([])
      setExpenses([])
      toast.success('Dados resetados!')
    }
  }

  const value = {
    trips, currentTrip, activities, expenses, loading,
    createTrip, updateTrip, addActivity, removeActivity, addExpense,
    selectTrip, setCurrentTrip, refreshData: loadUserData, resetDemoData
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

// Helper: Generate initial activities based on trip profile
function generateInitialActivities(trip) {
  const duration = Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)) + 1
  const activities = []
  
  const templates = {
    romantic: [
      { name: 'Jantar romântico', type: 'food', duration: '2-3h', price: 250, image: '🍷', rating: 4.8 },
      { name: 'Passeio ao pôr do sol', type: 'photo', duration: '2h', price: 0, image: '🌅', rating: 4.9 },
      { name: 'Spa para casal', type: 'relax', duration: '3h', price: 400, image: '💆', rating: 4.7 },
    ],
    adventure: [
      { name: 'Trilha panorâmica', type: 'adventure', duration: '4-5h', price: 150, image: '🥾', rating: 4.8 },
      { name: 'Esporte aquático', type: 'adventure', duration: '2h', price: 200, image: '🏄', rating: 4.6 },
      { name: 'Tour de bicicleta', type: 'adventure', duration: '3h', price: 100, image: '🚴', rating: 4.7 },
    ],
    foodie: [
      { name: 'Tour gastronômico', type: 'food', duration: '3h', price: 180, image: '🍴', rating: 4.9 },
      { name: 'Aula de culinária', type: 'food', duration: '4h', price: 250, image: '👨‍🍳', rating: 4.8 },
      { name: 'Mercado local', type: 'food', duration: '2h', price: 50, image: '🛒', rating: 4.5 },
    ],
    family: [
      { name: 'Parque temático', type: 'family', duration: '6h', price: 300, image: '🎢', rating: 4.7 },
      { name: 'Museu interativo', type: 'culture', duration: '3h', price: 80, image: '🏛️', rating: 4.6 },
      { name: 'Praia/Parque', type: 'nature', duration: '4h', price: 0, image: '🏖️', rating: 4.8 },
    ],
    default: [
      { name: 'City tour', type: 'culture', duration: '4h', price: 120, image: '🚌', rating: 4.5 },
      { name: 'Museu principal', type: 'culture', duration: '3h', price: 80, image: '🖼️', rating: 4.7 },
      { name: 'Restaurante local', type: 'food', duration: '2h', price: 100, image: '🍽️', rating: 4.6 },
    ]
  }

  const profileActivities = templates[trip.profile] || templates.default
  
  for (let day = 1; day <= Math.min(duration, 7); day++) {
    // Add 1-2 activities per day
    const dayActivities = day <= 2 ? 1 : 2 // Fewer activities on first days (jet lag)
    for (let i = 0; i < dayActivities; i++) {
      const template = profileActivities[Math.floor(Math.random() * profileActivities.length)]
      activities.push({
        id: Date.now() + day * 100 + i,
        trip_id: trip.id,
        day,
        ...template,
        status: 'suggested',
        auctionAvailable: true
      })
    }
  }

  return activities
}
