import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Shield,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';

const Footer = () => {
  const { t } = useI18n();

  return (
    <>
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40 safe-bottom">
        <div className="grid grid-cols-5 h-16">
          <button className="flex flex-col items-center justify-center space-y-1 text-red-400 bg-gray-900 relative">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">{t('home')}</span>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-red-500 rounded-full" />
          </button>
          
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-gray-200 transition-colors">
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </button>
          
          <button className="flex flex-col items-center justify-center space-y-1 relative">
            <div className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 p-3 rounded-full text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              <Plus className="h-6 w-6" />
            </div>
          </button>
          
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-gray-200 transition-colors relative">
            <Heart className="h-5 w-5" />
            <span className="text-xs">{t('wishlist')}</span>
            <span className="absolute -top-1 right-2 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
              5
            </span>
          </button>
          
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-gray-200 transition-colors">
            <User className="h-5 w-5" />
            <span className="text-xs">{t('profile')}</span>
          </button>
        </div>
      </div>

      {/* Main footer - Premium black design */}
      <footer className="hidden md:block bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main footer content */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand section */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {t('appName')}
                    </h3>
                    <p className="text-gray-400 text-sm">Internal Marketplace</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-lg">
                  {t('aboutDescription')}
                </p>
                
                {/* Contact info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">market@nab.com.au</p>
                      <p className="text-sm text-gray-400">Get support via email</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">13 22 65</p>
                      <p className="text-sm text-gray-400">24/7 Support hotline</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 relative">
                  {t('quickLinks')}
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500 rounded-full" />
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>{t('categories')}</span>
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>Sell Item</span>
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>My Listings</span>
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>Saved Searches</span>
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>Analytics</span>
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 relative">
                  {t('helpSupport')}
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500 rounded-full" />
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <HelpCircle className="h-4 w-4 mr-3 text-red-400" />
                      <span>FAQ & Help Center</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <Shield className="h-4 w-4 mr-3 text-red-400" />
                      <span>Safety & Security</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>Community Guidelines</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>{t('terms')}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <span>{t('privacy')}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8">
                <p className="text-gray-400 text-sm text-center lg:text-left">
                  © 2025 National Australia Bank Limited. ABN 12 004 044 937 AFSL and Australian Credit Licence 230686.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="text-red-400 font-medium">Internal Use Only</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">System Online</span>
                  </div>
                </div>
              </div>
              
              {/* Enterprise badges */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Enterprise Grade</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded flex items-center justify-center">
                    <span className="text-black text-xs font-bold">★</span>
                  </div>
                  <span>ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile bottom navigation */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Footer;