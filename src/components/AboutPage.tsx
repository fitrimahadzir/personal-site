import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ExternalLink, Calendar, GraduationCap, Award, ChevronDown, MapPin } from 'lucide-react';
import AccentWord from './AccentWord';
import BentoSection from './BentoSection';

const experienceList = [
  {
    id: 'exp-1',
    role: "Computer Technician",
    company: "IMIKA Empire Sdn Bhd",
    logo: "https://cdn.fitrimahadzir.my/about/job-imika.webp",
    dateFrom: "Jan 2025",
    dateTo: "Jun 2025",
    duration: "6 months",
    location: "Malaysia",
    responsibilities: [
      "Conduct periodic inspections, maintenance, and repairs for computers, laptops, and other ICT equipment.",
      "Troubleshot and resolve hardware and software technical issues to ensure minimal downtime.",
      "Provide technical support and guidance to end-users regarding IT infrastructure and system usage.",
      "Manage inventory of technical spare parts and detailed documentation of service reports.",
      "Perform regular system updates and security patches to maintain device health and performance."
    ],
    type: "job" as const,
    employmentType: "Full-time",
    workStyle: "On-Site"
  },
  {
    id: 'exp-2',
    role: "Graphic Designer",
    company: "Qulusa (M) Sdn Bhd",
    logo: "https://cdn.fitrimahadzir.my/about/job-qulusa.webp",
    dateFrom: "Sep 2023",
    dateTo: "Nov 2024",
    duration: "1 yr 3 months",
    location: "Baling, Malaysia",
    responsibilities: [
      "Develop digital advertising materials for social media content, websites, and various marketing platforms.",
      "Create visually compelling designs that align with branding guidelines and marketing objectives.",
      "Collaborate with the marketing team to brainstorm creative concepts for digital campaigns.",
      "Optimize graphics for web performance while ensuring high-quality visual output across devices.",
      "Manage multiple design projects simultaneously, delivering high-quality assets under tight deadlines."
    ],
    type: "job" as const,
    employmentType: "Full-time",
    workStyle: "On-Site"
  },
  {
    id: 'exp-3',
    role: "Graphic Designer",
    company: "AMS Vision Venture",
    logo: "https://cdn.fitrimahadzir.my/about/job-ams.webp",
    dateFrom: "Jul 2021",
    dateTo: "Dec 2022",
    duration: "1 yr 6 months",
    location: "Bukit Mertajam, Malaysia",
    responsibilities: [
      "Execute graphic design tasks for printed materials including billboards, product stickers, banners, and apparel.",
      "Prepare production-ready files ensured for high-quality printing and manufacturing processes.",
      "Design creative layouts for large-format advertisements and promotional exhibition signage.",
      "Consult with clients to understand design requirements and deliver customized visual solutions.",
      "Ensure color accuracy and print quality across all physical branding and promotional assets."
    ],
    type: "job" as const,
    employmentType: "Full-time",
    workStyle: "On-Site"
  },
  {
    id: 'exp-4',
    role: "Freelance Graphic Designer & IT Support",
    company: "Freelance",
    logo: "https://cdn.fitrimahadzir.my/about/job-freelance.webp",
    dateFrom: "2019",
    dateTo: "Present",
    duration: "6 yrs",
    location: "Malaysia",
    responsibilities: [
      "Provide professional graphic design and IT technical support services to individuals and small businesses.",
      "Develop customized branding packages and digital assets for emerging entrepreneurs and startups.",
      "Assist clients in setting up, optimizing, and maintaining computer systems and software environments.",
      "Manage end-to-end project lifecycles from initial consultation and conceptualizing to final delivery.",
      "Deliver high-quality remote and on-site technical solutions tailored to specific client needs."
    ],
    type: "job" as const,
    employmentType: "Freelance",
    workStyle: "Remote"
  }
];

const educationList = [
  {
    id: 'edu-1',
    role: "ILP Perai",
    company: "Sijil Kemahiran Malaysia (Tahap 3)",
    subCompany: "Computer System Technology",
    logo: "https://cdn.fitrimahadzir.my/about/edu-ilp.webp",
    dateFrom: "2020",
    dateTo: "2021",
    duration: "1 yr",
    location: "Perai, Penang",
    type: "education" as const
  },
  {
    id: 'edu-3',
    role: "SMK Sultan Idris Shah II",
    company: "STPM",
    subCompany: "Pre-University",
    logo: "https://cdn.fitrimahadzir.my/about/edu-smksis.webp",
    dateFrom: "2014",
    dateTo: "2015",
    duration: "1 yr 6 months",
    location: "Gerik, Perak",
    type: "education" as const
  },
  {
    id: 'edu-2',
    role: "SMK Sultan Idris Shah II",
    company: "PMR & SPM",
    subCompany: "General Studies",
    logo: "https://cdn.fitrimahadzir.my/about/edu-smksis.webp",
    dateFrom: "2009",
    dateTo: "2013",
    duration: "5 yrs",
    location: "Gerik, Perak",
    type: "education" as const
  }
];

