import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function DiscoverSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { categories } = usePosts();

  return (
    <section id="discover" ref={ref} className="relative bg-[var(--color-surface)] overflow-hidden">
      <div className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/images/cherry.png" alt="Cherry blossom pathway" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              Explore Topics
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1] tracking-tight mb-6">
              Discover the{' '}<em className="italic text-white/50">beauty</em>{' '}around us
            </h2>
            <p className="text-white/40 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Browse through our curated categories and find stories that resonate with your sense of wonder and adventure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-20 pb-24 md:pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <Link to="/articles" className="blog-card group block relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={cat.image} alt={cat.name} className="card-image absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--color-accent)]/30 transition-colors duration-500 z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <p className="text-white/40 text-xs mb-1">{cat.count} articles</p>
                  <h3 className="text-white text-lg md:text-xl font-semibold tracking-tight mb-3">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
