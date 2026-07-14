import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, MessageCircle, Menu, X, Settings, Briefcase, ChevronRight, Mail, Languages } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';
import LeetCodeVCard from './LeetCodeVCard';

const titles = [
  "Graphic designer",
  "Web Developer",
  "Freelance"
];

const navItems = ['Home', 'About', 'Portfolio', 'Services', 'Tools', 'Blog'];
const SHOW_LANGUAGE_TOGGLE = import.meta.env.VITE_SHOW_LANGUAGE_TOGGLE !== 'false';

export default function Navbar({ currentPage, onNavigate }: { currentPage?: string, onNavigate: (page: string) => void }) {
  const { user, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdminPage = currentPage === 'admin' || currentPage === 'cms';
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.getElementById('theme-color-meta')?.setAttribute('content', '#1b3438');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.getElementById('theme-color-meta')?.setAttribute('content', '#ffffff');
    }
  }, [isDark]);

  return (
    <header className="w-full sticky top-2 z-50 sm:mt-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full md:max-w-7xl px-4 sm:px-4 rounded-2xl py-3 mx-auto flex items-center justify-between bg-slate-50/80 dark:bg-dark-bg/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm"
      >
        <div className="flex items-center min-w-0">
          <div className="flex flex-col min-w-0">
            <button 
              onClick={() => {
                if (user || isAdmin) onNavigate('admin');
                else onNavigate('login');
              }} 
              className="flex items-center h-5 sm:h-6 cursor-pointer"
            >
              <img 
                src="https://cdn.fitrimahadzir.my/main-img/logo-dark.webp" 
                alt="Fitri Mahadzir" 
                className="h-full w-auto block dark:hidden object-contain" 
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://cdn.fitrimahadzir.my/main-img/logo-light.webp" 
                alt="Fitri Mahadzir" 
                className="h-full w-auto hidden dark:block object-contain" 
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>

        <div className="items-center gap-2 sm:gap-6 flex shrink-0">
          <nav className="items-center gap-4 lg:flex hidden">
            {!isAdminPage && navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => onNavigate(item.toLowerCase().replace(/\s+/g, '-'))}
                className="capitalize text-[11px] font-semibold tracking-wide text-slate-600 hover:text-brand-green dark:text-slate-400 dark:hover:text-brand-green transition-colors cursor-pointer"
              >
                {t(`nav.${item.toLowerCase().replace(/\s+/g, '')}` as any)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {!isAdminPage && (
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-green text-dark-bg rounded-xl text-[11px] font-mono font-bold hover:opacity-90 transition-all shadow-md cursor-pointer"
              >
                <span>{t('hero.contactMe')}</span>
                <span className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                  <Mail size={14} />
                </span>
              </button>
            )}
            
            {SHOW_LANGUAGE_TOGGLE && (
              <button
                onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/[0.05] rounded-xl border border-slate-200 dark:border-white/[0.1] hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors"
                aria-label="Toggle Language"
              >
                <Languages size={14} className="text-slate-500 dark:text-slate-400" />
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{language}</span>
              </button>
            )}

            <div className="relative flex items-center bg-slate-100 dark:bg-white/[0.05] rounded-xl p-1 border border-slate-200 dark:border-white/[0.1] h-9 w-[68px]">
              <motion.div
                layoutId="theme-toggle"
                className="absolute h-7 w-7 bg-brand-green rounded-lg shadow-sm z-0"
                animate={{ x: isDark ? 30 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                onClick={() => setIsDark(false)}
                aria-label="Light Mode"
                className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${!isDark ? 'text-dark-bg' : 'text-slate-500 hover:text-slate-600'}`}
              >
                <Sun size={14} />
              </button>
              <button
                onClick={() => setIsDark(true)}
                aria-label="Dark Mode"
                className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${isDark ? 'text-dark-bg' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <Moon size={14} />
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden flex items-center justify-center cursor-pointer p-1.5 rounded-xl hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-white/[0.05] dark:hover:text-slate-300 transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 dark:bg-dark-bg/80 backdrop-blur-xl lg:hidden z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] left-0 right-0 w-full lg:hidden bg-white/70 dark:bg-dark-bg/90 backdrop-blur-[20px] border border-brand-green/20 dark:border-brand-green/30 rounded-2xl shadow-2xl py-4 flex flex-col gap-2 origin-top overflow-hidden"
            >
              <div className="px-6 mb-2 mt-2 overflow-hidden border-b border-white/10 pb-4">
                <LeetCodeVCard mode="top" onNavigate={(page) => { onNavigate(page); setIsMenuOpen(false); }} />
              </div>
              
              <div className="flex flex-col gap-1">
                {!isAdminPage && navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      onNavigate(item.toLowerCase().replace(/\s+/g, '-'));
                      setIsMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="px-4 py-3 text-[14px] font-semibold tracking-wide text-slate-600 hover:text-dark-bg hover:bg-brand-green dark:text-slate-300 dark:hover:text-dark-bg transition-colors mx-2 rounded-xl text-left w-[calc(100%-1rem)] flex items-center justify-between group"
                  >
                    {t(`nav.${item.toLowerCase().replace(/\s+/g, '')}` as any)}
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-dark-bg transition-colors" />
                  </motion.button>
                ))}
              </div>
              {!isAdminPage && (
                <div className="flex flex-col gap-2 px-2 mt-2">
                  <motion.button
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 + 0.1 }}
                    onClick={() => {
                      onNavigate('contact');
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 px-6 py-3 bg-brand-green text-dark-bg rounded-xl text-sm font-mono font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{t('hero.contactMe')}</span>
                      <Mail size={16} />
                    </div>
                    <ChevronRight size={16} />
                  </motion.button>

                  <div className="mt-2 w-full">
                    <LeetCodeVCard mode="bottom" onNavigate={(page) => { onNavigate(page); setIsMenuOpen(false); }} />
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
