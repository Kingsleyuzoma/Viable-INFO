
"use client"
// components/home/FeaturedPosts.tsx
import Link from 'next/link';

export default function FeaturedPosts() {
  // Placeholder array until Firebase Firestore integration is wired up
  const dummyPosts = [
    {
      id: '1',
      title: 'Building Modern Web Apps with Next.js and Firebase',
      excerpt: 'Learn how to streamline authentication and real-time data storage in your web projects.',
      category: 'Web Development',
      date: 'Oct 24, 2026',
    },
    {
      id: '2',
      title: 'The Evolution of Frontend State Management',
      excerpt: 'A deep dive into managing states efficiently without blowing up your bundle size.',
      category: 'Technology',
      date: 'Oct 20, 2026',
    },
  ];

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Insights</h2>
        <Link href="/blog" className="text-blue-600 hover:underline text-sm font-semibold">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                {post.excerpt}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
              <span>{post.date}</span>
              <Link href={`/blog/${post.id}`} className="text-blue-600 font-medium hover:underline">
                Read Article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}