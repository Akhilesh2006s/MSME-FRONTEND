import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Brain,
  Loader2
} from 'lucide-react';
import apiService from '../services/api';

const Documentation = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiInput, setAiInput] = useState({
    productDescription: '',
    destinationCountry: '',
    documentType: 'invoice'
  });

  const documentTypes = [
    {
      id: 'commercial-invoice',
      name: 'Commercial Invoice',
      description: 'Primary document for customs clearance',
      required: true,
      template: 'commercial-invoice-template.pdf'
    },
    {
      id: 'packing-list',
      name: 'Packing List',
      description: 'Detailed list of items in the shipment',
      required: true,
      template: 'packing-list-template.pdf'
    },
    {
      id: 'bill-of-lading',
      name: 'Bill of Lading',
      description: 'Transport document issued by carrier',
      required: true,
      template: 'bol-template.pdf'
    },
    {
      id: 'certificate-origin',
      name: 'Certificate of Origin',
      description: 'Proof of product origin for duty benefits',
      required: false,
      template: 'coo-template.pdf'
    },
    {
      id: 'insurance-certificate',
      name: 'Insurance Certificate',
      description: 'Proof of cargo insurance coverage',
      required: false,
      template: 'insurance-template.pdf'
    },
    {
      id: 'phytosanitary',
      name: 'Phytosanitary Certificate',
      description: 'Required for agricultural products',
      required: false,
      template: 'phytosanitary-template.pdf'
    }
  ];

  const documents = [
    {
      id: 1,
      type: 'Commercial Invoice',
      exportId: 'EXP-2025-001',
      destination: 'USA',
      status: 'completed',
      createdDate: '2025-01-15',
      lastModified: '2025-01-15',
      files: ['commercial-invoice-001.pdf']
    },
    {
      id: 2,
      type: 'Packing List',
      exportId: 'EXP-2025-001',
      destination: 'USA',
      status: 'completed',
      createdDate: '2025-01-15',
      lastModified: '2025-01-15',
      files: ['packing-list-001.pdf']
    },
    {
      id: 3,
      type: 'Certificate of Origin',
      exportId: 'EXP-2025-002',
      destination: 'Germany',
      status: 'pending',
      createdDate: '2025-01-16',
      lastModified: '2025-01-16',
      files: []
    },
    {
      id: 4,
      type: 'Bill of Lading',
      exportId: 'EXP-2025-001',
      destination: 'USA',
      status: 'in-progress',
      createdDate: '2025-01-15',
      lastModified: '2025-01-16',
      files: ['bol-draft-001.pdf']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-export-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-export-warning" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-export-error" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-export-success bg-opacity-10 text-export-success';
      case 'in-progress':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      case 'pending':
        return 'bg-export-error bg-opacity-10 text-export-error';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleAIAssistant = async () => {
    if (!aiInput.productDescription.trim()) {
      alert('Please enter a product description');
      return;
    }

    setAiLoading(true);
    setAiResult(null);

    try {
      let response;
      const requestData = {
        productDescription: aiInput.productDescription,
        buyerInfo: {
          country: aiInput.destinationCountry || 'USA',
          companyName: 'International Buyer'
        },
        shipmentDetails: {
          origin: 'Mumbai, India',
          destination: aiInput.destinationCountry || 'USA'
        }
      };

      switch (aiInput.documentType) {
        case 'invoice':
          response = await apiService.generateSmartInvoice(requestData);
          break;
        case 'packing-list':
          response = await apiService.generateSmartPackingList(requestData);
          break;
        case 'certificate':
          response = await apiService.generateSmartCertificate(requestData);
          break;
        default:
          response = await apiService.autoFillDocument({
            documentType: aiInput.documentType,
            ...requestData
          });
      }

      setAiResult(response.data);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setAiResult({
        error: 'Failed to generate document. Please try again.',
        fallback: true
      });
    } finally {
      setAiLoading(false);
    }
  };

  const CreateDocumentForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Create New Document</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary">
                <option value="">Select Document Type</option>
                {documentTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                placeholder="Enter export ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary">
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors">
              Create Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AIAssistantModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-export-dark flex items-center">
              <Brain className="h-5 w-5 mr-2 text-export-primary" />
              AI Document Assistant
            </h3>
            <button
              onClick={() => setShowAIAssistant(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select 
                value={aiInput.documentType}
                onChange={(e) => setAiInput({...aiInput, documentType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              >
                <option value="invoice">Smart Invoice</option>
                <option value="packing-list">Smart Packing List</option>
                <option value="certificate">Smart Certificate of Origin</option>
                <option value="auto-fill">Auto-fill Document</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
              <textarea
                value={aiInput.productDescription}
                onChange={(e) => setAiInput({...aiInput, productDescription: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                rows="3"
                placeholder="Describe your product (e.g., Cotton textile products, premium quality, 100% cotton, made in India)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
              <select 
                value={aiInput.destinationCountry}
                onChange={(e) => setAiInput({...aiInput, destinationCountry: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            
            <button
              onClick={handleAIAssistant}
              disabled={aiLoading || !aiInput.productDescription.trim()}
              className="w-full bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  AI is generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate with AI
                </>
              )}
            </button>
            
            {aiResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-export-dark mb-2">AI Generated Result:</h4>
                {aiResult.error ? (
                  <div className="text-red-600 text-sm">
                    {aiResult.error}
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(aiResult, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
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
          <h1 className="text-3xl font-bold text-export-dark">Documentation</h1>
          <p className="text-gray-600 mt-2">Manage export documents and track compliance status.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Document
        </button>
      </div>

      {/* Document Types Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Required Export Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((type) => (
            <div key={type.id} className="p-4 border border-gray-200 rounded-lg hover:border-export-primary transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-export-dark">{type.name}</h4>
                {type.required && (
                  <span className="text-xs bg-export-error bg-opacity-10 text-export-error px-2 py-1 rounded">
                    Required
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{type.description}</p>
              <div className="flex space-x-2">
                <button className="text-xs bg-export-primary text-white px-3 py-1 rounded hover:bg-export-primary hover:bg-opacity-90 transition-colors">
                  Use Template
                </button>
                <button className="text-xs border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                  <Download className="h-3 w-3 inline mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-export-success mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">12</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-export-warning mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">5</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-export-error mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">3</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-export-primary mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">20</p>
              <p className="text-sm text-gray-600">Total Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-export-dark">Recent Documents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Export ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-export-dark">{doc.type}</div>
                        <div className="text-sm text-gray-500">{doc.files.length} file(s)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.exportId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.createdDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-export-warning hover:text-export-warning hover:bg-opacity-10 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-export-success hover:text-export-success hover:bg-opacity-10 p-1 rounded">
                        <Send className="h-4 w-4" />
                      </button>
                      <button className="text-export-error hover:text-export-error hover:bg-opacity-10 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Document Assistant */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">AI Document Assistant</h3>
        <div className="bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-export-primary rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-export-dark mb-2">Smart Document Generation</h4>
              <p className="text-sm text-gray-600 mb-3">
                Our AI can auto-fill your export documents based on your product details and destination country. 
                This reduces errors and saves time by up to 70%.
              </p>
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm flex items-center"
              >
                <Brain className="h-4 w-4 mr-2" />
                Try AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCreateForm && <CreateDocumentForm />}
      {showAIAssistant && <AIAssistantModal />}
    </div>
  );
};

export default Documentation;
