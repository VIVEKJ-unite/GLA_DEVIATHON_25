import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Camera, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const CreatorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(formData.email, formData.password, 'creator')
    if (success) navigate('/creator-dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 theme-gradient">
      <div className="w-full max-w-md">
        <div className="modern-card p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Creator Login</h1>
            <p className="text-slate-600">Sign in to your creator account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="creator@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
            >
              {loading ? 'Signing In...' : 'Sign In as Creator'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              New creator? <Link to="/creator-register" className="text-purple-600 font-semibold hover:text-purple-700">Join ICY</Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-slate-600 text-sm">
              Looking for brand login? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">Brand Login</Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-medium text-sm">Creator Benefits</span>
            </div>
            <ul className="text-purple-600 text-xs space-y-1">
              <li>• Get discovered by top brands</li>
              <li>• Manage collaboration requests</li>
              <li>• Track your performance metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorLogin