import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function BlogGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { posts } = usePosts();

  // Show latest 6 posts on home page
  const displayPosts = posts.slice(0, 6);

  return (
    <section id="articles" ref={ref} className="relative bg-[var(--color-surface)] py-24 md:py-32 px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
              Latest Stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Blog & <em className="italic text-white/50">Articles</em>
            </h2>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/article/${post.slug}`} className="blog-card group block">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                  <img src={post.image} alt={post.title} className="card-image w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="category-badge px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-1">
                  <div className="accent-line h-[2px] bg-[var(--color-accent)] rounded-full" />
                  <h3 className="text-white text-lg font-semibold leading-snug tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <Link
            to="/articles"
            className="px-8 py-3.5 text-sm font-medium text-white border border-white/15 rounded-xl hover:bg-white/5 hover:border-[var(--color-accent)]/30 transition-all duration-300"
          >
            Load More Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
