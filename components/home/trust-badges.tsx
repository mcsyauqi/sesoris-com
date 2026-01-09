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
    <section className="bg-[var(--color-gray-100)] py-10 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
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
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                  <Icon className="h-6 w-6 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="font-semibold text-[var(--color-gray-900)]">
                  {badge.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-gray-500)]">
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
