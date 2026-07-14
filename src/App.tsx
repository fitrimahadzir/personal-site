import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './lib/AuthContext';
import { LanguageProvider } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import WorkingProcess from './components/WorkingProcess';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbox from './components/Chatbox';
import LeetCodeVCard from './components/LeetCodeVCard';
import Uses from './components/Uses';
import Resume from './components/Resume';
import Banner from './components/Banner';
import AdminDashboard from './components/AdminDashboard';
import CmsDashboard from './components/CmsDashboard';
import OpenHire from './components/OpenHire';
import ProjectDetail from './components/ProjectDetail';
import PortfolioPage from './components/PortfolioPage';
import ServicesPage from './components/ServicesPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import SEO from './components/SEO';
import LoginPage from './components/LoginPage';
import { DotPattern } from './components/DotPattern';
import Maintenance from './components/Maintenance';

import AdminLayout from './components/AdminLayout';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.startsWith('admin') || hostname.includes('admin.fitrimahadzir.my')) {
        return 'admin';
      }
    }
    return 'home';
  });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showBlogPopup, setShowBlogPopup] = useState(false);

  // Set this to true to enable maintenance mode (or use env var: import.meta.env.VITE_MAINTENANCE_MODE === 'true')
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  const handlePageChange = (page: string) => {
    if (page === 'blog') {
      setShowBlogPopup(true);
      return;
    }
    setCurrentPage(page);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProjectId]);

  useEffect(() => {
    const handleNavigate = (e: any) => {
      if (e.detail) {
        if (typeof e.detail === 'object') {
          if (e.detail.page === 'project-detail') {
            setSelectedProjectId(e.detail.id);
            setCurrentPage('project-detail');
          } else if (e.detail.page === 'blog-post') {
            setSelectedBlogId(e.detail.id);
            setCurrentPage('blog-post');
          }
        } else {
          if (e.detail === 'blog') {
            setShowBlogPopup(true);
          } else {
            setCurrentPage(e.detail);
          }
        }
      }
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <>
            <Banner
              title="About Me"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/20 to-transparent"
              isCompact={true}
            />
            <AboutPage />
          </>
        );
      case 'portfolio':
        return (
          <>
            <Banner
              title="Portfolio"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-emerald-500/20 to-transparent"
              isCompact={true}
            />
            <PortfolioPage />
          </>
        );
      case 'services':
        return (
          <>
            <Banner
              title="Services"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/20 to-transparent"
              isCompact={true}
            />
            <ServicesPage />
          </>
        );
      case 'tools':
        return (
          <>
            <Banner
              title="Tools & Gear"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/20 to-transparent"
              isCompact={true}
            />
            <Uses />
          </>
        );
      case 'resume':
        return (
          <>
            <Banner
              title="Curriculum Vitae"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/10 to-transparent"
              isCompact={true}
            />
            <Resume />
          </>
        );
      case 'open-hire':
        return (
          <>
            <Banner
              title="Open to Hire"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-emerald-500/20 to-transparent"
              isCompact={true}
            />
            <OpenHire />
          </>
        );
      case 'blog':
        return (
          <>
            <Banner
              title="Blog"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/20 to-transparent"
              isCompact={true}
            />
            <BlogPage />
          </>
        );
      case 'contact':
        return (
          <>
            <Banner
              title="Get In Touch"
              image="https://cdn.fitrimahadzir.my/main-img/page-banner.webp"
              accent="from-brand-green/20 to-transparent"
              isCompact={true}
            />
            <Contact />
          </>
        );
      case 'admin':
        return <AdminDashboard />;
      case 'cms':
        return <CmsDashboard />;
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetail
            projectId={selectedProjectId}
            onBack={() => setCurrentPage('portfolio')}
          />
        ) : <Hero />;
      case 'blog-post':
        return selectedBlogId ? (
          <BlogPost
            id={selectedBlogId}
            onBack={() => setCurrentPage('blog')}
          />
        ) : <BlogPage />;
      default:
        return (
          <>
            <Banner />
            <Hero />
            <Projects onNavigate={setCurrentPage} />
            <Services />
            <WorkingProcess />
            <Blogs />
            <Contact />
          </>
        );
    }
  };

  if (currentPage === 'login') {
    return (
      <LanguageProvider>
        <AuthProvider>
          <SEO />
          <LoginPage onNavigate={setCurrentPage} />
        </AuthProvider>
      </LanguageProvider>
    );
  }

  if (currentPage === 'admin' || currentPage === 'cms') {
    return (
      <LanguageProvider>
        <AuthProvider>
          <SEO />
          <DotPattern
            className="fixed inset-0 m-0 p-0 [mask-image:linear-gradient(to_bottom,white_40%,transparent)] opacity-20 dark:opacity-15 -z-10 fill-slate-600 dark:fill-slate-400"
            width={16}
            height={16}
            cx={1}
            cy={1}
            cr={1}
          />
          <AdminLayout currentRoute={currentPage} onNavigate={setCurrentPage}>
            <div className="admin-content-wrapper pb-10">
              {currentPage === 'admin' ? <AdminDashboard /> : <CmsDashboard />}
            </div>
          </AdminLayout>
        </AuthProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <SEO />
        <div className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 relative isolate">
        <DotPattern
          className="fixed inset-0 m-0 p-0 [mask-image:linear-gradient(to_bottom,white_40%,transparent)] opacity-20 dark:opacity-15 -z-10 fill-slate-600 dark:fill-slate-400"
          width={16}
          height={16}
          cx={1}
          cy={1}
          cr={1}
        />
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-[100vw]">
          <Navbar currentPage={currentPage} onNavigate={handlePageChange} />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-6 sm:gap-[30px] mt-6 sm:mt-8">
          <aside className="hidden lg:block sticky top-24 self-start w-[310px]">
            <LeetCodeVCard isAdminMode={currentPage === 'admin' || currentPage === 'cms'} onNavigate={handlePageChange} />
          </aside>
          <main className="min-h-[50vh] pb-8 overflow-hidden">
            {renderContent()}
            <Footer
              onNavigate={handlePageChange}
              isMinimal={currentPage === 'admin' || currentPage === 'cms'}
            />
          </main>
        </div>
        </div>
        <Chatbox />

        {/* Blog Under Construction Popup */}
        <AnimatePresence>
          {showBlogPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl max-w-sm w-full relative"
              >
                <button
                  onClick={() => setShowBlogPopup(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Page Under Construction</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    The blog page is currently being updated. Please check back later!
                  </p>
                  <button
                    onClick={() => setShowBlogPopup(false)}
                    className="w-full py-2.5 bg-brand-green text-dark-bg font-bold rounded-xl text-sm transition-all hover:opacity-90"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AuthProvider>
    </LanguageProvider>
  );
}
