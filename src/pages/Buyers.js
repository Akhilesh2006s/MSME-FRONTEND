import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MessageCircle, 
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Send
} from 'lucide-react';

const Buyers = () => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [showAddBuyer, setShowAddBuyer] = useState(false);

  const buyers = [
    {
      id: 1,
      name: 'Global Textiles Inc.',
      company: 'Global Textiles Inc.',
      country: 'USA',
      city: 'New York',
      rating: 4.8,
      status: 'verified',
      products: ['Textiles', 'Apparel'],
      lastContact: '2025-01-15',
      totalOrders: 12,
      totalValue: '₹2.4M',
      responseTime: '2 hours',
      preferredPayment: 'LC',
      contact: {
        email: 'contact@globaltextiles.com',
        phone: '+1-555-0123',
        website: 'www.globaltextiles.com'
      }
    },
    {
      id: 2,
      name: 'European Pharma Ltd.',
      company: 'European Pharma Ltd.',
      country: 'Germany',
      city: 'Hamburg',
      rating: 4.6,
      status: 'verified',
      products: ['Pharmaceuticals', 'Healthcare'],
      lastContact: '2025-01-12',
      totalOrders: 8,
      totalValue: '₹1.8M',
      responseTime: '4 hours',
      preferredPayment: 'TT',
      contact: {
        email: 'procurement@eupharma.de',
        phone: '+49-40-123456',
        website: 'www.eupharma.de'
      }
    },
    {
      id: 3,
      name: 'UK Handicrafts Co.',
      company: 'UK Handicrafts Co.',
      country: 'UK',
      city: 'London',
      rating: 4.4,
      status: 'pending',
      products: ['Handicrafts', 'Art'],
      lastContact: '2025-01-10',
      totalOrders: 5,
      totalValue: '₹950K',
      responseTime: '1 day',
      preferredPayment: 'LC',
      contact: {
        email: 'buying@ukhandicrafts.co.uk',
        phone: '+44-20-123456',
        website: 'www.ukhandicrafts.co.uk'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-export-success bg-opacity-10 text-export-success';
      case 'pending':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      case 'blocked':
        return 'bg-export-error bg-opacity-10 text-export-error';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-export-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-export-warning" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-export-error" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const BuyerDetails = ({ buyer }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-export-dark">Buyer Details</h3>
            <button
              onClick={() => setSelectedBuyer(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-export-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {buyer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-export-dark">{buyer.name}</h4>
                <p className="text-gray-600">{buyer.company}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-export-accent fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{buyer.rating}/5</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="text-export-dark">{buyer.city}, {buyer.country}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="flex items-center">
                  {getStatusIcon(buyer.status)}
                  <span className="ml-1 text-sm capitalize">{buyer.status}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Products of Interest</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {buyer.products.map((product, index) => (
                  <span key={index} className="px-2 py-1 bg-export-primary bg-opacity-10 text-export-primary text-sm rounded">
                    {product}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Total Orders</label>
                <p className="text-export-dark">{buyer.totalOrders}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Total Value</label>
                <p className="text-export-dark">{buyer.totalValue}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Response Time</label>
                <p className="text-export-dark">{buyer.responseTime}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Preferred Payment</label>
                <p className="text-export-dark">{buyer.preferredPayment}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Contact Information</label>
              <div className="space-y-2 mt-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">{buyer.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">{buyer.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">{buyer.contact.website}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <button className="flex-1 bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors">
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Send Message
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-export-dark">Buyers</h1>
          <p className="text-gray-600 mt-2">Connect with verified international buyers and grow your export business.</p>
        </div>
        <button
          onClick={() => setShowAddBuyer(true)}
          className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Buyer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buyers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary">
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="UK">UK</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary">
              <option value="">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Buyer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-export-primary mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">24</p>
              <p className="text-sm text-gray-600">Total Buyers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-export-success mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">18</p>
              <p className="text-sm text-gray-600">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-export-warning mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">6</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-export-accent mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">4.6</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buyers List */}
      <div className="space-y-4">
        {buyers.map((buyer) => (
          <div key={buyer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-export-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {buyer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-export-dark">{buyer.name}</h3>
                  <p className="text-sm text-gray-600">{buyer.company} • {buyer.city}, {buyer.country}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-export-accent fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{buyer.rating}/5</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(buyer.status)}`}>
                      {getStatusIcon(buyer.status)}
                      <span className="ml-1 capitalize">{buyer.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedBuyer(buyer)}
                className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-2 rounded"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Products</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {buyer.products.map((product, index) => (
                    <span key={index} className="px-2 py-1 bg-export-primary bg-opacity-10 text-export-primary text-xs rounded">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="font-medium text-export-dark">{buyer.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="font-medium text-export-dark">{buyer.totalValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="font-medium text-export-dark">{buyer.responseTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Last contact: {buyer.lastContact}</span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Buyer Matching */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">AI Buyer Matching</h3>
        <div className="bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-export-primary rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-export-dark mb-2">Smart Buyer Recommendations</h4>
              <p className="text-sm text-gray-600 mb-3">
                Our AI analyzes your products and finds the best matching buyers based on their 
                purchase history, preferences, and market demand. Get 3x more qualified leads.
              </p>
              <button className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm">
                Find Matching Buyers
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedBuyer && <BuyerDetails buyer={selectedBuyer} />}
    </div>
  );
};

export default Buyers;
