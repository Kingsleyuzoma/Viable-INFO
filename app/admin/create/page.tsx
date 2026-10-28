// app/admin/create/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";



export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [postType, setPostType] = useState("latest"); // 'latest' or 'highlight'
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // PROTECT PAGE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // CREATE BLOG
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let imageUrl = "";

      // Only upload if image exists
      if (image) {
        const imageRef = ref(
          storage,
          `blogs/${Date.now()}-${image.name}`
        );

        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "blogs"), {
        title,
        description,
        content,
        category,
        postType, // 'latest' for homepage grid / 'highlight' for banner cards
        image: imageUrl, // image URL from storage
        createdAt: serverTimestamp(),
      });

      alert("Blog Created Successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-950">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      
      
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full mt-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/dashboard" className="text-sm font-semibold text-emerald-600 hover:underline">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Create New Blog Post
          </h1>
        </div>

        <form onSubmit={handleCreateBlog} className="space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Post Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., The Future of Web Development in 2026"
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Category / Tag
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Technology, Design, INSIGHT"
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Homepage Placement Section
              </label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="latest">Latest Articles (Homepage Grid)</option>
                <option value="highlight">Highlight Insights (Featured Cards)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Short Description / Excerpt
            </label>
            <textarea
              required
              rows={2}
              placeholder="A brief summary that appears on cards..."
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Full Content
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write your complete article content here..."
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Featured Image <span className="lowercase font-normal text-zinc-400">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold transition-all shadow-lg ${
              loading ? "bg-zinc-500" : "bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white"
            }`}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </main>
    </div>
  );
}