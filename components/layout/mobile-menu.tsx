'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronRight,
  User,
  Heart,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';
import { Logo } from './logo';

export function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden',
          isMobileMenuOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={closeMobileMenu}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-gray-200)] px-4 py-4">
            <Logo variant="compact" />
            <button
              onClick={closeMobileMenu}
              className="rounded-md p-2 hover:bg-[var(--color-gray-100)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {NAVIGATION.main.map((item) => {
                const hasChildren = item.label === 'Shop';
                const isActive = pathname === item.href;
                const isExpanded = expandedItem === item.label;

                return (
                  <li key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-md px-4 py-3 text-left',
                            isActive
                              ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                              : 'hover:bg-[var(--color-gray-100)]'
                          )}
                        >
                          <span className="text-base font-medium">{item.label}</span>
                          <ChevronRight
                            className={cn(
                              'h-5 w-5 transition-transform',
                              isExpanded && 'rotate-90'
                            )}
                          />
                        </button>
                        {isExpanded && (
                          <ul className="mt-1 space-y-1 pl-4">
                            {NAVIGATION.shop.categories.map((cat) => (
                              <li key={cat.href}>
                                <Link
                                  href={cat.href}
                                  onClick={closeMobileMenu}
                                  className="flex items-center justify-between rounded-md px-4 py-2 text-sm hover:bg-[var(--color-gray-100)]"
                                >
                                  <span>{cat.label}</span>
                                  <span className="text-xs text-[var(--color-gray-400)]">
                                    ({cat.count})
                                  </span>
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href="/shop"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--color-primary-600)]"
                              >
                                View All Products
                              </Link>
                            </li>
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          'block rounded-md px-4 py-3 text-base font-medium',
                          isActive
                            ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                            : 'hover:bg-[var(--color-gray-100)]'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <hr className="my-4 border-[var(--color-gray-200)]" />

            {/* Secondary Links */}
            <ul className="space-y-1">
              <li>
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-[var(--color-gray-100)]"
                >
                  <User className="h-5 w-5 text-[var(--color-gray-500)]" />
                  <span>Account</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/account/wishlist"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-[var(--color-gray-100)]"
                >
                  <Heart className="h-5 w-5 text-[var(--color-gray-500)]" />
                  <span>Wishlist</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-[var(--color-gray-200)] p-4">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]"
            >
              <Mail className="h-4 w-4" />
              {SITE_CONFIG.email}
            </a>

            <div className="mt-4 flex items-center gap-4">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gray-500)] hover:text-[var(--color-primary-600)]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gray-500)] hover:text-[var(--color-primary-600)]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gray-500)] hover:text-[var(--color-primary-600)]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gray-500)] hover:text-[var(--color-primary-600)]"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
