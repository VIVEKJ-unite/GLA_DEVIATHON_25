import React from 'react'
import { motion } from 'framer-motion'
import { useCampaign } from '../../contexts/CampaignContext'
import { 
  Send,
  Clock,
  CheckCircle2,
  MessageCircle,
  User,
  Copy
} from 'lucide-react'

const MessageCard = ({ message, delay = 0 }) => {
  const { sendMessage } = useCampaign()

  const {
    id,
    influencer_name,
    message: messageContent,
    status,
    sent_at,
    open_rate
  } = message

  const getStatusIcon = () => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'replied':
        return <MessageCircle className="w-4 h-4 text-blue-400" />
      case 'draft':
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'sent':
        return 'badge-success'
      case 'replied':
        return 'badge-info'
      case 'draft':
      default:
        return 'badge-warning'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'sent':
        return 'Sent'
      case 'replied':
        return 'Replied'
      case 'draft':
      default:
        return 'Draft'
    }
  }

  const handleSend = () => {
    sendMessage(id)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(messageContent)
    // You could add a toast notification here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full">
            <User className="w-5 h-5 text-white/70" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{influencer_name}</h3>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`badge ${getStatusColor()} flex items-center space-x-1`}>
                {getStatusIcon()}
                <span>{getStatusText()}</span>
              </div>
              {sent_at && (
                <span className="text-white/60">
                  {new Date(sent_at).toLocaleDateString()}
                </span>
              )}
              {open_rate && (
                <span className="text-white/60">
                  {Math.round(open_rate * 100)}% open rate
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {status === 'draft' && (
            <button
              onClick={handleSend}
              className="btn-primary flex items-center space-x-2 text-sm py-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="btn-ghost p-2"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Content */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <p className="text-white/80 whitespace-pre-wrap text-sm leading-relaxed">
          {messageContent}
        </p>
      </div>

      {/* Performance Metrics */}
      {status !== 'draft' && (
        <div className="flex items-center space-x-4 text-sm text-white/60 border-t border-white/10 pt-4">
          {open_rate && (
            <div className="flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{Math.round(open_rate * 100)}% opened</span>
            </div>
          )}
          {status === 'replied' && (
            <div className="flex items-center space-x-1 text-green-400">
              <MessageCircle className="w-4 h-4" />
              <span>Positive response</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default MessageCard