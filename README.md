
## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Multi-Language Support**: Available in English, Vietnamese, and Hindi
- **Product Management**: Browse, search, filter, and sort products
- **Categories**: Organized product categories with visual icons
- **Wishlist**: Save favorite products for later
- **MS Teams Integration**: Direct contact with sellers via Microsoft Teams
- **Advanced Filtering**: Filter by price, condition, location, and date
- **Smooth Animations**: Modern UI with smooth transitions and animations
- **Accessibility**: Built with accessibility best practices
- **Performance Optimized**: Fast loading with modern optimization techniques

## 🛠️ Technologies Used

- **React 19**: Latest React with modern features
- **Tailwind CSS 4**: Utility-first CSS framework with 
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons
- **Headless UI**: Unstyled, accessible UI components
- **ESLint**: Code linting for consistent code quality

## 📱 Mobile-First Design

This application is designed with mobile users in mind:
- Touch-friendly interface with appropriate touch targets
- Swipe gestures and smooth scrolling
- Bottom navigation for easy thumb access
- Optimized images and performance for mobile devices
- Safe area support for devices with notches

## 🎨 abc Brand Compliance

The design follows abc's brand guidelines:
- Official abc red color palette (#D50000)
- Consistent typography and spacing
- Professional, enterprise-grade UI components
- Accessibility compliance for inclusive design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd abc-market
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Install additional dependencies**
   ```bash
   bun install lucide-react @headlessui/react
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Build for production**
   ```bash
   bun run build
   ```

6. **Preview production build**
   ```bash
   bun run preview
   ```

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Main navigation header
│   ├── Footer.jsx       # Footer with mobile bottom nav
│   ├── HomePage.jsx     # Main homepage component
│   ├── ProductCard.jsx  # Individual product display
│   ├── Categories.jsx   # Product categories
│   └── FilterSort.jsx   # Filtering and sorting
├── contexts/            # React contexts
│   ├── ThemeContext.jsx # Dark/light mode management
│   └── i18nContext.jsx  # Internationalization
├── data/               # Mock data and constants
│   └── mockData.js     # Sample product data
├── utils/              # Utility functions
│   └── index.js        # Helper functions
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🌐 Internationalization

The app supports three languages:
- **English (en)**: Default language
- **Vietnamese (vi)**: For Vietnamese-speaking users
- **Hindi (hi)**: For Hindi-speaking users

Language preferences are automatically saved and restored on subsequent visits.

## 🎯 Key Features

### Product Management
- **Browse Products**: View all available products in a responsive grid
- **Search**: Real-time search with debounced input
- **Categories**: Filter products by category (Electronics, Furniture, etc.)
- **Advanced Filters**: Filter by price range, condition, location, and date posted
- **Sorting**: Sort by newest, price, popularity, and alphabetical order

### User Experience
- **Wishlist**: Save products for later viewing
- **MS Teams Integration**: One-click contact with sellers via Teams
- **Responsive Design**: Seamless experience across all device sizes
- **Fast Loading**: Optimized performance with lazy loading and efficient rendering

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=abc Market
VITE_MS_TEAMS_BASE_URL=https://teams.microsoft.com
VITE_API_BASE_URL=http://localhost:3001/api
```

### Tailwind Configuration
The Tailwind configuration includes:
- Custom abc brand colors
- Mobile-first breakpoints
- Custom animations and transitions
- Accessibility utilities
- Glass morphism effects

## 📱 Mobile Navigation

The app features a mobile-optimized bottom navigation:
- **Home**: Main product listings
- **Search**: Advanced search functionality
- **Sell**: Quick access to create new listings
- **Wishlist**: Saved products with badge count
- **Profile**: User settings and preferences

## 🚀 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Images**: Responsive images with proper sizing
- **Efficient Rendering**: Optimized React rendering with proper key usage
- **Caching**: Smart caching strategies for better performance

## 🔒 Security Considerations

- **Input Validation**: All user inputs are properly validated
- **XSS Prevention**: Sanitized content rendering
- **Secure Communications**: HTTPS-only in production
- **Privacy**: No sensitive data stored in localStorage

## 🧪 Testing

Run the linting checks:
```bash
bun run lint
```

## 📈 Analytics & Monitoring

The app includes basic performance monitoring:
- Core Web Vitals tracking
- Error boundary for graceful error handling
- Console logging for development debugging

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Ensure accessibility compliance
3. Test on multiple devices and browsers
4. Update documentation as needed

