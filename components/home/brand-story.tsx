'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Check, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

const features = [
  'Quality Products',
  'Fast Shipping',
  'Easy Returns',
  '24/7 Support',
];

export function BrandStory() {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-[var(--color-gray-50)]">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] sm:rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-16 w-16 text-[var(--color-primary-300)] sm:h-24 sm:w-24" />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-lg bg-[var(--color-accent-yellow)] opacity-80 sm:-bottom-4 sm:-right-4 sm:h-32 sm:w-32 sm:rounded-xl" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-4 left-2 rounded-lg bg-white p-3 shadow-xl sm:-bottom-6 sm:-left-6 sm:rounded-xl sm:p-4 md:-left-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-100)] sm:h-12 sm:w-12">
                  <Leaf className="h-5 w-5 text-[var(--color-primary-600)] sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-gray-900)] sm:text-base">50K+</p>
                  <p className="text-xs text-[var(--color-gray-500)] sm:text-sm">Happy Customers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-4 lg:mt-0"
          >
            <div className="flex items-center gap-2 text-[var(--color-primary-600)]">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm font-semibold sm:text-base">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-xs text-[var(--color-gray-500)] sm:text-sm">
              {SITE_CONFIG.tagline}
            </p>

            <h2 className="mt-3 text-xl font-bold text-[var(--color-gray-900)] sm:mt-4 sm:text-2xl md:text-3xl">
              Why Choose Us?
            </h2>

            <p className="mt-3 text-sm text-[var(--color-gray-600)] sm:mt-4 sm:text-base">
              {SITE_CONFIG.name} brings you the best deals for anyone. If you know
              yourself or looking to treat yourself better, check out our exciting
              products! We carefully curate every item to ensure quality and value.
            </p>

            <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs text-[var(--color-gray-700)] sm:text-sm md:text-base"
                >
                  <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)] sm:h-5 sm:w-5">
                    <Check className="h-2.5 w-2.5 text-[var(--color-primary-600)] sm:h-3 sm:w-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/about" className="inline-block mt-6 sm:mt-8">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
