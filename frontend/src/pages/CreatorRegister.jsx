import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Camera, Instagram, Youtube } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const CreatorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    platform: 'instagram',
    handle: '',
    followers: ''
  })
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register({ ...formData, type: 'creator' })
    if (success) navigate('/creator-dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 theme-gradient">
      <div className="w-full max-w-md">
        <div className="modern-card p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Join as Creator</h1>
            <p className="text-slate-600">Start collaborating with brands</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="Your full name"
                />
              </div>
            </div>

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
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="Create password"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Primary Platform</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform: 'instagram' }))}
                  className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-all ${
                    formData.platform === 'instagram'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-300 hover:border-purple-400'
                  }`}
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform: 'youtube' }))}
                  className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-all ${
                    formData.platform === 'youtube'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-300 hover:border-purple-400'
                  }`}
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Handle/Username</label>
              <input
                type="text"
                required
                value={formData.handle}
                onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                className="input-field"
                placeholder="@yourusername"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Follower Count</label>
              <select
                value={formData.followers}
                onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                className="input-field"
                required
              >
                <option value="">Select range</option>
                <option value="1k-10k">1K - 10K</option>
                <option value="10k-50k">10K - 50K</option>
                <option value="50k-100k">50K - 100K</option>
                <option value="100k-500k">100K - 500K</option>
                <option value="500k-1m">500K - 1M</option>
                <option value="1m+">1M+</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
            >
              {loading ? 'Creating Account...' : 'Join ICY as Creator'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account? <Link to="/creator-login" className="text-purple-600 font-semibold hover:text-purple-700">Sign In</Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-slate-600 text-sm">
              Looking to hire creators? <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">Brand Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorRegister