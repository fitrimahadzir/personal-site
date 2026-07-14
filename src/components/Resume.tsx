import { motion } from 'motion/react';
import { FileText, Download, ArrowLeft, ExternalLink } from 'lucide-react';

export default function Resume() {
  const resumeUrl = "https://cdn.fitrimahadzir.my/resume.pdf";
  const downloadUrl = "https://cdn.fitrimahadzir.my/resume.pdf";

  return (
    <section id="resume" className="w-full py-4 space-y-6 flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-brand-green/10 dark:bg-brand-green/10 text-brand-green">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Curriculum Vitae</h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Fitri Mahadzir • Resume 2026</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <a 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Fitri Mahadzir (Resume).pdf"
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-green text-dark-bg rounded-xl font-mono font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <Download size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-grow w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-bg shadow-2xl relative"
      >
        <iframe 
          src={resumeUrl} 
          className="w-full h-full border-0"
          title="Fitri Mahadzir Resume"
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: 'white'
          }}
        />
        
        {/* Overlay for dark mode iframe loading/styling if needed */}
        <div className="absolute inset-0 pointer-events-none border border-slate-200 dark:border-white/10 rounded-2xl"></div>
      </motion.div>

      <div className="text-center">
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-inter">
          Can't see the document? <a href={downloadUrl} className="text-blue-500 hover:underline">Click here to download</a>
        </p>
      </div>
    </section>
  );
}
