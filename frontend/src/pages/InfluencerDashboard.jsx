import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  DollarSign,
  Star,
  Edit,
  Upload,
  Eye,
  Heart,
  Share2,
  Calendar,
  Award
} from 'lucide-react'
import StatsCard from '../components/UI/StatsCard'
import PlatformConnect from '../components/SocialConnect/PlatformConnect'

const InfluencerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Total Followers',
      value: '125K',
      subtitle: 'Across platforms',
      icon: <Users className="w-6 h-6" />,
      trend: { value: 12, label: 'this month' }
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      subtitle: 'Above average',
      icon: <Heart className="w-6 h-6" />,
      trend: { value: 8, label: 'improvement' }
    },
    {
      title: 'Monthly Earnings',
      value: '₹45K',
      subtitle: 'Last 30 days',
      icon: <DollarSign className="w-6 h-6" />,
      trend: { value: 25, label: 'vs last month' }
    },
    {
      title: 'Brand Collaborations',
      value: '8',
      subtitle: 'Active campaigns',
      icon: <Award className="w-6 h-6" />,
      trend: { value: 3, label: 'new this month' }
    }
  ]

  const recentPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Morning skincare routine with @EcoGlow ✨',
      views: 45000,
      likes: 3200,
      comments: 180,
      date: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      platform: 'YouTube',
      content: 'Tech Review: Latest smartphone under ₹30K',
      views: 89000,
      likes: 5400,
      comments: 320,
      date: '1 day ago',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop'
    }
  ]

  const brandOpportunities = [
    {
      id: 1,
      brand: 'EcoGlow Skincare',
      campaign: 'Summer Skincare Collection',
      budget: '₹15,000',
      deadline: '5 days left',
      match: 92,
      status: 'pending'
    },
    {
      id: 2,
      brand: 'TechMart India',
      campaign: 'Smartphone Launch Campaign',
      budget: '₹25,000',
      deadline: '2 weeks left',
      match: 88,
      status: 'invited'
    }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
                <p className="text-white/70">Welcome back, Priya! 🇮🇳</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Content</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'connect', label: 'Connect Platforms', icon: <Users className="w-4 h-4" /> },
              { id: 'portfolio', label: 'Portfolio', icon: <Camera className="w-4 h-4" /> },
              { id: 'opportunities', label: 'Brand Opportunities', icon: <Star className="w-4 h-4" /> },
              { id: 'earnings', label: 'Earnings', icon: <DollarSign className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Posts */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-green-400" />
                  Recent Posts
                </h2>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={post.image} 
                          alt="Post" 
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="badge badge-info text-xs">{post.platform}</span>
                            <span className="text-white/60 text-sm">{post.date}</span>
                          </div>
                          <p className="text-white mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{(post.views / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{(post.likes / 1000).toFixed(1)}K</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                  Performance This Month
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Reach</span>
                      <span className="text-white font-semibold">2.3M</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Engagement</span>
                      <span className="text-white font-semibold">4.8%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Brand Collaborations</span>
                      <span className="text-white font-semibold">8 Active</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-400" />
                Connect Your Social Media Platforms
              </h2>
              <PlatformConnect />
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-400" />
                Brand Collaboration Opportunities
              </h2>
              <div className="space-y-4">
                {brandOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{opportunity.brand}</h3>
                        <p className="text-white/70">{opportunity.campaign}</p>
                      </div>
                      <div className={`badge ${opportunity.match >= 90 ? 'badge-success' : 'badge-warning'}`}>
                        {opportunity.match}% Match
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{opportunity.budget}</div>
                        <div className="text-white/60 text-sm">Budget</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400">{opportunity.deadline}</div>
                        <div className="text-white/60 text-sm">Deadline</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className={`text-2xl font-bold ${opportunity.status === 'invited' ? 'text-blue-400' : 'text-orange-400'}`}>
                          {opportunity.status === 'invited' ? 'Invited' : 'Pending'}
                        </div>
                        <div className="text-white/60 text-sm">Status</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="btn-primary flex-1">
                        {opportunity.status === 'invited' ? 'Accept Invitation' : 'Apply Now'}
                      </button>
                      <button className="btn-secondary px-6">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-purple-400" />
                  Content Portfolio
                </h2>
                <button className="btn-primary flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Add New Content</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white/5 rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/40" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2">Content Title {item}</h3>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>Instagram</span>
                        <span>2.3K likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-400" />
                Earnings & Payments
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">₹45,000</div>
                  <div className="text-white/70">This Month</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-2">₹1,25,000</div>
                  <div className="text-white/70">Total Earned</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">₹15,000</div>
                  <div className="text-white/70">Pending</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { brand: 'EcoGlow Skincare', amount: '₹15,000', date: '2 days ago', status: 'Paid' },
                    { brand: 'TechMart India', amount: '₹25,000', date: '1 week ago', status: 'Paid' },
                    { brand: 'Fashion Hub', amount: '₹8,000', date: '2 weeks ago', status: 'Pending' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{transaction.brand}</div>
                        <div className="text-white/60 text-sm">{transaction.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{transaction.amount}</div>
                        <div className={`text-sm ${transaction.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default InfluencerDashboard