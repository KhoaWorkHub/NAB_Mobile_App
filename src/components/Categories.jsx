import { 
  Smartphone, 
  Armchair, 
  Shirt, 
  Book, 
  Bike, 
  Home,
  ChevronRight,
  TrendingUp,
  Users,
  Package,
  BarChart3
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import { mockCategories } from '../data/mockData';

const Categories = ({ onCategorySelect, selectedCategory }) => {
  const { t } = useI18n();

  const getIcon = (iconName) => {
    const icons = {
      Smartphone,
      Armchair,
      Shirt,
      Book,
      Bike,
      Home
    };
    const IconComponent = icons[iconName] || Home;
    return <IconComponent className="h-6 w-6" />;
  };

  const getGradientColors = (categoryId) => {
    const gradients = {
      electronics: 'from-blue-500 to-blue-600',
      furniture: 'from-amber-500 to-amber-600',
      clothing: 'from-purple-500 to-purple-600',
      books: 'from-green-500 to-green-600',
      sports: 'from-orange-500 to-orange-600',
      home: 'from-emerald-500 to-emerald-600'
    };
    return gradients[categoryId] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {t('categories')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Browse products by category</p>
        </div>
        <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-semibold flex items-center space-x-1 transition-colors bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30">
          <span>View All</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {mockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect && onCategorySelect(category.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-600 text-white shadow-lg shadow-red-500/25 scale-105'
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              <div className={`mb-2 transition-colors ${
                selectedCategory === category.id 
                  ? 'text-white' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {getIcon(category.icon)}
              </div>
              <span className="text-xs font-medium text-center leading-tight px-1">
                {t(category.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {mockCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect && onCategorySelect(category.id)}
            className={`group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden ${
              selectedCategory === category.id
                ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-600 text-white shadow-xl shadow-red-500/25'
                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-600 hover:shadow-lg'
            }`}
          >
            {/* Background gradient overlay for non-selected items */}
            {selectedCategory !== category.id && (
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(category.id)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            )}
            
            <div className={`mb-4 p-3 rounded-xl transition-all duration-300 ${
              selectedCategory === category.id 
                ? 'bg-white/20 text-white' 
                : `bg-gradient-to-br ${getGradientColors(category.id)} text-white shadow-lg group-hover:scale-110`
            }`}>
              {getIcon(category.icon)}
            </div>
            
            <h3 className="font-bold text-sm mb-2 text-center transition-colors">
              {t(category.id)}
            </h3>
            
            <div className={`text-xs font-medium transition-colors ${
              selectedCategory === category.id 
                ? 'text-red-100' 
                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
            }`}>
              {category.count} items
            </div>

            {/* Selection indicator */}
            {selectedCategory === category.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced category stats - Desktop only */}
      <div className="hidden md:block mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-gray-200 dark:border-slate-600">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="group">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {mockCategories.reduce((total, cat) => total + cat.count, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Items</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {mockCategories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              850+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Sellers</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              1.2k+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Transactions</div>
          </div>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {mockCategories.reduce((total, cat) => total + cat.count, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Items</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            850+
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Active Sellers</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;