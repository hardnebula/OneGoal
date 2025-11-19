// Script to update all components to use dark theme colors
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/onboarding.tsx',
  'app/(tabs)/stats.tsx',
  'app/(tabs)/reminders.tsx',
  'app/(tabs)/settings.tsx',
  'app/goal-picker.tsx',
  'app/index.tsx',
];

const colorMappings = {
  "'#F7F7F7'": "Colors.dark.background",
  "'#FFF'": "Colors.dark.card",
  "'#FFFFFF'": "Colors.dark.card",
  "'#000'": "Colors.dark.text",
  "'#666'": "Colors.dark.icon",
  "'#E5E5E5'": "Colors.dark.card + '40'",
  "'#999'": "Colors.dark.icon + '80'",
};

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Colors import if not present
    if (!content.includes("import { Colors }")) {
      const lastImport = content.lastIndexOf('import');
      const importLine = content.indexOf('\n', lastImport);
      content = content.slice(0, importLine + 1) + 
                "import { Colors } from '@/constants/theme';\n" + 
                content.slice(importLine + 1);
    }
    
    // Replace colors
    Object.entries(colorMappings).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, newColor);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Dark theme update complete!');


