const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://msme-backend-production-17d7.up.railway.app/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.getToken()) {
      config.headers.Authorization = `Bearer ${this.getToken()}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    this.removeToken();
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Export Readiness endpoints
  async getExportReadiness() {
    return this.request('/export-readiness');
  }

  async assessExportReadiness(assessmentData) {
    return this.request('/export-readiness/assess', {
      method: 'POST',
      body: JSON.stringify({ assessmentData }),
    });
  }

  async updateGap(gapId, isCompleted) {
    return this.request(`/export-readiness/gap/${gapId}`, {
      method: 'PUT',
      body: JSON.stringify({ isCompleted }),
    });
  }

  async getReadinessAnalytics() {
    return this.request('/export-readiness/analytics');
  }

  // Document Generation endpoints
  async generateProFormaInvoice(data) {
    return this.request('/document-generation/generate/proforma-invoice', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generatePackingList(data) {
    return this.request('/document-generation/generate/packing-list', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateCertificateOfOrigin(data) {
    return this.request('/document-generation/generate/certificate-of-origin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async downloadDocument(documentId) {
    const response = await fetch(`${this.baseURL}/documents/download/${documentId}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    return response.blob();
  }

  // Shipment Tracking endpoints
  async getShipments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/shipment-tracking?${queryString}`);
  }

  async getShipment(shipmentId) {
    return this.request(`/shipment-tracking/${shipmentId}`);
  }

  async createShipment(shipmentData) {
    return this.request('/shipment-tracking', {
      method: 'POST',
      body: JSON.stringify(shipmentData),
    });
  }

  async updateShipmentStatus(shipmentId, status, location, description) {
    return this.request(`/shipment-tracking/${shipmentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, location, description }),
    });
  }

  async trackShipment(shipmentId) {
    return this.request(`/shipment-tracking/${shipmentId}/track`, {
      method: 'POST',
    });
  }

  async getShipmentTimeline(shipmentId) {
    return this.request(`/shipment-tracking/${shipmentId}/timeline`);
  }

  async getShipmentAnalytics(period = '30d') {
    return this.request(`/shipment-tracking/analytics/overview?period=${period}`);
  }

  // Collaboration endpoints
  async getTeams() {
    return this.request('/collaboration/teams');
  }

  async createTeam(teamData) {
    return this.request('/collaboration/teams', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async addTeamMember(teamId, userId, role, permissions) {
    return this.request(`/collaboration/teams/${teamId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role, permissions }),
    });
  }

  async getWorkflows() {
    return this.request('/collaboration/workflows');
  }

  async createWorkflow(workflowData) {
    return this.request('/collaboration/workflows', {
      method: 'POST',
      body: JSON.stringify(workflowData),
    });
  }

  async startWorkflow(workflowId, entityType, entityId, metadata) {
    return this.request(`/collaboration/workflows/${workflowId}/start`, {
      method: 'POST',
      body: JSON.stringify({ entityType, entityId, metadata }),
    });
  }

  async getWorkflowInstances(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/collaboration/workflow-instances?${queryString}`);
  }

  async completeWorkflowStep(instanceId, action, comments) {
    return this.request(`/collaboration/workflow-instances/${instanceId}/complete-step`, {
      method: 'POST',
      body: JSON.stringify({ action, comments }),
    });
  }

  async skipWorkflowStep(instanceId, reason) {
    return this.request(`/collaboration/workflow-instances/${instanceId}/skip-step`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async getNotifications(unreadOnly = false) {
    return this.request(`/collaboration/notifications?unreadOnly=${unreadOnly}`);
  }

  // Analytics endpoints
  async getExportAnalytics() {
    return this.request('/analytics/export');
  }

  // AI Market Intelligence endpoints
  async getAITariffs(country, product) {
    return this.request('/ai-market-intelligence/tariff-analysis', {
      method: 'POST',
      body: JSON.stringify({ country, product })
    });
  }

  async getAICompetitorPrices(product, market) {
    return this.request('/ai-market-intelligence/competitor-pricing', {
      method: 'POST',
      body: JSON.stringify({ product, market })
    });
  }

  async getAIRegulatoryChanges(country, industry) {
    return this.request('/ai-market-intelligence/regulatory-changes', {
      method: 'POST',
      body: JSON.stringify({ country, industry })
    });
  }

  async getAIAndhraPradeshInsights(industry, district) {
    return this.request('/ai-market-intelligence/andhra-pradesh-analysis', {
      method: 'POST',
      body: JSON.stringify({ industry, district })
    });
  }

  async detectIndustry(productDescription) {
    return this.request('/ai-market-intelligence/detect-industry', {
      method: 'POST',
      body: JSON.stringify({ productDescription })
    });
  }

  // PDF Download methods
  async downloadTariffPDF(country, product) {
    const response = await fetch(`${this.baseURL}/ai-market-intelligence/download-tariff-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.getToken() && { Authorization: `Bearer ${this.getToken()}` })
      },
      body: JSON.stringify({ country, product })
    });
    
    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }
    
    return response.blob();
  }

  async downloadCompetitorPDF(product, market) {
    const response = await fetch(`${this.baseURL}/ai-market-intelligence/download-competitor-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.getToken() && { Authorization: `Bearer ${this.getToken()}` })
      },
      body: JSON.stringify({ product, market })
    });
    
    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }
    
    return response.blob();
  }

  async downloadAPMarketPDF(industry, district) {
    const response = await fetch(`${this.baseURL}/ai-market-intelligence/download-ap-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.getToken() && { Authorization: `Bearer ${this.getToken()}` })
      },
      body: JSON.stringify({ industry, district })
    });
    
    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }
    
    return response.blob();
  }

  async downloadDocumentPDF(documentType, data) {
    const response = await fetch(`${this.baseURL}/ai-document-generation/download-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.getToken() && { Authorization: `Bearer ${this.getToken()}` })
      },
      body: JSON.stringify({ documentType, data })
    });
    
    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }
    
    return response.blob();
  }

  // AI Document Generation endpoints
  async generateSmartInvoice(data) {
    return this.request('/ai-document-generation/smart-invoice', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateSmartPackingList(data) {
    return this.request('/ai-document-generation/smart-packing-list', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateSmartCertificate(data) {
    return this.request('/ai-document-generation/smart-certificate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateSmartCommercialInvoice(data) {
    return this.request('/ai-document-generation/smart-commercial-invoice', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async autoFillDocument(data) {
    return this.request('/ai-document-generation/auto-fill', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // AI Buyer Matching endpoints
  async matchBuyers(data) {
    return this.request('/ai-buyer-matching/find-buyers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async classifyLeads(leads) {
    return this.request('/ai-buyer-matching/classify-leads', {
      method: 'POST',
      body: JSON.stringify({ leads }),
    });
  }

  async getMarketOpportunities(productCategory, targetRegions) {
    return this.request(`/ai-buyer-matching/market-opportunities?productCategory=${productCategory}&targetRegions=${targetRegions}`);
  }

  async getAndhraPradeshBuyers(industry, district) {
    return this.request(`/ai-buyer-matching/andhra-pradesh-buyers?industry=${industry}&district=${district}`);
  }

  // Real-time updates
  setupWebSocket() {
    const wsUrl = process.env.REACT_APP_WS_URL || 'wss://msme-backend-production-17d7.up.railway.app';
    const ws = new WebSocket(`${wsUrl}?token=${this.getToken()}`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleRealtimeUpdate(data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        this.setupWebSocket();
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  }

  handleRealtimeUpdate(data) {
    // Handle different types of real-time updates
    switch (data.type) {
      case 'shipment_update':
        this.emit('shipmentUpdate', data.payload);
        break;
      case 'document_ready':
        this.emit('documentReady', data.payload);
        break;
      case 'workflow_update':
        this.emit('workflowUpdate', data.payload);
        break;
      case 'notification':
        this.emit('notification', data.payload);
        break;
      default:
        console.log('Unknown real-time update:', data);
    }
  }

  // Event emitter functionality
  events = {};

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
