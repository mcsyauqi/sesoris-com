'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Check } from 'lucide-react';
import { testimonials } from '@/data/reviews';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-20 bg-[var(--color-gray-50)]">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
            What Our Customers Say
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="relative mt-10 mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white p-8 shadow-lg md:p-10"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[var(--color-primary-100)] p-3">
                  <Quote className="h-6 w-6 text-[var(--color-primary-600)]" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < currentTestimonial.rating
                        ? 'fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]'
                        : 'text-[var(--color-gray-300)]'
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-center text-lg text-[var(--color-gray-700)] md:text-xl">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-lg font-semibold text-[var(--color-primary-600)]">
                  {currentTestimonial.author[0]}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[var(--color-gray-900)]">
                    {currentTestimonial.author}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-gray-500)]">
                    {currentTestimonial.isVerified && (
                      <span className="flex items-center gap-1 text-[var(--color-success)]">
                        <Check className="h-3 w-3" />
                        Verified Buyer
                      </span>
                    )}
                    {currentTestimonial.location && (
                      <>
                        <span>•</span>
                        <span>{currentTestimonial.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-6 bg-[var(--color-primary-600)]'
                      : 'w-2 bg-[var(--color-gray-300)] hover:bg-[var(--color-gray-400)]'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-[var(--color-gray-900)]">4.8</p>
            <p className="text-sm text-[var(--color-gray-500)]">out of 5</p>
          </div>
          <div className="h-8 w-px bg-[var(--color-gray-300)]" />
          <div>
            <p className="text-2xl font-bold text-[var(--color-gray-900)]">2,547</p>
            <p className="text-sm text-[var(--color-gray-500)]">reviews</p>
          </div>
          <div className="h-8 w-px bg-[var(--color-gray-300)]" />
          <div>
            <p className="text-2xl font-bold text-[var(--color-gray-900)]">98%</p>
            <p className="text-sm text-[var(--color-gray-500)]">recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
