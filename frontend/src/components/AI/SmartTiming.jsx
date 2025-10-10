import React, { useState, useEffect } from 'react'
import { Clock, Zap, Calendar } from 'lucide-react'

const SmartTiming = ({ influencer, onSchedule }) => {
  const [optimalTimes, setOptimalTimes] = useState([])
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    // Simulate AI analysis of optimal timing
    const generateOptimalTimes = () => {
      const times = [
        { time: '9:00 AM', day: 'Today', probability: 85, reason: 'Peak engagement window' },
        { time: '2:00 PM', day: 'Today', probability: 78, reason: 'Lunch break activity' },
        { time: '7:00 PM', day: 'Today', probability: 92, reason: 'Evening social media peak' },
        { time: '10:00 AM', day: 'Tomorrow', probability: 88, reason: 'Morning routine check' }
      ]
      setOptimalTimes(times)
      setSelectedTime(`${times[0].day} ${times[0].time}`)
    }

    generateOptimalTimes()
  }, [influencer])

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule(selectedTime)
    }
  }

  return (
    <div className="modern-card p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold text-slate-900">Smart Timing</span>
      </div>

      <div className="space-y-3 mb-4">
        {optimalTimes.map((timeSlot, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedTime === `${timeSlot.day} ${timeSlot.time}`
                ? 'border-purple-500 bg-purple-50'
                : 'border-slate-200 hover:border-purple-300'
            }`}
            onClick={() => setSelectedTime(`${timeSlot.day} ${timeSlot.time}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-900">{timeSlot.day} {timeSlot.time}</p>
                  <p className="text-sm text-slate-600">{timeSlot.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  timeSlot.probability >= 85 ? 'bg-green-100 text-green-700' :
                  timeSlot.probability >= 75 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {timeSlot.probability}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSchedule}
        className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Schedule for {selectedTime}</span>
      </button>

      <p className="text-xs text-slate-500 mt-2 text-center">
        AI analyzes {influencer?.name}'s activity patterns for optimal timing
      </p>
    </div>
  )
}

export default SmartTiming