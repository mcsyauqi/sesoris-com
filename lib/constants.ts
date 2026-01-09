export const SITE_CONFIG = {
  name: 'Sesoris',
  tagline: 'Do It With Ease',
  description: 'Your one-stop shop for quality products at unbeatable prices',
  url: 'https://sesoris.com',
  email: 'hello@sesoris.com',
  phone: '+1 (555) 123-4567',
  social: {
    facebook: 'https://facebook.com/sesoris',
    instagram: 'https://instagram.com/sesoris',
    twitter: 'https://twitter.com/sesoris',
    youtube: 'https://youtube.com/sesoris',
  },
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  shop: {
    categories: [
      { label: 'Home & Living', href: '/category/home-living', icon: 'home', count: 124 },
      { label: 'Kitchen & Dining', href: '/category/kitchen-dining', icon: 'utensils', count: 86 },
      { label: 'Tools & Gadgets', href: '/category/tools-gadgets', icon: 'wrench', count: 67 },
      { label: 'Gift Sets', href: '/category/gift-sets', icon: 'gift', count: 93 },
      { label: 'Personal Care', href: '/category/personal-care', icon: 'sparkles', count: 45 },
      { label: 'Tech Accessories', href: '/category/tech-accessories', icon: 'smartphone', count: 78 },
    ],
    collections: [
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'On Sale', href: '/collections/on-sale' },
      { label: 'Gift Sets', href: '/collections/gift-sets' },
    ],
  },
  footer: {
    shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'On Sale', href: '/collections/on-sale' },
      { label: 'Gift Cards', href: '/gift-cards' },
    ],
    help: [
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Settings', href: '/cookies' },
    ],
  },
} as const;

export const TRUST_BADGES = [
  {
    icon: 'truck',
    title: 'Free Shipping',
    description: 'On orders $50+',
  },
  {
    icon: 'refresh-cw',
    title: 'Easy Returns',
    description: '30-day returns',
  },
  {
    icon: 'shield-check',
    title: 'Secure Payment',
    description: '100% protected',
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Always here to help',
  },
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
] as const;

export const ANNOUNCEMENT_MESSAGES = [
  'Free Shipping on Orders Over $50',
  'Easy 30-Day Returns',
  'New Arrivals - Shop Now!',
  'Get 10% Off Your First Order',
] as const;

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Gift Your Loved Ones',
    subtitle: 'Perfect Presents',
    description: 'The perfect presents for everyone you care about. Quality products, unbeatable prices.',
    image: '/images/hero/hero-1.jpg',
    ctaPrimary: { label: 'Shop Now', href: '/shop' },
    ctaSecondary: { label: 'View Collections', href: '/collections' },
  },
  {
    id: 'slide-2',
    title: 'New Arrivals',
    subtitle: 'Fresh Finds',
    description: 'Discover our latest collection of curated products designed for modern living.',
    image: '/images/hero/hero-2.jpg',
    ctaPrimary: { label: 'Explore New', href: '/collections/new-arrivals' },
    ctaSecondary: { label: 'Learn More', href: '/about' },
  },
  {
    id: 'slide-3',
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    description: 'Limited time offer on selected items. Dont miss out on these amazing deals!',
    image: '/images/hero/hero-3.jpg',
    ctaPrimary: { label: 'Shop Sale', href: '/collections/on-sale' },
  },
] as const;

export const PAYMENT_METHODS = [
  'visa',
  'mastercard',
  'amex',
  'paypal',
  'applepay',
  'googlepay',
] as const;

export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 0, duration: '5-7 days' },
  { id: 'express', name: 'Express Shipping', price: 9.99, duration: '2-3 days' },
  { id: 'next-day', name: 'Next Day Delivery', price: 19.99, duration: '1 day' },
] as const;

export const TAX_RATE = 0.08;
export const FREE_SHIPPING_THRESHOLD = 50;
