import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Award,
  Activity
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import { mockProducts } from '../data/mockData';
import ProductCard from './ProductCard';
import Categories from './Categories';
import FilterSort from './FilterSort';

const HomePage = () => {
  const { t } = useI18n();
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('newest');
  const [wishlistedItems, setWishlistedItems] = useState(new Set());

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (activeFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= activeFilters.priceRange[0] && 
        product.price <= activeFilters.priceRange[1]
      );
    }

    // Condition filter
    if (activeFilters.condition?.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.condition.includes(product.condition)
      );
    }

    // Location filter
    if (activeFilters.location?.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.location.includes(product.seller.location)
      );
    }

    // Date filter
    if (activeFilters.datePosted && activeFilters.datePosted !== 'Anytime') {
      const now = new Date();
      
      filtered = filtered.filter(product => {
        const postedDate = new Date(product.postedDate);
        const daysDiff = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));
        
        switch (activeFilters.datePosted) {
          case 'Today':
            return daysDiff === 0;
          case 'This Week':
            return daysDiff <= 7;
          case 'This Month':
            return daysDiff <= 30;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'oldest':
          return new Date(a.postedDate) - new Date(b.postedDate);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.views - a.views;
        case 'name-az':
          return a.title.localeCompare(b.title);
        case 'name-za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, activeFilters, sortBy]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleToggleWishlist = (productId) => {
    const newWishlist = new Set(wishlistedItems);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlistedItems(newWishlist);
  };

  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 dark:from-slate-950 dark:via-red-950 dark:to-slate-900" />
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full translate-x-48 translate-y-48 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32 blur-2xl" />
        </div>

        {/* Elegant Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>')}")`,
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center text-white">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wider uppercase">NAB Internal Marketplace</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Elegant Typography */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {t('welcomeTitle')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              {t('welcomeSubtitle')} — A secure, trusted platform exclusively for NAB employees
            </p>

            {/* Premium CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                <span>List Your Item</span>
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </button>
            </div>
            
            {/* Enterprise Stats - Redesigned */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: ShoppingBag, value: '667+', label: 'Active Listings', color: 'from-blue-500 to-blue-600' },
                { icon: Users, value: '850+', label: 'NAB Sellers', color: 'from-emerald-500 to-emerald-600' },
                { icon: TrendingUp, value: '1.2k+', label: 'Transactions', color: 'from-purple-500 to-purple-600' },
                { icon: Award, value: '98%', label: 'Satisfaction', color: 'from-yellow-500 to-orange-500' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <stat.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-8 mb-12 py-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Secure Platform</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Activity className="h-4 w-4 text-blue-500" />
            <span>Real-time Updates</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Award className="h-4 w-4 text-yellow-500" />
            <span>Verified Sellers</span>
          </div>
        </div>
        
        {/* Categories - Enhanced */}
        <Categories 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Featured Products - Enhanced */}
        {!selectedCategory && featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span>{t('featuredProducts')}</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Handpicked premium items from trusted NAB sellers</p>
              </div>
              <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>View All</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Featured products horizontal scroll - Enhanced */}
            <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-80">
                  <ProductCard
                    product={product}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistedItems.has(product.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products Section - Enhanced */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedCategory 
                  ? `${t(selectedCategory)} Products` 
                  : t('allProducts')
                }
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory 
                  ? `Browse all ${t(selectedCategory).toLowerCase()} items`
                  : 'Discover amazing deals from your NAB colleagues'
                }
              </p>
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                View All Categories
              </button>
            )}
          </div>

          {/* Filter and Sort - Enhanced */}
          <FilterSort
            onFilterChange={setActiveFilters}
            onSortChange={setSortBy}
            activeFilters={activeFilters}
            sortBy={sortBy}
            resultCount={filteredProducts.length}
          />

          {/* Products Grid - Enhanced */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistedItems.has(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                We couldn't find any products matching your criteria. Try adjusting your filters or browse different categories.
              </p>
              <button
                onClick={() => {
                  setActiveFilters({});
                  setSelectedCategory(null);
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button - Enhanced */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <button className="group bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-12 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
              <span>Load More Products</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;