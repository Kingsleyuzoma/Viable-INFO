"use client";

// app/about/page.tsx
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
            About Us
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-4 text-zinc-900 dark:text-white">
            About Viable INFO
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your reliable source for tech breakdowns, practical tutorials, and digital trends that matter. Built for clean reading without the noise.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 space-y-6">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Mission</h3>
          <p>
            In a digital world overflowing with clutter, clickbait, and endless distractions, Viable INFO was created with a single purpose: to deliver high-signal, practical technology content straight to the point. Whether you are a developer, tech enthusiast, or someone navigating digital trends, we cut through the noise to give you insights you can actually use.
          </p>

          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">What We Cover</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Web Development:</strong> Practical guides, modern frameworks, and engineering best practices.</li>
            <li><strong>Technology Breakdowns:</strong> Clear analyses of emerging tools and software.</li>
            <li><strong>Digital Trends:</strong> Curated insights into where the modern tech landscape is heading.</li>
          </ul>

          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Built for Clean Reading</h3>
          <p>
            We believe that consuming content should be fast, accessible, and distraction-free. That is why Viable INFO is engineered from the ground up to be lightweight, lightning-fast, and easy on the eyes across all devices.
          </p>
        </div>
      </div>
    </div>
  );
}