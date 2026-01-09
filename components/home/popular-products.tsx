'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Package } from 'lucide-react';
import { products, getFeaturedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tabs = ['Popular', 'Trending', 'Most Viewed'];

export function PopularProducts() {
  const [activeTab, setActiveTab] = useState('Popular');
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  // For demo, we'll use the same products for all tabs
  // In a real app, these would be different
  const displayProducts = featuredProducts;

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Title & Featured */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-[var(--color-accent-orange)]">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">Popular This Week</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
                Our most loved products this week
              </h2>

              <Link
                href="/collections/popular"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Tabs */}
              <div className="mt-8 flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      activeTab === tab
                        ? 'bg-[var(--color-primary-600)] text-white'
                        : 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-200)]'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Featured Product */}
              <div className="mt-8 hidden rounded-xl border border-[var(--color-gray-200)] bg-white p-4 lg:block">
                <div className="relative aspect-square rounded-lg bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="h-20 w-20 text-[var(--color-primary-300)]" />
                  </div>
                </div>
                {featuredProducts[0] && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-[var(--color-gray-900)]">
                      {featuredProducts[0].name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[var(--color-accent-yellow)]">
                        {'★'.repeat(Math.floor(featuredProducts[0].rating))}
                      </span>
                      <span className="text-sm text-[var(--color-gray-500)]">
                        ({featuredProducts[0].reviewCount} reviews)
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-[var(--color-primary-600)]">
                      ${featuredProducts[0].price.toFixed(2)}
                    </p>
                    <Link href={`/product/${featuredProducts[0].slug}`}>
                      <Button className="mt-3 w-full" size="sm">
                        View Product
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Products Grid */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
