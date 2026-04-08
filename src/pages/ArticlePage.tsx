import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, featuredPost } = usePosts();

  const allPosts = [featuredPost, ...posts];
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-white mb-4">Article Not Found</h1>
          <p className="text-white/40 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2);
  const relatedPosts = related.length > 0 ? related : posts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-[var(--color-surface)]/20" />
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 lg:left-12 flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 hover:bg-black/50 transition-all z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="category-badge inline-block px-4 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full mb-5">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] text-sm font-semibold">
                {post.authorInitials}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{post.author}</p>
                <div className="flex items-center gap-3 text-white/30 text-xs mt-0.5">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </div>
            <button className="ml-auto flex items-center gap-2 px-4 py-2 text-xs text-white/50 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>

          <div className="space-y-6 mb-16">
            {post.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="text-white/60 text-base md:text-lg leading-[1.85] font-light"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {relatedPosts.length > 0 && (
          <div className="border-t border-white/10 pt-12 pb-20">
            <h3 className="text-white text-xl font-semibold mb-8">More to explore</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} to={`/article/${rp.slug}`} className="blog-card group">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img src={rp.image} alt={rp.title} className="card-image w-full h-full object-cover" />
                  </div>
                  <span className="category-badge inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full mb-2">
                    {rp.category}
                  </span>
                  <h4 className="text-white text-lg font-semibold leading-snug group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
