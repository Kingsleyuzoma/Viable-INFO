// components/Footer.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                V
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Viable <span className="text-blue-500">INFO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Your reliable source for tech breakdowns, practical tutorials, and digital trends that matter. Built for clean reading without the noise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">Articles</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories / Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Topics</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog?category=technology" className="hover:text-white transition">Technology</Link>
              </li>
              <li>
                <Link href="/blog?category=web-dev" className="hover:text-white transition">Web Development</Link>
              </li>
              <li>
                <Link href="/blog?category=trends" className="hover:text-white transition">Digital Trends</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {year} Viable INFO. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Crafted for clean reading.</p>
        </div>
      </div>
    </footer>
  );
}