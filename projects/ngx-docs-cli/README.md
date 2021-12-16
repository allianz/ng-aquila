The ngx-docs-cli package provides tooling to create the documentation for your your libraries written in typescript via markdown files and provides special handling for Angular examples. The cli tool generates all necessary files to be consumed by the [lib-viewer] module. Have a look at the [lib-viewer] README on how to integrate the generated documentation into an angular application.

## Installation

`npm install @aposin/ngx-docs-cli`

## Run doc generation

The cli tool needs to know the path to the root level of your source code and your documentation examples `npx ndx-docs ./path/to/src`

### Options

#### `-s, --source-files [path]`

Location of your library source files. Every subfolder with a markdown filed named after the folder name is treated as a component for the overview page. Also the API generation is created from this path using Dgeni.

#### `-d, --documentation [path]`

Folder with guides and examples. By default `./documentation`.

#### `-e, --examples [path]`

Path to the examples folder. By default `./documentation/examples`.

#### `-g, --guides [path]`

Path to the guides folder. By default `./documentation/guides`.

#### `-w, --watch`

Watchmode to rerun docs generation on file changes.

#### `-o, --output [path]`

Where all generated files should be saved. By default `./generated` in your documentation folder.

#### `-m, --with-module [path]`

Where to store the example module. By default the `--output` path is used.

## Getting Started

### Create markdown files for components/modules

For every subfolder in your `src` folder you want to have a documentation for create a markdown file with the same name as the folder

```
|- source
|  |- button
|  |  |- button.md
```

### Frontmatter

You can manipulate the metadata through frontmatter in the markdown files. You can alter the title of the component shown in the generated files and the category to group components together by adding two lines of `---` and key value pairs inbetween.

Example:

```
---
title: Formfield
category: Forms
---

```

### Create examples

You can create angular example components which get loaded dynamically by the [lib-viewer] module. Every example consists of a typescript, html and css file (sass is not yet supported). Every example should be created in its own subfolder in your examples folder.

Example tree structure:

```
|- documentation
|  |- examples
|  |  |- primary-button
|  |  |  |- primary-button-example.ts
|  |  |  |- primary-button-example.html
|  |  |  |- primary-button-example.css
```

You can load the examples in your markdown files with this line: `<!-- example(primary-button) -->` `primary-button` is the name of the subfolder in your examples folder.

The example will get loaded and interpreted by angular during runtime and additionally you can view the code of all three files and copy and paste it.

### Guides

Guides are additional markdown files for pages which are not related to the components specifically, for example it could be an installation page.
