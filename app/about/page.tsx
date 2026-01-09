import { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Heart, Users, Award, Truck, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Sesoris - your trusted destination for quality products and exceptional service.',
};

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Everything we do is centered around delivering the best experience for our customers.',
  },
  {
    icon: Award,
    title: 'Quality Products',
    description: 'We carefully curate every product to ensure it meets our high standards of quality.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in building meaningful connections with our customers and community.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Honest pricing, clear communication, and reliable service you can count on.',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '4.8', label: 'Average Rating' },
  { value: '24/7', label: 'Support' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white">
            <Leaf className="h-5 w-5" />
            <span className="font-medium">Our Story</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white md:text-5xl">
            About {SITE_CONFIG.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We&apos;re on a mission to make quality products accessible to everyone.
            {SITE_CONFIG.tagline}.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
                Why We Started
              </h2>
              <div className="mt-6 space-y-4 text-[var(--color-gray-600)]">
                <p>
                  {SITE_CONFIG.name} was founded with a simple idea: everyone deserves
                  access to quality products at fair prices. We noticed that finding
                  reliable, well-made everyday items was often frustrating and expensive.
                </p>
                <p>
                  So we set out to change that. We carefully curate each product in our
                  collection, testing them ourselves before they ever reach our shelves.
                  We believe in quality over quantity, and that shows in everything we offer.
                </p>
                <p>
                  Today, we&apos;re proud to serve thousands of customers who trust us for
                  their home, kitchen, and gift needs. But we&apos;re just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]">
                <div className="flex h-full w-full items-center justify-center">
                  <Leaf className="h-32 w-32 text-[var(--color-primary-300)]" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                    <Heart className="h-6 w-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-gray-900)]">50,000+</p>
                    <p className="text-sm text-[var(--color-gray-500)]">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[var(--color-gray-50)] py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[var(--color-primary-600)] md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[var(--color-gray-600)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--color-gray-900)] md:text-3xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-600)]">
              These core values guide everything we do at {SITE_CONFIG.name}.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-[var(--color-gray-200)] bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                    <Icon className="h-6 w-6 text-[var(--color-primary-600)]" />
                  </div>
                  <h3 className="mt-4 font-semibold text-[var(--color-gray-900)]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-gray-600)]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to Experience the Difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Browse our collection and discover why thousands of customers choose us.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-white text-[var(--color-primary-600)] hover:bg-white/90"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
