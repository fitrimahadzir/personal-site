import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Folder, FileText, Image as ImageIcon, Briefcase, BarChart3, Search, Settings, ShieldCheck, LogOut, Plus, Edit2, Bell, Grid, User } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { logout } from '../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string; // 'admin' | 'cms'
  onNavigate: (page: string) => void;
}

export default function AdminLayout({ children, currentRoute, onNavigate }: AdminLayoutProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('');

  // Listen to the active tab from events to sync sidebar
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('admin-tab-change', handleTabChange);
    return () => window.removeEventListener('admin-tab-change', handleTabChange);
  }, []);

  const handleNav = (page: string, tab: string) => {
    onNavigate(page);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('admin-tab-change', { detail: tab }));
    }, 50);
  };

  const navItems = [
    { name: 'OVERVIEW', icon: LayoutDashboard, page: 'admin', tab: 'home' },
    { name: 'PROJECTS', icon: Folder, page: 'cms', tab: 'projects' },
    { name: 'BLOG ARTICLES', icon: FileText, page: 'cms', tab: 'blogs' },
    { name: 'MEDIA LIBRARY', icon: ImageIcon, page: 'cms', tab: 'media' },
    { name: 'EXPERIENCE', icon: Briefcase, page: 'cms', tab: 'jobs' },
    { name: 'ANALYTICS', icon: BarChart3, page: 'admin', tab: 'analytics' },
    { name: 'SEO', icon: Search, page: 'admin', tab: 'seo' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex AdminPanelApp">
      {/* Sidebar */}
      <aside className="w-[280px] border-r border-slate-200 bg-white hidden lg:flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
              src="https://raw.githubusercontent.com/fitrimahadzir/link-bio-fitri-mahadzir/main/public/images/dp.jpg" 
              alt="Profile" 
              className="w-12 h-12 rounded-lg object-cover bg-slate-100"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-[15px]">Fitri Mahadzir</h3>
              <p className="text-[11px] text-slate-500 font-mono">Web Developer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab || (activeTab === '' && currentRoute === item.page && item.tab === 'home');
            return (
              <button
                key={item.name}
                onClick={() => handleNav(item.page, item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive 
                    ? 'text-[#1e293b] bg-[#f1f5f9] border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <item.icon size={16} className={isActive ? "text-[#1e293b]" : "text-slate-400"} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <button 
            onClick={() => handleNav('cms', 'projects')}
            className="w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> New Project
          </button>
          
          <div className="pt-4 space-y-2">
            <button
              onClick={() => handleNav('admin', 'settings')}
              className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-colors px-2 w-full text-left py-1.5 ${activeTab === 'settings' ? 'text-[#0f172a]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Settings size={14} className={activeTab === 'settings' ? 'text-[#0f172a]' : ''} /> Settings
            </button>
            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors px-2 w-full text-left py-1.5">
              <span className="w-4 flex justify-center text-lg leading-none">?</span> Support
            </button>
            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors px-2 w-full text-left py-1.5">
              <FileText size={14} /> Documentation
            </button>
            <button onClick={logout} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-500 transition-colors px-2 w-full text-left mt-4 pt-4 border-t border-slate-200 py-1.5">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search certificates, names..." 
                className="w-80 bg-[#f8fafc] border-none rounded-full py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 transition-all font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 rounded-md bg-white border border-slate-200 shadow-sm text-[10px] text-slate-400 font-bold font-mono">
                ⌘K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-900 transition-colors">
               <Bell size={20} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-3 hover:bg-slate-50 py-1 px-2 rounded-lg transition-colors border border-transparent hover:border-slate-200" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 rounded-full bg-[#1e293b] text-white font-bold text-xs flex items-center justify-center">
                FM
              </div>
              <div className="text-left hidden sm:block">
                 <p className="text-sm font-bold text-slate-900 leading-tight">Fitri Mahadzir</p>
                 <p className="text-[10px] text-slate-500 font-medium">Administrator</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar relative bg-[#f8fafc]">
          {children}
          
          {/* Footer inside content area */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider pb-8">
            <p>© {new Date().getFullYear()} FITRI MAHADZIR. BUILT WITH PRECISION.</p>
            <div className="flex gap-6 items-center">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Optimal
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .admin-content-wrapper .global-tabs-hidden .global-tabs-element { display: none !important; }
        .admin-content-wrapper > div { background: transparent !important; border: none !important; padding: 0 !important; box-shadow: none !important; margin: 0 !important; }
      `}} />
    </div>
  );
}
