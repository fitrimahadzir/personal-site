import { motion } from 'motion/react';
import Blogs from './Blogs';
import AccentWord from './AccentWord';
import { useLanguage } from '../lib/LanguageContext';

export default function BlogPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 py-4 sm:py-8">
      {/* Header Section */}
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          {language === 'en' ? (
            <>My <AccentWord>Blog</AccentWord> & Articles</>
          ) : (
            <><AccentWord>Blog</AccentWord> & Artikel Saya</>
          )}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          {language === 'en' 
            ? "A space where I share my thoughts, discoveries, and experiences in the world of design and development."
            : "Ruangan di mana saya berkongsi pemikiran, penemuan, dan pengalaman dalam dunia reka bentuk dan pembangunan."}
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <Blogs />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-slate-100 dark:border-white/10 text-center"
      >
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          {language === 'en' ? "More articles coming soon. Stay tuned!" : "Lebih banyak artikel akan menyusul. Nantikan!"}
        </p>
      </motion.div>
    </div>
  );
}
