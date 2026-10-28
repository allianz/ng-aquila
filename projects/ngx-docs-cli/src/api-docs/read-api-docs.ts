import * as glob from 'glob';
import * as path from 'path';
import {
  Node,
  ParameterDeclaration,
  Project,
  SetAccessorDeclaration,
  SourceFile,
  Symbol,
  SymbolFlags,
  SyntaxKind,
  ts,
  TypeChecker,
  TypeFormatFlags,
} from 'ts-morph';

import {
  ApiDoc,
  ClassLikeExportDoc,
  ExportDoc,
  FileInfo,
  HeritageInfo,
  MemberDoc,
  MethodMemberDoc,
  ModuleDoc,
  PropertyMemberDoc,
  TypeAliasExportDoc,
} from './common/api-doc-definitions';
import { getJsDocFields } from './common/jsdoc-tags';
import {
  getContent,
  getDeclarationTypeText,
  getDecorators,
  nodeToString,
  typeToString,
} from './common/ts-nodes';

const METHOD_MEMBER_FLAGS =
  SymbolFlags.Method | SymbolFlags.Signature | SymbolFlags.Constructor | SymbolFlags.Accessor;
const PROPERTY_MEMBER_FLAGS = SymbolFlags.Property | SymbolFlags.EnumMember;
const IGNORED_MEMBER_FLAGS =
  SymbolFlags.Prototype | SymbolFlags.TypeParameter | SymbolFlags.Constructor;

/**
 * Reads a doc for every source file below `basePath` and for every class, interface and type alias
 * they export. A symbol that is exported from several files gets a doc for each of them.
 */
export function readApiDocs(basePath: string): ApiDoc[] {
  const project = new Project({
    // `types: []` keeps the `@types` packages of the repository out: they would change how
    // globals such as `setTimeout` are typed.
    compilerOptions: { allowNonTsExtensions: true, newLine: ts.NewLineKind.LineFeed, types: [] },
    skipAddingFilesFromTsConfig: true,
  });
  const sourceFiles = glob
    .sync('**/*.ts', { cwd: basePath, ignore: '**/*.spec.ts' })
    .map((file) => project.addSourceFileAtPath(path.resolve(basePath, file)));
  project.resolveSourceFileDependencies();

  const reader = new ApiDocReader(basePath, project.getTypeChecker());
  const docs = sourceFiles.flatMap((sourceFile) => reader.readModule(sourceFile));
  reader.linkHeritageClauses();

  return docs;
}

class ApiDocReader {
  private readonly _docsBySymbol = new Map<Symbol, ClassLikeExportDoc>();
  private readonly _classLikeDocs: ClassLikeExportDoc[] = [];

  constructor(
    private readonly _basePath: string,
    private readonly _typeChecker: TypeChecker,
  ) {}

  readModule(sourceFile: SourceFile): ApiDoc[] {
    const moduleSymbol = sourceFile.getSymbol();

    // Files without an import or export are scripts, not modules.
    if (!moduleSymbol) {
      return [];
    }

    const id = path.relative(
      this._basePath,
      path.resolve(
        this._basePath,
        moduleSymbol
          .getName()
          .replace(/^"|"$/g, '')
          .replace(/\/index$/, ''),
      ),
    );
    const moduleDoc: ModuleDoc = {
      docType: 'module',
      id,
      name: id.split('/').pop()!,
      basePath: this._basePath,
      fileInfo: this._getFileInfo(sourceFile),
      content: '',
      ...getJsDocFields(''),
    };

    const exportDocs = this._typeChecker
      .getExportsOfModule(moduleSymbol)
      .filter((exportSymbol) => exportSymbol.getName() !== '__esModule')
      .map((exportSymbol) => this._readExport(moduleDoc, exportSymbol))
      .filter((doc) => doc !== null);

    return [moduleDoc, ...exportDocs];
  }

  /** Resolves the docs of the classes and interfaces that the `extends` and `implements` clauses refer to. */
  linkHeritageClauses() {
    this._classLikeDocs.forEach((doc) =>
      [...doc.extendsClauses, ...doc.implementsClauses].forEach((clause) => {
        const symbol = clause.type.getType().getSymbol();
        clause.doc = symbol && this._docsBySymbol.get(symbol);
      }),
    );
  }

