#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/server';

import { ndbxGuideToolConfig } from './tools/ndbx-guide/ndbx-guide.js';
import { searchNdbxComponentsToolConfig } from './tools/search-ndbx-components/search-ndbx-components.js';

export function registerTools(mcpServer: McpServer) {
  // Register Tool 'Search NDBX Components'
  mcpServer.registerTool(
    searchNdbxComponentsToolConfig.name,
    {
      title: searchNdbxComponentsToolConfig.title,
      description: searchNdbxComponentsToolConfig.description,
      inputSchema: searchNdbxComponentsToolConfig.inputSchema,
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
      inputSchema: ndbxGuideToolConfig.inputSchema,
      annotations: ndbxGuideToolConfig.annotations,
    },
    ndbxGuideToolConfig.cb,
  );
}
