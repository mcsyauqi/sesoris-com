'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  className?: string;
}

export function ProductCarousel({
  products,
  title,
  className,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white shadow-lg md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white shadow-lg md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Products */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth px-1 pb-4 md:gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc(50%-8px)] flex-shrink-0 md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Scroll Indicator (Mobile) */}
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {products.map((_, index) => (
          <div
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-gray-300)]"
          />
        ))}
      </div>
    </div>
  );
}
