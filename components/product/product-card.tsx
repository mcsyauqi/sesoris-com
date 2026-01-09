'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/shared/rating';
import { Price } from '@/components/shared/price';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  showQuickView = true,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.div
      className={cn(
        'group relative rounded-lg border border-[var(--color-gray-200)] bg-white transition-all duration-300 hover:shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-[var(--color-gray-100)]">
          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
            {isOnSale && <Badge variant="sale">Sale</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-all duration-200',
              isHovered || inWishlist ? 'opacity-100' : 'opacity-0',
              inWishlist && 'text-[var(--color-error)]'
            )}
          >
            <Heart
              className={cn('h-4 w-4', inWishlist && 'fill-current')}
            />
          </button>

          {/* Product Image Placeholder */}
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <Package className="h-16 w-16 text-[var(--color-gray-300)]" />
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Badge variant="soldout" className="text-sm">
                Sold Out
              </Badge>
            </div>
          )}

          {/* Quick View Button */}
          {showQuickView && !isOutOfStock && (
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/50 to-transparent p-4 transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Button
                variant="secondary"
                size="sm"
                className="bg-white hover:bg-[var(--color-gray-100)]"
                leftIcon={<Eye className="h-4 w-4" />}
              >
                Quick View
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-[var(--color-gray-900)] line-clamp-2 group-hover:text-[var(--color-primary-600)] transition-colors">
            {product.name}
          </h3>

          <Rating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
            className="mt-2"
          />

          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="mt-2"
          />
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full"
          leftIcon={<ShoppingBag className="h-4 w-4" />}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </motion.div>
  );
}
