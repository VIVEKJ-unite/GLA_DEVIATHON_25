import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Twitter, Linkedin, RefreshCw, TrendingUp, Users, Eye } from 'lucide-react'
import socialMediaAPI from '../../services/socialMediaAPI'

const PlatformConnect = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState({})
  const [realtimeData, setRealtimeData] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    startRealtimeUpdates()
  }, [])

  const startRealtimeUpdates = () => {
    const interval = setInterval(async () => {
      if (connectedPlatforms.instagram) {
        const igMetrics = await socialMediaAPI.getInstagramMetrics('demo_user')
        setRealtimeData(prev => ({ ...prev, instagram: igMetrics }))
      }
      
      if (connectedPlatforms.youtube) {
        const ytMetrics = await socialMediaAPI.getYouTubeMetrics('demo_channel')
        setRealtimeData(prev => ({ ...prev, youtube: ytMetrics }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }

  const connectPlatform = async (platform) => {
    setLoading(prev => ({ ...prev, [platform]: true }))
    
    try {
      let result
      if (platform === 'instagram') {
        result = await socialMediaAPI.connectInstagram('mock_token')
      } else if (platform === 'youtube') {
        result = await socialMediaAPI.connectYouTube('mock_token')
      }
      
      if (result.success) {
        setConnectedPlatforms(prev => ({ ...prev, [platform]: true }))
      }
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error)
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }))
    }
  }

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'from-red-500 to-red-600'
    }
  ]

  const calculateTotalReach = () => {
    const platformData = [
      { type: 'instagram', followers: realtimeData.instagram?.followers || 0, engagement_rate: realtimeData.instagram?.engagement_rate || 0 },
      { type: 'youtube', followers: realtimeData.youtube?.subscribers || 0, engagement_rate: realtimeData.youtube?.engagement_rate || 0 }
    ]
    
    return socialMediaAPI.calculateReach(platformData)
  }

  const totalReach = calculateTotalReach()

  return (
    <div className="space-y-8">
      {/* Real-time Overview */}
      {Object.keys(connectedPlatforms).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-bold">📊 Real-time Reach Calculator</h3>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{totalReach.totalReach.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Total Reach</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{totalReach.avgEngagement}%</div>
              <div className="text-white/60 text-sm">Avg Engagement</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{totalReach.estimatedViews.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Est. Views</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">₹{totalReach.potentialRevenue.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Potential Revenue</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Platform Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform, index) => {
          const isConnected = connectedPlatforms[platform.id]
          const isLoading = loading[platform.id]
          const platformMetrics = realtimeData[platform.id]
          
          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{platform.name}</h3>
                    <p className="text-white/60 text-sm">Connect your {platform.name} account</p>
                  </div>
                </div>
                
                {isConnected ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-semibold">Connected</span>
                  </div>
                ) : (
                  <button
                    onClick={() => connectPlatform(platform.id)}
                    disabled={isLoading}
                    className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>

              {/* Real-time Metrics */}
              {isConnected && platformMetrics && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70 text-sm">
                        {platform.id === 'instagram' ? 'Followers' : 'Subscribers'}
                      </span>
                    </div>
                    <span className="text-white font-semibold">
                      {platform.id === 'instagram' 
                        ? platformMetrics.followers?.toLocaleString() 
                        : platformMetrics.subscribers?.toLocaleString()
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white/70 text-sm">Engagement Rate</span>
                    </div>
                    <span className="text-green-400 font-semibold">
                      {platformMetrics.engagement_rate?.toFixed(1)}%
                    </span>
                  </div>

                  {platform.id === 'instagram' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-white/70 text-sm">24h Reach</span>
                      </div>
                      <span className="text-purple-400 font-semibold">
                        {platformMetrics.reach_24h?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {platform.id === 'youtube' && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">24h Views</span>
                      <span className="text-blue-400 font-semibold">
                        {platformMetrics.views_24h?.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformConnect