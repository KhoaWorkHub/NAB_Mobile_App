import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In a real app, you might want to log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring (basic)
const observePerformance = () => {
  // Observe Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // Silently fail if PerformanceObserver is not supported
    }
  }
};

// Initialize app
const initializeApp = () => {
  // Check for browser compatibility
  const isModernBrowser = 'Promise' in window && 'fetch' in window && 'Map' in window;
  
  if (!isModernBrowser) {
    console.warn('This browser may not be fully supported. Please consider upgrading.');
  }

  // Set up global error handling
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });

  // Set up performance monitoring in development
  if (import.meta.env.DEV) {
    observePerformance();
  }

  // Apply saved theme immediately to prevent flash
  try {
    const savedTheme = localStorage.getItem('nab-theme');
    if (savedTheme && JSON.parse(savedTheme)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch  {
    // Fallback to light mode if there's an error reading localStorage
    document.documentElement.classList.remove('dark');
  }

  // Apply saved language
  try {
    const savedLang = localStorage.getItem('nab-language');
    if (savedLang) {
      document.documentElement.lang = savedLang;
    } else {
      document.documentElement.lang = 'en';
    }
  } catch {
    document.documentElement.lang = 'en';
  }
};

// Initialize the app before rendering
initializeApp();

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)