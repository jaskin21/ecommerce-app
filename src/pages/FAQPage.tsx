// src/pages/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Visa, MasterCard, PayPal, and bank transfers. All transactions are encrypted and secure.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping usually takes 3–5 business days, while express shipping takes 1–2 days.',
  },
  {
    question: 'Do you offer returns or exchanges?',
    answer:
      'Yes, returns and exchanges are available within 30 days of purchase. Items must be in original condition.',
  },
  {
    question: 'Is customer support available?',
    answer:
      'Our support team is available 24/7 via live chat and email to help with any concerns.',
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='mx-auto max-w-3xl px-4 py-12 lg:py-20'>
      <h2 className='mb-8 text-center text-3xl font-bold text-slate-900 dark:text-white'>
        Frequently Asked Questions
      </h2>

      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
          >
            <button
              onClick={() => toggleFAQ(index)}
              className='flex w-full items-center justify-between p-4 text-left text-slate-900 dark:text-white'
            >
              <span className='font-medium'>{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className='h-5 w-5 text-slate-500 dark:text-slate-400' />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='overflow-hidden px-4 pb-4 text-slate-600 dark:text-slate-300'
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}