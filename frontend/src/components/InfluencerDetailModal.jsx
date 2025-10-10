import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ExternalLink, 
  Users, 
  TrendingUp, 
  MapPin, 
  Star,
  MessageSquare,
  Calendar,
  Target
} from 'lucide-react'
import { formatNumber, getPlatformIcon, getBrandFitColor } from '../utils/api'

const InfluencerDetailModal = ({ influencer, isOpen, onClose }) => {
  if (!influencer) return null

  const {
    name,
    handle,
    platform,
    followers,
    engagement_rate,
    niche,
    location,
    brand_fit_score,
    authenticity_score,
    audience_demographics,
    recent_posts,
    profile_url,
    response_likelihood,
    estimated_cost
  } = influencer

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl p-6 border-b border-white/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    {getPlatformIcon(platform)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    <p className="text-white/70">@{handle}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className={`badge ${getBrandFitColor(brand_fit_score)}`}>
                        {brand_fit_score}% Brand Fit
                      </div>
                      <div className="badge-info">
                        {Math.round(authenticity_score * 100)}% Authentic
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {profile_url && (
                    <a
                      href={profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary p-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <button onClick={onClose} className="btn-ghost p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(followers)}</div>
                  <div className="text-white/60 text-sm">Followers</div>
                </div>
                
                <div className="glass-card p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{engagement_rate}%</div>
                  <div className="text-white/60 text-sm">Engagement</div>
                </div>
                
                <div className="glass-card p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{Math.round(response_likelihood * 100)}%</div>
                  <div className="text-white/60 text-sm">Response Rate</div>
                </div>
                
                <div className="glass-card p-4 text-center">
                  <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${Math.round(estimated_cost)}</div>
                  <div className="text-white/60 text-sm">Est. Cost</div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  AI Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Brand Fit Score</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${brand_fit_score}%` }}
                        />
                      </div>
                      <span className="text-white font-bold">{brand_fit_score}%</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                      {brand_fit_score >= 90 ? 'Excellent match' : 
                       brand_fit_score >= 80 ? 'Very good match' : 
                       brand_fit_score >= 70 ? 'Good match' : 'Fair match'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Authenticity</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${authenticity_score * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-bold">{Math.round(authenticity_score * 100)}%</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">High authenticity score</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Response Likelihood</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${response_likelihood * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-bold">{Math.round(response_likelihood * 100)}%</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                      {response_likelihood >= 0.8 ? 'Very likely to respond' : 
                       response_likelihood >= 0.6 ? 'Likely to respond' : 'May respond'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Audience Demographics */}
              {audience_demographics && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Audience Demographics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {audience_demographics.gender && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">Gender Split</h4>
                        <div className="space-y-2">
                          {Object.entries(audience_demographics.gender).map(([gender, percentage]) => (
                            <div key={gender} className="flex items-center justify-between">
                              <span className="text-white/70 capitalize">{gender}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-white/10 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-white text-sm w-8">{percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {audience_demographics.interests && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">Top Interests</h4>
                        <div className="space-y-2">
                          {Object.entries(audience_demographics.interests).slice(0, 4).map(([interest, percentage]) => (
                            <div key={interest} className="flex items-center justify-between">
                              <span className="text-white/70 capitalize">{interest}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-white/10 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-white text-sm w-8">{percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Content */}
              {recent_posts && recent_posts.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                    Recent Content Performance
                  </h3>
                  
                  <div className="space-y-3">
                    {recent_posts.map((post, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">{post.topic}</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-white font-semibold">{formatNumber(post.engagement)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Conversation</span>
                </button>
                <button className="btn-secondary flex items-center justify-center px-6">
                  <Star className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default InfluencerDetailModal