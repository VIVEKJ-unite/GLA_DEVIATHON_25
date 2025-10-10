import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Heart } from 'lucide-react'

const TrendingInfluencers = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const trendingInfluencers = [
    {
      id: 1,
      name: 'Priya Sharma',
      handle: '@priyafashion',
      followers: '245K',
      engagement: '8.2%',
      niche: 'Fashion',
      trending: '+15%',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Arjun Tech',
      handle: '@arjunreviews',
      followers: '180K',
      engagement: '6.8%',
      niche: 'Technology',
      trending: '+22%',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sneha Fitness',
      handle: '@snehafit',
      followers: '320K',
      engagement: '9.1%',
      niche: 'Fitness',
      trending: '+18%',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingInfluencers.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-morphism rounded-2xl p-6 hover-lift">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h3 className="text-white font-bold">🔥 Trending Now</h3>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative h-24 overflow-hidden">
        {trendingInfluencers.map((influencer, index) => (
          <motion.div
            key={influencer.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : 100
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center space-x-4"
          >
            <img 
              src={influencer.avatar} 
              alt={influencer.name}
              className="w-12 h-12 rounded-full border-2 border-saffron-400"
            />
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm">{influencer.name}</h4>
              <p className="text-white/60 text-xs">{influencer.handle}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-white text-xs">{influencer.followers}</span>
                <span className="text-green-400 text-xs font-bold">{influencer.trending}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TrendingInfluencers