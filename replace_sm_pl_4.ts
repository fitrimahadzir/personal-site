import fs from "fs";
import path from "path";

const dir = "src/components";
const files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.endsWith(".tsx")) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // Specifically removing "sm:pl-4" from title containers and general layout.
    // e.g. "mb-6 sm:pl-4" -> "mb-6"
    // e.g. "sm:pl-4 space-y-2" -> "space-y-2"
    // e.g. "space-y-2 sm:pl-4" -> "space-y-2"
    
    // We will do a generic replacement taking spaces into account
    content = content.replace(/className="sm:pl-4"/g, 'className=""');
    content = content.replace(/className="sm:pl-4 /g, 'className="');
    content = content.replace(/ sm:pl-4"/g, '"');
    content = content.replace(/ sm:pl-4 /g, ' ');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
