'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  X,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION } from '@/lib/constants';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useUIStore } from '@/stores/ui-store';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './mobile-menu';
import { MegaMenu } from './mega-menu';
import { SearchModal } from './search-modal';
import { CartSidebar } from '@/components/cart/cart-sidebar';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { openCart, getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const { isMobileMenuOpen, toggleMobileMenu, isSearchOpen, openSearch } = useUIStore();

  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled || !isHomePage
            ? 'bg-white shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-16' : 'h-20'
            )}
          >
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="rounded-md p-2 hover:bg-[var(--color-gray-100)] lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Logo
              variant="full"
              color={isScrolled || !isHomePage ? 'dark' : 'dark'}
              className="lg:flex-shrink-0"
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {NAVIGATION.main.map((item) => {
                const isShop = item.label === 'Shop';
                const isActive =
                  pathname === item.href ||
                  (isShop && pathname.startsWith('/shop'));

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => isShop && setActiveMenu('shop')}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md',
                        isActive
                          ? 'text-[var(--color-primary-600)]'
                          : 'text-[var(--color-gray-700)] hover:text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)]'
                      )}
                    >
                      {item.label}
                      {isShop && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    {isShop && activeMenu === 'shop' && <MegaMenu />}
                  </div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={openSearch}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/account/wishlist" className="hidden sm:block">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-600)] text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/account" className="hidden sm:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-600)] text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Search Modal */}
      <SearchModal />

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}
