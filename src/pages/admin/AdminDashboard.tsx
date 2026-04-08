import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Edit3, Trash2, Star, LogOut, ArrowLeft,
  LayoutDashboard, FileText, Settings, Image,
} from 'lucide-react';
import { usePosts } from '../../context/PostsContext';

type Tab = 'posts' | 'settings';

export function AdminDashboard() {
  const { posts, featuredPost, settings, isAdmin, logout, deletePost, setFeatured, updateSettings } = usePosts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Settings form state
  const [siteName, setSiteName] = useState(settings.siteName);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const allPosts = [featuredPost, ...posts];

  function handleDeleteConfirm(id: number) {
    deletePost(id);
    setDeleteConfirm(null);
  }

  function handleSaveSettings() {
    updateSettings({ siteName, heroTitle, heroSubtitle });
    alert('Settings saved!');
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">View Site</span>
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="text-white font-semibold">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-white/10 pb-px">
          {([
            { id: 'posts' as Tab, label: 'Posts', icon: FileText },
            { id: 'settings' as Tab, label: 'Site Settings', icon: Settings },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                  : 'text-white/40 border-transparent hover:text-white/60'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== POSTS TAB ===== */}
        {activeTab === 'posts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-white text-2xl font-semibold">Manage Posts</h2>
                <p className="text-white/40 text-sm mt-1">{allPosts.length} articles total</p>
              </div>
              <Link
                to="/admin/post/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Link>
            </div>

            {/* Post List */}
            <div className="space-y-3">
              {allPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-24 h-20 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                    {post.image ? (
                      <img src={post.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-5 h-5 text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.id === featuredPost.id && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[var(--color-accent)]/15 text-[var(--color-accent)] rounded-full">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-white/5 text-white/40 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">{post.title}</h3>
                    <p className="text-white/30 text-xs mt-0.5">{post.author} · {post.date}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    {post.id !== featuredPost.id && (
                      <button
                        onClick={() => setFeatured(post.id)}
                        title="Set as featured"
                        className="p-2 text-white/30 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    )}
                    <Link
                      to={`/admin/post/${post.id}`}
                      className="p-2 text-white/30 hover:text-[var(--color-accent)] hover:bg-white/5 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    {deleteConfirm === post.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteConfirm(post.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 text-xs text-white/40 hover:text-white rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(post.id)}
                        title="Delete"
                        className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== SETTINGS TAB ===== */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <h2 className="text-white text-2xl font-semibold mb-2">Site Settings</h2>
            <p className="text-white/40 text-sm mb-10">Customize how your site looks to visitors.</p>

            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-[var(--color-accent)]/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-[var(--color-accent)]/40 transition-all"
                />
                <p className="text-white/20 text-xs mt-1.5">Tip: wrap a word in * to make it italic (e.g. "Discover the *world*")</p>
              </div>

              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Hero Subtitle</label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-[var(--color-accent)]/40 transition-all resize-none"
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
              >
                Save Settings
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
