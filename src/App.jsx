import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Auth
import { AuthProvider, useAuth } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

// Layout
import Layout from './components/layout/Layout'

// Pages
import DashboardHome from './components/dashboard/DashboardHome'
import TripPlanner from './components/trip/TripPlanner'
import CurrencyWidget from './components/currency/CurrencyWidget'
import SmartPacking from './components/packing/SmartPacking'
import KinuAI from './components/concierge/KinuAI'
import DestinationGuide from './components/guide/DestinationGuide'
import FinOpsDashboard from './components/finops/FinOpsDashboard'
import ClanWisdom from './components/community/ClanWisdom'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <LoginPage />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/" replace /> : <RegisterPage />} 
      />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <DashboardHome />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/trip/:id?" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <TripPlanner />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/currency" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <CurrencyWidget />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/packing" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <SmartPacking />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/guide/:destination?" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <DestinationGuide />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/finops" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <FinOpsDashboard />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      <Route path="/clan" element={
        <ProtectedRoute>
          <TripProvider>
            <div className="min-h-screen bg-kinu-night bg-grid gradient-radial">
              <Layout>
                <ClanWisdom />
              </Layout>
              <KinuAI />
            </div>
          </TripProvider>
        </ProtectedRoute>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid #334155',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F8FAFC',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F8FAFC',
            },
          },
        }}
      />
    </AuthProvider>
  )
}

export default App
