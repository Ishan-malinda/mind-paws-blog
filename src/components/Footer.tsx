import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

const FOOTER_LINKS = {
  Navigation: [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
  ],
  Categories: [
    { label: 'Nature', href: '/articles' },
    { label: 'Adventure', href: '/articles' },
    { label: 'Seascape', href: '/articles' },
    { label: 'Arctic', href: '/articles' },
    { label: 'Culture', href: '/articles' },
  ],
  Support: [
    { label: 'Contact Us', href: '/about' },
    { label: 'FAQ', href: '/about' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export function Footer() {
  const { settings } = usePosts();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img
                src="/images/logo.png"
                alt="Mind Paws"
                className="w-9 h-9 object-contain rounded-lg"
              />
              <span className="font-serif text-2xl text-white tracking-tight">{settings.siteName}</span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              A curated journal exploring the world's most breathtaking landscapes, untold stories, and the beauty that surrounds us.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/30 text-sm hover:text-white/60 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 {settings.siteName}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with passion for exploration and storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
}
