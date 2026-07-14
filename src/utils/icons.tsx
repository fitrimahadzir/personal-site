import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiRedux, 
  SiTailwindcss, 
  SiFramer, 
  SiVercel,
  SiJavascript,
  SiTypescript,
  SiFigma,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiSupabase,
  SiAppstore,
  SiGoogleplay,
  SiElementor,
  SiWebflow,
  SiCanva
} from 'react-icons/si';
import { 
  TbBrandNodejs, TbBrandTypescript, TbBrandJavascript, TbBrandTailwind, 
  TbBrandReact, TbDatabase, TbBrandNextjs, TbApi, TbBrandAngular, 
  TbBrandReactNative, TbBrain, TbBrandAdobeIllustrator, TbBrandAdobePhotoshop,
  TbBrandVscode, TbBrandWordpress, TbBrandAdobePremier, TbBrandAdobeAfterEffect,
  TbBrandAdobe, TbBrandFigma
} from 'react-icons/tb';
import { FaCode, FaMobileAlt, FaServer, FaGlobe, FaPaintBrush, FaWordpress } from 'react-icons/fa';
import { IconType } from 'react-icons';

export const getSkillIcon = (skill: string): IconType => {
  const s = skill.toLowerCase();
  
  // Preferred matching to Marquee style (Tb/Si)
  if (s.includes('react native')) return TbBrandReactNative;
  if (s.includes('react')) return TbBrandReact;
  if (s.includes('node')) return TbBrandNodejs;
  if (s.includes('mongo')) return TbDatabase;
  if (s.includes('postgresql') || s.includes('postgres')) return TbDatabase;
  if (s.includes('redux')) return TbApi;
  if (s.includes('angular')) return TbBrandAngular;
  if (s.includes('tailwind')) return TbBrandTailwind;
  if (s.includes('next')) return TbBrandNextjs;
  if (s.includes('typescript') || s.includes('ts')) return TbBrandTypescript;
  if (s.includes('javascript') || s.includes('js')) return TbBrandJavascript;
  
  if (s.includes('illustrator')) return TbBrandAdobeIllustrator;
  if (s.includes('photoshop')) return TbBrandAdobePhotoshop;
  if (s.includes('premiere')) return TbBrandAdobePremier;
  if (s.includes('after effects')) return TbBrandAdobeAfterEffect;
  if (s.includes('adobe')) return TbBrandAdobe;
  
  if (s.includes('elementor')) return SiElementor;
  if (s.includes('webflow')) return SiWebflow;
  if (s.includes('canva')) return SiCanva;
  if (s.includes('figma')) return TbBrandFigma;
  if (s.includes('vscode') || s.includes('vs code')) return TbBrandVscode;
  if (s.includes('wordpress')) return TbBrandWordpress;
  
  if (s.includes('ai integration') || s.includes('brain') || s.includes('gpt')) return TbBrain;

  // Fallbacks
  if (s.includes('motion') || s.includes('framer')) return SiFramer;
  if (s.includes('vercel')) return SiVercel;
  if (s.includes('sql')) return SiPostgresql;
  if (s.includes('docker')) return SiDocker;
  if (s.includes('supabase')) return SiSupabase;
  if (s.includes('ios') || s.includes('app store')) return SiAppstore;
  if (s.includes('android') || s.includes('play store')) return SiGoogleplay;
  if (s.includes('full stack')) return FaCode;
  if (s.includes('api') || s.includes('rest')) return FaServer;
  
  return FaGlobe;
};
