#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerResources } from './register-resources';
import { registerTools } from './register-tools';

const mcpServer = new McpServer(
  {
    name: 'ng-aquila MCP Server',
    version: '1.0',
  },
  {
    capabilities: {
      logging: {},
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
  mcpServer.server.sendLoggingMessage({
    level: 'info',
    data: 'NDBX MCP Server running on stdio',
  });
}

main().catch((error) => {
  mcpServer.server.sendLoggingMessage({
    level: 'error',
    data: {
      context: 'Fatal error in main():',
      error,
    },
  });
  process.exit(1);
});
