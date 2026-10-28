// app/admin/edit/[id]/page.tsx
  'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [postType, setPostType] = useState('latest');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
      } else if (id) {
        try {
          const docRef = doc(db, 'blogs', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || '');
            setDescription(data.description || '');
            setContent(data.content || '');
            setCategory(data.category || '');
            setPostType(data.postType || 'latest');
            setExistingImageUrl(data.image || '');
          } else {
            alert('Post not found');
            router.push('/admin/dashboard');
          }
        } catch (error) {
          console.error('Error fetching post for edit:', error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = existingImageUrl;

      if (imageFile) {
        const imageRef = ref(storage, `blogs/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        title,
        description,
        content,
        category,
        postType,
        image: imageUrl,
      });

      alert("Blog Updated Successfully");
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-400">
        Loading article data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      
      
      <main className="grow max-w-3xl mx-auto px-4 py-12 w-full mt-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/dashboard" className="text-sm font-semibold text-emerald-600 hover:underline">
            &larr; Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href={`/blog/${id}`} 
              target="_blank"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 transition"
            >
              👁️ View Live Post
            </Link>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Edit Article
            </h1>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Post Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Full Content
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Update Image <span className="lowercase font-normal text-zinc-400">(optional)</span>
            </label>
            {existingImageUrl && (
              <p className="text-xs text-emerald-600 mb-2">Current image attached. Uploading a new file will replace it.</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl text-zinc-900 dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium rounded-xl transition text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition-all shadow-lg ${
                saving ? "bg-zinc-500" : "bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}