const certificateList = [
  {
    id: 'cert-1',
    role: "Professional Graphic Design",
    company: "Adobe Certified Professional",
    dateFrom: "2023",
    dateTo: "Life Time",
    location: "Online",
    desc: "Validation of expertise in industry-standard creative tools.",
    type: "certificate" as const
  },
  {
    id: 'cert-2',
    role: "Frontend Web Development",
    company: "Google / Coursera",
    dateFrom: "2024",
    dateTo: "Life Time",
    location: "Online",
    desc: "Comprehensive certification covering HTML, CSS, JS, and React frameworks.",
    type: "certificate" as const
  }
];

type TabType = 'job' | 'education' | 'certificate';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('job');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Automatically expand the first item when switching tabs if it has content
  useEffect(() => {
    const list = getActiveList();
    if (list.length > 0) {
      const firstItem = list[0];
      // Auto-expand if there are responsibilities or a description to show
      if ((firstItem as any).responsibilities || (firstItem as any).desc) {
        setExpandedId(firstItem.id);
      } else {
        setExpandedId(null);
      }
    }
  }, [activeTab]);

  const getActiveList = () => {
    switch(activeTab) {
      case 'job': return experienceList;
      case 'education': return educationList;
      case 'certificate': return certificateList;
      default: return experienceList;
    }
  };

  const getTabIcon = (type: TabType) => {
    switch(type) {
      case 'job': return <Briefcase className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'certificate': return <Award className="w-5 h-5" />;
    }
  };

  const tabs: {id: TabType, label: string}[] = [
    { id: 'job', label: 'Experience' },
    { id: 'education', label: 'Education' }
  ];

  const currentList = getActiveList();
  const expandedIndex = currentList.findIndex(item => item.id === expandedId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pt-4 sm:pt-8 pb-16"
    >
      {/* Profile Section */}
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap"
        >
          My <AccentWord>Profile</AccentWord>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          A brief introduction about myself and my professional background.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <section className="mt-8">
        <div className="relative z-10 space-y-6 pt-2">
          <div className="space-y-6 text-slate-700 dark:text-slate-300 font-inter text-sm sm:text-base leading-relaxed">
            <p>
              I’m <span className="text-brand-green font-semibold">Fitri Mahadzir</span>, a graphic designer and web developer crafting strong visuals and engaging digital experiences. I specialize in branding, social media, and digital marketing design, while also building modern, responsive websites with a focus on UI/UX and frontend development. Always eager to grow and explore fresh ideas, I look forward to collaborating and creating impactful work together.
            </p>
            <div className="space-y-1">
              <p className="text-slate-500 dark:text-slate-400">Best Regards,</p>
              <p className="font-signature text-3xl md:text-4xl text-brand-green opacity-90 -rotate-2 origin-left">
                Fitri Mahadzir
              </p>
            </div>
          </div>
        </div>
      </section>

      <BentoSection />

      <div className="h-px w-full bg-slate-200 dark:bg-white/10" />

      {/* Tabs and Content Section */}
      <div className="space-y-8 pt-4">
        {/* Tab Navigation - Capsule Style */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedId(null);
              }}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                activeTab === tab.id 
                ? 'bg-slate-100 dark:bg-white text-slate-900 dark:text-slate-900 border-slate-200 dark:border-white shadow-sm' 
                : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-brand-green/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
          >
            {activeTab === 'job' 
              ? <><AccentWord>Experience</AccentWord></> 
              : activeTab === 'education' 
                ? <><AccentWord>Education</AccentWord></>
                : <><AccentWord>Certificates</AccentWord></>}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            {activeTab === 'job' 
              ? 'The following is my work experience and professional journey.' 
              : activeTab === 'education'
                ? 'My academic background and educational achievements.'
                : 'Selected certifications and professional recognition.'}
          </motion.p>
          <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
        </div>

        {/* Journey Section Content */}
        <section className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative space-y-4"
            >
              {currentList.map((item: any, index: number) => {
                if (activeTab === 'job' || activeTab === 'education') {
                  // Card-based design for both Job and Education
                  return (
                    <div key={item.id} className="flex gap-4 sm:gap-8 group/item">
                      {/* Left Side: Logo and Connecting Line */}
                      <div className="flex flex-col items-center shrink-0">
                        {/* Circle Logo Container */}
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-white/[0.03] border-[3px] border-dark-bg dark:border-brand-green shadow-xl flex items-center justify-center relative z-10 overflow-hidden group-hover/item:border-brand-green/30 transition-all duration-300"
                        >
                          {item.logo ? (
                            <img 
                              src={item.logo} 
                              alt={item.company} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="text-brand-green">
                              {getTabIcon(activeTab)}
                            </div>
                          )}
                        </motion.div>
                        
                        {/* The Connection Line */}
                        {index !== currentList.length - 1 && (
                          <div className="w-[1.5px] flex-1 bg-slate-200 dark:bg-white/10 -my-2 relative z-0" />
                        )}
                      </div>

                      {/* Right Side: The Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-1 pb-10"
                      >
                        <div 
                          className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-md cursor-pointer"
                          onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2">
                              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-brand-green leading-tight">
                                {item.role}
                              </h3>
                              
                              <div className="flex flex-col gap-1.5 pt-1">
                                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                  <div className="flex items-center gap-1.5">
                                    {activeTab === 'education' ? (
                                      <GraduationCap className="w-3 h-3 text-slate-400" />
                                    ) : (
                                      <Briefcase className="w-3 h-3 text-slate-400" />
                                    )}
                                    <span className={activeTab === 'education' ? 'text-slate-400 dark:text-slate-500' : ''}>{item.company}</span>
                                  </div>
                                  {item.subCompany && (
                                    <>
                                      <span>·</span>
                                      <span>{item.subCompany}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  <span>{item.location}</span>
                                </div>
                              </div>

                                {((item as any).responsibilities || (item as any).desc) && (
                                  <div 
                                    className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs font-semibold transition-colors group/btn text-slate-600 dark:text-slate-400 group-hover:text-brand-green"
                                  >
                                    <motion.span
                                      animate={{ rotate: expandedId === item.id ? 90 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="inline-block"
                                    >
                                      {'>'}
                                    </motion.span>
                                    <span>{expandedId === item.id ? 'Hide Responsibilities' : 'Show Responsibilities'}</span>
                                  </div>
                                )}
                            </div>

                              {/* Top Right Badges */}
                              <div className="flex flex-wrap gap-2 md:items-start shrink-0">
                                <div className="px-3 py-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
                                  {item.dateFrom} — {item.dateTo}
                                </div>
                                {item.dateTo?.toLowerCase() === 'present' && (
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Present
                                  </div>
                                )}
                                {item.duration && (
                                  <div className="px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                                    {item.duration}
                                  </div>
                                )}
                                {item.employmentType && (
                                  <div className="px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                                    {item.employmentType}
                                  </div>
                                )}
                              </div>
                          </div>

                          <AnimatePresence>
                            {(expandedId === item.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                                  {Array.isArray(item.responsibilities) ? (
                                    <ul className="space-y-3">
                                      {item.responsibilities.map((point: string, i: number) => (
                                        <li key={i} className="flex gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5" />
                                          <span className="leading-relaxed">{point}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                      {item.desc}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </div>
                  );
                }

                // Timeline-based design for Certificate Tab
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative pl-8 border-l-2 border-transparent ml-4 sm:ml-6 ${index !== currentList.length - 1 ? 'pb-8' : ''}`}
                  >
                    {/* Vertical Line Background */}
                    <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/[0.05]" />
                    
                    {/* Active Line Segment */}
                    <motion.div 
                      initial={false}
                      animate={{
                        height: expandedIndex === -1 ? '0%' : (index < expandedIndex ? '100%' : index === expandedIndex ? '20px' : '0%')
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute -left-[2px] top-0 w-[2px] bg-brand-green origin-top"
                    />

                    {/* Dot Indicator */}
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-dark-bg transition-colors duration-300 ${expandedId === item.id || (expandedIndex !== -1 && index < expandedIndex) ? 'bg-brand-green' : 'bg-slate-300 dark:bg-white/10'}`}></div>
                    
                    <div className="group -ml-2">
                      <div 
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 cursor-pointer select-none"
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${expandedId === item.id ? 'bg-brand-green/20 border-brand-green/30' : 'bg-brand-green/10 border-brand-green/20'}`}>
                            <div className="text-brand-green">
                              {getTabIcon(activeTab)}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-base font-bold font-inter text-slate-900 dark:text-brand-green flex flex-wrap items-center gap-2 leading-tight">
                              {item.role}
                              {item.dateTo?.toLowerCase() === 'present' && (
                                <span className="inline-flex gap-1 items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-50 border-emerald-200 border text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
                                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                  Current
                                </span>
                              )}
                            </h3>
                            <div className="text-slate-600 dark:text-slate-400 font-medium text-xs mt-1 flex items-center gap-1">
                              {item.company}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto text-[11px] text-slate-600 dark:text-slate-400 font-mono gap-1 mt-2 sm:mt-0">
                          <div className="flex flex-col sm:items-end gap-1">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-brand-green" />
                              <span>{item.dateFrom} - {item.dateTo}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                          <motion.div 
                            animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.05] mt-1 sm:mt-1.5"
                          >
                            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </motion.div>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expandedId === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 sm:ml-14 pt-1 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </motion.div>
  );
}
