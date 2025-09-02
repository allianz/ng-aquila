#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { ndbxGuideToolConfig } from './tools/ndbx-guide/ndbx-guide';
import { searchNdbxComponentsToolConfig } from './tools/search-ndbx-components/search-ndbx-components';

export function registerTools(mcpServer: McpServer) {
  // Register Tool 'Search NDBX Components'
  mcpServer.registerTool(
    searchNdbxComponentsToolConfig.name,
    {
      title: searchNdbxComponentsToolConfig.title,
      description: searchNdbxComponentsToolConfig.description,
      inputSchema: searchNdbxComponentsToolConfig.inputSchema.shape,
      annotations: searchNdbxComponentsToolConfig.annotations,
    },
    searchNdbxComponentsToolConfig.cb,
  );

  // Register Tool 'NDBX Guide'
  mcpServer.registerTool(
    ndbxGuideToolConfig.name,
    {
      title: ndbxGuideToolConfig.title,
      description: ndbxGuideToolConfig.description,
      inputSchema: ndbxGuideToolConfig.inputSchema.shape,
      annotations: ndbxGuideToolConfig.annotations,
    },
    ndbxGuideToolConfig.cb,
  );
}
