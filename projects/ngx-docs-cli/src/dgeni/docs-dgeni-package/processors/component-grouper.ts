import { Document, Processor } from 'dgeni';
import { InterfaceExportDoc } from 'dgeni-packages/typescript/api-doc-types/InterfaceExportDoc';
import { TypeAliasExportDoc } from 'dgeni-packages/typescript/api-doc-types/TypeAliasExportDoc';
import * as path from 'path';

import { CategorizedClassDoc } from '../common/dgeni-definitions';

const fs = require('fs');

/** Component group data structure. */
export class ComponentGroup {
    /** Unique document type for Dgeni. */
    docType = 'componentGroup';

    /** Name of the component group. */
    name: string;

    /** Display name of the component group */
    displayName: string;

    /** Module import path for the component group. */
    moduleImportPath: string;

    /** Name of the package, either material or cdk */
    packageName: string;

    /** Display name of the package. */
    packageDisplayName: string;

    /** Unique id for the component group. */
    id: string;

    /** Known aliases for the component group. */
    aliases: string[] = [];

    /** List of categorized class docs that are defining a directive. */
    directives: CategorizedClassDoc[] = [];

    /** List of categorized class docs that are defining a component. */
    components: CategorizedClassDoc[] = [];

    /** List of categorized class docs that are defining a service. */
    services: CategorizedClassDoc[] = [];

    /** Additional classes that belong to the component group. */
    additionalClasses: CategorizedClassDoc[] = [];

    /** Additional interfaces that belong to the component group. */
    additionalInterfaces: InterfaceExportDoc[] = [];

    /** Additional type aliases that belong to the component group. */
    additionalTypeAliases: TypeAliasExportDoc[] = [];

    /** NgModule that defines the current component group. */
    ngModule: CategorizedClassDoc | null = null;

    constructor(name: string) {
        this.name = name;
        this.id = `component-group-${name}`;
    }
}

export class ComponentGrouper implements Processor {
    name = 'component-grouper';
    $runBefore = ['docs-processed'];
    $process(docs: any[]): void | any[] | PromiseLike<any[]> {
        const groups = new Map<string, ComponentGroup>();
        docs.forEach(doc => {
            const documentInfo = getDocumentPackageInfo(doc);
            const packageName = documentInfo.packageName;
            const packageDisplayName = 'Aquila';
            const packageJsonPath = path.join(doc.basePath, packageName, './package.json');
            const ngPackageJsonPath = path.join(doc.basePath, packageName, './ng-package.json');

            let moduleImportPath = '@aposin/ng-aquila';
            if (fs.existsSync(packageJsonPath) || fs.existsSync(ngPackageJsonPath)) {
                moduleImportPath = `@aposin/ng-aquila/${packageName}`;
            }

            const groupName = documentInfo.name;

            // Get the group for this doc, or, if one does not exist, create it.
            let group;
            if (groups.has(groupName)) {
                group = groups.get(groupName)!;
            } else {
                group = new ComponentGroup(groupName);
                groups.set(groupName, group);
            }

            group.displayName = documentInfo.name;
            group.moduleImportPath = moduleImportPath;
            group.packageName = packageName;
            group.packageDisplayName = packageDisplayName;

            // Put this doc into the appropriate list in this group.
            if (doc.isDirective) {
                group.directives.push(doc);
            } else if (doc.isComponent) {
                group.components.push(doc);
            } else if (doc.isService) {
                group.services.push(doc);
            } else if (doc.isNgModule) {
                group.ngModule = doc;
            } else if (doc.docType === 'class') {
                group.additionalClasses.push(doc);
            } else if (doc.docType === 'interface') {
                group.additionalInterfaces.push(doc);
            } else if (doc.docType === 'type-alias') {
                group.additionalTypeAliases.push(doc);
            }
        });

        // you can return from $process to manipulate or change the docs collection for
        // further processing. in this case we grouped the docs into their logical groups
        // like button, accordion etc. and we only want these objects to be processed.
        return Array.from(groups.values());
    }
}

/** Resolves package information for the given Dgeni document. */
function getDocumentPackageInfo(doc: Document) {
    // Full path to the file for this doc.
    const basePath = doc.fileInfo.basePath;
    const filePath = doc.fileInfo.filePath;

    // All of the component documentation is under either `src/lib` or `src/cdk`.
    // We group the docs up by the directory immediately under that root.
    const pathSegments = path.relative(basePath, filePath).split(path.sep);
    // [ 'lib', 'button', 'button.component.spec.ts' ] vs [ 'button', 'button.component.spec.ts' ]
    const groupName = pathSegments[0];

    return {
        name: groupName,
        packageName: pathSegments[0],
        entryPointName: pathSegments[0],
    };
}
