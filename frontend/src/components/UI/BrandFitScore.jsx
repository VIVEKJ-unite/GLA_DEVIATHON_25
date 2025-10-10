import React from 'react'
import { Target, TrendingUp } from 'lucide-react'

const BrandFitScore = ({ influencer, brandName }) => {
  const { brand_fit_score, name, niche } = influencer
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Great Match'
    if (score >= 70) return 'Good Match'
    return 'Fair Match'
  }

  return (
    <div className="modern-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-slate-900">Brand Fit Analysis</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(brand_fit_score)}`}>
          {brand_fit_score}%
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Match Quality:</span>
          <span className="font-medium text-slate-900">{getScoreLabel(brand_fit_score)}</span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              brand_fit_score >= 90 ? 'bg-green-500' :
              brand_fit_score >= 80 ? 'bg-blue-500' :
              brand_fit_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${brand_fit_score}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-slate-600 mt-3">
          <span className="font-medium">{name}'s</span> {niche.toLowerCase()} content = 
          <span className="font-bold text-purple-600"> {brand_fit_score}% match</span> for your {brandName} brand
        </p>
      </div>
    </div>
  )
}

export default BrandFitScore