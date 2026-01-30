import React, { createContext, useContext, useState, useEffect } from 'react'

const TripContext = createContext()

export function useTripContext() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTripContext must be used within TripProvider')
  }
  return context
}

export function TripProvider({ children }) {
  const [currentTrip, setCurrentTrip] = useState({
    id: 'trip-001',
    destination: 'Paris',
    country: 'França',
    startDate: '2025-03-15',
    endDate: '2025-03-22',
    travelers: 2,
    profile: 'romantic', // family, luxury, adventure, budget
    budget: {
      planned: 15000,
      spent: 0,
      currency: 'BRL'
    },
    itinerary: [],
    packing: {
      luggage: [],
      totalWeight: 0,
      maxWeight: 23
    }
  })

  const [trips, setTrips] = useState([
    {
      id: 'trip-001',
      destination: 'Paris',
      country: 'França',
      dates: '15-22 Mar 2025',
      status: 'planning',
      image: '🗼',
      progress: 65
    },
    {
      id: 'trip-002',
      destination: 'Tóquio',
      country: 'Japão',
      dates: '10-20 Jun 2025',
      status: 'draft',
      image: '🏯',
      progress: 25
    }
  ])

  const [userProfile, setUserProfile] = useState({
    name: 'Viajante KINU',
    timezone: 'America/Sao_Paulo',
    preferences: {
      travelStyle: 'balanced',
      dietRestrictions: [],
      accessibility: [],
      interests: ['cultura', 'gastronomia', 'fotografia']
    },
    currency: 'BRL'
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'insight',
      message: 'Euro caiu 3.2%! Bom momento para comprar.',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'weather',
      message: 'Previsão de chuva em Paris dia 17. Sugerimos museu.',
      timestamp: new Date(),
      read: false
    }
  ])

  const updateTrip = (updates) => {
    setCurrentTrip(prev => ({ ...prev, ...updates }))
  }

  const addToItinerary = (activity) => {
    setCurrentTrip(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { ...activity, id: Date.now() }]
    }))
  }

  const updateBudget = (amount, category) => {
    setCurrentTrip(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        spent: prev.budget.spent + amount
      }
    }))
  }

  return (
    <TripContext.Provider value={{
      currentTrip,
      setCurrentTrip,
      updateTrip,
      trips,
      setTrips,
      userProfile,
      setUserProfile,
      notifications,
      setNotifications,
      addToItinerary,
      updateBudget
    }}>
      {children}
    </TripContext.Provider>
  )
}
