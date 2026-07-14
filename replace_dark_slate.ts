import fs from "fs";
import path from "path";

const dir = "src/components";
const files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.endsWith(".tsx")) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // Backgrounds replacing slate to white transparents
    content = content.replace(/dark:bg-slate-950/g, "dark:bg-white/[0.03]");
    content = content.replace(/dark:bg-slate-900/g, "dark:bg-white/[0.03]");
    content = content.replace(/dark:bg-slate-800\/50/g, "dark:bg-white/[0.02]");
    content = content.replace(/dark:bg-slate-800/g, "dark:bg-white/[0.05]");
    content = content.replace(/dark:bg-slate-700/g, "dark:bg-white/10");
    
    // Hover backgrounds
    content = content.replace(/dark:hover:bg-slate-800/g, "dark:hover:bg-white/[0.05]");
    content = content.replace(/dark:hover:bg-slate-700/g, "dark:hover:bg-white/10");

    // Borders
    content = content.replace(/dark:border-slate-800\/50/g, "dark:border-white/[0.05]");
    content = content.replace(/dark:border-slate-800/g, "dark:border-white/10");
    content = content.replace(/dark:border-slate-700/g, "dark:border-white/10");

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
