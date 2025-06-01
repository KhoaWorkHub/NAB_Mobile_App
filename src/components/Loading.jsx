import { Loader2 } from "lucide-react";

// Main loading spinner
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Loader2
      className={`animate-spin text-red-600 dark:text-red-400 ${sizeClasses[size]} ${className}`}
    />
  );
};

// Skeleton loading for product cards
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title and price */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>

        {/* Seller info */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1" />
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex space-x-1 mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Bottom info */}
        <div className="mt-3 flex justify-between">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

// Skeleton for category items
export const CategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12" />
    </div>
  );
};

// Page loading overlay
export const PageLoading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4 mx-auto" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

// Inline loading for buttons
export const ButtonLoading = ({ children, loading = false, ...props }) => {
  return (
    <button {...props} disabled={loading || props.disabled}>
      <div className="flex items-center justify-center space-x-2">
        {loading && <LoadingSpinner size="sm" />}
        <span>{children}</span>
      </div>
    </button>
  );
};

// Loading dots animation
export const LoadingDots = ({ className = "" }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-bounce" />
      <div
        className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  );
};

// Grid skeleton for multiple product cards
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Categories row skeleton
export const CategoriesRowSkeleton = () => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-20 h-20 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      ))}
    </div>
  );
};

// Search results skeleton
export const SearchResultsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Filter bar skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-20 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
      </div>

      {/* Results grid */}
      <ProductGridSkeleton count={4} />
    </div>
  );
};

// Empty state component
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon className="h-12 w-12 text-gray-400" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action}
    </div>
  );
};

export default {
  LoadingSpinner,
  ProductCardSkeleton,
  CategorySkeleton,
  PageLoading,
  ButtonLoading,
  LoadingDots,
  ProductGridSkeleton,
  CategoriesRowSkeleton,
  SearchResultsSkeleton,
  EmptyState,
};
