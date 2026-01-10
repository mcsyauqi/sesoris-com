'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="gradient-primary py-10 sm:py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-3 inline-flex items-center justify-center rounded-full bg-white/20 p-2 sm:mb-4 sm:p-3">
            <Mail className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>

          <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-2 text-sm text-white/80 sm:mt-3 sm:text-base">
            Get exclusive offers, new arrivals, and insider tips delivered to
            your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 sm:h-12"
                required
              />
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="h-11 bg-white text-[var(--color-primary-600)] hover:bg-white/90 sm:h-12"
              >
                {isSuccess ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </div>
          </form>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/60 sm:mt-4 sm:text-sm">
            <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>No spam, unsubscribe anytime</span>
          </div>

          {/* Bonus Offer */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white sm:mt-6 sm:px-4 sm:py-2 sm:text-sm">
            <Gift className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
            <span>Get 10% off your first order when you subscribe!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
