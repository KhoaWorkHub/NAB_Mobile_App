import { useState } from 'react';
import { 
  Search,
  Filter,
  TrendingUp,
  Users,
  Package,
  Star,
  ChevronRight,
  Grid3X3,
  List,
  Eye,
  ShoppingBag,
  Smartphone,
  Armchair,
  Shirt,
  Book,
  Bike,
  Home,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  Coffee,
  Dumbbell,
  Car,
  Music,
  Palette,
  Wrench
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import ProductCard from './ProductCard';
import { mockProducts } from '../data/mockData';

const CategoriesPage = ({ onNavigate, onProductSelect }) => {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Extended categories with subcategories
  const categories = [
    {
      id: 'electronics',
      name: t('electronics'),
      icon: Smartphone,
      color: 'from-blue-500 to-blue-600',
      count: 156,
      description: 'Smartphones, laptops, tablets and more',
      subcategories: [
        { id: 'smartphones', name: 'Smartphones', icon: Smartphone, count: 45 },
        { id: 'laptops', name: 'Laptops', icon: Laptop, count: 32 },
        { id: 'tablets', name: 'Tablets', icon: Smartphone, count: 18 },
        { id: 'smartwatches', name: 'Smart Watches', icon: Watch, count: 23 },
        { id: 'headphones', name: 'Headphones', icon: Headphones, count: 28 },
        { id: 'cameras', name: 'Cameras', icon: Camera, count: 10 }
      ]
    },
    {
      id: 'furniture',
      name: t('furniture'),
      icon: Armchair,
      color: 'from-amber-500 to-amber-600',
      count: 89,
      description: 'Desks, chairs, storage and home furniture',
      subcategories: [
        { id: 'desks', name: 'Desks', icon: Package, count: 25 },
        { id: 'chairs', name: 'Chairs', icon: Armchair, count: 32 },
        { id: 'storage', name: 'Storage', icon: Package, count: 18 },
        { id: 'decor', name: 'Home Decor', icon: Home, count: 14 }
      ]
    },
    {
      id: 'clothing',
      name: t('clothing'),
      icon: Shirt,
      color: 'from-purple-500 to-purple-600',
      count: 234,
      description: 'Professional wear, casual clothing and accessories',
      subcategories: [
        { id: 'formal', name: 'Formal Wear', icon: Shirt, count: 67 },
        { id: 'casual', name: 'Casual Wear', icon: Shirt, count: 89 },
        { id: 'shoes', name: 'Shoes', icon: Package, count: 45 },
        { id: 'accessories', name: 'Accessories', icon: Watch, count: 33 }
      ]
    },
    {
      id: 'books',
      name: t('books'),
      icon: Book,
      color: 'from-green-500 to-green-600',
      count: 67,
      description: 'Professional books, novels and educational materials',
      subcategories: [
        { id: 'professional', name: 'Professional', icon: Book, count: 28 },
        { id: 'fiction', name: 'Fiction', icon: Book, count: 19 },
        { id: 'textbooks', name: 'Textbooks', icon: Book, count: 20 }
      ]
    },
    {
      id: 'sports',
      name: t('sports'),
      icon: Bike,
      color: 'from-orange-500 to-orange-600',
      count: 43,
      description: 'Fitness equipment, bikes and outdoor gear',
      subcategories: [
        { id: 'fitness', name: 'Fitness Equipment', icon: Dumbbell, count: 18 },
        { id: 'bikes', name: 'Bikes', icon: Bike, count: 12 },
        { id: 'outdoor', name: 'Outdoor Gear', icon: Package, count: 13 }
      ]
    },
    {
      id: 'home',
      name: t('homeGarden'),
      icon: Home,
      color: 'from-emerald-500 to-emerald-600',
      count: 78,
      description: 'Kitchen items, tools and garden equipment',
      subcategories: [
        { id: 'kitchen', name: 'Kitchen', icon: Coffee, count: 25 },
        { id: 'tools', name: 'Tools', icon: Wrench, count: 20 },
        { id: 'garden', name: 'Garden', icon: Home, count: 15 },
        { id: 'appliances', name: 'Appliances', icon: Package, count: 18 }
      ]
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: Gamepad2,
      color: 'from-pink-500 to-pink-600',
      count: 45,
      description: 'Gaming, music and entertainment items',
      subcategories: [
        { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: 20 },
        { id: 'music', name: 'Music', icon: Music, count: 15 },
        { id: 'art', name: 'Art & Crafts', icon: Palette, count: 10 }
      ]
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      color: 'from-gray-500 to-gray-600',
      count: 23,
      description: 'Car accessories and automotive tools',
      subcategories: [
        { id: 'accessories', name: 'Car Accessories', icon: Car, count: 15 },
        { id: 'tools', name: 'Auto Tools', icon: Wrench, count: 8 }
      ]
    }
  ];

  const sortOptions = [
    { value: 'popular', label: t('mostPopular') },
    { value: 'newest', label: t('newest') },
    { value: 'price-low', label: t('priceLowHigh') },
    { value: 'price-high', label: t('priceHighLow') },
    { value: 'name-az', label: t('nameAZ') }
  ];

  const filteredCategories = categories.filter(category =>
    searchQuery === '' || 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryProducts = (categoryId) => {
    return mockProducts.filter(product => product.category === categoryId);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleSubcategorySelect = (subcategoryId) => {
    // Navigate to products filtered by subcategory
    onNavigate('home', { filter: { subcategory: subcategoryId } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-800 dark:from-slate-950 dark:via-red-950 dark:to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <Package className="h-5 w-5 text-red-400" />
              <span className="font-semibold">{t('browseCategories')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('exploreCategories')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {t('categoriesDescription')}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">{categories.length}</div>
                <div className="text-sm text-gray-300">{t('categories')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </div>
                <div className="text-sm text-gray-300">{t('totalItems')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">850+</div>
                <div className="text-sm text-gray-300">{t('sellers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-300">{t('available')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchCategories')}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 dark:border-slate-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="group">
                <div
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl ${
                    selectedCategory === category.id
                      ? 'border-red-500 shadow-lg shadow-red-500/25'
                      : 'border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600'
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative bg-white dark:bg-slate-800 p-8">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 dark:border-slate-700 pt-6">
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.count}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t('items')}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {Math.floor(category.count * 0.7)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t('sellers')}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          4.{Math.floor(Math.random() * 5) + 5}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t('rating')}
                        </div>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {selectedCategory === category.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategories - Expanded view */}
                {selectedCategory === category.id && (
                  <div className="mt-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg animate-fade-in">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {t('subcategories')}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.subcategories.map((subcat) => (
                        <button
                          key={subcat.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategorySelect(subcat.id);
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left group"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <subcat.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {subcat.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {subcat.count} {t('items')}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                    
                    {/* View all button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('home', { filter: { category: category.id } });
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      {t('viewAllInCategory', { category: category.name })}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // List view
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    
                    {/* Category info */}
                    <div className="flex items-center space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4" />
                            <span>{category.count} {t('items')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{Math.floor(category.count * 0.7)} {t('sellers')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>4.{Math.floor(Math.random() * 5) + 5}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleCategorySelect(category.id)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{t('explore')}</span>
                      </button>
                      
                      <button
                        onClick={() => onNavigate('home', { filter: { category: category.id } })}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>{t('viewItems')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {selectedCategory === category.id && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {category.subcategories.map((subcat) => (
                          <button
                            key={subcat.id}
                            onClick={() => handleSubcategorySelect(subcat.id)}
                            className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left group"
                          >
                            <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <subcat.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {subcat.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {subcat.count} {t('items')}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search className="h-16 w-16 text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('noCategoriesFound')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {t('noCategoriesFoundDesc')}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              {t('clearSearch')}
            </button>
          </div>
        )}

        {/* Featured Products by Category */}
        {selectedCategory && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('featuredIn')} {filteredCategories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <button
                onClick={() => onNavigate('home', { filter: { category: selectedCategory } })}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold flex items-center space-x-2 transition-colors"
              >
                <span>{t('viewAll')}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getCategoryProducts(selectedCategory).slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleWishlist={() => {}}
                  onProductClick={() => onProductSelect(product)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;