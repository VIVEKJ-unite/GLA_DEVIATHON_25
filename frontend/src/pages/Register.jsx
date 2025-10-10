import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, User, Building, Phone, MapPin, Camera } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [searchParams] = useSearchParams()
  const userType = searchParams.get('type') || 'brand'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: userType === 'brand' ? '' : undefined,
    city: '',
    password: '',
    userType: userType,
    // Influencer specific fields
    platforms: userType === 'influencer' ? [] : undefined,
    followers: userType === 'influencer' ? '' : undefined,
    niche: userType === 'influencer' ? '' : undefined
  })
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  
  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 
    'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna'
  ]
  
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'youtube', name: 'YouTube', icon: '🎥' },
    { id: 'tiktok', name: 'TikTok/Reels', icon: '🎵' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' }
  ]
  
  const niches = [
    'Fashion & Beauty', 'Food & Cooking', 'Travel', 'Technology', 'Fitness & Health', 
    'Lifestyle', 'Entertainment', 'Education', 'Business', 'Gaming', 'Music', 'Art & Design'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(formData)
    if (success) {
      if (userType === 'influencer') {
        navigate('/influencer-dashboard')
      } else {
        navigate('/')
      }
    }
  }
  
  const handlePlatformToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4 ${
              userType === 'brand' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              {userType === 'brand' ? <Building className="w-8 h-8 text-white" /> : <Camera className="w-8 h-8 text-white" />}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {userType === 'brand' ? 'Agency Registration' : 'Creator Registration'}
            </h1>
            <p className="text-slate-600">
              {userType === 'brand' 
                ? 'Connect with top creators' 
                : 'Join our creator network'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  {userType === 'brand' ? 'Agency Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field pl-10"
                    placeholder={userType === 'brand' ? 'Your Company' : 'Your Name'}
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
                    placeholder="user@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="input-field pl-10 appearance-none"
                  >
                    <option value="">Select City</option>
                    {indianCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {userType === 'brand' && (
              <div>
                <label className="block text-slate-700 font-medium mb-2">Agency Details</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="input-field pl-10"
                    placeholder="Your company details"
                  />
                </div>
              </div>
            )}

            {userType === 'influencer' && (
              <>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Your Platforms</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.map(platform => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => handlePlatformToggle(platform.id)}
                        className={`p-3 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                          formData.platforms.includes(platform.id)
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                            : 'border-slate-300 bg-gradient-to-r from-white to-slate-50 hover:border-purple-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{platform.icon}</span>
                          <span className="text-slate-700 text-sm font-medium">{platform.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Followers</label>
                    <select
                      required
                      value={formData.followers}
                      onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Range</option>
                      <option value="1k-10k">1K - 10K</option>
                      <option value="10k-50k">10K - 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-500k">100K - 500K</option>
                      <option value="500k-1m">500K - 1M</option>
                      <option value="1m+">1M+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Niche</label>
                    <select
                      required
                      value={formData.niche}
                      onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Niche</option>
                      {niches.map(niche => (
                        <option key={niche} value={niche}>{niche}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

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
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Creating...' : `Join as ${userType === 'brand' ? 'Agency' : 'Creator'}`}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-slate-600">
              Want to register as {userType === 'brand' ? 'Creator' : 'Agency'}?{' '}
              <Link 
                to={`/register?type=${userType === 'brand' ? 'influencer' : 'brand'}`} 
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                Switch here
              </Link>
            </p>
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
                Sign in
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Register