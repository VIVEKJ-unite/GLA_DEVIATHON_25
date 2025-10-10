import React from 'react'

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full animate-spin`}></div>
      {text && <span className="ml-2 text-white/70">{text}</span>}
    </div>
  )
}

export default LoadingSpinner