import { useState } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
  MapPin,
  DollarSign,
  Package,
  Calendar,
  Search,
  RotateCcw
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';

const FilterSort = ({ 
  onFilterChange, 
  onSortChange, 
  activeFilters, 
  sortBy,
  resultCount 
}) => {
  const { t } = useI18n();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🕒' },
    { value: 'oldest', label: 'Oldest First', icon: '📅' },
    { value: 'price-low', label: 'Price: Low to High', icon: '📈' },
    { value: 'price-high', label: 'Price: High to Low', icon: '📉' },
    { value: 'popular', label: 'Most Popular', icon: '🔥' },
    { value: 'rating', label: 'Best Rated', icon: '⭐' },
    { value: 'name-az', label: 'Name A-Z', icon: '🔤' },
    { value: 'name-za', label: 'Name Z-A', icon: '🔤' }
  ];

  const conditionOptions = [
    { value: 'Like New', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { value: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { value: 'Very Good', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { value: 'Good', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { value: 'Fair', color: 'text-gray-600', bg: 'bg-gray-50 dark:bg-gray-900/20' }
  ];

  const locationOptions = [
    'Melbourne', 'Sydney', 'Brisbane', 'Perth', 
    'Adelaide', 'Canberra', 'Darwin', 'Hobart'
  ];

  const dateOptions = [
    { value: 'Today', label: 'Today', description: 'Posted today' },
    { value: 'This Week', label: 'This Week', description: 'Posted this week' },
    { value: 'This Month', label: 'This Month', description: 'Posted this month' },
    { value: 'Anytime', label: 'Anytime', description: 'All time' }
  ];

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFilterChange && onFilterChange({
      ...activeFilters,
      priceRange: newRange
    });
  };

  const toggleFilter = (filterType, value) => {
    const currentFilters = activeFilters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange && onFilterChange({
      ...activeFilters,
      [filterType]: newFilters
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 5000]);
    onFilterChange && onFilterChange({});
  };

  const activeFilterCount = Object.values(activeFilters || {}).flat().length;
  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="mb-8">
      {/* Filter and Sort Bar */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-3">
          
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 font-medium ${
              isFilterOpen || activeFilterCount > 0
                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/25'
                : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:block">{t('filter')}</span>
            {activeFilterCount > 0 && (
              <span className={`rounded-full text-xs px-2 py-0.5 font-bold ${
                isFilterOpen || activeFilterCount > 0
                  ? 'bg-white text-red-600'
                  : 'bg-red-500 text-white'
              }`}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:block">{currentSort?.label || t('sort')}</span>
              <span className="sm:hidden text-lg">{currentSort?.icon || '⚙️'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown */}
            {isSortOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 z-20 overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                    Sort Options
                  </div>
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange && onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-3 text-sm transition-colors rounded-lg flex items-center space-x-3 ${
                        sortBy === option.value
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:block">Clear All</span>
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg font-medium">
          <span className="font-bold text-gray-900 dark:text-white">{resultCount}</span> {resultCount === 1 ? 'result' : 'results'}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 mb-6 shadow-xl">
          
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Advanced Filters</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refine your search results</p>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-5 w-5 text-red-500" />
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  {t('priceRange')}
                </label>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>Min: ${priceRange[0]}</span>
                    <span>Max: ${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 mt-2"
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-5 w-5 text-red-500" />
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  {t('condition')}
                </label>
              </div>
              <div className="space-y-3">
                {conditionOptions.map((condition) => (
                  <label key={condition.value} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.condition?.includes(condition.value) || false}
                      onChange={() => toggleFilter('condition', condition.value)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                    />
                    <span className={`ml-3 text-sm font-medium px-2 py-1 rounded-lg transition-colors ${
                      activeFilters.condition?.includes(condition.value)
                        ? `${condition.bg} ${condition.color}`
                        : 'text-gray-700 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-slate-700'
                    }`}>
                      {condition.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-red-500" />
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  {t('location')}
                </label>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {locationOptions.map((location) => (
                  <label key={location} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.location?.includes(location) || false}
                      onChange={() => toggleFilter('location', location)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {location}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Posted */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-red-500" />
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  Date Posted
                </label>
              </div>
              <div className="space-y-3">
                {dateOptions.map((option) => (
                  <label key={option.value} className="flex items-start group cursor-pointer">
                    <input
                      type="radio"
                      name="datePosted"
                      checked={activeFilters.datePosted === option.value}
                      onChange={() => onFilterChange && onFilterChange({
                        ...activeFilters,
                        datePosted: option.value
                      })}
                      className="w-4 h-4 mt-0.5 border-gray-300 dark:border-slate-600 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {option.label}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(activeFilters || {}).map(([filterType, values]) => 
            Array.isArray(values) ? values.map((value) => (
              <span
                key={`${filterType}-${value}`}
                className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm px-3 py-1.5 rounded-full font-medium border border-red-200 dark:border-red-800"
              >
                <span>{value}</span>
                <button
                  onClick={() => toggleFilter(filterType, value)}
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors hover:scale-110"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )) : values && (
              <span
                key={filterType}
                className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm px-3 py-1.5 rounded-full font-medium border border-red-200 dark:border-red-800"
              >
                <span>{values}</span>
                <button
                  onClick={() => onFilterChange && onFilterChange({
                    ...activeFilters,
                    [filterType]: undefined
                  })}
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors hover:scale-110"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSort;