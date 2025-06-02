import { useState } from 'react';
import { 
  Heart,
  Search,
  Filter,
  SlidersHorizontal,
  Trash2,
  Share2,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  TrendingDown,
  AlertCircle,
  Grid,
  List,
  ArrowUpDown
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import { mockProducts } from '../data/mockData';
import ProductCard from './ProductCard';

const WishlistPage = ({ onNavigate, onProductSelect }) => {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Mock wishlist data - in real app this would come from user's saved items
  const [wishlistItems, setWishlistItems] = useState(
    mockProducts.filter((_, index) => index < 6).map(product => ({
      ...product,
      addedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      priceHistory: [
        { date: '2025-05-01', price: product.price + 100 },
        { date: '2025-05-15', price: product.price + 50 },
        { date: '2025-05-30', price: product.price },
      ]
    }))
  );

  const sortOptions = [
    { value: 'newest', label: t('dateAddedNewest') },
    { value: 'oldest', label: t('dateAddedOldest') },
    { value: 'price-low', label: t('priceLowHigh') },
    { value: 'price-high', label: t('priceHighLow') },
    { value: 'name-az', label: t('nameAZ') }
  ];

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleBulkRemove = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.has(item.id)));
    setSelectedItems(new Set());
  };

  const handleSelectItem = (productId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === wishlistItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(wishlistItems.map(item => item.id)));
    }
  };

  const filteredItems = wishlistItems.filter(item => 
    searchQuery === '' || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'oldest':
        return new Date(a.addedDate) - new Date(b.addedDate);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-az':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return t('today');
    if (diffInDays === 1) return t('yesterday');
    if (diffInDays < 7) return t('daysAgo', { days: diffInDays });
    if (diffInDays < 30) return t('weeksAgo', { weeks: Math.floor(diffInDays / 7) });
    return t('monthsAgo', { months: Math.floor(diffInDays / 30) });
  };

  const getPriceChange = (item) => {
    if (item.priceHistory.length < 2) return null;
    const currentPrice = item.price;
    const previousPrice = item.priceHistory[item.priceHistory.length - 2].price;
    return currentPrice - previousPrice;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-800 dark:from-slate-950 dark:via-red-950 dark:to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <Heart className="h-5 w-5 text-red-400 fill-current" />
              <span className="font-semibold">{t('myWishlist')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('savedItems')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {t('wishlistDescription')}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">{wishlistItems.length}</div>
                <div className="text-sm text-gray-300">{t('totalItems')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">{t('totalValue')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  ${Math.round(wishlistItems.reduce((sum, item) => sum + item.price, 0) / wishlistItems.length || 0)}
                </div>
                <div className="text-sm text-gray-300">{t('avgPrice')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-gray-300">{t('priceDrops')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls */}
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
                placeholder={t('searchWishlist')}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:block">{t('filters')}</span>
              </button>

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
                  <Grid className="h-4 w-4" />
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

          {/* Bulk Actions */}
          {selectedItems.size > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    {t('itemsSelected', { count: selectedItems.size })}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBulkRemove}
                    className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{t('removeSelected')}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>{t('shareSelected')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Select All */}
          {wishlistItems.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.size === wishlistItems.length}
                  onChange={() => {}}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 rounded"
                />
                <span>{t('selectAll')}</span>
              </button>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('itemsShowing', { 
                  showing: sortedItems.length, 
                  total: wishlistItems.length 
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-24">
            {searchQuery ? (
              // No search results
              <div>
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="h-16 w-16 text-gray-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('noSearchResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  {t('noSearchResultsDesc')}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {t('clearSearch')}
                </button>
              </div>
            ) : wishlistItems.length === 0 ? (
              // Empty wishlist
              <div>
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="h-16 w-16 text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('emptyWishlist')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  {t('emptyWishlistDesc')}
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('startBrowsing')}
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedItems.map((item) => {
                  const priceChange = getPriceChange(item);
                  return (
                    <div key={item.id} className="relative">
                      {/* Selection checkbox */}
                      <div className="absolute top-4 left-4 z-10">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-5 h-5 text-red-600 focus:ring-red-500 rounded shadow-lg backdrop-blur-sm"
                        />
                      </div>
                      
                      {/* Price change indicator */}
                      {priceChange && (
                        <div className={`absolute top-4 right-4 z-10 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          priceChange < 0 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {priceChange < 0 ? '↓' : '↑'} ${Math.abs(priceChange)}
                        </div>
                      )}
                      
                      <ProductCard
                        product={item}
                        onContactSeller={() => {}}
                        onToggleWishlist={() => handleRemoveFromWishlist(item.id)}
                        isWishlisted={true}
                        onProductClick={() => onProductSelect(item)}
                        showAddedDate={true}
                        addedDate={item.addedDate}
                      />
                      
                      {/* Added date */}
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                        {t('added')} {formatTimeAgo(item.addedDate)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List view
              <div className="space-y-4">
                {sortedItems.map((item) => {
                  const priceChange = getPriceChange(item);
                  return (
                    <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-6">
                        
                        {/* Selection */}
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
                        />
                        
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-xl"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{t('added')} {formatTimeAgo(item.addedDate)}</span>
                                <span>•</span>
                                <span>{item.seller.location}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                  ${item.price}
                                </span>
                                {priceChange && (
                                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                    priceChange < 0 
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                  }`}>
                                    {priceChange < 0 ? '↓' : '↑'} ${Math.abs(priceChange)}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => onProductSelect(item)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                  {t('viewItem')}
                                </button>
                                <button
                                  onClick={() => handleRemoveFromWishlist(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Price Alerts */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-3">
                {t('priceAlerts')}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-2xl mx-auto">
                {t('priceAlertsDesc')}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
                {t('enablePriceAlerts')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;