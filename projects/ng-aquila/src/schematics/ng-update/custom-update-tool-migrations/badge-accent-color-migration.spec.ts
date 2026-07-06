import { SchematicTestSetup } from '../../utils/testing/test-setup';

/**
 * Tests for the v22 badge migration:
 *  - `colorScheme` input -> `accentColor` (declarative `input-names` data, scoped to `nx-badge`)
 *  - `NxBadgeColorScheme` type -> `NxBadgeAccentColor` (custom `BadgeAccentColorMigration`)
 *
 * Both are driven by the single `migration-v22` schematic, so one migration run exercises both.
 */
describe('ng-aquila: v22 badge accent-color migration', () => {
  const testSetup = new SchematicTestSetup('migration-v22');

  // The generated test app's `App` component already references `./app.html` via `templateUrl`,
  // so the migration's resource collector only visits templates written to that path.
  const templatePath = `projects/${testSetup.appTreeName}/src/app/app.html`;
  const tsPath = `projects/${testSetup.appTreeName}/src/app/badge.model.ts`;

  async function migrateTemplate(content: string): Promise<string> {
    testSetup.writeFile(templatePath, content);
    testSetup.syncTreeToFileSystem(testSetup.appTree);
    const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
    return tree.readContent(templatePath);
  }

  async function migrateTs(content: string): Promise<string> {
    testSetup.writeFile(tsPath, content);
    testSetup.syncTreeToFileSystem(testSetup.appTree);
    const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
    return tree.readContent(tsPath);
  }

  describe('template: colorScheme -> accentColor', () => {
    it('renames a static attribute', async () => {
      const result = await migrateTemplate(`<nx-badge colorScheme="yellow">Badge</nx-badge>`);
      expect(result).toContain('accentColor="yellow"');
      expect(result).not.toContain('colorScheme');
    });

    it('renames a property binding', async () => {
      const result = await migrateTemplate(`<nx-badge [colorScheme]="scheme"></nx-badge>`);
      expect(result).toContain('[accentColor]="scheme"');
      expect(result).not.toContain('colorScheme');
    });

    it('renames a binding with a complex expression alongside other bindings', async () => {
      const result = await migrateTemplate(
        `<nx-badge [prominence]="prominence" [colorScheme]="isBrand ? 'brand' : color" [inverse]="inverse">Badge</nx-badge>`,
      );
      // Only the input name is rewritten; the bound expression and the other bindings stay intact.
      expect(result).toContain(`[accentColor]="isBrand ? 'brand' : color"`);
      expect(result).toContain('[prominence]="prominence"');
      expect(result).toContain('[inverse]="inverse"');
      expect(result).not.toContain('colorScheme');
    });

    it('leaves the colorScheme input of other elements untouched', async () => {
      // nx-sidebar, nx-sidepanel and nx-small-stage have their own unrelated colorScheme input.
      const template = [
        `<nx-sidebar colorScheme="light"></nx-sidebar>`,
        `<nx-sidepanel colorScheme="light"></nx-sidepanel>`,
        `<nx-small-stage colorScheme="light"></nx-small-stage>`,
      ].join('\n');
      const result = await migrateTemplate(template);
      expect(result).toBe(template);
    });
  });

  describe('typescript: NxBadgeColorScheme -> NxBadgeAccentColor', () => {
    it('renames the type when imported from @allianz/ng-aquila', async () => {
      const result = await migrateTs(
        [
          `import { NxBadgeColorScheme } from '@allianz/ng-aquila/badge';`,
          `export const scheme: NxBadgeColorScheme = 'yellow';`,
        ].join('\n'),
      );
      expect(result).toContain(`import { NxBadgeAccentColor } from '@allianz/ng-aquila/badge';`);
      expect(result).toContain(`export const scheme: NxBadgeAccentColor`);
      expect(result).not.toContain('NxBadgeColorScheme');
    });

    it('renames an aliased import but leaves the local alias untouched', async () => {
      const result = await migrateTs(
        [
          `import { NxBadgeColorScheme as BadgeColor } from '@allianz/ng-aquila/badge';`,
          `export const scheme: BadgeColor = 'yellow';`,
        ].join('\n'),
      );
      expect(result).toContain(
        `import { NxBadgeAccentColor as BadgeColor } from '@allianz/ng-aquila/badge';`,
      );
      // Only the imported name is rewritten; the local alias keeps working unchanged.
      expect(result).toContain(`export const scheme: BadgeColor`);
      expect(result).not.toContain('NxBadgeColorScheme');
    });

    it('renames a namespace-qualified type reference', async () => {
      const result = await migrateTs(
        [
          `import * as badge from '@allianz/ng-aquila/badge';`,
          `export const scheme: badge.NxBadgeColorScheme = 'yellow';`,
        ].join('\n'),
      );
      // The `badge` namespace binding stays intact; only the qualified member is rewritten.
      expect(result).toContain(`export const scheme: badge.NxBadgeAccentColor`);
      expect(result).not.toContain('NxBadgeColorScheme');
    });

    it('renames the type regardless of the import source', async () => {
      // The rename is deliberately lenient: any identifier named `NxBadgeColorScheme` is
      // rewritten, even one imported from a non-ng-aquila package. See the migration header.
      const result = await migrateTs(
        [
          `import { NxBadgeColorScheme } from './my-own-types';`,
          `export const scheme: NxBadgeColorScheme = 'x';`,
        ].join('\n'),
      );
      expect(result).toContain(`import { NxBadgeAccentColor } from './my-own-types';`);
      expect(result).toContain(`export const scheme: NxBadgeAccentColor`);
      expect(result).not.toContain('NxBadgeColorScheme');
    });
  });
});
