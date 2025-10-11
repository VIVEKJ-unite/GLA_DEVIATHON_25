import toast from 'react-hot-toast'

const API_BASE_URL = 'http://localhost:8000/api'

// Generic API request handler
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    toast.error('Failed to connect to server. Please try again.')
    throw error
  }
}

// Campaign API functions
export const campaignAPI = {
  create: (brandSetup) => apiRequest('/campaigns', {
    method: 'POST',
    body: JSON.stringify(brandSetup),
  }),
  
  get: (campaignId) => apiRequest(`/campaigns/${campaignId}`),
  
  list: (skip = 0, limit = 10) => 
    apiRequest(`/campaigns?skip=${skip}&limit=${limit}`),
}

// Message API functions
export const messageAPI = {
  generate: (campaignId, maxMessages = 8) => 
    apiRequest(`/campaigns/${campaignId}/messages/generate?max_messages=${maxMessages}`, {
      method: 'POST',
    }),
  
  send: (messageId) => 
    apiRequest(`/messages/${messageId}/send`, {
      method: 'POST',
    }),
  
  bulkSend: (campaignId) => 
    apiRequest(`/campaigns/${campaignId}/messages/bulk-send`, {
      method: 'POST',
    }),
}

// Analytics API functions
export const analyticsAPI = {
  get: (campaignId) => apiRequest(`/campaigns/${campaignId}/analytics`),
}

// Influencer API functions
export const influencerAPI = {
  search: (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value)
      }
    })
    return apiRequest(`/influencers?${params}`)
  },
  
  get: (influencerId) => apiRequest(`/influencers/${influencerId}`),
}

// Health check
export const healthCheck = () => apiRequest('/health')

// Format numbers
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format percentage
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`
}

// Get platform icon
export const getPlatformIcon = (platform) => {
  const icons = {
    instagram: '📸',
    youtube: '🎥',
    tiktok: '🎵',
    twitter: '🐦'
  }
  return icons[platform] || '🌐'
}

// Get platform color
export const getPlatformColor = (platform) => {
  const colors = {
    instagram: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    youtube: 'bg-red-500/20 text-red-300 border-red-500/30',
    tiktok: 'bg-black/20 text-gray-300 border-gray-500/30',
    twitter: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }
  return colors[platform] || 'badge-info'
}

// Calculate brand fit color
export const getBrandFitColor = (score) => {
  if (score >= 80) return 'badge-success'
  if (score >= 60) return 'badge-warning'
  return 'badge-error'
}

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}