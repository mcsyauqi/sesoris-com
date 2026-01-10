'use client';

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';

export function AnnouncementBar() {
  const { isAnnouncementVisible, hideAnnouncement } = useUIStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isAnnouncementVisible) return null;

  return (
    <div className="relative bg-[var(--color-primary-600)] text-white">
      <div className="container-custom flex h-10 items-center justify-center pr-10 md:h-11">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 flex-shrink-0" />
          <p
            className={cn(
              'text-sm font-medium transition-all duration-300 text-center',
              isAnimating ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
            )}
          >
            {ANNOUNCEMENT_MESSAGES[currentIndex]}
          </p>
        </div>
        <button
          onClick={hideAnnouncement}
          className="absolute right-2 rounded-sm p-1 hover:bg-white/10 transition-colors md:right-4"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
