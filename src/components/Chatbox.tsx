import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbox', handleOpen);
    return () => window.removeEventListener('open-chatbox', handleOpen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-5 sm:right-8 w-[280px] sm:w-[320px] bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-dark-bg p-3 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2 text-xs">
                <MessageCircle className="w-3.5 h-3.5" />
                Ask a Question
              </h3>
              <button aria-label="Close Chat" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-0 overflow-hidden">
              <iframe 
                src="https://whatsform.com/vz-ety" 
                width="100%" 
                height="450" 
                frameBorder="0"
                title="Enquiry Form"
                className="w-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-5 sm:right-8 z-40 p-2.5 sm:p-3 bg-brand-green text-dark-bg rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all cursor-pointer"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </>
  );
}
