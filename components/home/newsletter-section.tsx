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
    <section className="gradient-primary py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-3">
            <Mail className="h-6 w-6 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-3 text-white/80">
            Get exclusive offers, new arrivals, and insider tips delivered to
            your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                required
              />
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="h-12 bg-white text-[var(--color-primary-600)] hover:bg-white/90"
              >
                {isSuccess ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
            <Lock className="h-4 w-4" />
            <span>No spam, unsubscribe anytime</span>
          </div>

          {/* Bonus Offer */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            <Gift className="h-4 w-4" />
            <span>Get 10% off your first order when you subscribe!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
