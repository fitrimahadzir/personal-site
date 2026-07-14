import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 3,
    title: "",
    subtitle: "",
    image: "https://cdn.fitrimahadzir.my/main-img/banner-main.webp?v=1.0.1",
    accent: "from-brand-green/10 to-transparent"
  },
  {
    id: 1,
    title: "Creative Design\nSolutions",
    subtitle: "Crafting visually stunning and\nuser-centric digital experiences.",
    image: "https://cdn.fitrimahadzir.my/main-img/banner-design.webp?v=1.0.1",
    accent: "from-brand-green/10 to-transparent"
  },
  {
    id: 2,
    title: "Modern Frontend\nDevelopment",
    subtitle: "Building fast, responsive, and\naccessible web applications.",
    image: "https://cdn.fitrimahadzir.my/main-img/banner-web.webp?v=1.0.1",
    accent: "from-brand-green/10 to-transparent"
  }
];

interface BannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
  accent?: string;
  isCompact?: boolean;
}

export default function Banner({ title, subtitle, image, accent, isCompact = false }: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isStatic = !!(title || image);

  useEffect(() => {
    if (isStatic || isPaused) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [isStatic, isPaused, currentSlide]);

  const displayTitle = title || slides[currentSlide].title;
  const displaySubtitle = subtitle || slides[currentSlide].subtitle;
  const displayImage = image || slides[currentSlide].image;
  const displayAccent = accent || slides[currentSlide].accent;

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-full ${isCompact ? 'aspect-[6/1]' : 'aspect-[21/8]'} mb-4 sm:mb-8 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group bg-white dark:bg-dark-bg`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isStatic ? 'static' : currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns effect - Full Cover */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${displayImage})` }}
          />
          
      {/* Content Overlay */}
      {(displayTitle || displaySubtitle) && (
        <div 
          onClick={() => {
            const detail = isCompact ? 'home' : 'portfolio';
            window.dispatchEvent(new CustomEvent('navigate', { detail }));
          }}
          className={`absolute inset-0 flex flex-col justify-center ${isCompact ? 'items-center px-4' : 'px-6 sm:px-12'} z-10 cursor-pointer`}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`space-y-1 sm:space-y-4 ${isCompact ? 'text-center' : 'max-w-xl'}`}
          >
            <h2 className={`${isCompact ? 'text-base sm:text-2xl lg:text-3xl' : 'text-lg sm:text-3xl lg:text-4xl'} text-brand-green font-carena font-bold leading-[1.1] tracking-tight drop-shadow-md whitespace-pre-line`}>
              {displayTitle}
            </h2>
            
            {!isCompact && displaySubtitle && (
              <>
                <p className="text-[9px] sm:text-sm text-white/90 leading-relaxed font-inter whitespace-pre-line drop-shadow-sm">
                  {displaySubtitle}
                </p>
                
                <div className="hidden sm:block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'portfolio' }));
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-green text-dark-bg rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg shadow-brand-green/20 hover:bg-opacity-90 transition-all cursor-pointer w-fit leading-none"
                  >
                    <span className="translate-y-[0.5px]">See My Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
          
          {/* Progress Bar (Only for slideshow) */}
          {!isStatic && !isCompact && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-20">
              <motion.div 
                key={`progress-${currentSlide}-${isPaused}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPaused ? 0 : 1 }}
                transition={{ 
                  duration: isPaused ? 0 : 7, 
                  ease: "linear" 
                }}
                className="h-full bg-brand-green origin-left w-full"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators (Only for slideshow) */}
      {!isStatic && (
        <div className="absolute bottom-6 right-6 sm:right-10 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-brand-green" : "w-2 bg-slate-300 dark:bg-white/10 hover:bg-brand-green/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
