'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui-store';
import { searchProducts } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Price } from '@/components/shared/price';
import { Product } from '@/types';

const popularSearches = ['Organizer', 'Kitchen', 'Gift Set', 'Storage', 'Gadgets'];

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 6));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          useUIStore.getState().openSearch();
        }
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const handleClose = useCallback(() => {
    setQuery('');
    setResults([]);
    closeSearch();
  }, [closeSearch]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative mx-auto mt-20 max-w-2xl px-4 animate-slideDown">
        <div className="rounded-xl bg-white shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-[var(--color-gray-200)] p-4">
            <Search className="h-5 w-5 text-[var(--color-gray-400)]" />
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-[var(--color-gray-400)]"
              autoFocus
            />
            <kbd className="hidden rounded bg-[var(--color-gray-100)] px-2 py-0.5 text-xs text-[var(--color-gray-500)] sm:inline">
              ESC
            </kbd>
            <button
              onClick={handleClose}
              className="rounded-md p-1 hover:bg-[var(--color-gray-100)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {/* Popular Searches */}
            {!query && (
              <div className="mb-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="rounded-full border border-[var(--color-gray-200)] px-3 py-1.5 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-primary-50)] hover:border-[var(--color-primary-200)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="py-8 text-center text-[var(--color-gray-500)]">
                Searching...
              </div>
            )}

            {/* Results */}
            {!isLoading && query && results.length > 0 && (
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
                  Products
                </h3>
                <ul className="space-y-2">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 rounded-lg p-2 hover:bg-[var(--color-gray-50)] transition-colors"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-gray-100)]">
                          <div className="flex h-full w-full items-center justify-center text-[var(--color-gray-400)]">
                            <TrendingUp className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[var(--color-gray-900)] line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-[var(--color-gray-500)] line-clamp-1">
                            {product.category.name}
                          </p>
                          <Price
                            price={product.price}
                            compareAtPrice={product.compareAtPrice}
                            size="sm"
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="mt-4 block text-center text-sm font-medium text-[var(--color-primary-600)] hover:underline"
                >
                  View all results for &quot;{query}&quot;
                </Link>
              </div>
            )}

            {/* No Results */}
            {!isLoading && query && results.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-[var(--color-gray-500)]">
                  No products found for &quot;{query}&quot;
                </p>
                <p className="mt-1 text-sm text-[var(--color-gray-400)]">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
