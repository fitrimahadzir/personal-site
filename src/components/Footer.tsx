import React from 'react';
import { Mail, Instagram, Heart, Lock } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
  isMinimal?: boolean;
}

export default function Footer({ onNavigate, isMinimal = false }: FooterProps) {
  const { user, isAdmin } = useAuth();
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const handleNav = (e: React.MouseEvent, page: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <>
      <footer className={`w-full border-t border-slate-200/80 dark:border-white/10 pb-4 ${isMinimal ? 'pt-6 mt-8' : 'pt-10 mt-12'}`}>
      {!isMinimal && (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-6">
            <div className="flex flex-col items-start gap-y-4 md:w-1/3">
              <div>
                <div className="h-8 sm:h-10 flex items-center mb-1">
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
                </div>
                <div className="flex flex-col gap-y-1 mt-3">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">Graphic Designer & Web Developer</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400">Perak, Malaysia</p>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col gap-3">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-brand-green uppercase tracking-widest">Pages</h3>
                <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <a className="hover:text-brand-green transition-colors" href="#" onClick={(e) => handleNav(e, 'home')}>Home</a>
                  <a className="hover:text-brand-green transition-colors" href="#about" onClick={(e) => handleNav(e, 'about')}>About</a>
                  <a className="hover:text-brand-green transition-colors" href="#services" onClick={(e) => handleNav(e, 'services')}>Services</a>
                  <a className="hover:text-brand-green transition-colors" href="#projects" onClick={(e) => handleNav(e, 'portfolio')}>Portfolio</a>
                  <a className="hover:text-brand-green transition-colors" href="#open-hire" onClick={(e) => handleNav(e, 'open-hire')}>Open Hire</a>
                  <a className="hover:text-brand-green transition-colors" href="#contact" onClick={(e) => handleNav(e, 'contact')}>Contact</a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-brand-green uppercase tracking-widest">Resources</h3>
                <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <a className="hover:text-brand-green transition-colors" href="#tools" onClick={(e) => handleNav(e, 'tools')}>Tools</a>
                  <a className="hover:text-brand-green transition-colors" href="#blogs" onClick={(e) => handleNav(e, 'blog')}>Blog</a>
                  <a target="_blank" className="hover:text-brand-green transition-colors" href="https://github.com/fitrimahadzir">Github</a>
                  <a target="_blank" className="hover:text-brand-green transition-colors" href="https://www.behance.net/fitrimahadzir">Behance</a>
                </div>
              </div>
              <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                <h3 className="text-[11px] font-bold text-slate-900 dark:text-brand-green uppercase tracking-widest">Connect</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-xs text-left leading-relaxed">
                  Wanna chat? Contact anywhere below.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <a target="_blank" rel="noopener noreferrer" aria-label="Mail" className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-slate-400 hover:bg-brand-green/20 hover:text-brand-green transition-colors" href="mailto:hi@fitrimahadzir.my">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-slate-400 hover:bg-brand-green/20 hover:text-brand-green transition-colors" href="https://wa.me/601170006477">
                    <SiWhatsapp size={16} />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-slate-400 hover:bg-brand-green/20 hover:text-brand-green transition-colors" href="https://www.instagram.com/fitri.mahadzir/">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-slate-400 hover:bg-brand-green/20 hover:text-brand-green transition-colors" href="https://www.tiktok.com/@fitri.mahadzir">
                    <SiTiktok size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cinematic Name Overlay */}
          <div className="w-full relative flex justify-center items-end pointer-events-none mt-10 sm:mt-16 pb-0 [container-type:inline-size]">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full text-center text-[12.1cqw] font-carena font-black leading-none tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-100/50 dark:from-white/10 dark:to-transparent select-none whitespace-nowrap uppercase"
            >
              FITRI MAHADZIR
            </motion.h1>
          </div>
        </>
      )}

      <div className={`pt-4 ${!isMinimal ? 'mt-2 border-t border-slate-200/80 dark:border-white/10' : ''} flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-medium`}>
        <span>© {year} FitriMahadzir.my. All rights reserved.</span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="flex items-center gap-1">Built with <Heart className="w-3 h-3 fill-brand-green text-brand-green" /> by <a target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-200 hover:text-brand-green transition-colors underline underline-offset-2" href="https://link.fitrimahadzir.my">Fitri Mahadzir</a></p>
        </div>
      </div>
      </footer>
    </>
  );
}
