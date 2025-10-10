import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  DollarSign,
  Target,
  Calendar,
  Award
} from 'lucide-react'
import StatsCard from '../components/UI/StatsCard'
import { CampaignPerformanceChart, EngagementTrendChart, PlatformDistributionChart } from '../components/Charts/PerformanceChart'

const Analytics = () => {
  // Mock data for analytics dashboard
  const overallStats = [
    {
      title: 'Total Campaigns',
      value: '12',
      subtitle: 'All time',
      icon: <Target className="w-6 h-6" />,
      trend: { value: 25, label: 'vs last month' }
    },
    {
      title: 'Active Influencers',
      value: '47',
      subtitle: 'Engaged this month',
      icon: <Users className="w-6 h-6" />,
      trend: { value: 18, label: 'vs last month' }
    },
    {
      title: 'Avg. Response Rate',
      value: '42%',
      subtitle: 'Across all campaigns',
      icon: <MessageSquare className="w-6 h-6" />,
      trend: { value: 8, label: 'vs last month' }
    },
    {
      title: 'Total ROI',
      value: '4.2x',
      subtitle: 'Average return',
      icon: <DollarSign className="w-6 h-6" />,
      trend: { value: 15, label: 'vs last month' }
    }
  ]

  const platformPerformance = [
    { platform: 'Instagram', campaigns: 8, responseRate: 45, avgEngagement: 4.2 },
    { platform: 'YouTube', campaigns: 3, responseRate: 38, avgEngagement: 3.8 },
    { platform: 'TikTok', campaigns: 5, responseRate: 52, avgEngagement: 5.1 },
    { platform: 'Twitter', campaigns: 2, responseRate: 28, avgEngagement: 2.4 }
  ]

  const topPerformingCampaigns = [
    { name: 'EcoGlow Skincare', influencers: 15, responses: 8, collaborations: 5, roi: 6.2 },
    { name: 'TechGadgets Launch', influencers: 12, responses: 6, collaborations: 4, roi: 5.8 },
    { name: 'Fitness App', influencers: 8, responses: 5, collaborations: 3, roi: 4.5 },
    { name: 'Sustainable Fashion', influencers: 10, responses: 4, collaborations: 2, roi: 3.2 }
  ]

  const campaignPerformanceData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 78 },
    { name: 'Mar', value: 82 },
    { name: 'Apr', value: 91 },
    { name: 'May', value: 88 },
    { name: 'Jun', value: 95 }
  ]

  const engagementTrendData = [
    { date: 'Week 1', engagement: 4.2, responses: 35 },
    { date: 'Week 2', engagement: 4.8, responses: 42 },
    { date: 'Week 3', engagement: 5.1, responses: 48 },
    { date: 'Week 4', engagement: 4.9, responses: 52 }
  ]

  const platformDistributionData = [
    { name: 'Instagram', value: 45 },
    { name: 'TikTok', value: 30 },
    { name: 'YouTube', value: 15 },
    { name: 'Twitter', value: 10 }
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
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-white/70">
                Comprehensive insights across all your influencer campaigns
              </p>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <BarChart3 className="w-5 h-5" />
              <span>Real-time Data</span>
            </div>
          </div>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overallStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
              Campaign Performance
            </h2>
            <CampaignPerformanceChart data={campaignPerformanceData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
              Engagement Trends
            </h2>
            <EngagementTrendChart data={engagementTrendData} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-400" />
              Platform Distribution
            </h2>
            <PlatformDistributionChart data={platformDistributionData} />
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Top Performing Campaigns</h2>
              <div className="space-y-4">
                {topPerformingCampaigns.map((campaign, index) => (
                  <div key={campaign.name} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-semibold">{campaign.name}</div>
                      <div className="badge-success">{campaign.roi}x ROI</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-white font-semibold">{campaign.influencers}</div>
                        <div className="text-white/60 text-xs">Influencers</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{campaign.responses}</div>
                        <div className="text-white/60 text-xs">Responses</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{campaign.collaborations}</div>
                        <div className="text-white/60 text-xs">Collaborations</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Real-time Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
            Real-time Campaign Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">+15%</div>
              <div className="text-white/70 text-sm">Response Rate (24h)</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.3K</div>
              <div className="text-white/70 text-sm">New Followers</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">$4.2K</div>
              <div className="text-white/70 text-sm">Revenue Generated</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">8</div>
              <div className="text-white/70 text-sm">Active Campaigns</div>
            </div>
          </div>
        </motion.div>

        {/* Insights & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-blue-400" />
            AI Insights & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">What's Working</h3>
              </div>
              <ul className="text-white/70 space-y-2 text-sm">
                <li>• TikTok campaigns are generating 52% response rates</li>
                <li>• Micro-influencers are delivering 6.2x average ROI</li>
                <li>• Personalized outreach has 3x higher conversion</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold">Recommendations</h3>
              </div>
              <ul className="text-white/70 space-y-2 text-sm">
                <li>• Increase TikTok budget by 30% for higher returns</li>
                <li>• Focus on sustainability niche for better engagement</li>
                <li>• Test video content for 25% higher response rates</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics