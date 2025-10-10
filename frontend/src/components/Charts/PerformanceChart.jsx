import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export const CampaignPerformanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
        <YAxis stroke="rgba(255,255,255,0.7)" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }} 
        />
        <Bar dataKey="value" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export const EngagementTrendChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
        <YAxis stroke="rgba(255,255,255,0.7)" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }} 
        />
        <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={3} />
        <Line type="monotone" dataKey="responses" stroke="#F59E0B" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const PlatformDistributionChart = ({ data }) => {
  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
  )
}