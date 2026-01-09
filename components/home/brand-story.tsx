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
    <section className="py-16 md:py-20 bg-[var(--color-gray-50)]">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-24 w-24 text-[var(--color-primary-300)]" />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-xl bg-[var(--color-accent-yellow)] opacity-80" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-xl md:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                  <Leaf className="h-6 w-6 text-[var(--color-primary-600)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-gray-900)]">50K+</p>
                  <p className="text-sm text-[var(--color-gray-500)]">Happy Customers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[var(--color-primary-600)]">
              <Leaf className="h-5 w-5" />
              <span className="font-semibold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-[var(--color-gray-500)]">
              {SITE_CONFIG.tagline}
            </p>

            <h2 className="mt-4 text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
              Why Choose Us?
            </h2>

            <p className="mt-4 text-[var(--color-gray-600)]">
              {SITE_CONFIG.name} brings you the best deals for anyone. If you know
              yourself or looking to treat yourself better, check out our exciting
              products! We carefully curate every item to ensure quality and value.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-[var(--color-gray-700)]"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                    <Check className="h-3 w-3 text-[var(--color-primary-600)]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/about" className="inline-block mt-8">
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
