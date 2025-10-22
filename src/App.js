import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MarketIntelligence from './pages/MarketIntelligence';
import CostCalculator from './pages/CostCalculator';
import Documentation from './pages/Documentation';
import Shipments from './pages/Shipments';
import Buyers from './pages/Buyers';
import Compliance from './pages/Compliance';
import Analytics from './pages/Analytics';
import MSMEExportDashboard from './pages/MSMEExportDashboard';
import AIPoweredDashboard from './components/AIPoweredDashboard';
import AIDocumentGenerator from './pages/AIDocumentGenerator';
import AIMarketIntelligence from './pages/AIMarketIntelligence';
import AIBuyerMatching from './pages/AIBuyerMatching';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes - Dashboard */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/market-intelligence" element={
          <Layout>
            <MarketIntelligence />
          </Layout>
        } />
        <Route path="/cost-calculator" element={
          <Layout>
            <CostCalculator />
          </Layout>
        } />
        <Route path="/documentation" element={
          <Layout>
            <Documentation />
          </Layout>
        } />
        <Route path="/shipments" element={
          <Layout>
            <Shipments />
          </Layout>
        } />
        <Route path="/buyers" element={
          <Layout>
            <Buyers />
          </Layout>
        } />
        <Route path="/compliance" element={
          <Layout>
            <Compliance />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/msme-dashboard" element={
          <Layout>
            <MSMEExportDashboard />
          </Layout>
        } />
        <Route path="/ai-dashboard" element={
          <Layout>
            <AIPoweredDashboard />
          </Layout>
        } />
        <Route path="/ai-document-generator" element={
          <Layout>
            <AIDocumentGenerator />
          </Layout>
        } />
        <Route path="/ai-market-intelligence" element={
          <Layout>
            <AIMarketIntelligence />
          </Layout>
        } />
        <Route path="/ai-buyer-matching" element={
          <Layout>
            <AIBuyerMatching />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
