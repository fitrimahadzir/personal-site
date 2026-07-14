import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BiLogoPlayStore } from 'react-icons/bi';
import { FaAppStore } from 'react-icons/fa';
import { getSkillIcon } from '../utils/icons';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const CardSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 md:p-8 shadow-sm h-full flex flex-col hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors">
    <h3 className="text-xs font-bold tracking-[0.15em] text-slate-500 dark:text-slate-400 uppercase mb-6 shrink-0">{title}</h3>
    <div className="flex-1">
       {children}
    </div>
  </div>
);

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        console.warn("DEBUG: No projectId provided to ProjectDetail");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log("DEBUG: Attempting to fetch project with identifier:", projectId);
        
        let data = null;
        let error = null;

        // Try fetching by primary key. We'll try 'id' first.
        try {
          const result = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
          data = result.data;
          error = result.error;
        } catch (idErr) {
          console.warn("DEBUG: Query by 'id' failed (column might be missing):", idErr);
          error = idErr;
        }
        
        // If not found by 'id', maybe its 'Title'?
        if (error || !data) {
          console.log("DEBUG: Could not find project by 'id' (or column missing). Trying 'Title' as fallback...");
          try {
            const result = await supabase
              .from('projects')
              .select('*')
              .eq('Title', projectId)
              .single();
            
            if (!result.error && result.data) {
              data = result.data;
              error = null;
            } else {
              error = result.error;
            }
          } catch (titleErr) {
            console.error("DEBUG: Query by 'Title' also failed:", titleErr);
          }
        }

        if (error && !data) {
          console.error("DEBUG: Final fetch error recorded:", error);
        }

        if (data) {
          console.log("DEBUG: Found project data:", data);
          setProject(data);
        } else {
          console.warn("DEBUG: Project lookup returned no data for identifier:", projectId);
        }
      } catch (error) {
        console.error("DEBUG: Global exception in fetchProject:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
        <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Loading Project Details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <button onClick={onBack} className="text-brand-green hover:underline flex items-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Back to Projects
        </button>
      </div>
    );
  }

  // Parse description for layout
  let subtitle = 'A detailed look into this project built with modern technologies.';
  let aboutContent = project.about_this_project || 'No detailed description provided.';
  let features: string[] = [];

  if (project.about_this_project) {
    const parsedDescription = project.about_this_project.split('\n');
    features = parsedDescription
      .filter((l: string) => l.trim().startsWith('-') || l.trim().startsWith('•'))
      .map((l: string) => l.replace(/^[-•]\s*/, ''));
    
    const aboutParagraphs = parsedDescription
      .filter((l: string) => !l.trim().startsWith('-') && !l.trim().startsWith('•') && l.trim() !== '');

    if (aboutParagraphs.length > 0) {
      subtitle = aboutParagraphs[0];
      aboutContent = aboutParagraphs.join('\n\n');
    }
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
        <ArrowLeft size={16} className="text-slate-400" /> Back to Projects
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-3xl">
          {/* Tags / Meta */}
          <div className="flex items-center gap-3 text-xs font-medium mb-4">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white/[0.08] dark:text-slate-200 font-semibold border border-transparent dark:border-white/10">
              {project.Category || 'Project'}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {project.Year || project.createdAt ? (project.Year || new Date(project.createdAt).getFullYear()) : new Date().getFullYear()}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 dark:text-brand-green tracking-tight mb-3 leading-tight">
            {project.Title}
          </h1>
        </div>

        {project.Link && (
          <a 
            href={project.Link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-sm font-medium transition-all shadow-sm text-slate-900 dark:text-white hover:-translate-y-0.5"
          >
            <ExternalLink size={16} className="text-slate-500 dark:text-slate-400" /> Live Demo
          </a>
        )}
      </div>

      {/* Project Image - Full Width within section, no borders */}
      <div className="w-full mb-12 overflow-hidden rounded-2xl">
        <img 
          src={project.feature_image} 
          alt={project.Title} 
          className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 flex flex-col gap-6">
           <CardSection title="ABOUT THIS PROJECT">
             <div className="prose dark:prose-invert max-w-none prose-sm md:prose-base font-inter">
               <p className="leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{aboutContent}</p>
             </div>
           </CardSection>

           {features.length > 0 && (
             <CardSection title="FEATURES">
               <ul className="space-y-4">
                 {features.map((f, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 shrink-0"></span>
                     <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">{f}</span>
                   </li>
                 ))}
               </ul>
             </CardSection>
           )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <CardSection title="Tools & Technologies">
            <div className="flex flex-wrap gap-2.5">
              {(() => {
                const tags = Array.isArray(project.tech_stack) 
                  ? project.tech_stack 
                  : (typeof project.tech_stack === 'string' ? project.tech_stack.split(',').map(s => s.trim()) : []);
                
                return tags.map((tag: string, i: number) => {
                  const Icon = getSkillIcon(tag);
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-default">
                      <div className={`w-5 h-5 rounded-md bg-slate-100 dark:bg-white/10 flex items-center justify-center ${getSkillColor(tag)}`}>
                        <Icon size={12} />
                      </div>
                      {tag}
                    </div>
                  );
                });
              })()}
            </div>
          </CardSection>

          <CardSection title="LINKS">
            <div className="space-y-3">
               {project.Link && (
                  <a href={project.Link} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors shadow-sm">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Live Demo</span>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                  </a>
               )}
               {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors shadow-sm">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Source Code</span>
                    <Github size={16} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                  </a>
               )}
               {project.playStoreLink && (
                 <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                      <span className="text-emerald-600 dark:text-emerald-500 flex items-center">
                        <BiLogoPlayStore size={18} />
                      </span>
                      Google Play
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                 </a>
               )}
               {project.appStoreLink && (
                 <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                      <span className="text-slate-900 dark:text-white flex items-center">
                        <FaAppStore size={18} />
                      </span>
                      App Store
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                 </a>
               )}
            </div>
          </CardSection>
        </div>
      </div>
    </motion.div>
  );
}
