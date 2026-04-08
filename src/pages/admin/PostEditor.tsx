import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image, Plus, X } from 'lucide-react';
import { usePosts } from '../../context/PostsContext';

export function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { posts, featuredPost, isAdmin, addPost, updatePost } = usePosts();

  const allPosts = [featuredPost, ...posts];
  const existingPost = !isNew ? allPosts.find((p) => p.id === Number(id)) : null;

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [authorInitials, setAuthorInitials] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [contentBlocks, setContentBlocks] = useState<string[]>(['']);

  // Populate on edit
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setSlug(existingPost.slug);
      setCategory(existingPost.category);
      setExcerpt(existingPost.excerpt);
      setImage(existingPost.image);
      setAuthor(existingPost.author);
      setAuthorInitials(existingPost.authorInitials);
      setDate(existingPost.date);
      setReadTime(existingPost.readTime);
      setContentBlocks(existingPost.content.length > 0 ? existingPost.content : ['']);
    } else if (isNew) {
      // Set default date
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setDate(`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`);
    }
  }, [existingPost, isNew]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew || !existingPost) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60);
      setSlug(generated);
    }
  }, [title, isNew, existingPost]);

  // Auto-generate initials from author name
  useEffect(() => {
    const parts = author.trim().split(/\s+/);
    if (parts.length >= 2) {
      setAuthorInitials(parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase());
    } else if (parts.length === 1 && parts[0]) {
      setAuthorInitials(parts[0][0].toUpperCase());
    }
  }, [author]);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  if (!isNew && !existingPost) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <p className="text-white/40">Post not found.</p>
      </div>
    );
  }

  function handleAddParagraph() {
    setContentBlocks((prev) => [...prev, '']);
  }

  function handleRemoveParagraph(index: number) {
    setContentBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function handleParagraphChange(index: number, value: string) {
    setContentBlocks((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !category.trim()) {
      alert('Please fill in the Title, Slug, and Category.');
      return;
    }

    const postData = {
      slug,
      title,
      category,
      excerpt,
      image,
      author,
      authorInitials,
      date,
      readTime,
      content: contentBlocks.filter((b) => b.trim() !== ''),
    };

    if (isNew) {
      addPost(postData);
    } else {
      updatePost(Number(id), postData);
    }

    navigate('/admin');
  }

  const INPUT_CLASS = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-[var(--color-accent)]/40 transition-all';

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            {!isNew && existingPost && (
              <a
                href={`/article/${existingPost.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
              >
                <Eye className="w-4 h-4" />
                Preview
              </a>
            )}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
            >
              <Save className="w-4 h-4" />
              {isNew ? 'Publish' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-white text-2xl font-semibold mb-8">
            {isNew ? 'Create New Post' : 'Edit Post'}
          </h1>

          {/* Image Preview */}
          <div className="mb-8">
            <label className="block text-white/60 text-sm font-medium mb-2">Cover Image</label>
            {image ? (
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-3 bg-white/5">
                <img src={image} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-lg text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="aspect-[21/9] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 mb-3">
                <Image className="w-8 h-8 text-white/15" />
                <p className="text-white/30 text-sm">Paste an image URL below</p>
              </div>
            )}
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL (e.g. https://example.com/photo.jpg or /images/photo.png)"
              className={INPUT_CLASS}
            />
            <p className="text-white/20 text-xs mt-1.5">
              Use images from the /images folder or paste any web URL. You can upload images to services like
              {' '}<a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)]/60 hover:text-[var(--color-accent)]">Imgur</a>
              {' '}or{' '}<a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)]/60 hover:text-[var(--color-accent)]">ImgBB</a>
              {' '}and paste the link here.
            </p>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your article title"
              className={`${INPUT_CLASS} text-lg`}
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm font-medium mb-2">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-sm">/article/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="your-article-slug"
                className={`flex-1 ${INPUT_CLASS}`}
              />
            </div>
          </div>

          {/* Row: Category + Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Category *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Nature, Adventure, Seascape"
                className={INPUT_CLASS}
                required
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Author Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author full name"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Row: Date + Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Apr 8, 2026"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="mb-8">
            <label className="block text-white/60 text-sm font-medium mb-2">Excerpt / Summary</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary that appears on the blog card (1-2 sentences)"
              rows={2}
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>

          {/* Content */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white/60 text-sm font-medium">Content (Paragraphs)</label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded-lg hover:bg-[var(--color-accent)]/15 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Paragraph
              </button>
            </div>
            <div className="space-y-3">
              {contentBlocks.map((block, i) => (
                <div key={i} className="relative group">
                  <div className="absolute left-0 top-3 text-white/10 text-xs w-6 text-right">{i + 1}</div>
                  <textarea
                    value={block}
                    onChange={(e) => handleParagraphChange(i, e.target.value)}
                    placeholder={`Paragraph ${i + 1}...`}
                    rows={4}
                    className={`${INPUT_CLASS} pl-10 resize-none`}
                  />
                  {contentBlocks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(i)}
                      className="absolute top-2 right-2 p-1.5 text-white/15 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-white/5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Save */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-3 text-sm text-white/40 hover:text-white rounded-xl hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-[var(--color-accent)] rounded-xl hover:brightness-110 transition-all"
            >
              <Save className="w-4 h-4" />
              {isNew ? 'Publish Post' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
