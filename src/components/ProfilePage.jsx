import { useState } from 'react';
import { 
  User,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  MapPin,
  Building2,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  ShoppingBag,
  Heart,
  Star,
  Clock,
  Shield,
  Settings,
  Bell,
  Globe,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Package,
  Eye,
  MessageCircle
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import { useTheme } from '../contexts/ThemeContext';

const ProfilePage = ({ user, onUserUpdate }) => {
  const { t, language, setLang } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editData, setEditData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@nab.com.au',
    department: user?.department || 'Technology',
    location: user?.location || 'Melbourne',
    phone: user?.phone || '+61 3 8641 4111',
    bio: user?.bio || 'Passionate about technology and innovation at NAB.',
    responseTime: user?.responseTime || '< 2 hours'
  });

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
  ];

  const handleSave = () => {
    onUserUpdate({ ...user, ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@nab.com.au',
      department: user?.department || 'Technology',
      location: user?.location || 'Melbourne',
      phone: user?.phone || '+61 3 8641 4111',
      bio: user?.bio || 'Passionate about technology and innovation at NAB.',
      responseTime: user?.responseTime || '< 2 hours'
    });
    setIsEditing(false);
  };

  const userStats = {
    itemsSold: 23,
    itemsBought: 12,
    wishlistItems: 8,
    rating: 4.8,
    totalViews: 1247,
    responseRate: 98
  };

  const recentActivity = [
    { type: 'sold', item: 'MacBook Pro 14"', date: '2 days ago', amount: '$2,800' },
    { type: 'bought', item: 'IKEA Standing Desk', date: '1 week ago', amount: '$350' },
    { type: 'listed', item: 'Canon EOS R6', date: '2 weeks ago', amount: '$1,800' },
    { type: 'saved', item: 'iPhone 15 Pro', date: '3 weeks ago', amount: '$1,650' }
  ];

  const tabs = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'activity', label: t('activity'), icon: TrendingUp },
    { id: 'settings', label: t('settings'), icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-800 dark:from-slate-950 dark:via-red-950 dark:to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-3xl">
                  {editData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white text-gray-600 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{editData.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{isEditing ? t('cancel') : t('edit')}</span>
                </button>
              </div>
              
              <div className="space-y-1 text-gray-200">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{editData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>{editData.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{editData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{userStats.itemsSold}</div>
              <div className="text-sm text-gray-300">{t('itemsSold')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{userStats.rating}</div>
              <div className="text-sm text-gray-300">{t('rating')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{userStats.responseRate}%</div>
              <div className="text-sm text-gray-300">{t('responseRate')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{userStats.totalViews}</div>
              <div className="text-sm text-gray-300">{t('totalViews')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 mb-8">
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <User className="h-6 w-6 mr-2" />
                    {t('personalInformation')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('fullName')}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white">
                          {editData.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('emailAddress')}
                      </label>
                      <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-500 dark:text-gray-400">
                        {editData.email}
                        <span className="ml-2 text-xs bg-gray-200 dark:bg-slate-600 px-2 py-1 rounded">
                          {t('cannotChange')}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('department')}
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.department}
                          onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option>Technology</option>
                          <option>Operations</option>
                          <option>Marketing</option>
                          <option>HR</option>
                          <option>Finance</option>
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white">
                          {editData.department}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('location')}
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.location}
                          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option>Melbourne</option>
                          <option>Sydney</option>
                          <option>Brisbane</option>
                          <option>Perth</option>
                          <option>Adelaide</option>
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white">
                          {editData.location}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('phoneNumber')}
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white">
                          {editData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('responseTime')}
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.responseTime}
                          onChange={(e) => setEditData({ ...editData, responseTime: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option> 1 hour</option>
                          <option> 2 hours</option>
                          <option> 4 hours</option>
                          <option> 1 day</option>
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white">
                          {editData.responseTime}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('bio')}
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder={t('bioPlaceholder')}
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-900 dark:text-white min-h-[100px]">
                        {editData.bio || t('bioPlaceholder')}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>{t('cancel')}</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{t('save')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-8">
                
                {/* Activity Stats */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    {t('activityOverview')}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                            {userStats.itemsSold}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {t('itemsSold')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">
                            {userStats.itemsBought}
                          </div>
                          <div className="text-sm text-emerald-700 dark:text-emerald-300">
                            {t('itemsBought')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                            {userStats.wishlistItems}
                          </div>
                          <div className="text-sm text-purple-700 dark:text-purple-300">
                            {t('wishlistItems')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                          <Star className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">
                            {userStats.rating}
                          </div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300">
                            {t('avgRating')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('recentActivity')}
                  </h3>
                  
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.type === 'sold' ? 'bg-green-100 dark:bg-green-900/30' :
                          activity.type === 'bought' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          activity.type === 'listed' ? 'bg-purple-100 dark:bg-purple-900/30' :
                          'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {activity.type === 'sold' && <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />}
                          {activity.type === 'bought' && <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                          {activity.type === 'listed' && <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                          {activity.type === 'saved' && <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {activity.type === 'sold' && `${t('sold')} ${activity.item}`}
                            {activity.type === 'bought' && `${t('bought')} ${activity.item}`}
                            {activity.type === 'listed' && `${t('listed')} ${activity.item}`}
                            {activity.type === 'saved' && `${t('saved')} ${activity.item}`}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.date}
                          </div>
                        </div>
                        
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {activity.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                
                {/* Appearance */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Settings className="h-6 w-6 mr-2" />
                    {t('appearance')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {isDark ? <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {t('darkMode')}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('darkModeDescription')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isDark ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isDark ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {t('language')}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('languageDescription')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setLang(lang.code)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                              language === lang.code
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                                : 'bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{lang.flag}</span>
                              <div className="text-left">
                                <div className="font-medium">{lang.name}</div>
                                <div className="text-sm opacity-75">{lang.nativeName}</div>
                              </div>
                            </div>
                            {language === lang.code && (
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    {t('notifications')}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {t('emailNotifications')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('emailNotificationsDesc')}
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 focus:ring-red-500 rounded" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {t('teamsNotifications')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('teamsNotificationsDesc')}
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 focus:ring-red-500 rounded" />
                    </div>
                  </div>
                </div>

                {/* Privacy & Security */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    {t('privacySecurity')}
                  </h3>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {t('profileVisibility')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('profileVisibilityDesc')}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {t('dataExport')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('dataExportDesc')}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                    {t('dangerZone')}
                  </h3>
                  
                  <div className="border border-red-200 dark:border-red-800 rounded-xl p-4 bg-red-50 dark:bg-red-900/20">
                    <button className="w-full flex items-center justify-between text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors p-2 rounded-lg">
                      <div>
                        <div className="font-medium text-red-700 dark:text-red-300">
                          {t('deactivateAccount')}
                        </div>
                        <div className="text-sm text-red-600 dark:text-red-400">
                          {t('deactivateAccountDesc')}
                        </div>
                      </div>
                      <LogOut className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;