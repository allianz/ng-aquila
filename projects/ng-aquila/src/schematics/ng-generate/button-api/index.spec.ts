import { Collection, SchematicTestSetup } from '../../utils/testing/test-setup';

describe('migrate-button-api', () => {
  const testSetup = new SchematicTestSetup('migrate-button-api', Collection.SCHEMATICS);
  const htmlPath = () => `projects/${testSetup.appTreeName}/src/app/test.html`;
  const tsPath = () => `projects/${testSetup.appTreeName}/src/app/test.component.ts`;

  async function migrateHtml(html: string): Promise<string> {
    testSetup.appTree.create(htmlPath(), html);
    const tree = await testSetup.runMigration({ project: testSetup.appTreeName });
    return tree.readContent(htmlPath());
  }

  it('moves every modifier into its own input', async () => {
    expect(
      await migrateHtml(
        `<button nxButton="secondary small danger negative block" type="button">Go</button>`,
      ),
    ).toBe(
      `<button nxButton="secondary" size="small" critical inverse block type="button">Go</button>`,
    );
  });

  it('migrates nxIconButton', async () => {
    expect(await migrateHtml(`<button nxIconButton="tertiary small-medium">x</button>`)).toBe(
      `<button nxIconButton="tertiary" size="small-medium">x</button>`,
    );
  });

  it('keeps an explicit medium size', async () => {
    expect(await migrateHtml(`<a nxButton="primary medium">x</a>`)).toBe(
      `<a nxButton="primary" size="medium">x</a>`,
    );
  });

  it('keeps a bare attribute when there is no appearance', async () => {
    expect(await migrateHtml(`<button nxButton="large block">x</button>`)).toBe(
      `<button nxButton size="large" block>x</button>`,
    );
  });

  it('leaves buttons without modifiers untouched', async () => {
    const html = `<button nxButton="secondary">x</button><button nxButton>y</button>`;
    expect(await migrateHtml(html)).toBe(html);
  });

  it('keeps the quote style of the original attribute', async () => {
    expect(await migrateHtml(`<button nxButton='secondary large'>x</button>`)).toBe(
      `<button nxButton='secondary' size='large'>x</button>`,
    );
  });

  it('keeps an existing negative input instead of adding inverse', async () => {
    expect(await migrateHtml(`<button nxButton="primary negative" [negative]="n">x</button>`)).toBe(
      `<button nxButton="primary" [negative]="n">x</button>`,
    );
  });

  it('drops modifiers that are already set through their input', async () => {
    expect(
      await migrateHtml(
        `<button nxButton="primary large danger negative block" [size]="s" critical inverse [block]="b">x</button>`,
      ),
    ).toBe(`<button nxButton="primary" [size]="s" critical inverse [block]="b">x</button>`);
  });

  it('recognises inputs written with the bind- prefix', async () => {
    expect(
      await migrateHtml(
        `<button nxButton="primary danger large" bind-critical="c" bind-size="s">x</button>`,
      ),
    ).toBe(`<button nxButton="primary" bind-critical="c" bind-size="s">x</button>`);
  });

  it('migrates buttons inside control flow blocks and ng-template', async () => {
    expect(
      await migrateHtml(
        `@if (show) {\n  <button nxButton="primary block">a</button>\n}\n` +
          `<ng-template><button nxButton="secondary danger">b</button></ng-template>`,
      ),
    ).toBe(
      `@if (show) {\n  <button nxButton="primary" block>a</button>\n}\n` +
        `<ng-template><button nxButton="secondary" critical>b</button></ng-template>`,
    );
  });

  it('replaces danger on nxPlainButton with critical', async () => {
    expect(await migrateHtml(`<button nxPlainButton="danger">x</button>`)).toBe(
      `<button nxPlainButton critical>x</button>`,
    );
  });

  it('does not touch other attributes with the same names', async () => {
    expect(
      await migrateHtml(
        `<nx-badge type="negative" size="small">x</nx-badge><button nxButton="primary small">y</button>`,
      ),
    ).toBe(
      `<nx-badge type="negative" size="small">x</nx-badge><button nxButton="primary" size="small">y</button>`,
    );
  });

  it('warns about dynamic bindings and leaves them untouched', async () => {
    const html =
      `<button [nxButton]="'secondary ' + (neg ? 'negative' : '')">x</button>\n` +
      `<button nxButton="primary {{ size }}">y</button>\n` +
      `<button bind-nxButton="appearance">z</button>`;

    expect(await migrateHtml(html)).toBe(html);
    expect(testSetup.warnOutput).toEqual(
      jasmine.arrayContaining([
        jasmine.stringContaining(`${htmlPath()}:1:9 - "[nxButton]" is bound dynamically`),
        jasmine.stringContaining(`${htmlPath()}:2:9 - "nxButton" is bound dynamically`),
        jasmine.stringContaining(`${htmlPath()}:3:9 - "bind-nxButton" is bound dynamically`),
      ]),
    );
  });

  it('warns about dynamic nxPlainButton bindings with a plain button hint', async () => {
    const html = `<button [nxPlainButton]="classes">x</button>`;

    expect(await migrateHtml(html)).toBe(html);
    expect(testSetup.warnOutput).toEqual(
      jasmine.arrayContaining([
        jasmine.stringContaining(
          `"[nxPlainButton]" is bound dynamically and was not migrated. "danger" has no effect on nxPlainButton any more; bind [critical] instead.`,
        ),
      ]),
    );
  });

  it('warns about unknown modifiers and leaves the button untouched', async () => {
    const html = `<button nxButton="secondary huge danger">x</button>`;

    expect(await migrateHtml(html)).toBe(html);
    expect(testSetup.warnOutput[0]).toContain('"huge"');
  });

  it('migrates inline component templates', async () => {
    testSetup.appTree.create(
      tsPath(),
      `import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: \`<button nxButton="secondary small negative">a</button>\`,
})
export class TestComponent {}

@Component({ selector: 'app-other', template: '<button nxButton="cta block">b</button>' })
export class OtherComponent {}

const notATemplate = { template: '<button nxButton="cta block">c</button>' };
`,
    );

    const content = (await testSetup.runMigration({ project: testSetup.appTreeName })).readContent(
      tsPath(),
    );

    expect(content).toContain('`<button nxButton="secondary" size="small" inverse>a</button>`');
    expect(content).toContain(`'<button nxButton="cta" block>b</button>'`);
    expect(content).toContain(`{ template: '<button nxButton="cta block">c</button>' }`);
  });

  it('does not end a double-quoted inline template early', async () => {
    testSetup.appTree.create(
      tsPath(),
      `import { Component } from '@angular/core';

@Component({ selector: 'app-a', template: "<button nxButton=small>a</button>" })
export class AComponent {}

@Component({ selector: 'app-b', template: "<button nxButton = 'primary small'>b</button>" })
export class BComponent {}
`,
    );

    const content = (await testSetup.runMigration({ project: testSetup.appTreeName })).readContent(
      tsPath(),
    );

    expect(content).toContain(`"<button nxButton size='small'>a</button>"`);
    expect(content).toContain(`"<button nxButton='primary' size='small'>b</button>"`);
  });

  it('warns about inline templates that are not plain string literals', async () => {
    const ts = `import { Component } from '@angular/core';

const label = 'Go';
const TEMPLATE = '<button nxButton="primary small">Const</button>';
const template = '<button nxButton="cta block">Shorthand</button>';

@Component({ selector: 'app-a', template: \`<button nxButton="primary small">\${label}</button>\` })
export class AComponent {}

@Component({ selector: 'app-b', template: '<button nxButton="cta block">' + label + '</button>' })
export class BComponent {}

@Component({ selector: 'app-c', template: TEMPLATE })
export class CComponent {}

@Component({ selector: 'app-d', template })
export class DComponent {}
`;
    testSetup.appTree.create(tsPath(), ts);

    const tree = await testSetup.runMigration({ project: testSetup.appTreeName });

    expect(tree.readContent(tsPath())).toBe(ts);
    const warnings = new Set(
      testSetup.warnOutput.filter((w) => w.includes('not a plain string literal')),
    );
    expect([...warnings]).toEqual([
      jasmine.stringContaining(`${tsPath()}:7:43 - `),
      jasmine.stringContaining(`${tsPath()}:10:43 - `),
      jasmine.stringContaining(`${tsPath()}:13:43 - `),
      jasmine.stringContaining(`${tsPath()}:16:33 - `),
    ]);
  });

  it('asks for a project when the workspace has several and none is given', async () => {
    await expectAsync(testSetup.runMigration({})).toBeRejectedWithError(/--project=/);
  });

  it('throws when the given path does not exist', async () => {
    await expectAsync(
      testSetup.runMigration({ project: testSetup.appTreeName, path: 'projects/typo/src' }),
    ).toBeRejectedWithError(/Path "projects\/typo\/src" does not exist/);
  });

  it('only migrates files below the given path', async () => {
    const otherPath = `projects/${testSetup.appTreeName}/src/other/test.html`;
    testSetup.appTree.create(htmlPath(), `<button nxButton="primary block">x</button>`);
    testSetup.appTree.create(otherPath, `<button nxButton="primary block">x</button>`);

    const tree = await testSetup.runMigration({
      project: testSetup.appTreeName,
      path: `projects/${testSetup.appTreeName}/src/app`,
    });

    expect(tree.readContent(htmlPath())).toBe(`<button nxButton="primary" block>x</button>`);
    expect(tree.readContent(otherPath)).toBe(`<button nxButton="primary block">x</button>`);
  });
});
