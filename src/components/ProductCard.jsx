import { useState } from 'react';
import { 
  Heart, 
  Eye, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star,
  ExternalLink,
  Share2,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';

const ProductCard = ({ product, onContactSeller, onToggleWishlist, isWishlisted = false, onProductClick }) => {
  const { t } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleContactSeller = (e) => {
    e.stopPropagation();
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${product.seller.teamsId}`;
    window.open(teamsUrl, '_blank');
    if (onContactSeller) {
      onContactSeller(product.id);
    }
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

  return (
    <div 
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-slate-900/20 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800/50 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onProductClick && onProductClick(product)}
    >
      
      {/* Image section */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-slate-700">
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
              )}
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
              />
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-8 w-8 text-gray-500 dark:text-slate-400" />
                </div>
                <span className="text-sm text-gray-500 dark:text-slate-400">Image unavailable</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
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
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg hover:scale-110 ${
              isWishlisted 
                ? 'bg-red-600 text-white shadow-red-500/25' 
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md transition-all duration-200 shadow-lg hover:scale-110"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Quick stats overlay */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-white text-xs">
          <div className="flex items-center space-x-1 bg-black/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <Eye className="h-3 w-3" />
            <span className="font-medium">{product.views}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Title and price */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.currency}
              </span>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getConditionColor(product.condition)}`}>
              {product.condition}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Seller info */}
        <div className="flex items-center space-x-3 mb-5 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600/50">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {product.seller.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
              <CheckCircle2 className="h-2 w-2 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                {product.seller.name}
              </p>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {product.seller.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{product.seller.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{product.seller.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-600">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 sm:gap-0">
          <button
            onClick={handleContactSeller}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">{t('contactSeller')}</span>
            <span className="sm:hidden">{t('contact')}</span>
            <ExternalLink className="h-3 w-3" />
          </button>
          
          <button 
            className="px-4 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 font-medium min-h-[44px] sm:w-auto w-20"
            onClick={(e) => {
              e.stopPropagation();
              onProductClick && onProductClick(product);
            }}
          >
            <span className="hidden sm:inline">Details</span>
            <span className="sm:hidden">View</span>
          </button>
        </div>

        {/* Posted time and department */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-slate-700">
          <span className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Posted {formatTimeAgo(product.postedDate)}</span>
          </span>
          <span className="font-medium">{product.seller.department}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;