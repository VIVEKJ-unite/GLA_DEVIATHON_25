import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, X, Copy, RefreshCw, Sparkles, Send, User, Building } from 'lucide-react'

const MessageGenerator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    influencerName: '',
    brandName: '',
    productType: '',
    tone: 'professional',
    campaignGoal: 'awareness',
    personalNote: ''
  })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(0)

  const tones = [
    { value: 'professional', label: 'Professional', desc: 'Formal and business-like' },
    { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', desc: 'Relaxed and informal' },
    { value: 'enthusiastic', label: 'Enthusiastic', desc: 'Energetic and excited' }
  ]

  const goals = [
    { value: 'awareness', label: 'Brand Awareness' },
    { value: 'sales', label: 'Drive Sales' },
    { value: 'engagement', label: 'Increase Engagement' },
    { value: 'launch', label: 'Product Launch' }
  ]

  const generateMessages = () => {
    if (!formData.influencerName || !formData.brandName || !formData.productType) return
    
    setLoading(true)
    
    setTimeout(() => {
      const templates = [
        {
          subject: `Partnership Opportunity with ${formData.brandName}`,
          message: `Hi ${formData.influencerName}! 👋

I've been following your content and absolutely love your authentic approach to ${formData.productType.toLowerCase()}! Your recent posts really resonate with our brand values.

I'm reaching out from ${formData.brandName} because we believe you'd be a perfect fit for our upcoming campaign. We're looking to partner with creators who genuinely connect with their audience.

${formData.personalNote ? `${formData.personalNote}\n\n` : ''}Would you be interested in learning more about this collaboration opportunity? I'd love to share the details!

Best regards,
${formData.brandName} Team`,
          style: 'Professional & Direct'
        },
        {
          subject: `Let's Create Something Amazing Together!`,
          message: `Hey ${formData.influencerName}! ✨

Your content always brightens my day! I especially loved your recent post about ${formData.productType.toLowerCase()} - it was so inspiring and authentic.

I'm from ${formData.brandName}, and we're on the hunt for amazing creators like you to join our brand family. We think your audience would absolutely love what we're working on!

${formData.personalNote ? `${formData.personalNote}\n\n` : ''}Are you open to exploring a fun collaboration? I promise it'll be worth your time! 😊

Cheers,
The ${formData.brandName} Squad`,
          style: 'Friendly & Engaging'
        },
        {
          subject: `Exclusive Partnership Invitation`,
          message: `Hello ${formData.influencerName},

I hope this message finds you well. I'm writing to you today because your influence in the ${formData.productType.toLowerCase()} space aligns perfectly with ${formData.brandName}'s mission and values.

We've been impressed by your engagement rates and the authentic connection you maintain with your followers. This is exactly what we're looking for in a brand partnership.

${formData.personalNote ? `${formData.personalNote}\n\n` : ''}I would appreciate the opportunity to discuss how we can work together to create meaningful content that benefits both your audience and our brand objectives.

Looking forward to your response.

Sincerely,
${formData.brandName} Partnership Team`,
          style: 'Formal & Strategic'
        }
      ]
      
      setMessages(templates)
      setSelectedMessage(0)
      setLoading(false)
    }, 2000)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="modern-card p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Message Generator</h2>
            <p className="text-slate-600">Create personalized outreach messages with AI</p>
          </div>
        </div>
        <button onClick={onClose} className="btn-ghost p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Influencer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.influencerName}
                  onChange={(e) => handleInputChange('influencerName', e.target.value)}
                  placeholder="e.g., Sarah Johnson"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Brand Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange('brandName', e.target.value)}
                  placeholder="e.g., EcoBeauty Co."
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product/Service Type</label>
            <input
              type="text"
              value={formData.productType}
              onChange={(e) => handleInputChange('productType', e.target.value)}
              placeholder="e.g., Sustainable skincare products"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((tone) => (
                <label key={tone.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="tone"
                    value={tone.value}
                    checked={formData.tone === tone.value}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-3 rounded-lg border-2 transition-all ${
                    formData.tone === tone.value 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="font-medium text-sm">{tone.label}</div>
                    <div className="text-xs text-slate-600">{tone.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Goal</label>
            <select 
              value={formData.campaignGoal} 
              onChange={(e) => handleInputChange('campaignGoal', e.target.value)}
              className="input-field"
            >
              {goals.map((goal) => (
                <option key={goal.value} value={goal.value}>{goal.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Personal Note (Optional)</label>
            <textarea
              value={formData.personalNote}
              onChange={(e) => handleInputChange('personalNote', e.target.value)}
              placeholder="Add a personal touch or specific details..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateMessages}
            disabled={loading || !formData.influencerName || !formData.brandName || !formData.productType}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Messages</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Generated Messages */}
        <div className="space-y-6">
          {messages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Message Selector */}
              <div className="flex space-x-2">
                {messages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMessage(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedMessage === index
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Version {index + 1}
                  </button>
                ))}
              </div>

              {/* Selected Message */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{messages[selectedMessage].subject}</h3>
                      <p className="text-sm text-slate-600">{messages[selectedMessage].style}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(messages[selectedMessage].message)}
                        className="btn-ghost p-2"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={generateMessages}
                        className="btn-ghost p-2"
                        title="Regenerate"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                    {messages[selectedMessage].message}
                  </pre>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                  <button className="btn-primary flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>

              {/* AI Tips */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span>AI Tips for Better Response Rates</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">• Personalize the subject line with their name or recent content</p>
                  <p className="text-slate-700">• Mention specific posts or achievements to show genuine interest</p>
                  <p className="text-slate-700">• Keep the initial message concise and focused</p>
                  <p className="text-slate-700">• Include clear next steps and make it easy to respond</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
              <p className="text-slate-600">Fill in the details to create personalized outreach messages</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MessageGenerator