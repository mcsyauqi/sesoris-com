'use client';

import { motion } from 'framer-motion';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

// Mock Instagram posts
const posts = [
  { id: '1', likes: 234 },
  { id: '2', likes: 189 },
  { id: '3', likes: 312 },
  { id: '4', likes: 156 },
  { id: '5', likes: 278 },
  { id: '6', likes: 203 },
];

const colors = [
  'from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
  'from-[var(--color-accent-yellow)]/30 to-[var(--color-accent-orange)]/30',
  'from-[var(--color-primary-200)] to-[var(--color-primary-300)]',
  'from-[var(--color-accent-coral)]/30 to-[var(--color-accent-orange)]/30',
  'from-[var(--color-primary-100)] to-[var(--color-accent-teal)]/30',
  'from-[var(--color-accent-yellow)]/30 to-[var(--color-primary-200)]',
];

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="text-center">
          <div className="mb-2 inline-flex items-center justify-center gap-2 text-[var(--color-gray-900)]">
            <Instagram className="h-5 w-5" />
            <span className="font-semibold">Follow Us @sesoris</span>
          </div>
          <p className="text-[var(--color-gray-500)]">
            Join our community of 50K+ followers
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              {/* Placeholder Image */}
              <div
                className={cn(
                  'h-full w-full bg-gradient-to-br',
                  colors[index]
                )}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Instagram className="h-8 w-8 text-white/50" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5 fill-current" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              leftIcon={<Instagram className="h-4 w-4" />}
              rightIcon={<ExternalLink className="h-4 w-4" />}
            >
              Follow @sesoris
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
