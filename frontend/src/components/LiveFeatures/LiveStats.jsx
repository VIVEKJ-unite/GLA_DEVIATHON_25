import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, DollarSign, Users, Zap } from 'lucide-react'

const LiveStats = () => {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    earnings: 45230,
    campaigns: 89,
    matches: 156
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        earnings: prev.earnings + Math.floor(Math.random() * 1000),
        campaigns: prev.campaigns + Math.floor(Math.random() * 2),
        matches: prev.matches + Math.floor(Math.random() * 3)
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const statItems = [
    { icon: Activity, label: 'Live Users', value: stats.activeUsers, color: 'text-green-400', prefix: '' },
    { icon: DollarSign, label: 'Earnings Today', value: stats.earnings, color: 'text-yellow-400', prefix: '₹' },
    { icon: Users, label: 'Active Campaigns', value: stats.campaigns, color: 'text-blue-400', prefix: '' },
    { icon: Zap, label: 'AI Matches', value: stats.matches, color: 'text-purple-400', prefix: '' }
  ]

  return (
    <div className="glass-morphism rounded-2xl p-6 hover-lift">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-5 h-5 text-green-400 animate-pulse" />
        <h3 className="text-white font-bold">📊 Live Platform Stats</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            className="text-center p-3 bg-white/5 rounded-xl"
          >
            <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
            <div className={`text-lg font-bold ${item.color}`}>
              {item.prefix}{item.value.toLocaleString()}
            </div>
            <div className="text-white/60 text-xs">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LiveStats