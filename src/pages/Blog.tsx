import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { BLOG_POSTS } from '../blogData';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

export const Blog: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { playSound } = useAuraFeedback();

  const handleBack = () => {
    playSound('tap');
    if (slug) {
      navigate('/blog');
    } else {
      navigate('/');
    }
  };

  const selectedPost = slug ? BLOG_POSTS.find(p => p.slug === slug) : null;

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
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-aura-muted hover:text-aura-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Torna al Blog</span>
        </button>

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
              <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-aura-muted mb-6">
                <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><Calendar size={12} /> {selectedPost.date}</span>
                <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><User size={12} /> {selectedPost.author}</span>
                <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full"><Clock size={12} /> {selectedPost.readTime}</span>
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
        <p className="text-aura-muted font-serif italic text-xl">Appunti di navigazione nel mare della distrazione.</p>
      </header>

      <div className="grid gap-12">
        {BLOG_POSTS.map((post, i) => (
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
                  <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-aura-muted">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-aura-accent rounded-full opacity-30" />
                    <span>{post.readTime}</span>
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
