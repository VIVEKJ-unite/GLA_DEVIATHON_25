import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Users, TrendingUp, Star, BarChart3, MessageSquare, Plus, Eye, Instagram, Youtube } from 'lucide-react'
import { useCampaign } from '../contexts/CampaignContext'
import { useAuth } from '../contexts/AuthContext'
import { formatNumber } from '../utils/api'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const { campaigns, fetchAnalytics, loading } = useCampaign()
  const [dashboardStats, setDashboardStats] = useState(null)
  const [liveInfluencers, setLiveInfluencers] = useState([])
  const [loadingInfluencers, setLoadingInfluencers] = useState(false)

  useEffect(() => {
    if (isAuthenticated && campaigns && campaigns.length > 0) {
      const loadDashboardData = async () => {
        try {
          const stats = await fetchAnalytics(campaigns[0].id)
          setDashboardStats(stats)
        } catch (error) {
          console.error('Error loading dashboard stats:', error)
        }
      }
      loadDashboardData()
    }
  }, [campaigns, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      const mockInfluencers = [
        { username: 'beauty_guru', platform: 'instagram', followers: 85000, engagement_rate: 4.2, brand_fit_score: 92 },
        { username: 'lifestyle_queen', platform: 'youtube', followers: 120000, engagement_rate: 3.8, brand_fit_score: 88 },
        { username: 'wellness_coach', platform: 'instagram', followers: 67000, engagement_rate: 5.1, brand_fit_score: 95 }
      ]
      setLiveInfluencers(mockInfluencers)
      setLoadingInfluencers(false)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen theme-gradient overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mx-auto mb-8 shadow-2xl animate-pulse-glow"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 text-glow"
            >
              ICY Platform
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            >
              AI-powered influencer outreach agent. Find perfect influencers, analyze brand fit, and send personalized messages automatically.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link to="/login" className="btn-primary hover-lift">Get Started</Link>
              <Link to="/register" className="btn-secondary hover-lift">Sign Up Free</Link>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, title: "AI Discovery", desc: "Smart influencer discovery across Instagram and YouTube", delay: 0.2 },
              { icon: TrendingUp, title: "Brand Fit Analysis", desc: "AI analyzes content alignment and authenticity scores", delay: 0.4 },
              { icon: Star, title: "Personalized Outreach", desc: "Automated personalized messages with smart timing", delay: 0.6 }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                className="modern-card p-8 text-center hover-lift card-hover-effect"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="modern-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div><div className="text-3xl font-bold text-purple-600 mb-2">50K+</div><div className="text-slate-600">Influencers Analyzed</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">32%</div><div className="text-slate-600">Average Response Rate</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">94%</div><div className="text-slate-600">Brand Fit Accuracy</div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const stats = dashboardStats ? [
    { title: 'Active Campaigns', value: (campaigns?.length || 0).toString(), icon: <Rocket className="w-6 h-6 text-purple-600" /> },
    { title: 'Messages Sent', value: dashboardStats.messages_sent.toString(), icon: <MessageSquare className="w-6 h-6 text-purple-600" /> },
    { title: 'Total Reach', value: formatNumber(dashboardStats.estimated_reach), icon: <TrendingUp className="w-6 h-6 text-purple-600" /> },
    { title: 'Response Rate', value: `${(dashboardStats.response_rate * 100).toFixed(1)}%`, icon: <BarChart3 className="w-6 h-6 text-purple-600" /> }
  ] : [
    { title: 'Active Campaigns', value: (campaigns?.length || 0).toString(), icon: <Rocket className="w-6 h-6 text-purple-600" /> },
    { title: 'Total Creators', value: '0', icon: <Users className="w-6 h-6 text-purple-600" /> },
    { title: 'Total Reach', value: '0', icon: <TrendingUp className="w-6 h-6 text-purple-600" /> },
    { title: 'Response Rate', value: '0%', icon: <BarChart3 className="w-6 h-6 text-purple-600" /> }
  ]

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="modern-card p-8 mb-8">
          <div className="flex items-center justify-between">
            <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1><p className="text-slate-600">Manage your campaigns and track performance</p></div>
            <Link to="/setup" className="btn-primary flex items-center space-x-2"><Plus className="w-5 h-5" /><span>New Campaign</span></Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="modern-card p-6 hover-lift stats-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">{stat.title}</p>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-2xl font-bold text-slate-900"
                  >
                    {loading && index > 0 ? <div className="animate-pulse bg-slate-200 h-8 w-16 rounded"></div> : stat.value}
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="modern-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-slate-900">Live Influencer Feed</h2><Link to="/search" className="text-purple-600 hover:text-purple-700 font-medium">View All</Link></div>
          {loadingInfluencers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="animate-pulse bg-slate-200 h-32 rounded-xl"></div>)}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveInfluencers.map((influencer, index) => (
                <div key={index} className="bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">{influencer.platform === 'instagram' ? <Instagram className="w-5 h-5 text-pink-600" /> : <Youtube className="w-5 h-5 text-red-600" />}<span className="font-semibold text-slate-900">{influencer.username}</span></div>
                  <div className="space-y-2 text-sm text-slate-600"><div className="flex justify-between"><span>Followers:</span><span className="font-medium">{formatNumber(influencer.followers)}</span></div><div className="flex justify-between"><span>Engagement:</span><span className="font-medium">{influencer.engagement_rate}%</span></div><div className="flex justify-between"><span>Brand Fit:</span><span className="font-medium text-green-600">{influencer.brand_fit_score}%</span></div></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-slate-900">Your Campaigns</h2></div>
          <div className="space-y-4">
            {campaigns && campaigns.length > 0 ? campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between"><div className="flex items-center space-x-4"><div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"><Rocket className="w-6 h-6 text-white" /></div><div><h3 className="text-lg font-semibold text-slate-900">{campaign.brand_setup?.brand_name || 'Campaign'}</h3><div className="flex items-center space-x-4 text-sm text-slate-600"><span>Created {new Date(campaign.created_at).toLocaleDateString()}</span><span>•</span><span>{campaign.brand_setup?.target_audience?.split(' ').slice(0, 3).join(' ') || 'General audience'}</span></div></div></div><div className="flex items-center space-x-3"><span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">Active</span></div></div>
              </div>
            )) : (
              <div className="text-center py-12"><Rocket className="w-16 h-16 text-slate-300 mx-auto mb-4" /><h3 className="text-xl font-semibold text-slate-900 mb-2">No campaigns yet</h3><p className="text-slate-600 mb-6">Create your first campaign to get started</p><Link to="/setup" className="btn-primary">Create Campaign</Link></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home