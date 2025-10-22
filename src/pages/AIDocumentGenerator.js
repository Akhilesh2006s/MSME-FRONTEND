import React, { useState } from 'react';
import api from '../services/api';
import PDFViewer from '../components/PDFViewer';

const AIDocumentGenerator = () => {
  const [formData, setFormData] = useState({
    documentType: 'invoice',
    productDescription: '',
    buyerInfo: {
      companyName: '',
      country: '',
      email: '',
      address: ''
    },
    shipmentDetails: {
      origin: '',
      destination: '',
      quantity: '',
      value: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const documentTypes = [
    { value: 'invoice', label: 'Smart Invoice' },
    { value: 'certificate', label: 'Certificate of Origin' },
    { value: 'packing-list', label: 'Packing List' },
    { value: 'commercial-invoice', label: 'Commercial Invoice' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Immediately show the formatted document
    setResult({
      success: true,
      documentType: formData.documentType,
      content: 'Document generated successfully',
      sections: ['Document Content'],
      recommendations: ['Review and customize'],
      timestamp: new Date().toISOString()
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🤖 AI Document Generator
          </h1>
          <p className="text-xl text-blue-200">
            Generate professional export documents with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Document Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Document Type */}
              <div>
                <label className="block text-white font-medium mb-2">Document Type</label>
                <select
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value} className="bg-gray-800">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-white font-medium mb-2">Product Description</label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Describe your product in detail..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                />
              </div>

              {/* Buyer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Buyer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.buyerInfo.companyName}
                    onChange={(e) => handleInputChange('buyerInfo.companyName', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.buyerInfo.country}
                    onChange={(e) => handleInputChange('buyerInfo.country', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.buyerInfo.email}
                    onChange={(e) => handleInputChange('buyerInfo.email', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.buyerInfo.address}
                    onChange={(e) => handleInputChange('buyerInfo.address', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Shipment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Shipment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Origin"
                    value={formData.shipmentDetails.origin}
                    onChange={(e) => handleInputChange('shipmentDetails.origin', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={formData.shipmentDetails.destination}
                    onChange={(e) => handleInputChange('shipmentDetails.destination', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={formData.shipmentDetails.quantity}
                    onChange={(e) => handleInputChange('shipmentDetails.quantity', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={formData.shipmentDetails.value}
                    onChange={(e) => handleInputChange('shipmentDetails.value', e.target.value)}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Generating Document...
                  </div>
                ) : (
                  'Generate AI Document'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Generated Document</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Generated Document</h3>
                  <div className="bg-white rounded-lg p-8 text-gray-800 font-sans text-sm max-h-96 overflow-y-auto border shadow-lg">
                    <div className="document-content">
                      <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">ANDHRAEXPORT</h1>
                        <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-4"></div>
                        <h2 className="text-lg font-semibold text-gray-700">
                          {formData.documentType === 'invoice' ? 'SMART INVOICE' :
                           formData.documentType === 'certificate' ? 'CERTIFICATE OF ORIGIN' :
                           formData.documentType === 'packing-list' ? 'PACKING LIST' :
                           formData.documentType === 'commercial-invoice' ? 'COMMERCIAL INVOICE' :
                           'AI GENERATED DOCUMENT'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">Invoice No: INV-AP-{Date.now()}</p>
                        <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">SELLER:</h3>
                            <p className="text-sm">AndhraExport MSME</p>
                            <p className="text-sm">Andhra Pradesh, India</p>
                            <p className="text-sm">Email: support@andhraexport.com</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">BUYER:</h3>
                            <p className="text-sm">{formData.buyerInfo.companyName || 'Company Name'}</p>
                            <p className="text-sm">{formData.buyerInfo.country || 'Country'}</p>
                            <p className="text-sm">{formData.buyerInfo.email || 'Email'}</p>
                            <p className="text-sm">{formData.buyerInfo.address || 'Address'}</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-gray-900 mb-2">PRODUCT DETAILS:</h3>
                          <p className="text-sm mb-2"><strong>Description:</strong> {formData.productDescription || 'Product description'}</p>
                          <p className="text-sm mb-2"><strong>Origin:</strong> {formData.shipmentDetails.origin || 'Origin'}</p>
                          <p className="text-sm mb-2"><strong>Destination:</strong> {formData.shipmentDetails.destination || 'Destination'}</p>
                          <p className="text-sm mb-2"><strong>Quantity:</strong> {formData.shipmentDetails.quantity || 'Quantity'}</p>
                          <p className="text-sm mb-2"><strong>Value:</strong> ${formData.shipmentDetails.value || 'Value'}</p>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-gray-900 mb-2">TERMS:</h3>
                          <p className="text-sm">Payment: 30 days from invoice date</p>
                          <p className="text-sm">Currency: USD</p>
                          <p className="text-sm">Shipping: FOB {formData.shipmentDetails.origin || 'Origin'}</p>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-gray-900 mb-2">BANK DETAILS:</h3>
                          <p className="text-sm">Account Name: AndhraExport MSME</p>
                          <p className="text-sm">Bank: State Bank of India</p>
                          <p className="text-sm">Account No: 1234567890</p>
                          <p className="text-sm">IFSC: SBIN0001234</p>
                        </div>
                        
                        <div className="border-t pt-4 text-center">
                          <p className="text-xs text-gray-500">This document is generated by AndhraExport AI Platform</p>
                          <p className="text-xs text-gray-500">Generated: {new Date().toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        setError('');
                        const documentData = {
                          documentType: formData.documentType,
                          content: result.content || result.data?.content || 'Document content generated',
                          sections: result.sections || result.data?.sections || ['Document Content'],
                          recommendations: result.recommendations || result.data?.recommendations || ['Review and customize'],
                          timestamp: new Date().toISOString(),
                          productDescription: formData.productDescription,
                          buyerInfo: formData.buyerInfo,
                          shipmentDetails: formData.shipmentDetails
                        };
                        
                        const blob = await api.downloadDocumentPDF(formData.documentType, documentData);
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
                    {loading ? 'Generating PDF...' : 'View PDF Document'}
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
                <div className="text-6xl mb-4">📄</div>
                <p>Fill in the form and generate your AI-powered document</p>
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

export default AIDocumentGenerator;
