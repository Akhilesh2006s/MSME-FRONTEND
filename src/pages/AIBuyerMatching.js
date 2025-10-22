import React, { useState } from 'react';
import api from '../services/api';

const AIBuyerMatching = () => {
  const [formData, setFormData] = useState({
    productDescription: '',
    targetMarkets: [],
    businessType: 'manufacturer',
    companySize: 'small',
    certification: '',
    priceRange: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [newMarket, setNewMarket] = useState('');

  const businessTypes = [
    { value: 'manufacturer', label: 'Manufacturer' },
    { value: 'trader', label: 'Trader' },
    { value: 'service-provider', label: 'Service Provider' },
    { value: 'agriculture', label: 'Agriculture' }
  ];

  const companySizes = [
    { value: 'micro', label: 'Micro (1-10 employees)' },
    { value: 'small', label: 'Small (11-50 employees)' },
    { value: 'medium', label: 'Medium (51-250 employees)' },
    { value: 'large', label: 'Large (250+ employees)' }
  ];

  const popularMarkets = [
    'USA', 'Germany', 'UK', 'UAE', 'Japan', 'Australia', 'Canada', 'France',
    'Netherlands', 'Italy', 'Spain', 'Brazil', 'Mexico', 'South Africa', 'Singapore'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMarket = () => {
    if (newMarket.trim() && !formData.targetMarkets.includes(newMarket.trim())) {
      setFormData(prev => ({
        ...prev,
        targetMarkets: [...prev.targetMarkets, newMarket.trim()]
      }));
      setNewMarket('');
    }
  };

  const removeMarket = (market) => {
    setFormData(prev => ({
      ...prev,
      targetMarkets: prev.targetMarkets.filter(m => m !== market)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.matchBuyers({
        productDescription: formData.productDescription,
        targetMarkets: formData.targetMarkets,
        businessType: formData.businessType,
        companySize: formData.companySize,
        certification: formData.certification,
        priceRange: formData.priceRange,
        quantity: formData.quantity
      });

      if (response.success) {
        setResult(response.data);
      } else {
        setError('Failed to find buyers. Please try again.');
      }
    } catch (err) {
      console.error('Buyer matching error:', err);
      setError('Failed to find buyers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderBuyerResults = (data) => {
    if (!data || !data.matchedBuyers) return null;

    return (
      <div className="space-y-4">
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-blue-200 mb-2">Matching Summary</h4>
          <p className="text-blue-100">Total Matches: {data.totalMatches || data.matchedBuyers.length}</p>
          <p className="text-blue-100">Average Match Score: {data.averageMatchScore || 'N/A'}</p>
        </div>

        {data.matchedBuyers.map((buyer, index) => (
          <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className="text-lg font-semibold text-white">{buyer.companyName}</h5>
                <p className="text-gray-300">{buyer.country}</p>
              </div>
              <div className="text-right">
                <div className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {buyer.matchScore}% Match
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold text-white">Profile:</span> {buyer.profile}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Requirements:</span> {buyer.requirements}
              </p>
              {buyer.contact && (
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Contact:</span> {buyer.contact}
                </p>
              )}
              {buyer.annualVolume && (
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Annual Volume:</span> {buyer.annualVolume}
                </p>
              )}
              {buyer.paymentTerms && (
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Payment Terms:</span> {buyer.paymentTerms}
                </p>
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Contact Buyer
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Save Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🤝 AI Buyer Matching
          </h1>
          <p className="text-xl text-orange-200">
            Find the perfect buyers for your products with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Buyer Matching Criteria</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Description */}
              <div>
                <label className="block text-white font-medium mb-2">Product Description</label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Describe your product in detail, including specifications, quality standards, and unique features..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                  required
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-white font-medium mb-2">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value} className="bg-gray-800">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-white font-medium mb-2">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {companySizes.map(size => (
                    <option key={size.value} value={size.value} className="bg-gray-800">
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Markets */}
              <div>
                <label className="block text-white font-medium mb-2">Target Markets</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    placeholder="Add target market..."
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={addMarket}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {/* Popular Markets */}
                <div className="mb-2">
                  <p className="text-sm text-orange-200 mb-2">Popular Markets:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularMarkets.map(market => (
                      <button
                        key={market}
                        type="button"
                        onClick={() => {
                          if (!formData.targetMarkets.includes(market)) {
                            setFormData(prev => ({
                              ...prev,
                              targetMarkets: [...prev.targetMarkets, market]
                            }));
                          }
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        + {market}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Markets */}
                {formData.targetMarkets.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.targetMarkets.map(market => (
                      <span
                        key={market}
                        className="bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {market}
                        <button
                          type="button"
                          onClick={() => removeMarket(market)}
                          className="ml-2 text-orange-300 hover:text-orange-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Certification</label>
                  <input
                    type="text"
                    value={formData.certification}
                    onChange={(e) => handleInputChange('certification', e.target.value)}
                    placeholder="e.g., ISO 9001, CE, FDA"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Price Range</label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    placeholder="e.g., $10-50 per unit"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Quantity</label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="e.g., 1000 units per month"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || formData.targetMarkets.length === 0}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Finding Buyers...
                  </div>
                ) : (
                  'Find AI-Matched Buyers'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Matched Buyers</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {renderBuyerResults(result)}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `buyer-matches-${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Download Results
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {!result && !error && (
              <div className="text-center text-gray-400 py-12">
                <div className="text-6xl mb-4">🤝</div>
                <p>Configure your criteria and find perfect buyers with AI</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBuyerMatching;
