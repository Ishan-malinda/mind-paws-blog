import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function AllArticlesPage() {
  const { posts, featuredPost, categories } = usePosts();
  const allPosts = [featuredPost, ...posts];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
            All Articles
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-4">
            Stories & <em className="italic text-white/50">Insights</em>
          </h1>
          <p className="text-white/40 text-base max-w-xl">
            Browse our complete collection of articles about nature, adventure, and the beauty of our planet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button className="px-5 py-2 text-sm font-medium text-black bg-[var(--color-accent)] rounded-lg transition-all">
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className="px-5 py-2 text-sm font-medium text-white/50 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[var(--color-accent)] transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
