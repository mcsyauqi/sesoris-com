'use client';

import { motion } from 'framer-motion';
import { Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  truck: Truck,
  'refresh-cw': RefreshCw,
  'shield-check': ShieldCheck,
  headphones: Headphones,
};

export function TrustBadges() {
  return (
    <section className="bg-[var(--color-gray-100)] py-8 sm:py-10 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {TRUST_BADGES.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Truck;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-100)] sm:mb-3 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 text-[var(--color-primary-600)] sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-gray-900)] sm:text-base">
                  {badge.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-gray-500)] sm:text-sm">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
