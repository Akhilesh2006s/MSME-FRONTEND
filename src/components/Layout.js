import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Globe, 
  Calculator, 
  FileText, 
  Truck, 
  Users, 
  Shield, 
  TrendingUp,
  Menu,
  X,
  Bell,
  User,
  Bot,
  Brain,
  Search
} from 'lucide-react';
import IndiaMapIcon from './IndiaMapIcon';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Market Intelligence', href: '/market-intelligence', icon: Globe },
    { name: 'Cost Calculator', href: '/cost-calculator', icon: Calculator },
    { name: 'Documentation', href: '/documentation', icon: FileText },
    { name: 'Shipments', href: '/shipments', icon: Truck },
    { name: 'Buyers', href: '/buyers', icon: Users },
    { name: 'Compliance', href: '/compliance', icon: Shield },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  ];

  const aiTools = [
    { name: 'AI Document Generator', href: '/ai-document-generator', icon: Bot },
    { name: 'AI Market Intelligence', href: '/ai-market-intelligence', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-export-light">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-export-dark">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-xl font-bold text-white">AndhraExport</Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <nav className="mt-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-export-primary text-white'
                      : 'text-gray-300 hover:bg-export-primary hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* AI Tools Section */}
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">AI Tools</h3>
              {aiTools.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-export-primary text-white'
                        : 'text-gray-300 hover:bg-export-primary hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-export-dark">
          <div className="flex items-center px-4 py-6">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-export-accent rounded-lg flex items-center justify-center mr-3">
                <IndiaMapIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">AndhraExport</h1>
            </Link>
          </div>
          <nav className="mt-8 flex-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-export-primary text-white'
                      : 'text-gray-300 hover:bg-export-primary hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* AI Tools Section */}
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">AI Tools</h3>
              {aiTools.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-export-primary text-white'
                        : 'text-gray-300 hover:bg-export-primary hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-export-error rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-export-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">AP MSME User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
