#!/usr/bin/env node

import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Resource } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';

export const ALL_COMPONENT_RESOURCES: Resource[] = fs
  .readdirSync(path.resolve(__dirname, '../generated/components'))
  .filter((f) => f !== 'README.md')
  .map((f) => {
    const componentName = f.replace('.md', '');
    return {
      uri: `component://${componentName}`,
      name: componentName,
      mimeType: 'text/markdown',
      description: `${componentName} NDBX Component documentation`,
    };
  });

export function registerResources(mcpServer: McpServer) {
  // Register static resource
  mcpServer.registerResource(
    'NDBX General Best Practices',
    'file:///static/best-practices.md',
    {
      mimeType: 'text/markdown',
      description:
        'A collection of best practices for using NDBX components effectively in Angular applications.',
    },
    async (uri, extra) => {
      const bestPracticesContent = await fs.readFileSync(
        path.resolve(__dirname, '../static/best-practices.md'),
        'utf-8',
      );
      return {
        contents: [{ uri: uri.toString(), mimeType: 'text/markdown', text: bestPracticesContent }],
      };
    },
  );

  // Register resource template for component documentation
  const componentResourceTemplate = new ResourceTemplate('component://{componentName}', {
    list: async (extra) => ({
      resources: ALL_COMPONENT_RESOURCES,
    }),
  });
  mcpServer.registerResource(
    'NDBX Component Documentation',
    componentResourceTemplate,
    {
      mimeType: 'text/markdown',
      description: 'Template for NDBX component documentation files.',
    },
    async (uri, variables, extra) => {
      const componentName = variables.componentName;
      const componentDocuContent = fs.readFileSync(
        path.resolve(__dirname, `../generated/components/${componentName}.md`),
        'utf-8',
      );
      return {
        contents: [{ uri: uri.toString(), mimeType: 'text/markdown', text: componentDocuContent }],
      };
    },
  );
}
