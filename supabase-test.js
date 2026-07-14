import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://affatpxfndjdsgktjybb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZmF0cHhmbmRqZHNna3RqeWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzI3MjYsImV4cCI6MjA5MTkwODcyNn0.9TY0Cq-zpDj-jXx-qCiXLQYHaeJeVt_rpkgD2n-Np-o');
supabase.from('projects').select('*').limit(1).then(res => console.log('DATA:', res.data, 'ERROR:', res.error)).catch(e => console.error(e));
