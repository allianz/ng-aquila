import { Collection, SchematicTestSetup } from '../../utils/testing/test-setup';

describe('ng-aquila v22 avatar attention -> prominence migration', () => {
  const testSetup = new SchematicTestSetup('migration-v22', Collection.MIGRATIONS);
  const filePath = 'projects/aquila-testing/src/app/test.ts';

  /** Wraps a template in a component so the migration's template collector picks it up. */
  function componentWithTemplate(template: string): string {
    return `
      import { Component } from '@angular/core';

      @Component({
        template: \`${template}\`,
      })
      export class TestComponent {
        someExpr = true;
      }
    `;
  }

  it('rewrites [attention]="true" to prominence="attention"', async () => {
    testSetup.writeFile(
      filePath,
      componentWithTemplate('<div nxAvatar accentColor="blue" [attention]="true">A</div>'),
    );

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain('<div nxAvatar accentColor="blue" prominence="attention">A</div>');
    expect(content).not.toContain('attention]');
  });

  it('rewrites a bare attention attribute to prominence="attention"', async () => {
    testSetup.writeFile(filePath, componentWithTemplate('<div nxAvatar attention>A</div>'));

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain('<div nxAvatar prominence="attention">A</div>');
  });

  it('removes [attention]="false" because subtle is the new default', async () => {
    testSetup.writeFile(
      filePath,
      componentWithTemplate('<div nxAvatar accentColor="blue" [attention]="false">A</div>'),
    );

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain('<div nxAvatar accentColor="blue">A</div>');
    expect(content).not.toContain('attention');
    expect(content).not.toContain('prominence');
  });

  it('rewrites a dynamic [attention]="expr" to a ternary and warns', async () => {
    testSetup.writeFile(
      filePath,
      componentWithTemplate('<div nxAvatar [attention]="someExpr">A</div>'),
    );

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain(`[prominence]="(someExpr) ? 'attention' : 'subtle'"`);
    expect(testSetup.warnOutput.join('\n')).toContain('prominence');
  });

  it('does not touch an attention input on a non-avatar element', async () => {
    const template = '<nx-icon [attention]="true"></nx-icon>';
    testSetup.writeFile(filePath, componentWithTemplate(template));

    await testSetup.runMigration();

    const content = testSetup.appTree.readContent(filePath);
    expect(content).toContain('<nx-icon [attention]="true"></nx-icon>');
    expect(content).not.toContain('prominence');
  });
});
