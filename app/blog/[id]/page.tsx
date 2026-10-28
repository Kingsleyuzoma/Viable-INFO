// app/blog/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // You can remove this import now
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

// Notice we accept { params } directly as a prop from Next.js
export default function SingleBlogPostPage({ params }: { params: { id: string } }) {
  // Directly unwrap or use params.id
  const [id, setId] = useState<string>('');
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve params (in Next.js 15/16, params can sometimes be a Promise or object)
    async function unwrapParams() {
      const resolvedParams = await params;
      const postId = resolvedParams?.id;
      setId(postId);

      if (postId) {
        fetchBlogPost(postId);
      }
    }
    unwrapParams();
  }, [params]);

  const fetchBlogPost = async (postId: string) => {
    try {
      const docRef = doc(db, 'blogs', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
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
        <Link href="/blog" className="text-blue-600 hover:underline">← Back to all articles</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-block">
        ← Back to articles
      </Link>
      
      <div className="mb-6">
        <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
          {blog.category || 'Tech'}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-4 text-zinc-900 dark:text-white">
          {blog.title}
        </h1>
        <p className="text-sm text-zinc-500">
          Published on {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
        </p>
      </div>

      {blog.imageUrl && (
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg max-h-[450px]">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>
    </article>
  );
}