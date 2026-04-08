import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function Hero() {
  const { settings } = usePosts();

  // Parse italic markers: text surrounded by * becomes italic
  function renderTitle(text: string) {
    const parts = text.split(/\*([^*]+)\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <em key={i} className="italic text-white/60">{part}</em>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <section className="relative min-h-screen w-full flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Majestic mountain landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6"
          >
            {renderTitle(settings.heroTitle)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all duration-300 hover:scale-[1.02]"
            >
              Read Articles
            </Link>
            <a
              href="#featured"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white border border-white/15 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Featured Story
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-white/30 mt-14" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
