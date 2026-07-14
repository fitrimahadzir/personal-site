import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Loader2, Search, Filter, X, ExternalLink, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { SiBehance } from 'react-icons/si';
import { BiLogoPlayStore } from 'react-icons/bi';
import { FaAppStore } from 'react-icons/fa';
import AccentWord from './AccentWord';
import { getSkillIcon } from '../utils/icons';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) {
        console.error("DEBUG: Error fetching projects in PortfolioPage:", error);
      } else {
        console.log("DEBUG: PortfolioPage data fetched:", data);
        if (data && data.length > 0) {
          console.log("DEBUG: Portfolio columns:", Object.keys(data[0]));
        }
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();

    const subscription = supabase
      .channel('projects_changes_portfolio')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    projects.forEach(project => {
      if (project.Category) {
        cats.add(project.Category);
      }
    });
    return Array.from(cats).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const title = project.Title || '';
      const about = project.about_this_project || '';
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           about.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || project.Category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  const handleProjectClick = (id: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page: 'project-detail', id } 
    }));
  };

  const getSkillColor = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('node')) return 'text-emerald-500';
    if (s.includes('react')) return 'text-[#61DAFB]';
    if (s.includes('mongo')) return 'text-green-500';
    if (s.includes('redux')) return 'text-purple-500';
    if (s.includes('ios')) return 'text-slate-500 dark:text-slate-200';
    if (s.includes('android')) return 'text-emerald-400';
    if (s.includes('tailwind')) return 'text-cyan-400';
    if (s.includes('motion')) return 'text-pink-500';
    if (s.includes('full stack')) return 'text-fuchsia-500';
    if (s.includes('api')) return 'text-indigo-400';
    if (s.includes('next')) return 'text-white';
    return 'text-brand-green';
  };

  // Find the latest update date
  let lastUpdatedDate = "April 2026"; // Default fallback
  if (projects.length > 0) {
    let latestTimestamp = 0;
    projects.forEach(project => {
      const time = project.updatedAt ? new Date(project.updatedAt).getTime() : 0;
      if (time > latestTimestamp) {
        latestTimestamp = time;
      }
    });
    
    if (latestTimestamp > 0) {
      const date = new Date(latestTimestamp);
      lastUpdatedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  }

  // if (loading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
  //       <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
  //       <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Loading Portfolio...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-8 py-4 sm:py-8">
      {/* Header Section */}
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          My <AccentWord>Portfolio</AccentWord>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          A collection of my recent projects, featuring web development, UI/UX design, and creative solutions.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      {/* Behance Link */}
      <div className="flex justify-center sm:justify-start">
        <a
          href="https://redirect.fitrimahadzir.my/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-dark-bg rounded-xl font-mono font-bold text-sm transition-all cursor-pointer hover:bg-[#9ab42b]"
        >
          <SiBehance size={18} />
          <span>View Behance Portfolio</span>
          <ExternalLink size={14} className="ml-1 opacity-70" />
        </a>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none text-sm transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-green"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-bg focus:ring-2 focus:ring-brand-green outline-none text-sm cursor-pointer transition-all"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((skeleton) => (
              <motion.div 
                key={`skeleton-${skeleton}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden h-full shadow-sm animate-pulse"
              >
                <div className="w-full aspect-video bg-slate-200 dark:bg-white/10" />
                <div className="flex flex-col grow p-4 sm:p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-md" />
                      <div className="h-3 w-5/6 bg-slate-200 dark:bg-white/10 rounded-md" />
                      <div className="h-3 w-4/6 bg-slate-200 dark:bg-white/10 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="h-5 w-16 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                    <div className="h-5 w-14 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                    <div className="h-5 w-20 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                    <div className="h-8 w-28 bg-slate-300 dark:bg-white/20 rounded-lg" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : projects.length > 0 ? (
            filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const identifier = project.id || project.Title;
                return (
                  <motion.div
                    key={project.id || `portfolio-${project.Title}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative flex flex-col bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-brand-green/5 transition-all duration-500 ease-out h-full"
                  >
                    <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-white/5 shrink-0">
                      <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <img
                        src={project.feature_image}
                        alt={project.Title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/60 sm:from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="flex flex-col grow p-4 sm:p-5 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {project.Category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {project.Category}
                            </span>
                          )}
                        </div>
                        <h3 
                          onClick={() => handleProjectClick(identifier)}
                          className="text-lg font-semibold text-slate-900 dark:text-brand-green group-hover:text-brand-green transition-colors leading-tight cursor-pointer hover:underline decoration-brand-green/30 underline-offset-4"
                        >
                          {project.Title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {project.about_this_project}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {(() => {
                          const tags = Array.isArray(project.tech_stack) ? project.tech_stack : (typeof project.tech_stack === 'string' ? project.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean) : []);
                          return tags.map((tag: string, i: number) => {
                            const Icon = getSkillIcon(tag);
                            return (
                              <span key={`${identifier}-${tag}-${i}`} className="flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                                <span className={getSkillColor(tag)}>
                                  <Icon size={12} />
                                </span>
                                {tag}
                              </span>
                            );
                          });
                        })()}
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <button 
                          onClick={() => handleProjectClick(identifier)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-dark-bg rounded-lg text-xs font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-md cursor-pointer leading-none"
                        >
                          <span className="translate-y-[0.5px]">See Project Detail</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.Link && (
                            <a target="_blank" rel="noopener noreferrer" aria-label={`View ${project.Title}`} href={project.Link} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
                              <LinkIcon className="w-4 h-4" />
                            </a>
                          )}
                          {project.playStoreLink && (
                            <a target="_blank" rel="noopener noreferrer" aria-label={`View ${project.Title} on Play Store`} href={project.playStoreLink} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
                              <BiLogoPlayStore size={16} />
                            </a>
                          )}
                          {project.appStoreLink && (
                            <a target="_blank" rel="noopener noreferrer" aria-label={`View ${project.Title} on App Store`} href={project.appStoreLink} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-blue-500 hover:text-brand-green transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
                              <FaAppStore size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl"
              >
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No projects match your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 text-brand-green text-xs font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl"
            >
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No projects found in database.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-slate-100 dark:border-white/10 text-center"
      >
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Last updated: {lastUpdatedDate}. I'm constantly working on new and exciting projects!
        </p>
      </motion.div>
    </div>
  );
}
