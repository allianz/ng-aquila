import { SchematicTestSetup } from '../../utils/testing/test-setup';

/**
 * Tests for the v22 selection-indicator migration:
 *  - `appearance` -> `colorScheme` (value `'full'` -> `'default'`, `'on-selection'` kept)
 *  - `defaultAppearance` input removed (and collapses `'on-selection'` back to `'default'`)
 *  - `NxIndicatorAppearance` type renamed to `NxSelectionIndicatorColorScheme`
 */
describe('ng-aquila: v22 selection-indicator migration', () => {
  const testSetup = new SchematicTestSetup('migration-v22');

  // The generated test app's `App` component already references `./app.html` via `templateUrl`,
  // so the migration's resource collector only visits templates written to that path.
  const templatePath = `projects/${testSetup.appTreeName}/src/app/app.html`;
  const tsPath = `projects/${testSetup.appTreeName}/src/app/indicator.model.ts`;

  async function migrate(): Promise<string> {
    testSetup.syncTreeToFileSystem(testSetup.appTree);
    const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
    return tree.readContent(templatePath);
  }

  describe('template: appearance -> colorScheme', () => {
    it('maps the static value "full" to "default"', async () => {
      testSetup.writeFile(
        templatePath,
        `<nx-radio-indicator appearance="full"></nx-radio-indicator>`,
      );
      const result = await migrate();
      expect(result).toContain('colorScheme="default"');
      expect(result).not.toContain('appearance');
    });

    it('keeps "on-selection" when defaultAppearance is absent', async () => {
      testSetup.writeFile(
        templatePath,
        `<nx-checkbox-indicator appearance="on-selection"></nx-checkbox-indicator>`,
      );
      const result = await migrate();
      expect(result).toContain('colorScheme="on-selection"');
    });

    it('leaves the attribute out entirely when appearance is absent', async () => {
      // No appearance attribute -> new default is already "default", so nothing is added.
      testSetup.writeFile(templatePath, `<nx-radio-indicator></nx-radio-indicator>`);
      const result = await migrate();
      expect(result).toBe(`<nx-radio-indicator></nx-radio-indicator>`);
    });

    it('preserves multi-line indentation when rewriting the attribute', async () => {
      const template = [
        `<nx-checkbox-indicator`,
        `  [checked]="checked"`,
        `  appearance="on-selection"`,
        `></nx-checkbox-indicator>`,
      ].join('\n');
      testSetup.writeFile(templatePath, template);
      const result = await migrate();
      expect(result).toContain(`\n  colorScheme="on-selection"\n`);
    });
  });

  describe('template: defaultAppearance removal', () => {
    it('removes a truthy defaultAppearance and collapses on-selection to default', async () => {
      testSetup.writeFile(
        templatePath,
        `<nx-checkbox-indicator appearance="on-selection" [defaultAppearance]="true"></nx-checkbox-indicator>`,
      );
      const result = await migrate();
      expect(result).toContain('colorScheme="default"');
      expect(result).not.toContain('defaultAppearance');
    });

    it('keeps on-selection when defaultAppearance is explicitly false', async () => {
      testSetup.writeFile(
        templatePath,
        `<nx-radio-indicator appearance="on-selection" [defaultAppearance]="false"></nx-radio-indicator>`,
      );
      const result = await migrate();
      expect(result).toContain('colorScheme="on-selection"');
      expect(result).not.toContain('defaultAppearance');
    });
  });

  describe('template: dynamic bindings are warned, not rewritten', () => {
    it('warns and leaves [appearance] bindings untouched', async () => {
      testSetup.writeFile(
        templatePath,
        `<nx-radio-indicator [appearance]="scheme"></nx-radio-indicator>`,
      );
      const result = await migrate();
      expect(result).toContain('[appearance]="scheme"');
      expect(testSetup.warnOutput.join('\n')).toContain('colorScheme');
    });
  });

  describe('template: unrelated appearance inputs are untouched', () => {
    it('does not rewrite appearance on nx-selectable-card or nx-error', async () => {
      const template = `<nx-selectable-card appearance="expert"></nx-selectable-card><nx-error appearance="text"></nx-error>`;
      testSetup.writeFile(templatePath, template);
      const result = await migrate();
      expect(result).toBe(template);
    });
  });

  describe('typescript: type rename', () => {
    it('renames NxIndicatorAppearance when imported from @allianz/ng-aquila', async () => {
      testSetup.writeFile(
        tsPath,
        [
          `import { NxIndicatorAppearance } from '@allianz/ng-aquila/selection';`,
          `export const scheme: NxIndicatorAppearance = 'on-selection';`,
        ].join('\n'),
      );
      testSetup.syncTreeToFileSystem(testSetup.appTree);
      const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
      const result = tree.readContent(tsPath);
      expect(result).toContain(
        `import { NxSelectionIndicatorColorScheme } from '@allianz/ng-aquila/selection';`,
      );
      expect(result).toContain(`export const scheme: NxSelectionIndicatorColorScheme`);
      expect(result).not.toContain('NxIndicatorAppearance');
    });

    it('renames every NxIndicatorAppearance regardless of import source', async () => {
      // We accept the small risk of a false positive in exchange for also covering
      // namespace imports and re-exports; even a same-named type from another package
      // is renamed.
      testSetup.writeFile(
        tsPath,
        [
          `import { NxIndicatorAppearance } from './my-own-types';`,
          `export const scheme: NxIndicatorAppearance = 'x';`,
        ].join('\n'),
      );
      testSetup.syncTreeToFileSystem(testSetup.appTree);
      const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
      const result = tree.readContent(tsPath);
      expect(result).toContain(`import { NxSelectionIndicatorColorScheme } from './my-own-types';`);
      expect(result).toContain(`export const scheme: NxSelectionIndicatorColorScheme`);
      expect(result).not.toContain('NxIndicatorAppearance');
    });

    it('renames namespace-qualified usages', async () => {
      testSetup.writeFile(
        tsPath,
        [
          `import * as ngAquila from '@allianz/ng-aquila/selection';`,
          `export const scheme: ngAquila.NxIndicatorAppearance = 'on-selection';`,
        ].join('\n'),
      );
      testSetup.syncTreeToFileSystem(testSetup.appTree);
      const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
      const result = tree.readContent(tsPath);
      // The namespace binding is untouched; only the qualified type name is rewritten.
      expect(result).toContain(`import * as ngAquila from '@allianz/ng-aquila/selection';`);
      expect(result).toContain(`ngAquila.NxSelectionIndicatorColorScheme`);
      expect(result).not.toContain('NxIndicatorAppearance');
    });

    it('renames re-exports', async () => {
      testSetup.writeFile(
        tsPath,
        `export { NxIndicatorAppearance } from '@allianz/ng-aquila/selection';`,
      );
      testSetup.syncTreeToFileSystem(testSetup.appTree);
      const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
      const result = tree.readContent(tsPath);
      expect(result).toContain(
        `export { NxSelectionIndicatorColorScheme } from '@allianz/ng-aquila/selection';`,
      );
      expect(result).not.toContain('NxIndicatorAppearance');
    });
  });
});
