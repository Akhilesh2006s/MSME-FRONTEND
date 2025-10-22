import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Building,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import IndiaMapIcon from '../components/IndiaMapIcon';
import api from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    industry: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const industries = [
    'Textiles & Apparel',
    'Pharmaceuticals',
    'Agricultural Products',
    'Electronics',
    'Handicrafts',
    'Food Products',
    'Chemicals',
    'Machinery',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // For demo purposes, create account with any valid form data
      // In production, this would call the real API
      if (formData.firstName && formData.lastName && formData.email && formData.password && formData.agreeToTerms) {
        // Create a mock user response
        const mockUser = {
          id: 'demo-user-123',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: {
            name: formData.company || 'Demo Company',
            size: formData.companySize || '1-10 employees',
            industry: formData.industry || 'Textiles & Apparel'
          },
          role: 'user'
        };
        
        // Store mock token and user data
        api.setToken('demo-token-123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Please fill in all required fields and agree to terms');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.company && formData.companySize && formData.industry;
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-export-primary rounded-lg flex items-center justify-center mr-3">
              <IndiaMapIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-export-dark">AndhraExport</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-export-dark">
          Start your export journey
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join thousands of MSMEs already exporting successfully
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-export-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-export-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Personal Info</span>
              <span>Company Info</span>
              <span>Account Setup</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-export-dark mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-export-dark mb-4">Company Information</h3>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    required
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm rounded-md"
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm rounded-md"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Account Setup */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-export-dark mb-4">Account Setup</h3>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                      placeholder="Create a strong password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-export-primary focus:border-export-primary sm:text-sm"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-sm text-export-error">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        required
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="focus:ring-export-primary h-4 w-4 text-export-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="text-gray-700">
                        I agree to the{' '}
                        <a href="/terms" className="text-export-primary hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-export-primary hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="subscribeNewsletter"
                        name="subscribeNewsletter"
                        type="checkbox"
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange}
                        className="focus:ring-export-primary h-4 w-4 text-export-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="subscribeNewsletter" className="text-gray-700">
                        Subscribe to our newsletter for export tips and updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <div className="flex-1"></div>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-export-primary hover:bg-export-primary hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid(currentStep) || isLoading}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-export-primary hover:bg-export-primary hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-export-primary bg-export-primary bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-lg font-semibold text-export-dark mb-4 text-center">
            What you'll get with AndhraExport
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-export-success mr-3" />
              <span className="text-sm text-gray-600">14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-export-success mr-3" />
              <span className="text-sm text-gray-600">AI-powered market intelligence</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-export-success mr-3" />
              <span className="text-sm text-gray-600">Automated export documentation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-export-success mr-3" />
              <span className="text-sm text-gray-600">Real-time shipment tracking</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-export-success mr-3" />
              <span className="text-sm text-gray-600">Verified buyer marketplace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
