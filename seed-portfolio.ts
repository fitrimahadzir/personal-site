import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const portfolioProject = {
  title: "Creative Design Portfolio",
  description: "A professional showcase of my creative expertise, featuring branding identities, digital illustrations, and high-fidelity UI/UX prototypes. This collection highlights my ability to merge aesthetics with functionality using industry-standard tools.",
  image: "/images/cover-portfolio.png",
  link: "https://redirect.fitrimahadzir.my/portfolio",
  tags: ["Illustrator", "Photoshop", "Figma", "Branding", "UI/UX"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

async function seed() {
  console.log("Seeding Behance Portfolio project...");
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([portfolioProject]);
    
    if (error) {
      console.error("Error adding project:", error.message);
    } else {
      console.log("Successfully added Creative Design Portfolio to database!");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
  process.exit(0);
}

seed();
