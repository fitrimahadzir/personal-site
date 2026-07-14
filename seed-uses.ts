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

const toolsData = [
  { name: "PC", category: "Hardware", description: "High-performance workstation used for design and development tasks.", image: "" },
  { name: "Mechanical Keyboard", category: "Hardware", description: "Provides better typing experience and productivity.", image: "" },
  { name: "Dual Monitor Setup", category: "Hardware", description: "Enhances multitasking and workflow efficiency.", image: "" },
  { name: "Adobe Photoshop", category: "Software", description: "Used for high-quality image editing and visual design.", image: "" },
  { name: "Adobe Illustrator", category: "Software", description: "Used for vector graphics and branding design.", image: "" },
  { name: "Visual Studio Code", category: "Software", description: "Primary code editor for frontend and full-stack development.", image: "" },
  { name: "Figma", category: "Software", description: "Used for UI/UX design, prototyping, and collaboration.", image: "" },
  { name: "Smartphone", category: "Accessories", description: "Used for testing responsive design and mobile applications.", image: "" },
  { name: "Flymodem U100", category: "Accessories", description: "Provides portable internet access for remote work.", image: "" },
  { name: "Tablet", category: "Accessories", description: "Supports sketching, design, and content consumption.", image: "" },
  { name: "cPanel", category: "Deploy", description: "Used for managing web hosting and server configurations.", image: "" },
  { name: "Netlify", category: "Deploy", description: "Used for deploying static websites with CI/CD integration.", image: "" },
  { name: "Vercel", category: "Deploy", description: "Used for deploying modern frontend frameworks like Next.js.", image: "" },
  { name: "React", category: "Development", description: "JavaScript library for building interactive user interfaces.", image: "" },
  { name: "Next.js", category: "Development", description: "Framework for building scalable and performant web applications.", image: "" },
  { name: "Tailwind CSS", category: "Development", description: "Utility-first CSS framework for rapid UI development.", image: "" },
  { name: "Firebase", category: "Development", description: "Backend-as-a-service for authentication, database, and hosting.", image: "" }
];

async function seed() {
  try {
    const { data: existingDocs, error: fetchError } = await supabase
      .from('uses')
      .select('name');
    
    if (fetchError) throw fetchError;
    
    const existingNames = new Set(existingDocs?.map(doc => doc.name) || []);

    for (const tool of toolsData) {
      if (!existingNames.has(tool.name)) {
        const { error: insertError } = await supabase
          .from('uses')
          .insert([{
            ...tool,
            createdAt: new Date().toISOString()
          }]);
        
        if (insertError) {
          console.error(`Error adding ${tool.name}:`, insertError.message);
        } else {
          console.log(`Added: ${tool.name}`);
        }
      } else {
        console.log(`Skipped (already exists): ${tool.name}`);
      }
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
  process.exit(0);
}

seed();
