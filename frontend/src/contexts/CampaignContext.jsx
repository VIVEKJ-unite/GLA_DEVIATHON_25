import React, { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

const CampaignContext = createContext()

const campaignReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_CAMPAIGN':
      return {
        ...state,
        currentCampaign: action.payload,
        campaigns: [...state.campaigns, action.payload]
      }
    case 'SET_CAMPAIGNS':
      return {
        ...state,
        campaigns: action.payload
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      }
    case 'UPDATE_MESSAGE_STATUS':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.messageId
            ? { ...msg, status: action.payload.status }
            : msg
        )
      }
    case 'SET_ANALYTICS':
      return {
        ...state,
        analytics: action.payload
      }
    case 'SET_INFLUENCERS':
      return {
        ...state,
        influencers: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  campaigns: [],
  currentCampaign: null,
  messages: [],
  analytics: null,
  influencers: [],
  loading: false,
  error: null
}

export const CampaignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(campaignReducer, initialState)

  // Load campaigns from localStorage on mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('icy-campaigns')
    if (savedCampaigns) {
      try {
        const campaigns = JSON.parse(savedCampaigns)
        dispatch({ type: 'SET_CAMPAIGNS', payload: campaigns })
      } catch (error) {
        console.error('Error loading campaigns from localStorage:', error)
      }
    } else {
      // Add mock data for demo
      const mockCampaigns = [
        {
          id: 'demo-1',
          brand_setup: {
            brand_name: 'EcoGlow Skincare',
            product_details: 'Natural, sustainable skincare products',
            target_audience: 'Women 25-40 interested in clean beauty',
            brand_tone: 'friendly'
          },
          created_at: new Date().toISOString(),
          status: 'active'
        }
      ]
      dispatch({ type: 'SET_CAMPAIGNS', payload: mockCampaigns })
    }
  }, [])

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    if (state.campaigns.length > 0) {
      localStorage.setItem('icy-campaigns', JSON.stringify(state.campaigns))
    }
  }, [state.campaigns])

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
    if (error) {
      toast.error(error.message || 'An error occurred')
    }
  }

  const createCampaign = async (brandSetup) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const campaign = {
        id: Date.now().toString(),
        brand_setup: brandSetup,
        created_at: new Date().toISOString(),
        status: 'active'
      }
      
      dispatch({ type: 'SET_CAMPAIGN', payload: campaign })
      toast.success('Campaign created successfully!')
      return campaign
    } catch (error) {
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const generateMessages = async (campaignId) => {
    setLoading(true)
    try {
      // Mock message generation
      const mockMessages = [
        {
          id: 'msg_1',
          influencer_name: 'Emma GreenBeauty',
          message: `Hi Emma! 👋\n\nLoved your recent post about sustainable skincare ingredients - it perfectly aligns with our mission at EcoGlow Skincare.\n\nWe create natural, eco-friendly skincare products for conscious consumers like your audience. Your authentic approach to clean beauty is exactly what we're looking for in a partnership.\n\nWould you be interested in trying our new sensitive skin line? I'd love to send you some products to review.\n\nBest,\nEcoGlow Team`,
          status: 'draft',
          brand_fit_reason: 'Sustainability focus matches brand values',
          send_time: 'Today 7:00 PM (Peak engagement)'
        },
        {
          id: 'msg_2',
          influencer_name: 'Sarah WellnessLife',
          message: `Hey Sarah! ✨\n\nI've been watching your morning skincare routine videos and they're so helpful! Your focus on natural ingredients really resonates with our brand.\n\nI'm reaching out from EcoGlow Skincare - we specialize in clean, effective skincare for wellness-focused women. Your audience would love our approach to natural beauty.\n\nInterested in a collaboration? Happy to discuss details!\n\nWarmly,\nEcoGlow Team`,
          status: 'draft',
          brand_fit_reason: 'Wellness content aligns with target audience',
          send_time: 'Tomorrow 10:00 AM (Morning routine check)'
        }
      ]
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      dispatch({ type: 'SET_MESSAGES', payload: mockMessages })
      toast.success(`Generated ${mockMessages.length} personalized messages!`)
      return mockMessages
    } catch (error) {
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}/send`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        dispatch({ 
          type: 'UPDATE_MESSAGE_STATUS', 
          payload: { messageId, status: 'sent' } 
        })
        toast.success('Message sent successfully!')
        return true
      }
    } catch (error) {
      setError(error)
      return false
    }
  }

  const bulkSendMessages = async (campaignId) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/messages/bulk-send`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        // Update all draft messages to sent
        const updatedMessages = state.messages.map(msg => 
          msg.status === 'draft' ? { ...msg, status: 'sent' } : msg
        )
        dispatch({ type: 'SET_MESSAGES', payload: updatedMessages })
        toast.success(`Sent ${result.data.sent_count} messages!`)
        return result.data.sent_count
      }
    } catch (error) {
      setError(error)
      return 0
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async (campaignId) => {
    setLoading(true)
    try {
      // Mock analytics data
      const mockAnalytics = {
        messages_sent: 15,
        open_rate: 0.68,
        response_rate: 0.42,
        confirmed_collaborations: 6,
        estimated_reach: 890000,
        estimated_engagement: 45000,
        total_investment: 18500,
        estimated_roi: 4.2
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      dispatch({ type: 'SET_ANALYTICS', payload: mockAnalytics })
      return mockAnalytics
    } catch (error) {
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const searchInfluencers = async (filters = {}) => {
    setLoading(true)
    try {
      // Mock influencer data for demo
      const mockInfluencers = [
        {
          id: 1,
          name: "Emma GreenBeauty",
          handle: "emma_greenbeauty",
          platform: "instagram",
          followers: 85000,
          engagement_rate: 6.8,
          niche: "Clean Beauty & Sustainability",
          location: "Los Angeles, CA",
          brand_fit_score: 94,
          authenticity_score: 0.92,
          profile_url: "https://instagram.com/emma_greenbeauty",
          response_likelihood: 0.85,
          estimated_cost: 2800,
          recent_posts: ["sustainable skincare routine", "clean beauty ingredients"]
        },
        {
          id: 2,
          name: "Sarah WellnessLife",
          handle: "sarahwellnesslife",
          platform: "youtube",
          followers: 125000,
          engagement_rate: 4.2,
          niche: "Wellness & Natural Living",
          location: "Austin, TX",
          brand_fit_score: 92,
          authenticity_score: 0.89,
          profile_url: "https://youtube.com/@sarahwellness",
          response_likelihood: 0.78,
          estimated_cost: 3500,
          recent_posts: ["morning skincare routine", "natural beauty tips"]
        },
        {
          id: 3,
          name: "Maya CleanLiving",
          handle: "mayacleanliving",
          platform: "instagram",
          followers: 67000,
          engagement_rate: 7.1,
          niche: "Eco-Friendly Lifestyle",
          location: "Portland, OR",
          brand_fit_score: 88,
          authenticity_score: 0.91,
          profile_url: "https://instagram.com/mayacleanliving",
          response_likelihood: 0.82,
          estimated_cost: 2200,
          recent_posts: ["zero waste beauty", "sustainable fashion"]
        }
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      dispatch({ type: 'SET_INFLUENCERS', payload: mockInfluencers })
      return mockInfluencers
    } catch (error) {
      setError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const value = {
    ...state,
    createCampaign,
    generateMessages,
    sendMessage,
    bulkSendMessages,
    fetchAnalytics,
    searchInfluencers,
    setLoading,
    setError,
  }

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaign = () => {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}