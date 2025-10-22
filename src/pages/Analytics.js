import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Globe, 
  Package,
  Users,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const exportTrends = [
    { month: 'Jul', exports: 15, revenue: 300000, profit: 45000 },
    { month: 'Aug', exports: 18, revenue: 360000, profit: 54000 },
    { month: 'Sep', exports: 22, revenue: 440000, profit: 66000 },
    { month: 'Oct', exports: 19, revenue: 380000, profit: 57000 },
    { month: 'Nov', exports: 25, revenue: 500000, profit: 75000 },
    { month: 'Dec', exports: 28, revenue: 560000, profit: 84000 },
  ];

  const countryPerformance = [
    { country: 'USA', exports: 12, revenue: 240000, growth: 15 },
    { country: 'Germany', exports: 8, revenue: 160000, growth: 22 },
    { country: 'UK', exports: 6, revenue: 120000, growth: 8 },
    { country: 'Japan', exports: 4, revenue: 80000, growth: 18 },
    { country: 'Australia', exports: 3, revenue: 60000, growth: 12 },
  ];

  const productPerformance = [
    { name: 'Textiles', value: 35, revenue: 350000 },
    { name: 'Pharmaceuticals', value: 25, revenue: 250000 },
    { name: 'Handicrafts', value: 20, revenue: 200000 },
    { name: 'Electronics', value: 15, revenue: 150000 },
    { name: 'Food Products', value: 5, revenue: 50000 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '₹1.2M',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-export-success'
    },
    {
      title: 'Export Volume',
      value: '126',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-export-primary'
    },
    {
      title: 'Active Markets',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Globe,
      color: 'text-export-accent'
    },
    {
      title: 'Buyer Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      icon: Users,
      color: 'text-export-success'
    }
  ];

  const topInsights = [
    {
      title: 'Revenue Growth',
      description: 'Your revenue has grown by 18% compared to last quarter',
      type: 'success',
      impact: 'high'
    },
    {
      title: 'Market Opportunity',
      description: 'Germany shows 22% growth potential for pharmaceutical exports',
      type: 'opportunity',
      impact: 'medium'
    },
    {
      title: 'Cost Optimization',
      description: 'Freight costs reduced by 8% through better route planning',
      type: 'optimization',
      impact: 'medium'
    },
    {
      title: 'Compliance Alert',
      description: 'New labeling requirements for USA textile exports',
      type: 'warning',
      impact: 'high'
    }
  ];

  const getInsightColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-export-success bg-opacity-10 text-export-success';
      case 'opportunity':
        return 'bg-export-primary bg-opacity-10 text-export-primary';
      case 'optimization':
        return 'bg-export-accent bg-opacity-10 text-export-accent';
      case 'warning':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-export-error bg-opacity-10 text-export-error';
      case 'medium':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      case 'low':
        return 'bg-export-success bg-opacity-10 text-export-success';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-export-dark">Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your export performance and growth opportunities.</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-export-dark">{kpi.value}</p>
                <p className={`text-sm flex items-center mt-1 ${kpi.color}`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${kpi.color.replace('text-', 'bg-').replace('text-export-', 'bg-export-')} bg-opacity-10`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Export Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={exportTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'exports' ? `${value} shipments` : 
                  name === 'revenue' ? `₹${value.toLocaleString()}` : 
                  `₹${value.toLocaleString()}`,
                  name === 'exports' ? 'Exports' : 
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]}
              />
              <Line type="monotone" dataKey="exports" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Country Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Country Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'exports' ? `${value} shipments` : `₹${value.toLocaleString()}`,
                  name === 'exports' ? 'Exports' : 'Revenue'
                ]}
              />
              <Bar dataKey="exports" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm font-medium text-export-dark">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-export-dark">₹{product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{product.value}% share</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topInsights.map((insight, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-export-primary transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-export-dark">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                  {insight.impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInsightColor(insight.type)}`}>
                  {insight.type}
                </span>
                <button className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-1 rounded text-sm">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Readiness Score */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Export Readiness Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10B981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="50.24"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-export-dark">80%</span>
              </div>
            </div>
            <h4 className="font-medium text-export-dark">Overall Score</h4>
            <p className="text-sm text-gray-600">Excellent export readiness</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Documentation</span>
                <span className="text-sm font-medium text-export-dark">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-success h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Compliance</span>
                <span className="text-sm font-medium text-export-dark">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-warning h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Market Access</span>
                <span className="text-sm font-medium text-export-dark">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-success h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Logistics</span>
                <span className="text-sm font-medium text-export-dark">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-primary h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Financial</span>
                <span className="text-sm font-medium text-export-dark">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-accent h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Technology</span>
                <span className="text-sm font-medium text-export-dark">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-export-success h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
