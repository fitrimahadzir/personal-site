import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Github, Download, BadgeCheck, Mail, Home, FolderKanban, 
  BookOpen, LogOut, LogIn, Settings, Plus, BarChart3, ChevronRight,
  LayoutDashboard, Image as ImageIcon, FileText, Layers, Tag,
  Users, Activity, Search, Inbox, CheckSquare, Bot, Terminal, Blocks, Briefcase, Wrench, Link as LinkIcon, ArrowRight
} from 'lucide-react';
import { SiBehance, SiTiktok, SiInstagram } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { logout, signInWithGoogle } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

const titles = [
  "Graphic designer",
  "Web Developer",
  "Freelancer"
];

interface LeetCodeVCardProps {
  isAdminMode?: boolean;
  onNavigate?: (page: string) => void;
  mode?: 'full' | 'top' | 'bottom';
}

export default function LeetCodeVCard({ isAdminMode = false, onNavigate, mode = 'full' }: LeetCodeVCardProps) {
  const { user, loading, isAdmin } = useAuth();
  const [titleIndex, setTitleIndex] = useState(0);
  const [activeAdminItem, setActiveAdminItem] = useState('home');

  const adminNav = [
    {
      title: 'MAIN',
      items: [
        { name: 'Overview', icon: LayoutDashboard, id: 'home' },
        { name: 'Settings', icon: Settings, id: 'settings' },
        { name: 'Media', icon: ImageIcon, id: 'media' },
        { name: 'Files', icon: FileText, id: 'files' },
      ]
    },
    {
      title: 'PORTFOLIO',
      items: [
        { name: 'Projects', icon: FolderKanban, id: 'portfolio' },
        { name: 'Jobs', icon: Briefcase, id: 'jobs' },
        { name: 'Tools', icon: Wrench, id: 'tools' },
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Blog', icon: BookOpen, id: 'blog' },
        { name: 'Categories', icon: Layers, id: 'categories' },
        { name: 'Tags', icon: Tag, id: 'tags' },
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        { name: 'Analytics', icon: BarChart3, id: 'analytics' },
        { name: 'Visitors', icon: Users, id: 'visitors' },
        { name: 'Performance', icon: Activity, id: 'performance' },
        { name: 'SEO', icon: Search, id: 'seo' },
      ]
    },
    {
      title: 'INTERACTION',
      items: [
        { name: 'Inbox', icon: Inbox, id: 'inbox' },
        { name: 'Tasks', icon: CheckSquare, id: 'tasks' },
      ]
    },
    {
      title: 'AI',
      items: [
        { name: 'AI Tools', icon: Bot, id: 'ai-tools' },
        { name: 'Prompts', icon: Terminal, id: 'prompts' },
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (page: string) => {
    if (isAdminMode) {
      setActiveAdminItem(page);
      
      const pageMap: Record<string, string> = {
        'home': 'admin',
        'settings': 'admin',
        'portfolio': 'cms',
        'jobs': 'cms',
        'tools': 'cms',
        'blog': 'cms',
        'analytics': 'admin'
      };
      
      const tabMap: Record<string, string> = {
        'home': 'home',
        'settings': 'settings',
        'portfolio': 'projects',
        'jobs': 'jobs',
        'tools': 'tools',
        'blog': 'blogs',
        'analytics': 'analytics'
      };
      
      const targetPage = pageMap[page] || 'admin';
      const targetTab = tabMap[page] || page;

      if (onNavigate) {
        onNavigate(targetPage);
      } else {
        window.dispatchEvent(new CustomEvent('navigate', { detail: targetPage }));
      }
      
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('admin-tab-change', { detail: targetTab }));
      }, 50);
      return;
    }

    if (onNavigate) {
      onNavigate(page);
    } else {
      window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
    }
  };

  const renderHeader = () => (
    <div className={`flex gap-4 ${mode === 'full' ? 'mb-5' : 'mb-2'}`}>
      <div className="relative shrink-0">
        <img 
          src="https://raw.githubusercontent.com/fitrimahadzir/link-bio-fitri-mahadzir/main/public/images/dp.jpg" 
          alt="Fitri Mahadzir" 
          className={`${mode === 'full' ? 'w-[84px] h-[84px]' : 'w-16 h-16'} rounded-xl object-cover bg-slate-200 dark:bg-white/5 shadow-lg border-0 dark:border dark:border-white/10`}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => {
              if (isAdminMode) {
                if (onNavigate) onNavigate('home');
                else window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
              } else {
                if (user || isAdmin) {
                  handleNav('admin');
                } else {
                  handleNav('login');
                }
              }
            }}
            className={`text-[18px] font-bold text-brand-green truncate text-left transition-colors cursor-pointer opacity-90 hover:opacity-100`}
          >
            Fitri Mahadzir
          </button>
          <button 
            onClick={() => {
              if (user || isAdmin) handleNav('admin');
              else handleNav('login');
            }}
            className={`flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95`}
          >
            <BadgeCheck size={18} className={`${(isAdmin || import.meta.env.DEV) ? 'text-brand-green fill-brand-green' : 'text-[#1d9bf0] fill-[#1d9bf0]'} text-white`} />
          </button>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-[11px] mt-0.5">
          <MapPin size={10} className="shrink-0" />
          <span>Perak, Malaysia</span>
        </div>
        <div className="mt-2 text-[13px] font-medium text-slate-400 h-5 flex items-center overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="block truncate w-full"
            >
              {titles[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const renderSocials = () => (
    <div className={`flex items-center justify-center gap-5 ${mode === 'bottom' ? 'mb-4' : 'mb-6'} text-slate-400`}>
      <a href="https://www.behance.net/fitrimahadzir" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
        <SiBehance size={20} />
      </a>
      <a href="https://www.tiktok.com/@fitri.mahadzir" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
        <SiTiktok size={18} />
      </a>
      <a href="https://github.com/fitrimahadzir" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
        <Github size={20} />
      </a>
      <a href="https://www.instagram.com/fitri.mahadzir/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
        <SiInstagram size={20} />
      </a>
      <a href="mailto:hi@fitrimahadzir.my" className="hover:text-brand-green transition-colors">
        <Mail size={20} />
      </a>
    </div>
  );

  const renderResumeBtn = () => (
    <button 
      onClick={() => handleNav('open-hire')}
      className="group w-full bg-brand-green hover:opacity-90 text-dark-bg font-mono font-bold py-2.5 px-5 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer shadow-md"
    >
      <div className="flex items-center gap-2">
        <Briefcase size={18} />
        Open for Hire
      </div>
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  );

  if (mode === 'top') {
    return (
      <div className="w-full">
        {renderHeader()}
        <p className="text-[13px] text-slate-400 leading-[1.6] mb-4 mt-2 px-1">
          Graphic Designer & Web Developer crafting strong visuals and engaging digital experiences.
        </p>
      </div>
    );
  }

  if (mode === 'bottom') {
    return (
      <div className="w-full mt-4 border-t border-white/10 pt-6">
        {renderSocials()}
        {renderResumeBtn()}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full max-w-[310px] ${isAdminMode ? 'min-h-fit' : 'h-fit min-h-[350px]'} bg-dark-bg text-slate-200 rounded-xl p-5 shadow-xl border border-white/10 font-sans flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        {renderHeader()}
        {isAdminMode ? (
          <div className="relative">
            <span className="absolute -top-2 -left-2 text-3xl text-brand-green/20 font-serif">"</span>
            <p className="text-[13px] italic text-slate-400 leading-[1.6] mb-6 px-2">
              The best way to predict the future is to create it. Stay focused, stay creative.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-[14px] text-slate-300 leading-[1.6]">
              Graphic Designer & Web Developer crafting strong visuals and engaging digital experiences.
            </p>
            {mode === 'full' && (
              <a 
                href="https://link.fitrimahadzir.my" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] font-mono text-slate-400 hover:text-brand-green transition-colors w-fit"
              >
                <LinkIcon size={12} className="shrink-0" />
                link.fitrimahadzir.my
              </a>
            )}
          </div>
        )}
      </div>

      <div className={isAdminMode ? 'flex-1 overflow-hidden flex flex-col' : ''}>
        {isAdminMode ? (
          <div className="flex flex-col h-[calc(100vh-280px)]">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-4">
              {adminNav.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                    {section.title}
                  </h4>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = activeAdminItem === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNav(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-brand-green/10 text-brand-green' 
                              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                          }`}
                        >
                          <item.icon size={16} className={isActive ? 'text-brand-green' : 'opacity-70'} />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 pt-4 mt-2 border-t border-slate-200 dark:border-white/10">
              <button 
                onClick={logout}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            {renderSocials()}
            {renderResumeBtn()}
          </>
        )}
      </div>
    </motion.div>
  );
}
