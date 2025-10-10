import React, { useState } from 'react'
import { Search, Filter, Clock, DollarSign, Users, MapPin, Calendar } from 'lucide-react'

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBudget, setSelectedBudget] = useState('all')

  const campaigns = [
    {
      id: 1,
      title: 'Summer Fashion Collection Launch',
      company: 'StyleCo',
      budget: '$2,000 - $5,000',
      category: 'Fashion',
      deadline: '2024-02-15',
      location: 'Mumbai, India',
      description: 'Looking for fashion influencers to showcase our new summer collection. Must have strong engagement with fashion-forward audience.',
      requirements: ['10K+ followers', 'Fashion niche', 'High engagement rate'],
      applicants: 23,
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Tech Product Review Campaign',
      company: 'TechStart',
      budget: '$1,500 - $3,000',
      category: 'Technology',
      deadline: '2024-02-20',
      location: 'Bangalore, India',
      description: 'Seeking tech reviewers for our new smartphone launch. Looking for authentic reviews and unboxing content.',
      requirements: ['Tech content creator', '5K+ subscribers', 'Video content'],
      applicants: 15,
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Fitness Challenge Partnership',
      company: 'FitLife',
      budget: '$800 - $2,000',
      category: 'Fitness',
      deadline: '2024-02-25',
      location: 'Delhi, India',
      description: 'Partner with us for a 30-day fitness challenge. Create motivational content and track progress.',
      requirements: ['Fitness influencer', 'Active community', 'Story engagement'],
      applicants: 31,
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'Food Delivery App Promotion',
      company: 'QuickEats',
      budget: '$1,000 - $2,500',
      category: 'Food',
      deadline: '2024-02-18',
      location: 'Pune, India',
      description: 'Promote our new food delivery app with authentic food reviews and ordering experiences.',
      requirements: ['Food blogger', 'Local audience', 'Instagram/YouTube'],
      applicants: 18,
      posted: '4 hours ago'
    }
  ]

  const categories = [
    'All Categories', 'Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty'
  ]

  const budgetRanges = [
    'All Budgets', 'Under $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'
  ]

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory
    const matchesBudget = selectedBudget === 'all' || 
                         (selectedBudget === 'Under $1,000' && campaign.budget.includes('$800')) ||
                         (selectedBudget === '$1,000 - $2,500' && (campaign.budget.includes('$1,000') || campaign.budget.includes('$1,500'))) ||
                         (selectedBudget === '$2,500 - $5,000' && campaign.budget.includes('$2,000')) ||
                         (selectedBudget === '$5,000+' && false)
    return matchesSearch && matchesCategory && matchesBudget
  })

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="modern-card p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaign Marketplace</h1>
          <p className="text-slate-600">Discover exciting collaboration opportunities from top brands</p>
        </div>

        {/* Search & Filters */}
        <div className="modern-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All Categories' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div className="lg:w-48">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="input-field"
              >
                {budgetRanges.map(budget => (
                  <option key={budget} value={budget === 'All Budgets' ? 'all' : budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Available Campaigns ({filteredCampaigns.length})
            </h2>
            <div className="flex items-center space-x-2 text-slate-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Sorted by newest</span>
            </div>
          </div>

          <div className="space-y-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">{campaign.title}</h3>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {campaign.category}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">{campaign.company}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="flex items-center space-x-2 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">{campaign.budget}</span>
                    </div>
                    <button className="btn-primary">
                      Apply Now
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 mb-4">{campaign.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{campaign.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{campaign.applicants} applicants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Posted {campaign.posted}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaign.requirements.map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No campaigns found</h3>
              <p className="text-slate-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Marketplace