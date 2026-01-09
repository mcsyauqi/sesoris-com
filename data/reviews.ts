import { Review, Testimonial } from '@/types';

export const reviews: Review[] = [
  {
    id: 'rev_001',
    productId: 'prod_001',
    author: 'John D.',
    avatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    title: 'Best fingerprint lock I\'ve owned!',
    content: 'This lock is amazing! Super easy to set up and the fingerprint recognition is incredibly fast. I\'ve been using it for my gym locker for 3 months now without any issues.',
    isVerified: true,
    helpfulCount: 24,
    location: 'New York, NY',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'rev_002',
    productId: 'prod_001',
    author: 'Sarah M.',
    avatar: '/images/avatars/avatar-2.jpg',
    rating: 5,
    title: 'Perfect for travel!',
    content: 'I bought this for my luggage and it works perfectly. No more worrying about losing keys or forgetting combinations. The battery life is excellent too.',
    isVerified: true,
    helpfulCount: 18,
    location: 'Los Angeles, CA',
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'rev_003',
    productId: 'prod_001',
    author: 'Mike T.',
    rating: 4,
    title: 'Great product with minor issues',
    content: 'Overall a solid lock. Sometimes it takes 2 tries to recognize my fingerprint, but that might be because my hands are often wet from work. Would still recommend.',
    isVerified: true,
    helpfulCount: 12,
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'rev_004',
    productId: 'prod_005',
    author: 'Emily R.',
    avatar: '/images/avatars/avatar-3.jpg',
    rating: 5,
    title: 'Beautiful gift set!',
    content: 'Bought this for my mom\'s birthday and she absolutely loved it! The presentation is gorgeous and everything inside is high quality. Will definitely buy again for other occasions.',
    isVerified: true,
    helpfulCount: 31,
    location: 'Chicago, IL',
    createdAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 'rev_005',
    productId: 'prod_005',
    author: 'David L.',
    rating: 5,
    title: 'Exceeded expectations',
    content: 'The quality of this gift box is outstanding. The candle smells amazing and the chocolates were delicious. Perfect for any special occasion.',
    isVerified: true,
    helpfulCount: 22,
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: 'rev_006',
    productId: 'prod_003',
    author: 'Amanda K.',
    avatar: '/images/avatars/avatar-4.jpg',
    rating: 5,
    title: 'Keeps drinks cold all day!',
    content: 'I\'m amazed at how well this bottle keeps my water cold. Even after 8 hours in my hot car, my water was still ice cold. Great quality and beautiful design.',
    isVerified: true,
    helpfulCount: 45,
    location: 'Phoenix, AZ',
    createdAt: '2024-01-15T10:00:00Z',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test_001',
    author: 'Sarah M.',
    avatar: '/images/avatars/avatar-2.jpg',
    rating: 5,
    content: 'Amazing quality products! The shipping was fast and everything was packaged so nicely. I\'ve already ordered twice and will definitely be back for more!',
    location: 'New York, NY',
    isVerified: true,
  },
  {
    id: 'test_002',
    author: 'John D.',
    avatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    content: 'Sesoris has become my go-to for gifts. The quality is always consistent and the prices are unbeatable. Highly recommend!',
    location: 'Los Angeles, CA',
    isVerified: true,
  },
  {
    id: 'test_003',
    author: 'Emily R.',
    avatar: '/images/avatars/avatar-3.jpg',
    rating: 5,
    content: 'I was skeptical at first, but the products exceeded my expectations. The customer service was also incredibly helpful when I had questions.',
    location: 'Chicago, IL',
    isVerified: true,
  },
  {
    id: 'test_004',
    author: 'Mike T.',
    rating: 4,
    content: 'Fast shipping and great value for money. The products are exactly as described. Will definitely shop here again!',
    location: 'Houston, TX',
    isVerified: true,
  },
  {
    id: 'test_005',
    author: 'Amanda K.',
    avatar: '/images/avatars/avatar-4.jpg',
    rating: 5,
    content: 'Love the eco-friendly options! It\'s great to find a store that cares about sustainability without compromising on quality.',
    location: 'Seattle, WA',
    isVerified: true,
  },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}
