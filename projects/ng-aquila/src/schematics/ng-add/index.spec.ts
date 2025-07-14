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

    it('should not write Starter App files by default', () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app.component.ts',
        ),
      ).not.toContain('openConsentDialog()');
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app.component.html',
        ),
      ).not.toContain('Aquila Insurance App');
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

  xdescribe('starter app', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeName, starter: true });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should update Starter App files', () => {
      const currentYear = new Date().getFullYear();
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app.component.ts',
        ),
      ).toContain(`/** Copyright ${currentYear} Allianz */`);
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app.component.html',
        ),
      ).toContain(`<!-- Copyright ${currentYear} Allianz -->`);
    });

    it('should create Retail version Starter App by default', () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app-module.ts',
        ),
      ).not.toContain('NxExpertModule');
    });

    it('should create Expert Starter App when requested', async () => {
      await testSetup.runMigration({ project: testSetup.appTreeName, starter: false, type: 'b2b' });
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeName + '/src/app/app-module.ts',
        ),
      ).toContain('NxExpertModule');
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

    it('should not write Starter App files by default for standalone apps', () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.component.ts',
        ),
      ).not.toContain('openConsentDialog()');
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.component.html',
        ),
      ).not.toContain('Aquila Insurance App');
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

  xdescribe('starter app for standalone apps', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ project: testSetup.appTreeNameStandalone, starter: true });
      testProjectConfig = await getTestProjectConfig();
    });

    it('should update Starter App files for standalone apps', () => {
      const currentYear = new Date().getFullYear();
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.component.ts',
        ),
      ).toContain(`/** Copyright ${currentYear} Allianz */`);
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.component.html',
        ),
      ).toContain(`<!-- Copyright ${currentYear} Allianz -->`);
    });

    it('should create Retail version Starter App by default for standalone apps', () => {
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.config.ts',
        ),
      ).not.toContain('NxExpertModule');
    });

    it('should create Expert Starter App when requested for standalone apps', async () => {
      await testSetup.runMigration({
        project: testSetup.appTreeNameStandalone,
        starter: true,
        type: 'b2b',
      });
      expect(
        testSetup.appTree.readContent(
          'projects/' + testSetup.appTreeNameStandalone + '/src/app/app.config.ts',
        ),
      ).toContain('NxExpertModule');
    });
  });
});
