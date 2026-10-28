// components/home/HighlightInsights.tsx
'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function HighlightInsights() {
  const [highlights, setHighlights] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter specifically for highlight posts and limit to top 2
      const highlightPosts = data.filter((blog: any) => blog.postType === "highlight");
      setHighlights(highlightPosts.slice(0, 2));
    });

    return () => unsubscribe();
  }, []);

  // If no highlights are published yet, don't render empty broken boxes
  if (highlights.length === 0) {
    return null;
  }

  return (
    <section className="bg-white dark:bg-zinc-900 py-16 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {highlights.map((item, index) => {
            const gradients = [
              "from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-900 hover:border-blue-200 dark:hover:border-zinc-700 text-blue-600 dark:text-blue-400",
              "from-rose-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 hover:border-rose-200 dark:hover:border-zinc-700 text-rose-600 dark:text-rose-400"
            ];
            
            return (
              <div 
                key={item.id} 
                className={`group bg-linear-to-br ${gradients[index % gradients.length]} p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-transparent flex flex-col justify-between`}
              >
                <div>
                  <div className="text-sm font-semibold mb-3 tracking-widest uppercase">
                    {item.category || 'INSIGHT'}
                  </div>
                  <h3 className="text-3xl font-semibold leading-tight mb-4 text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link href={`/blog/${item.id}`} className="text-sm font-medium hover:underline inline-flex items-center gap-1">
                    Read more →
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}