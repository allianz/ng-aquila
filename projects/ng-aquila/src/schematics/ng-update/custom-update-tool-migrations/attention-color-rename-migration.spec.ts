import { SchematicTestSetup } from '../../utils/testing/test-setup';

describe('ng-aquila v22: attention-color -> accent-color rename', () => {
  const testSetup = new SchematicTestSetup('migration-v22');
  const APP = 'aquila-testing';
  const src = (p: string) => `projects/${APP}/src/${p}`;

  /** Runs the whole v22 migration (the `project` option is ignored by the rule). */
  async function migrate(): Promise<void> {
    await testSetup.runMigration({});
  }

  // ---- TypeScript identifier renames ----

  it('renames the component, type and const imported from @allianz/ng-aquila/text', async () => {
    testSetup.writeFile(
      src('app/uses-accent.ts'),
      `import {
         NxAttentionColorComponent,
         NxAttentionColorOption,
         NX_ATTENTION_COLOR_VALUES,
       } from '@allianz/ng-aquila/text';

       const values = NX_ATTENTION_COLOR_VALUES;
       let selected: NxAttentionColorOption = 'red';
       const cmp = NxAttentionColorComponent;
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/uses-accent.ts'));
    expect(out).toContain('NxAccentColorComponent');
    expect(out).toContain('NxAccentColorOption');
    expect(out).toContain('NX_ACCENT_COLOR_VALUES');
    expect(out).not.toContain('NxAttentionColor');
    expect(out).not.toContain('NX_ATTENTION_COLOR_VALUES');
    // entry point name stays `text`
    expect(out).toContain(`'@allianz/ng-aquila/text'`);
  });

  it('also matches the bare @allianz/ng-aquila entry point', async () => {
    testSetup.writeFile(
      src('app/bare.ts'),
      `import { NxAttentionColorOption } from '@allianz/ng-aquila';
       let c: NxAttentionColorOption = 'blue';
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/bare.ts'));
    expect(out).toContain('NxAccentColorOption');
    expect(out).not.toContain('NxAttentionColorOption');
  });

  it('renames only the module-side name for aliased imports', async () => {
    testSetup.writeFile(
      src('app/aliased.ts'),
      `import { NxAttentionColorOption as Color } from '@allianz/ng-aquila/text';
       let c: Color = 'green';
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/aliased.ts'));
    expect(out).toContain('NxAccentColorOption as Color');
    expect(out).toContain('let c: Color');
    expect(out).not.toContain('NxAttentionColorOption');
  });

  it('renames a namespace-imported reference and named re-export', async () => {
    testSetup.writeFile(
      src('app/ns.ts'),
      `import * as text from '@allianz/ng-aquila/text';
       let c: text.NxAttentionColorOption = 'red';
       export { NxAttentionColorOption } from '@allianz/ng-aquila/text';
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/ns.ts'));
    // namespace binding stays, member access is renamed
    expect(out).toContain('import * as text from');
    expect(out).toContain('text.NxAccentColorOption');
    // named re-export specifier is renamed
    expect(out).toContain('export { NxAccentColorOption } from');
    expect(out).not.toContain('NxAttentionColorOption');
  });

  it('renames the exact renamed token even without an ng-aquila import', async () => {
    // The old names are globally unique Nx/NX_-prefixed tokens, so the raw-token
    // rename intentionally rewrites them wherever they appear.
    testSetup.writeFile(
      src('app/local.ts'),
      `type NxAttentionColorOption = 'x' | 'y';
       let c: NxAttentionColorOption = 'x';
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/local.ts'));
    expect(out).toContain('NxAccentColorOption');
    expect(out).not.toContain('NxAttentionColorOption');
  });

  it('leaves identifiers that collide with Object.prototype members untouched', async () => {
    testSetup.writeFile(
      src('app/proto.ts'),
      `const s = (42).toString();
       class Foo { bar() { return this.constructor.name; } }
       const has = Object.prototype.hasOwnProperty;
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/proto.ts'));
    expect(out).toContain('(42).toString()');
    expect(out).toContain('this.constructor.name');
    expect(out).toContain('Object.prototype.hasOwnProperty');
    expect(out).not.toContain('[native code]');
  });

  it('leaves un-prefixed retained design tokens untouched', async () => {
    testSetup.writeFile(
      src('tokens-extra.scss'),
      `$a: color-attention-yellow;\n$b: icon-on-accent-attention-color;`,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('tokens-extra.scss'));
    expect(out).toContain('color-attention-yellow');
    expect(out).toContain('icon-on-accent-attention-color');
  });

  // ---- Selector in templates ----

  it('rewrites the selector in an external template (bracketed and bare)', async () => {
    testSetup.writeFile(
      src('app/t.component.html'),
      `<span [nx-attention-color]="color">a</span>\n<span nx-attention-color="red">b</span>`,
    );
    testSetup.writeFile(
      src('app/t.component.ts'),
      `import { Component } from '@angular/core';
       @Component({ selector: 'app-t', templateUrl: './t.component.html' })
       export class TComponent { color = 'red'; }
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/t.component.html'));
    expect(out).toContain('[nx-accent-color]="color"');
    expect(out).toContain('nx-accent-color="red"');
    expect(out).not.toContain('nx-attention-color');
  });

  // ---- Collision guard: selector + --negative modifier in the same template ----

  it('rewrites both the selector and the --negative modifier without corruption', async () => {
    testSetup.writeFile(
      src('app/n.component.html'),
      `<span [nx-attention-color]="c" [class.nx-attention-color--negative]="neg">x</span>`,
    );
    testSetup.writeFile(
      src('app/n.component.ts'),
      `import { Component } from '@angular/core';
       @Component({ selector: 'app-n', templateUrl: './n.component.html' })
       export class NComponent { c = 'red'; neg = true; }
      `,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/n.component.html'));
    expect(out).toContain('[nx-accent-color]="c"');
    expect(out).toContain('nx-accent-color--negative');
    expect(out).not.toContain('nx-attention-color');
    // guard against clipping / double application:
    expect(out).not.toContain('nx-accent-colornx-');
    expect(out).not.toContain('nx-accent-color--negativ--');
  });

  // ---- Stylesheet ----

  it('rewrites the selector and modifier class in a stylesheet', async () => {
    testSetup.writeFile(
      src('styles-extra.scss'),
      `[nx-attention-color] { color: red; }\n.nx-attention-color--negative { color: blue; }`,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('styles-extra.scss'));
    expect(out).toContain('[nx-accent-color]');
    expect(out).toContain('.nx-accent-color--negative');
    expect(out).not.toContain('nx-attention-color');
  });

  // ---- TS string literal selector ----

  it('rewrites the selector inside a querySelector call', async () => {
    testSetup.writeFile(
      src('app/query.ts'),
      `const el = document.querySelector('[nx-attention-color]');`,
    );

    await migrate();

    const out = testSetup.appTree.readContent(src('app/query.ts'));
    expect(out).toContain(`'[nx-accent-color]'`);
    expect(out).not.toContain('nx-attention-color');
  });

  it('rewrites the selector inside a plain (non-call) string literal', async () => {
    testSetup.writeFile(src('app/sel.ts'), `const sel = '[nx-attention-color]';`);

    await migrate();

    const out = testSetup.appTree.readContent(src('app/sel.ts'));
    expect(out).toContain(`'[nx-accent-color]'`);
    expect(out).not.toContain('nx-attention-color');
  });
});
