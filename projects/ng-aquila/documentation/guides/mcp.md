---
title: MCP
---

# MCP

### Why MCP?
We use the Model Context Protocol (MCP) to provide context that makes it possible for Large Language Models (LLMs) to fully understand and correctly use our library components. Without MCP, LLMs often lack the necessary context and generate incomplete or incorrect code. With MCP in place, the LLM knows our components — enabling accurate and helpful code completions.

### How are we shipping it?
We are now (starting from version 20.2.0) shipping a local MCP server alongside our library. It runs within the IDE (e.g. Visual Studio Code) and uses GitHub Copilot as the MCP client to interact with the MCP server. This setup provides the LLM with the context it needs to work effectively with our components.

### MCP versions
Each library version comes with its own MCP definition, ensuring the context always matches the version of the library you’re using — just like we do for our documentation.

### Developer preview
This is a developer preview, and we’d love your feedback. It will help us improve the experience and make MCP even more valuable for your development workflow.

## MCP Installation

### Automatic setup with VS Code

Run the following command in your terminal:

   ```bash
   npx --no-install ng-aquila-add-mcp-server
   ```

This automatically creates or updates the `.vscode/mcp.json` file in your project root, adding the necessary MCP server configuration.

**Note:**
The `--no-install` flag ensures that `npx` only runs the locally installed `ng-aquila-add-mcp-server script from your project's dependencies, rather than downloading it from the npm registry.

### Manual setup

You can also configure MCP manually in VS Code.

1. **Edit `mcp.json` in `./vscode/` and add:**

    ```json
    "servers": {
        "ng-aquila-mcp-server": {
            "command": "npx",
            "args": [
                "ng-aquila-mcp"
            ]
        }
    }
    ```
