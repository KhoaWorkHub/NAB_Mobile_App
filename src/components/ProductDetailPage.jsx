import { useState } from 'react';
import { 
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
  Star,
  MapPin,
  Clock,
  Package,
  Shield,
  CheckCircle2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Flag,
  MoreHorizontal,
  Calendar,
  User,
  Award,
  TrendingUp
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';

const ProductDetailPage = ({ product, onNavigate }) => {
  const { t } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleContactSeller = () => {
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${product.seller.teamsId}`;
    window.open(teamsUrl, '_blank');
    setShowContactModal(false);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'like new':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800';
      case 'excellent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800';
      case 'very good':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800';
      case 'good':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 border border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200 border border-gray-200 dark:border-gray-700';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">{t('backToHome')}</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Flag className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-slate-700 rounded-2xl overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* Navigation buttons */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Featured badge */}
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-lg hover:scale-110 ${
                    isWishlisted 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnail gallery */}
              {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-800'
                          : 'border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {product.title}
                  </h1>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {formatPrice(product.price)}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getConditionColor(product.condition)}`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{product.views}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Views</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatTimeAgo(product.postedDate)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Posted</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center justify-center mb-1">
                    <Package className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {t(product.category)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Category</div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('description')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('tags')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t('sellerInformation')}
              </h3>
              
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {product.seller.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {product.seller.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.seller.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{product.seller.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Responds within {product.seller.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>{product.seller.department}</span>
                    </div>
                  </div>

                  {/* Seller stats */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">23</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Items Sold</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('contactSeller')}</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 font-medium ${
                    isWishlisted
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}</span>
                </button>
                
                <button
                  onClick={() => setShowShareModal(true)}
                  className="py-3 px-4 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{t('share')}</span>
                </button>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                    {t('safetyReminder')}
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {t('safetyMessage')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('contactSeller')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('contactSellerDescription')}
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleContactSeller}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('openTeamsChat')}</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setShowContactModal(false)}
                className="w-full py-3 px-4 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('shareItem')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('shareDescription')}
              </p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                <span>Share via Teams</span>
              </button>
              
              <button className="w-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-medium transition-colors">
                Copy Link
              </button>
              
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-3 px-4 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;