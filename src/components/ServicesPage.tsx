import { motion } from 'motion/react';
import { Palette, Laptop, Settings, ArrowRight } from 'lucide-react';
import AccentWord from './AccentWord';

export default function ServicesPage() {
  const services = [
    {
      title: "Design (UI/UX & Graphic)",
      emoji: "🎨",
      icon: Palette,
      image: "https://cdn.fitrimahadzir.my/main-img/servicedesign.webp",
      description: "Creating visually appealing and user-friendly designs that enhance brand identity and user experience.",
      items: ["UI/UX Design", "Wireframe & Prototype", "Branding & Visual Identity", "Social Media Design"]
    },
    {
      title: "Web Development",
      emoji: "💻",
      icon: Laptop,
      image: "https://cdn.fitrimahadzir.my/main-img/serviceweb.webp",
      description: "Building modern, fast, and responsive websites tailored for branding and business growth.",
      items: ["Landing Page", "Company Website", "Portfolio Site", "CMS Integration"]
    },
    {
      title: "Web App Development",
      emoji: "⚙️",
      icon: Settings,
      image: "https://cdn.fitrimahadzir.my/main-img/servicewebapp.webp",
      description: "Developing custom web applications and systems to automate processes and manage business operations.",
      items: ["Admin Dashboard", "Authentication System", "Custom CMS", "API Integration"]
    }
  ];

  return (
    <div className="space-y-8 py-4 sm:py-8">
      {/* Header Section */}
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          My <AccentWord>Services</AccentWord>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          Providing comprehensive solutions tailored to your unique needs, from initial UI/UX design concepts to robust frontend and web application development.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-green/50 hover:shadow-xl dark:hover:shadow-brand-green/5 transition-all duration-300 flex flex-col h-full"
          >
            <div className="text-4xl mb-6 flex items-center justify-between">
              <span>{service.emoji}</span>
              <service.icon className="w-6 h-6 text-slate-300 dark:text-slate-700 opacity-50 group-hover:text-brand-green group-hover:opacity-100 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-brand-green transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">
              {service.description}
            </p>

            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 aspect-video">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <ul className="space-y-3 mb-2 border-t border-slate-100 dark:border-white/5 pt-6">
              {service.items.map((item, id) => (
                <li key={id} className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl p-10 border border-brand-green/20"
      >
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Ready to start your next project?</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          I'm currently available for freelance work and open to new collaborations.
        </p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}
          className="group px-8 py-3 bg-brand-green text-dark-bg rounded-xl font-mono font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto cursor-pointer shadow-md"
        >
          Let’s Work Together
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
