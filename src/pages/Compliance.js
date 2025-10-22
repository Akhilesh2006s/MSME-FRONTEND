import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  Download,
  RefreshCw,
  Info,
  XCircle,
  AlertCircle
} from 'lucide-react';

const Compliance = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const countries = ['USA', 'Germany', 'UK', 'Japan', 'Australia', 'Canada', 'France', 'Italy'];
  const products = ['Textiles', 'Pharmaceuticals', 'Agricultural Products', 'Electronics', 'Handicrafts', 'Food Products'];

  const complianceChecks = [
    {
      id: 1,
      country: 'USA',
      product: 'Textiles',
      status: 'compliant',
      requirements: [
        { name: 'Fiber Content Labeling', status: 'required', completed: true },
        { name: 'Care Instructions', status: 'required', completed: true },
        { name: 'Country of Origin', status: 'required', completed: true },
        { name: 'Flammability Standards', status: 'required', completed: true }
      ],
      alerts: [],
      lastChecked: '2024-01-15'
    },
    {
      id: 2,
      country: 'Germany',
      product: 'Pharmaceuticals',
      status: 'warning',
      requirements: [
        { name: 'CE Marking', status: 'required', completed: true },
        { name: 'GMP Certification', status: 'required', completed: true },
        { name: 'Product Registration', status: 'required', completed: false },
        { name: 'Safety Data Sheet', status: 'required', completed: true }
      ],
      alerts: [
        { type: 'warning', message: 'Product registration pending with BfArM' },
        { type: 'info', message: 'New labeling requirements effective March 2024' }
      ],
      lastChecked: '2024-01-14'
    },
    {
      id: 3,
      country: 'UK',
      product: 'Food Products',
      status: 'non-compliant',
      requirements: [
        { name: 'UKCA Marking', status: 'required', completed: false },
        { name: 'Nutritional Labeling', status: 'required', completed: true },
        { name: 'Allergen Declaration', status: 'required', completed: true },
        { name: 'Import License', status: 'required', completed: false }
      ],
      alerts: [
        { type: 'error', message: 'UKCA marking not applied - shipment will be rejected' },
        { type: 'error', message: 'Import license required before shipment' }
      ],
      lastChecked: '2024-01-13'
    }
  ];

  const regulatoryUpdates = [
    {
      id: 1,
      country: 'USA',
      title: 'New Textile Labeling Requirements',
      description: 'Updated fiber content labeling standards effective March 1, 2024',
      impact: 'high',
      effectiveDate: '2024-03-01',
      status: 'active'
    },
    {
      id: 2,
      country: 'Germany',
      title: 'REACH Regulation Updates',
      description: 'New chemical restrictions for consumer products',
      impact: 'medium',
      effectiveDate: '2024-02-15',
      status: 'upcoming'
    },
    {
      id: 3,
      country: 'UK',
      title: 'Post-Brexit Import Procedures',
      description: 'Updated customs procedures for UK imports',
      impact: 'high',
      effectiveDate: '2024-01-20',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-export-success bg-opacity-10 text-export-success';
      case 'warning':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      case 'non-compliant':
        return 'bg-export-error bg-opacity-10 text-export-error';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-export-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-export-warning" />;
      case 'non-compliant':
        return <XCircle className="h-4 w-4 text-export-error" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-export-error" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-export-warning" />;
      case 'info':
        return <Info className="h-4 w-4 text-export-primary" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
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
      <div>
        <h1 className="text-3xl font-bold text-export-dark">Compliance & Standards</h1>
        <p className="text-gray-600 mt-2">Ensure your exports meet international standards and regulatory requirements.</p>
      </div>

      {/* Compliance Checker */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Compliance Checker</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
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
          <div className="flex items-end">
            <button className="w-full bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2" />
              Check Compliance
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-export-success mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">8</p>
              <p className="text-sm text-gray-600">Compliant</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-export-warning mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">3</p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-export-error mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">2</p>
              <p className="text-sm text-gray-600">Non-Compliant</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-export-primary mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">13</p>
              <p className="text-sm text-gray-600">Total Checks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Results */}
      <div className="space-y-4">
        {complianceChecks.map((check) => (
          <div key={check.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {getStatusIcon(check.status)}
                  <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                    {check.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-export-dark">{check.country} - {check.product}</h3>
                  <p className="text-sm text-gray-600">Last checked: {check.lastChecked}</p>
                </div>
              </div>
              <button className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-2 rounded">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-export-dark mb-3">Requirements</h4>
                <div className="space-y-2">
                  {check.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{req.name}</span>
                      <div className="flex items-center">
                        {req.completed ? (
                          <CheckCircle className="h-4 w-4 text-export-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-export-error" />
                        )}
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          req.status === 'required' ? 'bg-export-error bg-opacity-10 text-export-error' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-export-dark mb-3">Alerts & Notifications</h4>
                {check.alerts.length > 0 ? (
                  <div className="space-y-2">
                    {check.alerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        {getAlertIcon(alert.type)}
                        <span className="text-sm text-gray-600">{alert.message}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No alerts</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                <Download className="h-4 w-4 inline mr-1" />
                Export Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory Updates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Regulatory Updates</h3>
        <div className="space-y-4">
          {regulatoryUpdates.map((update) => (
            <div key={update.id} className="p-4 border border-gray-200 rounded-lg hover:border-export-primary transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-export-dark">{update.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                      {update.impact} impact
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      update.status === 'active' ? 'bg-export-success bg-opacity-10 text-export-success' : 'bg-export-warning bg-opacity-10 text-export-warning'
                    }`}>
                      {update.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                  <p className="text-xs text-gray-500">Effective: {update.effectiveDate}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-1 rounded">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-1 rounded">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Compliance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-export-success bg-opacity-5 border border-export-success border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Documentation</h4>
            <p className="text-sm text-gray-600">Keep all certificates and test reports updated and easily accessible</p>
          </div>
          <div className="p-4 bg-export-warning bg-opacity-5 border border-export-warning border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Regular Updates</h4>
            <p className="text-sm text-gray-600">Subscribe to regulatory updates for your target markets</p>
          </div>
          <div className="p-4 bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Testing</h4>
            <p className="text-sm text-gray-600">Conduct pre-shipment testing to avoid compliance issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;


