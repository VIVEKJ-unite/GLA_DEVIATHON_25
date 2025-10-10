import React from 'react'

const StatsCard = ({ title, value, subtitle, icon, trend, className = '' }) => {
  return (
    <div className={`stats-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-white/60 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-white/70 transform hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={`flex items-center text-xs ${
          trend.value > 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          <span>{trend.value > 0 ? '↗' : '↘'}</span>
          <span className="ml-1">
            {Math.abs(trend.value)}% {trend.label}
          </span>
        </div>
      )}
    </div>
  )
}

export default StatsCard