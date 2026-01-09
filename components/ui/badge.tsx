import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]',
        sale: 'bg-[var(--color-accent-orange)] text-white',
        new: 'bg-[var(--color-primary-600)] text-white',
        bestseller: 'bg-[var(--color-accent-yellow)] text-[var(--color-gray-900)]',
        soldout: 'bg-[var(--color-gray-500)] text-white',
        success: 'bg-[var(--color-success)] text-white',
        warning: 'bg-[var(--color-warning)] text-white',
        error: 'bg-[var(--color-error)] text-white',
        outline: 'border border-current bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
