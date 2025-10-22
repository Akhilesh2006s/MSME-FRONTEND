import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import PDFViewer from '../components/PDFViewer';

const AIMarketIntelligence = () => {
  const [formData, setFormData] = useState({
    analysisType: 'tariff',
    product: '',
    country: '',
    industry: '',
    district: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [detectingIndustry, setDetectingIndustry] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const analysisTypes = [
    { value: 'tariff', label: 'Tariff Analysis', description: 'Analyze tariff rates and changes' },
    { value: 'competitor', label: 'Competitor Pricing', description: 'Analyze competitor pricing strategies' },
    { value: 'regulatory', label: 'Regulatory Changes', description: 'Track regulatory changes and compliance' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh Market', description: 'Analyze AP market opportunities' }
  ];

  // Debounced industry detection function
  const detectIndustryDebounced = useCallback(
    (() => {
      let timeoutId;
      return (productDescription) => {
        clearTimeout(timeoutId);
        if (productDescription.trim().length < 3) return;
        
        timeoutId = setTimeout(async () => {
          try {
            setDetectingIndustry(true);
            const response = await api.detectIndustry(productDescription);
            if (response.success && response.data.primaryIndustry) {
              setFormData(prev => ({
                ...prev,
                industry: response.data.primaryIndustry
              }));
            }
          } catch (error) {
            console.error('Industry detection error:', error);
            // Silently fail - don't show error to user for auto-fill
          } finally {
            setDetectingIndustry(false);
          }
        }, 1000); // 1 second delay
      };
    })(),
    []
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-detect industry when product changes
    if (field === 'product' && value.trim().length >= 3) {
      detectIndustryDebounced(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let response;
      switch (formData.analysisType) {
        case 'tariff':
          response = await api.getAITariffs(formData.country, formData.product);
          break;
        case 'competitor':
          response = await api.getAICompetitorPrices(formData.product, formData.country);
          break;
        case 'regulatory':
          response = await api.getAIRegulatoryChanges(formData.country, formData.industry);
          break;
        case 'andhra-pradesh':
          response = await api.getAIAndhraPradeshInsights(formData.industry, formData.district);
          break;
        default:
          throw new Error('Invalid analysis type');
      }

      if (response.success) {
        console.log('API Response:', response.data);
        console.log('recentChanges type:', typeof response.data.recentChanges);
        console.log('recentChanges value:', response.data.recentChanges);
        console.log('recentChanges isArray:', Array.isArray(response.data.recentChanges));
        
        // Force data structure validation
        if (response.data.recentChanges && !Array.isArray(response.data.recentChanges)) {
          console.warn('recentChanges is not an array, converting...');
          response.data.recentChanges = [response.data.recentChanges];
        }
        
        setResult(response.data);
      } else {
        setError('Failed to generate analysis. Please try again.');
      }
    } catch (err) {
      console.error('Market intelligence error:', err);
      setError('Failed to generate analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = (data) => {
    if (!data) return null;
    
    // Debug logging
    console.log('renderAnalysisResult data:', data);
    console.log('recentChanges:', data.recentChanges);
    console.log('recentChanges type:', typeof data.recentChanges);
    console.log('recentChanges isArray:', Array.isArray(data.recentChanges));

    switch (formData.analysisType) {
      case 'tariff':
        return (
          <div className="space-y-4">
            {data.currentTariff && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">Current Tariff</h4>
                <p className="text-blue-100">Rate: {data.currentTariff.rate}</p>
                <p className="text-blue-100">Description: {data.currentTariff.description}</p>
              </div>
            )}
            {data.recentChanges && data.recentChanges.length > 0 && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-200 mb-2">Recent Changes</h4>
                {data.recentChanges.map((change, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-green-100">{change.change}</p>
                    <p className="text-sm text-green-200">Date: {change.date}</p>
                  </div>
                ))}
              </div>
            )}
            {data.recommendations && (
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">Recommendations</h4>
                <ul className="list-disc list-inside text-purple-100">
                  {data.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'competitor':
        return (
          <div className="space-y-4">
            {data.averagePrice && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">Market Pricing</h4>
                <p className="text-blue-100">Average Price: {data.averagePrice}</p>
                {data.priceRange && (
                  <p className="text-blue-100">Range: {data.priceRange.min} - {data.priceRange.max}</p>
                )}
              </div>
            )}
            {data.competitors && data.competitors.length > 0 && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-200 mb-2">Key Competitors</h4>
                {data.competitors.map((competitor, index) => (
                  <div key={index} className="mb-2 p-2 bg-green-500/10 rounded">
                    <p className="text-green-100 font-semibold">{competitor.name}</p>
                    <p className="text-green-200">Price: {competitor.price}</p>
                    <p className="text-green-200">Market Share: {competitor.marketShare}</p>
                  </div>
                ))}
              </div>
            )}
            {data.pricingStrategy && (
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">Pricing Strategy</h4>
                <p className="text-purple-100">Recommended: {data.pricingStrategy.recommended}</p>
                <p className="text-purple-100">Reasoning: {data.pricingStrategy.reasoning}</p>
              </div>
            )}
          </div>
        );

      case 'regulatory':
        return (
          <div className="space-y-4">
            {(() => {
              const recentChanges = data.recentChanges;
              if (!recentChanges) return null;
              
              // Handle both array and string cases
              const changesArray = Array.isArray(recentChanges) ? recentChanges : 
                (typeof recentChanges === 'string' ? [recentChanges] : []);
              
              if (changesArray.length === 0) return null;
              
              return (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-red-200 mb-2">Recent Regulatory Changes</h4>
                  {changesArray.map((change, index) => (
                    <div key={index} className="mb-2">
                      {typeof change === 'object' ? (
                        <>
                          <p className="text-red-100 font-semibold">{change.regulation}</p>
                          <p className="text-red-200">Effective: {change.effectiveDate}</p>
                          <p className="text-red-200">Impact: {change.impact}</p>
                        </>
                      ) : (
                        <p className="text-red-100">{change}</p>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
            {data.complianceRequirements && Array.isArray(data.complianceRequirements) && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-yellow-200 mb-2">Compliance Requirements</h4>
                <ul className="list-disc list-inside text-yellow-100">
                  {data.complianceRequirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.actionItems && Array.isArray(data.actionItems) && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">Action Items</h4>
                <ul className="list-disc list-inside text-blue-100">
                  {data.actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'andhra-pradesh':
        return (
          <div className="space-y-4">
            {data.exportPerformance && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-200 mb-2">Export Performance</h4>
                <p className="text-green-100">Total Exports: {data.exportPerformance.totalExports}</p>
                <p className="text-green-100">Growth Rate: {data.exportPerformance.growthRate}</p>
                <p className="text-green-100">Top Products: {data.exportPerformance.topProducts?.join(', ')}</p>
              </div>
            )}
            {data.governmentSchemes && Array.isArray(data.governmentSchemes) && data.governmentSchemes.length > 0 && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">Government Schemes</h4>
                {data.governmentSchemes.map((scheme, index) => (
                  <div key={index} className="mb-2 p-2 bg-blue-500/10 rounded">
                    <p className="text-blue-100 font-semibold">{scheme.scheme}</p>
                    <p className="text-blue-200">Benefit: {scheme.benefit}</p>
                    <p className="text-blue-200">Eligibility: {scheme.eligibility}</p>
                  </div>
                ))}
              </div>
            )}
            {data.clusterInfo && Array.isArray(data.clusterInfo) && data.clusterInfo.length > 0 && (
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">Cluster Information</h4>
                {data.clusterInfo.map((cluster, index) => (
                  <div key={index} className="mb-2 p-2 bg-purple-500/10 rounded">
                    <p className="text-purple-100 font-semibold">{cluster.cluster}</p>
                    <p className="text-purple-200">Companies: {cluster.companies}</p>
                    <p className="text-purple-200">Export Value: {cluster.exportValue}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-gray-500/20 border border-gray-500/50 rounded-lg p-4">
            <pre className="text-gray-100 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧠 AI Market Intelligence
          </h1>
          <p className="text-xl text-green-200">
            Get AI-powered market insights and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Analysis Configuration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Analysis Type */}
              <div>
                <label className="block text-white font-medium mb-2">Analysis Type</label>
                <select
                  value={formData.analysisType}
                  onChange={(e) => handleInputChange('analysisType', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {analysisTypes.map(type => (
                    <option key={type.value} value={type.value} className="bg-gray-800">
                      {type.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-green-200 mt-1">
                  {analysisTypes.find(t => t.value === formData.analysisType)?.description}
                </p>
              </div>

              {/* Product */}
              <div>
                <label className="block text-white font-medium mb-2">Product/Service</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  placeholder="e.g., Cotton textiles, Electronics, Pharmaceuticals"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-white font-medium mb-2">Target Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="e.g., USA, Germany, UK, UAE"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required={formData.analysisType !== 'andhra-pradesh'}
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Industry
                  {detectingIndustry && (
                    <span className="ml-2 text-sm text-green-300">
                      🔍 Detecting industry...
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Textiles, Electronics, Pharmaceuticals, Food Processing"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required={formData.analysisType === 'regulatory' || formData.analysisType === 'andhra-pradesh'}
                />
                {formData.product && formData.industry && (
                  <p className="text-sm text-green-200 mt-1">
                    ✨ Industry auto-detected from product description
                  </p>
                )}
              </div>

              {/* District (for AP analysis) */}
              {formData.analysisType === 'andhra-pradesh' && (
                <div>
                  <label className="block text-white font-medium mb-2">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="e.g., Visakhapatnam, Tirupur, Vijayawada"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Analyzing Market...
                  </div>
                ) : (
                  'Generate AI Analysis'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Analysis Results</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {renderAnalysisResult(result)}
                
                <div className="flex space-x-4">
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        setError('');
                        let blob;
                        
                        switch (formData.analysisType) {
                          case 'tariff':
                            blob = await api.downloadTariffPDF(formData.country, formData.product);
                            break;
                          case 'competitor':
                            blob = await api.downloadCompetitorPDF(formData.product, formData.country);
                            break;
                          case 'andhra-pradesh':
                            blob = await api.downloadAPMarketPDF(formData.industry, formData.district);
                            break;
                          default:
                            // For regulatory changes, create a generic PDF
                            const regulatoryData = {
                              documentType: 'regulatory-analysis',
                              content: result.regulatoryChanges ? result.regulatoryChanges.join('\n') : 'Regulatory analysis report',
                              sections: ['Regulatory Changes', 'Compliance Requirements'],
                              recommendations: result.recommendations || ['Stay updated with regulatory changes'],
                              timestamp: new Date().toISOString()
                            };
                            blob = await api.downloadDocumentPDF('regulatory-analysis', regulatoryData);
                        }
                        
                        const url = URL.createObjectURL(blob);
                        setPdfUrl(url);
                        setShowPdfViewer(true);
                      } catch (error) {
                        console.error('PDF generation error:', error);
                        setError('Failed to generate PDF. Please try again.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {loading ? 'Generating PDF...' : 'View PDF Report'}
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
                <div className="text-6xl mb-4">📊</div>
                <p>Configure your analysis and get AI-powered market insights</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <PDFViewer
          pdfUrl={pdfUrl}
          onClose={() => {
            setShowPdfViewer(false);
            if (pdfUrl) {
              URL.revokeObjectURL(pdfUrl);
              setPdfUrl(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default AIMarketIntelligence;
