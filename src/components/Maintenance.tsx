import { motion } from 'motion/react';
import { Hammer, Settings, ExternalLink } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden isolate">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green/20 via-white to-white dark:from-brand-green/10 dark:via-dark-bg dark:to-dark-bg"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl text-center z-10"
      >
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-brand-green/80"
          >
            <Settings size={64} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 dark:text-brand-green bg-white dark:bg-slate-900 rounded-full p-1"
          >
            <Hammer size={32} />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
          We are currently under maintenance.
        </h1>
        <div className="inline-block border border-brand-green/20 dark:border-brand-green/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl px-6 py-4 shadow-sm mb-8">
          <p className="text-sm font-mono text-emerald-700 dark:text-brand-green">
            Status: <span className="animate-pulse">Upgrading systems...</span>
          </p>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
          We are working hard to improve the website. Please check back later. We apologize for any inconvenience caused.
        </p>

        <div>
           <a
            href="https://link.fitrimahadzir.my"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-green/10 text-emerald-700 hover:bg-brand-green/20 dark:bg-brand-green dark:text-slate-900 dark:hover:bg-brand-green/90 font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <span>View My Link in Bio</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2026 Fitri Mahadzir. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
