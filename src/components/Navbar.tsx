import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Featured', href: '/#featured' },
  { label: 'Discover', href: '/#discover' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = usePosts();

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Handle hash links on home page
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      // If not on home, the Link will navigate to / and the hash won't auto-scroll,
      // but that's acceptable behavior
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="Mind Paws"
              className="w-9 h-9 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-serif text-[22px] text-white tracking-tight">
              {settings.siteName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 text-sm transition-colors duration-300 rounded-lg hover:bg-white/5 ${
                  location.pathname === link.href
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link
              to="/articles"
              className="hidden md:inline-flex px-5 py-2.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-lg hover:brightness-110 transition-all duration-300"
            >
              Subscribe
            </Link>
            <button
              className="md:hidden p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/5 bg-[var(--color-surface)]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/articles"
                className="block mt-3 px-4 py-3 text-sm font-medium text-center text-black bg-[var(--color-accent)] rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
