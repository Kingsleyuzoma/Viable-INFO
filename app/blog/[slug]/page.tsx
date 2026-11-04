// app/blog/[slug]/page.tsx
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. SAFE DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  try {
    if (!slug || slug === '[slug]') {
      return {
        title: 'Viable INFO | Inform. Educate. Empower.',
        description: 'Explore useful knowledge, practical insights, and informative articles on Viable INFO.',
      };
    }

    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const post = querySnapshot.docs[0].data();
      const siteUrl = 'https://viable-info.vercel.app';

      return {
        title: `${post.title || 'Article'} | Viable INFO`,
        description: post.description || 'Explore useful knowledge, practical insights, and informative articles on Viable INFO.',
        openGraph: {
          title: post.title || 'Viable INFO',
          description: post.description || 'Explore useful knowledge and practical insights.',
          url: `${siteUrl}/blog/${slug}`,
          siteName: 'Viable INFO',
          images: post.image ? [{ url: post.image }] : [],
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title || 'Viable INFO',
          description: post.description || 'Explore useful knowledge and practical insights.',
          images: post.image ? [post.image] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching metadata from database:', error);
  }

  return {
    title: 'Viable INFO | Inform. Educate. Empower.',
    description: 'Explore useful knowledge and practical insights.',
  };
}

// Separate internal content component
async function BlogContent({ slug }: { slug: string }) {
  if (!slug || slug === '[slug]') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center text-zinc-400">
        Loading article...
      </div>
    );
  }

  let post: any = null;
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      post = { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching post content:', error);
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Article Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const formattedDate = post.createdAt?.toDate 
    ? new Date(post.createdAt.toDate()).toLocaleDateString() 
    : 'Recent';

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <div className="mb-6">
        <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-full">
          {post.category || 'General'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-zinc-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500">
          Published on {formattedDate} • Viable INFO
        </p>
      </div>

      {post.image && (
        <div className="mb-10 overflow-hidden rounded-3xl shadow-lg max-h-[450px]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
        {post.content}
      </div>
    </article>
  );
}

// 2. MAIN SERVER COMPONENT
export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-6 py-20 text-center text-zinc-400">Loading article...</div>}>
      <BlogContent slug={slug || ''} />
    </Suspense>
  );
}