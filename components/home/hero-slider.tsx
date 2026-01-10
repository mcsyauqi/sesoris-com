'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HERO_SLIDES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[450px] bg-gradient-mesh md:min-h-[550px] lg:min-h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom relative h-full py-10 md:py-16 lg:py-20">
        <div className="grid h-full gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <span className="inline-flex items-center gap-2 text-[var(--color-primary-600)] font-medium mb-4">
                <Gift className="h-5 w-5" />
                {slide.subtitle}
              </span>
              <h1 className="text-3xl font-bold text-[var(--color-gray-900)] md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-lg text-base text-[var(--color-gray-600)] md:text-lg">
                {slide.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
                <Link href={slide.ctaPrimary.href}>
                  <Button size="lg" className="w-full sm:w-auto">{slide.ctaPrimary.label}</Button>
                </Link>
                {'ctaSecondary' in slide && slide.ctaSecondary && (
                  <Link href={slide.ctaSecondary.href}>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      {slide.ctaSecondary.label}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image Placeholder */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative hidden lg:flex lg:items-center lg:justify-center"
            >
              <div className="relative aspect-square w-full max-w-lg rounded-3xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] p-8">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/50">
                  <Gift className="h-32 w-32 text-[var(--color-primary-300)]" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-[var(--color-accent-yellow)] opacity-80" />
                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl bg-[var(--color-accent-orange)] opacity-80" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 md:bottom-8">
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  index === currentSlide
                    ? 'w-8 bg-[var(--color-primary-600)]'
                    : 'w-2.5 bg-[var(--color-gray-300)] hover:bg-[var(--color-gray-400)]'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white active:scale-95 md:left-4 md:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white active:scale-95 md:right-4 md:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </section>
  );
}
