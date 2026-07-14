import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FcGoogle } from 'react-icons/fc';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Map 'admin' back to the email expected in Supabase
    const loginEmail = email.toLowerCase() === 'admin' ? 'admin@fitrimahadzir.my' : email;

    // As instructed by Supabase typical flow, we use signInWithPassword
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      onNavigate('admin'); // Navigate to admin on successful login
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    if (error) setError(error.message);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://cdn.fitrimahadzir.my/main-img/login-bp.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-dark-bg/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-green tracking-tight">Admin Login</h2>
          <p className="text-slate-300 text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100 flex items-center justify-center text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                className="block w-full pl-12 pr-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder-white/50 focus:ring-2 focus:border-transparent focus:ring-brand-green/50 outline-none transition-all"
                placeholder="Username or Email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full pl-12 pr-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder-white/50 focus:ring-2 focus:border-transparent focus:ring-brand-green/50 outline-none transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-brand-green text-brand-green focus:ring-brand-green bg-black/30"
              />
              <label htmlFor="remember-me" className="text-xs text-white font-medium">
                Remember me
              </label>
            </div>
            <div className="text-xs">
              <a href="#" className="font-semibold text-brand-green hover:text-brand-green/80">
                Forgot password
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-[14px] shadow-md text-sm font-bold text-dark-bg bg-brand-green hover:bg-brand-green/90 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-medium">
              {/* Text removed */}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-[14px] text-white transition-all shadow-md hover:scale-[1.02] active:scale-95"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <FcGoogle size={20} />
              </span>
              <span className="text-[13px] font-semibold tracking-wide">Or, sign-in with Google</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-300 hover:text-brand-green uppercase tracking-widest font-mono transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
