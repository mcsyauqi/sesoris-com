import { cn, formatPrice, calculateDiscount } from '@/lib/utils';

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  size = 'md',
  showDiscount = true,
  className,
}: PriceProps) {
  const discount = compareAtPrice ? calculateDiscount(price, compareAtPrice) : 0;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span
        className={cn(
          'font-semibold text-[var(--color-gray-900)]',
          sizeClasses[size]
        )}
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <>
          <span
            className={cn(
              'text-[var(--color-gray-400)] line-through',
              size === 'lg' ? 'text-base' : 'text-sm'
            )}
          >
            {formatPrice(compareAtPrice)}
          </span>
          {showDiscount && discount > 0 && (
            <span className="rounded bg-[var(--color-accent-orange)] px-1.5 py-0.5 text-xs font-medium text-white">
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
