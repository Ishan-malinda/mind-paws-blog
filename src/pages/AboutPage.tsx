import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
            About Us
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-6">
            We tell stories that <em className="italic text-white/50">matter</em>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed max-w-2xl">
            Mind Paws is a digital journal dedicated to exploring the world's most breathtaking landscapes, untold stories, and the endless beauty of our planet through curated articles and stunning photography.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <img
              src="/images/hero.png"
              alt="Mountain vista"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-tight mb-6">
              Our <em className="italic text-white/50">mission</em>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-5">
              We believe that the world's most important stories are often found in its quietest corners — in the mist rising over an untouched alpine lake, in the silence of an ancient forest, in the glow of a desert sunset.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Our team of writers, photographers, and explorers travels the globe to bring these stories to life, combining stunning visual journalism with thoughtful, immersive storytelling.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                Based globally, stories everywhere
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                hello@mindpaws.com
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-tight mb-12 text-center">
            What we <em className="italic text-white/50">believe</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Curiosity',
                desc: 'Every great story begins with a question. We chase the ones most people never think to ask.',
              },
              {
                title: 'Authenticity',
                desc: 'We tell stories as they are — raw, beautiful, imperfect. No filters, no embellishments, just truth.',
              },
              {
                title: 'Craft',
                desc: 'From photography to prose, we obsess over every detail because the world deserves to be shown at its finest.',
              },
            ].map((val, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-5">
                  <span className="text-[var(--color-accent)] font-serif text-xl italic">{i + 1}</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-3">{val.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
          >
            Explore our articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
