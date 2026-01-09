'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Lock,
  Tag,
  ArrowRight,
  Heart,
  Package,
} from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCarousel } from '@/components/product/product-carousel';
import { cn, formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { products } from '@/data/products';
import { useState } from 'react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoError('Invalid promo code');
    setTimeout(() => setPromoError(''), 3000);
  };

  // Get recommended products (first 4 products not in cart)
  const recommendedProducts = products
    .filter((p) => !items.some((item) => item.productId === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-gray-50)]">
        <div className="container-custom py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto h-20 w-20 text-[var(--color-gray-300)]" />
            <h1 className="mt-6 text-2xl font-bold text-[var(--color-gray-900)]">
              Your cart is empty
            </h1>
            <p className="mt-2 text-[var(--color-gray-600)]">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/shop">
              <Button className="mt-6" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-center text-2xl font-bold">
                Popular Products
              </h2>
              <ProductCarousel products={recommendedProducts} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} className="mb-8" />

        <h1 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
          Shopping Cart ({items.length})
        </h1>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <div className="mt-6 rounded-lg bg-[var(--color-primary-50)] p-4">
            <p className="text-sm text-[var(--color-primary-700)]">
              Add{' '}
              <span className="font-semibold">
                {formatPrice(remainingForFreeShipping)}
              </span>{' '}
              more to get <span className="font-semibold">FREE SHIPPING!</span>
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-primary-100)]">
              <div
                className="h-full bg-[var(--color-primary-600)] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[var(--color-gray-200)] bg-white">
              {/* Header */}
              <div className="hidden border-b border-[var(--color-gray-200)] px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
                <div className="col-span-6 text-sm font-medium text-[var(--color-gray-600)]">
                  Product
                </div>
                <div className="col-span-2 text-center text-sm font-medium text-[var(--color-gray-600)]">
                  Price
                </div>
                <div className="col-span-2 text-center text-sm font-medium text-[var(--color-gray-600)]">
                  Quantity
                </div>
                <div className="col-span-2 text-right text-sm font-medium text-[var(--color-gray-600)]">
                  Subtotal
                </div>
              </div>

              {/* Items */}
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.variantId}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-[var(--color-gray-100)] p-6 last:border-0"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-gray-100)]">
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-10 w-10 text-[var(--color-gray-300)]" />
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-[var(--color-gray-900)] hover:text-[var(--color-primary-600)]"
                        >
                          {item.product.name}
                        </Link>
                        {item.selectedVariant && (
                          <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                            {item.selectedVariant.name}
                          </p>
                        )}
                        <div className="mt-2 flex gap-4 md:hidden">
                          <button
                            onClick={() =>
                              removeItem(item.productId, item.variantId)
                            }
                            className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-error)]"
                          >
                            Remove
                          </button>
                          <button className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-primary-600)]">
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="md:hidden text-sm text-[var(--color-gray-500)]">
                        Price:{' '}
                      </span>
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center gap-2 rounded-md border border-[var(--color-gray-200)]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.variantId
                            )
                          }
                          className="p-2 hover:bg-[var(--color-gray-100)]"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.variantId
                            )
                          }
                          className="p-2 hover:bg-[var(--color-gray-100)]"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 flex items-center justify-end gap-4">
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.variantId)
                        }
                        className="hidden text-[var(--color-gray-400)] hover:text-[var(--color-error)] md:block"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 flex justify-between">
              <Link
                href="/shop"
                className="text-sm text-[var(--color-primary-600)] hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Promo Code */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      leftIcon={<Tag className="h-4 w-4" />}
                      error={promoError}
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                </div>

                <hr className="my-6 border-[var(--color-gray-200)]" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-gray-600)]">
                      Subtotal ({items.length} items)
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-gray-600)]">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-[var(--color-success)]">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-gray-600)]">
                      Estimated Tax
                    </span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <hr className="my-4 border-[var(--color-gray-200)]" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                {/* Express Checkout */}
                <div className="mt-4">
                  <p className="mb-3 text-center text-sm text-[var(--color-gray-500)]">
                    or express checkout
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800">
                      PayPal
                    </Button>
                    <Button variant="outline" className="flex-1">
                      GPay
                    </Button>
                  </div>
                </div>

                <p className="mt-4 flex items-center justify-center gap-1 text-xs text-[var(--color-gray-500)]">
                  <Lock className="h-3 w-3" />
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">You Might Also Like</h2>
            <ProductCarousel products={recommendedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
