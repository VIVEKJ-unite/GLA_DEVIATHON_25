import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building, Users, Rocket, Star, TrendingUp, Camera } from 'lucide-react'

const RegisterChoice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-saffron-600 to-orange-600 rounded-3xl mx-auto mb-6">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Join India's #1 Influencer Platform
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Choose your path to success in the Indian influencer marketing ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Brand Registration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative"
          >
            <Link to="/register?type=brand">
              <div className="glass-card p-8 h-full hover:border-saffron-500/50 transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-600 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Building className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">For Brands & Companies</h2>
                <p className="text-white/70 text-lg mb-6">
                  Connect with verified Indian influencers and scale your brand across India
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full"></div>
                    <span className="text-white">Access 5000+ verified Indian influencers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full"></div>
                    <span className="text-white">AI-powered brand matching for Indian market</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full"></div>
                    <span className="text-white">Multi-language campaign management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full"></div>
                    <span className="text-white">ROI tracking in ₹ (Indian Rupees)</span>
                  </div>
                </div>

                <div className="bg-saffron-500/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Starting at</span>
                    <span className="text-2xl font-bold text-saffron-400">₹0/month</span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">Free trial • No credit card required</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">1000+ Indian brands trust us</span>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Influencer Registration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative"
          >
            <Link to="/register?type=influencer">
              <div className="glass-card p-8 h-full hover:border-green-500/50 transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">For Influencers & Creators</h2>
                <p className="text-white/70 text-lg mb-6">
                  Monetize your content and connect with top Indian brands
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Get discovered by 1000+ Indian brands</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Professional portfolio builder</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Direct payments in ₹ to Indian bank accounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Multi-platform analytics dashboard</span>
                  </div>
                </div>

                <div className="bg-green-500/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Earn up to</span>
                    <span className="text-2xl font-bold text-green-400">₹50K+/month</span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">Top Indian influencers earning</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">5000+ active creators</span>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
              Sign in here
            </Link>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/50 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Made in India 🇮🇳</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-saffron-400 rounded-full"></div>
              <span>GST Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 Support in Hindi & English</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterChoice