import React from "react";
import { Globe, Users, Code, Clock, Star, Github, Link, Mail } from "lucide-react";
import { SiBehance, SiTiktok, SiInstagram, SiCanvas, SiElementor, SiWebflow, SiWhatsapp } from 'react-icons/si';
import { 
  TbBrandNodejs, TbBrandTypescript, TbBrandJavascript, TbBrandTailwind, 
  TbBrandReact, TbDatabase, TbBrandNextjs, TbApi, TbBrandAngular, 
  TbBrandReactNative, TbBrain, TbBrandAdobeIllustrator, TbBrandAdobePhotoshop,
  TbBrandVscode, TbBrandWordpress, TbBrandAdobePremiere, TbBrandAdobeAfterEffect,
  TbBrandAdobe, TbBrandFigma
} from 'react-icons/tb';

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
  { name: "Premiere Pro", icon: TbBrandAdobePremiere, color: "text-[#9999FF]" },
  { name: "After Effects", icon: TbBrandAdobeAfterEffect, color: "text-[#9999FF]" },
  { name: "Creative Cloud", icon: TbBrandAdobe, color: "text-[#DA1F26]" },
  { name: "Elementor", icon: SiElementor, color: "text-[#92003B]" },
  { name: "Webflow", icon: SiWebflow, color: "text-[#4353FF]" }
];

export default function BentoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {/* Location */}
      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between h-48 overflow-hidden relative">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold z-10 relative">
          <Globe className="w-5 h-5 text-brand-green" />
          Location
        </div>
        
        {/* The Map Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 pt-10">
            <div className="relative w-full max-w-[280px]">
                {/* Map matches the 1253x501 intrinsic aspect ratio (~40%) */}
                <div style={{ paddingBottom: '40%' }}></div>
                <img 
                  src="https://cdn.fitrimahadzir.my/about/Peta-Msia.svg" 
                  alt="Malaysia Map" 
                  className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)] dark:hidden" 
                />
                <img 
                  src="https://cdn.fitrimahadzir.my/about/Peta-Msia.svg" 
                  alt="Malaysia Map (Dark)" 
                  className="absolute inset-0 w-full h-full object-contain opacity-90 hidden dark:block dark:drop-shadow-[0px_4px_4px_rgba(0,0,0,0.3)]" 
                />
                
                {/* Location Marker anchored directly on the SVG red dot (x: ~8.34%, y: ~35.65%) */}
                <div className="absolute" style={{ left: '8.34%', top: '35.65%' }}>
                    {/* The Label originating from the dot */}
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/95 dark:bg-dark-bg/95 text-[11px] font-semibold text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md whitespace-nowrap">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-green"></span>
                      </span>
                      Perak, Malaysia
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Connect */}
      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-48 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-2">
          <Link className="w-5 h-5 text-brand-green" />
          Connect
        </div>
        <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400 text-sm">
          <a href="mailto:hi@fitrimahadzir.my" className="flex items-center gap-2 hover:text-brand-green transition-colors">
            <Mail size={16} /> Email
          </a>
          <a href="https://wa.me/601170006477" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-green transition-colors">
            <SiWhatsapp size={16} /> WhatsApp
          </a>
          <a href="https://www.instagram.com/fitri.mahadzir/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-green transition-colors">
            <SiInstagram size={16} /> Instagram
          </a>
          <a href="https://www.tiktok.com/@fitri.mahadzir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-green transition-colors">
            <SiTiktok size={16} /> TikTok
          </a>
        </div>
      </div>

      {/* Stacks */}
      <div className="md:col-span-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-6">
          <Code className="w-5 h-5 text-brand-green" />
          Software & Stacks
        </div>
        <div className="flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Design & Tools Marquee - 1:1 from homepage */}
            <div className="flex overflow-hidden group">
              <div 
                className="flex gap-3 items-center py-1 whitespace-nowrap animate-marquee"
                style={{ animationDirection: 'reverse' }}
              >
                {[...designStack, ...designStack].map((tool, i) => (
                  <div key={i} className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-bg/50 text-slate-700 dark:text-slate-300 shadow-sm hover:scale-105 transition-transform cursor-default">
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

            {/* Tech Stack Marquee - 1:1 from homepage */}
            <div className="flex overflow-hidden group">
              <div 
                className="flex gap-3 items-center py-1 whitespace-nowrap animate-marquee"
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <div key={i} className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-bg/50 text-slate-700 dark:text-slate-300 shadow-sm hover:scale-105 transition-transform cursor-default">
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
      </div>

      {/* Coding Hours */}
      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-32 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
          <Clock className="w-5 h-5 text-brand-green" />
          Coding hours
        </div>
        <div className="text-2xl font-bold dark:text-white">2541 hrs</div>
      </div>

      {/* Fav Framework */}
      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-32 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
          <Star className="w-5 h-5 text-brand-green" />
          Fav. framework
        </div>
        <div className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <TbBrandReact size={32} color="#61DAFB" /> React
        </div>
      </div>
    </div>
  );
}
