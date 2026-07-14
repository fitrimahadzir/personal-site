import { motion } from 'motion/react';
import { FileText, Download, Briefcase, Calendar, Star, PenTool, ArrowRight, ExternalLink } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import AccentWord from './AccentWord';

export default function OpenHire() {
  const skills = [
    "UI/UX Design",
    "Frontend Development",
    "Graphic Design",
    "Web Development",
    "SEO Optimization",
    "Visual Identity"
  ];

  const tools = [
    "WordPress",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "VS Code",
    "React.js",
    "Tailwind CSS",
    "Supabase"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pt-4 sm:pt-8 pb-16"
    >
      {/* Header */}
      <div className="mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          Career <AccentWord>Opportunities</AccentWord>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          Currently open to work and freelance opportunities. Let's build something amazing together.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      {/* Curriculum Vitae */}
      <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#64748b_2px,transparent_2px)] [background-size:24px_24px]"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-green/10 dark:bg-brand-green/10 rounded-2xl">
              <FileText className="w-6 h-6 text-brand-green" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-brand-green">Curriculum Vitae</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
            Access my comprehensive resume in different formats to learn more about my background and experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://cdn.fitrimahadzir.my/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-brand-green text-dark-bg rounded-xl font-mono font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'resume' }))}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-mono font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* Grid Sections: Status, Roles, Skills, Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Status & Availability */}
        <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-green/10 dark:bg-brand-green/10 rounded-xl">
              <Calendar className="w-5 h-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-brand-green">Status & Availability</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
              <div className="w-3 h-3 rounded-full bg-brand-green animate-pulse shrink-0"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Available for Projects</span>
            </div>
            <ul className="space-y-3 pl-2">
              <li className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                Relocation: Possible
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                Remote: Preferred
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                Notice Period: Immediate
              </li>
            </ul>
          </div>
        </section>

        {/* Preferred Roles */}
        <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-green/10 dark:bg-brand-green/10 rounded-xl">
              <Briefcase className="w-5 h-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-brand-green">Preferred Roles</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Graphic Designer",
              "Web Designer",
              "Web Developer",
              "Frontend Developer",
              "Product Designer",
              "Ui/UX Designer"
            ].map((role, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-[11px] font-bold text-slate-600 dark:text-slate-400 text-center">
                {role}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Highlight */}
        <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-green/10 dark:bg-brand-green/10 rounded-xl">
              <Star className="w-5 h-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-brand-green">Skills Highlight</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Tools I Master */}
        <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-green/10 dark:bg-brand-green/10 rounded-xl">
              <PenTool className="w-5 h-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-brand-green">Tools I Master</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl p-10 md:p-12 border border-brand-green/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-green">
          <FaWhatsapp size={80} />
        </div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-brand-green">Looking for a Creative Professional?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            I'm currently open for full-time roles and freelance projects. Let's discuss your vision and how I can help bring it to life.
          </p>
          <a 
            href="https://wa.me/601170006477"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-brand-green text-dark-bg rounded-xl font-mono font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-green/20 mx-auto cursor-pointer"
          >
            Hire Me via WhatsApp
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-dark-bg" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
