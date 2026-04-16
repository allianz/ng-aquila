---
title: Develop with AI
---

# Develop with AI

Aquila provides two complementary ways to give AI assistants context about the library: a **Skill** and an **MCP server**. Use whichever fits your tooling.

---

## Skill

A Skill is a lightweight Markdown file that teaches an AI assistant how to use Aquila components. It works with Claude code (and other tools that support skills) without requiring a running server.

### Skill setup
You can set up the skill in two ways: automatic setup using the command line, or manual setup by copying the skill file into your project.

#### Automatic setup
Run the following command in your project root:

`npx skills add allianz/ng-aquila --skill aquila`

This command downloads the Aquila skill from the `allianz/ng-aquila` GitHub repository and places it into your project's skills directory (e.g. `.agents/skills/aquila/SKILL.md` for Copilot or `.claude/skills/aquila/SKILL.md` for Claude code). If the skills directory does not exist yet, it will be created.

See more options of the `skills` package here: [https://github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)

#### Manual setup
Copy the skill folder from `https://github.com/allianz/ng-aquila/tree/main/skills/aquila`

Then paste it into your project's skills directory (depend on your AI assistant).

For Example:

```bash
.agents/skills/aquila/SKILL.md // Copilot, Antigravity, Codex
.claude/skills/aquila/SKILL.md // Claude code
```

---

## MCP

### Why MCP?
We use the Model Context Protocol (MCP) to provide context that makes it possible for Large Language Models (LLMs) to fully understand and correctly use our library components. Without MCP, LLMs often lack the necessary context and generate incomplete or incorrect code. With MCP in place, the LLM knows our components — enabling accurate and helpful code completions.

### How are we shipping it?
We are now (starting from version 20.3.0) shipping a local MCP server alongside our library. It runs within the IDE (e.g. Visual Studio Code) and uses GitHub Copilot as the MCP client to interact with the MCP server. This setup provides the LLM with the context it needs to work effectively with our components.

### MCP versions
Each library version comes with its own MCP definition, ensuring the context always matches the version of the library you’re using — just like we do for our documentation.

### Developer preview
This is a developer preview, and we’d love your feedback. It will help us improve the experience and make MCP even more valuable for your development workflow.

### MCP Installation

#### Visual Studio Code: Automatic setup

Run the following command in your terminal:

   ```bash
   npx --no-install ng-aquila-add-mcp-server
   ```

This automatically creates or updates the `.vscode/mcp.json` file in your project root, adding the necessary MCP server configuration.

**Note:**
The `--no-install` flag ensures that `npx` only runs the locally installed `ng-aquila-add-mcp-server script from your project's dependencies, rather than downloading it from the npm registry.

#### Visual Studio Code: Manual setup

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

#### Claude code setup

Run the following command in your terminal:

`claude mcp add ng-aquila-mcp-server -- npx ng-aquila-mcp --scope project`
