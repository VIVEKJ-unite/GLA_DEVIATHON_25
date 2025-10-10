import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCampaign } from '../contexts/CampaignContext'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { ArrowLeft } from 'lucide-react'

const CampaignSetup = () => {
  const navigate = useNavigate()
  const { createCampaign, loading } = useCampaign()

  const [formData, setFormData] = useState({
    brand_name: '',
    product_details: '',
    target_audience: '',
    brand_tone: 'friendly',
    campaign_goals: ['awareness'],
    platform_focus: ['instagram'],
    budget_range: 'micro',
    website: '',
    key_message: ''
  })

  const [currentStep, setCurrentStep] = useState(1)

  const brandTones = [
    { value: 'friendly', label: 'Friendly & Approachable', icon: '😊' },
    { value: 'professional', label: 'Professional & Trustworthy', icon: '💼' },
    { value: 'playful', label: 'Playful & Fun', icon: '🎉' },
    { value: 'luxury', label: 'Luxury & Exclusive', icon: '✨' },
    { value: 'inspirational', label: 'Inspirational & Motivational', icon: '🚀' },
    { value: 'authoritative', label: 'Authoritative & Expert', icon: '🎓' }
  ]

  const campaignGoals = [
    { value: 'awareness', label: 'Brand Awareness', icon: '👁️' },
    { value: 'sales', label: 'Drive Sales', icon: '💰' },
    { value: 'ugc', label: 'User-Generated Content', icon: '📸' },
    { value: 'engagement', label: 'Build Engagement', icon: '💬' },
    { value: 'leads', label: 'Generate Leads', icon: '📥' },
    { value: 'community', label: 'Build Community', icon: '👥' }
  ]

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'youtube', label: 'YouTube', icon: '🎥' },
    { value: 'both', label: 'Both Platforms', icon: '🌐' }
  ]

  const budgetRanges = [
    { value: 'micro', label: 'Micro-influencers', description: '< 10K followers', price: '₹' },
    { value: 'mid', label: 'Mid-tier influencers', description: '10K - 100K followers', price: '₹₹' },
    { value: 'macro', label: 'Macro-influencers', description: '100K - 1M followers', price: '₹₹₹' },
    { value: 'mega', label: 'Mega-influencers', description: '> 1M followers', price: '₹₹₹₹' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const campaign = await createCampaign(formData)
    if (campaign) {
      navigate('/search')
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))



  return (
    <div className="min-h-screen theme-gradient py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="modern-card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">ICY Brand Setup</h1>
          </div>
        </div>



        <form onSubmit={handleSubmit} className="modern-card p-6">
          {/* Step 1: Brand Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Step 1: Brand Setup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Brand/Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand_name}
                    onChange={(e) => handleInputChange('brand_name', e.target.value)}
                    className="input-field"
                    placeholder="e.g., EcoGlow Skincare"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="input-field"
                    placeholder="https://ecoglow.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Product Details *
                </label>
                <textarea
                  required
                  value={formData.product_details}
                  onChange={(e) => handleInputChange('product_details', e.target.value)}
                  className="input-field min-h-[120px]"
                  placeholder="e.g., Eco-friendly skincare products made with natural ingredients for sensitive skin..."
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Key Message
                </label>
                <textarea
                  value={formData.key_message}
                  onChange={(e) => handleInputChange('key_message', e.target.value)}
                  className="input-field min-h-[80px]"
                  placeholder="e.g., Clean beauty that actually works for real people"
                />
              </div>
            </div>
          )}

          {/* Step 2: Audience & Tone */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Step 2: Target Audience & Brand Tone</h2>
              
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Target Audience *
                </label>
                <textarea
                  required
                  value={formData.target_audience}
                  onChange={(e) => handleInputChange('target_audience', e.target.value)}
                  className="input-field min-h-[100px]"
                  placeholder="e.g., Millennial women aged 25-35 interested in clean beauty, sustainability, and wellness. Located in US urban areas."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Age Range</label>
                  <select
                    value={formData.age_range || ''}
                    onChange={(e) => handleInputChange('age_range', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select Age Range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55+">55+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Gender</label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-binary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Location</label>
                  <select
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Location</option>
                    <option value="global">Global</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-4">
                  Brand Tone *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brandTones.map((tone) => (
                    <button
                      key={tone.value}
                      type="button"
                      onClick={() => handleInputChange('brand_tone', tone.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                        formData.brand_tone === tone.value
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-slate-300 bg-gradient-to-r from-white to-slate-50 hover:border-purple-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tone.icon}</span>
                        <span className="text-slate-700 font-medium">{tone.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals & Platforms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Step 3: Campaign Goals & Platform Focus</h2>
              
              <div>
                <label className="block text-slate-700 font-medium mb-4">
                  Campaign Goals *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaignGoals.map((goal) => (
                    <button
                      key={goal.value}
                      type="button"
                      onClick={() => handleArrayToggle('campaign_goals', goal.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                        formData.campaign_goals.includes(goal.value)
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-slate-300 bg-gradient-to-r from-white to-slate-50 hover:border-purple-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="text-slate-700 font-medium">{goal.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-4">
                  Platforms *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {platforms.map((platform) => (
                    <button
                      key={platform.value}
                      type="button"
                      onClick={() => handleArrayToggle('platform_focus', platform.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                        formData.platform_focus.includes(platform.value)
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-slate-300 bg-gradient-to-r from-white to-slate-50 hover:border-purple-400 hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-2">
                        <span className="text-2xl block">{platform.icon}</span>
                        <span className="text-slate-700 font-medium block">{platform.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Step 4: Budget Range</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => handleInputChange('budget_range', budget.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                      formData.budget_range === budget.value
                        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                        : 'border-slate-300 bg-gradient-to-r from-white to-slate-50 hover:border-purple-400 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 font-semibold">{budget.label}</span>
                        <span className="text-xl text-purple-600 font-bold">{budget.price}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{budget.description}</p>
                    </div>
                  </button>
                ))}
              </div>


            </div>
          )}

          <div className="flex justify-between pt-6 mt-6 border-t border-slate-200">
            <button type="button" onClick={prevStep} disabled={currentStep === 1} className="btn-secondary disabled:opacity-50">
              Previous
            </button>
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="btn-primary">Next</button>
            ) : (
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Analyzing...' : 'Start AI Discovery'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
} 

export default CampaignSetup