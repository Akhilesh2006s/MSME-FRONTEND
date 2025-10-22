import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  CheckCircle,
  Info,
  Download
} from 'lucide-react';

const MarketIntelligence = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const products = [
    'Textiles & Apparel',
    'Pharmaceuticals',
    'Agricultural Products',
    'Electronics',
    'Handicrafts',
    'Food Products',
    'Chemicals',
    'Machinery'
  ];

  const countries = [
    'USA', 'Germany', 'UK', 'Japan', 'Australia', 'Canada', 'France', 'Italy'
  ];

  const marketInsights = [
    {
      country: 'USA',
      product: 'Textiles & Apparel',
      demand: 'High',
      competition: 'Medium',
      avgPrice: '$12.50',
      growth: '+15%',
      opportunities: ['Sustainable fashion', 'Ethnic wear', 'Technical textiles'],
      risks: ['Trade tensions', 'Currency fluctuations'],
      tariff: '8.5%'
    },
    {
      country: 'Germany',
      product: 'Pharmaceuticals',
      demand: 'Very High',
      competition: 'High',
      avgPrice: '€45.20',
      growth: '+22%',
      opportunities: ['Generic medicines', 'Ayurvedic products', 'Medical devices'],
      risks: ['Strict regulations', 'Quality standards'],
      tariff: '4.2%'
    },
    {
      country: 'UK',
      product: 'Agricultural Products',
      demand: 'Medium',
      competition: 'Low',
      avgPrice: '£8.75',
      growth: '+8%',
      opportunities: ['Organic products', 'Spices', 'Processed foods'],
      risks: ['Brexit impact', 'Seasonal demand'],
      tariff: '6.8%'
    }
  ];

  const aiInsights = [
    {
      title: 'Market Opportunity Alert',
      description: 'Germany shows 22% growth in pharmaceutical imports. Your Ayurvedic products have high potential.',
      type: 'opportunity',
      confidence: 85
    },
    {
      title: 'Competition Analysis',
      description: 'USA textile market has 3 major competitors. Focus on sustainable fashion niche.',
      type: 'analysis',
      confidence: 78
    },
    {
      title: 'Price Optimization',
      description: 'Current pricing 15% below market average. Consider 8-12% price increase.',
      type: 'optimization',
      confidence: 92
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return <CheckCircle className="h-5 w-5 text-export-success" />;
      case 'analysis':
        return <Info className="h-5 w-5 text-export-primary" />;
      case 'optimization':
        return <TrendingUp className="h-5 w-5 text-export-accent" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High':
        return 'text-export-success bg-export-success bg-opacity-10';
      case 'High':
        return 'text-export-success bg-export-success bg-opacity-10';
      case 'Medium':
        return 'text-export-warning bg-export-warning bg-opacity-10';
      case 'Low':
        return 'text-export-error bg-export-error bg-opacity-10';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-export-dark">Market Intelligence</h1>
        <p className="text-gray-600 mt-2">AI-powered insights to identify the best export opportunities for your business.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors flex items-center justify-center">
              <Search className="h-4 w-4 mr-2" />
              Analyze Market
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-export-dark">AI-Powered Insights</h3>
          <span className="text-sm text-gray-500">Updated 2 hours ago</span>
        </div>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-export-dark">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">Confidence: {insight.confidence}%</span>
                  <div className="ml-2 w-20 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-export-primary h-1 rounded-full" 
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {marketInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-export-dark">{insight.country}</h3>
                <p className="text-sm text-gray-600">{insight.product}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(insight.demand)}`}>
                  {insight.demand} Demand
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="font-semibold text-export-dark">{insight.avgPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="font-semibold text-export-success">{insight.growth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Competition</p>
                <p className="font-semibold text-export-dark">{insight.competition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Import Tariff</p>
                <p className="font-semibold text-export-dark">{insight.tariff}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-export-dark mb-2">Opportunities</h4>
                <div className="flex flex-wrap gap-1">
                  {insight.opportunities.map((opp, idx) => (
                    <span key={idx} className="px-2 py-1 bg-export-success bg-opacity-10 text-export-success text-xs rounded">
                      {opp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-export-dark mb-2">Risks</h4>
                <div className="flex flex-wrap gap-1">
                  {insight.risks.map((risk, idx) => (
                    <span key={idx} className="px-2 py-1 bg-export-error bg-opacity-10 text-export-error text-xs rounded">
                      {risk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Recommended Export Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-export-success bg-opacity-5 border border-export-success border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Primary Markets</h4>
            <p className="text-sm text-gray-600">Focus on Germany and USA for pharmaceutical exports</p>
          </div>
          <div className="p-4 bg-export-accent bg-opacity-5 border border-export-accent border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Pricing Strategy</h4>
            <p className="text-sm text-gray-600">Increase prices by 8-12% to match market standards</p>
          </div>
          <div className="p-4 bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Market Entry</h4>
            <p className="text-sm text-gray-600">Start with sustainable fashion niche in USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
