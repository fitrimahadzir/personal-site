import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const totalLogos = 12;
const logos = Array.from({ length: totalLogos }).map((_, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  const colorNum = (i + 13).toString().padStart(2, '0');
  return {
    default: `https://cdn.fitrimahadzir.my/partner-logo/marquee-${num}.png`,
    color: `https://cdn.fitrimahadzir.my/partner-logo/marquee-${colorNum}.png`
  };
});

export default function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );
  
  return (
    <div className="pt-0 pb-2 sm:pb-4">
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full relative"
        >
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent dark:from-dark-bg z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent dark:from-dark-bg z-10 pointer-events-none"></div>

          <div className="overflow-hidden py-4 sm:py-6" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {logos.map((logo, i) => (
                <div 
                  key={i} 
                  className="pl-4 shrink-0 grow-0 basis-1/5 md:basis-1/6"
                >
                  <div className="relative group/logo w-full cursor-grab active:cursor-grabbing overflow-hidden isolate">
                    <img 
                      src={logo.default} 
                      className="w-full h-auto block transition-opacity duration-300 group-hover/logo:opacity-0" 
                      alt={`Partner Logo ${i + 1}`} 
                      loading="lazy" 
                      draggable="false"
                    />
                    <img 
                      src={logo.color} 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" 
                      alt={`Partner Logo ${i + 1} Colored`} 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

