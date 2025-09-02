import { existsSync, mkdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { ClassDeclaration, Decorator, JSDoc, Project, SyntaxKind } from 'ts-morph';

import { writeContentsToFile } from './utils';

/***
 * Type definitions
 */

interface BaseProp {
  name: string;
  type: string;
  value?: string;
  description?: string;
}

interface AngularProp extends BaseProp {
  modifier: string[];
  alias?: string;
  decorator?: string;
  required?: boolean;
}

interface AngularInjector extends BaseProp {
  require: boolean;
  modifier: string[];
}

interface AngularMethod {
  name: string;
  params: {
    name: string;
    type: string;
  }[];
  returnType: string;
  description: string;
  modifier: string[];
}

export interface AngularComponentOrDirective {
  component?: string;
  directive?: string;
  selector: string;
  imports: string[];
  providers: string[];
  injector: AngularInjector[];
  props: AngularProp[];
  methods: AngularMethod[];
  description: string;
  importPath?: string;
}

export interface AngularModule {
  module: string;
  imports: string[];
  exports: string[];
  importPath?: string;
}

export interface AngularMetadataResult {
  components: AngularComponentOrDirective[];
  directives: AngularComponentOrDirective[];
  modules: AngularModule[];
}

/***
 * File scoped variables
 */

// Regular expression patterns used to identify specific code structures
const regexPatterns = {
  // match import pattern (e.g 'import(...)')
  import: /import\(.+?\)/,
  // match object pattern (e.g '{...}')
  object: /\{.*\}/,
  // match typescript generics operator (e.g '<')
  generics: /<|>/,
  // match braces (e.g '[')
  braces: /[()[\]]/,
  // match quotes (e.g ")
  quotes: /["']/,
  // match comma (e.g ',')
  comma: /,/,
  // match arrow function (e.g '=>')
  arrowFunction: /=>/,
  // match union (e.g '|')
  union: /\|/,
  // match spaces (e.g ' ')
  space: /\s+/,
  // match every word character and specific symbols + - : (e.g 'value:')
  anyCharacter: /[\w+\-:]+/,
};

// ts-morph project reference
const project = getProject();

// containers for angular metadata
const components: any[] = [];
const directives: any[] = [];
const modules: any[] = [];

/***
 * Gets the `ng-aquila` project as a ts-morph instance.
 * @returns `ng-aquila` project ts-morph instance
 */
function getProject() {
  const sourcePath = resolve(__dirname, '../..');
  const tsPath = resolve(__dirname, '../tsconfig.json');
  const project = new Project({ tsConfigFilePath: tsPath });
  project.addSourceFilesAtPaths(`${sourcePath}/**/*.ts`);
  return project;
}

/**
 * Gets the name of a decorator.
 * @param decorator Decorator node
 * @returns Name of the decorator
 */
function getDecoratorName(decorator: Decorator) {
  return decorator.getName();
}

/**
 * Gets the first argument of a decorator as a string.
 * @param decorator Decorator node
 * @returns First argument if it exists, or an empty string otherwise
 */
function getDecoratorFirstArgument(decorator: Decorator) {
  const arg = decorator.getArguments()[0];
  return arg?.getText().replace(/["'`]/g, '') || '';
}

/**
 * Gets the type value for a given type string.
 * @param type Type string
 * @returns Resolved type value as a string
 */
function getTypeValue(type: string): string {
  const reducedTypes = reduceType(type);

  let importPath = '';
  const resolvedTypes: string[] = [];
  for (const [index, reducedType] of reducedTypes.entries()) {
    // Do not resolve syntax that does not represent a type
    const regex = new RegExp(
      Object.values([regexPatterns.import, regexPatterns.anyCharacter])
        .map((r) => r.source)
        .join('|'),
    );
    if (!reducedType.match(regex)) {
      resolvedTypes.push(reducedType);
      continue;
    }
    // If the import is a pattern, store it
    const importMatch = reducedType.match(/import\(["'](.+?)["']\)/);
    if (importMatch) {
      importPath = importMatch[1];
      continue;
    }

    // Resolve the type (potentially with an import path)
    let resolvedType = resolveType(reducedType, importPath);

    // If the type is a union and is followed by an array,
    // wrap it in round braces
    const nextValidCharacter =
      reducedTypes?.[index + 1] === ' ' ? reducedTypes?.[index + 2] : reducedTypes?.[index + 1];
    if (resolvedType.includes('|') && nextValidCharacter === '[') {
      resolvedType = `(${resolvedType})`;
    }
    // If the type is a function type and is followed (or preceed) by a union or simply followed by an array,
    // wrap it in round braces
    const previousValidCharacter =
      reducedTypes?.[index - 1] === ' ' ? reducedTypes?.[index - 2] : reducedTypes?.[index - 1];
    if (
      resolvedType.includes('=>') &&
      (nextValidCharacter === '|' || previousValidCharacter === '|' || nextValidCharacter === '[')
    ) {
      resolvedType = `(${resolvedType})`;
    }

    resolvedTypes.push(resolvedType);
  }

  const output = resolvedTypes.join('');

  return output;
}

/***
 * Reduces a type string into an array of its components. Each component has a different semantic meaning
 * e.g. "import('path/to/module').Type | AnotherType" becomes: ["import('path/to/module')", "Type", "|", "AnotherType"]
 * @param type Type string to reduce
 * @returns Array of reduced type components
 */
function reduceType(type: string): string[] {
  const regex = new RegExp(
    Object.values(regexPatterns)
      .map((r) => r.source)
      .join('|'),
    'g',
  );

  return type.match(regex) || [];
}

/**
 * Resolves a type import to its value.
 * @param importPath Path to the import file (without .ts extension)
 * @param typeName Name of the type to resolve
 * @returns Resolved type value as a string
 */
function resolveImport(importPath: string, typeName: string): string {
  try {
    const absolutePath = resolve(importPath);
    const fileContent = readFileSync(absolutePath + '.ts', 'utf8');
    if (fileContent) {
      const typeDefMatch = fileContent.match(
        new RegExp(`type\\s+${typeName}\\s*=\\s*([\\s\\S]+?);($|\\s//)`, 'm'),
      );
      const enumDefMatch = fileContent.match(new RegExp(`enum\\s+${typeName}\\s*{([^}]+)}`));

      // If a type definition is found, return its value
      if (typeDefMatch) {
        return typeDefMatch[1].replace(/\n/g, '').trim();
      }

      // If a enum definition is found, return its members
      if (enumDefMatch) {
        return enumDefMatch[1]
          .split(',')
          .map((e: string) => e.split('=')[0].trim())
          .filter(Boolean)
          .join(' | ');
      }
    }
    // If no definition was found, use the original type name
    return typeName;
  } catch (error) {
    // If unable to read the import file, return the original type name
    return typeName;
  }
}

/**
 * Resolve a type to its value
 * @param typeString Type definition as a string
 * @param importPath Optional import path to resolve the type from
 * @returns Resolved type value as a string
 */
function resolveType(typeString: string, importPath?: string): string {
  // Resolve import type
  if (importPath) {
    return resolveImport(importPath, typeString);
  }

  // Resolve types without import
  for (const sourceFile of project.getSourceFiles()) {
    // If the type string refers to an enum
    const enumDeclaration = sourceFile.getEnum(typeString);
    if (enumDeclaration) {
      const members = enumDeclaration.getMembers().map((m: any) => m.getName());
      if (members.length) {
        // Return the resolved enum
        return members.join(' | ');
      }
    }

    // If the type string refers to a standard type
    const typeAlias = sourceFile.getTypeAlias(typeString);
    if (typeAlias) {
      const typeDeclaration = typeAlias.getTypeNode()?.getText();
      if (typeDeclaration) {
        // Return the resolved type
        return typeDeclaration.replace(/\n/g, '').trim();
      }
    }
  }

  // If the type could not be resolved, we simply return the received type
  return typeString;
}

/**
 * Extracts all Input and Output properties and their metadata from a class.
 * @param classDeclaration Class declaration node
 * @returns Array of AngularProp objects
 */
function extractProps(classDeclaration: ClassDeclaration) {
  const props = [];
  // Regular properties
  for (const property of classDeclaration.getProperties()) {
    const name = property.getName();
    const type = getTypeValue(property.getType().getText());
    const initializer = property.getInitializer()?.getText();
    const modifiers = property.getModifiers().map((m) => m.getText());
    const decorators = property.getDecorators().map((d) => '@' + getDecoratorName(d));
    const aliasDecorator = property.getDecorator('Input');
    const inputArg = aliasDecorator ? getDecoratorFirstArgument(aliasDecorator) : '';
    const alias = inputArg?.includes('{') ? '' : inputArg;
    // Extract JSDoc for property
    let description = '';
    const jsDocs = property.getJsDocs();
    // Get JSDoc comments and tags for the property, ignoring @private tags
    if (jsDocs && jsDocs.length > 0) {
      description = jsDocs
        .map((doc: JSDoc) => {
          const tags = doc
            .getTags()
            .filter((t) => !t.getTagName()?.includes('private'))
            .map((tag) => tag.getText().trim())
            .join('\n')
            .trim();
          const content = doc.getComment() || '';
          return content + tags;
        })
        .join('\n')
        .trim();
    }
    const isRequired = description.includes('require');
    const res: AngularProp = {
      name,
      modifier: [...modifiers, ...decorators],
      type,
      ...(alias && { alias }),
      ...(description && { description }),
      ...(decorators.length && { decorator: decorators.join(', ') }),
      ...(initializer && { value: initializer }),
    };
    if (isRequired) {
      res.required = true;
    }
    props.push(res);
  }
  // Also extract decorated setters (e.g. @Input set ...)
  extractSetDecorator(classDeclaration, props);

  return props;
}

/***
 * Extracts angular properties from a class.
 * @param classDeclaration Class declaration node
 * @param angularProperties Array to collect angular properties
 */
function extractSetDecorator(classDeclaration: ClassDeclaration, angularProperties: AngularProp[]) {
  for (const acc of classDeclaration.getSetAccessors()) {
    const name = acc.getName();
    const decorators = acc.getDecorators().map((d) => '@' + getDecoratorName(d));
    if (decorators.length === 0) {
      continue;
    }
    const params = acc.getParameters();
    // Use the declared type node text for more accurate type extraction (preserves unions, enums, etc)
    let type = '';
    if (params.length > 0) {
      const typeNode = params[0].getTypeNode();
      type = getTypeValue(typeNode ? typeNode.getText() : params[0].getType().getText());
    }
    const aliasDecorator = acc.getDecorator('Input');
    const inputArg = aliasDecorator ? getDecoratorFirstArgument(aliasDecorator) : '';
    const alias = inputArg?.includes('{') ? '' : inputArg;
    let description = '';
    const jsDocs = acc.getJsDocs();
    if (jsDocs && jsDocs.length > 0) {
      description = jsDocs
        .map((doc) => doc.getComment() || '')
        .join('\n')
        .trim();
    }
    angularProperties.push({
      name,
      modifier: [...acc.getModifiers().map((m) => m.getText()), ...decorators],
      type,
      ...(alias && { alias }),
      ...(description && { description }),
      ...(decorators.length && { decorator: decorators.join(', ') }),
    });
  }
}

/**
 * Extracts injector parameters (constructor parameters) and their metadata from a class.
 * @param classDeclaration Class declaration node
 * @returns Array of injector metadata
 */
function extractInjectors(classDeclaration: ClassDeclaration) {
  return (
    classDeclaration
      .getConstructors()[0]
      ?.getParameters()
      .map((param: any) => {
        const type = getTypeValue(param.getType().getText());
        let description = '';
        const jsDocs = param.getJsDocs?.() || [];
        if (jsDocs.length > 0) {
          description = jsDocs
            .map((doc: any) => doc.getComment() || '')
            .join('\n')
            .trim();
        }
        return {
          name: param.getName(),
          require: !param.isOptional(),
          type,
          modifier: param.getModifiers().map((m: any) => m.getText()),
          ...(description && { description }),
          ...(param.getInitializer()?.getText() && { value: [param?.getInitializer()?.getText()] }),
        };
      }) || []
  );
}

/**
 * Checks if a method name corresponds to an Angular lifecycle hook.
 * @param name Method name
 * @returns True if the method is a lifecycle hook, false otherwise
 */
function isAngularLifecycleHook(name: string): boolean {
  const hooks = [
    'ngOnInit',
    'ngOnDestroy',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngDoCheck',
    'ngOnChanges',
    'ngOnInit',
    'ngOnDestroy',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngDoCheck',
  ];
  return hooks.includes(name);
}

/**
 * Extracts method metadata from a class, excluding Angular lifecycle hooks.
 * @param classDec Class declaration node
 * @returns Array of AngularMethod objects
 */
function extractMethods(classDec: ClassDeclaration) {
  return classDec
    .getMethods()
    .filter((m) => !isAngularLifecycleHook(m.getName()))
    .map((m) => {
      const name = m.getName();
      const params = m.getParameters().map((p) => ({
        name: p.getName(),
        type: getTypeValue(p.getType().getText()),
      }));
      // Extract JSDoc description if present
      let description = '';
      const jsDocs = m.getJsDocs();
      if (jsDocs && jsDocs.length > 0) {
        description = jsDocs
          .map((doc) => doc.getComment() || '')
          .join('\n')
          .trim();
      }
      const modifier = m.getModifiers().map((mod) => mod.getText());
      return {
        name,
        params,
        returnType: getTypeValue(m.getReturnType().getText()),
        ...(description && { description }),
        modifier,
      };
    });
}

/**
 * Extracts an array property from a module decorator's object literal, resolving spread elements.
 * @param objExpr Object literal expression node
 * @param key Property key to extract
 * @returns Array of string values for the property
 */
function extractArray(objExpr: any, key: string): string[] {
  if (!objExpr) {
    return [];
  }
  const prop = objExpr.getProperty(key);
  if (!prop || !prop.getInitializer) {
    return [];
  }
  const init = prop.getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ArrayLiteralExpression) {
    return [];
  }
  const arr = init.getElements();
  const result: string[] = [];
  for (const el of arr) {
    if (el.getKind() === SyntaxKind.SpreadElement) {
      // Resolve spread identifier
      const expr = el.getExpression();
      const name = expr.getText();
      // Try to find variable declaration in the same file
      const varDec = objExpr.getSourceFile().getVariableDeclaration(name);
      if (varDec) {
        const varInit = varDec.getInitializer();
        if (varInit && varInit.getKind() === SyntaxKind.ArrayLiteralExpression) {
          result.push(
            ...varInit
              .getElements()
              .map((e: any) => e.getText().replace(/["'`]/g, '').trim())
              .filter(Boolean),
          );
        }
      } else {
        // Fallback: just add the identifier name
        result.push(name);
      }
    } else {
      result.push(el.getText().replace(/["'`]/g, '').trim());
    }
  }
  return result.filter(Boolean);
}

/***
 * Extracts metadata from an Angular component or directive.
 * @param type - The type of the Angular entity (component or directive).
 * @param decorator - The decorator node for the entity.
 * @param classDeclaration - The class declaration node for the entity.
 * @returns An object containing the extracted metadata.
 */
function extractMetadata(
  type: 'component' | 'directive',
  decorator: Decorator,
  classDeclaration: ClassDeclaration,
) {
  const args = decorator?.getArguments() || [];
  let argsObj: any = {};
  if (
    args.length > 0 &&
    args[0].getKind &&
    args[0].getKind() === SyntaxKind.ObjectLiteralExpression
  ) {
    argsObj = args[0];
  }
  const argsText = decorator?.getArguments()[0]?.getText() || '{}';
  const selectorMatch = argsText.match(/selector:\s*["'`](.*?)["'`]/);
  const selector = selectorMatch ? selectorMatch[1] : '';
  // Extract imports array from decorator argument text
  let imports: string[] = [];
  const importsMatch = argsText.match(/imports\s*:\s*\[([^\]]*)\]/);
  if (importsMatch) {
    imports = importsMatch[1]
      .split(',')
      .map((s) => s.trim().replace(/["'`]/g, ''))
      .filter(Boolean);
  }
  // Extract providers array using ts-morph
  let providers: any[] = [];
  if (argsObj && argsObj.getProperty) {
    const providersProp = argsObj.getProperty('providers');
    if (providersProp && providersProp.getInitializer) {
      const initializer = providersProp.getInitializer();
      if (initializer && initializer.getKind() === SyntaxKind.ArrayLiteralExpression) {
        const arr = initializer.getElements();
        providers = arr.map((el: any) => {
          if (el.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const provideProp = el.getProperty('provide');
            const useExistingProp = el.getProperty('useExisting');
            return {
              provide: provideProp
                ? provideProp.getInitializer().getText().replace(/["'`]/g, '')
                : '',
              useExisting: useExistingProp
                ? useExistingProp.getInitializer().getText().replace(/["'`]/g, '')
                : '',
            };
          }
          return el.getText();
        });
      }
    }
  }
  // Extract JSDoc for component/directive
  let description = '';
  const jsDocs = classDeclaration.getJsDocs();
  if (jsDocs && jsDocs.length > 0) {
    description = jsDocs
      .map((doc) => doc.getComment() || '')
      .join('\n')
      .trim();
  }
  return {
    [type]: classDeclaration.getName(),
    selector,
    imports,
    providers,
    injector: extractInjectors(classDeclaration),
    props: extractProps(classDeclaration),
    methods: extractMethods(classDeclaration),
    ...(description && { description }),
  };
}

/***
 * Processes the source files in the project.
 * Extracts metadata for components, directives, and modules.
 */
function processSourceFiles() {
  project.getSourceFiles().forEach((sourceFile) => {
    // Skip test files
    if (sourceFile.getFilePath().endsWith('.spec.ts')) {
      return;
    }
    sourceFile.getClasses().forEach((classDeclaration) => {
      const decorators = classDeclaration.getDecorators();
      const componentDecorator = decorators.find((d) => d.getName() === 'Component');
      const directiveDecorator = decorators.find((d) => d.getName() === 'Directive');
      const moduleDecorator = decorators.find((d) => d.getName() === 'NgModule');

      if (componentDecorator) {
        const name = classDeclaration.getName();
        if (name && name.toLowerCase().includes('example')) {
          return;
        } // skip example components
        components.push(extractMetadata('component', componentDecorator, classDeclaration));
      }
      if (directiveDecorator) {
        directives.push(extractMetadata('directive', directiveDecorator, classDeclaration));
      }
      if (moduleDecorator) {
        // Use AST to extract arrays, resolving spread elements
        const args = moduleDecorator.getArguments();
        const objExpr: any =
          args[0] && args[0].getKind && args[0].getKind() === SyntaxKind.ObjectLiteralExpression
            ? args[0]
            : null;

        const moduleName = classDeclaration.getName();
        if (moduleName && moduleName.toLowerCase().includes('example')) {
          return;
        }
        const imports = extractArray(objExpr, 'imports');
        const exportsArr = extractArray(objExpr, 'exports');
        modules.push({
          module: moduleName,
          imports,
          exports: exportsArr,
        });
      }
    });
  });
}

/**
 * Writes the extracted metadata to the output file.
 */
async function writeOutput() {
  // Ensure that the output directory exists
  const generatedDir = resolve(__dirname, '../generated');
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir, { recursive: true });
  }

  // Write the file
  const outputPath = resolve(generatedDir, 'angular-metadata.json');
  writeContentsToFile({
    path: outputPath,
    content: JSON.stringify({ components, directives, modules }, null, 2),
  });

  // eslint-disable-next-line no-console
  console.log('✅ Metadata written to', outputPath);
}

/**
 * Main entry point for the script execution.
 * The script analyzes Angular source files and extracts metadata for components, directives, and modules.
 * The output is a JSON file containing structured metadata, intended for consumption.
 */
function main() {
  // eslint-disable-next-line no-console
  console.log('🧪 Generating angular metadata ...');

  // Process source files
  processSourceFiles();
  // Write output
  writeOutput();
}

try {
  main();
} catch (error) {
  console.error('❌ Error occurred while generating Angular metadata:', error);
}
