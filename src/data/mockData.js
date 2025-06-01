export const mockProducts = [
  {
    id: 1,
    title: 'MacBook Pro 14" M3',
    description: 'Excellent condition MacBook Pro with M3 chip, 16GB RAM, 512GB SSD',
    price: 2800,
    currency: 'AUD',
    condition: 'Like New',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'John Smith',
      department: 'Technology',
      location: 'Melbourne',
      rating: 4.8,
      responseTime: '< 1 hour',
      teamsId: 'john.smith@nab.com.au'
    },
    postedDate: '2025-05-28',
    isFeatured: true,
    views: 45,
    tags: ['apple', 'laptop', 'm3', 'professional']
  },
  {
    id: 2,
    title: 'IKEA Standing Desk',
    description: 'Adjustable standing desk in great condition. Perfect for home office setup.',
    price: 350,
    currency: 'AUD',
    condition: 'Good',
    category: 'furniture',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Sarah Johnson',
      department: 'Operations',
      location: 'Sydney',
      rating: 4.9,
      responseTime: '< 2 hours',
      teamsId: 'sarah.johnson@nab.com.au'
    },
    postedDate: '2025-05-27',
    isFeatured: true,
    views: 32,
    tags: ['ikea', 'desk', 'standing', 'office', 'furniture']
  },
  {
    id: 3,
    title: 'Canon EOS R6 Camera',
    description: 'Professional camera with 2 lenses. Used for photography hobby, selling due to upgrade.',
    price: 1800,
    currency: 'AUD',
    condition: 'Excellent',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Mike Chen',
      department: 'Marketing',
      location: 'Brisbane',
      rating: 4.7,
      responseTime: '< 3 hours',
      teamsId: 'mike.chen@nab.com.au'
    },
    postedDate: '2025-05-26',
    isFeatured: true,
    views: 67,
    tags: ['canon', 'camera', 'photography', 'lens', 'professional']
  },
  {
    id: 4,
    title: 'Business Suits Collection',
    description: 'Collection of 5 business suits, size 40R. Perfect for professional meetings.',
    price: 450,
    currency: 'AUD',
    condition: 'Good',
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'David Wilson',
      department: 'Corporate Banking',
      location: 'Melbourne',
      rating: 4.6,
      responseTime: '< 4 hours',
      teamsId: 'david.wilson@nab.com.au'
    },
    postedDate: '2025-05-25',
    isFeatured: false,
    views: 23,
    tags: ['suits', 'business', 'formal', 'professional', 'collection']
  },
  {
    id: 5,
    title: 'Programming Books Bundle',
    description: 'Collection of 15 programming books covering Python, JavaScript, React, and more.',
    price: 120,
    currency: 'AUD',
    condition: 'Good',
    category: 'books',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Lisa Rodriguez',
      department: 'Technology',
      location: 'Sydney',
      rating: 4.9,
      responseTime: '< 1 hour',
      teamsId: 'lisa.rodriguez@nab.com.au'
    },
    postedDate: '2025-05-24',
    isFeatured: false,
    views: 41,
    tags: ['books', 'programming', 'tech', 'learning', 'bundle']
  },
  {
    id: 6,
    title: 'Mountain Bike',
    description: 'Trek mountain bike, 21-speed, great for weekend adventures. Well maintained.',
    price: 680,
    currency: 'AUD',
    condition: 'Very Good',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Tom Anderson',
      department: 'Risk Management',
      location: 'Perth',
      rating: 4.8,
      responseTime: '< 2 hours',
      teamsId: 'tom.anderson@nab.com.au'
    },
    postedDate: '2025-05-23',
    isFeatured: false,
    views: 38,
    tags: ['bike', 'mountain', 'trek', 'sports', 'outdoor']
  },
  {
    id: 7,
    title: 'Dining Table Set',
    description: '6-seater dining table with chairs. Solid wood construction, perfect for families.',
    price: 520,
    currency: 'AUD',
    condition: 'Good',
    category: 'furniture',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Emma Thompson',
      department: 'HR',
      location: 'Adelaide',
      rating: 4.7,
      responseTime: '< 3 hours',
      teamsId: 'emma.thompson@nab.com.au'
    },
    postedDate: '2025-05-22',
    isFeatured: false,
    views: 28,
    tags: ['dining', 'table', 'chairs', 'wood', 'family']
  },
  {
    id: 8,
    title: 'iPhone 15 Pro',
    description: 'Like new iPhone 15 Pro, 256GB, with case and screen protector. Original box included.',
    price: 1650,
    currency: 'AUD',
    condition: 'Like New',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1696446702738-177c293ac982?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop'
    ],
    seller: {
      name: 'Alex Kumar',
      department: 'Digital Banking',
      location: 'Melbourne',
      rating: 4.9,
      responseTime: '< 1 hour',
      teamsId: 'alex.kumar@nab.com.au'
    },
    postedDate: '2025-05-30',
    isFeatured: true,
    views: 89,
    tags: ['iphone', 'apple', 'smartphone', 'pro', '256gb']
  }
];

export const mockCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    count: 156
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: 'Armchair',
    count: 89
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: 'Shirt',
    count: 234
  },
  {
    id: 'books',
    name: 'Books',
    icon: 'Book',
    count: 67
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Bike',
    count: 43
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: 'Home',
    count: 78
  }
];