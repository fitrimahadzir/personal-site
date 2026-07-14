import { motion } from 'motion/react';
import { Mail, Linkedin, Briefcase, Rocket, Handshake } from 'lucide-react';
import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import AccentWord from './AccentWord';

export default function Contact() {
  return (
    <section id="contact" className="w-full pt-8 pb-12 mt-4 text-left">
      <div className="mb-6 text-left">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          Let's <AccentWord>Contact</AccentWord>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          Feel free to get in touch and let's have a discussion about how we can work together.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      {/* Intents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.a 
          href="mailto:hi@fitrimahadzir.my?subject=Hire Full-time"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group flex flex-col p-6 rounded-[20px] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/50 transition-all shadow-sm hover:shadow-md"
        >
          <div className="p-3 bg-brand-green/10 dark:bg-brand-green/10 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
            <Briefcase className="w-5 h-5 text-brand-green" />
          </div>
          <h3 className="text-slate-900 dark:text-brand-green font-bold mb-1">Hire Full-time</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Looking for a dedicated team member?</p>
        </motion.a>

        <motion.a 
          href="mailto:hi@fitrimahadzir.my?subject=Freelance Project"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group flex flex-col p-6 rounded-[20px] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/50 transition-all shadow-sm hover:shadow-md"
        >
          <div className="p-3 bg-brand-green/10 dark:bg-brand-green/10 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
            <Rocket className="w-5 h-5 text-brand-green" />
          </div>
          <h3 className="text-slate-900 dark:text-brand-green font-bold mb-1">Freelance Project</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Have a specific project in mind?</p>
        </motion.a>

        <motion.a 
          href="https://wa.me/601170006477?text=Hi!%20I%20would%20like%20to%20discuss%20a%20collaboration."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group flex flex-col p-6 rounded-[20px] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/50 transition-all shadow-sm hover:shadow-md"
        >
          <div className="p-3 bg-brand-green/10 dark:bg-brand-green/10 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
            <Handshake className="w-5 h-5 text-brand-green" />
          </div>
          <h3 className="text-slate-900 dark:text-brand-green font-bold mb-1">Collaboration</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Partner up on a creative idea?</p>
        </motion.a>
      </div>

      {/* WhatsApp Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-[#f0fdf4] dark:bg-white/[0.03] border border-green-200 dark:border-green-900/40 rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-6 mb-12 shadow-sm"
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="bg-[#21c055] rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-white shrink-0 shadow-md shadow-[#21c055]/20">
            <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
              <SiWhatsapp size={36} color="currentColor" />
            </span>
          </div>
          <div className="flex flex-col gap-0.5 mt-1 sm:mt-2">
            <span className="text-[#21c055] text-xs sm:text-sm font-medium">Reach out for collaboration</span>
            <span className="text-slate-900 dark:text-white font-bold text-xl sm:text-2xl">WhatsApp</span>
          </div>
        </div>
        <a 
          href="https://wa.me/601170006477" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full sm:w-auto text-center sm:text-left sm:self-center bg-[#21c055] hover:bg-[#1da84a] text-white px-6 sm:px-8 py-3 rounded-xl font-mono font-bold text-sm transition-all shadow-lg shadow-[#21c055]/25 hover:shadow-xl hover:shadow-[#21c055]/40 hover:-translate-y-0.5"
        >
          Chat Now
        </a>
      </motion.div>

      {/* Social Media - Hidden as per request
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-brand-green mb-6">Find me on social media</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="mailto:hi@fitrimahadzir.my" className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors w-full">
             <Mail className="w-5 h-5 text-slate-500 dark:text-[#a1a1aa]" />
             <span className="text-slate-700 dark:text-[#e4e4e7] font-semibold text-sm">Email</span>
          </a>
          <a href="https://www.linkedin.com/in/fitri-mahadzir/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors w-full">
             <Linkedin className="w-5 h-5 text-slate-500 dark:text-[#a1a1aa]" />
             <span className="text-slate-700 dark:text-[#e4e4e7] font-semibold text-sm">Linkedin</span>
          </a>
          <a href="https://www.instagram.com/fitri.mahadzir/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors w-full">
             <span className="text-slate-500 dark:text-[#a1a1aa] flex"><SiInstagram size={20} color="currentColor" /></span>
             <span className="text-slate-700 dark:text-[#e4e4e7] font-semibold text-sm">Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@fitri.mahadzir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors w-full">
             <span className="text-slate-500 dark:text-[#a1a1aa] flex"><SiTiktok size={20} color="currentColor" /></span>
             <span className="text-slate-700 dark:text-[#e4e4e7] font-semibold text-sm">Tiktok</span>
          </a>
        </div>
      </motion.div>
      */}
    </section>
  );
}
