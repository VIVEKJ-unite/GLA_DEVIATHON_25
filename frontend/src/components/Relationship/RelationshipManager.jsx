import React, { useState } from 'react'
import { MessageSquare, Calendar, Star, Mail, Instagram } from 'lucide-react'

const RelationshipManager = ({ influencer }) => {
  const [activeTab, setActiveTab] = useState('conversations')
  const [newNote, setNewNote] = useState('')

  const conversations = [
    {
      id: 1,
      date: '2024-01-15',
      status: 'replied',
      message: 'Initial collaboration proposal sent',
      response: 'Interested! Would love to discuss rates.'
    },
    {
      id: 2,
      date: '2024-01-18',
      status: 'pending',
      message: 'Rate discussion and deliverables'
    }
  ]

  const partnershipHistory = [
    { date: '2023-12-01', campaign: 'Holiday Collection', status: 'completed', performance: '8.5% engagement' }
  ]

  const tabs = [
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: Star }
  ]

  return (
    <div className="modern-card p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Relationship Manager</h3>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60"
            alt={influencer?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">{influencer?.name}</h4>
            <p className="text-sm text-slate-600">@{influencer?.handle} • {influencer?.followers} followers</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-lg hover:bg-slate-50">
              <Mail className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-2 bg-white rounded-lg hover:bg-slate-50">
              <Instagram className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'conversations' && (
          <div className="space-y-4">
            {conversations.map((conv) => (
              <div key={conv.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900">
                    {new Date(conv.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    conv.status === 'replied' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {conv.status}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{conv.message}</p>
                {conv.response && (
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{conv.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {partnershipHistory.map((partnership, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{partnership.campaign}</h4>
                  <span className="text-sm text-slate-600">{new Date(partnership.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                    {partnership.status}
                  </span>
                  <span className="text-sm text-purple-600 font-medium">{partnership.performance}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add notes about this influencer..."
                className="input-field min-h-[100px]"
              />
              <button 
                onClick={() => setNewNote('')}
                className="btn-primary mt-2 text-sm"
              >
                Save Note
              </button>
            </div>
            
            <div className="border-t border-slate-200 pt-4">
              <h4 className="font-medium text-slate-900 mb-3">Previous Notes</h4>
              <div className="bg-slate-50 p-3 rounded">
                <p className="text-sm text-slate-700">Great engagement rates, responds quickly to emails</p>
                <span className="text-xs text-slate-500">Jan 10, 2024</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RelationshipManager