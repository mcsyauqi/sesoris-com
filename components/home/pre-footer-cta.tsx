'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PreFooterCTA() {
  return (
    <section className="gradient-primary py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-3">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white md:text-4xl">
            Ready to Find Your Perfect Gift?
          </h2>

          <p className="mt-4 text-lg text-white/80">
            Browse our collection of 500+ products and discover something special
            today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop">
              <Button
                size="xl"
                className="bg-white text-[var(--color-primary-600)] hover:bg-white/90"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Shop All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="xl"
                className="border-white/50 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
