import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="glass-card border-t border-white/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">ICY</h2>
                <p className="text-white/60 text-sm">Influencer Outreach Agent</p>
              </div>
            </div>
            <p className="text-white/70 max-w-md">
              AI-powered influencer marketing platform that turns guesswork into data-driven success. 
              Find perfect influencers, analyze brand fit, and automate personalized outreach.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/setup" className="block text-white/70 hover:text-white transition-colors">
                Create Campaign
              </Link>
              <Link to="/search" className="block text-white/70 hover:text-white transition-colors">
                Find Influencers
              </Link>
              <Link to="/analytics" className="block text-white/70 hover:text-white transition-colors">
                Analytics
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors transform hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 ICY Influencer Outreach Agent. Built for hackathon success.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-white/60 text-sm">AI-Powered</span>
            <span className="text-white/60 text-sm">Data-Driven</span>
            <span className="text-white/60 text-sm">Results-Focused</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer