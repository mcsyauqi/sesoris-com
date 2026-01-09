'use client';

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateStars } from '@/lib/utils';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({
  rating,
  reviewCount,
  showCount = true,
  size = 'md',
  className,
}: RatingProps) {
  const stars = generateStars(rating);

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {stars.map((type, index) => {
          if (type === 'full') {
            return (
              <Star
                key={index}
                className={cn(
                  sizeClasses[size],
                  'fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]'
                )}
              />
            );
          } else if (type === 'half') {
            return (
              <StarHalf
                key={index}
                className={cn(
                  sizeClasses[size],
                  'fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]'
                )}
              />
            );
          } else {
            return (
              <Star
                key={index}
                className={cn(sizeClasses[size], 'text-[var(--color-gray-300)]')}
              />
            );
          }
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={cn(textSizeClasses[size], 'text-[var(--color-gray-500)]')}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
