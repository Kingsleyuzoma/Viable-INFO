
"use client"
// components/home/Categories.tsx
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Technology', slug: 'technology', count: '12 posts' },
  { name: 'Web Development', slug: 'web-dev', count: '8 posts' },
  { name: 'Digital Trends', slug: 'trends', count: '5 posts' },
  { name: 'Guides & Tutorials', slug: 'guides', count: '10 posts' },
];

export default function Categories() {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Top Categories</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            href={`/blog?category=${cat.slug}`}
            key={cat.slug}
            className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:border-blue-500 transition group"
          >
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition">
              {cat.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cat.count}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}