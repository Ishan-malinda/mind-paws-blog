import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { featuredPost } = usePosts();

  if (!featuredPost) return null;

  return (
    <section id="featured" ref={ref} className="relative bg-[var(--color-surface)] py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase">
            Featured Story
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Link to={`/article/${featuredPost.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden glass-card">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface-card)]/30 hidden lg:block" />
              </div>
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <span className="category-badge self-start px-4 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full mb-6">
                  {featuredPost.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight mb-5 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                  {featuredPost.title}
                </h3>
                <p className="text-white/40 text-base leading-relaxed mb-8 max-w-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] text-sm font-semibold">
                    {featuredPost.authorInitials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{featuredPost.author}</p>
                    <div className="flex items-center gap-2 text-white/30 text-xs mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{featuredPost.date}</span>
                      <span className="text-white/15">·</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] group-hover:gap-3 transition-all duration-300">
                  Read Full Story
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
