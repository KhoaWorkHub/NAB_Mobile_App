import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Plus, 
  DollarSign, 
  Package, 
  MapPin, 
  Tag, 
  Camera, 
  Eye, 
  Save, 
  ArrowRight,
  Check,
  Image as ImageIcon,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Shield
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';
import { mockCategories } from '../data/mockData';

const SellerPage = () => {
  const { t } = useI18n();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'AUD',
    condition: '',
    category: '',
    location: '',
    tags: [],
    images: [],
    contactMethod: 'teams',
    isExchange: false,
    exchangeFor: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: t('basicInfo'), icon: FileText },
    { id: 2, title: t('imagesPhotos'), icon: Camera },
    { id: 3, title: t('pricingDetails'), icon: DollarSign },
    { id: 4, title: t('reviewPublish'), icon: Eye }
  ];

  const conditions = [
    { value: 'like new', label: t('likeNew'), color: 'emerald', description: t('likeNewDesc') },
    { value: 'excellent', label: t('excellent'), color: 'blue', description: t('excellentDesc') },
    { value: 'very good', label: t('veryGood'), color: 'amber', description: t('veryGoodDesc') },
    { value: 'good', label: t('good'), color: 'orange', description: t('goodDesc') },
    { value: 'fair', label: t('fair'), color: 'gray', description: t('fairDesc') }
  ];

  const locations = [
    'Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 
    'Canberra', 'Darwin', 'Hobart', 'Gold Coast', 'Newcastle'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 5 - formData.images.length).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim().toLowerCase()]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Show success message or redirect
    alert(t('listingCreatedSuccess'));
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category && formData.condition;
      case 2:
        return formData.images.length > 0;
      case 3:
        return formData.price && formData.location;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-800 dark:from-slate-950 dark:via-red-950 dark:to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">{t('sellerDashboard')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('createNewListing')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {t('shareItemsColleagues')}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">1.2k+</div>
                <div className="text-sm text-gray-300">{t('activeListings')}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">850+</div>
                <div className="text-sm text-gray-300">{t('activeBuyers')}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">2h</div>
                <div className="text-sm text-gray-300">{t('avgResponseTime')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg' 
                    : currentStep === step.id
                      ? 'bg-white dark:bg-slate-800 border-red-600 text-red-600 shadow-lg'
                      : 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-colors ${
                    currentStep > step.id ? 'bg-red-600' : 'bg-gray-200 dark:bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {steps.find(s => s.id === currentStep)?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('step')} {currentStep} {t('of')} {steps.length}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="p-8 space-y-8">
              {/* Exchange Toggle */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
                      {t('itemForExchange')}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {t('exchangeDescription')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isExchange}
                      onChange={(e) => handleInputChange('isExchange', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {formData.isExchange && (
                  <div>
                    <label className="block text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                      {t('whatLookingFor')}
                    </label>
                    <input
                      type="text"
                      value={formData.exchangeFor}
                      onChange={(e) => handleInputChange('exchangeFor', e.target.value)}
                      placeholder={t('exchangeForPlaceholder')}
                      className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('productTitle')} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={t('titlePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  maxLength={100}
                />
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {formData.title.length}/100
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('category')} *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleInputChange('category', category.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.category === category.id
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : 'border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 bg-white dark:bg-slate-700'
                      }`}
                    >
                      <div className="text-lg mb-1">{category.icon}</div>
                      <div className="font-medium text-sm">{t(category.id)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('condition')} *
                </label>
                <div className="space-y-3">
                  {conditions.map((condition) => (
                    <label
                      key={condition.value}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.condition === condition.value
                          ? `border-${condition.color}-500 bg-${condition.color}-50 dark:bg-${condition.color}-900/20`
                          : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 bg-white dark:bg-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={condition.value}
                        checked={formData.condition === condition.value}
                        onChange={(e) => handleInputChange('condition', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {condition.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {condition.description}
                        </div>
                      </div>
                      {formData.condition === condition.value && (
                        <Check className={`h-5 w-5 text-${condition.color}-600`} />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('description')} *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('descriptionPlaceholder')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                  maxLength={2000}
                />
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {formData.description.length}/2000
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {currentStep === 2 && (
            <div className="p-8 space-y-8">
              
              {/* Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  {t('productImages')} * ({formData.images.length}/5)
                </label>
                
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-600 bg-gray-50 dark:bg-slate-700'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={formData.images.length >= 5}
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {t('dragDropImages')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('supportedFormats')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      disabled={formData.images.length >= 5}
                    >
                      {t('selectFiles')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t('imagePreview')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-gray-200 dark:border-slate-600"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                          <button
                            onClick={() => removeImage(image.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg font-medium">
                            {t('mainPhoto')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-3 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  {t('photoTips')}
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• {t('tipGoodLighting')}</li>
                  <li>• {t('tipMultipleAngles')}</li>
                  <li>• {t('tipShowDefects')}</li>
                  <li>• {t('tipHighResolution')}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="p-8 space-y-8">
              
              {/* Price */}
              {!formData.isExchange && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('price')} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-20 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">AUD</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {t('priceGuideline')}
                  </p>
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('location')} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all appearance-none"
                  >
                    <option value="">{t('selectLocation')}</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tags')} ({formData.tags.length}/10)
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={t('addTagsPlaceholder')}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          addTag(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      disabled={formData.tags.length >= 10}
                    />
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm border border-red-200 dark:border-red-800"
                        >
                          <span>#{tag}</span>
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {t('tagsHelpText')}
                </p>
              </div>

              {/* Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('preferredContact')}
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-200 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="teams"
                      checked={formData.contactMethod === 'teams'}
                      onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Microsoft Teams
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('teamsDescription')}
                      </div>
                    </div>
                    <Shield className="h-5 w-5 text-green-500" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="p-8 space-y-8">
              
              {/* Preview Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  {t('listingPreview')}
                </h3>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                  {/* Images */}
                  {formData.images.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={formData.images[0].url}
                        alt={formData.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {formData.images.length > 1 && (
                        <div className="flex space-x-2 mt-2">
                          {formData.images.slice(1, 4).map((image, index) => (
                            <img
                              key={image.id}
                              src={image.url}
                              alt={`${formData.title} ${index + 2}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                          {formData.images.length > 4 && (
                            <div className="w-16 h-16 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                              +{formData.images.length - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {formData.title}
                      </h4>
                      {formData.isExchange ? (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                          {t('exchange')}
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                          ${formData.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {formData.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded text-xs font-medium">
                        {conditions.find(c => c.value === formData.condition)?.label}
                      </span>
                      <span className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium">
                        {t(formData.category)}
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                        📍 {formData.location}
                      </span>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submission Form */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-200 mb-3 flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  {t('readyToPublish')}
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  {t('publishDescription')}
                </p>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 rounded" required />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {t('agreeTerms')}
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 rounded" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {t('emailNotifications')}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="border-t border-gray-200 dark:border-slate-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {t('previous')}
              </button>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentStep}/{steps.length}
              </div>
              
              {currentStep < steps.length ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid(currentStep)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium flex items-center space-x-2"
                >
                  <span>{t('next')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep) || isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('publishing')}</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{t('publishListing')}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;