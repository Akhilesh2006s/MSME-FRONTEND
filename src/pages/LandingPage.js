import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Calculator, 
  FileText, 
  Truck, 
  Users, 
  Shield, 
  TrendingUp,
  Star,
  Play,
  Menu,
  X
} from 'lucide-react';
import GlobeVisualization from '../components/GlobeVisualization';
import IndiaMapIcon from '../components/IndiaMapIcon';
import MetallicBorderCard from '../components/MetallicBorderCard';
import '../components/MetallicBorderCard.css';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Globe,
      title: 'AI Market Intelligence',
      description: 'Discover profitable export opportunities with AI-powered market analysis and competitor insights.'
    },
    {
      icon: Calculator,
      title: 'Smart Cost Calculator',
      description: 'Calculate total export costs including freight, duties, and compliance with profitability analysis.'
    },
    {
      icon: FileText,
      title: 'Automated Documentation',
      description: 'Generate export documents automatically with 99.7% accuracy and real-time compliance checking.'
    },
    {
      icon: Truck,
      title: 'Shipment Tracking',
      description: 'Track your exports in real-time with integrated logistics and carrier management.'
    },
    {
      icon: Users,
      title: 'Buyer Marketplace',
      description: 'Connect with verified international buyers through our AI-powered matching system.'
    },
    {
      icon: Shield,
      title: 'Compliance Engine',
      description: 'Stay compliant with automated regulatory updates and country-specific requirements.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'MSMEs Enabled' },
    { number: '₹1,000 Cr', label: 'Export Value Generated' },
    { number: '50+', label: 'Countries Supported' },
    { number: '85%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'AP Textiles Ltd.',
      content: 'AndhraExport helped us increase our exports by 300% in just 6 months. The AI insights are game-changing!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'Vizag Pharma Exports',
      content: 'The compliance checking saved us from multiple shipment rejections. Highly recommended for MSMEs.',
      rating: 5
    },
    {
      name: 'Suresh Reddy',
      company: 'Nellore Handicrafts',
      content: 'Found 5 new international buyers through the platform. The buyer matching is incredibly accurate.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-export-primary rounded-lg flex items-center justify-center mr-3">
                  <IndiaMapIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AndhraExport</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#features" className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                    <a href="#pricing" className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                    <a href="#testimonials" className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
                <Link to="/signin" className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
                <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-export-primary p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#features" className="text-gray-600 hover:text-export-primary block px-3 py-2 rounded-md text-base font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-export-primary block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-export-primary block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
              <Link to="/signin" className="text-gray-600 hover:text-export-primary block px-3 py-2 rounded-md text-base font-medium">Sign In</Link>
              <Link to="/signup" className="bg-export-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-export-primary hover:bg-opacity-90 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Empower Your MSME to
                <span className="text-purple-400"> Go Global</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                AI-powered export platform designed for Andhra Pradesh MSMEs. 
                Simplify international trade with intelligent automation, compliance checking, 
                and buyer matching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-sm text-blue-100">No Credit Card Required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-sm text-blue-100">14-Day Free Trial</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Export Dashboard</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                      <div className="text-2xl font-bold text-white">₹4.8M</div>
                      <div className="text-sm text-blue-100">Revenue</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                      <div className="text-2xl font-bold text-white">24</div>
                      <div className="text-sm text-blue-100">Exports</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-amber-500/80 to-orange-500/80 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <TrendingUp className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Globe Visualization Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-6">
              <IndiaMapIcon className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-400">Global Trade Network</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Connect to Global Markets
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform connects Andhra Pradesh MSMEs to 50+ countries worldwide 
              with real-time trade routes and market intelligence.
            </p>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <GlobeVisualization />
            
            {/* Enhanced overlay gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-export-dark to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-export-dark via-export-dark/90 to-transparent" />
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-export-dark to-transparent" />
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-export-dark to-transparent" />
            </div>
            
            {/* Enhanced statistics overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="group">
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-export-accent transition-colors">50+</div>
                    <div className="text-sm text-gray-300 font-medium">Countries Connected</div>
                    <div className="w-12 h-1 bg-gradient-to-r from-export-primary to-export-accent mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="group">
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-export-accent transition-colors">₹1,000 Cr</div>
                    <div className="text-sm text-gray-300 font-medium">Export Value Generated</div>
                    <div className="w-12 h-1 bg-gradient-to-r from-export-accent to-export-success mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="group">
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-export-accent transition-colors">10,000+</div>
                    <div className="text-sm text-gray-300 font-medium">MSMEs Enabled</div>
                    <div className="w-12 h-1 bg-gradient-to-r from-export-success to-export-primary mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive hint */}
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-3 border border-white/20">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-export-accent rounded-full animate-pulse"></div>
                  <span>Interactive Globe</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-export-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-export-primary/30 transition-colors">
                <TrendingUp className="h-8 w-8 text-export-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analytics</h3>
              <p className="text-gray-400">Live export performance tracking and market insights</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-export-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-export-accent/30 transition-colors">
                <Users className="h-8 w-8 text-export-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Global Network</h3>
              <p className="text-gray-400">Connect with verified buyers and suppliers worldwide</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-export-success/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-export-success/30 transition-colors">
                <Shield className="h-8 w-8 text-export-success" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Platform</h3>
              <p className="text-gray-400">Enterprise-grade security for all your export data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-400/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Export Successfully
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform combines AI intelligence, automation, and compliance 
              to make international trade accessible for every MSME.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="h-80">
                <MetallicBorderCard>
                  <div className="flex flex-col h-full">
                    <div className="w-16 h-16 bg-export-primary bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="h-8 w-8 text-export-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed flex-grow">{feature.description}</p>
                  </div>
                </MetallicBorderCard>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by MSMEs Across Andhra Pradesh
            </h2>
            <p className="text-xl text-gray-300">
              See how AndhraExport is transforming export businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-purple-400/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-purple-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-blue-100">
              Choose the plan that fits your export needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-purple-400 mb-6">₹0<span className="text-lg text-gray-300">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Basic dashboard</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Cost calculator</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>3 document templates</span>
                </li>
              </ul>
              <Link to="/signup" className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 block text-center">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border-2 border-purple-400/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="text-4xl font-bold text-purple-400 mb-6">₹2,999<span className="text-lg text-gray-300">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>AI market intelligence</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Buyer matching</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Compliance alerts</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Analytics dashboard</span>
                </li>
              </ul>
              <Link to="/signup" className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 block text-center">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-purple-400 mb-6">Custom<span className="text-lg text-gray-300">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>API access</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>White-label solution</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link to="/contact" className="w-full bg-purple-500/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500/30 transition-all duration-300 block text-center border border-purple-400/30">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Export Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of MSMEs who are already exporting successfully with AndhraExport
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/signin" 
              className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <IndiaMapIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AndhraExport</span>
              </div>
              <p className="text-gray-300">
                Empowering MSMEs to go global with AI-powered export solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="/api" className="text-gray-300 hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="/integrations" className="text-gray-300 hover:text-purple-400 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-gray-300 hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="/docs" className="text-gray-300 hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-purple-400 transition-colors">Community</a></li>
                <li><a href="/status" className="text-gray-300 hover:text-purple-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 AndhraExport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
