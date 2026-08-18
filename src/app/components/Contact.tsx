'use client';

import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { sanitizeEmail } from '@/lib/sanitize';

// Rate limiting constants
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max 3 submissions per window
const EMAILJS_THROTTLE = RATE_LIMIT_WINDOW / MAX_SUBMISSIONS_PER_WINDOW;

const fieldMap = {
  from_name: 'name',
  from_email: 'email',
  message: 'message',
  website: 'website',
} as const;

const maxLengths = {
  from_name: 100,
  from_email: 254,
  message: 5000,
  website: 200,
} as const;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  });

  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionTimesRef = useRef<number[]>([]);

  // Initialize rate limiting from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('contact_form_submissions');
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();
        submissionTimesRef.current = Array.isArray(data?.times)
          ? data.times
              .filter(
                (time: unknown): time is number =>
                  typeof time === 'number' &&
                  Number.isFinite(time) &&
                  time <= now &&
                  now - time < RATE_LIMIT_WINDOW
              )
              .slice(-MAX_SUBMISSIONS_PER_WINDOW)
          : [];
      }
    } catch {
      // Storage can be unavailable in private browsing or blocked by policy.
      submissionTimesRef.current = [];
    }
  }, []);

  // Check if submission is allowed based on rate limiting
  const isRateLimited = (): boolean => {
    const now = Date.now();
    // Remove submissions older than the rate limit window
    submissionTimesRef.current = submissionTimesRef.current.filter(
      (time) => now - time < RATE_LIMIT_WINDOW
    );
    return submissionTimesRef.current.length >= MAX_SUBMISSIONS_PER_WINDOW;
  };

  // Record a submission for rate limiting
  const recordSubmission = (): void => {
    const now = Date.now();
    submissionTimesRef.current.push(now);
    try {
      localStorage.setItem(
        'contact_form_submissions',
        JSON.stringify({ times: submissionTimesRef.current })
      );
    } catch {
      // Keep the in-memory rate limit when persistent storage is unavailable.
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const mappedField = fieldMap[name as keyof typeof fieldMap];
    const maxLength = maxLengths[name as keyof typeof maxLengths];

    if (!mappedField || !maxLength || value.length > maxLength) return;

    setFormData((current) => ({ ...current, [mappedField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submissions
    if (isSubmitting) {
      setStatus('Submission already in progress. Please wait...');
      return;
    }

    // Rate limiting check
    if (isRateLimited()) {
      const oldestSubmission = submissionTimesRef.current[0];
      const timeUntilAvailable = Math.ceil(
        (RATE_LIMIT_WINDOW - (Date.now() - oldestSubmission)) / 1000
      );
      setStatus(
        `Too many submissions. Please wait ${timeUntilAvailable}s before submitting again.`
      );
      return;
    }

    // A hidden honeypot catches basic form bots without sending any data.
    if (formData.website) {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '', website: '' });
      return;
    }

    const normalizedName = formData.name.trim();
    const normalizedMessage = formData.message.trim();
    const sanitizedEmail = sanitizeEmail(formData.email);
    if (!sanitizedEmail) {
      setStatus('Please enter a valid email address.');
      return;
    }

    // Validate required fields
    if (!normalizedName || !normalizedMessage) {
      setStatus('Please fill in all required fields.');
      return;
    }

    // Additional validation: check minimum lengths
    if (normalizedName.length < 2) {
      setStatus('Name must be at least 2 characters long.');
      return;
    }

    if (normalizedMessage.length < 10) {
      setStatus('Message must be at least 10 characters long.');
      return;
    }

    setStatus('Sending...');
    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setStatus('Contact form is unavailable. Please try another method.');
        return;
      }

      // Count attempts, not only successes, so repeated failed calls cannot bypass
      // the client-side limit. EmailJS applies an independent SDK throttle too.
      recordSubmission();
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: normalizedName,
          from_email: sanitizedEmail,
          message: normalizedMessage,
        },
        {
          publicKey,
          blockHeadless: true,
          limitRate: {
            id: 'portfolio-contact-form',
            throttle: EMAILJS_THROTTLE,
          },
        }
      );

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Contact form submission failed:', error);
      }
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-12 sm:py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 sm:mb-14">Contact Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg min-h-[430px] sm:min-h-[400px] flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  maxLength={maxLengths.website}
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  minLength={2}
                  maxLength={maxLengths.from_name}
                  autoComplete="name"
                  required
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={maxLengths.from_email}
                  autoComplete="email"
                  required
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={maxLengths.message}
                  required
                  className="w-full h-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-11 bg-accent hover:bg-accent-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors duration-200 shadow-lg focus:ring-2 focus:ring-accent focus:outline-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status && (
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={`mt-4 wrap-break-word text-center text-sm ${status.includes('success') || status.includes('sent successfully')
                ? 'text-green-400'
                : status.includes('Sending')
                  ? 'text-accent'
                  : 'text-red-400'
                }`}
              >
                {status}
              </p>
            )}
          </div>

          {/* Google Map */}
          <div className="relative">
            <iframe
              title="My Location - Paterson, NJ"
              src="https://www.google.com/maps?q=Paterson%2C%20NJ&z=13&output=embed"
              width="100%"
              height="400"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.05)' }}
              className="w-full h-72 sm:h-100 rounded-lg shadow-lg border-none"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
