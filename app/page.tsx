import { HeroSlider } from '@/components/home/hero-slider';
import { TrustBadges } from '@/components/home/trust-badges';
import { CategoryShowcase } from '@/components/home/category-showcase';
import { PopularProducts } from '@/components/home/popular-products';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { NewArrivals } from '@/components/home/new-arrivals';
import { BrandStory } from '@/components/home/brand-story';
import { BestSellers } from '@/components/home/best-sellers';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { PreFooterCTA } from '@/components/home/pre-footer-cta';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero Slider */}
      <HeroSlider />

      {/* Section 2: Trust Badges */}
      <TrustBadges />

      {/* Section 3: Featured Categories */}
      <CategoryShowcase />

      {/* Section 4: Popular This Week */}
      <PopularProducts />

      {/* Section 5: Newsletter */}
      <NewsletterSection />

      {/* Section 6: New Arrivals */}
      <NewArrivals />

      {/* Section 7: Brand Story */}
      <BrandStory />

      {/* Section 8: Best Sellers */}
      <BestSellers />

      {/* Section 9: Testimonials */}
      <Testimonials />

      {/* Section 10: Instagram Feed */}
      <InstagramFeed />

      {/* Section 11: Recently Viewed - Dynamic, shown only if user has history */}
      {/* This would be rendered conditionally based on localStorage */}

      {/* Section 12: Pre-Footer CTA */}
      <PreFooterCTA />
    </>
  );
}