  private _readExport(moduleDoc: ModuleDoc, exportSymbol: Symbol): ExportDoc | null {
    const symbol = exportSymbol.isAlias() ? exportSymbol.getAliasedSymbolOrThrow() : exportSymbol;
    const declarations = symbol.getDeclarations();

    if (!declarations.length) {
      return null;
    }

    const name = exportSymbol.getName();
    const exportDocType = getExportDocType(symbol);

    if (exportDocType === 'class' || exportDocType === 'interface') {
      const declaration = symbol.getValueDeclaration() ?? declarations[0];
      const doc: ClassLikeExportDoc = {
        ...this._createExportDoc(moduleDoc, symbol, declaration, name),
        docType: exportDocType,
        decorators: getDecorators(declaration),
        typeParams: getTypeParams(symbol),
        ...getHeritageClauses(symbol),
        members: [],
      };
      doc.members = this._readMembers(doc);
      this._docsBySymbol.set(symbol, doc);
      this._classLikeDocs.push(doc);
      return doc;
    }

    if (exportDocType === 'type-alias') {
      const declaration = declarations.find((d) => Node.isTypeAliasDeclaration(d))!;
      const doc: TypeAliasExportDoc = {
        ...this._createExportDoc(moduleDoc, symbol, declaration, name),
        docType: 'type-alias',
        typeDefinition: getDeclarationTypeText(declaration),
      };
      return doc;
    }

    // Functions, constants and enums are not part of the API pages.
    return null;
  }

  private _createExportDoc(moduleDoc: ModuleDoc, symbol: Symbol, declaration: Node, name: string) {
    const content = getContent(declaration);

    return {
      name,
      id: `${moduleDoc.id}/${name}`,
      moduleDoc,
      symbol,
      declaration,
      typeChecker: this._typeChecker,
      basePath: this._basePath,
      fileInfo: this._getFileInfo(declaration.getSourceFile()),
      content,
      ...getJsDocFields(content),
    };
  }

  private _readMembers(containerDoc: ClassLikeExportDoc): MemberDoc[] {
    return containerDoc.symbol.getMembers().flatMap((member) => {
      const flags = member.getFlags();

      if (flags & IGNORED_MEMBER_FLAGS) {
        return [];
      }

      const valueDeclaration = member.getValueDeclaration();
      if (
        valueDeclaration &&
        ts.getCombinedModifierFlags(valueDeclaration.compilerNode as ts.Declaration) &
          ts.ModifierFlags.Private
      ) {
        return [];
      }

      const overloads: MethodMemberDoc[] = [];
      let memberDoc: MemberDoc | null = null;
      let getter: Node | null = null;
      let setter: Node | null = null;

      for (const declaration of member.getDeclarations()) {
        if (flags & METHOD_MEMBER_FLAGS) {
          if (Node.isGetAccessorDeclaration(declaration)) {
            getter = declaration;
          } else if (Node.isSetAccessorDeclaration(declaration)) {
            setter = declaration;
          } else if ((declaration.compilerNode as ts.FunctionLikeDeclaration).body) {
            memberDoc = this._createMethodDoc(containerDoc, member, declaration, overloads);
          } else {
            // An overload signature of the method.
            overloads.push(this._createMethodDoc(containerDoc, member, declaration, overloads));
          }
        } else if (flags & PROPERTY_MEMBER_FLAGS) {
          memberDoc = this._createPropertyDoc(containerDoc, member, declaration);
        } else {
          throw new Error(`Unknown member type for member ${member.getName()}`);
        }
      }

      if (getter || setter) {
        memberDoc = this._createAccessorDoc(containerDoc, member, getter, setter);
      }

      // Interfaces and abstract classes have no implementation, so the first signature is the primary one.
      return [memberDoc ?? overloads.shift()!];
    });
  }

  private _createMemberDoc(containerDoc: ClassLikeExportDoc, symbol: Symbol, declaration: Node) {
    const content = getContent(declaration);

    return {
      docType: 'member' as const,
      containerDoc,
      symbol,
      declaration,
      typeChecker: this._typeChecker,
      basePath: this._basePath,
      fileInfo: this._getFileInfo(declaration.getSourceFile()),
      startingLine: declaration.getStartLineNumber(),
      content,
      ...getJsDocFields(content),
      decorators: getDecorators(declaration),
      type: getDeclarationTypeText(declaration),
      isOptional: symbol.hasFlags(SymbolFlags.Optional),
      isGetAccessor: symbol.hasFlags(SymbolFlags.GetAccessor),
      isSetAccessor: symbol.hasFlags(SymbolFlags.SetAccessor),
    };
  }

  private _createPropertyDoc(
    containerDoc: ClassLikeExportDoc,
    symbol: Symbol,
    declaration: Node,
  ): PropertyMemberDoc {
    return {
      ...this._createMemberDoc(containerDoc, symbol, declaration),
      memberType: 'property',
      name: symbol.getName(),
      id: `${containerDoc.id}.${symbol.getName()}`,
    };
  }

  /** A getter/setter pair is a single property; what the getter lacks is taken from the setter. */
  private _createAccessorDoc(
    containerDoc: ClassLikeExportDoc,
    symbol: Symbol,
    getter: Node | null,
    setter: Node | null,
  ): PropertyMemberDoc {
    const doc = this._createPropertyDoc(containerDoc, symbol, (getter ?? setter)!);

    if (setter) {
      const setterDoc = this._createMethodDoc(containerDoc, symbol, setter, []);
      const [parameter] = (setter as SetAccessorDeclaration).getParameters();
      doc.type = doc.type || (parameter && getParameterType(parameter)) || '';
      if (!doc.content && setterDoc.content) {
        Object.assign(doc, getJsDocFields(setterDoc.content), { content: setterDoc.content });
      }
      doc.decorators = doc.decorators ?? setterDoc.decorators;
    }

    return doc;
  }

