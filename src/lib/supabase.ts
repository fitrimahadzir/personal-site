import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({}, {
    get: () => {
      throw new Error('Supabase configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
    }
  }) as any;

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error logging out:', error.message);
  window.location.reload();
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      skipBrowserRedirect: true
    }
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    return;
  }

  if (data?.url) {
    const popup = window.open(data.url, 'supabase-auth', 'width=600,height=700');
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      console.error('Login popup was blocked by your browser. Please enable popups for this site and try again.');
    }
  }
};
