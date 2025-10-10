import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, X, Search, Users, Eye, TrendingDown } from 'lucide-react'

const FraudDetector = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const analyzeInfluencer = async () => {
    if (!username.trim()) return
    
    setLoading(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        username,
        platform,
        riskScore: Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 500000) + 10000,
        engagement: (Math.random() * 8 + 1).toFixed(1),
        authenticity: Math.floor(Math.random() * 100),
        flags: [
          { type: 'suspicious_growth', severity: 'medium', description: 'Unusual follower growth pattern detected' },
          { type: 'bot_followers', severity: 'high', description: '15% of followers appear to be bots' },
          { type: 'engagement_drop', severity: 'low', description: 'Recent engagement decline observed' }
        ].filter(() => Math.random() > 0.4),
        recommendations: [
          'Request detailed analytics before partnership',
          'Consider smaller test campaign first',
          'Verify engagement quality manually'
        ]
      }
      setResults(mockResults)
      setLoading(false)
    }, 2000)
  }

  const getRiskColor = (score) => {
    if (score < 30) return 'text-green-600 bg-green-100'
    if (score < 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="modern-card p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Fraud Detector</h2>
            <p className="text-slate-600">Analyze influencer authenticity and detect fake engagement</p>
          </div>
        </div>
        <button onClick={onClose} className="btn-ghost p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              className="input-field"
            >
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter influencer username"
                className="input-field pr-12"
                onKeyPress={(e) => e.key === 'Enter' && analyzeInfluencer()}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyzeInfluencer}
            disabled={loading || !username.trim()}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Analyze Influencer</span>
              </>
            )}
          </motion.button>

          {/* Features */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Detection Features</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Bot follower detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Engagement pattern analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Growth anomaly detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Comment quality assessment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Risk Score */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Risk Assessment</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(results.riskScore)}`}>
                    {results.riskScore < 30 ? 'Low Risk' : results.riskScore < 70 ? 'Medium Risk' : 'High Risk'}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{results.riskScore}%</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${results.riskScore < 30 ? 'bg-green-500' : results.riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${results.riskScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{results.followers.toLocaleString()}</div>
                  <div className="text-xs text-slate-600">Followers</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                  <Eye className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{results.engagement}%</div>
                  <div className="text-xs text-slate-600">Engagement</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{results.authenticity}%</div>
                  <div className="text-xs text-slate-600">Authentic</div>
                </div>
              </div>

              {/* Flags */}
              {results.flags.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Detected Issues</span>
                  </h3>
                  <div className="space-y-3">
                    {results.flags.map((flag, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(flag.severity)}`}>
                          {flag.severity}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{flag.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Recommendations</h3>
                <div className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-sm text-slate-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
              <p className="text-slate-600">Enter an influencer username to start the fraud detection analysis</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FraudDetector