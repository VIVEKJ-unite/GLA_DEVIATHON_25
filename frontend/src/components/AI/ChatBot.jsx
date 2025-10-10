import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI assistant. How can I help you with influencer marketing today?", sender: 'bot', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = {
    'hello': "Hello! I'm here to help you with influencer marketing. What would you like to know?",
    'help': "I can help you with:\n• Finding the right influencers\n• Campaign strategy\n• Budget planning\n• Performance analysis\n• Fraud detection",
    'influencer': "To find the perfect influencer, consider:\n• Audience alignment\n• Engagement rates (3-6% is good)\n• Content quality\n• Brand fit score\n• Previous collaborations",
    'budget': "Budget recommendations:\n• Micro-influencers: $100-1,000\n• Mid-tier: $1,000-10,000\n• Macro: $10,000+\n• Always negotiate based on deliverables",
    'fraud': "Red flags for fake influencers:\n• Sudden follower spikes\n• Low engagement vs followers\n• Generic comments\n• Suspicious follower patterns\n• Use our fraud detector for analysis!",
    'reach': "Reach calculation factors:\n• Follower count\n• Engagement rate\n• Story views\n• Platform algorithm\n• Content type\n• Use our reach calculator for estimates!"
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response
      }
    }
    return "I understand you're asking about influencer marketing. Could you be more specific? I can help with finding influencers, budgeting, fraud detection, or campaign strategy."
  }

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      const userInput = input
      const userMessage = { id: Date.now(), text: userInput, sender: 'user', timestamp: new Date() }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      setTimeout(() => {
        const botResponse = { 
          id: Date.now() + 1, 
          text: getBotResponse(userInput), 
          sender: 'bot', 
          timestamp: new Date() 
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
      setIsTyping(false)
      const errorMessage = { 
        id: Date.now() + 1, 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot', 
        timestamp: new Date() 
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-purple-600" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-0.5" />}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot