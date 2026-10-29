
// components/BlogCard.tsx
import Link from 'next/link';

export default function BlogCard({ blog }: { blog: any }) {
  // Format Firestore timestamp safely
  const formattedDate = blog.createdAt?.toDate 
    ? new Date(blog.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <article className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">

      <div>
        {/* Optional Image */}
        {blog.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              {blog.category || 'General'}
            </span>
            <span className="text-xs text-zinc-400">{formattedDate}</span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
            {blog.title}
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400 text-base line-clamp-2">
            {blog.excerpt || blog.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <Link 
          href={`/blog/${blog.id}`} 
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Read more <span>→</span>
        </Link>
      </div>
    </article>
  );
}