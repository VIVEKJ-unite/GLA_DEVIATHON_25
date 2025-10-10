import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Shield, Calculator, TrendingUp, Zap, Brain } from 'lucide-react'
import FraudDetector from '../components/AI/FraudDetector'
import ReachCalculator from '../components/AI/ReachCalculator'
import MessageGenerator from '../components/AI/MessageGenerator'

const AITools = () => {
  const [activeTool, setActiveTool] = useState(null)

  const tools = [
    {
      id: 'fraud-detector',
      name: 'Fraud Detector',
      description: 'AI-powered analysis to detect fake followers and engagement',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500',
      features: ['Follower authenticity check', 'Engagement pattern analysis', 'Risk assessment', 'Detailed recommendations']
    },
    {
      id: 'reach-calculator',
      name: 'Reach Calculator',
      description: 'Predict campaign reach and performance with AI algorithms',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Platform-specific calculations', 'Engagement predictions', 'ROI estimation', 'Performance breakdown']
    },
    {
      id: 'message-generator',
      name: 'Message Generator',
      description: 'AI-powered personalized outreach messages for influencers',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      features: ['Personalized templates', 'Multiple tones', 'Brand alignment', 'Follow-up messages']
    },
    {
      id: 'performance-predictor',
      name: 'Performance Predictor',
      description: 'Forecast campaign success using machine learning models',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      features: ['Success probability', 'Engagement forecasting', 'Trend analysis', 'Competitive insights']
    },
    {
      id: 'auto-negotiator',
      name: 'Auto Negotiator',
      description: 'AI-powered price negotiation and contract optimization',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      features: ['Price optimization', 'Contract analysis', 'Market rate comparison', 'Negotiation strategies']
    },
    {
      id: 'sentiment-analyzer',
      name: 'Sentiment Analyzer',
      description: 'Analyze audience sentiment and brand perception',
      icon: <Bot className="w-8 h-8" />,
      color: 'from-teal-500 to-blue-500',
      features: ['Comment sentiment', 'Brand mention analysis', 'Audience mood tracking', 'Reputation monitoring']
    }
  ]

  const renderTool = () => {
    try {
      switch (activeTool) {
        case 'fraud-detector':
          return <FraudDetector onClose={() => setActiveTool(null)} />
        case 'reach-calculator':
          return <ReachCalculator onClose={() => setActiveTool(null)} />
        case 'message-generator':
          return <MessageGenerator onClose={() => setActiveTool(null)} />
        default:
          return null
      }
    } catch (error) {
      console.error('Error rendering AI tool:', error)
      return (
        <div className="modern-card p-6 text-center">
          <p className="text-red-600">Error loading AI tool. Please try again.</p>
          <button onClick={() => setActiveTool(null)} className="btn-secondary mt-4">
            Back to Tools
          </button>
        </div>
      )
    }
  }

  const ComingSoonTool = ({ tool, index }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="modern-card p-6 opacity-75 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 opacity-50"></div>
      <div className="relative z-10">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto opacity-75`}
        >
          {tool.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">{tool.name}</h3>
        <p className="text-slate-600 mb-4 text-center">{tool.description}</p>
        <div className="space-y-2 mb-4">
          {tool.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-purple-600 rounded-full opacity-50"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium"
          >
            Coming Soon
          </motion.span>
        </div>
      </div>
    </motion.div>
  )

  if (activeTool) {
    return (
      <div className="min-h-screen py-8 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          {renderTool()}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="modern-card p-8 mb-8"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
            >
              <Bot className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-slate-900 mb-2"
            >
              AI-Powered Tools
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-slate-600 max-w-2xl mx-auto"
            >
              Leverage cutting-edge artificial intelligence to optimize your influencer marketing campaigns, 
              detect fraud, and maximize ROI with data-driven insights.
            </motion.p>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
            >
              {tool.id === 'fraud-detector' || tool.id === 'reach-calculator' || tool.id === 'message-generator' ? (
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="modern-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 interactive-card"
                  onClick={() => setActiveTool(tool.id)}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}
                  >
                    {tool.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">{tool.name}</h3>
                  <p className="text-slate-600 mb-4 text-center">{tool.description}</p>
                  <div className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.5 }}
                        className="flex items-center space-x-2 text-sm text-slate-600"
                      >
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-primary btn-animated"
                  >
                    Launch Tool
                  </motion.button>
                </motion.div>
              ) : (
                <ComingSoonTool tool={tool} index={index} />
              )}
            </motion.div>
          ))}
        </div>

        {/* AI Features Showcase */}
        <div className="modern-card p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why Choose AI-Powered Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Machine Learning</h3>
              <p className="text-slate-600 text-sm">Advanced algorithms analyze millions of data points for accurate predictions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Real-time Analysis</h3>
              <p className="text-slate-600 text-sm">Get instant insights and recommendations as market conditions change</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Performance Optimization</h3>
              <p className="text-slate-600 text-sm">Continuously improve campaign performance with AI-driven optimizations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITools