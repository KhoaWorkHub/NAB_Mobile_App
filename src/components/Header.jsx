import  { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Heart, 
  User, 
  Sun, 
  Moon, 
  Globe,
  Bell,
  Plus,
  Settings,
  LogOut
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/i18nContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLang, t } = useI18n();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 shadow-sm dark:shadow-slate-900/20">
      {/* Top enterprise bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">NAB Internal Marketplace</span>
            </div>
            <span className="hidden sm:block opacity-75">|</span>
            <span className="hidden sm:block opacity-90">Secure & Trusted Platform</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="hover:text-red-200 transition-colors hidden md:block">Help & Support</a>
            <span className="hidden md:block opacity-50">•</span>
            <a href="#" className="hover:text-red-200 transition-colors hidden md:block">Terms of Use</a>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-xs">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('appName')}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Internal Marketplace</p>
              </div>
            </div>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                placeholder={t('search')}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded font-mono">
                  ⌘K
                </div>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-1">
            
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 relative group"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-5 h-5">
                <Sun className={`h-5 w-5 absolute transition-all duration-300 ${
                  isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <Moon className={`h-5 w-5 absolute transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isDark ? 'Light' : 'Dark'}
              </div>
            </button>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                title="Change language"
              >
                <Globe className="h-5 w-5" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50 backdrop-blur-xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 ${
                        language === lang.code 
                          ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 font-medium' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.code && <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <button className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all relative group">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                  3
                </span>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Notifications
                </div>
              </button>
              
              <button className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all relative group">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                  5
                </span>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Wishlist
                </div>
              </button>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <span className="hidden lg:block font-medium">John Doe</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                      <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@nab.com.au</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Technology Department</p>
                    </div>
                    <div className="py-2">
                      <a href="#" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </a>
                      <a href="#" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                      <hr className="my-2 border-gray-200 dark:border-slate-700" />
                      <a href="#" className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                <Plus className="h-4 w-4" />
                <span className="hidden lg:block">Sell Item</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder={t('search')}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-4 space-y-3">
            {/* User profile section */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Technology Dept.</p>
              </div>
            </div>

            <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <Heart className="h-5 w-5 text-red-500" />
              <span>{t('wishlist')}</span>
              <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1 font-medium">5</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="h-5 w-5 text-red-500" />
              <span>Notifications</span>
              <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1 font-medium">3</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <User className="h-5 w-5 text-red-500" />
              <span>{t('profile')}</span>
            </a>
            
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg font-medium">
              <Plus className="h-4 w-4" />
              <span>Sell Item</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;