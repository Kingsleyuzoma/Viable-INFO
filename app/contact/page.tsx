
// app/contact/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can hook up email sending or store messages in Firestore if desired
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>

      <div className="mb-8">
        <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-2 text-zinc-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Have a question, feedback, or want to collaborate? Drop us a message below.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Message Sent!</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900/80 border border-zinc-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you?"
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}