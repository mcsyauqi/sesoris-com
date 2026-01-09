'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ChevronLeft, Package, CreditCard, Check } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, formatPrice } from '@/lib/utils';
import { SHIPPING_OPTIONS } from '@/lib/constants';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTax, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping);
  const shipping = shippingOption?.price || 0;
  const tax = getTax();
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-gray-50)]">
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-[var(--color-gray-600)]">
            Add some items to your cart before checking out.
          </p>
          <Link href="/shop">
            <Button className="mt-6">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Header */}
      <header className="border-b border-[var(--color-gray-200)] bg-white">
        <div className="container-custom flex h-16 items-center justify-between">
          <Link href="/">
            <Logo variant="compact" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary-600)]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Express Checkout */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Express Checkout</h2>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" className="flex-1 bg-[#5469D4] text-white hover:bg-[#4457B9]">
                    Pay with Stripe
                  </Button>
                  <Button variant="outline" className="flex-1 bg-[#FFC439] text-black hover:bg-[#F2B82D]">
                    PayPal
                  </Button>
                </div>
              </div>

              <div className="my-6 flex items-center gap-4">
                <hr className="flex-1 border-[var(--color-gray-300)]" />
                <span className="text-sm text-[var(--color-gray-500)]">
                  or continue below
                </span>
                <hr className="flex-1 border-[var(--color-gray-300)]" />
              </div>

              {/* Contact Information */}
              <div className="rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <div className="mt-4">
                  <Input
                    type="email"
                    placeholder="Email address"
                    required
                  />
                  <label className="mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary-600)]"
                    />
                    <span className="text-sm text-[var(--color-gray-600)]">
                      Email me with news and offers
                    </span>
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mt-6 rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <div className="mt-4 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="First name" required />
                    <Input placeholder="Last name" required />
                  </div>
                  <Input placeholder="Address" required />
                  <Input placeholder="Apartment, suite, etc. (optional)" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Input placeholder="City" required />
                    <Input placeholder="State" required />
                    <Input placeholder="ZIP code" required />
                  </div>
                  <Input placeholder="Phone" type="tel" required />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mt-6 rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Shipping Method</h2>
                <div className="mt-4 space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        'flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors',
                        selectedShipping === option.id
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                          : 'border-[var(--color-gray-200)] hover:border-[var(--color-gray-300)]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={() => setSelectedShipping(option.id)}
                          className="h-4 w-4 border-[var(--color-gray-300)] text-[var(--color-primary-600)]"
                        />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-[var(--color-gray-500)]">
                            {option.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {option.price === 0 ? 'FREE' : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="mt-6 rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
                <h2 className="text-lg font-semibold">Payment</h2>
                <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                  All transactions are secure and encrypted.
                </p>
                <div className="mt-4 space-y-4">
                  <Input
                    placeholder="Card number"
                    type="text"
                    required
                    leftIcon={<CreditCard className="h-4 w-4" />}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Expiration (MM/YY)" required />
                    <Input placeholder="CVV" required />
                  </div>
                  <Input placeholder="Name on card" required />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6">
                <Button
                  type="submit"
                  size="xl"
                  className="w-full"
                  isLoading={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>
                <p className="mt-3 text-center text-xs text-[var(--color-gray-500)]">
                  By placing your order, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 rounded-lg border border-[var(--color-gray-200)] bg-white p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              {/* Items */}
              <div className="mt-4 max-h-80 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-gray-100)]">
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-6 w-6 text-[var(--color-gray-300)]" />
                      </div>
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-gray-600)] text-xs text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        {item.selectedVariant && (
                          <p className="text-xs text-[var(--color-gray-500)]">
                            {item.selectedVariant.name}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-[var(--color-gray-200)]" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-[var(--color-success)]">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <hr className="my-4 border-[var(--color-gray-200)]" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
