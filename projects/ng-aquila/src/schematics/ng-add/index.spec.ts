import { SchematicTestSetup, Collection } from '../utils/testing/test-setup';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';

describe('ng-aquila ng add', () => {
  const testSetup = new SchematicTestSetup('ng-add-setup-project', Collection.SCHEMATICS);
  let testProjectConfig: any;

  function getTestProjectConfig() {
    const workspace = getWorkspace(testSetup.appTree);
    return getProjectFromWorkspace(workspace, 'aquila-testing');
  }

  describe('general and b2c', () => {
    beforeEach(async () => {
      await testSetup.runMigration();
      testProjectConfig = getTestProjectConfig();
    });

    it('should add normalize.css', async () => {
      expect(testProjectConfig.architect!.build.options.styles).toContain('node_modules/@aposin/ng-aquila/css/normalize.css');
    });

    it('should add aposin theme', async () => {
      expect(testProjectConfig.architect!.build.options.styles).toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
      expect(testProjectConfig.architect!.build.options.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/expert.css');
    });

    it('should add CDK styles', async () => {
      expect(testSetup.appTree.readContent('projects/aquila-testing/src/styles.css'))
        .toContain('@import "@angular/cdk/overlay-prebuilt.css";');
      expect(testSetup.appTree.readContent('projects/aquila-testing/src/styles.css'))
        .toContain('@import "@angular/cdk/a11y-prebuilt.css";');
    });

    it('should add whatinput', async () => {
      expect(testProjectConfig.architect!.build.options.scripts).toContain('node_modules/what-input/dist/what-input.js');
    });

    it('should add css var ponyfill', async () => {
      expect(testSetup.appTree.readContent('projects/aquila-testing/src/polyfills.ts')).toContain('cssVars(');
    });
  });

  describe('expert', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ type: 'b2b' });
      testProjectConfig = getTestProjectConfig();
    });

    it('should add expert theme', async () => {
      expect(testProjectConfig.architect!.build.options.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
      expect(testProjectConfig.architect!.build.options.styles).toContain('node_modules/@aposin/ng-aquila/themes/expert.css');
    });

    it('should add Expert Module', async () => {
      expect(testSetup.appTree.readContent('projects/aquila-testing/src/app/app.module.ts')).toContain('NxExpertModule');
    });
  });

  describe('no theme', () => {
    beforeEach(async () => {
      await testSetup.runMigration({ type: 'b2c', noTheme: true });
      testProjectConfig = getTestProjectConfig();
    });

    it('should not add a theme file if no-theme is set to true', () => {
      expect(testProjectConfig.architect!.build.options.styles).not.toContain('node_modules/@aposin/ng-aquila/themes/aposin.css');
    });
  });
});
