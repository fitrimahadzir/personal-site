import React, { useState, useEffect, useRef } from 'react';
import { supabase, signInWithGoogle, logout } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { Plus, Trash2, LogIn, Loader2, Upload, Link as LinkIcon, Image as ImageIcon, X, Edit2, BookOpen, FolderKanban, Briefcase, Wrench } from 'lucide-react';

export default function CmsDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'jobs' | 'tools'>('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [debugErrors, setDebugErrors] = useState<any[]>([]);

  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategory, setProjectCategory] = useState('All');
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategory, setBlogCategory] = useState('All');

  const projectCategories = ['All', ...Array.from(new Set(projects.map(p => p.Category).filter(Boolean)))];
  const filteredProjects = projects.filter(p => {
    const matchSearch = String(p.Title || '').toLowerCase().includes(projectSearch.toLowerCase()) || 
                        String(p.about_this_project || '').toLowerCase().includes(projectSearch.toLowerCase());
    const matchCategory = projectCategory === 'All' || p.Category === projectCategory;
    return matchSearch && matchCategory;
  });

  const blogCategories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
  const filteredBlogs = blogs.filter(b => {
    const matchSearch = String(b.title || '').toLowerCase().includes(blogSearch.toLowerCase()) || 
                        String(b.excerpt || '').toLowerCase().includes(blogSearch.toLowerCase());
    const matchCategory = blogCategory === 'All' || b.category === blogCategory;
    return matchSearch && matchCategory;
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 5000);
  };

  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Project Form State
  const [projectFormData, setProjectFormData] = useState({
    Title: '',
    Year: '',
    Category: '',
    feature_image: '',
    about_this_project: '',
    'Image 1': '',
    'Image 2': '',
    'Image 3': '',
    'Image 4': '',
    Link: '',
    githubLink: '',
    playStoreLink: '',
    appStoreLink: '',
    tech_stack: '',
    is_featured: false
  });

  // Blog Form State
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    readTime: '',
    language: 'en'
  });

  // Job Form State
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    logo: '',
    dateFrom: '',
    dateTo: '',
    location: '',
    desc1: '',
    desc2: '',
    desc3: ''
  });

  // Tool Form State
  const [toolFormData, setToolFormData] = useState({
    name: '',
    category: 'Software',
    description: '',
    image: ''
  });

  // Listen for tab changes from VCard
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && ['projects', 'blogs', 'jobs', 'tools'].includes(e.detail)) {
        setActiveTab(e.detail as 'projects' | 'blogs' | 'jobs' | 'tools');
      }
    };
    window.addEventListener('admin-tab-change', handleTabChange);
    return () => window.removeEventListener('admin-tab-change', handleTabChange);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      const errs: any[] = [];
      const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsError) {
        errs.push({ table: 'projects', error: projectsError });
        const fallback = await supabase.from('projects').select('*');
        if (fallback.error) errs.push({ table: 'projects (fallback)', error: fallback.error });
        if (!fallback.error && fallback.data) setProjects(fallback.data);
        else setProjects(fallback.data || []);
      } else {
        setProjects(projectsData || []);
      }
      
      const { data: blogsData, error: blogsError } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (blogsError) {
         const fallback = await supabase.from('blogs').select('*');
         setBlogs(fallback.data || []);
      } else {
         setBlogs(blogsData || []);
      }

      const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (jobsError) {
        const fallback = await supabase.from('jobs').select('*');
        setJobs(fallback.data || []);
      } else {
        setJobs(jobsData || []);
      }
      
      // Try 'tools' table first, fall back to 'uses'
      let { data: toolsData, error: toolsError } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
      if (toolsError) {
        errs.push({ table: 'tools', error: toolsError });
        const fallback = await supabase.from('tools').select('*');
        if (fallback.error) errs.push({ table: 'tools (fallback)', error: fallback.error });
        toolsData = fallback.data || [];
      }
      if (toolsError && toolsError.code === '42P01') {
        const fallbackUses = await supabase.from('uses').select('*');
        if (fallbackUses.error) errs.push({ table: 'uses (fallback)', error: fallbackUses.error });
        toolsData = fallbackUses.data || [];
      }
      
      setTools(toolsData || []);
      setDebugErrors(errs);
    };

    fetchData();

    const projectsSub = supabase.channel('projects_cms').on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchData).subscribe();
    const blogsSub = supabase.channel('blogs_cms').on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchData).subscribe();
    const jobsSub = supabase.channel('jobs_cms').on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, fetchData).subscribe();
    const toolsSub = supabase.channel('tools_cms').on('postgres_changes', { event: '*', schema: 'public', table: 'tools' }, fetchData).subscribe();
    const usesSub = supabase.channel('uses_cms').on('postgres_changes', { event: '*', schema: 'public', table: 'uses' }, fetchData).subscribe();

    return () => {
      projectsSub.unsubscribe();
      blogsSub.unsubscribe();
      jobsSub.unsubscribe();
      toolsSub.unsubscribe();
      usesSub.unsubscribe();
    };
  }, [isAdmin]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', "File size too large. Max 10MB allowed.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = projectFormData.feature_image;
      if (imageMode === 'upload' && selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const projectData = {
        Title: projectFormData.Title,
        Year: projectFormData.Year,
        Category: projectFormData.Category,
        feature_image: finalImageUrl,
        about_this_project: projectFormData.about_this_project,
        'Image 1': projectFormData['Image 1'],
        'Image 2': projectFormData['Image 2'],
        'Image 3': projectFormData['Image 3'],
        'Image 4': projectFormData['Image 4'],
        tech_stack: projectFormData.tech_stack || '',
        is_featured: projectFormData.is_featured,
        Link: projectFormData.Link
      };

      if (editingProjectId) {
        const { error } = await supabase.from('projects').update(projectData).eq('Title', editingProjectId);
        if (error && error.code === '42703') { // id field might not exist, but let's just eq('Title')
           // it already uses Title
        }
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
      }

      setProjectFormData({
        Title: '', Year: '', Category: '', feature_image: '', about_this_project: '',
        'Image 1': '', 'Image 2': '', 'Image 3': '', 'Image 4': '',
        Link: '', githubLink: '', playStoreLink: '', appStoreLink: '', tech_stack: '', is_featured: false
      });
      setEditingProjectId(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      showNotification('success', "Project saved successfully!");
    } catch (error) {
      console.error("Error saving project:", error);
      showNotification('error', "Error saving project: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = blogFormData.image;
      if (imageMode === 'upload' && selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const blogData = {
        ...blogFormData,
        image: finalImageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingBlogId) {
        const { error } = await supabase.from('blogs').update(blogData).eq('id', editingBlogId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert([{
          ...blogData,
          createdAt: new Date().toISOString()
        }]);
        if (error) throw error;
      }

      setBlogFormData({ title: '', excerpt: '', content: '', image: '', category: '', readTime: '', language: 'en' });
      setEditingBlogId(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      showNotification('success', "Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      showNotification('error', "Error saving blog: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsSubmitting(true);
    try {
      let finalLogoUrl = jobFormData.logo;
      if (imageMode === 'upload' && selectedFile) {
        finalLogoUrl = await uploadImage(selectedFile);
      }

      const jobData = {
        ...jobFormData,
        logo: finalLogoUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingJobId) {
        const { error } = await supabase.from('jobs').update(jobData).eq('id', editingJobId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('jobs').insert([{
          ...jobData,
          createdAt: new Date().toISOString()
        }]);
        if (error) throw error;
      }

      setJobFormData({ title: '', company: '', logo: '', dateFrom: '', dateTo: '', location: '', desc1: '', desc2: '', desc3: '' });
      setEditingJobId(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      showNotification('success', "Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error);
      showNotification('error', "Error saving job: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = toolFormData.image;
      if (imageMode === 'upload' && selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const toolData = {
        name: toolFormData.name,
        category: toolFormData.category,
        description: toolFormData.description,
        image_URL: finalImageUrl,
        Image_URL: finalImageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingToolId) {
        // Try updating 'tools' first, fall back to 'uses'
        const { error: toolTableError } = await supabase.from('tools').update(toolData).eq('id', editingToolId);
        if (toolTableError && toolTableError.code === '42P01') {
          const { error } = await supabase.from('uses').update(toolData).eq('id', editingToolId);
          if (error) throw error;
        } else if (toolTableError) {
          throw toolTableError;
        }
      } else {
        // Try inserting into 'tools' first, fall back to 'uses'
        const { error: toolTableError } = await supabase.from('tools').insert([{
          ...toolData,
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString()
        }]);
        if (toolTableError && toolTableError.code === '42P01') {
          const { error } = await supabase.from('uses').insert([{
            ...toolData,
            createdAt: new Date().toISOString(),
            created_at: new Date().toISOString()
          }]);
          if (error) throw error;
        } else if (toolTableError) {
          throw toolTableError;
        }
      }

      setToolFormData({ name: '', category: 'Software', description: '', image: '' });
      setEditingToolId(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      showNotification('success', "Tool saved successfully!");
    } catch (error) {
      console.error("Error saving tool:", error);
      showNotification('error', "Error saving tool: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditingProject = (project: any) => {
    setShowProjectForm(true);
    setProjectFormData({
      Title: project.Title || '',
      Year: project.Year || '',
      Category: project.Category || '',
      feature_image: project.feature_image || '',
      about_this_project: project.about_this_project || '',
      'Image 1': project['Image 1'] || '',
      'Image 2': project['Image 2'] || '',
      'Image 3': project['Image 3'] || '',
      'Image 4': project['Image 4'] || '',
      Link: project.Link || '',
      githubLink: project.githubLink || '',
      playStoreLink: project.playStoreLink || '',
      appStoreLink: project.appStoreLink || '',
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : (project.tech_stack || ''),
      is_featured: project.is_featured || false
    });
    setEditingProjectId(project.id || project.Title);
    setImageMode('url');
    setPreviewUrl(project.feature_image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditingBlog = (blog: any) => {
    setShowBlogForm(true);
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      readTime: blog.readTime || '',
      language: blog.language || 'en'
    });
    setEditingBlogId(blog.id);
    setImageMode('url');
    setPreviewUrl(blog.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditingJob = (job: any) => {
    setJobFormData({
      title: job.title,
      company: job.company,
      logo: job.logo || '',
      dateFrom: job.dateFrom,
      dateTo: job.dateTo,
      location: job.location,
      desc1: job.desc1 || '',
      desc2: job.desc2 || '',
      desc3: job.desc3 || ''
    });
    setEditingJobId(job.id);
    setImageMode('url');
    setPreviewUrl(job.logo || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditingTool = (tool: any) => {
    setToolFormData({
      name: tool.name || tool.Name || tool.title || tool.Title || '',
      category: tool.category || tool.Category || 'Software',
      description: tool.description || tool.Description || tool.desc || tool.Desc || tool.about_this_project || '',
      image: tool.Image_URL || tool.image_URL || tool.image_url || tool.image || tool.Image || tool['Image URL'] || tool.feature_image || ''
    });
    setEditingToolId(tool.id);
    setImageMode('url');
    setPreviewUrl(tool.Image_URL || tool.image_URL || tool.image_url || tool.image || tool.Image || tool['Image URL'] || tool.feature_image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (collectionName: string, id: string, idField: string = 'id') => {
    if (!isAdmin) return;
    try {
      // If collection is 'uses' or 'tools', try both
      if (collectionName === 'uses' || collectionName === 'tools') {
        const { error: error1 } = await supabase.from('tools').delete().eq(idField, id);
        if (error1 && error1.code === '42P01') {
          const { error: error2 } = await supabase.from('uses').delete().eq(idField, id);
          if (error2) throw error2;
        } else if (error1) {
          throw error1;
        }
      } else {
        const { error } = await supabase.from(collectionName).delete().eq(idField, id);
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const seedTools = async () => {
    if (!isAdmin) return;
    setIsSubmitting(true);
    try {
      const toolsData = [
        { name: "PC", category: "Hardware", description: "High-performance workstation used for design and development tasks.", image_URL: "" },
        { name: "Mechanical Keyboard", category: "Hardware", description: "Provides better typing experience and productivity.", image_URL: "" },
        { name: "Dual Monitor Setup", category: "Hardware", description: "Enhances multitasking and workflow efficiency.", image_URL: "" },
        { name: "Adobe Photoshop", category: "Software", description: "Used for high-quality image editing and visual design.", image_URL: "" },
        { name: "Adobe Illustrator", category: "Software", description: "Used for vector graphics and branding design.", image_URL: "" },
        { name: "Visual Studio Code", category: "Software", description: "Primary code editor for frontend and full-stack development.", image_URL: "" },
        { name: "WordPress", category: "Software", description: "Leading CMS for building websites and blogs.", image_URL: "" },
        { name: "Smartphone", category: "Accessories", description: "Used for testing responsive design and mobile applications.", image_URL: "" },
        { name: "Flymodem U100", category: "Accessories", description: "Provides portable internet access for remote work.", image_URL: "" },
        { name: "Tablet", category: "Accessories", description: "Supports sketching, design, and content consumption.", image_URL: "" },
        { name: "cPanel", category: "Deploy", description: "Used for managing web hosting and server configurations.", image_URL: "" },
        { name: "Netlify", category: "Deploy", description: "Used for deploying static websites with CI/CD integration.", image_URL: "" },
        { name: "Vercel", category: "Deploy", description: "Used for deploying modern frontend frameworks like Next.js.", image_URL: "" },
        { name: "React", category: "Development", description: "JavaScript library for building interactive user interfaces.", image_URL: "" },
        { name: "Next.js", category: "Development", description: "Framework for building scalable and performant web applications.", image_URL: "" },
        { name: "Tailwind CSS", category: "Development", description: "Utility-first CSS framework for rapid UI development.", image_URL: "" },
        { name: "Firebase", category: "Development", description: "Backend-as-a-service for authentication, database, and hosting.", image_URL: "" }
      ];

      const existingNames = new Set(tools.map(t => t.name));

      for (const tool of toolsData) {
        if (!existingNames.has(tool.name)) {
          const { error: error1 } = await supabase.from('tools').insert([{
            ...tool,
            createdAt: new Date().toISOString()
          }]);
          if (error1 && error1.code === '42P01') {
            await supabase.from('uses').insert([{
              ...tool,
              createdAt: new Date().toISOString()
            }]);
          }
        }
      }
    } catch (error) {
      console.error("Error seeding tools:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const seedJobs = async () => {
    if (!isAdmin) return;
    if (!user && !import.meta.env.DEV) {
      showNotification('error', "You must be logged in to seed data.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const initialJobs = [
        {
          title: 'Computer Technician',
          company: 'IMIKA Empire Sdn Bhd',
          dateFrom: 'January 2025',
          dateTo: 'June 2025',
          location: 'Malaysia',
          logo: '',
          desc1: 'Melaksanakan pemeriksaan berkala, penyelenggaraan & pembaikan terhadap komputer, laptop & peralatan ICT lain.',
          desc2: 'Memasang dan mengkonfigurasi sistem operasi, perisian aplikasi, antivirus, dan kemas kini keselamatan.',
          desc3: 'Memberi bantuan teknikal harian kepada kakitangan berkaitan masalah komputer, rangkaian, dan perisian.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          title: 'Graphic Designer',
          company: 'Qulusa (M) Sdn Bhd',
          dateFrom: 'September 2023',
          dateTo: 'November 2024',
          location: 'Baling, Malaysia',
          logo: '',
          desc1: 'Menyediakan bahan iklan digital bagi kandungan media sosial, website serta lain-lain platform pengiklanan.',
          desc2: 'Membuat rekaan bagi bahan bercetak seperti poster, flyer, papan tanda, sticker, banner dan lain-lain.',
          desc3: 'Membangun, menyelenggara dan menguruskan laman web e-dagang syarikat.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          title: 'Graphic Designer',
          company: 'AMS Vision Venture',
          dateFrom: 'July 2021',
          dateTo: 'December 2022',
          location: 'Bukit Mertajam, Malaysia',
          logo: '',
          desc1: 'Menjalankan tugas rekaan grafik bagi bahan-bahan bercetak seperti papan iklan, sticker produk, banner, t-shirt dan lain-lain.',
          desc2: 'Menyediakan beberapa konsep reka bentuk untuk dipilih oleh pelanggan & membuat pindaan berdasarkan pilihan mereka.',
          desc3: 'Meyelenggara barangan IT milik syarikat seperti komputer, modem, cctv, mesin pencetak dan lain-lain.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          title: 'Freelance Graphic Designer & IT Support',
          company: 'Freelance',
          dateFrom: '2019',
          dateTo: 'Present',
          location: 'Malaysia',
          logo: '',
          desc1: 'Menawarkan perkhidmatan reka bentuk grafik dan sokongan teknikal komputer kepada individu, usahawan, syarikat kecil serta organisasi tempatan secara sambilan.',
          desc2: 'Menghasilkan bahan pemasaran digital seperti poster, brosur, dan kandungan media sosial mengikut keperluan pelanggan.',
          desc3: 'Memberi khidmat nasihat & penyelenggaraan asas komputer seperti pemasangan perisian, format semula, serta penyelesaian masalah sistem.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      const { error } = await supabase.from('jobs').insert(initialJobs);
      if (error) throw error;
      
      showNotification('success', "Work experience seeded successfully!");
      
      // Force refresh data
      const { data: jobsData } = await supabase.from('jobs').select('*').order('createdAt', { ascending: false });
      setJobs(jobsData || []);
      
    } catch (error) {
      console.error("Error seeding jobs:", error);
      showNotification('error', "Error seeding jobs: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const contentType = file.type;

      // 1. Get pre-signed URL from our server
      setUploadProgress(20);
      const response = await fetch('/api/upload/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, contentType })
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, publicUrl } = await response.json();
      setUploadProgress(40);

      // 2. Upload directly to R2
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': contentType }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to R2');
      }

      setUploadProgress(100);
      showNotification('success', "Image uploaded successfully!");
      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      showNotification('error', "Upload failed: " + (error as Error).message);
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-brand-green" /></div>;
  if (!user && !import.meta.env.DEV) {
    setTimeout(() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'login' })), 0);
    return null;
  }
  if (!isAdmin && !import.meta.env.DEV) return <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4"><h2 className="text-2xl font-bold text-red-500">Access Denied</h2><p className="text-slate-500">You do not have permission to access this area.</p><button onClick={logout} className="text-brand-green hover:underline">Sign out</button></div>;

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${notification.type === 'success' ? 'bg-brand-green text-dark-bg' : 'bg-red-500 text-white'}`}>
          {notification.text}
        </div>
      )}
      <div className="space-y-10 mb-10">
        {!user && import.meta.env.DEV && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200 text-sm">
              <div className="p-2 bg-amber-100 dark:bg-amber-800/30 rounded-full"><LogIn className="w-4 h-4" /></div>
              <p><strong>Dev Mode:</strong> You can see this dashboard, but you MUST log in to actually save or seed data to the database.</p>
            </div>
            <button onClick={signInWithGoogle} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0">Log In Now</button>
          </div>
        )}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {debugErrors.length > 0 && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 font-mono text-xs overflow-auto max-h-48">
                <p className="font-bold mb-2">Debug Supabase Errors:</p>
                {debugErrors.map((err, i) => (
                  <pre key={i} className="whitespace-pre-wrap">{JSON.stringify(err, null, 2)}</pre>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                     <FolderKanban className="w-6 h-6 text-brand-green" />
                     Project Management
                   </h2>
                   <p className="text-sm text-slate-500 mt-1">Manage your portfolio projects, categories, and feature status</p>
                </div>
                <button 
                  onClick={() => setShowProjectForm(!showProjectForm)}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-brand-green text-white dark:text-slate-900 text-sm font-bold rounded-full transition-colors flex items-center gap-2 hover:opacity-90 shrink-0"
                >
                  {showProjectForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showProjectForm ? 'Close Form' : 'Add Project'}
                </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">{projects.length}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Total Projects</p>
               </div>
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-green mb-1">{projects.filter(p => p.is_featured).length}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Featured</p>
               </div>
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-1">{projectCategories.length - 1}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Categories</p>
               </div>
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">{projects.filter(p => p.Link || p.githubLink).length}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">With Links</p>
               </div>
            </div>

            {showProjectForm && (
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {editingProjectId ? <Edit2 className="w-5 h-5 text-brand-green" /> : <FolderKanban className="w-5 h-5 text-brand-green" />}
                    {editingProjectId ? 'Update Project Details' : 'Project Management Studio'}
                  </h3>
                  {editingProjectId && (
                    <button 
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectFormData({ Title: '', Year: '', Category: '', feature_image: '', about_this_project: '', 'Image 1': '', 'Image 2': '', 'Image 3': '', 'Image 4': '', Link: '', githubLink: '', playStoreLink: '', appStoreLink: '', tech_stack: '', is_featured: false });
                        setPreviewUrl(null);
                        setShowProjectForm(false);
                      }}
                      className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title*</label>
                  <input required value={projectFormData.Title} onChange={e => setProjectFormData({...projectFormData, Title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Selection*</label>
                  {imageMode === 'url' ? (
                    <input required value={projectFormData.feature_image} onChange={e => {setProjectFormData({...projectFormData, feature_image: e.target.value}); setPreviewUrl(e.target.value);}} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://..." />
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 hover:border-brand-green text-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                      {selectedFile ? <span className="text-xs text-brand-green">{selectedFile.name}</span> : <span className="text-xs text-slate-500">Click to upload</span>}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                      <button type="button" onClick={() => setImageMode('url')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'url' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>URL</button>
                      <button type="button" onClick={() => setImageMode('upload')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>Upload</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <input value={projectFormData.Year} onChange={e => setProjectFormData({...projectFormData, Year: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. 2024" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <input value={projectFormData.Category} onChange={e => setProjectFormData({...projectFormData, Category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Web App" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">About this Project*</label>
                  <textarea required rows={3} value={projectFormData.about_this_project} onChange={e => setProjectFormData({...projectFormData, about_this_project: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tech Stack (comma separated)*</label>
                  <input required value={projectFormData.tech_stack} onChange={e => setProjectFormData({...projectFormData, tech_stack: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="React, Tailwind" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Link</label>
                  <input value={projectFormData.Link} onChange={e => setProjectFormData({...projectFormData, Link: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub Link</label>
                  <input value={projectFormData.githubLink} onChange={e => setProjectFormData({...projectFormData, githubLink: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Play Store Link</label>
                  <input value={projectFormData.playStoreLink} onChange={e => setProjectFormData({...projectFormData, playStoreLink: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://play.google.com/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">App Store Link</label>
                  <input value={projectFormData.appStoreLink} onChange={e => setProjectFormData({...projectFormData, appStoreLink: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://apps.apple.com/..." />
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="is_featured" checked={projectFormData.is_featured} onChange={e => setProjectFormData({...projectFormData, is_featured: e.target.checked})} className="w-4 h-4 text-brand-green rounded outline-none cursor-pointer" />
                  <label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">Feature this project on home page</label>
                </div>
                <div className="md:col-span-2">
                  <button disabled={isSubmitting || isUploading} type="submit" className="w-full py-3 bg-brand-green text-dark-bg font-mono font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {isSubmitting || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingProjectId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {isUploading ? `Uploading (${uploadProgress}%)...` : (isSubmitting ? 'Saving...' : (editingProjectId ? 'Update Project' : 'Add Project'))}
                  </button>
                </div>
              </form>
            </div>
            )}

            <div className="space-y-6">
              <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 relative">
                  <div className="relative flex-1">
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input 
                      type="text" 
                      placeholder="Search projects by title or description..." 
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all font-medium"
                    />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <select 
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="appearance-none px-5 py-3 pr-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em]"
                    >
                      {projectCategories.map((cat: any) => (
                         <option key={cat} value={cat} className="bg-white dark:bg-dark-bg">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto">
                  <table className="w-full text-left text-sm align-middle whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Project</th>
                        <th className="py-4 px-6 font-semibold">Category</th>
                        <th className="py-4 px-6 font-semibold">Tech Stack</th>
                        <th className="py-4 px-6 font-semibold">Last Updated</th>
                        <th className="py-4 px-6 font-semibold">Links</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project, i) => (
                        <tr key={`proj-${i}`} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#1e293b] dark:bg-brand-green/20 text-white dark:text-brand-green flex items-center justify-center font-bold font-mono shrink-0">
                                {project.Title ? project.Title.substring(0, 2).toUpperCase() : 'PR'}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{project.Title}</span>
                                <span className="text-xs text-slate-500 truncate max-w-[200px]">{project.Year || 'N/A'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <FolderKanban className="w-4 h-4 text-slate-400" />
                              <span className="font-medium text-slate-700 dark:text-slate-300">{project.Category || 'Uncategorized'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="max-w-[150px] truncate text-slate-600 dark:text-slate-400">
                              {project.tech_stack || 'None'}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                            {project.created_at ? new Date(project.created_at).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' }) : '-'}
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                            {[project.Link, project.githubLink, project.playStoreLink, project.appStoreLink].filter(Boolean).length}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${project.is_featured ? 'bg-amber-500' : 'bg-brand-green'}`}></div>
                              <span className={`font-medium ${project.is_featured ? 'text-amber-600 dark:text-amber-500' : 'text-brand-green'}`}>
                                {project.is_featured ? 'Featured' : 'Active'}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditingProject(project)} className="p-2 text-slate-500 hover:text-brand-green rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete('projects', project.id || project.Title, 'Title')} className="p-2 text-slate-500 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProjects.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-slate-500 text-sm border-b-0">
                            No projects found for the given search/category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                     <BookOpen className="w-6 h-6 text-brand-green" />
                     Blog Management
                   </h2>
                   <p className="text-sm text-slate-500 mt-1">Manage your blog articles, categories, and content</p>
                </div>
                <button 
                  onClick={() => setShowBlogForm(!showBlogForm)}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-brand-green text-white dark:text-slate-900 text-sm font-bold rounded-full transition-colors flex items-center gap-2 hover:opacity-90 shrink-0"
                >
                  {showBlogForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showBlogForm ? 'Close Form' : 'Add Article'}
                </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">{blogs.length}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Total Articles</p>
               </div>
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-1">{blogCategories.length - 1}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Categories</p>
               </div>
               <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">{blogs.filter(b => b.readTime).length}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">With Read Time</p>
               </div>
            </div>

            {showBlogForm && (
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {editingBlogId ? <Edit2 className="w-5 h-5 text-brand-green" /> : <BookOpen className="w-5 h-5 text-brand-green" />}
                    {editingBlogId ? 'Update Article Content' : 'Article Publishing Hub'}
                  </h3>
                  {editingBlogId && (
                    <button 
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogFormData({ title: '', excerpt: '', content: '', image: '', category: '', readTime: '', language: 'en' });
                        setPreviewUrl(null);
                        setShowBlogForm(false);
                      }}
                      className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Article Title*</label>
                  <input required value={blogFormData.title} onChange={e => setBlogFormData({...blogFormData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category*</label>
                  <input required value={blogFormData.category} onChange={e => setBlogFormData({...blogFormData, category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="Development, Design" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Excerpt (Short Summary)*</label>
                  <textarea required rows={2} value={blogFormData.excerpt} onChange={e => setBlogFormData({...blogFormData, excerpt: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none resize-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Content (Markdown)*</label>
                  <textarea required rows={6} value={blogFormData.content} onChange={e => setBlogFormData({...blogFormData, content: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none resize-none font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Read Time</label>
                  <input value={blogFormData.readTime} onChange={e => setBlogFormData({...blogFormData, readTime: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="5 min read" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <select required value={blogFormData.language} onChange={e => setBlogFormData({...blogFormData, language: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none [&>option]:bg-white dark:[&>option]:bg-dark-bg">
                    <option value="en">English</option>
                    <option value="ms">Melayu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover Image*</label>
                  {imageMode === 'url' ? (
                    <input required value={blogFormData.image} onChange={e => {setBlogFormData({...blogFormData, image: e.target.value}); setPreviewUrl(e.target.value);}} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://..." />
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 hover:border-brand-green text-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                      {selectedFile ? <span className="text-xs text-brand-green">{selectedFile.name}</span> : <span className="text-xs text-slate-500">Click to upload cover</span>}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                      <button type="button" onClick={() => setImageMode('url')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'url' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>URL</button>
                      <button type="button" onClick={() => setImageMode('upload')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>Upload</button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button disabled={isSubmitting || isUploading} type="submit" className="w-full py-3 bg-brand-green text-dark-bg font-mono font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {isSubmitting || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingBlogId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {isUploading ? `Uploading (${uploadProgress}%)...` : (isSubmitting ? 'Saving...' : (editingBlogId ? 'Update Article' : 'Publish Article'))}
                  </button>
                </div>
              </form>
            </div>
            )}

            <div className="space-y-6">
              <div className="bg-white dark:bg-[#162a2d]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 relative">
                  <div className="relative flex-1">
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input 
                      type="text" 
                      placeholder="Search articles by title or excerpt..." 
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all font-medium"
                    />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <select 
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="appearance-none px-5 py-3 pr-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em]"
                    >
                      {blogCategories.map((cat: any) => (
                         <option key={cat} value={cat} className="bg-white dark:bg-dark-bg">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto">
                  <table className="w-full text-left text-sm align-middle whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Article</th>
                        <th className="py-4 px-6 font-semibold">Category</th>
                        <th className="py-4 px-6 font-semibold">Language</th>
                        <th className="py-4 px-6 font-semibold">Last Updated</th>
                        <th className="py-4 px-6 font-semibold">Read Time</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((blog, i) => (
                        <tr key={`blog-${i}`} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#1e293b] dark:bg-brand-green/20 text-white dark:text-brand-green flex items-center justify-center font-bold font-mono shrink-0">
                                {blog.title ? blog.title.substring(0, 2).toUpperCase() : 'BL'}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{blog.title}</span>
                                <span className="text-xs text-slate-500 truncate max-w-[200px]">{blog.category || 'N/A'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              <span className="font-medium text-slate-700 dark:text-slate-300">{blog.category || 'Uncategorized'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs font-bold uppercase">
                              {blog.language || 'en'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                            {blog.createdAt ? new Date(blog.createdAt).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' }) : '-'}
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">
                            {blog.readTime || '5 min read'}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                              <span className="font-medium text-brand-green">
                                Published
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditingBlog(blog)} className="p-2 text-slate-500 hover:text-brand-green rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete('blogs', blog.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredBlogs.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-slate-500 text-sm border-b-0">
                            No articles found for the given search/category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-10">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {editingJobId ? <Edit2 className="w-5 h-5 text-brand-green" /> : <Briefcase className="w-5 h-5 text-brand-green" />}
                  {editingJobId ? 'Update Job Details' : 'Job Management Studio'}
                </h3>
                {editingJobId && (
                  <button 
                    onClick={() => {
                      setEditingJobId(null);
                      setJobFormData({ title: '', company: '', dateFrom: '', dateTo: '', location: '', desc1: '', desc2: '', desc3: '' });
                    }}
                    className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              
              <form onSubmit={handleJobSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title*</label>
                  <input required value={jobFormData.title} onChange={e => setJobFormData({...jobFormData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Senior Web Developer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name*</label>
                  <input required value={jobFormData.company} onChange={e => setJobFormData({...jobFormData, company: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Google" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date From*</label>
                  <input required value={jobFormData.dateFrom} onChange={e => setJobFormData({...jobFormData, dateFrom: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Jan 2020" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date To*</label>
                  <input required value={jobFormData.dateTo} onChange={e => setJobFormData({...jobFormData, dateTo: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Present" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Location*</label>
                  <input required value={jobFormData.location} onChange={e => setJobFormData({...jobFormData, location: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Remote, Malaysia" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Company Logo</label>
                  {imageMode === 'url' ? (
                    <input value={jobFormData.logo} onChange={e => {setJobFormData({...jobFormData, logo: e.target.value}); setPreviewUrl(e.target.value);}} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://..." />
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 hover:border-brand-green text-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                      {selectedFile ? <span className="text-xs text-brand-green">{selectedFile.name}</span> : <span className="text-xs text-slate-500">Click to upload logo</span>}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                      <button type="button" onClick={() => setImageMode('url')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'url' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>URL</button>
                      <button type="button" onClick={() => setImageMode('upload')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>Upload</button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description Point 1*</label>
                  <input required value={jobFormData.desc1} onChange={e => setJobFormData({...jobFormData, desc1: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="Key achievement or responsibility" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description Point 2</label>
                  <input value={jobFormData.desc2} onChange={e => setJobFormData({...jobFormData, desc2: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="Key achievement or responsibility" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description Point 3</label>
                  <input value={jobFormData.desc3} onChange={e => setJobFormData({...jobFormData, desc3: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="Key achievement or responsibility" />
                </div>
                <div className="md:col-span-2">
                  <button disabled={isSubmitting || isUploading} type="submit" className="w-full py-3 bg-brand-green text-dark-bg font-mono font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {isSubmitting || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingJobId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {isUploading ? `Uploading (${uploadProgress}%)...` : (isSubmitting ? 'Saving...' : (editingJobId ? 'Update Job' : 'Add Job'))}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Existing Jobs ({jobs.length})</h3>
                <button 
                  onClick={seedJobs}
                  disabled={isSubmitting}
                  className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Seed from Resume
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job, i) => (
                  <div key={`job-${i}`} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
                    <div className="flex items-center gap-4">
                      {job.logo ? (
                        <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover bg-white dark:bg-white/5" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-6 h-6 text-brand-green" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-xs text-slate-500">{job.company} • {job.dateFrom} - {job.dateTo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditingJob(job)} className="p-2 text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete('jobs', job.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-10">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {editingToolId ? <Edit2 className="w-5 h-5 text-brand-green" /> : <Wrench className="w-5 h-5 text-brand-green" />}
                  {editingToolId ? 'Update Tool Details' : 'Tool Management Studio'}
                </h3>
                {editingToolId && (
                  <button 
                    onClick={() => {
                      setEditingToolId(null);
                      setToolFormData({ name: '', category: 'Software', description: '', image: '' });
                      setPreviewUrl(null);
                    }}
                    className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleToolSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tool Name*</label>
                  <input required value={toolFormData.name} onChange={e => setToolFormData({...toolFormData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Visual Studio Code" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category*</label>
                  <select required value={toolFormData.category} onChange={e => setToolFormData({...toolFormData, category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none [&>option]:bg-white dark:[&>option]:bg-dark-bg">
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Deploy">Deploy</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description*</label>
                  <input required value={toolFormData.description} onChange={e => setToolFormData({...toolFormData, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. My main code editor with a minimal setup and essential extensions." />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Tool Image / Logo</label>
                  {imageMode === 'url' ? (
                    <input value={toolFormData.image} onChange={e => {setToolFormData({...toolFormData, image: e.target.value}); setPreviewUrl(e.target.value);}} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://..." />
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 hover:border-brand-green text-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                      {selectedFile ? <span className="text-xs text-brand-green">{selectedFile.name}</span> : <span className="text-xs text-slate-500">Click to upload image</span>}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                      <button type="button" onClick={() => setImageMode('url')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'url' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>URL</button>
                      <button type="button" onClick={() => setImageMode('upload')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-white/10 text-brand-green shadow-sm' : 'text-slate-500'}`}>Upload</button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button disabled={isSubmitting || isUploading} type="submit" className="w-full py-3 bg-brand-green text-dark-bg font-mono font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {isSubmitting || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingToolId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {isUploading ? `Uploading (${uploadProgress}%)...` : (isSubmitting ? 'Saving...' : (editingToolId ? 'Update Tool' : 'Add Tool'))}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Existing Tools ({tools.length})</h3>
                <button 
                  onClick={seedTools}
                  disabled={isSubmitting}
                  className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Seed Sample Tools
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {tools.map((tool, i) => {
                  const toolImage = tool.Image_URL || tool.image_URL || tool.image_url || tool.image || tool.Image || tool['Image URL'] || tool.feature_image;
                  const toolName = tool.name || tool.Name || tool.title || tool.Title || "Unknown Tool";
                  
                  return (
                  <div key={`tool-${i}`} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
                    <div className="flex items-center gap-4">
                      {toolImage ? (
                        <img src={toolImage} alt={toolName} className="w-12 h-12 rounded-lg object-cover bg-white dark:bg-white/5" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                          <Wrench className="w-6 h-6 text-brand-green" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{toolName}</h4>
                        <p className="text-xs text-slate-500">{tool.category || tool.Category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditingTool(tool)} className="p-2 text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete('uses', tool.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
