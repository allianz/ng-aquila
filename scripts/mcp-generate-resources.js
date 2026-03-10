const fs = require('fs');
const { execSync } = require('child_process');

const sourceBase = 'projects/ng-aquila/mcp';
const sourceBaseGenerated = `${sourceBase}/generated`;

// Clean up the previously generated resources
if (fs.existsSync(sourceBaseGenerated)) {
  console.log('🧹 Removing outdated generated resources ...');
  fs.rmSync(sourceBaseGenerated, { recursive: true, force: true });
}

// Copy generated files and static resources
const generatorsScript = [
  '/scripts/generate-angular-metadata.ts',
  '/scripts/generate-examples.ts',
  '/scripts/generate-sections.ts',
  '/scripts/generate-components.ts',
  '/scripts/generate-skill.ts',
];

generatorsScript.forEach((script) => {
  execSync(`ts-node ${sourceBase}${script}`, { stdio: 'inherit' });
});
