// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'messages'>('posts');
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [countryStats, setCountryStats] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // Real-time listener for blog posts
  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribePosts();
  }, []);

  // Real-time listener for incoming contact messages
  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribeMessages();
  }, []);

  // Real-time listener for total visitor count
  useEffect(() => {
    const unsubscribeStats = onSnapshot(doc(db, 'analytics', 'traffic'), (docSnap) => {
      if (docSnap.exists()) {
        setTotalVisitors(docSnap.data().totalVisitors || 0);
      }
    });

    return () => unsubscribeStats();
  }, []);

  // Real-time listener for visitor country logs breakdown
  useEffect(() => {
    const q = query(collection(db, 'visitorLogs'), orderBy('createdAt', 'desc'));
    const unsubscribeLogs = onSnapshot(q, (snapshot) => {
      const counts: { [key: string]: number } = {};
      snapshot.docs.forEach((doc) => {
        const country = doc.data().country || 'Unknown';
        counts[country] = (counts[country] || 0) + 1;
      });
      setCountryStats(counts);
    });

    return () => unsubscribeLogs();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full">
              Admin Control Center
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
              Dashboard Overview
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Welcome back, {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/create"
              className="bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white text-white text-sm font-medium px-5 py-3 rounded-xl transition shadow-sm"
            >
              + Create New Post
            </Link>
            <button
              onClick={handleLogout}
              className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-medium px-4 py-3 rounded-xl transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Real-Time Stats Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Unique Visitors</p>
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white mt-2">{totalVisitors.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">● Live Tracking Active</span>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Published Articles</p>
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white mt-2">{posts.length}</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">Active on Viable INFO</span>
          </div>

          {/* Visitor Breakdown by Country */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm sm:col-span-3 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Visitors by Country</p>
            {Object.keys(countryStats).length === 0 ? (
              <p className="text-xs text-zinc-400">No country data recorded yet.</p>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {Object.entries(countryStats).map(([country, count]) => (
                  <div key={country} className="flex justify-between items-center text-xs">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{country}</span>
                    <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs (Posts vs Messages) */}
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === 'posts'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            Manage Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            Inbox Messages
            {messages.length > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === 'messages' ? 'bg-blue-700 text-white' : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600'}`}>
                {messages.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Articles Management Section */}
        {activeTab === 'posts' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Manage Blog Posts</h2>
              <span className="text-xs text-zinc-400">{posts.length} articles total</span>
            </div>

            {posts.length === 0 ? (
              <div className="p-12 text-center text-zinc-400 text-sm">
                No articles posted yet. Click **+ Create New Post** to write your first article!
              </div>
            ) : (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {posts.map((post) => (
                  <div key={post.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                          {post.category || 'General'}
                        </span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full uppercase">
                          {post.postType || 'latest'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">{post.title}</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Published on {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.id}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium rounded-lg transition"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-600 text-xs font-medium rounded-lg transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Messages Inbox Section */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Contact Form Inbox</h2>
              <span className="text-xs text-zinc-400">{messages.length} messages received</span>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center text-zinc-400 text-sm">
                No contact messages yet. When visitors fill out your contact form, they will appear here!
              </div>
            ) : (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-6 space-y-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-xs text-blue-600 hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-400">
                          {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleString() : 'Just now'}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}