  private _createMethodDoc(
    containerDoc: ClassLikeExportDoc,
    symbol: Symbol,
    declaration: Node,
    overloads: MethodMemberDoc[],
  ): MethodMemberDoc {
    const name = getMethodName(symbol);
    const isOverload = !(declaration.compilerNode as ts.FunctionLikeDeclaration).body;
    const overloadIndex = isOverload ? symbol.getDeclarations().indexOf(declaration) : -1;
    const anchor = `${name.trim() || 'call'}${overloadIndex >= 0 ? `_${overloadIndex}` : ''}()`;

    return {
      ...this._createMemberDoc(containerDoc, symbol, declaration),
      memberType: 'method',
      name,
      id: `${containerDoc.id}.${anchor}`,
      parameters: getParameters(this._typeChecker, declaration),
      overloads,
    };
  }

  private _getFileInfo(sourceFile: SourceFile): FileInfo {
    const filePath = sourceFile.getFilePath();

    return {
      basePath: this._basePath,
      filePath,
      relativePath: path.relative(this._basePath, filePath),
    };
  }
}

function getExportDocType(symbol: Symbol) {
  if (symbol.hasFlags(SymbolFlags.Function)) {
    return 'function';
  }
  if (symbol.hasFlags(SymbolFlags.Class)) {
    return 'class';
  }
  if (symbol.hasFlags(SymbolFlags.Interface)) {
    return 'interface';
  }
  if (symbol.hasFlags(SymbolFlags.Enum) || symbol.hasFlags(SymbolFlags.Property)) {
    return 'other';
  }
  if (symbol.hasFlags(SymbolFlags.TypeAlias)) {
    return 'type-alias';
  }
  return 'other';
}

/** The type parameters of a class or interface as `<T, U>`, or an empty string. */
function getTypeParams(symbol: Symbol): string {
  const typeParams = symbol
    .getMembers()
    .filter((member) => member.hasFlags(SymbolFlags.TypeParameter))
    .flatMap((member) => member.getDeclarations().map(getDeclarationTypeText));

  return typeParams.length ? `<${typeParams.join(', ')}>` : '';
}

/** Collects the heritage clauses of every declaration; interfaces can be declared more than once. */
function getHeritageClauses(symbol: Symbol) {
  const extendsClauses: HeritageInfo[] = [];
  const implementsClauses: HeritageInfo[] = [];

  symbol.getDeclarations().forEach((declaration) => {
    if (!Node.isClassDeclaration(declaration) && !Node.isInterfaceDeclaration(declaration)) {
      return;
    }

    declaration.getHeritageClauses().forEach((clause) => {
      const clauses =
        clause.getToken() === SyntaxKind.ExtendsKeyword ? extendsClauses : implementsClauses;
      clause.getTypeNodes().forEach((type) => clauses.push({ type, text: nodeToString(type) }));
    });
  });

  return { extendsClauses, implementsClauses };
}

function getMethodName(symbol: Symbol): string {
  switch (symbol.getName()) {
    case '__new':
      return 'new ';
    case '__constructor':
      return 'constructor';
    case '__call':
      return '';
    default:
      return symbol.getName();
  }
}

/** The parameters of a signature as `...name?: type = default`. */
function getParameters(typeChecker: TypeChecker, declaration: Node): string[] {
  const signature = typeChecker.getSignatureFromNode(declaration as Node<ts.SignatureDeclaration>);

  if (!signature) {
    throw new Error(
      `Invalid call signature in ${declaration.getSourceFile().getFilePath()} at line ${declaration.getStartLineNumber()}`,
    );
  }

  return signature.getParameters().map((parameter) => {
    const parameterDeclaration = parameter.getValueDeclarationOrThrow() as ParameterDeclaration;
    const type = getParameterType(parameterDeclaration);
    const initializer = parameterDeclaration.getInitializer();

    return [
      parameterDeclaration.isRestParameter() ? '...' : '',
      parameter.getName(),
      parameterDeclaration.hasQuestionToken() ? '?' : '',
      type ? `: ${type}` : '',
      initializer ? ` = ${nodeToString(initializer)}` : '',
    ]
      .join('')
      .trim();
  });
}

function getParameterType(declaration: ParameterDeclaration): string {
  const typeNode = declaration.getTypeNode();

  if (!typeNode && !declaration.hasInitializer()) {
    return '';
  }

  return typeToString(typeNode ? typeNode.getType() : declaration.getType(), TypeFormatFlags.None);
}
