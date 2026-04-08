import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send } from 'lucide-react';

export function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-[var(--color-surface)] py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-accent)]/3 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Stay Connected
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
            Never miss a <em className="italic text-white/50">story</em>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-md mx-auto mb-10">
            Subscribe to our newsletter and get the latest articles, travel guides, and photography tips delivered to your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-[var(--color-accent)]/40 focus:bg-white/[0.07] transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all duration-300 hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            Subscribe
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/20 text-xs mt-4"
        >
          No spam. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
