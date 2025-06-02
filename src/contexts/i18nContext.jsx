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
    
    // Login Page
    nabMarketplace: 'NAB Marketplace',
    secureAccessPortal: 'Secure Access Portal',
    chooseAccountType: 'Choose Your Account Type',
    selectRoleToContinue: 'Select your role to continue with secure SSO authentication',
    
    // User Types
    buyerAccount: 'Buyer Account',
    buyerSubtitle: 'Browse and purchase items from colleagues',
    sellerAccount: 'Seller Account',
    sellerSubtitle: 'List and sell your items to colleagues',
    
    // Features
    browseProducts: 'Browse products from colleagues',
    contactSellers: 'Contact sellers via Teams',
    saveWishlist: 'Save items to wishlist',
    securePayments: 'Secure internal transactions',
    listProducts: 'List products for sale',
    manageListings: 'Manage your listings',
    trackAnalytics: 'Track listing analytics',
    communicateTeams: 'Communicate via Teams',
    
    // SSO
    secureSSO: 'Secure SSO',
    nabEmployees: 'NAB Staff Only',
    globalAccess: 'Global Access',
    enterNabEmail: 'Enter Your NAB Email',
    ssoRedirectMessage: 'You will be redirected to secure single sign-on',
    emailAddress: 'Email Address',
    nabEmailRequired: 'Must be a valid @nab.com.au email address',
    continueSSO: 'Continue with SSO',
    redirectingSSO: 'Redirecting to SSO...',
    backToSelection: 'Back to Selection',
    
    // Azure SSO
    redirectingAzure: 'Redirecting to Azure AD',
    azureAuthMessage: 'Please complete authentication in the popup window',
    authenticating: 'Authenticating...',
    signInMicrosoft: 'Sign in with Microsoft',
    verifyingIdentity: 'Verifying identity...',
    checkingPermissions: 'Checking permissions...',
    grantingAccess: 'Granting access...',
    
    // Authentication
    secureAuthentication: 'Secure Authentication',
    ssoSecurityMessage: 'Your login is secured by NAB enterprise SSO with multi-factor authentication',
    authenticationSuccess: 'Authentication Successful!',
    welcomeMessage: 'Welcome to NAB Market! You are logged in as {userType}',
    identityVerified: 'Identity verified successfully',
    accessGranted: 'Access granted to NAB Market',
    sessionEstablished: 'Secure session established',
    redirectingDashboard: 'Redirecting to dashboard...',
    
    // Seller Page
    sellerDashboard: 'Seller Dashboard',
    createNewListing: 'Create New Listing',
    shareItemsColleagues: 'Share and sell items with your NAB colleagues',
    activeListings: 'Active Listings',
    activeBuyers: 'Active Buyers',
    avgResponseTime: 'Avg Response',
    
    // Form Steps
    basicInfo: 'Basic Info',
    imagesPhotos: 'Images & Photos',
    pricingDetails: 'Pricing & Details',
    reviewPublish: 'Review & Publish',
    step: 'Step',
    of: 'of',
    
    // Exchange
    itemForExchange: 'Item for Exchange',
    exchangeDescription: 'Toggle if you want to trade this item instead of selling',
    whatLookingFor: 'What are you looking for?',
    exchangeForPlaceholder: 'e.g., iPhone, laptop, furniture...',
    exchange: 'Exchange',
    
    // Form Fields
    productTitle: 'Product Title',
    titlePlaceholder: 'e.g., MacBook Pro 14" M3 - Excellent Condition',
    category: 'Category',
    description: 'Description',
    descriptionPlaceholder: 'Provide detailed information about your item, including condition, usage, reason for selling, etc.',
    
    // Conditions
    likeNew: 'Like New',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    fair: 'Fair',
    likeNewDesc: 'Minimal wear, excellent condition',
    excellentDesc: 'Minor wear, very good condition',
    veryGoodDesc: 'Some wear but functions perfectly',
    goodDesc: 'Normal wear, good condition',
    fairDesc: 'Heavy wear but still functional',
    
    // Images
    productImages: 'Product Images',
    dragDropImages: 'Drag and drop images here',
    supportedFormats: 'PNG, JPG, WEBP up to 5MB each',
    selectFiles: 'Select Files',
    imagePreview: 'Image Preview',
    mainPhoto: 'Main Photo',
    
    // Photo Tips
    photoTips: 'Photo Tips',
    tipGoodLighting: 'Use good lighting for clear, bright photos',
    tipMultipleAngles: 'Take photos from multiple angles',
    tipShowDefects: 'Show any defects or wear clearly',
    tipHighResolution: 'Use high resolution for better quality',
    
    // Pricing
    price: 'Price',
    priceGuideline: 'Set a competitive price based on condition and market value',
    selectLocation: 'Select your location',
    
    // Tags
    tags: 'Tags',
    addTagsPlaceholder: 'Add tags to help buyers find your item...',
    tagsHelpText: 'Press Enter or comma to add tags. Use relevant keywords.',
    
    // Contact
    preferredContact: 'Preferred Contact Method',
    teamsDescription: 'Buyers will contact you via Microsoft Teams chat',
    
    // Review
    listingPreview: 'Listing Preview',
    readyToPublish: 'Ready to Publish',
    publishDescription: 'Your listing will be visible to all NAB employees immediately after publishing.',
    agreeTerms: 'I agree to the NAB Market Terms of Service and Community Guidelines',
    emailNotificationsInquiries: 'Send me email notifications for inquiries and updates',
    
    // Actions
    previous: 'Previous',
    next: 'Next',
    publishing: 'Publishing...',
    publishListing: 'Publish Listing',
    listingCreatedSuccess: 'Listing created successfully! It will be reviewed and published shortly.',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    share: 'Share',
    
    // Additional Login & Navigation
    backToHome: 'Back to Home',
    myProfile: 'My Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    sellItem: 'Sell Item',
    seller: 'Seller',
    buyer: 'Buyer',
    
    // Product Detail
    sellerInformation: 'Seller Information',
    safetyReminder: 'Safety Reminder',
    safetyMessage: 'Always meet in safe public locations and verify items before purchase.',
    contactSellerDescription: 'Start a conversation about this item',
    openTeamsChat: 'Open Teams Chat',
    shareItem: 'Share Item',
    shareDescription: 'Share this item with colleagues',
    
    // Wishlist
    myWishlist: 'My Wishlist',
    savedItems: 'Saved Items',
    wishlistDescription: 'Keep track of items you love and get notified of price changes',
    totalItems: 'Total Items',
    totalValue: 'Total Value',
    avgPrice: 'Avg Price',
    priceDrops: 'Price Drops',
    searchWishlist: 'Search your wishlist...',
    filters: 'Filters',
    dateAddedNewest: 'Date Added (Newest)',
    dateAddedOldest: 'Date Added (Oldest)',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    nameAZ: 'Name: A-Z',
    itemsSelected: '{count} items selected',
    removeSelected: 'Remove Selected',
    shareSelected: 'Share Selected',
    selectAll: 'Select All',
    itemsShowing: 'Showing {showing} of {total} items',
    noSearchResults: 'No search results',
    noSearchResultsDesc: 'Try adjusting your search terms or browse categories',
    clearSearch: 'Clear Search',
    emptyWishlist: 'Your wishlist is empty',
    emptyWishlistDesc: 'Start adding items you love to keep track of them here',
    startBrowsing: 'Start Browsing',
    added: 'Added',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: '{days} days ago',
    weeksAgo: '{weeks} weeks ago',
    monthsAgo: '{months} months ago',
    viewItem: 'View Item',
    priceAlerts: 'Price Drop Alerts',
    priceAlertsDesc: 'Get notified when items in your wishlist drop in price',
    enablePriceAlerts: 'Enable Price Alerts',
    
    // Categories
    browseCategories: 'Browse Categories',
    exploreCategories: 'Explore Categories',
    categoriesDescription: 'Find exactly what you\'re looking for in our organized categories',
    sellers: 'Sellers',
    available: 'Available',
    searchCategories: 'Search categories...',
    mostPopular: 'Most Popular',
    newest: 'Newest',
    items: 'Items',
    rating: 'Rating',
    subcategories: 'Subcategories',
    viewAllInCategory: 'View All in {category}',
    noCategoriesFound: 'No categories found',
    noCategoriesFoundDesc: 'Try a different search term',
    featuredIn: 'Featured in',
    viewAll: 'View All',
    explore: 'Explore',
    viewItems: 'View Items',
    
    // Messages
    messages: 'Messages',
    searchConversations: 'Search conversations...',
    all: 'All',
    unread: 'Unread',
    archived: 'Archived',
    noConversationsFound: 'No conversations found',
    noMessages: 'No messages yet',
    tryDifferentSearch: 'Try a different search term',
    startConversation: 'Contact a seller to start a conversation',
    selectConversation: 'Select a conversation',
    selectConversationDesc: 'Choose a conversation from the list to start messaging',
    browseProductsFromMessages: 'Browse Products',
    viewListing: 'View Listing',
    typeMessage: 'Type a message...',
    openInTeams: 'Open in Microsoft Teams',
    
    // Profile additional
    personalInformation: 'Personal Information',
    fullName: 'Full Name',
    cannotChange: 'Cannot change',
    department: 'Department',
    phoneNumber: 'Phone Number',
    responseTime: 'Response Time',
    bio: 'Bio',
    bioPlaceholder: 'Tell colleagues about yourself...',
    activityOverview: 'Activity Overview',
    itemsSold: 'Items Sold',
    itemsBought: 'Items Bought',
    wishlistItems: 'Wishlist Items',
    avgRating: 'Avg Rating',
    recentActivity: 'Recent Activity',
    sold: 'Sold',
    bought: 'Bought',
    listed: 'Listed',
    saved: 'Saved',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDescription: 'Toggle between light and dark themes',
    language: 'Language',
    languageDescription: 'Change the interface language',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive email updates about your items',
    teamsNotifications: 'Teams Notifications',
    teamsNotificationsDesc: 'Get notified via Microsoft Teams',
    privacySecurity: 'Privacy & Security',
    profileVisibility: 'Profile Visibility',
    profileVisibilityDesc: 'Control who can see your profile information',
    dataExport: 'Data Export',
    dataExportDesc: 'Download a copy of your account data',
    dangerZone: 'Danger Zone',
    deactivateAccount: 'Deactivate Account',
    deactivateAccountDesc: 'Permanently disable your account'
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
    
    // Login Page
    nabMarketplace: 'Chợ NAB',
    secureAccessPortal: 'Cổng Truy Cập Bảo Mật',
    chooseAccountType: 'Chọn Loại Tài Khoản',
    selectRoleToContinue: 'Chọn vai trò để tiếp tục với xác thực SSO bảo mật',
    
    // User Types
    buyerAccount: 'Tài Khoản Người Mua',
    buyerSubtitle: 'Duyệt và mua sản phẩm từ đồng nghiệp',
    sellerAccount: 'Tài Khoản Người Bán',
    sellerSubtitle: 'Đăng bán sản phẩm cho đồng nghiệp',
    
    // Features
    browseProducts: 'Duyệt sản phẩm từ đồng nghiệp',
    contactSellers: 'Liên hệ người bán qua Teams',
    saveWishlist: 'Lưu sản phẩm yêu thích',
    securePayments: 'Giao dịch nội bộ bảo mật',
    listProducts: 'Đăng sản phẩm bán',
    manageListings: 'Quản lý bài đăng',
    trackAnalytics: 'Theo dõi thống kê',
    communicateTeams: 'Giao tiếp qua Teams',
    
    // SSO
    secureSSO: 'SSO Bảo Mật',
    nabEmployees: 'Chỉ Nhân Viên NAB',
    globalAccess: 'Truy Cập Toàn Cầu',
    enterNabEmail: 'Nhập Email NAB',
    ssoRedirectMessage: 'Bạn sẽ được chuyển hướng đến đăng nhập một lần bảo mật',
    emailAddress: 'Địa Chỉ Email',
    nabEmailRequired: 'Phải là địa chỉ email @nab.com.au hợp lệ',
    continueSSO: 'Tiếp Tục với SSO',
    redirectingSSO: 'Đang chuyển hướng SSO...',
    backToSelection: 'Quay Lại Lựa Chọn',
    
    // Azure SSO
    redirectingAzure: 'Chuyển Hướng Azure AD',
    azureAuthMessage: 'Vui lòng hoàn thành xác thực trong cửa sổ popup',
    authenticating: 'Đang xác thực...',
    signInMicrosoft: 'Đăng nhập với Microsoft',
    verifyingIdentity: 'Đang xác minh danh tính...',
    checkingPermissions: 'Đang kiểm tra quyền...',
    grantingAccess: 'Đang cấp quyền truy cập...',
    
    // Authentication
    secureAuthentication: 'Xác Thực Bảo Mật',
    ssoSecurityMessage: 'Đăng nhập được bảo mật bởi NAB enterprise SSO với xác thực đa yếu tố',
    authenticationSuccess: 'Xác Thực Thành Công!',
    welcomeMessage: 'Chào mừng đến NAB Market! Bạn đã đăng nhập với vai trò {userType}',
    identityVerified: 'Danh tính đã được xác minh thành công',
    accessGranted: 'Đã cấp quyền truy cập NAB Market',
    sessionEstablished: 'Phiên bảo mật đã được thiết lập',
    redirectingDashboard: 'Đang chuyển hướng đến bảng điều khiển...',
    
    // Seller Page
    sellerDashboard: 'Bảng Điều Khiển Người Bán',
    createNewListing: 'Tạo Bài Đăng Mới',
    shareItemsColleagues: 'Chia sẻ và bán sản phẩm với đồng nghiệp NAB',
    activeListings: 'Bài Đăng Hoạt Động',
    activeBuyers: 'Người Mua Hoạt Động',
    avgResponseTime: 'Thời Gian Phản Hồi TB',
    
    // Form Steps
    basicInfo: 'Thông Tin Cơ Bản',
    imagesPhotos: 'Hình Ảnh & Ảnh',
    pricingDetails: 'Giá Cả & Chi Tiết',
    reviewPublish: 'Xem Lại & Xuất Bản',
    step: 'Bước',
    of: 'của',
    
    // Exchange
    itemForExchange: 'Sản Phẩm Để Trao Đổi',
    exchangeDescription: 'Bật nếu bạn muốn trao đổi sản phẩm thay vì bán',
    whatLookingFor: 'Bạn đang tìm kiếm gì?',
    exchangeForPlaceholder: 'ví dụ: iPhone, laptop, nội thất...',
    exchange: 'Trao Đổi',
    
    // Form Fields
    productTitle: 'Tiêu Đề Sản Phẩm',
    titlePlaceholder: 'ví dụ: MacBook Pro 14" M3 - Tình Trạng Tuyệt Vời',
    category: 'Danh Mục',
    description: 'Mô Tả',
    descriptionPlaceholder: 'Cung cấp thông tin chi tiết về sản phẩm, bao gồm tình trạng, cách sử dụng, lý do bán...',
    
    // Conditions
    likeNew: 'Như Mới',
    excellent: 'Tuyệt Vời',
    veryGood: 'Rất Tốt',
    good: 'Tốt',
    fair: 'Khá',
    likeNewDesc: 'Ít hao mòn, tình trạng tuyệt vời',
    excellentDesc: 'Hao mòn nhẹ, tình trạng rất tốt',
    veryGoodDesc: 'Có hao mòn nhưng hoạt động hoàn hảo',
    goodDesc: 'Hao mòn bình thường, tình trạng tốt',
    fairDesc: 'Hao mòn nhiều nhưng vẫn hoạt động',
    
    // Images
    productImages: 'Hình Ảnh Sản Phẩm',
    dragDropImages: 'Kéo thả hình ảnh tại đây',
    supportedFormats: 'PNG, JPG, WEBP tối đa 5MB mỗi ảnh',
    selectFiles: 'Chọn Tệp',
    imagePreview: 'Xem Trước Hình Ảnh',
    mainPhoto: 'Ảnh Chính',
    
    // Photo Tips
    photoTips: 'Mẹo Chụp Ảnh',
    tipGoodLighting: 'Sử dụng ánh sáng tốt cho ảnh rõ nét',
    tipMultipleAngles: 'Chụp ảnh từ nhiều góc độ',
    tipShowDefects: 'Hiển thị rõ các khuyết điểm hoặc hao mòn',
    tipHighResolution: 'Sử dụng độ phân giải cao để chất lượng tốt hơn',
    
    // Pricing
    price: 'Giá',
    priceGuideline: 'Đặt giá cạnh tranh dựa trên tình trạng và giá thị trường',
    selectLocation: 'Chọn vị trí của bạn',
    
    // Tags
    tags: 'Thẻ',
    addTagsPlaceholder: 'Thêm thẻ để giúp người mua tìm thấy sản phẩm...',
    tagsHelpText: 'Nhấn Enter hoặc dấu phẩy để thêm thẻ. Sử dụng từ khóa có liên quan.',
    
    // Contact
    preferredContact: 'Phương Thức Liên Hệ Ưa Thích',
    teamsDescription: 'Người mua sẽ liên hệ với bạn qua chat Microsoft Teams',
    
    // Review
    listingPreview: 'Xem Trước Bài Đăng',
    readyToPublish: 'Sẵn Sàng Xuất Bản',
    publishDescription: 'Bài đăng của bạn sẽ hiển thị cho tất cả nhân viên NAB ngay sau khi xuất bản.',
    agreeTerms: 'Tôi đồng ý với Điều Khoản Dịch Vụ và Hướng Dẫn Cộng Đồng NAB Market',
    emailNotificationsInquiries: 'Gửi thông báo email cho tôi về các yêu cầu và cập nhật',
    
    // Actions
    previous: 'Trước',
    next: 'Tiếp',
    publishing: 'Đang xuất bản...',
    publishListing: 'Xuất Bản Bài Đăng',
    listingCreatedSuccess: 'Bài đăng đã được tạo thành công! Nó sẽ được xem xét và xuất bản sớm.',
    
    // Common Actions
    save: 'Lưu',
    cancel: 'Hủy',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    view: 'Xem',
    share: 'Chia sẻ',
    
    // Additional Login & Navigation
    backToHome: 'Quay về Trang chủ',
    myProfile: 'Hồ sơ của tôi',
    settings: 'Cài đặt',
    signOut: 'Đăng xuất',
    sellItem: 'Bán sản phẩm',
    seller: 'Người bán',
    buyer: 'Người mua',
    
    // Product Detail
    sellerInformation: 'Thông tin người bán',
    safetyReminder: 'Lời nhắc an toàn',
    safetyMessage: 'Luôn gặp mặt ở nơi công cộng an toàn và kiểm tra sản phẩm trước khi mua.',
    contactSellerDescription: 'Bắt đầu cuộc trò chuyện về sản phẩm này',
    openTeamsChat: 'Mở Teams Chat',
    shareItem: 'Chia sẻ sản phẩm',
    shareDescription: 'Chia sẻ sản phẩm này với đồng nghiệp',
    
    // Wishlist
    myWishlist: 'Danh sách yêu thích',
    savedItems: 'Sản phẩm đã lưu',
    wishlistDescription: 'Theo dõi các sản phẩm bạn yêu thích và nhận thông báo khi giá thay đổi',
    totalItems: 'Tổng sản phẩm',
    totalValue: 'Tổng giá trị',
    avgPrice: 'Giá trung bình',
    priceDrops: 'Giảm giá',
    searchWishlist: 'Tìm kiếm trong danh sách yêu thích...',
    filters: 'Bộ lọc',
    dateAddedNewest: 'Ngày thêm (Mới nhất)',
    dateAddedOldest: 'Ngày thêm (Cũ nhất)',
    priceLowHigh: 'Giá: Thấp đến Cao',
    priceHighLow: 'Giá: Cao đến Thấp',
    nameAZ: 'Tên: A-Z',
    itemsSelected: '{count} sản phẩm đã chọn',
    removeSelected: 'Xóa đã chọn',
    shareSelected: 'Chia sẻ đã chọn',
    selectAll: 'Chọn tất cả',
    itemsShowing: 'Hiển thị {showing} trong {total} sản phẩm',
    noSearchResults: 'Không tìm thấy kết quả',
    noSearchResultsDesc: 'Thử điều chỉnh từ khóa tìm kiếm hoặc duyệt theo danh mục',
    clearSearch: 'Xóa tìm kiếm',
    emptyWishlist: 'Danh sách yêu thích trống',
    emptyWishlistDesc: 'Bắt đầu thêm các sản phẩm bạn yêu thích để theo dõi chúng ở đây',
    startBrowsing: 'Bắt đầu duyệt',
    added: 'Đã thêm',
    today: 'Hôm nay',
    yesterday: 'Hôm qua',
    daysAgo: '{days} ngày trước',
    weeksAgo: '{weeks} tuần trước',
    monthsAgo: '{months} tháng trước',
    viewItem: 'Xem sản phẩm',
    priceAlerts: 'Cảnh báo giảm giá',
    priceAlertsDesc: 'Nhận thông báo khi sản phẩm trong danh sách yêu thích giảm giá',
    enablePriceAlerts: 'Bật cảnh báo giá',
    
    // Categories
    browseCategories: 'Duyệt danh mục',
    exploreCategories: 'Khám phá danh mục',
    categoriesDescription: 'Tìm chính xác những gì bạn đang tìm kiếm trong các danh mục được tổ chức',
    sellers: 'Người bán',
    available: 'Có sẵn',
    searchCategories: 'Tìm kiếm danh mục...',
    mostPopular: 'Phổ biến nhất',
    newest: 'Mới nhất',
    items: 'Sản phẩm',
    rating: 'Đánh giá',
    subcategories: 'Danh mục con',
    viewAllInCategory: 'Xem tất cả trong {category}',
    noCategoriesFound: 'Không tìm thấy danh mục',
    noCategoriesFoundDesc: 'Thử từ khóa tìm kiếm khác',
    featuredIn: 'Nổi bật trong',
    viewAll: 'Xem tất cả',
    explore: 'Khám phá',
    viewItems: 'Xem sản phẩm',
    
    // Messages
    messages: 'Tin nhắn',
    searchConversations: 'Tìm kiếm cuộc trò chuyện...',
    all: 'Tất cả',
    unread: 'Chưa đọc',
    archived: 'Đã lưu trữ',
    noConversationsFound: 'Không tìm thấy cuộc trò chuyện',
    noMessages: 'Chưa có tin nhắn',
    tryDifferentSearch: 'Thử từ khóa tìm kiếm khác',
    startConversation: 'Liên hệ người bán để bắt đầu cuộc trò chuyện',
    selectConversation: 'Chọn cuộc trò chuyện',
    selectConversationDesc: 'Chọn cuộc trò chuyện từ danh sách để bắt đầu nhắn tin',
    browseProductsFromMessages: 'Duyệt sản phẩm',
    viewListing: 'Xem bài đăng',
    typeMessage: 'Nhập tin nhắn...',
    openInTeams: 'Mở trong Microsoft Teams',
    
    // Profile additional
    personalInformation: 'Thông tin cá nhân',
    fullName: 'Họ và tên',
    cannotChange: 'Không thể thay đổi',
    department: 'Phòng ban',
    phoneNumber: 'Số điện thoại',
    responseTime: 'Thời gian phản hồi',
    bio: 'Tiểu sử',
    bioPlaceholder: 'Nói với đồng nghiệp về bản thân bạn...',
    activityOverview: 'Tổng quan hoạt động',
    itemsSold: 'Sản phẩm đã bán',
    itemsBought: 'Sản phẩm đã mua',
    wishlistItems: 'Sản phẩm yêu thích',
    avgRating: 'Đánh giá TB',
    recentActivity: 'Hoạt động gần đây',
    sold: 'Đã bán',
    bought: 'Đã mua',
    listed: 'Đã đăng',
    saved: 'Đã lưu',
    appearance: 'Giao diện',
    darkMode: 'Chế độ tối',
    darkModeDescription: 'Chuyển đổi giữa chủ đề sáng và tối',
    language: 'Ngôn ngữ',
    languageDescription: 'Thay đổi ngôn ngữ giao diện',
    notifications: 'Thông báo',
    emailNotifications: 'Thông báo Email',
    emailNotificationsDesc: 'Nhận cập nhật email về sản phẩm của bạn',
    teamsNotifications: 'Thông báo Teams',
    teamsNotificationsDesc: 'Nhận thông báo qua Microsoft Teams',
    privacySecurity: 'Bảo mật & Riêng tư',
    profileVisibility: 'Hiển thị hồ sơ',
    profileVisibilityDesc: 'Kiểm soát ai có thể xem thông tin hồ sơ của bạn',
    dataExport: 'Xuất dữ liệu',
    dataExportDesc: 'Tải xuống bản sao dữ liệu tài khoản của bạn',
    dangerZone: 'Vùng nguy hiểm',
    deactivateAccount: 'Vô hiệu hóa tài khoản',
    deactivateAccountDesc: 'Vô hiệu hóa vĩnh viễn tài khoản của bạn'
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
    
    // Login Page
    nabMarketplace: 'NAB मार्केटप्लेस',
    secureAccessPortal: 'सुरक्षित पहुंच पोर्टल',
    chooseAccountType: 'अपना खाता प्रकार चुनें',
    selectRoleToContinue: 'सुरक्षित SSO प्रमाणीकरण के साथ जारी रखने के लिए अपनी भूमिका चुनें',
    
    // User Types
    buyerAccount: 'खरीदार खाता',
    buyerSubtitle: 'सहयोगियों से उत्पाद ब्राउज़ और खरीदें',
    sellerAccount: 'विक्रेता खाता',
    sellerSubtitle: 'अपने उत्पादों को सहयोगियों को सूचीबद्ध और बेचें',
    
    // Features
    browseProducts: 'सहयोगियों से उत्पाद ब्राउज़ करें',
    contactSellers: 'Teams के माध्यम से विक्रेताओं से संपर्क करें',
    saveWishlist: 'पसंदीदा में आइटम सेव करें',
    securePayments: 'सुरक्षित आंतरिक लेनदेन',
    listProducts: 'बिक्री के लिए उत्पाद सूचीबद्ध करें',
    manageListings: 'अपनी सूचियों को प्रबंधित करें',
    trackAnalytics: 'सूची एनालिटिक्स ट्रैक करें',
    communicateTeams: 'Teams के माध्यम से संवाद करें',
    
    // SSO
    secureSSO: 'सुरक्षित SSO',
    nabEmployees: 'केवल NAB स्टाफ',
    globalAccess: 'वैश्विक पहुंच',
    enterNabEmail: 'अपना NAB ईमेल दर्ज करें',
    ssoRedirectMessage: 'आपको सुरक्षित सिंगल साइन-ऑन पर रीडायरेक्ट किया जाएगा',
    emailAddress: 'ईमेल पता',
    nabEmailRequired: 'एक वैध @nab.com.au ईमेल पता होना चाहिए',
    continueSSO: 'SSO के साथ जारी रखें',
    redirectingSSO: 'SSO पर रीडायरेक्ट कर रहे हैं...',
    backToSelection: 'चयन पर वापस',
    
    // Azure SSO
    redirectingAzure: 'Azure AD पर रीडायरेक्ट कर रहे हैं',
    azureAuthMessage: 'कृपया पॉपअप विंडो में प्रमाणीकरण पूरा करें',
    authenticating: 'प्रमाणित कर रहे हैं...',
    signInMicrosoft: 'Microsoft के साथ साइन इन करें',
    verifyingIdentity: 'पहचान सत्यापित कर रहे हैं...',
    checkingPermissions: 'अनुमतियां जांच रहे हैं...',
    grantingAccess: 'पहुंच प्रदान कर रहे हैं...',
    
    // Authentication
    secureAuthentication: 'सुरक्षित प्रमाणीकरण',
    ssoSecurityMessage: 'आपका लॉगिन मल्टी-फैक्टर प्रमाणीकरण के साथ NAB enterprise SSO द्वारा सुरक्षित है',
    authenticationSuccess: 'प्रमाणीकरण सफल!',
    welcomeMessage: 'NAB Market में आपका स्वागत है! आप {userType} के रूप में लॉग इन हैं',
    identityVerified: 'पहचान सफलतापूर्वक सत्यापित',
    accessGranted: 'NAB Market तक पहुंच प्रदान की गई',
    sessionEstablished: 'सुरक्षित सत्र स्थापित',
    redirectingDashboard: 'डैशबोर्ड पर रीडायरेक्ट कर रहे हैं...',
    
    // Seller Page
    sellerDashboard: 'विक्रेता डैशबोर्ड',
    createNewListing: 'नई सूची बनाएं',
    shareItemsColleagues: 'अपने NAB सहयोगियों के साथ आइटम साझा और बेचें',
    activeListings: 'सक्रिय सूचियां',
    activeBuyers: 'सक्रिय खरीदार',
    avgResponseTime: 'औसत प्रतिक्रिया',
    
    // Form Steps
    basicInfo: 'मूल जानकारी',
    imagesPhotos: 'छवियां और फोटो',
    pricingDetails: 'मूल्य निर्धारण और विवरण',
    reviewPublish: 'समीक्षा और प्रकाशन',
    step: 'चरण',
    of: 'का',
    
    // Exchange
    itemForExchange: 'विनिमय के लिए आइटम',
    exchangeDescription: 'यदि आप इस आइटम को बेचने के बजाय व्यापार करना चाहते हैं तो टॉगल करें',
    whatLookingFor: 'आप क्या खोज रहे हैं?',
    exchangeForPlaceholder: 'जैसे: iPhone, laptop, furniture...',
    exchange: 'विनिमय',
    
    // Form Fields
    productTitle: 'उत्पाद शीर्षक',
    titlePlaceholder: 'जैसे: MacBook Pro 14" M3 - उत्कृष्ट स्थिति',
    category: 'श्रेणी',
    description: 'विवरण',
    descriptionPlaceholder: 'अपने आइटम के बारे में विस्तृत जानकारी प्रदान करें, स्थिति, उपयोग, बेचने का कारण, आदि सहित।',
    
    // Conditions
    likeNew: 'नए जैसा',
    excellent: 'उत्कृष्ट',
    veryGood: 'बहुत अच्छा',
    good: 'अच्छा',
    fair: 'ठीक',
    likeNewDesc: 'न्यूनतम घिसाव, उत्कृष्ट स्थिति',
    excellentDesc: 'मामूली घिसाव, बहुत अच्छी स्थिति',
    veryGoodDesc: 'कुछ घिसाव लेकिन पूर्ण रूप से काम करता है',
    goodDesc: 'सामान्य घिसाव, अच्छी स्थिति',
    fairDesc: 'भारी घिसाव लेकिन अभी भी कार्यात्मक',
    
    // Images
    productImages: 'उत्पाद छवियां',
    dragDropImages: 'यहाँ छवियां खींचें और छोड़ें',
    supportedFormats: 'PNG, JPG, WEBP प्रत्येक 5MB तक',
    selectFiles: 'फाइलें चुनें',
    imagePreview: 'छवि पूर्वावलोकन',
    mainPhoto: 'मुख्य फोटो',
    
    // Photo Tips
    photoTips: 'फोटो टिप्स',
    tipGoodLighting: 'स्पष्ट, उज्ज्वल फोटो के लिए अच्छी रोशनी का उपयोग करें',
    tipMultipleAngles: 'कई कोणों से फोटो लें',
    tipShowDefects: 'किसी भी दोष या घिसाव को स्पष्ट रूप से दिखाएं',
    tipHighResolution: 'बेहतर गुणवत्ता के लिए उच्च रिज़ॉल्यूशन का उपयोग करें',
    
    // Pricing
    price: 'मूल्य',
    priceGuideline: 'स्थिति और बाजार मूल्य के आधार पर प्रतिस्पर्धी मूल्य निर्धारित करें',
    selectLocation: 'अपना स्थान चुनें',
    
    // Tags
    tags: 'टैग',
    addTagsPlaceholder: 'खरीदारों को आपका आइटम खोजने में मदद के लिए टैग जोड़ें...',
    tagsHelpText: 'टैग जोड़ने के लिए Enter या कॉमा दबाएं। प्रासंगिक कीवर्ड का उपयोग करें।',
    
    // Contact
    preferredContact: 'पसंदीदा संपर्क विधि',
    teamsDescription: 'खरीदार Microsoft Teams चैट के माध्यम से आपसे संपर्क करेंगे',
    
    // Review
    listingPreview: 'सूची पूर्वावलोकन',
    readyToPublish: 'प्रकाशित करने के लिए तैयार',
    publishDescription: 'प्रकाशन के तुरंत बाद आपकी सूची सभी NAB कर्मचारियों को दिखाई देगी।',
    agreeTerms: 'मैं NAB Market सेवा की शर्तों और सामुदायिक दिशानिर्देशों से सहमत हूं',
    emailNotificationsInquiries: 'पूछताछ और अपडेट के लिए मुझे ईमेल सूचनाएं भेजें',
    
    // Actions
    previous: 'पिछला',
    next: 'अगला',
    publishing: 'प्रकाशित कर रहे हैं...',
    publishListing: 'सूची प्रकाशित करें',
    listingCreatedSuccess: 'सूची सफलतापूर्वक बनाई गई! इसकी समीक्षा की जाएगी और शीघ्र ही प्रकाशित की जाएगी।',
    
    // Common Actions
    save: 'सेव',
    cancel: 'रद्द',
    edit: 'संपादित',
    delete: 'हटाएं',
    view: 'देखें',
    share: 'साझा करें',
    
    // Additional Login & Navigation
    backToHome: 'होम पर वापस',
    myProfile: 'मेरी प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    signOut: 'साइन आउट',
    sellItem: 'आइटम बेचें',
    seller: 'विक्रेता',
    buyer: 'खरीदार',
    
    // Product Detail
    sellerInformation: 'विक्रेता की जानकारी',
    safetyReminder: 'सुरक्षा अनुस्मारक',
    safetyMessage: 'हमेशा सुरक्षित सार्वजनिक स्थानों पर मिलें और खरीदने से पहले वस्तुओं की जांच करें।',
    contactSellerDescription: 'इस आइटम के बारे में बातचीत शुरू करें',
    openTeamsChat: 'Teams चैट खोलें',
    shareItem: 'आइटम साझा करें',
    shareDescription: 'इस आइटम को सहयोगियों के साथ साझा करें',
    
    // Wishlist
    myWishlist: 'मेरी पसंदीदा सूची',
    savedItems: 'सेव किए गए आइटम',
    wishlistDescription: 'अपने पसंदीदा आइटम्स पर नज़र रखें और मूल्य परिवर्तन की सूचना पाएं',
    totalItems: 'कुल आइटम',
    totalValue: 'कुल मूल्य',
    avgPrice: 'औसत मूल्य',
    priceDrops: 'मूल्य गिरावट',
    searchWishlist: 'अपनी पसंदीदा सूची खोजें...',
    filters: 'फ़िल्टर',
    dateAddedNewest: 'जोड़ने की तारीख (नवीनतम)',
    dateAddedOldest: 'जोड़ने की तारीख (सबसे पुराना)',
    priceLowHigh: 'मूल्य: कम से अधिक',
    priceHighLow: 'मूल्य: अधिक से कम',
    nameAZ: 'नाम: A-Z',
    itemsSelected: '{count} आइटम चुने गए',
    removeSelected: 'चुने गए हटाएं',
    shareSelected: 'चुने गए साझा करें',
    selectAll: 'सभी चुनें',
    itemsShowing: '{total} में से {showing} आइटम दिखा रहे हैं',
    noSearchResults: 'कोई खोज परिणाम नहीं',
    noSearchResultsDesc: 'अपने खोज शब्दों को समायोजित करने की कोशिश करें या श्रेणियां ब्राउज़ करें',
    clearSearch: 'खोज साफ़ करें',
    emptyWishlist: 'आपकी पसंदीदा सूची खाली है',
    emptyWishlistDesc: 'उन आइटम्स को जोड़ना शुरू करें जिन्हें आप पसंद करते हैं',
    startBrowsing: 'ब्राउज़िंग शुरू करें',
    added: 'जोड़ा गया',
    today: 'आज',
    yesterday: 'कल',
    daysAgo: '{days} दिन पहले',
    weeksAgo: '{weeks} सप्ताह पहले',
    monthsAgo: '{months} महीने पहले',
    viewItem: 'आइटम देखें',
    priceAlerts: 'मूल्य गिरावट अलर्ट',
    priceAlertsDesc: 'जब आपकी पसंदीदा सूची में आइटम की कीमत गिरे तो सूचना पाएं',
    enablePriceAlerts: 'मूल्य अलर्ट सक्षम करें',
    
    // Categories
    browseCategories: 'श्रेणियां ब्राउज़ करें',
    exploreCategories: 'श्रेणियों का अन्वेषण करें',
    categoriesDescription: 'हमारी व्यवस्थित श्रेणियों में वह खोजें जिसकी आप तलाश कर रहे हैं',
    sellers: 'विक्रेता',
    available: 'उपलब्ध',
    searchCategories: 'श्रेणियां खोजें...',
    mostPopular: 'सबसे लोकप्रिय',
    newest: 'नवीनतम',
    items: 'आइटम',
    rating: 'रेटिंग',
    subcategories: 'उप-श्रेणियां',
    viewAllInCategory: '{category} में सभी देखें',
    noCategoriesFound: 'कोई श्रेणी नहीं मिली',
    noCategoriesFoundDesc: 'एक अलग खोज शब्द आज़माएं',
    featuredIn: 'में विशेष रुप से प्रदर्शित',
    viewAll: 'सभी देखें',
    explore: 'अन्वेषण',
    viewItems: 'आइटम देखें',
    
    // Messages
    messages: 'संदेश',
    searchConversations: 'बातचीत खोजें...',
    all: 'सभी',
    unread: 'अपठित',
    archived: 'संग्रहीत',
    noConversationsFound: 'कोई बातचीत नहीं मिली',
    noMessages: 'अभी तक कोई संदेश नहीं',
    tryDifferentSearch: 'एक अलग खोज शब्द आज़माएं',
    startConversation: 'बातचीत शुरू करने के लिए विक्रेता से संपर्क करें',
    selectConversation: 'बातचीत चुनें',
    selectConversationDesc: 'मैसेजिंग शुरू करने के लिए सूची से एक बातचीत चुनें',
    browseProductsFromMessages: 'उत्पाद ब्राउज़ करें',
    viewListing: 'सूची देखें',
    typeMessage: 'संदेश टाइप करें...',
    openInTeams: 'Microsoft Teams में खोलें',
    
    // Profile additional
    personalInformation: 'व्यक्तिगत जानकारी',
    fullName: 'पूरा नाम',
    cannotChange: 'बदला नहीं जा सकता',
    department: 'विभाग',
    phoneNumber: 'फोन नंबर',
    responseTime: 'प्रतिक्रिया समय',
    bio: 'जीवनी',
    bioPlaceholder: 'सहयोगियों को अपने बारे में बताएं...',
    activityOverview: 'गतिविधि अवलोकन',
    itemsSold: 'बेचे गए आइटम',
    itemsBought: 'खरीदे गए आइटम',
    wishlistItems: 'पसंदीदा आइटम',
    avgRating: 'औसत रेटिंग',
    recentActivity: 'हाल की गतिविधि',
    sold: 'बेचा गया',
    bought: 'खरीदा गया',
    listed: 'सूचीबद्ध',
    saved: 'सेव किया गया',
    appearance: 'दिखावट',
    darkMode: 'डार्क मोड',
    darkModeDescription: 'हल्के और गहरे थीम के बीच टॉगल करें',
    language: 'भाषा',
    languageDescription: 'इंटरफेस भाषा बदलें',
    notifications: 'सूचनाएं',
    emailNotifications: 'ईमेल सूचनाएं',
    emailNotificationsDesc: 'अपने आइटम के बारे में ईमेल अपडेट प्राप्त करें',
    teamsNotifications: 'Teams सूचनाएं',
    teamsNotificationsDesc: 'Microsoft Teams के माध्यम से सूचना पाएं',
    privacySecurity: 'गोपनीयता और सुरक्षा',
    profileVisibility: 'प्रोफ़ाइल दृश्यता',
    profileVisibilityDesc: 'नियंत्रित करें कि कौन आपकी प्रोफ़ाइल जानकारी देख सकता है',
    dataExport: 'डेटा निर्यात',
    dataExportDesc: 'अपने खाता डेटा की एक प्रति डाउनलोड करें',
    dangerZone: 'खतरा क्षेत्र',
    deactivateAccount: 'खाता निष्क्रिय करें',
    deactivateAccountDesc: 'स्थायी रूप से अपना खाता अक्षम करें'
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

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || translations.en[key] || key;
    
    // Simple parameter replacement
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  return (
    <i18nContext.Provider value={{ language, setLang, t }}>
      {children}
    </i18nContext.Provider>
  );
};