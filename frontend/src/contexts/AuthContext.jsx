import React, { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('icy-token')
    const userData = localStorage.getItem('icy-user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({ type: 'SET_USER', payload: user })
      } catch (error) {
        localStorage.removeItem('icy-token')
        localStorage.removeItem('icy-user')
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === 'demo@icy.com' && password === 'demo123') {
      const user = {
        id: 1,
        email: 'demo@icy.com',
        name: 'Demo User',
        company: 'Demo Company',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
      
      localStorage.setItem('icy-token', 'demo-token')
      localStorage.setItem('icy-user', JSON.stringify(user))
      dispatch({ type: 'SET_USER', payload: user })
      toast.success('Welcome back!')
      return true
    }
    
    dispatch({ type: 'SET_LOADING', payload: false })
    toast.error('Invalid credentials. Use demo@icy.com / demo123')
    return false
  }

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = {
      id: Date.now(),
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
    
    localStorage.setItem('icy-token', 'demo-token')
    localStorage.setItem('icy-user', JSON.stringify(user))
    dispatch({ type: 'SET_USER', payload: user })
    toast.success('Account created successfully!')
    return true
  }

  const logout = () => {
    localStorage.removeItem('icy-token')
    localStorage.removeItem('icy-user')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}