import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  color?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'full', color = 'dark', className }: LogoProps) {
  const textColor =
    color === 'dark'
      ? 'text-[var(--color-primary-600)]'
      : 'text-white';

  if (variant === 'icon') {
    return (
      <Link href="/" className={cn('inline-flex items-center', className)}>
        <Leaf className={cn('h-8 w-8', textColor)} />
        <span className="sr-only">{SITE_CONFIG.name}</span>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2', className)}>
      <Leaf className={cn('h-7 w-7', textColor)} />
      <div className="flex flex-col">
        <span className={cn('text-xl font-bold leading-none', textColor)}>
          {SITE_CONFIG.name}
        </span>
        {variant === 'full' && (
          <span
            className={cn(
              'text-xs font-medium',
              color === 'dark'
                ? 'text-[var(--color-gray-500)]'
                : 'text-white/80'
            )}
          >
            {SITE_CONFIG.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
