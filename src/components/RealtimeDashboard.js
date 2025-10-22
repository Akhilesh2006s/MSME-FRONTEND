import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Bell, 
  TrendingUp,
  Package,
  FileText,
  Users,
  AlertCircle
} from 'lucide-react';
import apiService from '../services/api';

const RealtimeDashboard = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    shipments: [],
    documents: [],
    workflows: [],
    analytics: null
  });

  // WebSocket connection
  useEffect(() => {
    const ws = apiService.setupWebSocket();
    
    // Listen for real-time updates
    apiService.on('shipmentUpdate', handleShipmentUpdate);
    apiService.on('documentReady', handleDocumentReady);
    apiService.on('workflowUpdate', handleWorkflowUpdate);
    apiService.on('notification', handleNotification);

    ws.onopen = () => {
      setIsConnected(true);
      setLastUpdate(new Date());
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
      apiService.off('shipmentUpdate', handleShipmentUpdate);
      apiService.off('documentReady', handleDocumentReady);
      apiService.off('workflowUpdate', handleWorkflowUpdate);
      apiService.off('notification', handleNotification);
    };
  }, []);

  // Handle real-time updates
  const handleShipmentUpdate = useCallback((data) => {
    setRealTimeData(prev => ({
      ...prev,
      shipments: prev.shipments.map(shipment => 
        shipment.id === data.shipmentId 
          ? { ...shipment, ...data.updates }
          : shipment
      )
    }));
    
    addNotification({
      type: 'shipment',
      title: 'Shipment Update',
      message: `Shipment ${data.shipmentId} status updated to ${data.updates.status}`,
      timestamp: new Date()
    });
  }, []);

  const handleDocumentReady = useCallback((data) => {
    setRealTimeData(prev => ({
      ...prev,
      documents: [...prev.documents, data.document]
    }));
    
    addNotification({
      type: 'document',
      title: 'Document Ready',
      message: `${data.document.type} has been generated successfully`,
      timestamp: new Date()
    });
  }, []);

  const handleWorkflowUpdate = useCallback((data) => {
    setRealTimeData(prev => ({
      ...prev,
      workflows: prev.workflows.map(workflow => 
        workflow.id === data.workflowId 
          ? { ...workflow, ...data.updates }
          : workflow
      )
    }));
    
    addNotification({
      type: 'workflow',
      title: 'Workflow Update',
      message: `Workflow ${data.workflowId} step completed`,
      timestamp: new Date()
    });
  }, []);

  const handleNotification = useCallback((data) => {
    addNotification({
      type: data.type || 'info',
      title: data.title,
      message: data.message,
      timestamp: new Date()
    });
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const refreshData = async () => {
    try {
      // Refresh all data
      const [shipmentsData, analyticsData] = await Promise.all([
        apiService.getShipments(),
        apiService.getExportAnalytics()
      ]);

      setRealTimeData(prev => ({
        ...prev,
        shipments: shipmentsData.data.shipments || [],
        analytics: analyticsData.data || null
      }));

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  return (
    <div className="relative">
      {/* Real-time Status Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {lastUpdate && (
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      <button 
                        onClick={clearNotifications}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div key={index} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'shipment' ? 'bg-blue-500' :
                            notification.type === 'document' ? 'bg-green-500' :
                            notification.type === 'workflow' ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button 
              onClick={refreshData}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Data Indicators */}
      <div className="bg-gray-50 px-4 py-2">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">
              {realTimeData.shipments.filter(s => s.status === 'in_transit').length} in transit
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-green-500" />
            <span className="text-gray-600">
              {realTimeData.documents.filter(d => d.status === 'pending_approval').length} pending docs
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-gray-600">
              {realTimeData.workflows.filter(w => w.status === 'in_progress').length} active workflows
            </span>
          </div>

          {realTimeData.analytics && (
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">
                Revenue: ₹{realTimeData.analytics.totalRevenue?.toLocaleString() || '0'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>

      {/* Connection Status Toast */}
      {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <WifiOff className="h-4 w-4" />
          <span>Connection lost. Attempting to reconnect...</span>
        </div>
      )}
    </div>
  );
};

export default RealtimeDashboard;

