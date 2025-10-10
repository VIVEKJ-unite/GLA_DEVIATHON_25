import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Menu, X, Sparkles, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/ai-tools', label: 'AI Tools' }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="modern-card border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg transition-all duration-200 animate-pulse-glow"
            >
              <Rocket className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex items-center space-x-1">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-slate-900 text-glow"
              >
                ICY
              </motion.span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 relative group ${
                    location.pathname === item.path
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/setup" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm hover-lift"
              >
                New Campaign
              </Link>
            </motion.div>
            
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-white/80 hover:bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>
              
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-3 border-b border-slate-200">
                      <p className="text-slate-900 font-semibold">{user?.name}</p>
                      <p className="text-slate-600 text-sm">{user?.email}</p>
                    </div>
                    <motion.button
                      whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            className="md:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-slate-200"
            >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 text-slate-600 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/setup"
              className="block mt-4 btn-primary text-center text-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              New Campaign
            </Link>
            
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{user?.name}</p>
                  <p className="text-slate-600 text-xs">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar