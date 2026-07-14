import React, { useState, useEffect, useRef } from 'react';
import { supabase, signInWithGoogle, logout } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { Plus, Trash2, LogIn, Loader2, Upload, Link as LinkIcon, Image as ImageIcon, X, Github, ExternalLink, Calendar, Tag, Edit2, BookOpen, FolderKanban, BarChart3, Hammer, Settings, Folder, FileText, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';
import { BiLogoPlayStore } from 'react-icons/bi';
import { FaAppStore } from 'react-icons/fa';
import AnalyticsChart from './AnalyticsChart';

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [totalRepos, setTotalRepos] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('admin-tab-change', handleTabChange);
    return () => window.removeEventListener('admin-tab-change', handleTabChange);
  }, []);

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/fitrimahadzir');
        if (res.ok) {
          const data = await res.json();
          setTotalRepos(data.public_repos);
        }
      } catch (e) {
        console.error('Failed to fetch github repos', e);
      }
    };
    fetchGithubRepos();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      // Projects
      let projectsResult = await supabase.from('projects').select('id');
      if (projectsResult.error) {
         console.error("Error fetching projects", projectsResult.error);
         projectsResult = await supabase.from('projects').select('*');
      }
      
      // Blogs
      let blogsResult = await supabase.from('blogs').select('id');
      if (blogsResult.error) {
         console.error("Error fetching blogs", blogsResult.error);
         blogsResult = await supabase.from('blogs').select('*');
      }
      
      // Jobs
      let jobsResult = await supabase.from('jobs').select('id');
      if (jobsResult.error) {
         console.error("Error fetching jobs", jobsResult.error);
         jobsResult = await supabase.from('jobs').select('*');
      }
      
      setProjects(projectsResult.data || []);
      setBlogs(blogsResult.data || []);
      setJobs(jobsResult.data || []);
    };

    fetchData();

    const projectsSub = supabase.channel('projects_admin').on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchData).subscribe();
    const blogsSub = supabase.channel('blogs_admin').on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchData).subscribe();
    const jobsSub = supabase.channel('jobs_admin').on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, fetchData).subscribe();

    return () => {
      projectsSub.unsubscribe();
      blogsSub.unsubscribe();
      jobsSub.unsubscribe();
    };
  }, [isAdmin]);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-brand-green" /></div>;
  if (!user && !import.meta.env.DEV) {
    // Redirect to new tailored login page
    setTimeout(() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'login' })), 0);
    return null;
  }
  if (!isAdmin && !import.meta.env.DEV) return <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4"><h2 className="text-2xl font-bold text-red-500">Access Denied</h2><p className="text-slate-500">You do not have permission to access this area.</p><button onClick={logout} className="text-brand-green hover:underline">Sign out</button></div>;

  return (
    <div className="space-y-6">
      {/* Dev Mode Warning */}
      {!user && import.meta.env.DEV && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200 text-sm">
            <div className="p-2 bg-amber-100 dark:bg-amber-800/30 rounded-full"><LogIn className="w-4 h-4" /></div>
            <p><strong>Dev Mode:</strong> You can view the dashboard, but you must log in to save or delete.</p>
          </div>
          <button onClick={signInWithGoogle} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0">Log In Now</button>
        </div>
      )}

      {activeTab === 'home' && (
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="text-slate-400" size={24} />
                Reports & Analytics
              </h1>
              <p className="text-slate-500 text-sm mt-1">Comprehensive data insights for your digital operations</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-medium">
                 <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900">3m</button>
                 <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900">6m</button>
                 <button className="px-3 py-1.5 rounded-md bg-white shadow-sm text-slate-900">12m</button>
                 <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900">YTD</button>
               </div>
               <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
                 <Upload size={14} className="rotate-180" /> Export <span className="ml-1 text-slate-400">v</span>
               </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Folder size={14} className="text-blue-500" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                    <ArrowUpRight size={14} /> Active
                 </div>
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-1">{projects.length || 0}</h3>
                 <p className="text-sm text-slate-500">Total Projects</p>
               </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <FileText size={14} className="text-amber-500" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                    <ArrowUpRight size={14} /> Published
                 </div>
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-1">{blogs.length || 0}</h3>
                 <p className="text-sm text-slate-500">Total Articles</p>
               </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Github size={14} className="text-slate-600" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                    <ArrowUpRight size={14} /> Synced
                 </div>
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-1">{totalRepos !== null ? totalRepos : '-'}</h3>
                 <p className="text-sm text-slate-500">GitHub Repositories</p>
               </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <Activity size={14} className="text-emerald-500" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                    System Optimal
                 </div>
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-1">100%</h3>
                 <p className="text-sm text-slate-500">Health Uptime</p>
               </div>
            </div>
          </div>

          <AnalyticsChart projectsCount={projects.length} articlesCount={blogs.length} />
          
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <AnalyticsChart />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-[#162a2d]/60 border border-white/5 rounded-2xl p-6 shadow-sm max-w-md">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-brand-green" />
              Security Settings
            </h3>
            <p className="text-sm text-slate-500 mb-6">Update your account password</p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
              const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
              
              if (newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
              }
              
              if (newPassword.length < 6) {
                alert("Password must be at least 6 characters");
                return;
              }

              const button = form.elements.namedItem('submitBtn') as HTMLButtonElement;
              button.disabled = true;
              button.innerText = "Updating...";

              const { error } = await supabase.auth.updateUser({ password: newPassword });
              
              button.disabled = false;
              button.innerText = "Update Password";

              if (error) {
                alert(`Error updating password: ${error.message}`);
              } else {
                alert("Password updated successfully!");
                form.reset();
              }
            }} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">New Password</label>
                <input 
                  name="newPassword" 
                  type="password" 
                  required 
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0f1f22] focus:ring-1 focus:ring-brand-green outline-none" 
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  required 
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0f1f22] focus:ring-1 focus:ring-brand-green outline-none" 
                  placeholder="Confirm new password"
                />
              </div>
              <button 
                name="submitBtn"
                type="submit" 
                className="w-full py-3 bg-brand-green hover:bg-brand-green/90 text-dark-bg font-bold text-xs uppercase tracking-wider rounded-xl mt-4 transition-all"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab !== 'home' && activeTab !== 'analytics' && activeTab !== 'settings' && (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-[#162a2d]/60 border border-white/5 rounded-2xl shadow-sm">
          <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
            <Hammer className="w-10 h-10 text-brand-green" />
          </div>
          <h3 className="text-2xl font-bold mb-3 capitalize">{activeTab.replace('-', ' ')}</h3>
          <p className="text-slate-500 max-w-md leading-relaxed text-sm">
            We're currently forging this feature in the workshop. 
            Stay tuned, it will be ready to help you manage your digital space soon!
          </p>
        </div>
      )}
    </div>
  );
}
