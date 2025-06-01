// src/constants/index.js

// App Configuration
export const APP_CONFIG = {
  name: 'NAB Market',
  version: '1.0.0',
  description: 'Internal NAB marketplace for buying and selling items',
  company: 'National Australia Bank',
  support: {
    email: 'market@nab.com.au',
    phone: '13 22 65',
    teams: 'NAB Development Team'
  }
};

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  endpoints: {
    products: '/products',
    categories: '/categories',
    users: '/users',
    search: '/search',
    upload: '/upload'
  }
};

// MS Teams Configuration
export const TEAMS_CONFIG = {
  baseURL: import.meta.env.VITE_MS_TEAMS_BASE_URL || 'https://teams.microsoft.com',
  chatPath: '/l/chat/0/0',
  meetingPath: '/l/meetup-join'
};

// Theme Configuration
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: '#fff1f1',
      100: '#ffe1e1',
      200: '#ffc7c7',
      300: '#ffa0a0',
      400: '#ff6b6b',
      500: '#ff4444',
      600: '#d50000', // Primary NAB Red
      700: '#b71c1c',
      800: '#a41e22',
      900: '#881e22',
    }
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1600px'
  }
};

// Application Limits
export const LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxImagesPerProduct: 5,
  maxDescriptionLength: 2000,
  maxTitleLength: 100,
  maxSearchQuery: 100,
  minPasswordLength: 8,
  maxWishlistItems: 100,
  itemsPerPage: 20,
  maxCategories: 20
};

// Supported File Types
export const FILE_TYPES = {
  images: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  documents: {
    mimeTypes: ['application/pdf', 'text/plain'],
    extensions: ['.pdf', '.txt'],
    maxSize: 10 * 1024 * 1024 // 10MB
  }
};

// Product Categories
export const CATEGORIES = {
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    subcategories: ['smartphones', 'laptops', 'tablets', 'cameras', 'accessories']
  },
  furniture: {
    id: 'furniture',
    name: 'Furniture',
    icon: 'Armchair',
    subcategories: ['chairs', 'tables', 'storage', 'decor', 'lighting']
  },
  clothing: {
    id: 'clothing',
    name: 'Clothing',
    icon: 'Shirt',
    subcategories: ['mens', 'womens', 'accessories', 'shoes', 'formal']
  },
  books: {
    id: 'books',
    name: 'Books',
    icon: 'Book',
    subcategories: ['fiction', 'non-fiction', 'textbooks', 'professional', 'children']
  },
  sports: {
    id: 'sports',
    name: 'Sports & Outdoors',
    icon: 'Bike',
    subcategories: ['fitness', 'outdoor', 'bikes', 'equipment', 'apparel']
  },
  home: {
    id: 'home',
    name: 'Home & Garden',
    icon: 'Home',
    subcategories: ['kitchen', 'garden', 'tools', 'appliances', 'cleaning']
  }
};

// Product Conditions
export const CONDITIONS = [
  { value: 'like new', label: 'Like New', description: 'Minimal wear, excellent condition' },
  { value: 'excellent', label: 'Excellent', description: 'Minor wear, very good condition' },
  { value: 'very good', label: 'Very Good', description: 'Some wear but functions perfectly' },
  { value: 'good', label: 'Good', description: 'Normal wear, good condition' },
  { value: 'fair', label: 'Fair', description: 'Heavy wear but still functional' }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name-az', label: 'Name A-Z' },
  { value: 'name-za', label: 'Name Z-A' }
];

// NAB Departments
export const NAB_DEPARTMENTS = [
  'Technology',
  'Operations',
  'Marketing',
  'Corporate Banking',
  'Business Banking',
  'Personal Banking',
  'Human Resources',
  'Risk Management',
  'Finance',
  'Customer Experience',
  'Digital Banking',
  'Legal',
  'Compliance',
  'Internal Audit',
  'Strategy',
  'Data & Analytics',
  'Cybersecurity',
  'Property Services',
  'Procurement'
];

