'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Utensils, Wrench, Gift, Sparkles, Smartphone } from 'lucide-react';
import { NAVIGATION } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  utensils: Utensils,
  wrench: Wrench,
  gift: Gift,
  sparkles: Sparkles,
  smartphone: Smartphone,
};

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-screen max-w-4xl -translate-x-1/2 animate-slideDown">
      <div className="mt-2 rounded-lg border border-[var(--color-gray-200)] bg-white p-6 shadow-xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Categories */}
          <div className="col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
              Categories
            </h3>
            <ul className="space-y-1">
              {NAVIGATION.shop.categories.map((category) => {
                const Icon = iconMap[category.icon] || Home;
                return (
                  <li key={category.href}>
                    <Link
                      href={category.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[var(--color-primary-50)]"
                    >
                      <Icon className="h-5 w-5 text-[var(--color-primary-600)]" />
                      <div>
                        <span className="text-sm font-medium text-[var(--color-gray-900)]">
                          {category.label}
                        </span>
                        <span className="ml-2 text-xs text-[var(--color-gray-400)]">
                          ({category.count})
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Collections */}
          <div className="col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
              Collections
            </h3>
            <ul className="space-y-1">
              {NAVIGATION.shop.collections.map((collection) => (
                <li key={collection.href}>
                  <Link
                    href={collection.href}
                    className="block rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]"
                  >
                    {collection.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-1 px-3 text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured */}
          <div className="col-span-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
              Featured
            </h3>
            <Link
              href="/collections/new-arrivals"
              className="group relative block overflow-hidden rounded-lg"
            >
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]">
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-xs font-medium text-white/80">
                    New Collection
                  </span>
                  <span className="text-lg font-bold text-white">
                    Summer Arrivals
                  </span>
                  <span className="text-sm text-white/80">Up to 40% Off</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white group-hover:underline">
                    Shop Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
