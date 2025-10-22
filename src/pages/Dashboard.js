import React from 'react';
import { 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Package, 
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Calculator,
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const exportData = [
    { month: 'Jan', exports: 12, revenue: 240000 },
    { month: 'Feb', exports: 19, revenue: 380000 },
    { month: 'Mar', exports: 15, revenue: 300000 },
    { month: 'Apr', exports: 22, revenue: 440000 },
    { month: 'May', exports: 18, revenue: 360000 },
    { month: 'Jun', exports: 25, revenue: 500000 },
  ];

  const topCountries = [
    { country: 'USA', exports: 8, revenue: 160000 },
    { country: 'Germany', exports: 6, revenue: 120000 },
    { country: 'UK', exports: 4, revenue: 80000 },
    { country: 'Japan', exports: 3, revenue: 60000 },
  ];

  const recentActivities = [
    { id: 1, type: 'shipment', message: 'Shipment #EXP-2025-001 dispatched to USA', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'document', message: 'Certificate of Origin generated for Germany export', time: '4 hours ago', status: 'success' },
    { id: 3, type: 'buyer', message: 'New buyer inquiry from UK for textile products', time: '6 hours ago', status: 'pending' },
    { id: 4, type: 'compliance', message: 'Compliance check completed for Japan export', time: '1 day ago', status: 'success' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-export-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-export-warning" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-export-error" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-export-dark">Export Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your export performance overview.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exports</p>
              <p className="text-2xl font-bold text-export-dark">24</p>
              <p className="text-sm text-export-success flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-export-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-export-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-export-dark">₹4.8M</p>
              <p className="text-sm text-export-success flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +18% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-export-success bg-opacity-10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-export-success" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Shipments</p>
              <p className="text-2xl font-bold text-export-dark">8</p>
              <p className="text-sm text-export-warning flex items-center mt-1">
                <Clock className="h-4 w-4 mr-1" />
                3 in transit
              </p>
            </div>
            <div className="h-12 w-12 bg-export-warning bg-opacity-10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-export-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Buyer Inquiries</p>
              <p className="text-2xl font-bold text-export-dark">12</p>
              <p className="text-sm text-export-success flex items-center mt-1">
                <Users className="h-4 w-4 mr-1" />
                5 new this week
              </p>
            </div>
            <div className="h-12 w-12 bg-export-accent bg-opacity-10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-export-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Export Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={exportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'exports' ? `${value} shipments` : `₹${value.toLocaleString()}`,
                  name === 'exports' ? 'Exports' : 'Revenue'
                ]}
              />
              <Line type="monotone" dataKey="exports" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Export Countries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Top Export Countries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} shipments`, 'Exports']} />
              <Bar dataKey="exports" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-export-dark">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-export-primary hover:bg-export-primary hover:bg-opacity-5 transition-colors">
            <Calculator className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Calculate Export Cost</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-export-primary hover:bg-export-primary hover:bg-opacity-5 transition-colors">
            <FileText className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Generate Documents</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-export-primary hover:bg-export-primary hover:bg-opacity-5 transition-colors">
            <Globe className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Find New Markets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
