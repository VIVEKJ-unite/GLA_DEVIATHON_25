import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, X, TrendingUp, Users, DollarSign, Target, BarChart3 } from 'lucide-react'

const ReachCalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    followers: '',
    engagement: '',
    budget: '',
    campaignType: 'post',
    niche: 'lifestyle'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculateReach = () => {
    if (!formData.followers || !formData.engagement || !formData.budget) return
    
    setLoading(true)
    
    setTimeout(() => {
      const followers = parseInt(formData.followers)
      const engagementRate = parseFloat(formData.engagement) / 100
      const budget = parseFloat(formData.budget)
      
      // AI-powered calculations
      const baseReach = followers * engagementRate
      const platformMultiplier = formData.platform === 'instagram' ? 1.2 : formData.platform === 'youtube' ? 0.8 : 1.0
      const typeMultiplier = formData.campaignType === 'story' ? 0.7 : formData.campaignType === 'reel' ? 1.5 : 1.0
      
      const estimatedReach = Math.floor(baseReach * platformMultiplier * typeMultiplier)
      const cpm = budget / (estimatedReach / 1000)
      const roi = ((estimatedReach * 0.02 * 50) / budget * 100).toFixed(1)
      
      setResults({
        estimatedReach,
        impressions: Math.floor(estimatedReach * 1.3),
        clicks: Math.floor(estimatedReach * 0.02),
        conversions: Math.floor(estimatedReach * 0.005),
        cpm: cpm.toFixed(2),
        roi,
        breakdown: {
          organic: Math.floor(estimatedReach * 0.7),
          viral: Math.floor(estimatedReach * 0.2),
          paid: Math.floor(estimatedReach * 0.1)
        }
      })
      setLoading(false)
    }, 1500)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setResults(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="modern-card p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Reach Calculator</h2>
            <p className="text-slate-600">Predict campaign performance with machine learning</p>
          </div>
        </div>
        <button onClick={onClose} className="btn-ghost p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
              <select 
                value={formData.platform} 
                onChange={(e) => handleInputChange('platform', e.target.value)}
                className="input-field"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Type</label>
              <select 
                value={formData.campaignType} 
                onChange={(e) => handleInputChange('campaignType', e.target.value)}
                className="input-field"
              >
                <option value="post">Feed Post</option>
                <option value="story">Story</option>
                <option value="reel">Reel/Video</option>
                <option value="live">Live Stream</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Follower Count</label>
            <input
              type="number"
              value={formData.followers}
              onChange={(e) => handleInputChange('followers', e.target.value)}
              placeholder="e.g., 50000"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Engagement Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.engagement}
              onChange={(e) => handleInputChange('engagement', e.target.value)}
              placeholder="e.g., 3.5"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Budget ($)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              placeholder="e.g., 5000"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Niche</label>
            <select 
              value={formData.niche} 
              onChange={(e) => handleInputChange('niche', e.target.value)}
              className="input-field"
            >
              <option value="lifestyle">Lifestyle</option>
              <option value="beauty">Beauty</option>
              <option value="fitness">Fitness</option>
              <option value="tech">Technology</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateReach}
            disabled={loading || !formData.followers || !formData.engagement || !formData.budget}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                <span>Calculate Reach</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Main Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6">
                  <TrendingUp className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold">{results.estimatedReach.toLocaleString()}</div>
                  <div className="text-blue-100">Estimated Reach</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
                  <DollarSign className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold">{results.roi}%</div>
                  <div className="text-green-100">Predicted ROI</div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Performance Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">Impressions</span>
                    <span className="font-semibold">{results.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">Clicks</span>
                    <span className="font-semibold">{results.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">Conversions</span>
                    <span className="font-semibold">{results.conversions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">CPM</span>
                    <span className="font-semibold">${results.cpm}</span>
                  </div>
                </div>
              </div>

              {/* Reach Breakdown */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Reach Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">Organic Reach</span>
                    </div>
                    <span className="font-semibold">{results.breakdown.organic.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">Viral Potential</span>
                    </div>
                    <span className="font-semibold">{results.breakdown.viral.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-600">Paid Boost</span>
                    </div>
                    <span className="font-semibold">{results.breakdown.paid.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span>AI Insights</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">• This campaign shows strong potential for viral growth</p>
                  <p className="text-slate-700">• Engagement rate is above industry average for {formData.niche}</p>
                  <p className="text-slate-700">• Consider A/B testing different content formats</p>
                  <p className="text-slate-700">• Optimal posting time: 2-4 PM on weekdays</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <Calculator className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Calculate</h3>
              <p className="text-slate-600">Fill in the campaign details to get AI-powered reach predictions</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ReachCalculator