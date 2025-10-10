import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CampaignProvider } from './contexts/CampaignContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatorLogin from './pages/CreatorLogin'
import CreatorRegister from './pages/CreatorRegister'
import CampaignSetup from './pages/CampaignSetup'

import InfluencerSearch from './pages/InfluencerSearch'
import Marketplace from './pages/Marketplace'
import AITools from './pages/AITools'
import Chatbot from './components/AI/ChatBot'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" /> : children
}

const AppContent = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <div className="min-h-screen theme-gradient">
      {isAuthenticated && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/creator-login" element={<PublicRoute><CreatorLogin /></PublicRoute>} />
          <Route path="/creator-register" element={<PublicRoute><CreatorRegister /></PublicRoute>} />
          <Route path="/setup" element={<ProtectedRoute><CampaignSetup /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><InfluencerSearch /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/ai-tools" element={<ProtectedRoute><AITools /></ProtectedRoute>} />
        </Routes>
      </main>
      {isAuthenticated && <Chatbot />}
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <Router>
          <AppContent />
        </Router>
      </CampaignProvider>
    </AuthProvider>
  )
}

export default App
