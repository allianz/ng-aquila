import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { ProjectDefinition, readWorkspace } from '@schematics/angular/utility';

import { Collection, SchematicTestSetup } from '../utils/testing/test-setup';

describe('ng-aquila: ng add', () => {
    const testSetup = new SchematicTestSetup('ng-add-setup-project', Collection.SCHEMATICS);
    let testProjectConfig: ProjectDefinition;

    async function getTestProjectConfig() {
        const workspace = await readWorkspace(testSetup.appTree);
        return getProjectFromWorkspace(workspace, 'aquila-testing');
    }

    describe('general and b2c', () => {
        beforeEach(async () => {
            await testSetup.runMigration({ project: 'aquila-testing' });
            testProjectConfig = await getTestProjectConfig();
        });

        it('should add normalize.css', async () => {
            expect(testProjectConfig.targets.get('build')!.options!.styles).toContain('node_modules/@aposin/ng-aquila/css/normalize.css');
        });

        it('should add aposin theme', async () => {
            expect(testProjectConfig.targets.get('build')!.options!.styles).toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
            expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/expert.css');
        });

        it('should add CDK styles', async () => {
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/styles.css')).toContain('@import "@angular/cdk/overlay-prebuilt.css";');
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/styles.css')).toContain('@import "@angular/cdk/a11y-prebuilt.css";');
        });

        it('should not write Starter App files by default', () => {
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.component.ts')).not.toContain('openConsentDialog()');
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.component.html')).not.toContain('Aquila Insurance App');
        });
    });

    describe('expert', () => {
        beforeEach(async () => {
            await testSetup.runMigration({ project: 'aquila-testing', type: 'b2b' });
            testProjectConfig = await getTestProjectConfig();
        });

        it('should add expert theme', async () => {
            expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
            expect(testProjectConfig.targets.get('build')!.options!.styles).toContain('node_modules/@aposin/ng-aquila/themes/expert.css');
        });

        it('should add Expert Module for module based application', async () => {
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.module.ts')).toContain('NxExpertModule');
        });
    });

    describe('no theme', () => {
        beforeEach(async () => {
            await testSetup.runMigration({ project: 'aquila-testing', type: 'b2c', noTheme: true });
            testProjectConfig = await getTestProjectConfig();
        });

        it('should not add a theme file if no-theme is set to true', () => {
            expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
        });
    });

    describe('starter app', () => {
        beforeEach(async () => {
            await testSetup.runMigration({ project: 'aquila-testing', starter: true });
            testProjectConfig = await getTestProjectConfig();
        });

        it('should update Starter App files', () => {
            const currentYear = new Date().getFullYear();
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.component.ts')).toContain(`/** Copyright Allianz ${currentYear} */`);
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.component.html')).toContain(`<!-- Copyright Allianz ${currentYear} -->`);
        });

        it('should create Retail version Starter App by default', () => {
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.module.ts')).not.toContain('NxExpertModule');
        });

        it('should create Expert Starter App when requested', async () => {
            await testSetup.runMigration({ project: 'aquila-testing', starter: true, type: 'b2b' });
            expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.module.ts')).toContain('NxExpertModule');
        });
    });
});
