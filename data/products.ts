import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Smart Fingerprint Lock',
    slug: 'smart-fingerprint-lock',
    description: 'Secure your belongings with this advanced fingerprint lock. Features up to 20 fingerprint storage, USB rechargeable battery that lasts up to 12 months, and a sleek compact design perfect for lockers, luggage, and more.',
    shortDescription: 'Advanced biometric padlock for ultimate security',
    price: 29.99,
    compareAtPrice: 39.99,
    images: [
      '/images/products/fingerprint-lock-1.jpg',
      '/images/products/fingerprint-lock-2.jpg',
      '/images/products/fingerprint-lock-3.jpg',
    ],
    category: {
      id: 'cat_tools',
      name: 'Tools & Gadgets',
      slug: 'tools-gadgets',
      description: 'Innovative tools and gadgets for everyday life',
      image: '/images/categories/tools-gadgets.jpg',
      productCount: 67,
    },
    tags: ['security', 'smart', 'bestseller'],
    rating: 4.8,
    reviewCount: 125,
    stock: 50,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prod_002',
    name: 'Bamboo Desk Organizer',
    slug: 'bamboo-desk-organizer',
    description: 'Keep your workspace tidy with this elegant bamboo desk organizer. Features multiple compartments for pens, phones, and office supplies. Made from sustainable bamboo with a natural finish.',
    shortDescription: 'Sustainable bamboo organizer for a tidy workspace',
    price: 24.99,
    compareAtPrice: 34.99,
    images: [
      '/images/products/desk-organizer-1.jpg',
      '/images/products/desk-organizer-2.jpg',
    ],
    category: {
      id: 'cat_home',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Beautiful products for your home',
      image: '/images/categories/home-living.jpg',
      productCount: 124,
    },
    tags: ['eco-friendly', 'office', 'organization'],
    rating: 4.6,
    reviewCount: 89,
    stock: 75,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'prod_003',
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Stay hydrated in style with our double-walled stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    shortDescription: 'Insulated water bottle for all-day hydration',
    price: 19.99,
    images: [
      '/images/products/water-bottle-1.jpg',
      '/images/products/water-bottle-2.jpg',
    ],
    category: {
      id: 'cat_kitchen',
      name: 'Kitchen & Dining',
      slug: 'kitchen-dining',
      description: 'Essential kitchen and dining products',
      image: '/images/categories/kitchen-dining.jpg',
      productCount: 86,
    },
    tags: ['eco-friendly', 'kitchen', 'hydration'],
    variants: [
      { id: 'var_001', name: 'Black', type: 'color', value: '#000000', stock: 30 },
      { id: 'var_002', name: 'Silver', type: 'color', value: '#C0C0C0', stock: 25 },
      { id: 'var_003', name: 'Navy', type: 'color', value: '#000080', stock: 20 },
    ],
    rating: 4.7,
    reviewCount: 203,
    stock: 75,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'prod_004',
    name: 'LED Reading Lamp',
    slug: 'led-reading-lamp',
    description: 'Illuminate your reading with our adjustable LED lamp. Features 3 brightness levels, flexible gooseneck design, and USB charging port. Perfect for bedside or desk use.',
    shortDescription: 'Adjustable LED lamp with 3 brightness levels',
    price: 34.99,
    compareAtPrice: 44.99,
    images: [
      '/images/products/reading-lamp-1.jpg',
      '/images/products/reading-lamp-2.jpg',
    ],
    category: {
      id: 'cat_home',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Beautiful products for your home',
      image: '/images/categories/home-living.jpg',
      productCount: 124,
    },
    tags: ['lighting', 'home', 'reading'],
    rating: 4.5,
    reviewCount: 67,
    stock: 40,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'prod_005',
    name: 'Premium Gift Box Set',
    slug: 'premium-gift-box-set',
    description: 'The perfect gift for any occasion. This beautifully curated gift box includes a scented candle, bath bombs, and premium chocolates, all presented in an elegant keepsake box.',
    shortDescription: 'Curated luxury gift set for any occasion',
    price: 49.99,
    compareAtPrice: 65.99,
    images: [
      '/images/products/gift-box-1.jpg',
      '/images/products/gift-box-2.jpg',
      '/images/products/gift-box-3.jpg',
    ],
    category: {
      id: 'cat_gifts',
      name: 'Gift Sets',
      slug: 'gift-sets',
      description: 'Curated gift sets for every occasion',
      image: '/images/categories/gift-sets.jpg',
      productCount: 93,
    },
    tags: ['gift', 'premium', 'bestseller'],
    rating: 4.9,
    reviewCount: 156,
    stock: 25,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    createdAt: '2024-01-05T10:00:00Z',
  },
  {
    id: 'prod_006',
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Charge your devices effortlessly with our sleek wireless charging pad. Compatible with all Qi-enabled devices, features fast charging technology and LED indicator.',
    shortDescription: 'Fast wireless charging for all Qi devices',
    price: 22.99,
    images: [
      '/images/products/charging-pad-1.jpg',
      '/images/products/charging-pad-2.jpg',
    ],
    category: {
      id: 'cat_tech',
      name: 'Tech Accessories',
      slug: 'tech-accessories',
      description: 'Modern tech accessories',
      image: '/images/categories/tech-accessories.jpg',
      productCount: 78,
    },
    tags: ['tech', 'charging', 'wireless'],
    rating: 4.4,
    reviewCount: 178,
    stock: 60,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'prod_007',
    name: 'Natural Bamboo Cutting Board',
    slug: 'natural-bamboo-cutting-board',
    description: 'Upgrade your kitchen with this premium bamboo cutting board. Features juice grooves, easy-grip handles, and a reversible design. Naturally antibacterial and knife-friendly.',
    shortDescription: 'Premium bamboo cutting board with juice grooves',
    price: 27.99,
    compareAtPrice: 35.99,
    images: [
      '/images/products/cutting-board-1.jpg',
      '/images/products/cutting-board-2.jpg',
    ],
    category: {
      id: 'cat_kitchen',
      name: 'Kitchen & Dining',
      slug: 'kitchen-dining',
      description: 'Essential kitchen and dining products',
      image: '/images/categories/kitchen-dining.jpg',
      productCount: 86,
    },
    tags: ['kitchen', 'eco-friendly', 'cooking'],
    variants: [
      { id: 'var_004', name: 'Small', type: 'size', value: 'S', stock: 20 },
      { id: 'var_005', name: 'Medium', type: 'size', value: 'M', stock: 30 },
      { id: 'var_006', name: 'Large', type: 'size', value: 'L', stock: 15 },
    ],
    rating: 4.7,
    reviewCount: 92,
    stock: 65,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'prod_008',
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Transform your space with our ultrasonic aromatherapy diffuser. Features 7 LED color options, whisper-quiet operation, and auto shut-off. Includes 3 essential oil samples.',
    shortDescription: 'Ultrasonic diffuser with 7 LED colors',
    price: 32.99,
    images: [
      '/images/products/diffuser-1.jpg',
      '/images/products/diffuser-2.jpg',
    ],
    category: {
      id: 'cat_home',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Beautiful products for your home',
      image: '/images/categories/home-living.jpg',
      productCount: 124,
    },
    tags: ['wellness', 'home', 'aromatherapy'],
    rating: 4.6,
    reviewCount: 134,
    stock: 45,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: 'prod_009',
    name: 'Portable Blender',
    slug: 'portable-blender',
    description: 'Blend on the go with our USB rechargeable portable blender. Perfect for smoothies, protein shakes, and baby food. Features 6 stainless steel blades and 380ml capacity.',
    shortDescription: 'USB rechargeable blender for on-the-go smoothies',
    price: 26.99,
    compareAtPrice: 36.99,
    images: [
      '/images/products/portable-blender-1.jpg',
      '/images/products/portable-blender-2.jpg',
    ],
    category: {
      id: 'cat_kitchen',
      name: 'Kitchen & Dining',
      slug: 'kitchen-dining',
      description: 'Essential kitchen and dining products',
      image: '/images/categories/kitchen-dining.jpg',
      productCount: 86,
    },
    tags: ['kitchen', 'portable', 'healthy'],
    variants: [
      { id: 'var_007', name: 'Pink', type: 'color', value: '#FFC0CB', stock: 20 },
      { id: 'var_008', name: 'Blue', type: 'color', value: '#87CEEB', stock: 25 },
      { id: 'var_009', name: 'Green', type: 'color', value: '#90EE90', stock: 15 },
    ],
    rating: 4.5,
    reviewCount: 211,
    stock: 60,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    createdAt: '2024-01-08T10:00:00Z',
  },
  {
    id: 'prod_010',
    name: 'Leather Card Holder',
    slug: 'leather-card-holder',
    description: 'Slim and stylish genuine leather card holder. Features RFID blocking technology, holds up to 8 cards, and includes a money clip. Perfect for minimalists.',
    shortDescription: 'RFID blocking leather card holder',
    price: 18.99,
    images: [
      '/images/products/card-holder-1.jpg',
      '/images/products/card-holder-2.jpg',
    ],
    category: {
      id: 'cat_personal',
      name: 'Personal Care',
      slug: 'personal-care',
      description: 'Personal care and accessories',
      image: '/images/categories/personal-care.jpg',
      productCount: 45,
    },
    tags: ['leather', 'wallet', 'minimalist'],
    variants: [
      { id: 'var_010', name: 'Black', type: 'color', value: '#000000', stock: 40 },
      { id: 'var_011', name: 'Brown', type: 'color', value: '#8B4513', stock: 35 },
      { id: 'var_012', name: 'Navy', type: 'color', value: '#000080', stock: 20 },
    ],
    rating: 4.8,
    reviewCount: 167,
    stock: 95,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    createdAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 'prod_011',
    name: 'Smart Plant Watering System',
    slug: 'smart-plant-watering-system',
    description: 'Never forget to water your plants again! This automatic watering system features a programmable timer, adjustable drip speed, and can water up to 10 plants simultaneously.',
    shortDescription: 'Automatic plant watering with timer',
    price: 38.99,
    compareAtPrice: 49.99,
    images: [
      '/images/products/plant-watering-1.jpg',
      '/images/products/plant-watering-2.jpg',
    ],
    category: {
      id: 'cat_home',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Beautiful products for your home',
      image: '/images/categories/home-living.jpg',
      productCount: 124,
    },
    tags: ['garden', 'smart', 'plants'],
    rating: 4.4,
    reviewCount: 78,
    stock: 30,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    createdAt: '2024-02-08T10:00:00Z',
  },
  {
    id: 'prod_012',
    name: 'Mini Projector',
    slug: 'mini-projector',
    description: 'Movie nights anywhere with our pocket-sized mini projector. Features 1080p support, built-in speakers, and connects to phones, laptops, and gaming consoles. Includes tripod.',
    shortDescription: 'Pocket-sized 1080p projector',
    price: 79.99,
    compareAtPrice: 99.99,
    images: [
      '/images/products/mini-projector-1.jpg',
      '/images/products/mini-projector-2.jpg',
    ],
    category: {
      id: 'cat_tech',
      name: 'Tech Accessories',
      slug: 'tech-accessories',
      description: 'Modern tech accessories',
      image: '/images/categories/tech-accessories.jpg',
      productCount: 78,
    },
    tags: ['tech', 'entertainment', 'portable'],
    rating: 4.3,
    reviewCount: 145,
    stock: 20,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    createdAt: '2024-01-18T10:00:00Z',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category.id === product.category.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
