const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceBase = 'projects/ng-aquila/mcp';
const destBase = 'dist/ng-aquila/mcp';
const sourceBaseGenerated = `${sourceBase}/generated`;
const destBaseGenerated = `${destBase}/generated`;
const sourceBaseStatic = `${sourceBase}/static`;
const destBaseStatic = `${destBase}/static`;

console.log('🧪 Copying resources ...');

// Clean up the destination directories if they exist
if (fs.existsSync(destBaseGenerated)) {
  fs.rmSync(destBaseGenerated, { recursive: true, force: true });
}
if (fs.existsSync(destBaseStatic)) {
  fs.rmSync(destBaseStatic, { recursive: true, force: true });
}

// Ensure the destination directories exist
fs.mkdirSync(destBaseGenerated, { recursive: true });
fs.mkdirSync(destBaseStatic, { recursive: true });

// Copy generated files and static resources
const itemsToCopy = [
  {
    source: path.join(sourceBaseGenerated, 'components'),
    destination: path.join(destBaseGenerated, 'components'),
  },
  {
    source: path.join(sourceBaseGenerated, 'sections.json'),
    destination: path.join(destBaseGenerated, 'sections.json'),
  },
  {
    source: path.join(sourceBaseGenerated, 'skill.md'),
    destination: path.join(destBaseGenerated, 'skill.md'),
  },
  { source: sourceBaseStatic, destination: destBase },
];

itemsToCopy.forEach(({ source, destination }) => {
  execSync(`cp -R ${source} ${destination}`);
});

console.log('✅ Resources copied successfully.');
