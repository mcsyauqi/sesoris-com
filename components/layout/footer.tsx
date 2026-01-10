'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { NAVIGATION, SITE_CONFIG, PAYMENT_METHODS } from '@/lib/constants';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      {/* Main Footer */}
      <div className="container-custom py-8 sm:py-12 md:py-16">
        {/* Top Section */}
        <div className="mb-8 text-center sm:mb-12">
          <Logo variant="full" color="light" className="justify-center" />
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-gray-400)] sm:mt-4 sm:text-base">
            Bringing you the best products for everyday life. Quality you can
            trust, prices you&apos;ll love.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Shop */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider sm:mb-4 sm:text-base">
              Shop
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider sm:mb-4 sm:text-base">
              Help
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.help.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider sm:mb-4 sm:text-base">
              Company
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider sm:mb-4 sm:text-base">
              Stay Connected
            </h3>
            <p className="mb-3 text-xs text-[var(--color-gray-400)] sm:mb-4 sm:text-sm">
              Subscribe for exclusive offers and updates!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[var(--color-gray-800)] border-[var(--color-gray-700)] text-white placeholder:text-[var(--color-gray-500)]"
                />
                <Button type="submit" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              {isSubscribed && (
                <p className="text-sm text-[var(--color-success)]">
                  Thanks for subscribing!
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <p className="mb-2 text-sm text-[var(--color-gray-400)]">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 border-t border-[var(--color-gray-800)] pt-6 sm:mt-12 sm:pt-8">
          <p className="mb-3 text-center text-xs text-[var(--color-gray-500)] sm:mb-4 sm:text-sm">
            Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method}
                className="flex h-7 w-10 items-center justify-center rounded bg-white/10 text-[10px] font-semibold uppercase sm:h-8 sm:w-12 sm:text-xs"
              >
                {method.slice(0, 4)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-gray-800)]">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-4 sm:gap-4 sm:py-6 md:flex-row">
          <p className="text-xs text-[var(--color-gray-500)] sm:text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--color-gray-500)] sm:gap-4 sm:text-sm">
            {NAVIGATION.footer.legal.map((item, index) => (
              <span key={item.href} className="flex items-center gap-3 sm:gap-4">
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
                {index < NAVIGATION.footer.legal.length - 1 && (
                  <span className="text-[var(--color-gray-700)]">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
