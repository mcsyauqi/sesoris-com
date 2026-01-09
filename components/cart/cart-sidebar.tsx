'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, Lock, Tag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-gray-200)] px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <p className="text-sm text-[var(--color-gray-500)]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              onClick={closeCart}
              className="rounded-md p-2 hover:bg-[var(--color-gray-100)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && remainingForFreeShipping > 0 && (
            <div className="border-b border-[var(--color-gray-200)] bg-[var(--color-primary-50)] px-6 py-3">
              <p className="text-sm text-[var(--color-primary-700)]">
                Add{' '}
                <span className="font-semibold">
                  {formatPrice(remainingForFreeShipping)}
                </span>{' '}
                more for free shipping!
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-16 w-16 text-[var(--color-gray-300)]" />
                <h3 className="mt-4 font-semibold text-[var(--color-gray-900)]">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                  Add items to your cart to checkout
                </p>
                <Button onClick={closeCart} className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 border-b border-[var(--color-gray-100)] pb-4 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-gray-100)]">
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-[var(--color-gray-300)]" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-[var(--color-gray-900)] hover:text-[var(--color-primary-600)] line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedVariant && (
                            <p className="mt-0.5 text-sm text-[var(--color-gray-500)]">
                              {item.selectedVariant.name}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.variantId)
                          }
                          className="text-[var(--color-gray-400)] hover:text-[var(--color-error)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-md border border-[var(--color-gray-200)]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.variantId
                              )
                            }
                            className="p-1.5 hover:bg-[var(--color-gray-100)]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.variantId
                              )
                            }
                            className="p-1.5 hover:bg-[var(--color-gray-100)]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[var(--color-gray-200)] p-6">
              {/* Promo Code */}
              <button className="mb-4 flex w-full items-center justify-between rounded-md border border-[var(--color-gray-200)] px-4 py-2 text-sm text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]">
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Add promo code
                </span>
                <span>+</span>
              </button>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-gray-600)]">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-gray-500)]">
                Shipping & taxes calculated at checkout
              </p>

              {/* Buttons */}
              <div className="mt-4 space-y-2">
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full">Checkout</Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" className="w-full">
                    View Full Cart
                  </Button>
                </Link>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1 text-xs text-[var(--color-gray-500)]">
                <Lock className="h-3 w-3" />
                Secure checkout with SSL encryption
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
