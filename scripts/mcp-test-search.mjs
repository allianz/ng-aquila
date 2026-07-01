/**
 * CLI test runner for the search-ndbx-components MCP tool.
 *
 * Usage:
 *   npm run mcp:test-search -- <componentName> [usage]
 *
 * Examples:
 *   requires to run `npm run mcp:build` first and then run the following commands:
 *   npm run mcp:test-search -- button
 *   npm run mcp:test-search -- 'date field' 'reactive forms'
 */
import { searchNdbxComponentsToolConfig } from '../dist/ng-aquila/mcp/src/tools/search-ndbx-components/search-ndbx-components.js';

const [, , componentName, usage] = process.argv;

if (!componentName) {
  console.error('Usage: npm run mcp:test-search -- <componentName> [usage]');
  console.error('Example: npm run mcp:test-search -- button');
  console.error('Example: npm run mcp:test-search -- datefield parsing');
  process.exit(1);
}

const result = await searchNdbxComponentsToolConfig.cb({ componentName, usage });
for (const item of result.content) {
  console.log(item.text);
}
