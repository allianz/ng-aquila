#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const vscodeDir = path.join(process.cwd(), '.vscode');
const mcpJsonPath = path.join(vscodeDir, 'mcp.json');

const ngAquilaMcpServerConfig = {
  command: 'npx',
  args: ['ng-aquila-mcp'],
};

function ensureDirExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  ensureDirExists(vscodeDir);

  let mcpConfig: any = {};
  if (fs.existsSync(mcpJsonPath)) {
    mcpConfig = JSON.parse(fs.readFileSync(mcpJsonPath, 'utf-8'));
  }

  mcpConfig.servers = mcpConfig.servers || {};

  if (mcpConfig.servers['ng-aquila-mcp-server']) {
    console.log('MCP server already registered in .vscode/mcp.json.');
    return;
  }

  mcpConfig.servers['ng-aquila-mcp-server'] = ngAquilaMcpServerConfig;
  fs.writeFileSync(mcpJsonPath, JSON.stringify(mcpConfig, null, 2));
  console.log('MCP server configuration added to .vscode/mcp.json.');
}

main();
