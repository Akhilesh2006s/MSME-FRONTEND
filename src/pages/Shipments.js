import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package,
  Search,
  Filter,
  Eye,
  Download
} from 'lucide-react';

const Shipments = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);

  const shipments = [
    {
      id: 'EXP-2024-001',
      destination: 'New York, USA',
      status: 'in-transit',
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
      status: 'delivered',
      progress: 100,
      carrier: 'Hapag-Lloyd',
      trackingNumber: 'HL987654321',
      estimatedArrival: '2024-01-20',
      currentLocation: 'Delivered',
      items: ['Pharmaceuticals', 'Electronics'],
      weight: '1.8 tons',
      value: '₹320,000'
    },
    {
      id: 'EXP-2024-003',
      destination: 'London, UK',
      status: 'preparing',
      progress: 25,
      carrier: 'FedEx',
      trackingNumber: 'FX456789123',
      estimatedArrival: '2024-01-28',
      currentLocation: 'Chennai Port',
      items: ['Agricultural Products'],
      weight: '3.2 tons',
      value: '₹280,000'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-export-success bg-opacity-10 text-export-success';
      case 'in-transit':
        return 'bg-export-warning bg-opacity-10 text-export-warning';
      case 'preparing':
        return 'bg-export-primary bg-opacity-10 text-export-primary';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-export-success" />;
      case 'in-transit':
        return <Truck className="h-4 w-4 text-export-warning" />;
      case 'preparing':
        return <Package className="h-4 w-4 text-export-primary" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const ShipmentDetails = ({ shipment }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-export-dark">Shipment Details</h3>
            <button
              onClick={() => setSelectedShipment(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Shipment ID</label>
                <p className="text-export-dark">{shipment.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Tracking Number</label>
                <p className="text-export-dark">{shipment.trackingNumber}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Destination</label>
                <p className="text-export-dark">{shipment.destination}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Carrier</label>
                <p className="text-export-dark">{shipment.carrier}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Weight</label>
                <p className="text-export-dark">{shipment.weight}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Value</label>
                <p className="text-export-dark">{shipment.value}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Items</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {shipment.items.map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Current Location</label>
              <p className="text-export-dark">{shipment.currentLocation}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Estimated Arrival</label>
              <p className="text-export-dark">{shipment.estimatedArrival}</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <button className="flex-1 bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors">
              Track Shipment
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-export-dark">Shipments</h1>
        <p className="text-gray-600 mt-2">Track your export shipments and monitor delivery status.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shipments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-export-primary">
              <option value="">All Status</option>
              <option value="preparing">Preparing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Shipment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-export-primary mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">8</p>
              <p className="text-sm text-gray-600">Total Shipments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-export-warning mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">3</p>
              <p className="text-sm text-gray-600">In Transit</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-export-success mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">5</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-export-accent mr-3" />
            <div>
              <p className="text-2xl font-bold text-export-dark">2</p>
              <p className="text-sm text-gray-600">Preparing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {getStatusIcon(shipment.status)}
                  <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-export-dark">{shipment.id}</h3>
                  <p className="text-sm text-gray-600">{shipment.destination}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedShipment(shipment)}
                className="text-export-primary hover:text-export-primary hover:bg-opacity-10 p-2 rounded"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Carrier</p>
                <p className="font-medium text-export-dark">{shipment.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tracking</p>
                <p className="font-medium text-export-dark">{shipment.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-medium text-export-dark">{shipment.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Value</p>
                <p className="font-medium text-export-dark">{shipment.value}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-export-dark">{shipment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-export-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${shipment.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{shipment.currentLocation}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>ETA: {shipment.estimatedArrival}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Tracking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-export-dark mb-4">Real-time Tracking</h3>
        <div className="bg-export-primary bg-opacity-5 border border-export-primary border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-export-primary rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-export-dark mb-2">Live Shipment Tracking</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get real-time updates on your shipments with GPS tracking, port notifications, 
                and delivery confirmations. Never lose track of your exports again.
              </p>
              <button className="bg-export-primary text-white px-4 py-2 rounded-md hover:bg-export-primary hover:bg-opacity-90 transition-colors text-sm">
                Enable Live Tracking
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedShipment && <ShipmentDetails shipment={selectedShipment} />}
    </div>
  );
};

export default Shipments;
