import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Laptop, Monitor, MousePointer2, Keyboard, Smartphone, Camera, Headphones, Code2, Terminal, Globe, Palette, Layout, Database, Cloud, Wrench, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AccentWord from './AccentWord';

const usesData = [
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro M2 Max", description: "14-inch, 32GB RAM, 1TB SSD. My primary machine for development and design.", icon: Laptop, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
      { name: "Dell UltraSharp 27\" 4K", description: "Primary monitor for color accuracy and screen real estate.", icon: Monitor, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
      { name: "Logitech MX Master 3S", description: "Ergonomic mouse with great precision and custom shortcuts.", icon: MousePointer2, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80" },
      { name: "Keychron K2 V2", description: "Mechanical keyboard with brown switches for a tactile typing experience.", icon: Keyboard, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80" },
      { name: "iPhone 15 Pro", description: "For testing mobile apps and mobile photography.", icon: Smartphone, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80" },
      { name: "Sony A7C II", description: "Used for high-quality video calls and content creation.", icon: Camera, image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80" },
      { name: "Sony WH-1000XM5", description: "Noise-canceling headphones for deep focus sessions.", icon: Headphones, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80" },
    ]
  },
  {
    category: "Software & Tools",
    items: [
      { name: "Visual Studio Code", description: "My main code editor with a minimal setup and essential extensions.", icon: Code2, image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
      { name: "WordPress", description: "The leading content management system for building websites and blogs.", icon: Globe, image: "https://upload.wikimedia.org/wikipedia/commons/2/20/WordPress_logo.svg" },
      { name: "Notion", description: "Where I plan my projects, take notes, and organize my life.", icon: Layout, image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
      { name: "Arc Browser", description: "A unique browsing experience that helps organize my digital life.", icon: Globe },
      { name: "Warp Terminal", description: "A modern, AI-powered terminal for a faster workflow.", icon: Terminal },
      { name: "Postman", description: "Essential for testing and documenting APIs.", icon: Database },
      { name: "Docker", description: "For containerizing applications and managing environments.", icon: Cloud },
    ]
  },
  {
    category: "Development Stack",
    items: [
      { name: "React & Next.js", description: "My go-to framework for building modern web applications.", icon: Code2 },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development.", icon: Layout },
      { name: "TypeScript", description: "For type-safe and maintainable JavaScript code.", icon: Code2 },
      { name: "Framer Motion", description: "The best library for creating smooth React animations.", icon: Layout },
      { name: "Firebase / Supabase", description: "Backend-as-a-Service for quick prototyping and scaling.", icon: Database },
    ]
  }
];

export default function Uses() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        // Try fetching from 'tools' table first, if it fails, try 'uses'
        let { data, error } = await supabase
          .from('tools')
          .select('*');

        if (error && error.code === '42P01') {
           // 42P01 is table does not exist
           const res = await supabase.from('uses').select('*');
           data = res.data;
           error = res.error;
        }
        
        if (error) {
          console.error("Error fetching tools:", error);
          setFetchError(`Supabase Error: ${error.message}`);
        } else {
          setTools(data || []);
        }
      } catch (err: any) {
        setFetchError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();

    const subscription = supabase
      .channel('uses_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'uses' }, () => {
        fetchTools();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    const categoryValue = tool.Category || tool.category || 'Uncategorized';
    if (!acc[categoryValue]) {
      acc[categoryValue] = [];
    }
    acc[categoryValue].push(tool);
    return acc;
  }, {} as Record<string, any[]>);

  // Define category order
  const categoryOrder = ["Hardware", "Software", "Accessories", "Deploy", "Development"];
  
  // Sort categories based on the defined order, then alphabetically for any others
  const sortedCategories = Object.keys(groupedTools).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  // Fallback to static data if no tools are in Firebase yet
  const displayData = tools.length > 0 
    ? sortedCategories.map(category => ({
        category,
        items: groupedTools[category]
      }))
    : usesData;

  // Find the latest update date
  let lastUpdatedDate = "April 2026"; // Default fallback
  if (tools.length > 0) {
    let latestTimestamp = 0;
    tools.forEach(tool => {
      const time = tool.updatedAt ? new Date(tool.updatedAt).getTime() : (tool.createdAt ? new Date(tool.createdAt).getTime() : 0);
      if (time > latestTimestamp) {
        latestTimestamp = time;
      }
    });
    
    if (latestTimestamp > 0) {
      const date = new Date(latestTimestamp);
      lastUpdatedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  }

  return (
    <section id="tools" className="w-full py-8 space-y-12">
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-brand-green whitespace-nowrap"
        >
          <AccentWord>Tools</AccentWord> & Gear
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          A collection of hardware, software, and tools I use daily to design, develop, and stay productive.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <div className="space-y-16">
        {fetchError && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
            <strong>Database Error:</strong> {fetchError}
          </div>
        )}
        
        {loading ? (
          <>
            {[1, 2].map((sectionSkeleton) => (
              <div key={`section-skeleton-${sectionSkeleton}`} className="space-y-6">
                <div className="h-8 w-48 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((cardSkeleton) => (
                    <div key={`card-skeleton-${cardSkeleton}`} className="flex flex-col rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] shadow-sm animate-pulse h-full">
                      <div className="w-full h-[150px] sm:h-[180px] p-6">
                        <div className="w-full h-full bg-slate-200 dark:bg-white/10 rounded-xl" />
                      </div>
                      <div className="px-5 pb-5 space-y-3">
                        <div className="h-4 w-3/4 bg-slate-200 dark:bg-white/10 rounded" />
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded" />
                          <div className="h-3 w-2/3 bg-slate-200 dark:bg-white/10 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          displayData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[1.35rem] font-bold text-slate-900 dark:text-brand-green tracking-tight"
              >
                {section.category}
              </motion.h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item: any, itemIndex: number) => {
                  const itemImage = item.Image_URL || item.image_URL || item.image_url || item['Image URL'] || item.image || item.Image || item.feature_image || "https://images.unsplash.com/photo-1627398225058-631f4ce6eb0f?w=400&q=80";
                  const itemName = item.Name || item.name || item.Title || item.title || "Unknown Tool";
                  const itemDesc = item.Desc || item.desc || item.Description || item.description || item.about_this_project || "";
                  
                  return (
                  <motion.div 
                    key={item.id || itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.05 }}
                    className="group flex flex-col rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors overflow-hidden h-full shadow-sm"
                  >
                    <div className="w-full h-[150px] sm:h-[180px] flex items-center justify-center p-6 relative">
                      <img 
                        src={itemImage} 
                        alt={itemName} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-5 pb-5 flex flex-col justify-end flex-grow">
                      <h4 className="text-[13px] sm:text-[14px] font-bold text-slate-900 dark:text-brand-green leading-tight mb-1.5 line-clamp-2">
                        {itemName}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-[#a1a1aa] leading-relaxed font-inter line-clamp-2">
                        {itemDesc}
                      </p>
                    </div>
                  </motion.div>
                )})}
              </div>
            </div>
          ))
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-slate-100 dark:border-white/10 text-center"
      >
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Last updated: {lastUpdatedDate}. I'm always experimenting with new tools!
        </p>
      </motion.div>
    </section>
  );
}
