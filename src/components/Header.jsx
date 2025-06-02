import { useState } from 'react';
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
  LogOut,
  Home,
  ShoppingBag,
  Package,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/i18nContext';

const Header = ({ user, onLogout, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const { language, setLang, t } = useI18n();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const navigationItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'categories', label: t('categories'), icon: Package },
    ...(user?.userType === 'seller' ? [{ id: 'seller', label: t('sellerDashboard'), icon: TrendingUp }] : []),
    { id: 'wishlist', label: t('wishlist'), icon: Heart },
    { id: 'messages', label: t('messages'), icon: MessageCircle }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

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
            <span className="hidden sm:block opacity-90">
              {user?.userType === 'seller' ? 'Seller Portal' : 'Secure Shopping Platform'}
            </span>
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
            <button 
              onClick={() => handleNavigation('home')}
              className="flex-shrink-0 flex items-center group cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('appName')}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {user?.userType === 'seller' ? 'Seller Portal' : 'Internal Marketplace'}
                </p>
              </div>
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'wishlist' && (
                  <span className="bg-red-500 text-white rounded-full text-xs px-2 py-0.5 font-bold">
                    5
                  </span>
                )}
                {item.id === 'messages' && (
                  <span className="bg-blue-500 text-white rounded-full text-xs px-2 py-0.5 font-bold">
                    3
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                placeholder={t('search')}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded font-mono">
                  ⌘K
                </div>
              </div>
            </form>
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
                      className={`flex items-center space-x-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
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
              </button>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'JD'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">
                      {user?.name || 'John Doe'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.userType === 'seller' ? t('seller') : t('buyer')}
                    </div>
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user?.name || 'John Doe'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email || 'john.doe@nab.com.au'}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {user?.department || 'Technology Department'}
                      </p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          handleNavigation('profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
                      >
                        <User className="h-4 w-4" />
                        <span>{t('myProfile')}</span>
                      </button>
                      <button 
                        onClick={() => {
                          handleNavigation('settings');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
                      >
                        <Settings className="h-4 w-4" />
                        <span>{t('settings')}</span>
                      </button>
                      {user?.userType === 'seller' && (
                        <button 
                          onClick={() => {
                            handleNavigation('seller');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                          <TrendingUp className="h-4 w-4" />
                          <span>{t('sellerDashboard')}</span>
                        </button>
                      )}
                      <hr className="my-2 border-gray-200 dark:border-slate-700" />
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('signOut')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Create listing button */}
              {user?.userType === 'seller' && (
                <button 
                  onClick={() => handleNavigation('seller')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden lg:block">{t('sellItem')}</span>
                </button>
              )}
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
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder={t('search')}
            />
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-4 space-y-3">
            {/* User profile section */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'JD'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.department || 'Technology Dept.'}
                </p>
              </div>
            </div>

            {/* Navigation items */}
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-xl transition-colors text-left ${
                  currentPage === item.id
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.id === 'wishlist' && (
                  <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1 font-medium">5</span>
                )}
                {item.id === 'messages' && (
                  <span className="ml-auto bg-blue-500 text-white rounded-full text-xs px-2 py-1 font-medium">3</span>
                )}
              </button>
            ))}
            
            <button 
              onClick={() => handleNavigation('profile')}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <User className="h-5 w-5" />
              <span>{t('myProfile')}</span>
            </button>
            
            <button className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left">
              <Bell className="h-5 w-5" />
              <span>{t('notifications')}</span>
              <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1 font-medium">3</span>
            </button>
            
            {user?.userType === 'seller' && (
              <button 
                onClick={() => handleNavigation('seller')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>{t('sellItem')}</span>
              </button>
            )}

            <button 
              onClick={onLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('signOut')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;