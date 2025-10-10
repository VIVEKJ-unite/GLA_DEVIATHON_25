import React, { useState, useEffect } from 'react'
import { Search, Filter, Users, Instagram, Youtube, Twitter, Eye, Shield, Calculator, MessageSquare, CheckCircle } from 'lucide-react'
import { useCampaign } from '../contexts/CampaignContext'
import { formatNumber } from '../utils/api'
import { realCreators } from '../data/creators'
import BrandFitScore from '../components/UI/BrandFitScore'
import SmartTiming from '../components/AI/SmartTiming'
import AutoFollowUp from '../components/AI/AutoFollowUp'
import RelationshipManager from '../components/Relationship/RelationshipManager'
import FraudDetector from '../components/AI/FraudDetector'
import ReachCalculator from '../components/AI/ReachCalculator'
import MessageGenerator from '../components/AI/MessageGenerator'

const InfluencerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [showFraudDetector, setShowFraudDetector] = useState(false)
  const [showReachCalculator, setShowReachCalculator] = useState(false)
  const [showMessageGenerator, setShowMessageGenerator] = useState(false)
  const { influencers, searchInfluencers, loading } = useCampaign()

  useEffect(() => {
    // Load influencers on component mount
    searchInfluencers()
  }, [])

  const creators = realCreators.map(creator => ({
    id: creator.id,
    name: creator.name,
    handle: creator.handle,
    platform: creator.platform,
    followers: creator.followers >= 1000000 ? `${(creator.followers/1000000).toFixed(1)}M` : 
               creator.followers >= 1000 ? `${(creator.followers/1000).toFixed(0)}K` : creator.followers.toString(),
    engagement: `${creator.engagement}%`,
    category: creator.category,
    avatar: `https://images.unsplash.com/photo-${creator.id.includes('IN') ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=150`,
    verified: creator.verified,
    brandFit: Math.round(85 + Math.random() * 15),
    rawFollowers: creator.followers,
    rawEngagement: creator.engagement
  }))

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Users },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'tiktok', name: 'TikTok', icon: Users },
    { id: 'twitter', name: 'Twitter', icon: Twitter }
  ]

  const categories = [
    'All Categories', 'Beauty', 'Comedy', 'Dance', 'Entertainment', 'Fashion', 'Fitness', 
    'Food', 'Gaming', 'Health', 'Lifestyle', 'Motivation', 'Photography', 'Science', 
    'Sports', 'Tech', 'Travel', 'Wellness', 'Business', 'Education', 'Finance'
  ]

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.handle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || 
                           creator.platform.toLowerCase() === selectedPlatform
    const matchesCategory = selectedCategory === 'all' || 
                           creator.category === selectedCategory
    return matchesSearch && matchesPlatform && matchesCategory
  })

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="modern-card p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Creators</h1>
          <p className="text-slate-600">Discover and connect with top creators for your campaigns</p>
        </div>

        {/* Search & Filters */}
        <div className="modern-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Platform Filter */}
            <div className="lg:w-48">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="input-field"
              >
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All Categories' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Creators ({filteredCreators.length})
            </h2>
            <div className="flex items-center space-x-2 text-slate-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Sorted by relevance</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-8 bg-slate-200 rounded"></div>
                      <div className="h-8 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-8 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <div key={creator.id} className="bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-900">{creator.name}</h3>
                        {creator.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-slate-600 text-sm">{creator.handle}</p>
                      <p className="text-purple-600 text-sm font-medium">{creator.platform}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{creator.followers}</p>
                      <p className="text-slate-600 text-sm">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{creator.engagement}</p>
                      <p className="text-slate-600 text-sm">Engagement</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {creator.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      creator.brandFit >= 90 ? 'bg-green-100 text-green-700' :
                      creator.brandFit >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {creator.brandFit}% fit
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedCreator(creator)}
                      className="w-full btn-primary text-sm flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <div className="grid grid-cols-3 gap-1">
                      <button 
                        onClick={() => { setSelectedCreator(creator); setShowFraudDetector(true); }}
                        className="btn-secondary text-xs flex items-center justify-center space-x-1"
                      >
                        <Shield className="w-3 h-3" />
                        <span>Fraud</span>
                      </button>
                      <button 
                        onClick={() => { setSelectedCreator(creator); setShowReachCalculator(true); }}
                        className="btn-secondary text-xs flex items-center justify-center space-x-1"
                      >
                        <Calculator className="w-3 h-3" />
                        <span>Reach</span>
                      </button>
                      <button 
                        onClick={() => { setSelectedCreator(creator); setShowMessageGenerator(true); }}
                        className="btn-secondary text-xs flex items-center justify-center space-x-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No creators found</h3>
              <p className="text-slate-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Creator Detail Modal */}
        {selectedCreator && !showFraudDetector && !showReachCalculator && !showMessageGenerator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Creator Details</h2>
                  <button 
                    onClick={() => setSelectedCreator(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <BrandFitScore 
                      influencer={{
                        brand_fit_score: selectedCreator.brandFit,
                        name: selectedCreator.name,
                        niche: selectedCreator.category
                      }}
                      brandName="Your Brand"
                    />
                    
                    <SmartTiming 
                      influencer={selectedCreator}
                      onSchedule={(time) => console.log('Scheduled for:', time)}
                    />
                    
                    <AutoFollowUp 
                      messageId="msg_1"
                      influencerName={selectedCreator.name}
                      onToggle={(enabled) => console.log('Auto follow-up:', enabled)}
                    />
                  </div>

                  <div>
                    <RelationshipManager influencer={selectedCreator} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fraud Detector Modal */}
        {showFraudDetector && selectedCreator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full">
              <FraudDetector 
                influencer={selectedCreator} 
                onClose={() => { setShowFraudDetector(false); setSelectedCreator(null); }}
              />
            </div>
          </div>
        )}

        {/* Reach Calculator Modal */}
        {showReachCalculator && selectedCreator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full">
              <ReachCalculator 
                influencer={selectedCreator} 
                onClose={() => { setShowReachCalculator(false); setSelectedCreator(null); }}
              />
            </div>
          </div>
        )}

        {/* Message Generator Modal */}
        {showMessageGenerator && selectedCreator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full">
              <MessageGenerator 
                influencer={selectedCreator}
                brandInfo={{ brand_name: 'Your Brand', product_details: 'lifestyle products' }}
                onClose={() => { setShowMessageGenerator(false); setSelectedCreator(null); }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfluencerSearch