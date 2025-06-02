import { useState } from 'react';
import { 
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Shield
} from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded accounts
  const accounts = {
    'seller@nab.com.au': {
      password: 'seller123',
      userType: 'seller',
      name: 'John Smith',
      department: 'Technology'
    },
    'buyer@nab.com.au': {
      password: 'buyer123',
      userType: 'buyer', 
      name: 'Sarah Johnson',
      department: 'Operations'
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const account = accounts[userID];
    
    if (!account) {
      setError('User ID not found. Please check your credentials.');
      setIsLoading(false);
      return;
    }

    if (account.password !== password) {
      setError('Incorrect password. Please try again.');
      setIsLoading(false);
      return;
    }

    // Success - login user
    onLogin({
      userType: account.userType,
      email: userID,
      name: account.name,
      department: account.department
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">★</span>
            </div>
            <span className="text-xl font-bold">NAB Connect</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#" className="hover:text-red-400 transition-colors">NAB Security</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-red-400 transition-colors">Help</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-red-400 transition-colors">Contact us</a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Log into NAB Connect
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* User ID */}
              <div>
                <label htmlFor="userID" className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <input
                  id="userID"
                  type="text"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your User ID"
                  required
                />
                <div className="mt-2">
                  <a href="#" className="text-red-600 text-sm hover:text-red-700 transition-colors">
                    Forgot your User ID?
                  </a>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password/One-time Passcode
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your NAB Connect password, or the one-time passcode from your mobile or physical token.
                </p>
                <div className="mt-2">
                  <a href="#" className="text-red-600 text-sm hover:text-red-700 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember my User ID
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* Business Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Get NAB Connect for your business
              </h3>
              <a href="#" className="text-red-600 text-sm hover:text-red-700 transition-colors flex items-center space-x-1">
                <span>Find out how to get started with NAB Connect</span>
                <span>›</span>
              </a>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Demo Credentials</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-white rounded border">
                <div className="font-medium text-blue-900">Seller Account:</div>
                <div className="text-blue-700">seller@nab.com.au / seller123</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="font-medium text-blue-900">Buyer Account:</div>
                <div className="text-blue-700">buyer@nab.com.au / buyer123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="hidden lg:block">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-8 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">UPCOMING PUBLIC HOLIDAYS</h2>
            </div>
            
            <p className="text-gray-200 mb-4">
              There are public holidays in June 2025 which may impact NAB Connect payments and services.
            </p>
            
            <p className="text-gray-200">
              For details visit{' '}
              <a href="#" className="text-red-400 hover:text-red-300 underline transition-colors">
                Daylight savings and public holiday payment processing
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 text-white opacity-60">
        <Shield className="h-6 w-6" />
        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-xs">i</span>
        </div>
        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-xs">!</span>
        </div>
        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-xs">⚠</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;