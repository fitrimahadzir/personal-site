import { motion } from 'motion/react';
import { Palette, Laptop, Settings, ArrowRight } from 'lucide-react';
import AccentWord from './AccentWord';

const servicesData = [
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

export default function Services() {
  return (
    <section id="services" className="space-y-4 py-4 sm:py-8">
      <div className="mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          <AccentWord>Services</AccentWord> & Expertise
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          Providing comprehensive solutions tailored to your unique needs, from initial UI/UX design concepts to robust frontend and web application development.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-green/50 hover:shadow-xl dark:hover:shadow-brand-green/5 transition-all duration-300 flex flex-col h-full"
          >
            <div className="text-3xl mb-4 flex items-center justify-between">
              <span>{service.emoji}</span>
              <service.icon className="w-5 h-5 text-slate-300 dark:text-slate-700 opacity-50 group-hover:text-brand-green group-hover:opacity-100 transition-all" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-brand-green group-hover:text-brand-green transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-5 text-xs leading-relaxed">
              {service.description}
            </p>

            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 aspect-video">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <ul className="space-y-2.5 mb-2 border-t border-slate-100 dark:border-white/5 pt-5">
              {service.items.map((item, id) => (
                <li key={id} className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full mt-6"
      >
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}
          className="group w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-6 py-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/50 hover:shadow-lg transition-all cursor-pointer text-center sm:text-left"
        >
          <span className="text-slate-900 dark:text-white font-bold text-base sm:text-lg">
            Ready to start your project?
          </span>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-dark-bg rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-md">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
