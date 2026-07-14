import { motion } from 'motion/react';
import { Lightbulb, PenTool, Rocket, ArrowDown } from 'lucide-react';
import { 
  TbBrandNodejs, TbBrandTypescript, TbBrandJavascript, TbBrandTailwind, 
  TbBrandReact, TbDatabase, TbBrandNextjs, TbApi, TbBrandAngular, 
  TbBrandReactNative, TbBrain, TbBrandAdobeIllustrator, TbBrandAdobePhotoshop,
  TbBrandVscode, TbBrandWordpress, TbBrandAdobePremier, TbBrandAdobeAfterEffect,
  TbBrandAdobe
} from 'react-icons/tb';
import { SiElementor, SiWebflow, SiCanvas } from 'react-icons/si';
import AccentWord from './AccentWord';

const techStack = [
  { name: "React.js", icon: TbBrandReact, color: "text-[#61DAFB]" },
  { name: "React Native", icon: TbBrandReactNative, color: "text-[#61DAFB]" },
  { name: "AI Integration", icon: TbBrain, color: "text-purple-500" },
  { name: "Node.js", icon: TbBrandNodejs, color: "text-[#339933]" },
  { name: "TypeScript", icon: TbBrandTypescript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: TbBrandJavascript, color: "text-[#F7DF1E]" },
  { name: "Angular", icon: TbBrandAngular, color: "text-[#DD0031]" },
  { name: "MongoDB", icon: TbDatabase, color: "text-[#47A248]" },
  { name: "PostgreSQL", icon: TbDatabase, color: "text-[#4169E1]" },
  { name: "Next.js", icon: TbBrandNextjs, color: "text-slate-900 dark:text-white" },
  { name: "Redux", icon: TbApi, color: "text-[#764ABC]" },
  { name: "TailwindCSS", icon: TbBrandTailwind, color: "text-[#06B6D4]" }
];

const designStack = [
  { name: "Illustrator", icon: TbBrandAdobeIllustrator, color: "text-[#FF9A00]" },
  { name: "Photoshop", icon: TbBrandAdobePhotoshop, color: "text-[#31A8FF]" },
  { name: "Canva", icon: SiCanvas, color: "text-[#00C4CC]" },
  { name: "VS Code", icon: TbBrandVscode, color: "text-[#007ACC]" },
  { name: "WordPress", icon: TbBrandWordpress, color: "text-[#21759B]" },
  { name: "Premiere Pro", icon: TbBrandAdobePremier, color: "text-[#9999FF]" },
  { name: "After Effects", icon: TbBrandAdobeAfterEffect, color: "text-[#9999FF]" },
  { name: "Creative Cloud", icon: TbBrandAdobe, color: "text-[#DA1F26]" },
  { name: "Elementor", icon: SiElementor, color: "text-[#92003B]" },
  { name: "Webflow", icon: SiWebflow, color: "text-[#4353FF]" }
];

const steps = [
  {
    id: 1,
    title: "Discovery & Planning",
    description: "Understanding your business goals, target audience, and core requirements to lay a solid conceptual foundation.",
    icon: Lightbulb
  },
  {
    id: 2,
    title: "Design & Prototyping",
    description: "Crafting user-centric wireframes and interactive, high-fidelity prototypes focused on seamless UI/UX.",
    icon: PenTool
  },
  {
    id: 3,
    title: "Development & Launch",
    description: "Translating designs into responsive, clean, and performant frontend code ready for production and scale.",
    icon: Rocket
  }
];

export default function WorkingProcess() {
  return (
    <section id="working-process" className="w-full flex flex-col py-8 mt-4 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
          >
            My <AccentWord>Working</AccentWord> Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            A structured and transparent workflow designed to deliver high-quality digital experiences from concept to launch.
          </motion.p>
        </div>
      </div>
      <div className="h-px w-full bg-slate-200 dark:bg-white/10 mb-8" />

      {/* Process Steps */}
      <div className="relative mt-8 px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-green dark:bg-white/10 text-dark-bg dark:text-white border-none shadow-md flex items-center justify-center mb-6 z-10 group-hover:scale-110 group-hover:bg-emerald-600 dark:group-hover:bg-brand-green group-hover:border-transparent transition-all duration-300 relative">
                <step.icon className="w-8 h-8 md:w-10 md:h-10 transition-colors" />
                
                {/* Number Badge */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-green text-dark-bg font-bold text-xs flex items-center justify-center border-4 border-white dark:border-dark-bg shadow-sm">
                  {step.id}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2.5">
                {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-[260px]">
                {step.description}
              </p>

              {/* Connecting Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[40px] left-[58%] w-[84%] pointer-events-none">
                  {/* Custom SVG organic arrow matching reference style but in brand color */}
                  <svg 
                    className="text-brand-green w-full h-10" 
                    preserveAspectRatio="none" 
                    viewBox="0 0 100 30" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 15 Q 50 2, 95 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M85 7 L 97 16 L 81 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-8 text-brand-green mb-0">
                  <ArrowDown className="w-6 h-6 animate-bounce" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools Marquee moved from Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full overflow-hidden relative pt-6 mt-6"
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-dark-bg z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent dark:from-dark-bg z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-4">
          {/* Design & Tools Marquee */}
          <div className="flex overflow-hidden group">
            <div 
              className="flex gap-3 items-center py-1 whitespace-nowrap animate-slide-marquee-reverse"
            >
              {[...designStack, ...designStack].map((tool, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-bg/50 text-slate-700 dark:text-slate-300 shadow-sm hover:scale-105 transition-transform cursor-default">
                  <span className={tool.color + " flex items-center"}>
                    <span className="sm:hidden flex items-center">
                      <tool.icon size={12} />
                    </span>
                    <span className="hidden sm:block flex items-center">
                      <tool.icon size={14} />
                    </span>
                  </span>
                  <span className="font-medium text-[9px] sm:text-[11px] font-mono">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Marquee */}
          <div className="flex overflow-hidden group">
            <div 
              className="flex gap-3 items-center py-1 whitespace-nowrap animate-slide-marquee"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-bg/50 text-slate-700 dark:text-slate-300 shadow-sm hover:scale-105 transition-transform cursor-default">
                  <span className={tech.color + " flex items-center"}>
                    <span className="sm:hidden flex items-center">
                      <tech.icon size={12} />
                    </span>
                    <span className="hidden sm:block flex items-center">
                      <tech.icon size={14} />
                    </span>
                  </span>
                  <span className="font-medium text-[9px] sm:text-[11px] font-mono">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
