import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { BLOG_POSTS as DEFAULT_POSTS, FEATURED_POST as DEFAULT_FEATURED, CATEGORIES as DEFAULT_CATEGORIES } from '../data/posts';
import type { BlogPost } from '../data/posts';

// ---- Types ----
export interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
}

interface PostsContextType {
  posts: BlogPost[];
  featuredPost: BlogPost;
  categories: typeof DEFAULT_CATEGORIES;
  settings: SiteSettings;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  setFeatured: (id: number) => void;
  updateSettings: (s: Partial<SiteSettings>) => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

// Admin password — your client can change this
const ADMIN_PASSWORD = 'mindpaws2026';

const STORAGE_KEYS = {
  posts: 'mp_posts',
  featured: 'mp_featured',
  settings: 'mp_settings',
  auth: 'mp_auth',
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Mind Paws',
  heroTitle: 'Discover the world in a new way',
  heroSubtitle: 'Explore breathtaking destinations, untold stories, and the beauty of our planet through curated articles and stunning photography.',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    loadFromStorage(STORAGE_KEYS.posts, [...DEFAULT_POSTS, DEFAULT_FEATURED])
  );
  const [featuredId, setFeaturedId] = useState<number>(() =>
    loadFromStorage(STORAGE_KEYS.featured, DEFAULT_FEATURED.id)
  );
  const [settings, setSettings] = useState<SiteSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );
  const [isAdmin, setIsAdmin] = useState(() =>
    loadFromStorage(STORAGE_KEYS.auth, false)
  );

  // Persist on change
  useEffect(() => { saveToStorage(STORAGE_KEYS.posts, posts); }, [posts]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.featured, featuredId); }, [featuredId]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.settings, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.auth, isAdmin); }, [isAdmin]);

  const featuredPost = posts.find((p) => p.id === featuredId) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredId);

  // Derive categories from posts
  const categoryCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categories = DEFAULT_CATEGORIES.map((c) => ({
    ...c,
    count: categoryCounts[c.name] || c.count,
  }));

  function login(password: string) {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsAdmin(false);
    saveToStorage(STORAGE_KEYS.auth, false);
  }

  function addPost(post: Omit<BlogPost, 'id'>) {
    const maxId = posts.reduce((max, p) => Math.max(max, p.id), 0);
    setPosts((prev) => [...prev, { ...post, id: maxId + 1 }]);
  }

  function updatePost(id: number, updates: Partial<BlogPost>) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }

  function deletePost(id: number) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (featuredId === id) {
      const remaining = posts.filter((p) => p.id !== id);
      if (remaining.length > 0) setFeaturedId(remaining[0].id);
    }
  }

  function setFeatured(id: number) {
    setFeaturedId(id);
  }

  function updateSettings(s: Partial<SiteSettings>) {
    setSettings((prev) => ({ ...prev, ...s }));
  }

  return (
    <PostsContext.Provider
      value={{
        posts: regularPosts,
        featuredPost,
        categories,
        settings,
        isAdmin,
        login,
        logout,
        addPost,
        updatePost,
        deletePost,
        setFeatured,
        updateSettings,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
