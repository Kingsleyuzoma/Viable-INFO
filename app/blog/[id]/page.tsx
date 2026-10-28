// app/blog/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function SingleBlogPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      
        <div className="grow flex items-center justify-center text-zinc-400">Loading article...</div>
        
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        
        <div className="grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Article Not Found</h1>
          <p className="text-zinc-500 mb-6">The article you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium">
            Back to Articles
          </Link>
        </div>
        
      </div>
    );
  }

  const formattedDate = blog.createdAt?.toDate 
    ? new Date(blog.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Dynamic OpenGraph / Social Meta Tags */}
      <head>
        <title>{blog.title} | Viable INFO</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta property="twitter:card" content="summary_large_image" />
      </head>

    

      <main className="grow max-w-4xl mx-auto px-6 py-16 w-full">
        <Link href="/blog" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-6 inline-block">
          &larr; Back to all articles
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            {blog.category || 'General'}
          </span>
          <span className="text-xs text-zinc-400">{formattedDate}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
          {blog.title}
        </h1>

        {blog.image && (
          <div className="relative h-96 w-full rounded-3xl overflow-hidden mb-10 shadow-lg bg-zinc-200 dark:bg-zinc-800">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
          {blog.content}
        </div>
      </main>

      
    </div>
  );
}