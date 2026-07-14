import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ExternalLink, ChevronDown, Briefcase } from 'lucide-react';
import { getSkillIcon } from '../utils/icons';
import AccentWord from './AccentWord';
import { supabase } from '../lib/supabase';

const STATIC_JOBS = [
  {
    id: '1',
    title: 'Computer Technician',
    company: 'IMIKA Empire Sdn Bhd',
    dateFrom: 'January 2025',
    dateTo: 'June 2025',
    location: 'Malaysia',
    logo: '',
    desc1: 'Melaksanakan pemeriksaan berkala, penyelenggaraan & pembaikan terhadap komputer, laptop & peralatan ICT lain.',
    desc2: 'Memasang dan mengkonfigurasi sistem operasi, perisian aplikasi, antivirus, dan kemas kini keselamatan.',
    desc3: 'Memberi bantuan teknikal harian kepada kakitangan berkaitan masalah komputer, rangkaian, dan perisian.'
  },
  {
    id: '2',
    title: 'Graphic Designer',
    company: 'Qulusa (M) Sdn Bhd',
    dateFrom: 'September 2023',
    dateTo: 'November 2024',
    location: 'Baling, Malaysia',
    logo: '',
    desc1: 'Menyediakan bahan iklan digital bagi kandungan media sosial, website serta lain-lain platform pengiklanan.',
    desc2: 'Membuat rekaan bagi bahan bercetak seperti poster, flyer, papan tanda, sticker, banner dan lain-lain.',
    desc3: 'Membangun, menyelenggara dan menguruskan laman web e-dagang syarikat.'
  },
  {
    id: '3',
    title: 'Graphic Designer',
    company: 'AMS Vision Venture',
    dateFrom: 'July 2021',
    dateTo: 'December 2022',
    location: 'Bukit Mertajam, Malaysia',
    logo: '',
    desc1: 'Menjalankan tugas rekaan grafik bagi bahan-bahan bercetak seperti papan iklan, sticker produk, banner, t-shirt dan lain-lain.',
    desc2: 'Menyediakan beberapa konsep reka bentuk untuk dipilih oleh pelanggan & membuat pindaan berdasarkan pilihan mereka.',
    desc3: 'Meyelenggara barangan IT milik syarikat seperti komputer, modem, cctv, mesin pencetak dan lain-lain.'
  },
  {
    id: '4',
    title: 'Freelance Graphic Designer & IT Support',
    company: 'Freelance',
    dateFrom: '2019',
    dateTo: 'Present',
    location: 'Malaysia',
    logo: '',
    desc1: 'Menawarkan perkhidmatan reka bentuk grafik dan sokongan teknikal komputer kepada individu, usahawan, syarikat kecil serta organisasi tempatan secara sambilan.',
    desc2: 'Menghasilkan bahan pemasaran digital seperti poster, brosur, dan kandungan media sosial mengikut keperluan pelanggan.',
    desc3: 'Memberi khidmat nasihat & penyelenggaraan asas komputer seperti pemasangan perisian, format semula, serta penyelesaian masalah sistem.'
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [experiences, setExperiences] = useState<any[]>(STATIC_JOBS);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*');
      
      if (error) {
        console.error("Error fetching jobs:", error);
      } else if (data && data.length > 0) {
        const sortedData = (data || []).sort((a: any, b: any) => {
          const dateA = new Date(a.dateFrom).getTime();
          const dateB = new Date(b.dateFrom).getTime();
          return dateB - dateA;
        });
        setExperiences(sortedData);
        if (sortedData.length > 0 && !expandedId) {
          setExpandedId(sortedData[0].id);
        }
      }
    };

    fetchJobs();

    const subscription = supabase
      .channel('jobs_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const expandedIndex = experiences.findIndex(exp => exp.id === expandedId);

  return (
    <section id="experience" className="w-full relative mt-8">
      <div className="mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-carena font-normal leading-tight tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
        >
          <AccentWord>Work</AccentWord> History
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-slate-500 dark:text-slate-400 font-inter text-xs sm:text-sm max-w-xl leading-relaxed"
        >
          A timeline of my professional journey, highlighting my experience in engineering teams, creative collaborations, and delivering high-quality digital products.
        </motion.p>
        <div className="h-px w-full bg-slate-200 dark:bg-white/10 mt-6" />
      </div>

      <div className="relative">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative pl-8 border-l-2 border-transparent ml-4 sm:ml-6 ${index !== experiences.length - 1 ? 'pb-6' : ''}`}
          >
            <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/[0.05]" />
            <motion.div 
              initial={false}
              animate={{
                height: expandedIndex === -1 ? '0%' : (index < expandedIndex ? '100%' : index === expandedIndex ? '20px' : '0%')
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute -left-[2px] top-0 w-[2px] bg-brand-green origin-top"
            />
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-dark-bg transition-colors duration-300 ${index <= expandedIndex ? 'bg-brand-green' : 'bg-slate-300 dark:bg-white/10'}`}></div>
            
            <div className="group -ml-2">
              <div 
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 cursor-pointer select-none"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              >
                <div className="flex items-start gap-3">
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-10 h-10 rounded-lg object-cover bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center border border-brand-green/20 mt-0.5 shrink-0">
                      <Briefcase className="w-5 h-5 text-brand-green" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-medium font-inter text-slate-900 dark:text-brand-green flex flex-wrap items-center gap-2 leading-tight">
                      {exp.title}
                      {exp.dateTo?.toLowerCase() === 'present' && (
                        <span className="inline-flex gap-1 items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-50 border-emerald-200 border text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                          Current
                        </span>
                      )}
                    </h3>
                    <div className="text-slate-600 dark:text-slate-400 font-medium text-xs mt-1 flex items-center gap-1">
                      {exp.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto text-[11px] text-slate-600 dark:text-slate-400 font-mono gap-1 mt-2 sm:mt-0">
                  <div className="flex flex-col sm:items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.dateFrom} - {exp.dateTo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      📍
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.05] mt-1 sm:mt-1.5"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 sm:ml-14 pt-1">
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-outside ml-4 mb-3">
                        {exp.desc1 && <li className="leading-relaxed">{exp.desc1}</li>}
                        {exp.desc2 && <li className="leading-relaxed">{exp.desc2}</li>}
                        {exp.desc3 && <li className="leading-relaxed">{exp.desc3}</li>}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-6"
      >
        <a className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-bg transition-colors" href="#experience">
          See all work experience
        </a>
      </motion.div>
    </section>
  );
}
