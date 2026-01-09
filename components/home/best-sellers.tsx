'use client';

import { getBestSellers } from '@/data/products';
import { SectionHeader } from '@/components/shared/section-header';
import { ProductCarousel } from '@/components/product/product-carousel';
import { Trophy } from 'lucide-react';

export function BestSellers() {
  const bestSellerProducts = getBestSellers();
  // Ensure we have enough products for carousel
  const products = bestSellerProducts.length < 4
    ? [...bestSellerProducts, ...bestSellerProducts].slice(0, 8)
    : bestSellerProducts;

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center justify-center gap-2 text-[var(--color-accent-yellow)]">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Best Sellers</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
            Products Our Customers Love
          </h2>
          <p className="mt-2 text-[var(--color-gray-500)]">
            Highly rated by thousands of happy customers
          </p>
        </div>
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
