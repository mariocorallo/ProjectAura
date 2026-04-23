import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ChevronRight, Hash, Share2 } from 'lucide-react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { BLOG_POSTS } from '../blogData';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

export const Blog: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { playSound } = useAuraFeedback();
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');

  const categories = useMemo(() => {
    const cats = new Set(BLOG_POSTS.map(p => p.category));
    return ['Tutti', ...Array.from(cats)].sort();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Tutti') return BLOG_POSTS;
    return BLOG_POSTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleShare = async (post: any) => {
    playSound('tap');
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error('Share api not supported');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        // Se non supportato o errore diverso da cancellazione, usa il clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copiato negli appunti!');
        } catch (clipErr) {
          console.error('Errore nella copia:', clipErr);
        }
      }
    }
  };

  const selectedPost = slug ? BLOG_POSTS.find(p => p.slug === slug) : null;

  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    return BLOG_POSTS
      .filter(p => p.category === selectedPost.category && p.slug !== selectedPost.slug)
      .slice(0, 3);
  }, [selectedPost]);

  const handleBack = () => {
    playSound('tap');
    if (slug) {
      navigate('/blog');
    } else {
      navigate('/');
    }
  };

  React.useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    
    if (selectedPost) {
      document.title = `${selectedPost.title} | Aura Blog`;
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedPost.excerpt);
      }
    } else {
      document.title = 'Journal | Aura Blog';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Appunti di navigazione nel mare della distrazione. Leggi gli articoli di Aura sulla consapevolezza digitale.');
      }
    }
  }, [selectedPost]);

  const renderBackButton = () => (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-aura-accent/10 text-aura-muted hover:text-aura-accent hover:border-aura-accent/20 transition-all group mb-8"
    >
      <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
      <span className="font-semibold text-sm">Indietro</span>
    </motion.button>
  );

  if (slug && !selectedPost) {
    return (
      <div className="text-center py-20">
        <h2 className="serif text-3xl font-bold mb-4">Articolo non trovato</h2>
        <button onClick={() => navigate('/blog')} className="text-aura-accent hover:underline">
          Torna al blog
        </button>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="max-w-4xl mx-auto px-4"
      >
        {renderBackButton()}

        <article className="glass-card rounded-[48px] overflow-hidden border border-white shadow-2xl shadow-aura-accent/5">
          {/* Cover Header */}
          <div className="h-48 md:h-80 bg-aura-accent/10 relative flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0 bg-aura-accent"
            />
            <BookOpen size={80} className="text-aura-accent opacity-20" />
          </div>

          <div className="p-8 md:p-16">
            <header className="mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-aura-muted">
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><Calendar size={12} /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><User size={12} /> {selectedPost.author}</span>
                  <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><Clock size={12} /> {selectedPost.readTime}</span>
                  <span className="flex items-center gap-2 bg-aura-accent/10 text-aura-accent px-3 py-1 rounded-full"><Hash size={12} /> {selectedPost.category}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-aura-accent/20 text-aura-accent text-[10px] font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-all"
                >
                  <Share2 size={14} /> Condividi
                </motion.button>
              </div>
              <h1 className="serif text-4xl md:text-5xl font-bold leading-tight text-aura-ink mb-8 italic">
                {selectedPost.title}
              </h1>
            </header>

            <div className="markdown-body">
              <Markdown>{selectedPost.content}</Markdown>
            </div>

            <footer className="pt-12 mt-12 border-t border-aura-accent/10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-aura-accent/10 rounded-full flex items-center justify-center text-aura-accent">
                  <User size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-aura-ink">{selectedPost.author}</h4>
                  <p className="text-[10px] text-aura-muted uppercase tracking-widest">Ideatore di Aura</p>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h3 className="serif text-2xl font-bold italic mb-8 px-4">Potrebbe interessarti anche:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  onClick={() => playSound('click')}
                  className="glass-card rounded-[32px] p-6 hover:bg-white transition-all border border-white group"
                >
                  <div className="text-[10px] uppercase font-bold tracking-widest text-aura-accent mb-3 flex items-center gap-1">
                    <Hash size={10} /> {post.category}
                  </div>
                  <h4 className="serif font-bold text-lg leading-snug group-hover:text-aura-accent transition-colors line-clamp-2 mb-4">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-[10px] text-aura-muted uppercase tracking-tighter gap-3 italic">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-aura-accent rounded-full opacity-30" />
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-12 border-t border-aura-accent/5">
          <div className="flex justify-start">
            {renderBackButton()}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-5xl mx-auto px-4"
    >
      <header className="text-center mb-16">
        <h1 className="serif text-5xl md:text-6xl font-bold italic mb-6">Journal</h1>
        <p className="text-aura-muted font-serif italic text-xl mb-12">Appunti di navigazione nel mare della distrazione.</p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => {
                playSound('tap');
                setActiveCategory(cat);
              }}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                activeCategory === cat
                  ? 'bg-aura-accent text-white border-aura-accent shadow-lg shadow-aura-accent/20'
                  : 'bg-white/50 text-aura-muted border-white hover:border-aura-accent/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </header>

      <div className="grid gap-12">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              to={`/blog/${post.slug}`}
              onClick={() => playSound('click')}
              className="group block glass-card rounded-[40px] p-8 md:p-12 hover:bg-white hover:shadow-xl transition-all border border-white"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-aura-muted">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-aura-accent rounded-full opacity-30" />
                    <span>{post.readTime}</span>
                    <span className="w-1 h-1 bg-aura-accent rounded-full opacity-30" />
                    <span className="flex items-center gap-1 text-aura-accent">
                      <Hash size={10} /> {post.category}
                    </span>
                  </div>
                  <h2 className="serif text-3xl font-bold group-hover:text-aura-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-aura-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center text-aura-accent font-bold text-sm uppercase tracking-widest gap-2">
                    Leggi tutto <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
