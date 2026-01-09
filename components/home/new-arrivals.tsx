'use client';

import { getNewArrivals } from '@/data/products';
import { SectionHeader } from '@/components/shared/section-header';
import { ProductCarousel } from '@/components/product/product-carousel';

export function NewArrivals() {
  const newProducts = getNewArrivals();
  // If we don't have enough new products, add some featured ones
  const products = newProducts.length < 4
    ? [...newProducts, ...newProducts, ...newProducts].slice(0, 8)
    : newProducts;

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <SectionHeader
          title="New Arrivals"
          subtitle="Fresh finds just for you"
          viewAllHref="/collections/new-arrivals"
        />
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
