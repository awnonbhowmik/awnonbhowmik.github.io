'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
// import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Update the state based on the EmailJS field names
    if (name === 'from_name') {
      setFormData({ ...formData, name: value });
    } else if (name === 'from_email') {
      setFormData({ ...formData, email: value });
    } else if (name === 'message') {
      setFormData({ ...formData, message: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    if (!form.current) {
      setStatus('Form reference error. Please try again.');
      return;
    }

    try {
      // EmailJS configuration - you'll need to replace these with your actual values
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      console.log('EmailJS result:', result.text);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Send Message
              </button>
            </form>

            {status && (
              <p className={`mt-6 text-center ${status.includes('success') || status.includes('sent successfully')
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
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
