// components/home/LatestArticles.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";

export default function LatestArticles() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch latest articles generally, then filter in code to prevent missing-field bugs
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter: Keep posts marked as 'latest' OR posts that don't have a postType set yet (defaults to latest)
      const filtered = blogData.filter(
        (blog: any) => !blog.postType || blog.postType === "latest"
      );

      // Limit to top 8
      setBlogs(filtered.slice(0, 8));
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="latest" className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-white">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Latest Articles</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Fresh insights from the world of tech & ideas</p>
        </div>
        
        <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors">
          View all articles
          <span>→</span>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No latest articles published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
}