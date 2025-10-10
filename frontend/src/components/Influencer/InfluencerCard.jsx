import React from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink,
  MessageCircle,
  Users,
  TrendingUp,
  MapPin
} from 'lucide-react'
import { 
  formatNumber, 
  getPlatformIcon, 
  getPlatformColor,
  getBrandFitColor 
} from '../../utils/api'

const InfluencerCard = ({ 
  influencer, 
  delay = 0, 
  showFullDetails = false,
  showActions = false 
}) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="glass-card-hover p-6 hover-lift relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{getPlatformIcon(platform)}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-white/60 text-sm">@{handle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className={`badge ${getPlatformColor(platform)}`}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </div>
            <div className={getBrandFitColor(brand_fit_score)}>
              {brand_fit_score}% Match
            </div>
          </div>
        </div>

        {profile_url && (
          <a
            href={profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost p-2"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/60 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Followers</span>
          </div>
          <div className="text-white font-semibold">
            {formatNumber(followers)}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/60 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Engagement</span>
          </div>
          <div className="text-white font-semibold">
            {engagement_rate}%
          </div>
        </div>
      </div>

      {/* Location & Niche */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center space-x-1 text-white/60">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="text-white/70">
          {niche}
        </div>
      </div>

      {/* Additional Details */}
      {showFullDetails && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          {/* Authenticity Score */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/60">Authenticity</span>
            <span className="text-white font-medium">
              {Math.round(authenticity_score * 100)}%
            </span>
          </div>

          {/* Response Likelihood */}
          {response_likelihood && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Response Likelihood</span>
              <span className="text-white font-medium">
                {Math.round(response_likelihood * 100)}%
              </span>
            </div>
          )}

          {/* Estimated Cost */}
          {estimated_cost && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Estimated Cost</span>
              <span className="text-white font-medium">
                ${Math.round(estimated_cost)}
              </span>
            </div>
          )}

          {/* Audience Demographics */}
          {audience_demographics && (
            <div className="text-sm">
              <div className="text-white/60 mb-1">Audience</div>
              <div className="flex flex-wrap gap-1">
                {Object.entries(audience_demographics.gender || {}).map(([key, value]) => (
                  <span key={key} className="badge-info text-xs">
                    {value}% {key}
                  </span>
                ))}
                {audience_demographics.interests && 
                  Object.entries(audience_demographics.interests).slice(0, 2).map(([key, value]) => (
                    <span key={key} className="badge-info text-xs">
                      {value}% {key}
                    </span>
                  ))
                }
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {recent_posts && recent_posts.length > 0 && (
            <div className="text-sm">
              <div className="text-white/60 mb-1">Recent Content</div>
              <div className="space-y-1">
                {recent_posts.slice(0, 2).map((post, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-white/70 truncate flex-1 mr-2">
                      {post.topic}
                    </span>
                    <span className="text-white/60">
                      {formatNumber(post.engagement)} 👍
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="flex space-x-2 mt-4 pt-4 border-t border-white/10"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex-1 flex items-center justify-center space-x-2 text-sm py-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center justify-center px-3 text-sm py-2"
          >
            <Users className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
      </div>
    </motion.div>
  )
}

export default InfluencerCard