import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat_home',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Transform your space with our beautiful home essentials',
    image: '/images/categories/home-living.jpg',
    productCount: 124,
    icon: 'home',
  },
  {
    id: 'cat_kitchen',
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    description: 'Upgrade your kitchen with premium cookware and accessories',
    image: '/images/categories/kitchen-dining.jpg',
    productCount: 86,
    icon: 'utensils',
  },
  {
    id: 'cat_tools',
    name: 'Tools & Gadgets',
    slug: 'tools-gadgets',
    description: 'Innovative tools and gadgets for everyday life',
    image: '/images/categories/tools-gadgets.jpg',
    productCount: 67,
    icon: 'wrench',
  },
  {
    id: 'cat_gifts',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Curated gift sets perfect for any occasion',
    image: '/images/categories/gift-sets.jpg',
    productCount: 93,
    icon: 'gift',
  },
  {
    id: 'cat_personal',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Self-care essentials for your daily routine',
    image: '/images/categories/personal-care.jpg',
    productCount: 45,
    icon: 'sparkles',
  },
  {
    id: 'cat_tech',
    name: 'Tech Accessories',
    slug: 'tech-accessories',
    description: 'Modern accessories for your devices',
    image: '/images/categories/tech-accessories.jpg',
    productCount: 78,
    icon: 'smartphone',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
