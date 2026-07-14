import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';
import AccentWord from './AccentWord';

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('blogs_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, () => {
        fetchBlogs();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => (b.language || 'en') === language);
  }, [blogs, language]);

  const displayedBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
      </div>
    );
  }

  return (
    <section id="blogs" className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {displayedBlogs.map((blog, index) => (
          <motion.div 
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-brand-green/5 transition-all duration-500 ease-out h-full"
          >
            {blog.image ? (
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-white/5 shrink-0">
                <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/60 sm:from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-white/5 shrink-0">
                  <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
            )}
            
            <div className="flex flex-col grow p-4 sm:p-5 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {blog.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {blog.category}
                    </span>
                  )}
                </div>
                <h3 
                  className="text-lg font-semibold text-slate-900 dark:text-brand-green group-hover:text-brand-green transition-colors leading-tight cursor-pointer hover:underline decoration-brand-green/30 underline-offset-4"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog-post', id: blog.id } }))}
                >
                  {blog.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <time>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Just now'}</time>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog-post', id: blog.id } }))}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-dark-bg rounded-lg text-xs font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-md cursor-pointer leading-none"
                  >
                    <span className="translate-y-[0.5px]">{language === 'en' ? 'Read Article' : 'Baca Artikel'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl text-slate-500">
          <p className="font-mono text-xs uppercase tracking-widest">{language === 'ms' ? 'Belum ada artikel diterbitkan. Masih dalam proses, nantikan!' : 'No articles published yet. Still in progress, stay tuned!'}</p>
        </div>
      )}
      
      {filteredBlogs.length > 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-brand-green text-dark-bg hover:opacity-90 transition-all shadow-md cursor-pointer leading-none"
          >
            <span className="translate-y-[0.5px]">
              {showAll 
                ? (language === 'en' ? "Show Less" : "Tunjuk Kurang") 
                : (language === 'en' ? "Read More Articles" : "Baca Lebih Lanjut")}
            </span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
