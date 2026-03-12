#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const skillSourcePath = path.resolve(__dirname, '../static/SKILL.md');
const skillTargetPath = path.join(process.cwd(), 'SKILL.md');
function getMajorVersion(): string {
  // Published package: __dirname is <pkg-root>/mcp/src/, package.json is at <pkg-root>/
  // Source layout: the real version is in <project>/src/package.json
  const candidates = [
    path.resolve(__dirname, '../../package.json'),
    path.resolve(__dirname, '../../src/package.json'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const pkg = JSON.parse(fs.readFileSync(candidate, 'utf-8'));
      if (pkg.name === '@allianz/ng-aquila') {
        return pkg.version.split('.')[0];
      }
    }
  }
  console.error('Could not find @allianz/ng-aquila package.json');
  process.exit(1);
}

function main() {
  if (!fs.existsSync(skillSourcePath)) {
    console.error('Skill file not found at', skillSourcePath);
    process.exit(1);
  }

  if (fs.existsSync(skillTargetPath)) {
    console.log('SKILL.md already exists — overwriting with latest version.');
  }

  const majorVersion = getMajorVersion();
  const versionComment = `<!-- Aquila Skill \u2013 based on v${majorVersion} -->\n`;
  const content = fs.readFileSync(skillSourcePath, 'utf-8');
  fs.writeFileSync(skillTargetPath, versionComment + content, 'utf-8');
  console.log('Aquila skill written to SKILL.md');
  console.log('');
  console.log('Next, move SKILL.md to the correct location for your AI tool:');
  console.log('  Claude Code:     .claude/skills/aquila/SKILL.md');
  console.log('  GitHub Copilot:  .github/instructions/aquila.instructions.md (rename required)');
  console.log('  Cursor:          .cursor/rules/aquila.mdc (rename required)');
}

main();
