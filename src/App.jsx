import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/i18nContext';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SellerPage from './components/SellerPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProfilePage from './components/ProfilePage';
import WishlistPage from './components/WishlistPage';
import CategoriesPage from './components/CategoriesPage';
import MessagesPage from './components/MessagePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem('nab-user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setCurrentPage('home');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('nab-user');
      }
      setIsLoading(false);
    };

    // Simulate checking session
    setTimeout(checkSession, 800);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nab-user', JSON.stringify(userData));
    
    // Navigate based on user type
    if (userData.userType === 'seller') {
      setCurrentPage('seller');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nab-user');
    setCurrentPage('login');
  };

  const handleNavigation = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
    if (data) {
      if (page === 'product-detail') {
        setSelectedProduct(data);
      }
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-white font-bold text-xl">★</span>
          </div>
          <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-white font-medium">
            Loading NAB Connect...
          </p>
        </div>
      </div>
    );
  }

  // Login page (no authentication required)
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Main application (authenticated)
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="App min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <Header 
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigation}
            currentPage={currentPage}
          />
          
          <main className="min-h-screen">
            {currentPage === 'home' && (
              <HomePage 
                user={user}
                onNavigate={handleNavigation}
                onProductSelect={handleProductSelect}
                pageData={pageData}
              />
            )}
            
            {currentPage === 'seller' && (
              <SellerPage 
                user={user}
                onNavigate={handleNavigation}
              />
            )}
            
            {currentPage === 'product-detail' && selectedProduct && (
              <ProductDetailPage 
                product={selectedProduct}
                user={user}
                onNavigate={handleNavigation}
              />
            )}
            
            {currentPage === 'profile' && (
              <ProfilePage 
                user={user}
                onNavigate={handleNavigation}
                onUserUpdate={setUser}
              />
            )}

            {currentPage === 'wishlist' && (
              <WishlistPage 
                user={user}
                onNavigate={handleNavigation}
                onProductSelect={handleProductSelect}
              />
            )}

            {currentPage === 'categories' && (
              <CategoriesPage 
                user={user}
                onNavigate={handleNavigation}
                onProductSelect={handleProductSelect}
              />
            )}

            {currentPage === 'messages' && (
              <MessagesPage 
                user={user}
                onNavigate={handleNavigation}
                onProductSelect={handleProductSelect}
              />
            )}

            {/* Search page - redirect to home with search params */}
            {currentPage === 'search' && (
              <HomePage 
                user={user}
                onNavigate={handleNavigation}
                onProductSelect={handleProductSelect}
                pageData={{ showSearch: true }}
              />
            )}
          </main>
          
          <Footer 
            onNavigate={handleNavigation} 
            currentPage={currentPage}
            user={user}
          />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;