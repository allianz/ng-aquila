
### Local development & testing

1. **Install dependencies:**

    ```console
    npm install
    ```

2. **Build the library:**

    ```console
    npm run build:lib
    ```

3. **Link the package locally:**

    ```console
    cd dist/ng-aquila
    npm link
    npm list -g # verify link
    ```

4. **Link in your target project:**

    ```console
    npm link @allianz/ng-aquila
    ```

5. **Setup VS Code `mcp.json`:**

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

   *If you can't use `npm link`, you can point directly to `dist/index.js` instead:*

    ```json
    "servers": {
        "my-mcp-server-23": {
            "command": "node",
            "args": [
                "C:\\Users\\...\\ng-aquila\\dist\\ng-aquila\\mcp\\src\\index.js"
            ]
        }
    }
    ```

---

### Building Only the MCP

To build just the MCP server and its resources, run the following commands from the project's root directory:

1. **Generate MCP context and resources:**

   This step creates all necessary context, metadata, and example files for MCP.

    ```console
    npm run mcp:generate-context
    ```

2. **Build the MCP server:**

   This compiles the MCP TypeScript sources into the distribution folder.

    ```console
    npm run mcp:build
    ```

3. **Copy generated and static resources:**

   This copies the generated and static MCP resources into the distribution folder.

    ```console
    npm run mcp:copy-resources
    ```

**Note:**
Each step can be run independently. This is useful for development and debugging of specific MCP build stages.
To run all steps at once, use `npm run mcp:init`.

---

### Inspecting MCP

To inspect the MCP server, run:

```console
npx @modelcontextprotocol/inspector npx ng-aquila-mcp
```

---
