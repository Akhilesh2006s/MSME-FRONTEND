import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  FileText, 
  Users, 
  Target, 
  Zap, 
  Globe, 
  Shield,
  Award,
  BarChart3,
  PieChart,
  Activity,
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
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import apiService from '../services/api';

const AIPoweredDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState(null);
  const [marketIntelligence, setMarketIntelligence] = useState(null);
  const [buyerMatches, setBuyerMatches] = useState([]);
  const [documentSuggestions, setDocumentSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch AI insights on component mount
  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      // Fetch AI-powered insights
      const [marketData, buyerData, documentData] = await Promise.all([
        apiService.request('/ai-market-intelligence/andhra-pradesh-insights'),
        apiService.request('/ai-buyer-matching/market-opportunities'),
        apiService.request('/ai-document-generation/auto-fill', {
          method: 'POST',
          body: JSON.stringify({
            documentType: 'invoice',
            productDescription: 'Cotton textile products',
            buyerInfo: { country: 'USA' },
            shipmentDetails: { origin: 'Mumbai', destination: 'New York' }
          })
        })
      ]);

      setMarketIntelligence(marketData.data);
      setBuyerMatches(buyerData.data.opportunities);
      setDocumentSuggestions(documentData.data);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
      // Fallback to mock data
      setMarketIntelligence({
        exportPerformance: {
          totalExports: '₹2,500 Cr',
          growthRate: '15%',
          topProducts: ['Textiles', 'Pharmaceuticals', 'Electronics']
        },
        governmentSchemes: [
          {
            scheme: 'AP Export Promotion Scheme',
            benefit: '5% export incentive',
            eligibility: 'All MSMEs'
          }
        ]
      });
    }
    setLoading(false);
  };

  const handleAIAction = async (action, data) => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case 'generateInvoice':
          response = await apiService.request('/ai-document-generation/smart-invoice', {
            method: 'POST',
            body: JSON.stringify(data)
          });
          break;
        case 'matchBuyers':
          response = await apiService.request('/ai-buyer-matching/match-buyers', {
            method: 'POST',
            body: JSON.stringify(data)
          });
          break;
        case 'analyzeMarket':
          response = await apiService.request('/ai-market-intelligence/tariffs', {
            method: 'GET'
          });
          break;
        default:
          throw new Error('Unknown AI action');
      }
      
      // Handle response
      console.log('AI Action Result:', response);
    } catch (error) {
      console.error('AI action failed:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">AI is analyzing your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AI-Powered Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI-Powered Export Dashboard</h1>
                <p className="text-purple-100">Intelligent insights for Andhra Pradesh MSMEs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">AI Active</span>
              </div>
              <button 
                onClick={fetchAIInsights}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh AI</span>
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
              { id: 'overview', name: 'AI Overview', icon: Brain },
              { id: 'market-intelligence', name: 'Market Intelligence', icon: Globe },
              { id: 'document-ai', name: 'Document AI', icon: FileText },
              { id: 'buyer-matching', name: 'Buyer Matching', icon: Users },
              { id: 'andhra-pradesh', name: 'Andhra Pradesh', icon: MapPin }
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
            {/* AI Insights Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Market Insights</p>
                    <p className="text-3xl font-bold text-gray-900">15</p>
                    <p className="text-sm text-green-600">+3 new this week</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Buyer Matches</p>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                    <p className="text-sm text-blue-600">95% match score</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Document Automation</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-green-600">Auto-generated</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Market Opportunity</p>
                      <p className="text-sm text-gray-600">USA market shows 15% growth potential for your products</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Buyer Match</p>
                      <p className="text-sm text-gray-600">3 high-potential buyers identified in Germany</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Document Optimization</p>
                      <p className="text-sm text-gray-600">Auto-fill can save 2 hours per document</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Compliance Alert</p>
                      <p className="text-sm text-gray-600">New labeling requirements effective June 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-intelligence' && (
          <div className="space-y-8">
            {/* Market Intelligence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tariff Updates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">USA Textiles</span>
                    <span className="text-sm font-medium text-green-600">-3.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Germany Electronics</span>
                    <span className="text-sm font-medium text-red-600">+2.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">UK Pharmaceuticals</span>
                    <span className="text-sm font-medium text-green-600">-1.8%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Prices</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your Price</span>
                    <span className="text-sm font-medium text-blue-600">₹850</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Average</span>
                    <span className="text-sm font-medium text-gray-600">₹820</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Premium Position</span>
                    <span className="text-sm font-medium text-green-600">+3.7%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Changes</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">New Labeling Requirements</p>
                    <p className="text-xs text-yellow-600">Effective: June 2025</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Safety Standards Updated</p>
                    <p className="text-xs text-green-600">Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Analysis Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Performance Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { month: 'Jan', exports: 15, revenue: 300000 },
                    { month: 'Feb', exports: 18, revenue: 360000 },
                    { month: 'Mar', exports: 22, revenue: 440000 },
                    { month: 'Apr', exports: 19, revenue: 380000 },
                    { month: 'May', exports: 25, revenue: 500000 },
                    { month: 'Jun', exports: 28, revenue: 560000 }
                  ]}>
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
        )}

        {activeTab === 'document-ai' && (
          <div className="space-y-8">
            {/* Document AI Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">Smart Invoice</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">AI-powered invoice generation with auto-fill capabilities</p>
                <button 
                  onClick={() => handleAIAction('generateInvoice', { productDescription: 'Cotton textiles' })}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Smart Invoice
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">Smart Packing List</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Intelligent packing list with optimization suggestions</p>
                <button 
                  onClick={() => handleAIAction('generatePackingList', { productDescription: 'Cotton textiles' })}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Packing List
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">Smart Certificate</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Automated certificate of origin with compliance checking</p>
                <button 
                  onClick={() => handleAIAction('generateCertificate', { productDescription: 'Cotton textiles' })}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Generate Certificate
                </button>
              </div>
            </div>

            {/* Auto-fill Suggestions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Auto-fill Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Product Name</span>
                      <span className="text-sm font-medium text-gray-900">Cotton Textile Products</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">HSN Code</span>
                      <span className="text-sm font-medium text-gray-900">5208.32.00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Quality</span>
                      <span className="text-sm font-medium text-gray-900">Premium</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Buyer Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Company</span>
                      <span className="text-sm font-medium text-gray-900">Global Textile Importers</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Country</span>
                      <span className="text-sm font-medium text-gray-900">USA</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Payment Terms</span>
                      <span className="text-sm font-medium text-gray-900">Letter of Credit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buyer-matching' && (
          <div className="space-y-8">
            {/* Buyer Matching Results */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Buyer Matches</h3>
              <div className="space-y-4">
                {[
                  {
                    company: 'Global Textile Importers Ltd.',
                    country: 'USA',
                    matchScore: 95,
                    profile: 'Large textile importer with $50M annual volume',
                    requirements: 'Premium cotton textiles, OEKO-TEX certified',
                    contact: 'John Smith - john@globaltextile.com'
                  },
                  {
                    company: 'European Fashion House',
                    country: 'Germany',
                    matchScore: 88,
                    profile: 'Fashion retailer focusing on sustainable products',
                    requirements: 'GOTS certified textiles, sustainable practices',
                    contact: 'Maria Schmidt - maria@europeanfashion.de'
                  },
                  {
                    company: 'UK Textile Distributors',
                    country: 'UK',
                    matchScore: 82,
                    profile: 'Large distributor with established network',
                    requirements: 'Standard cotton textiles, competitive pricing',
                    contact: 'David Wilson - david@uktextile.co.uk'
                  }
                ].map((buyer, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{buyer.company}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{buyer.country}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {buyer.matchScore}% match
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{buyer.profile}</p>
                    <p className="text-sm text-gray-600 mb-2">Requirements: {buyer.requirements}</p>
                    <p className="text-sm text-gray-600">Contact: {buyer.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Opportunities</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">North America</span>
                    <span className="text-sm font-medium text-green-600">$500K potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Europe</span>
                    <span className="text-sm font-medium text-blue-600">$400K potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Asia Pacific</span>
                    <span className="text-sm font-medium text-purple-600">$600K potential</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Classification</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">High Priority</span>
                    <span className="text-sm font-medium text-red-600">5 leads</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Medium Priority</span>
                    <span className="text-sm font-medium text-yellow-600">8 leads</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Low Priority</span>
                    <span className="text-sm font-medium text-gray-600">3 leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'andhra-pradesh' && (
          <div className="space-y-8">
            {/* Andhra Pradesh Specific Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AP Export Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Exports</span>
                    <span className="text-sm font-medium text-gray-900">₹2,500 Cr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="text-sm font-medium text-green-600">+15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Top Products</span>
                    <span className="text-sm font-medium text-gray-900">Textiles, Pharma, Electronics</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Government Schemes</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">AP Export Promotion Scheme</p>
                    <p className="text-xs text-green-600">5% export incentive</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Textile Export Subsidy</p>
                    <p className="text-xs text-blue-600">₹2 per meter exported</p>
                  </div>
                </div>
              </div>
            </div>

            {/* District-wise Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">District-wise Export Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-2">Visakhapatnam</h4>
                  <p className="text-sm text-gray-600">35 buyers</p>
                  <p className="text-sm text-gray-600">Pharma, Electronics</p>
                  <p className="text-sm text-green-600">+22% growth</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-2">Tirupur</h4>
                  <p className="text-sm text-gray-600">40 buyers</p>
                  <p className="text-sm text-gray-600">Textiles, Garments</p>
                  <p className="text-sm text-green-600">+12% growth</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-2">Vijayawada</h4>
                  <p className="text-sm text-gray-600">25 buyers</p>
                  <p className="text-sm text-gray-600">Food, Agriculture</p>
                  <p className="text-sm text-green-600">+16% growth</p>
                </div>
              </div>
            </div>

            {/* Cluster Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Clusters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Visakhapatnam Pharma Cluster</h4>
                  <p className="text-sm text-gray-600">45 companies</p>
                  <p className="text-sm text-gray-600">₹400 Cr export value</p>
                  <p className="text-sm text-gray-600">Generic drugs, API manufacturing</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tirupur Textile Cluster</h4>
                  <p className="text-sm text-gray-600">120 companies</p>
                  <p className="text-sm text-gray-600">₹600 Cr export value</p>
                  <p className="text-sm text-gray-600">Cotton textiles, Garments</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPoweredDashboard;

