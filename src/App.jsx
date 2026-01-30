import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardHome from './components/dashboard/DashboardHome'
import TripPlanner from './components/trip/TripPlanner'
import CurrencyWidget from './components/currency/CurrencyWidget'
import SmartPacking from './components/packing/SmartPacking'
import KinuAI from './components/concierge/KinuAI'
import DestinationGuide from './components/guide/DestinationGuide'
import FinOpsDashboard from './components/finops/FinOpsDashboard'
import ClanWisdom from './components/community/ClanWisdom'
import { TripProvider } from './context/TripContext'

function App() {
  return (
    <TripProvider>
      <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/trip/:id?" element={<TripPlanner />} />
            <Route path="/currency" element={<CurrencyWidget />} />
            <Route path="/packing" element={<SmartPacking />} />
            <Route path="/guide/:destination?" element={<DestinationGuide />} />
            <Route path="/finops" element={<FinOpsDashboard />} />
            <Route path="/clan" element={<ClanWisdom />} />
          </Routes>
        </Layout>
        
        {/* Persistent AI Concierge */}
        <KinuAI />
      </div>
    </TripProvider>
  )
}

export default App
