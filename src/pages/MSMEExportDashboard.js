import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  Truck, 
  Globe, 
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Award,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  Ship,
  Plane,
  Train,
  Truck as TruckIcon
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import apiService from '../services/api';
import RealtimeDashboard from '../components/RealtimeDashboard';

const MSMEExportDashboard = () => {
  const [readinessData, setReadinessData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch real data from API
        const [readinessResponse, analyticsResponse, shipmentsResponse, documentsResponse] = await Promise.all([
          apiService.getExportReadiness(),
          apiService.getExportAnalytics(),
          apiService.getShipments(),
          apiService.getDocuments()
        ]);

        setReadinessData(readinessResponse.data);
        setAnalytics(analyticsResponse.data);
        setShipments(shipmentsResponse.data.shipments || []);
        setDocuments(documentsResponse.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Fallback to mock data for demonstration
        setTimeout(() => {
        setReadinessData({
          overallScore: 72,
          readinessLevel: 'almost-ready',
          categoryScores: {
            businessRegistration: { score: 85, weight: 0.15, status: 'complete' },
            exportDocumentation: { score: 70, weight: 0.20, status: 'partial' },
            financialReadiness: { score: 60, weight: 0.15, status: 'partial' },
            productCompliance: { score: 80, weight: 0.20, status: 'complete' },
            marketResearch: { score: 65, weight: 0.15, status: 'partial' },
            logisticsCapability: { score: 75, weight: 0.15, status: 'partial' }
          },
          gaps: [
            {
              id: '1',
              category: 'exportDocumentation',
              title: 'Set Up Export Documentation System',
              description: 'Implement automated document generation and compliance checking',
              priority: 'high',
              estimatedTime: '1-2 weeks',
              isCompleted: false
            },
            {
              id: '2',
              category: 'financialReadiness',
              title: 'Establish Export Financing',
              description: 'Set up export credit facilities and insurance',
              priority: 'medium',
              estimatedTime: '3-6 weeks',
              isCompleted: false
            }
          ],
          recommendations: [
            {
              category: 'marketResearch',
              title: 'Expand Market Research',
              description: 'Conduct deeper research on target markets',
              priority: 'medium',
              estimatedImpact: 'high'
            }
          ]
        });

        setAnalytics({
          totalExports: 24,
          totalRevenue: 4800000,
          activeShipments: 8,
          buyerInquiries: 12,
          exportTrends: [
            { month: 'Jul', exports: 15, revenue: 300000 },
            { month: 'Aug', exports: 18, revenue: 360000 },
            { month: 'Sep', exports: 22, revenue: 440000 },
            { month: 'Oct', exports: 19, revenue: 380000 },
            { month: 'Nov', exports: 25, revenue: 500000 },
            { month: 'Dec', exports: 28, revenue: 560000 }
          ],
          topCountries: [
            { country: 'USA', exports: 12, revenue: 240000, percentage: 50 },
            { country: 'Germany', exports: 8, revenue: 160000, percentage: 33 },
            { country: 'UK', exports: 4, revenue: 80000, percentage: 17 }
          ],
          leadSources: [
            { source: 'Direct Inquiries', count: 45, percentage: 40 },
            { source: 'Trade Shows', count: 30, percentage: 27 },
            { source: 'Online Platform', count: 25, percentage: 22 },
            { source: 'Referrals', count: 12, percentage: 11 }
          ]
        });

        setShipments([
          {
            id: 'EXP-2024-001',
            destination: 'New York, USA',
            status: 'in_transit',
            progress: 75,
            carrier: 'Maersk',
            trackingNumber: 'MAE123456789',
            estimatedArrival: '2024-01-25',
            currentLocation: 'Atlantic Ocean',
            items: ['Textile Products', 'Handicrafts'],
            weight: '2.5 tons',
            value: '₹450,000'
          },
          {
            id: 'EXP-2024-002',
            destination: 'Hamburg, Germany',
            status: 'customs_clearance',
            progress: 60,
            carrier: 'Hapag-Lloyd',
            trackingNumber: 'HL987654321',
            estimatedArrival: '2024-01-28',
            currentLocation: 'Hamburg Port',
            items: ['Electronics', 'Components'],
            weight: '1.8 tons',
            value: '₹320,000'
          }
        ]);

        setDocuments([
          {
            id: 1,
            type: 'commercial_invoice',
            title: 'Commercial Invoice - EXP-2024-001',
            status: 'approved',
            createdDate: '2024-01-15',
            files: ['commercial-invoice-001.pdf']
          },
          {
            id: 2,
            type: 'packing_list',
            title: 'Packing List - EXP-2024-001',
            status: 'pending_approval',
            createdDate: '2024-01-15',
            files: ['packing-list-001.pdf']
          }
        ]);

        setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  // Set up real-time updates
  useEffect(() => {
    const handleShipmentUpdate = (data) => {
      setShipments(prev => prev.map(shipment => 
        shipment.id === data.shipmentId 
          ? { ...shipment, ...data.updates }
          : shipment
      ));
    };

    const handleDocumentUpdate = (data) => {
      setDocuments(prev => [...prev, data.document]);
    };

    apiService.on('shipmentUpdate', handleShipmentUpdate);
    apiService.on('documentReady', handleDocumentUpdate);

    return () => {
      apiService.off('shipmentUpdate', handleShipmentUpdate);
      apiService.off('documentReady', handleDocumentUpdate);
    };
  }, []);

  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getReadinessLevel = (score) => {
    if (score >= 80) return 'Export Ready';
    if (score >= 60) return 'Almost Ready';
    if (score >= 40) return 'Needs Improvement';
    return 'Not Ready';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'incomplete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading MSME Export Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <RealtimeDashboard>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MSME Export Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive export readiness and analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'readiness', name: 'Export Readiness', icon: Target },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp },
              { id: 'shipments', name: 'Shipments', icon: Truck },
              { id: 'documents', name: 'Documents', icon: FileText },
              { id: 'collaboration', name: 'Collaboration', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Export Readiness Score</p>
                    <p className={`text-3xl font-bold ${getReadinessColor(readinessData.overallScore)}`}>
                      {readinessData.overallScore}%
                    </p>
                    <p className="text-sm text-gray-500">{getReadinessLevel(readinessData.overallScore)}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Exports</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalExports}</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">₹{analytics.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+18% from last month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.activeShipments}</p>
                    <p className="text-sm text-blue-600">3 in transit</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Truck className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Export Readiness Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Readiness Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(readinessData.categoryScores).map(([category, data]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          data.status === 'complete' ? 'bg-green-500' :
                          data.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${getReadinessColor(data.score)}`}>
                          {data.score}%
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.exportTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="exports" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Gaps</h3>
                <div className="space-y-3">
                  {readinessData.gaps.slice(0, 3).map((gap) => (
                    <div key={gap.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        gap.priority === 'high' ? 'bg-red-500' :
                        gap.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{gap.title}</p>
                        <p className="text-xs text-gray-500">{gap.estimatedTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Export Countries</h3>
                <div className="space-y-3">
                  {analytics.topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">{country.country}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{country.exports} exports</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h3>
                <div className="space-y-3">
                  {shipments.slice(0, 3).map((shipment) => (
                    <div key={shipment.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shipment.id}</p>
                        <p className="text-xs text-gray-500">{shipment.destination}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{shipment.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="space-y-8">
            {/* Readiness Score Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6">
                  <span className="text-4xl font-bold text-white">{readinessData.overallScore}%</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {getReadinessLevel(readinessData.overallScore)}
                </h2>
                <p className="text-gray-600 mb-6">
                  You're making great progress towards export readiness. Focus on the priority gaps below to improve your score.
                </p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Take Assessment
                </button>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(readinessData.categoryScores).map(([category, data]) => (
                <div key={category} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data.status)}`}>
                      {data.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Score</span>
                      <span className={`text-lg font-bold ${getReadinessColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          data.score >= 80 ? 'bg-green-500' :
                          data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Weight: {Math.round(data.weight * 100)}%
                  </div>
                </div>
              ))}
            </div>

            {/* Gaps and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Gaps</h3>
                <div className="space-y-4">
                  {readinessData.gaps.map((gap) => (
                    <div key={gap.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{gap.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{gap.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{gap.estimatedTime}</span>
                        <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {readinessData.recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Impact: {rec.estimatedImpact}</span>
                        <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.exportTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="exports" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.exportTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={analytics.topCountries}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ country, percentage }) => `${country} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="exports"
                      >
                        {analytics.topCountries.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#8B5CF6', '#10B981', '#F59E0B'][index % 3]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Lead Sources */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analytics.leadSources.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][index % 4] }} />
                      <span className="font-medium text-gray-900">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{source.count} leads</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${source.percentage}%`,
                            backgroundColor: ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][index % 4]
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="space-y-8">
            {/* Shipments Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                    <p className="text-2xl font-bold text-gray-900">{shipments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Transit</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Delayed</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipments List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Active Shipments</h3>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Track New Shipment
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{shipment.id}</h4>
                            <p className="text-sm text-gray-600">{shipment.destination}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {shipment.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Carrier</p>
                            <p className="font-medium">{shipment.carrier}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Tracking Number</p>
                            <p className="font-medium">{shipment.trackingNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Estimated Arrival</p>
                            <p className="font-medium">{shipment.estimatedArrival}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{shipment.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${shipment.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-8">
            {/* Document Automation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Automation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                  <div className="flex items-center mb-3">
                    <FileText className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="font-semibold text-gray-900">Pro Forma Invoice</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Generate professional pro forma invoices automatically</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Generate
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                  <div className="flex items-center mb-3">
                    <Package className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="font-semibold text-gray-900">Packing List</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Create detailed packing lists for shipments</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Generate
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                  <div className="flex items-center mb-3">
                    <Award className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="font-semibold text-gray-900">Certificate of Origin</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Generate certificates of origin for exports</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Generate
                  </button>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                          <p className="text-sm text-gray-600">Created: {doc.createdDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collaboration' && (
          <div className="space-y-8">
            {/* Team Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">Export Manager</h4>
                      <p className="text-sm text-gray-600">Manages export operations</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    <span className="text-sm text-gray-600">2 members</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">Document Team</h4>
                      <p className="text-sm text-gray-600">Handles documentation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    <span className="text-sm text-gray-600">3 members</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">Compliance Team</h4>
                      <p className="text-sm text-gray-600">Ensures compliance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                    <span className="text-sm text-gray-600">1 member</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Management */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Workflows</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Document Approval</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Draft Created</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 rounded">
                      <div className="h-1 bg-green-500 rounded" style={{ width: '33%' }} />
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Under Review</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 rounded">
                      <div className="h-1 bg-gray-300 rounded" style={{ width: '0%' }} />
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </RealtimeDashboard>
  );
};

export default MSMEExportDashboard;
