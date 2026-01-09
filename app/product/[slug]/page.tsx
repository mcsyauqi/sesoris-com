'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  Star,
  Package,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { getReviewsByProductId } from '@/data/reviews';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Rating } from '@/components/shared/rating';
import { Price } from '@/components/shared/price';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCarousel } from '@/components/product/product-carousel';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { cn, formatDate } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-[var(--color-primary-600)] hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const reviews = getReviewsByProductId(product.id);
  const inWishlist = isInWishlist(product.id);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = () => {
    const variant = product.variants?.find((v) => v.id === selectedVariant);
    addItem(product, quantity, variant);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.category.name, href: `/category/${product.category.slug}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        {/* Main Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-gray-100)]">
              {/* Badges */}
              <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
                {isOnSale && <Badge variant="sale">Sale</Badge>}
                {product.isNew && <Badge variant="new">New</Badge>}
              </div>

              {/* Image Placeholder */}
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-32 w-32 text-[var(--color-gray-300)]" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {[1, 2, 3, 4].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-gray-100)] transition-all',
                    selectedImage === index
                      ? 'ring-2 ring-[var(--color-primary-600)]'
                      : 'hover:opacity-80'
                  )}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-8 w-8 text-[var(--color-gray-300)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <Rating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
              <Link
                href="#reviews"
                className="text-sm text-[var(--color-primary-600)] hover:underline"
              >
                Read reviews
              </Link>
            </div>

            <div className="mt-6">
              <Price
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="lg"
              />
            </div>

            <p className="mt-4 text-[var(--color-gray-600)]">
              {product.shortDescription}
            </p>

            <hr className="my-6 border-[var(--color-gray-200)]" />

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 font-medium">
                  {product.variants[0].type === 'color' ? 'Color' : 'Size'}:{' '}
                  <span className="font-normal text-[var(--color-gray-600)]">
                    {product.variants.find((v) => v.id === selectedVariant)?.name ||
                      'Select'}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={cn(
                        'rounded-md border px-4 py-2 text-sm transition-all',
                        selectedVariant === variant.id
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                          : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]',
                        variant.stock === 0 && 'cursor-not-allowed opacity-50'
                      )}
                      disabled={variant.stock === 0}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="mb-3 font-medium">Quantity</h3>
              <div className="flex items-center gap-2 rounded-md border border-[var(--color-gray-300)] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[var(--color-gray-100)]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-[var(--color-gray-100)]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                size="xl"
                className="flex-1"
                leftIcon={<ShoppingBag className="h-5 w-5" />}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                variant="secondary"
                size="xl"
                className="flex-1"
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => toggleItem(product)}
                className={cn(
                  'flex items-center gap-2 text-sm transition-colors',
                  inWishlist
                    ? 'text-[var(--color-error)]'
                    : 'text-[var(--color-gray-600)] hover:text-[var(--color-primary-600)]'
                )}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary-600)]">
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>

            <hr className="my-6 border-[var(--color-gray-200)]" />

            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[var(--color-gray-600)]">
                <Truck className="h-5 w-5 text-[var(--color-primary-600)]" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--color-gray-600)]">
                <RefreshCw className="h-5 w-5 text-[var(--color-primary-600)]" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--color-gray-600)]">
                {product.stock > 0 ? (
                  <>
                    <Check className="h-5 w-5 text-[var(--color-success)]" />
                    <span className="text-[var(--color-success)]">
                      In stock - ships today
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5 text-[var(--color-gray-400)]" />
                    <span>Currently out of stock</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-[var(--color-gray-200)]">
            <div className="flex gap-8">
              {['description', 'specifications', 'shipping', 'reviews'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'border-b-2 pb-4 text-sm font-medium capitalize transition-colors',
                      activeTab === tab
                        ? 'border-[var(--color-primary-600)] text-[var(--color-primary-600)]'
                        : 'border-transparent text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)]'
                    )}
                  >
                    {tab}
                    {tab === 'reviews' && ` (${product.reviewCount})`}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <h3>Features</h3>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Easy to clean and maintain</li>
                  <li>Compact design saves space</li>
                  <li>Perfect for everyday use</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex justify-between border-b border-[var(--color-gray-100)] py-2">
                  <span className="text-[var(--color-gray-600)]">SKU</span>
                  <span className="font-medium">{product.id}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--color-gray-100)] py-2">
                  <span className="text-[var(--color-gray-600)]">Category</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--color-gray-100)] py-2">
                  <span className="text-[var(--color-gray-600)]">Availability</span>
                  <span className="font-medium">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <p>We offer the following shipping options:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[var(--color-success)]" />
                    Standard Shipping (5-7 days): FREE on orders over $50
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[var(--color-success)]" />
                    Express Shipping (2-3 days): $9.99
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[var(--color-success)]" />
                    Next Day Delivery: $19.99
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews">
                {/* Review Summary */}
                <div className="mb-8 flex flex-wrap items-center gap-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{product.rating}</p>
                    <Rating rating={product.rating} showCount={false} size="md" />
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-[var(--color-gray-100)] pb-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Rating rating={review.rating} showCount={false} />
                          <h4 className="mt-2 font-medium">{review.title}</h4>
                        </div>
                        <span className="text-sm text-[var(--color-gray-500)]">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-[var(--color-gray-600)]">
                        {review.content}
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="text-sm font-medium">
                          {review.author}
                        </span>
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-xs text-[var(--color-success)]">
                            <Check className="h-3 w-3" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {reviews.length === 0 && (
                  <p className="text-center text-[var(--color-gray-500)]">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
            <ProductCarousel products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
