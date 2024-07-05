import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

export enum Collection {
    SCHEMATICS = 1,
    MIGRATIONS = 2,
}

export async function createWorkspace(runner: SchematicTestRunner, tree?: Tree): Promise<UnitTestTree> {
    return runner.runExternalSchematic(
        '@schematics/angular',
        'workspace',
        {
            name: 'workspace',
            version: '1', // angular.json schema version
            newProjectRoot: 'projects',
        },
        tree,
    );
}

export async function createApp(runner: SchematicTestRunner, tree: Tree, options = {}): Promise<UnitTestTree> {
    // temporary fix to set standalone: false that the starter app tests still work.
    return runner.runExternalSchematic('@schematics/angular', 'application', options, tree);
}

export async function createTestLibrary(runner: SchematicTestRunner, tree?: Tree, options = {}): Promise<UnitTestTree> {
    return runner.runExternalSchematic('@schematics/angular', 'library', { name: 'aquila-testing-library' }, tree);
}

/**
 * Reuses our own ng add and ng add setup project schematics to add the library.
 *
 * Use the options parameter to change it to expert.
 * @example
 * addLibrary({type: 'b2b'});
 */
export async function addLibrary(options: any, tree: Tree): Promise<UnitTestTree> {
    const aquilarunner = new SchematicTestRunner('aquila', require.resolve('../../collection.json'));
    const tempTree = await aquilarunner.runSchematic('ng-add', { type: 'b2c', ...options }, tree);
    return aquilarunner.runSchematic('ng-add-setup-project', { type: 'b2c', ...options }, tempTree);
}

/**
 * Helper for setting up everything needed for the schematic tests.
 * It creates things like the TempScopedNodeJsSyncHost and exposes everything and
 * registers the beforeEach and afterEach hooks for jasmine.
 *
 * It also gives you access to functions:
 * + writeFile: makes it possibble to write to the tempFileSystemHost and also updates the hostTree
 * + syncTreeToFileSystem: syncs the whole app tree to the disk
 * + runMigration: call to run the schematic name you specified in the constructor
 * @example
 * ```ts
 * describe('my schematic tests', () => {
 *   const testSetup = new SchematicTestSetup('01-my-schematic-name');
 *
 *   it('should do something', async () => {
 *     testSetup.writeFile('/index.ts', `
 *       import {Foo} from '@aposin/ng-aquila';
 *
 *       export class TestClass {}
 *     `);
 *
 *     await testSetup.runMigration({ project: 'aquila-testing' });
 *     expect(something).toBeTruthy();
 *   });
 * });
 *```
 *
 * You can also use destructuring to get the methods for some cleaner code:
 * const testSetup = new SchematicTestSetup('01-my-schematic-name');
 * let { writeFile, runMigration, warnOutput } = testSetup;
 *
 * WARNING: it doesn't work on properties like runner or appTree as they are undefined
 * at that time
 */
export class SchematicTestSetup {
    runner!: SchematicTestRunner;
    tempFileSystemHost!: TempScopedNodeJsSyncHost;
    tmpDirPath!: string;
    previousWorkingDir!: string;
    warnOutput!: string[];
    infoOutput!: string[];
    errorOutput!: string[];
    hostTree!: HostTree;
    appTree!: UnitTestTree;
    appTreeStandalone!: UnitTestTree;
    appTreeName: string = 'aquila-testing';
    appTreeNameStandalone: string = 'aquila-testing-standalone';

    constructor(
        readonly schematicName: string,
        readonly collection = Collection.MIGRATIONS,
    ) {
        this.init();
    }

    init(): void {
        beforeEach(async () => {
            const schematics = this.collection === Collection.MIGRATIONS ? require.resolve('../../migrations.json') : require.resolve('../../collection.json');
            this.runner = new SchematicTestRunner('test', schematics);
            this.tempFileSystemHost = new TempScopedNodeJsSyncHost();
            this.hostTree = new HostTree(this.tempFileSystemHost);

            // create workspace
            const workspaceTree = await createWorkspace(this.runner, this.hostTree);

            // create module based app
            this.appTree = await createApp(this.runner, workspaceTree, { name: this.appTreeName, standalone: false });
            this.createFileDir(this.appTree, this.appTreeName);

            // create standalone app
            this.appTreeStandalone = await createApp(this.runner, workspaceTree, { name: this.appTreeNameStandalone, standalone: true });
            this.createFileDir(this.appTreeStandalone, this.appTreeNameStandalone);
        });

        afterEach(async () => {
            shx.cd(this.previousWorkingDir);
            shx.rm('-r', this.tmpDirPath);
        });
    }

    /**
     * Create file directory, remove comments and add ts files
     */
    createFileDir(testApp: UnitTestTree, appName: string): void {
        const testAppTsconfigPath = 'projects/' + appName + '/tsconfig.app.json';

        // remove comments and parse json
        const testAppTsconfig = JSON.parse(testApp.readContent(testAppTsconfigPath).replace(/\/\*.*\*\//g, ''));

        // include all TypeScript files in the project. Otherwise all test input
        // files won't be part of the program and cannot be migrated.
        testAppTsconfig.include.push('src/**/*.ts');
        testApp.overwrite(testAppTsconfigPath, JSON.stringify(testAppTsconfig, null, 2));

        this.syncTreeToFileSystem(testApp);

        this.warnOutput = [];
        this.infoOutput = [];
        this.errorOutput = [];
        this.runner.logger.subscribe(logEntry => {
            if (logEntry.level === 'warn') {
                this.warnOutput.push(logEntry.message);
            } else if (logEntry.level === 'info') {
                this.infoOutput.push(logEntry.message);
            } else if (logEntry.level === 'error') {
                this.errorOutput.push(logEntry.message);
            }
        });

        this.previousWorkingDir = shx.pwd();
        this.tmpDirPath = getSystemPath(this.tempFileSystemHost.root);
        // Switch into the temporary directory path. This allows us to run
        // the schematic against our custom unit test tree.
        shx.cd(this.tmpDirPath);
    }

    /**
     * Creates or overwrites a file on the disk and in the virtual Tree.
     */
    writeFile(filePath: string, content: string): void {
        // Update the temp file system host to reflect the changes in the real file system.
        // This is still necessary since we depend on the real file system for parsing the
        // TypeScript project.
        this.tempFileSystemHost.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(content));
        if (this.hostTree.exists(filePath)) {
            this.hostTree.overwrite(filePath, content);
        } else {
            this.hostTree.create(filePath, content);
        }
    }

    /**
     * Deletes file on the disk and in the virtual Tree.
     */
    deleteFile(filePath: string): void {
        // Update the temp file system host to reflect the changes in the real file system.
        // This is still necessary since we depend on the real file system for parsing the
        // TypeScript project.
        this.tempFileSystemHost.sync.delete(normalize(filePath));
        this.hostTree.delete(filePath);
    }

    /**
     * Syncs the whole virtual tree to the disk.
     */
    syncTreeToFileSystem(appTree: UnitTestTree): void {
        // Since the TypeScript compiler API expects all files to be present on the real file system, we
        // map every file in the app tree to a temporary location on the file system.
        appTree.files.forEach(f => this.writeFile(f, appTree.readContent(f)));
    }

    /**
     * Run your migration.
     */
    async runMigration(options = {}): Promise<UnitTestTree> {
        return this.runner.runSchematic(this.schematicName, options, this.appTree);
    }
}
