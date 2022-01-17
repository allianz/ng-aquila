import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

export enum Collection {
    SCHEMATICS = 1,
    MIGRATIONS = 2,
}

export async function createTestApp(runner: SchematicTestRunner, appOptions = {}, tree?: Tree): Promise<UnitTestTree> {
    const workspaceTree = await createWorkspace(runner, tree);

    return createApp(runner, appOptions, workspaceTree);
}

export function createWorkspace(runner: SchematicTestRunner, tree?: Tree) {
    return runner
        .runExternalSchematicAsync(
            '@schematics/angular',
            'workspace',
            {
                name: 'workspace',
                version: '6.0.0',
                newProjectRoot: 'projects',
            },
            tree,
        )
        .toPromise();
}

export function createApp(runner: SchematicTestRunner, options = {}, tree: Tree) {
    return runner.runExternalSchematicAsync('@schematics/angular', 'application', { name: 'aquila-testing', ...options }, tree).toPromise();
}

export function createTestLibrary(runner: SchematicTestRunner, options = {}, tree?: Tree): Promise<UnitTestTree> {
    return runner.runExternalSchematicAsync('@schematics/angular', 'library', { name: 'aquila-testing-library' }, tree).toPromise();
}

/**
 * Reuses our own ng add and ng add setup project schematics to add the library.
 * Use the options parameter to change it to expert:
 * addLibrary({type: 'b2b'});
 *
 *
 * @param options
 * @param tree
 */
export async function addLibrary(options: any, tree: Tree) {
    const aquilarunner = new SchematicTestRunner('aquila', require.resolve('../../collection.json'));
    const tempTree = await aquilarunner.runSchematicAsync('ng-add', { type: 'b2c', ...options }, tree).toPromise();
    return aquilarunner.runSchematicAsync('ng-add-setup-project', { type: 'b2c', ...options }, tempTree).toPromise();
}

/**
 * Helper for setting up everything needed for the schematic tests.
 * It creates things like the TempScopedNodeJsSyncHost and exposes everything and
 * registers the beforeEach and afterEach hooks for jasmine.
 *
 * It also gives you access to functions:
 * + writeFile: makes it possibble to write to the
 *              tempFileSystemHost and also updates the hostTree
 * + syncTreeToFileSystem: syncs the whole app tree to the disk
 * + runMigration: call to run the schematic name you specified in the constructor
 *
 * Usage:
 * describe('my schematic tests', () => {
 *    const testSetup = new SchematicTestSetup('01-my-schematic-name');
 *
 *   it('should do something', async () => {
 *    testSetup.writeFile('/index.ts', `
      import {Foo} from '@aposin/ng-aquila';

      export class TestClass {}
      `);

       await testSetup.runMigration();
       expect(something).toBeTruthy();
 *   });
 * });
 *
 * You can also use destructuring to get the methods for some cleaner code:
 * const testSetup = new SchematicTestSetup('01-my-schematic-name');
 * let { writeFile, runMigration, warnOutput } = testSetup;
 *
 * WARNING: it doesn't work on properties like runner or appTree as they are undefined
 * at that time
 *
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
    // logger uses an internal rxjs version so if import Subscription
    // from rxjs here TS reports an error
    logSubscription: any;

    constructor(public schematicName: string, public collection = Collection.MIGRATIONS) {
        this.setup();
    }

    setup() {
        beforeEach(async () => {
            const schematics = this.collection === Collection.MIGRATIONS ? require.resolve('../../migrations.json') : require.resolve('../../collection.json');
            this.runner = new SchematicTestRunner('test', schematics);
            this.tempFileSystemHost = new TempScopedNodeJsSyncHost();
            this.hostTree = new HostTree(this.tempFileSystemHost);
            // create whole test app
            this.appTree = await createTestApp(this.runner, { name: 'aquila-testing' }, this.hostTree);
            const testAppTsconfigPath = 'projects/aquila-testing/tsconfig.app.json';

            // remove comments and parse json
            const testAppTsconfig = JSON.parse(this.appTree.readContent(testAppTsconfigPath).replace(/\/\*.*\*\//, ''));

            // include all TypeScript files in the project. Otherwise all test input
            // files won't be part of the program and cannot be migrated.
            testAppTsconfig.include.push('src/**/*.ts');
            this.appTree.overwrite(testAppTsconfigPath, JSON.stringify(testAppTsconfig, null, 2));
            this.syncTreeToFileSystem();

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
        });

        afterEach(async () => {
            shx.cd(this.previousWorkingDir);
            shx.rm('-r', this.tmpDirPath);
            // this.logSubscription.unsubscribe();
        });
    }

    /**
     * Creates or overwrites a file on the disk and in the virtual Tree
     *
     * @param filePath
     * @param content
     */
    writeFile = (filePath: string, content: string) => {
        // Update the temp file system host to reflect the changes in the real file system.
        // This is still necessary since we depend on the real file system for parsing the
        // TypeScript project.
        this.tempFileSystemHost.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(content));
        if (this.hostTree.exists(filePath)) {
            this.hostTree.overwrite(filePath, content);
        } else {
            this.hostTree.create(filePath, content);
        }
    };

    /**
     * Deletes file on the disk and in the virtual Tree
     *
     * @param filePath
     */
    deleteFile(filePath: string) {
        // Update the temp file system host to reflect the changes in the real file system.
        // This is still necessary since we depend on the real file system for parsing the
        // TypeScript project.
        this.tempFileSystemHost.sync.delete(normalize(filePath));
        this.hostTree.delete(filePath);
    }

    /**
     * Syncs the whole virtual tree to the disk
     */
    syncTreeToFileSystem = () => {
        // Since the TypeScript compiler API expects all files to be present on the real file system, we
        // map every file in the app tree to a temporary location on the file system.
        this.appTree.files.forEach(f => this.writeFile(f, this.appTree.readContent(f)));
    };

    /**
     * Run your migration.
     */
    runMigration = (options = {}) => {
        return this.runner.runSchematicAsync(this.schematicName, options, this.appTree).toPromise();
    };
}
