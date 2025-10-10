import React, { useState } from 'react'
import { RefreshCw, Clock, MessageCircle, Settings } from 'lucide-react'

const AutoFollowUp = ({ messageId, influencerName, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(true)
  const [followUpSettings, setFollowUpSettings] = useState({
    firstFollowUp: 3,
    secondFollowUp: 7,
    maxFollowUps: 2
  })

  const handleToggle = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    if (onToggle) onToggle(newState)
  }

  const followUpSchedule = [
    { day: followUpSettings.firstFollowUp, message: 'Gentle reminder about collaboration opportunity' },
    { day: followUpSettings.secondFollowUp, message: 'Final follow-up with additional incentives' }
  ]

  return (
    <div className="modern-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-900">Auto Follow-ups</span>
        </div>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-purple-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Active for {influencerName}</span>
            </div>
            <p className="text-xs text-blue-700">
              Automatic reminders will be sent if no response is received
            </p>
          </div>

          <div className="space-y-2">
            {followUpSchedule.map((followUp, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
                <Clock className="w-4 h-4 text-slate-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Day {followUp.day}</p>
                  <p className="text-xs text-slate-600">{followUp.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-600">Max follow-ups: {followUpSettings.maxFollowUps}</span>
            <button className="text-xs text-purple-600 hover:text-purple-700 flex items-center space-x-1">
              <Settings className="w-3 h-3" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      )}

      {!isEnabled && (
        <div className="text-center py-4">
          <p className="text-sm text-slate-500">Auto follow-ups disabled</p>
          <p className="text-xs text-slate-400">Manual follow-up required</p>
        </div>
      )}
    </div>
  )
}

export default AutoFollowUp