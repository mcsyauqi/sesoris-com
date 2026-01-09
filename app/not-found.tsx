import Link from 'next/link';
import { Home, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container-custom py-16 text-center">
        <h1 className="text-8xl font-bold text-[var(--color-primary-600)]">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-[var(--color-gray-900)]">
          Page Not Found
        </h2>
        <p className="mt-2 text-[var(--color-gray-600)]">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button leftIcon={<Home className="h-4 w-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" leftIcon={<ShoppingBag className="h-4 w-4" />}>
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
