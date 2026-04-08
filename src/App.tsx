import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PostsProvider, usePosts } from './context/PostsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { AllArticlesPage } from './pages/AllArticlesPage';
import { AboutPage } from './pages/AboutPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PostEditor } from './pages/admin/PostEditor';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const { isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
          <p className="text-white/40 text-sm font-serif italic">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/articles" element={<AllArticlesPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/post/:id" element={<PostEditor />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <main className="bg-[var(--color-surface)] min-h-screen">
          <AppLayout />
        </main>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
