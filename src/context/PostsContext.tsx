import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { BLOG_POSTS as DEFAULT_POSTS, FEATURED_POST as DEFAULT_FEATURED, CATEGORIES as DEFAULT_CATEGORIES } from '../data/posts';
import type { BlogPost } from '../data/posts';
import { supabase } from '../lib/supabase';

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
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updatePost: (id: number, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setFeatured: (id: number) => Promise<void>;
  updateSettings: (s: Partial<SiteSettings>) => Promise<void>;
}

const PostsContext = createContext<PostsContextType | null>(null);

// Admin password — your client can change this
const ADMIN_PASSWORD = 'mindpaws2026';

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredId, setFeaturedId] = useState<number | null>(null);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Mind Paws',
    heroTitle: 'Discover the world in a new way',
    heroSubtitle: 'Explore breathtaking destinations, untold stories, and the beauty of our planet.',
  });
  const [isAdmin, setIsAdmin] = useState(() => JSON.parse(localStorage.getItem('mp_auth') || 'false'));
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      // Get Posts
      const { data: dbPosts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: true });

      if (postsError) throw postsError;

      // Seed if empty
      if (!dbPosts || dbPosts.length === 0) {
        console.log('Database empty, seeding...');
        await seedDatabase();
        return;
      }

      // Map snake_case to camelCase
      const mappedPosts = dbPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        image: p.image,
        author: p.author,
        authorInitials: p.author_initials,
        date: p.date,
        readTime: p.read_time,
        content: p.content
      }));

      setPosts(mappedPosts);

      // Get Settings
      const { data: dbSettings, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (!settingsError && dbSettings) {
        setSettings({
          siteName: dbSettings.site_name,
          heroTitle: dbSettings.hero_title,
          heroSubtitle: dbSettings.hero_subtitle,
        });
        setFeaturedId(dbSettings.is_featured_id);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  // Helper to sync initial blogs to database
  async function seedDatabase() {
    const allInitial = [DEFAULT_FEATURED, ...DEFAULT_POSTS];
    const toInsert = allInitial.map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      image: p.image,
      author: p.author,
      author_initials: p.authorInitials,
      date: p.date,
      read_time: p.readTime,
      content: p.content
    }));

    const { error } = await supabase.from('posts').insert(toInsert);
    if (!error) {
      // Re-fetch now that we have data
      const { data } = await supabase.from('posts').select('id').eq('slug', DEFAULT_FEATURED.slug).single();
      if (data) await supabase.from('site_settings').update({ is_featured_id: data.id }).eq('id', 1);
      fetchData();
    }
  }

  const featuredPost = posts.find((p) => p.id === featuredId) || posts[0] || DEFAULT_FEATURED;
  const regularPosts = posts.filter((p) => p.id !== featuredPost.id);

  // Derive categories from posts
  const categoryCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categories = DEFAULT_CATEGORIES.map((c) => ({
    ...c,
    count: categoryCounts[c.name] || 0,
  }));

  function login(password: string) {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('mp_auth', 'true');
      return true;
    }
    return false;
  }

  function logout() {
    setIsAdmin(false);
    localStorage.removeItem('mp_auth');
  }

  async function addPost(post: Omit<BlogPost, 'id'>) {
    const { error } = await supabase.from('posts').insert([{
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      author_initials: post.authorInitials,
      date: post.date,
      read_time: post.readTime,
      content: post.content
    }]);
    if (error) throw error;
    await fetchData();
  }

  async function updatePost(id: number, updates: Partial<BlogPost>) {
    const { error } = await supabase.from('posts').update({
      slug: updates.slug,
      title: updates.title,
      category: updates.category,
      excerpt: updates.excerpt,
      image: updates.image,
      author: updates.author,
      author_initials: updates.authorInitials,
      date: updates.date,
      read_time: updates.readTime,
      content: updates.content
    }).eq('id', id);
    if (error) throw error;
    await fetchData();
  }

  async function deletePost(id: number) {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  }

  async function setFeatured(id: number) {
    const { error } = await supabase.from('site_settings').update({ is_featured_id: id }).eq('id', 1);
    if (error) throw error;
    setFeaturedId(id);
  }

  async function updateSettings(s: Partial<SiteSettings>) {
    const { error } = await supabase.from('site_settings').update({
      site_name: s.siteName,
      hero_title: s.heroTitle,
      hero_subtitle: s.heroSubtitle,
    }).eq('id', 1);
    
    if (error) throw error;
    setSettings(prev => ({ ...prev, ...s }));
  }

  return (
    <PostsContext.Provider
      value={{
        posts: regularPosts,
        featuredPost,
        categories,
        settings,
        isAdmin,
        isLoading,
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