// Australian Locations
export const AUSTRALIAN_LOCATIONS = [
  'Adelaide',
  'Brisbane', 
  'Canberra',
  'Darwin',
  'Hobart',
  'Melbourne',
  'Perth',
  'Sydney',
  'Gold Coast',
  'Newcastle',
  'Wollongong',
  'Geelong',
  'Townsville',
  'Cairns',
  'Toowoomba',
  'Ballarat',
  'Bendigo',
  'Albury',
  'Launceston',
  'Mackay'
];

// Supported Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

// Animation Durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  page: 1000
};

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'nab-theme',
  language: 'nab-language',
  wishlist: 'nab-wishlist',
  recentSearches: 'nab-recent-searches',
  userPreferences: 'nab-user-preferences',
  filters: 'nab-active-filters',
  cartItems: 'nab-cart-items'
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  server: 'Server error. Please try again later.',
  notFound: 'The requested item was not found.',
  unauthorized: 'You are not authorized to perform this action.',
  validation: 'Please check your input and try again.',
  fileSize: `File size must be less than ${LIMITS.maxFileSize / (1024 * 1024)}MB`,
  fileType: 'File type not supported',
  generic: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  productAdded: 'Product added successfully!',
  productUpdated: 'Product updated successfully!',
  productDeleted: 'Product deleted successfully!',
  addedToWishlist: 'Added to wishlist!',
  removedFromWishlist: 'Removed from wishlist!',
  messageSent: 'Message sent successfully!',
  profileUpdated: 'Profile updated successfully!',
  settingsSaved: 'Settings saved successfully!'
};

// Regular Expressions
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  nabEmail: /^[^\s@]+@nab\.com\.au$/,
  phone: /^(\+61|0)[2-9]\d{8}$/,
  price: /^\d+(\.\d{1,2})?$/,
  alphanumeric: /^[a-zA-Z0-9\s]*$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Performance Thresholds
export const PERFORMANCE = {
  imageLazyLoadThreshold: 100, // pixels
  searchDebounceDelay: 300, // ms
  scrollThrottleDelay: 100, // ms
  maxConcurrentRequests: 6,
  cacheTimeout: 300000, // 5 minutes
  retryDelay: 1000 // ms
};

// Feature Flags
export const FEATURES = {
  darkMode: true,
  multiLanguage: true,
  wishlist: true,
  advancedSearch: true,
  teamsIntegration: true,
  imageUpload: true,
  notifications: true,
  analytics: import.meta.env.MODE === 'production',
  debugMode: import.meta.env.MODE === 'development'
};

// Date Formats
export const DATE_FORMATS = {
  display: 'DD/MM/YYYY',
  displayWithTime: 'DD/MM/YYYY HH:mm',
  api: 'YYYY-MM-DD',
  timestamp: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

// Currency Configuration
export const CURRENCY = {
  default: 'AUD',
  symbol: '$',
  precision: 2,
  format: {
    locale: 'en-AU',
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }
};

// Social Media and Contact
export const SOCIAL_LINKS = {
  teams: 'https://teams.microsoft.com',
  yammer: 'https://www.yammer.com/nab.com.au',
  intranet: 'https://nabnet.nab.com.au',
  support: 'mailto:it.support@nab.com.au'
};

export default {
  APP_CONFIG,
  API_CONFIG,
  TEAMS_CONFIG,
  THEME_CONFIG,
  LIMITS,
  FILE_TYPES,
  CATEGORIES,
  CONDITIONS,
  SORT_OPTIONS,
  NAB_DEPARTMENTS,
  AUSTRALIAN_LOCATIONS,
  LANGUAGES,
  ANIMATIONS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX,
  PERFORMANCE,
  FEATURES,
  DATE_FORMATS,
  CURRENCY,
  SOCIAL_LINKS
};