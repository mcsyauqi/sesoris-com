'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SITE_CONFIG } from '@/lib/constants';

const faqs = [
  {
    question: 'What are your shipping options?',
    answer: 'We offer Standard (5-7 days), Express (2-3 days), and Next Day delivery options. Orders over $50 qualify for free standard shipping.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all items. Products must be unused and in original packaging. Contact us to initiate a return.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within the United States. We\'re working on expanding our shipping options to serve more customers.',
  },
];

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us an email anytime',
    value: SITE_CONFIG.email,
    action: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Mon-Fri from 9am to 5pm',
    value: SITE_CONFIG.phone,
    action: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our support team',
    value: 'Start a conversation',
    action: '#chat',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Hero */}
      <section className="gradient-primary py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Contact Us</h1>
          <p className="mt-2 text-white/80">
            We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} className="mb-8" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <div className="rounded-xl border border-[var(--color-gray-200)] bg-white p-6 md:p-8">
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-[var(--color-gray-600)]">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-lg bg-[var(--color-success)]/10 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)]">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-semibold text-[var(--color-success)]">
                    Message Sent!
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-gray-600)]">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[var(--color-gray-300)] bg-white px-3 py-2 text-sm transition-colors placeholder:text-[var(--color-gray-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="product">Product Question</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="flex w-full rounded-md border border-[var(--color-gray-300)] bg-white px-3 py-2 text-sm transition-colors placeholder:text-[var(--color-gray-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-transparent resize-none"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="h-4 w-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.title}
                    href={method.action}
                    className="flex items-start gap-4 rounded-xl border border-[var(--color-gray-200)] bg-white p-4 transition-colors hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)]"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)]">
                      <Icon className="h-5 w-5 text-[var(--color-primary-600)]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-gray-900)]">
                        {method.title}
                      </h3>
                      <p className="text-sm text-[var(--color-gray-500)]">
                        {method.description}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--color-primary-600)]">
                        {method.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* FAQ */}
            <div className="rounded-xl border border-[var(--color-gray-200)] bg-white p-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[var(--color-primary-600)]" />
                <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
              </div>
              <div className="mt-4 space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-[var(--color-gray-100)] last:border-0"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between py-3 text-left"
                    >
                      <span className="font-medium text-[var(--color-gray-900)]">
                        {faq.question}
                      </span>
                      <span className="ml-4 text-[var(--color-gray-400)]">
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === index && (
                      <p className="pb-3 text-sm text-[var(--color-gray-600)]">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-xl border border-[var(--color-gray-200)] bg-white p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[var(--color-primary-600)]" />
                <h2 className="text-lg font-semibold">Business Hours</h2>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-600)]">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
