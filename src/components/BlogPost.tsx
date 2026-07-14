import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Markdown from 'react-markdown';

interface BlogPostProps {
  id: string;
  onBack: () => void;
}

const CardSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-[1.5rem] border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 md:p-8 shadow-sm hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors ${className}`}>
    <h3 className="text-xs font-bold tracking-[0.15em] text-slate-500 dark:text-slate-400 uppercase mb-6 shrink-0">{title}</h3>
    <div>
       {children}
    </div>
  </div>
);

export default function BlogPost({ id, onBack }: BlogPostProps) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching blog:", error);
      } else {
        setBlog(data);
      }
      setLoading(false);
    };

    fetchBlog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
        <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <button onClick={onBack} className="text-brand-green hover:underline flex items-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6 pb-12 pt-2 px-2 sm:px-0"
    >
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8 w-fit"
      >
        <ArrowLeft size={16} className="text-slate-400" /> Back to Blogs
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-3xl">
          {/* Tags / Meta */}
          <div className="flex items-center gap-3 text-xs font-medium mb-4">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-brand-green/10 dark:text-brand-green font-semibold border border-transparent dark:border-brand-green/20 uppercase tracking-wider">
              {blog.category || 'Article'}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Just now'}</time>
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-l border-slate-300 dark:border-white/10 pl-3">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime || '5 min read'}</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 dark:text-brand-green tracking-tight mb-3 leading-tight">
            {blog.title}
          </h1>
          
          {blog.excerpt && (
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg font-medium mt-4 leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </div>

        <button 
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          className="shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-sm font-medium transition-all shadow-sm text-slate-900 dark:text-white hover:-translate-y-0.5"
        >
          <Share2 size={16} className="text-slate-500 dark:text-slate-400" /> Share Article
        </button>
      </div>

      {/* Hero Image */}
      {blog.image && (
        <div className="w-full h-[300px] sm:h-[450px] mb-12 overflow-hidden rounded-2xl">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover object-center hover:scale-[1.01] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Content Column */}
        <div className="md:col-span-3 flex flex-col gap-6">
           <CardSection title="ARTICLE CONTENT">
             <div className="prose prose-slate dark:prose-invert max-w-none prose-sm md:prose-base font-inter prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-green hover:prose-a:text-brand-green/80 prose-img:rounded-xl">
               <div className="markdown-body whitespace-pre-wrap">
                 <Markdown>{blog.content}</Markdown>
               </div>
             </div>
           </CardSection>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 md:sticky top-24 h-max">
          <CardSection title="AUTHOR & META">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold border border-brand-green/30">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Admin</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Content Creator</p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.15em] text-slate-500 dark:text-slate-400 uppercase mb-4">CATEGORY</h4>
              <div className="flex flex-wrap gap-2.5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-default">
                  {blog.category || 'General'}
                </div>
              </div>
            </div>
          </CardSection>
        </div>
      </div>
    </motion.div>
  );
}
