// app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      const postSlug = resolvedParams?.slug;
      setSlug(postSlug);

      if (postSlug) {
        fetchBlogPostBySlug(postSlug);
      }
    }
    unwrapParams();
  }, [params]);

  const fetchBlogPostBySlug = async (postSlug: string) => {
    try {
      // Query Firestore for the document where the 'slug' field matches the URL
      const q = query(collection(db, 'blogs'), where('slug', '==', postSlug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-zinc-500">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Article not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Back to home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-block">
        ← Back to home
      </Link>
      
      <div className="mb-6">
        <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
          {blog.category || 'Tech'}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-4 text-zinc-900 dark:text-white">
          {blog.title}
        </h1>
        <p className="text-sm text-zinc-500">
          Published on {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'Recent'}
        </p>
      </div>

      {blog.image && (
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg max-h-[450px]">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>
    </article>
  );
}