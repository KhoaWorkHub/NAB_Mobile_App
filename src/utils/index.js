
// Format currency
export const formatCurrency = (amount, currency = 'AUD') => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format time ago
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString('en-AU');
  }
};

// Generate initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

// Generate MS Teams chat URL
export const generateTeamsUrl = (email) => {
  return `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Get condition color class
export const getConditionColor = (condition) => {
  const colors = {
    'like new': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'excellent': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'very good': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'good': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'fair': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[condition.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Local storage helpers with error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage for key "${key}":`, error);
      return false;
    }
  }
};

// Image utilities
export const imageUtils = {
  // Check if image URL is valid
  isValidImageUrl: (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  },
  
  // Generate placeholder image
  generatePlaceholder: (width = 400, height = 400, text = 'No Image') => {
    return `https://via.placeholder.com/${width}x${height}/e2e8f0/64748b?text=${encodeURIComponent(text)}`;
  }
};

// Sort and filter utilities
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      return sorted.sort((a, b) => b.views - a.views);
    case 'name-az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-za':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating':
      return sorted.sort((a, b) => (b.seller?.rating || 0) - (a.seller?.rating || 0));
    default:
      return sorted;
  }
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    
    // Condition filter
    if (filters.condition?.length > 0) {
      if (!filters.condition.includes(product.condition)) {
        return false;
      }
    }
    
    // Location filter
    if (filters.location?.length > 0) {
      if (!filters.location.includes(product.seller?.location)) {
        return false;
      }
    }
    
    // Search query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchText = [
        product.title,
        product.description,
        product.seller?.name,
        ...(product.tags || [])
      ].join(' ').toLowerCase();
      
      if (!searchText.includes(query)) {
        return false;
      }
    }
    
    // Date filter
    if (filters.datePosted && filters.datePosted !== 'Anytime') {
      const now = new Date();
      const postedDate = new Date(product.postedDate);
      const daysDiff = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));
      
      switch (filters.datePosted) {
        case 'Today':
          if (daysDiff > 0) return false;
          break;
        case 'This Week':
          if (daysDiff > 7) return false;
          break;
        case 'This Month':
          if (daysDiff > 30) return false;
          break;
        default:
          break;
      }
    }
    
    return true;
  });
};

// Performance utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${componentName} render time: ${end - start}ms`);
    return result;
  },
  
  // Lazy load images
  lazyLoadImage: (img) => {
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    } else {
      // Fallback for browsers that don't support native lazy loading
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(img);
    }
  }
};

// Accessibility utilities
export const a11yUtils = {
  // Announce to screen readers
  announce: (message) => {
    const announcement = document.createElement('div');
    announcement.textContent = message;
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  // Generate accessible IDs
  generateAriaId: (prefix = 'aria') => {
    return `${prefix}-${generateId()}`;
  }
};

// Constants
export const CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300,
  NAB_DEPARTMENTS: [
    'Technology',
    'Operations',
    'Marketing',
    'Corporate Banking',
    'HR',
    'Risk Management',
    'Finance',
    'Customer Experience',
    'Digital Banking',
    'Legal',
    'Compliance'
  ],
  AUSTRALIAN_CITIES: [
    'Melbourne',
    'Sydney',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Canberra',
    'Darwin',
    'Hobart'
  ]
};