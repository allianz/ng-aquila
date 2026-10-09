#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';

import { registerResources } from './register-resources.js';
import { registerTools } from './register-tools.js';

const mcpServer = new McpServer(
  {
    name: 'ng-aquila MCP Server',
    version: '1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
);

registerTools(mcpServer);
registerResources(mcpServer);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('NDBX MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
