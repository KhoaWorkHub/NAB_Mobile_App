// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Users, 
  ShoppingBag,
  ChevronRight,
  Sparkles
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-slate-900 dark:via-slate-800 dark:to-red-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.05"><circle cx="30" cy="30" r="4"/></g></g></svg>')}")`,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </div>
              <span className="text-sm font-semibold text-red-100 uppercase tracking-wider bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
                NAB Internal Marketplace
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-5xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">667+</div>
                <div className="text-sm text-red-200">Active Listings</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">850+</div>
                <div className="text-sm text-red-200">NAB Sellers</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">1.2k+</div>
                <div className="text-sm text-red-200">Transactions</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
                <div className="text-sm text-red-200">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Categories */}
        <Categories 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Featured Products */}
        {!selectedCategory && featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <span>{t('featuredProducts')}</span>
              </h2>
              <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center space-x-1 transition-colors">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Featured products horizontal scroll */}
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
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

        {/* All Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory 
                ? `${t(selectedCategory)} Products` 
                : t('allProducts')
              }
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
              >
                View All Categories
              </button>
            )}
          </div>

          {/* Filter and Sort */}
          <FilterSort
            onFilterChange={setActiveFilters}
            onSortChange={setSortBy}
            activeFilters={activeFilters}
            sortBy={sortBy}
            resultCount={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => {
                  setActiveFilters({});
                  setSelectedCategory(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;