'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { sanitizeEmail, isValidEmail } from '@/lib/sanitize';
// import { FaMapMarkerAlt } from 'react-icons/fa';

// Rate limiting constants
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max 3 submissions per window
const SUBMISSION_TIMEOUT = 5 * 1000; // 5 second timeout per submission

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmissionTimeRef = useRef(0);
  const submissionTimesRef = useRef<number[]>([]);

  // Initialize rate limiting from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('contact_form_submissions');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        submissionTimesRef.current = data.times || [];
        // Clean up old submissions outside the rate limit window
        const now = Date.now();
        submissionTimesRef.current = submissionTimesRef.current.filter(
          (time) => now - time < RATE_LIMIT_WINDOW
        );
      } catch {
        submissionTimesRef.current = [];
      }
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
    localStorage.setItem(
      'contact_form_submissions',
      JSON.stringify({ times: submissionTimesRef.current })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Enforce maximum input lengths to prevent DoS attacks
    const maxLengths: Record<string, number> = {
      from_name: 100,
      from_email: 254,
      message: 5000, // Reasonable limit for a message
    };

    const maxLength = maxLengths[name] || 1000;

    if (value.length <= maxLength) {
      // Update the state based on the EmailJS field names
      if (name === 'from_name') {
        setFormData({ ...formData, name: value });
      } else if (name === 'from_email') {
        setFormData({ ...formData, email: value });
      } else if (name === 'message') {
        setFormData({ ...formData, message: value });
      }
    }
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

    setStatus('Sending...');
    setIsSubmitting(true);

    // Set a timeout to prevent hanging requests
    const submissionTimeoutId = setTimeout(() => {
      setIsSubmitting(false);
      setStatus('Request timeout. Please try again.');
    }, SUBMISSION_TIMEOUT);

    if (!form.current) {
      clearTimeout(submissionTimeoutId);
      setIsSubmitting(false);
      setStatus('Form reference error. Please try again.');
      return;
    }

    // Validate and sanitize email
    const sanitizedEmail = sanitizeEmail(formData.email);
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      clearTimeout(submissionTimeoutId);
      setIsSubmitting(false);
      setStatus('Please enter a valid email address.');
      return;
    }

    // Validate required fields
    if (!formData.name.trim() || !formData.message.trim()) {
      clearTimeout(submissionTimeoutId);
      setIsSubmitting(false);
      setStatus('Please fill in all required fields.');
      return;
    }

    // Additional validation: check minimum lengths
    if (formData.name.trim().length < 2) {
      clearTimeout(submissionTimeoutId);
      setIsSubmitting(false);
      setStatus('Name must be at least 2 characters long.');
      return;
    }

    if (formData.message.trim().length < 10) {
      clearTimeout(submissionTimeoutId);
      setIsSubmitting(false);
      setStatus('Message must be at least 10 characters long.');
      return;
    }

    try {
      // EmailJS configuration - you'll need to replace these with your actual values
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      // Record successful submission for rate limiting
      recordSubmission();

      clearTimeout(submissionTimeoutId);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      lastSubmissionTimeRef.current = Date.now();
    } catch (error) {
      clearTimeout(submissionTimeoutId);
      void error;
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Contact Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105 h-[400px] flex flex-col">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  required
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  required
                  className="w-full h-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-all duration-200 shadow-lg focus:ring-2 focus:ring-accent focus:outline-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status && (
              <p className={`mt-4 text-center text-sm ${status.includes('success') || status.includes('sent successfully')
                ? 'text-green-400'
                : status.includes('Sending')
                  ? 'text-blue-400'
                  : 'text-red-400'
                }`}>
                {status}
              </p>
            )}
          </div>

          {/* Google Map */}
          <div className="relative">
            {/* <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center justify-center">
              <FaMapMarkerAlt className="mr-2" /> My Location
            </h3> */}
            <iframe
              title="My Location - Paterson, NJ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96884.16691981242!2d-74.21440107135363!3d40.916751033779756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2ef4096786dc9%3A0xa02889844b22b6e6!2sPaterson%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sbd!4v1693521128697!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ filter: 'invert(1)' }}
              className="rounded-lg shadow-lg border-none transition-transform hover:scale-105"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
