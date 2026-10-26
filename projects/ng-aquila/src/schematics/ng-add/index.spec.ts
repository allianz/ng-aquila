import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { ProjectDefinition, readWorkspace } from '@schematics/angular/utility';

import { Collection, SchematicTestSetup } from '../utils/testing/test-setup';

describe('ng-aquila: ng add', () => {
  const testSetup = new SchematicTestSetup('ng-add-setup-project', Collection.SCHEMATICS);
  let testProjectConfig: ProjectDefinition;

  async function getTestProjectConfig() {
    const workspace = await readWorkspace(testSetup.appTree);
    return getProjectFromWorkspace(workspace, testSetup.appTreeName);
  }

  describe('general and b2c', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeName });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should add normalize.css', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/css/normalize.css',
      );
    });

    it('should add aquila theme', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/expert.css',
      );
    });

    it('should add CDK styles', async () => {
      expect(
        testSetup.appTree.readContent('projects/' + testSetup.appTreeName + '/src/styles.css'),
      ).toContain('@import "@angular/cdk/overlay-prebuilt.css";');
      expect(
        testSetup.appTree.readContent('projects/' + testSetup.appTreeName + '/src/styles.css'),
      ).toContain('@import "@angular/cdk/a11y-prebuilt.css";');
    });
  });

  describe('expert', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeName, type: 'b2b' });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should add expert theme', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/themes/expert.css',
      );
    });

    it('should add Expert Module for module based application', async () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app-module.ts',
        ),
      ).toContain('NxExpertModule');
    });
  });

  describe('no theme', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeName, type: 'b2c', noTheme: true });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should not add a theme file if no-theme is set to true', () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
    });
  });
});

describe('ng-aquila: ng add standalone', () => {
  const testSetup = new SchematicTestSetup('ng-add-setup-project', Collection.SCHEMATICS);
  let testProjectConfig: ProjectDefinition;

  async function getTestProjectConfig() {
    const workspace = await readWorkspace(testSetup.appTreeStandalone);
    return getProjectFromWorkspace(workspace, testSetup.appTreeNameStandalone);
  }

  describe('general and b2c for standalone apps', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeNameStandalone });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should add normalize.css for standalone apps', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/css/normalize.css',
      );
    });

    it('should add aquila theme for standalone apps', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/expert.css',
      );
    });

    it('should add CDK styles for standalone apps', async () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/styles.css',
        ),
      ).toContain('@import "@angular/cdk/overlay-prebuilt.css";');
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/styles.css',
        ),
      ).toContain('@import "@angular/cdk/a11y-prebuilt.css";');
    });
  });

  describe('expert for standalone apps', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeNameStandalone, type: 'b2b' });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should add expert theme for standalone apps', async () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
      expect(testProjectConfig.targets.get('build')!.options!.styles).toContain(
        'node_modules/@allianz/ng-aquila/themes/expert.css',
      );
    });

    it('should add Expert Module for module based application for standalone apps', async () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.config.ts',
        ),
      ).toContain('NxExpertModule');
    });
  });

  describe('no theme for standalone apps', () => {
    beforeEach(async () => {
      await testSetup.runMigration({
        project: testSetup.appTreeNameStandalone,
        type: 'b2c',
        noTheme: true,
      });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should not add a theme file if no-theme is set to true for standalone apps', () => {
      expect(testProjectConfig.targets.get('build')!.options!.styles).not.toContain(
        'node_modules/@allianz/ng-aquila/themes/aquila.css',
      );
    });
  });
});
