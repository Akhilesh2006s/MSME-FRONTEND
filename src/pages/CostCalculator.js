import React, { useState } from 'react';
import { 
  Calculator, 
  Truck, 
  Shield,
  FileText,
  Download,
  Save
} from 'lucide-react';

const CostCalculator = () => {
  const [formData, setFormData] = useState({
    productValue: '',
    quantity: '',
    weight: '',
    destination: '',
    incoterm: 'FOB',
    productCategory: '',
    insuranceRequired: true,
    specialHandling: false
  });

  const [calculations, setCalculations] = useState(null);

  const incoterms = [
    { value: 'FOB', label: 'FOB (Free on Board)', description: 'Seller delivers goods to carrier' },
    { value: 'CIF', label: 'CIF (Cost, Insurance, Freight)', description: 'Seller pays for transport and insurance' },
    { value: 'EXW', label: 'EXW (Ex Works)', description: 'Buyer collects from seller\'s premises' },
    { value: 'DDP', label: 'DDP (Delivered Duty Paid)', description: 'Seller delivers to buyer\'s door' }
  ];

  const productCategories = [
    'Textiles & Apparel',
    'Pharmaceuticals',
    'Agricultural Products',
    'Electronics',
    'Handicrafts',
    'Food Products',
    'Chemicals',
    'Machinery'
  ];

  const destinations = [
    'USA', 'Germany', 'UK', 'Japan', 'Australia', 'Canada', 'France', 'Italy'
  ];

  const calculateCosts = () => {
    const productValue = parseFloat(formData.productValue) || 0;
    const weight = parseFloat(formData.weight) || 0;

    // Base calculations
    const freightRate = getFreightRate(formData.destination, formData.productCategory);
    const insuranceRate = 0.002; // 0.2% of product value
    const customsDuty = getCustomsDuty(formData.destination, formData.productCategory);
    const portCharges = getPortCharges(weight);
    const documentationFees = 5000; // Fixed documentation fees
    const handlingCharges = weight * 50; // ₹50 per kg

    // Calculate components
    const freightCost = weight * freightRate;
    const insuranceCost = productValue * insuranceRate;
    const dutyAmount = productValue * customsDuty;
    const totalLogistics = freightCost + portCharges + handlingCharges;
    const totalCompliance = dutyAmount + documentationFees;
    const totalCost = productValue + freightCost + insuranceCost + dutyAmount + portCharges + handlingCharges + documentationFees;

    // Profitability analysis
    const suggestedPrice = totalCost * 1.15; // 15% margin
    const profitMargin = ((suggestedPrice - totalCost) / suggestedPrice) * 100;

    setCalculations({
      productValue,
      freightCost,
      insuranceCost,
      dutyAmount,
      portCharges,
      handlingCharges,
      documentationFees,
      totalLogistics,
      totalCompliance,
      totalCost,
      suggestedPrice,
      profitMargin,
      breakdown: {
        'Product Value': productValue,
        'Freight Cost': freightCost,
        'Insurance': insuranceCost,
        'Customs Duty': dutyAmount,
        'Port Charges': portCharges,
        'Handling': handlingCharges,
        'Documentation': documentationFees
      }
    });
  };

  const getFreightRate = (destination, category) => {
    const baseRates = {
      'USA': 120,
      'Germany': 95,
      'UK': 110,
      'Japan': 85,
      'Australia': 105,
      'Canada': 115,
      'France': 90,
      'Italy': 88
    };
    return baseRates[destination] || 100;
  };

  const getCustomsDuty = (destination, category) => {
    const dutyRates = {
      'USA': 0.08,
      'Germany': 0.12,
      'UK': 0.10,
      'Japan': 0.15,
      'Australia': 0.05,
      'Canada': 0.09,
      'France': 0.11,
      'Italy': 0.13
    };
    return dutyRates[destination] || 0.10;
  };

  const getPortCharges = (weight) => {
    return weight * 25; // ₹25 per kg
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportQuote = () => {
    if (calculations) {
      const quote = {
        date: new Date().toISOString(),
        product: formData.productCategory,
        destination: formData.destination,
        incoterm: formData.incoterm,
        totalCost: calculations.totalCost,
        suggestedPrice: calculations.suggestedPrice,
        margin: calculations.profitMargin
      };
      console.log('Export Quote:', quote);
      // Here you would typically save to database or generate PDF
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-export-dark">Export Cost Calculator</h1>
        <p className="text-gray-600 mt-2">Calculate total export costs and generate competitive quotations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Export Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Value (₹)</label>
                <input
                  type="number"
                  value={formData.productValue}
                  onChange={(e) => handleInputChange('productValue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                  placeholder="Enter product value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <select
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
                >
                  <option value="">Select Destination</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
              <select
                value={formData.productCategory}
                onChange={(e) => handleInputChange('productCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              >
                <option value="">Select Category</option>
                {productCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incoterm</label>
              <select
                value={formData.incoterm}
                onChange={(e) => handleInputChange('incoterm', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              >
                {incoterms.map((incoterm) => (
                  <option key={incoterm.value} value={incoterm.value}>{incoterm.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {incoterms.find(i => i.value === formData.incoterm)?.description}
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.insuranceRequired}
                  onChange={(e) => handleInputChange('insuranceRequired', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Insurance Required</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.specialHandling}
                  onChange={(e) => handleInputChange('specialHandling', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Special Handling Required</span>
              </label>
            </div>

            <button
              onClick={calculateCosts}
              className="w-full bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Costs
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-export-dark mb-4">Cost Breakdown</h3>
          
          {calculations ? (
            <div className="space-y-4">
              {/* Total Cost Summary */}
              <div className="bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-export-dark">Total Export Cost</span>
                  <span className="text-2xl font-bold text-export-primary">₹{calculations.totalCost.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Suggested Price (15% margin)</span>
                  <span className="text-lg font-semibold text-export-success">₹{calculations.suggestedPrice.toLocaleString()}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profit Margin</span>
                  <span className="text-sm font-semibold text-export-success">{calculations.profitMargin.toFixed(1)}%</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2">
                <h4 className="font-medium text-export-dark">Cost Breakdown</h4>
                {Object.entries(calculations.breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">{key}</span>
                    <span className="text-sm font-medium text-export-dark">₹{value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Logistics vs Compliance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-export-accent bg-opacity-5 border border-export-accent border-opacity-20 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Truck className="h-4 w-4 text-export-accent mr-2" />
                    <span className="text-sm font-medium text-export-dark">Logistics</span>
                  </div>
                  <span className="text-lg font-semibold text-export-accent">₹{calculations.totalLogistics.toLocaleString()}</span>
                </div>
                <div className="bg-export-warning bg-opacity-5 border border-export-warning border-opacity-20 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 text-export-warning mr-2" />
                    <span className="text-sm font-medium text-export-dark">Compliance</span>
                  </div>
                  <span className="text-lg font-semibold text-export-warning">₹{calculations.totalCompliance.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={exportQuote}
                  className="flex-1 bg-export-success text-white px-4 py-2 rounded-md hover:bg-export-success hover:bg-opacity-90 transition-colors flex items-center justify-center text-sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Quote
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <Save className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter your export details and click "Calculate Costs" to see the breakdown.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Cost Optimization Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-export-success bg-opacity-5 border border-export-success border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Freight Optimization</h4>
            <p className="text-sm text-gray-600">Consolidate shipments to reduce per-unit freight costs</p>
          </div>
          <div className="p-4 bg-export-accent bg-opacity-5 border border-export-accent border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Duty Benefits</h4>
            <p className="text-sm text-gray-600">Use FTA benefits to reduce customs duties</p>
          </div>
          <div className="p-4 bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg">
            <h4 className="font-medium text-export-dark mb-2">Documentation</h4>
            <p className="text-sm text-gray-600">Digital documentation can reduce processing time by 30%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
