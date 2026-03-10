#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const skillSourcePath = path.resolve(__dirname, '../generated/skill.md');
const skillTargetPath = path.join(process.cwd(), '.aquila.instructions.md');

function main() {
  if (!fs.existsSync(skillSourcePath)) {
    console.error('Skill file not found at', skillSourcePath);
    process.exit(1);
  }

  if (fs.existsSync(skillTargetPath)) {
    console.log('.aquila.instructions.md already exists — overwriting with latest version.');
  }

  const content = fs.readFileSync(skillSourcePath, 'utf-8');
  fs.writeFileSync(skillTargetPath, content, 'utf-8');
  console.log('Aquila skill written to .aquila.instructions.md');
}

main();
