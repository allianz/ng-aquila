import { Collection, SchematicTestSetup } from '../../utils/testing/test-setup';

describe('ng-aquila v22 avatar NxAvatarAccent -> NxAvatarAccentColor migration', () => {
  const testSetup = new SchematicTestSetup('migration-v22', Collection.MIGRATIONS);
  const filePath = 'projects/aquila-testing/src/app/test.ts';

  it('renames the type in imports and usages when imported from @allianz/ng-aquila', async () => {
    testSetup.writeFile(
      filePath,
      `
        import { NxAvatarAccent } from '@allianz/ng-aquila/avatar';

        export class Foo {
          color: NxAvatarAccent = 'default';
        }
      `,
    );

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain(`import { NxAvatarAccentColor } from '@allianz/ng-aquila/avatar';`);
    expect(content).toContain('color: NxAvatarAccentColor');
    expect(content).not.toContain('NxAvatarAccent ');
    expect(content).not.toContain('NxAvatarAccent;');
  });

  it('renames the type when imported from the root @allianz/ng-aquila entry point', async () => {
    testSetup.writeFile(
      filePath,
      `
        import { NxAvatarAccent } from '@allianz/ng-aquila';

        const color: NxAvatarAccent = 'blue';
      `,
    );

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain(`import { NxAvatarAccentColor } from '@allianz/ng-aquila';`);
    expect(content).toContain('const color: NxAvatarAccentColor');
  });

  it('does not touch an identically named symbol that is not imported from ng-aquila', async () => {
    const original = `
        type NxAvatarAccent = 'a' | 'b';

        const value: NxAvatarAccent = 'a';
      `;
    testSetup.writeFile(filePath, original);

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain('type NxAvatarAccent =');
    expect(content).not.toContain('NxAvatarAccentColor');
  });
});
