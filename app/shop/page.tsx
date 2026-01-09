'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Filter,
  ChevronDown,
  X,
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ProductGrid } from '@/components/product/product-grid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS } from '@/lib/constants';

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.slug)
      );
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // On sale filter
    if (onSaleOnly) {
      result = result.filter(
        (p) => p.compareAtPrice && p.compareAtPrice > p.price
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'best-selling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [
    selectedCategories,
    priceRange,
    minRating,
    inStockOnly,
    onSaleOnly,
    sortBy,
  ]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const activeFilterCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Hero Banner */}
      <div className="gradient-primary py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-white/80">
            Discover our complete collection of quality products
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: 'Shop' }]}
          className="mb-6"
        />

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[var(--color-primary-600)] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
                <h3 className="mb-3 font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
                      />
                      <span className="flex-1 text-sm">{category.name}</span>
                      <span className="text-xs text-[var(--color-gray-400)]">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
                <h3 className="mb-3 font-medium">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-[var(--color-primary-600)]"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
                <h3 className="mb-3 font-medium">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="h-4 w-4 border-[var(--color-gray-300)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
                      />
                      <span className="text-sm text-[var(--color-accent-yellow)]">
                        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                      </span>
                      <span className="text-sm">& up</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
                <h3 className="mb-3 font-medium">Availability</h3>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
                    />
                    <span className="text-sm">In Stock</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
                    />
                    <span className="text-sm">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                  leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-[var(--color-primary-600)] px-1.5 text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                <p className="text-sm text-[var(--color-gray-600)]">
                  Showing{' '}
                  <span className="font-medium">{filteredProducts.length}</span>{' '}
                  products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[var(--color-gray-600)]">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-md border border-[var(--color-gray-300)] bg-white px-3 py-1.5 text-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-500)]"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode */}
                <div className="hidden items-center rounded-md border border-[var(--color-gray-300)] md:flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid'
                        ? 'bg-[var(--color-primary-600)] text-white'
                        : 'hover:bg-[var(--color-gray-100)]'
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list'
                        ? 'bg-[var(--color-primary-600)] text-white'
                        : 'hover:bg-[var(--color-gray-100)]'
                    )}
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-gray-600)]">
                  Active filters:
                </span>
                {selectedCategories.map((slug) => {
                  const category = categories.find((c) => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-100)] px-3 py-1 text-sm text-[var(--color-primary-700)]"
                    >
                      {category?.name}
                      <X className="h-3 w-3" />
                    </button>
                  );
                })}
                {(priceRange[0] > 0 || priceRange[1] < 100) && (
                  <button
                    onClick={() => setPriceRange([0, 100])}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-100)] px-3 py-1 text-sm text-[var(--color-primary-700)]"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary-600)]"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={3} />
            ) : (
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-12 text-center">
                <p className="text-lg font-medium text-[var(--color-gray-900)]">
                  No products found
                </p>
                <p className="mt-1 text-[var(--color-gray-500)]">
                  Try adjusting your filters
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute inset-y-0 left-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile filter content - same as desktop */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="mb-3 font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)]"
                      />
                      <span className="flex-1 text-sm">{category.name}</span>
                      <span className="text-xs text-[var(--color-gray-400)]">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 font-medium">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-[var(--color-primary-600)]"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="mb-3 font-medium">Availability</h3>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)]"
                    />
                    <span className="text-sm">In Stock</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)]"
                    />
                    <span className="text-sm">On Sale</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button onClick={() => setIsFilterOpen(false)} className="w-full">
                Show {filteredProducts.length} Products
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
