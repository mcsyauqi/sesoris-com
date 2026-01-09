'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Utensils, Wrench, Gift, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { SectionHeader } from '@/components/shared/section-header';

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  utensils: Utensils,
  wrench: Wrench,
  gift: Gift,
  sparkles: Sparkles,
  smartphone: Smartphone,
};

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <SectionHeader
          title="Shop by Category"
          subtitle="Discover products for every part of your life"
          align="center"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon || 'home'] || Home;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="group block overflow-hidden rounded-xl border border-[var(--color-gray-200)] bg-white transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-16 w-16 text-[var(--color-primary-300)] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary-600)] transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                      {category.productCount} items
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
