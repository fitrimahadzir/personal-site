import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github, Loader2, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSkillIcon } from '../utils/icons';
import { BiLogoPlayStore } from 'react-icons/bi';
import { FaAppStore } from 'react-icons/fa';
import AccentWord from './AccentWord';

export default function Projects({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true);
      
      if (error) {
        console.error("DEBUG: Error fetching projects from Supabase:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
      } else {
        console.log("DEBUG: Projects data fetched:", data);
        if (data && data.length > 0) {
          console.log("DEBUG: Available columns in 'projects' table:", Object.keys(data[0]));
        }
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();

    const subscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
  return 'text-slate-500 dark:text-slate-400';
};

  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="space-y-4 py-4 sm:py-8">
      <div className="mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          Selected <AccentWord>Projects</AccentWord>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          A curated selection of my professional work and personal projects, demonstrating my ability to build high-performance and user-centric digital experiences.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3].map((skeleton) => (
              <div key={`skeleton-${skeleton}`} className="flex flex-col bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden h-full shadow-sm animate-pulse">
                {/* Image Skeleton */}
                <div className="w-full aspect-video bg-slate-200 dark:bg-white/10" />
                
                {/* Content Skeleton */}
                <div className="flex flex-col grow p-4 sm:p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-md" />
                      <div className="h-3 w-5/6 bg-slate-200 dark:bg-white/10 rounded-md" />
                      <div className="h-3 w-4/6 bg-slate-200 dark:bg-white/10 rounded-md" />
                    </div>
                  </div>
                  
                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="h-5 w-16 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                    <div className="h-5 w-14 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                    <div className="h-5 w-20 bg-slate-200 dark:bg-white/10 rounded border border-slate-200 dark:border-white/5" />
                  </div>

                  {/* Buttons Skeleton */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                    <div className="h-8 w-28 bg-slate-300 dark:bg-white/20 rounded-lg" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : projects.length > 0 ? (
          projects.map((project, index) => {
            console.log("DEBUG: Mapping project:", project);
            return (
              <motion.div 
                key={project.id || `project-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-brand-green/5 transition-all duration-500 ease-out h-full"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-white/5 shrink-0">
                <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <img 
                  alt={project.Title} 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1 opacity-90 group-hover:opacity-100" 
                  src={project.feature_image} 
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
                    onClick={() => {
                      const identifier = project.id || project.Title;
                      console.log("DEBUG: Navigating to project detail from title click. Identifier:", identifier);
                      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'project-detail', id: identifier } }));
                    }}
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
                        <span key={`${project.id || project.Title}-${tag}-${i}`} className="flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
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
                    onClick={() => {
                      const identifier = project.id || project.Title;
                      console.log("DEBUG: Navigating to project detail from button click. Identifier:", identifier);
                      window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { page: 'project-detail', id: identifier } 
                      }));
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-dark-bg rounded-lg text-xs font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-md cursor-pointer leading-none"
                  >
                    <span className="translate-y-[0.5px]">See Project Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.Link && (
                      <a target="_blank" aria-label={`View ${project.Title}`} href={project.Link} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.playStoreLink && (
                      <a target="_blank" aria-label={`View ${project.Title} on Play Store`} href={project.playStoreLink} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
                        <BiLogoPlayStore size={16} />
                      </a>
                    )}
                    {project.appStoreLink && (
                      <a target="_blank" aria-label={`View ${project.Title} on App Store`} href={project.appStoreLink} className="p-2 bg-slate-50 dark:bg-dark-bg rounded-full shadow-sm text-blue-500 hover:text-brand-green transition-all hover:scale-110 shrink-0 border border-slate-200 dark:border-white/10">
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
          <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No projects found in database.</p>
          </div>
        )}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full mt-6"
      >
        <button 
          onClick={() => onNavigate?.('portfolio')}
          className="group w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/50 hover:shadow-lg transition-all cursor-pointer text-center sm:text-left"
        >
          <span className="text-slate-900 dark:text-white font-bold text-base sm:text-lg">
            Wanna See Other Project?
          </span>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-dark-bg rounded-xl text-xs font-mono font-bold tracking-wider shadow-md">
            <span>Go To Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
