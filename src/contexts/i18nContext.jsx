import { createContext, useContext, useState } from 'react';

const i18nContext = createContext();

export const useI18n = () => {
  const context = useContext(i18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an i18nProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    appName: 'NAB Market',
    search: 'Search products...',
    
    // Navigation
    home: 'Home',
    categories: 'Categories',
    wishlist: 'Wishlist',
    profile: 'Profile',
    
    // Home page
    welcomeTitle: 'Welcome to NAB Market',
    welcomeSubtitle: 'Buy and sell with your NAB colleagues',
    featuredProducts: 'Featured Products',
    allProducts: 'All Products',
    
    // Product
    contactSeller: 'Contact Seller',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    viewDetails: 'View Details',
    
    // Categories
    electronics: 'Electronics',
    furniture: 'Furniture',
    clothing: 'Clothing',
    books: 'Books',
    sports: 'Sports & Outdoors',
    homeGarden: 'Home & Garden',
    
    // Footer
    aboutNabMarket: 'About NAB Market',
    aboutDescription: 'NAB Market is an internal marketplace for NAB employees to buy and sell items with colleagues.',
    quickLinks: 'Quick Links',
    helpSupport: 'Help & Support',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    
    // Common
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try again',
    filter: 'Filter',
    sort: 'Sort',
    priceRange: 'Price Range',
    condition: 'Condition',
    location: 'Location',
  },
  vi: {
    // Header
    appName: 'NAB Market',
    search: 'Tìm kiếm sản phẩm...',
    
    // Navigation
    home: 'Trang chủ',
    categories: 'Danh mục',
    wishlist: 'Yêu thích',
    profile: 'Hồ sơ',
    
    // Home page
    welcomeTitle: 'Chào mừng đến NAB Market',
    welcomeSubtitle: 'Mua bán với đồng nghiệp NAB',
    featuredProducts: 'Sản phẩm nổi bật',
    allProducts: 'Tất cả sản phẩm',
    
    // Product
    contactSeller: 'Liên hệ người bán',
    addToWishlist: 'Thêm vào yêu thích',
    removeFromWishlist: 'Bỏ khỏi yêu thích',
    viewDetails: 'Xem chi tiết',
    
    // Categories
    electronics: 'Điện tử',
    furniture: 'Nội thất',
    clothing: 'Thời trang',
    books: 'Sách',
    sports: 'Thể thao',
    homeGarden: 'Nhà cửa & Vườn',
    
    // Footer
    aboutNabMarket: 'Về NAB Market',
    aboutDescription: 'NAB Market là nền tảng mua bán nội bộ dành cho nhân viên NAB.',
    quickLinks: 'Liên kết nhanh',
    helpSupport: 'Trợ giúp & Hỗ trợ',
    terms: 'Điều khoản sử dụng',
    privacy: 'Chính sách bảo mật',
    
    // Common
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    retry: 'Thử lại',
    filter: 'Lọc',
    sort: 'Sắp xếp',
    priceRange: 'Khoảng giá',
    condition: 'Tình trạng',
    location: 'Vị trí',
  },
  hi: {
    // Header
    appName: 'NAB Market',
    search: 'उत्पाद खोजें...',
    
    // Navigation
    home: 'होम',
    categories: 'श्रेणियां',
    wishlist: 'पसंदीदा',
    profile: 'प्रोफ़ाइल',
    
    // Home page
    welcomeTitle: 'NAB Market में आपका स्वागत है',
    welcomeSubtitle: 'अपने NAB सहयोगियों के साथ खरीदें और बेचें',
    featuredProducts: 'विशेष उत्पाद',
    allProducts: 'सभी उत्पाद',
    
    // Product
    contactSeller: 'विक्रेता से संपर्क करें',
    addToWishlist: 'पसंदीदा में जोड़ें',
    removeFromWishlist: 'पसंदीदा से हटाएं',
    viewDetails: 'विवरण देखें',
    
    // Categories
    electronics: 'इलेक्ट्रॉनिक्स',
    furniture: 'फर्नीचर',
    clothing: 'कपड़े',
    books: 'किताबें',
    sports: 'खेल और बाहरी',
    homeGarden: 'घर और बगीचा',
    
    // Footer
    aboutNabMarket: 'NAB Market के बारे में',
    aboutDescription: 'NAB Market NAB कर्मचारियों के लिए एक आंतरिक बाज़ार है।',
    quickLinks: 'त्वरित लिंक',
    helpSupport: 'सहायता और समर्थन',
    terms: 'उपयोग की शर्तें',
    privacy: 'गोपनीयता नीति',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हुआ',
    retry: 'पुनः प्रयास करें',
    filter: 'फ़िल्टर',
    sort: 'सॉर्ट',
    priceRange: 'मूल्य सीमा',
    condition: 'स्थिति',
    location: 'स्थान',
  }
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('nab-language');
    return saved || 'en';
  });

  const setLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem('nab-language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <i18nContext.Provider value={{ language, setLang, t }}>
      {children}
    </i18nContext.Provider>
  );
};