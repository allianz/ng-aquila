import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import sdk from '@stackblitz/sdk';

import { ExampleData } from './example-data';
import { StackBlitzWriter } from './stack-blitz-writer';

describe('StackBlitzWriter', () => {
  let stackBlitzWriter: StackBlitzWriter;
  let data: ExampleData;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        StackBlitzWriter,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    stackBlitzWriter = TestBed.inject(StackBlitzWriter);

    data = new ExampleData('', '');
    data.description = 'My Example';
    data.componentNames = ['MyExampleComponent'];
    data.selectorName = 'my-example';
    data.exampleFiles = ['test.ts', 'test.html', 'src/detail.ts'];
    data.indexFilename = data.exampleFiles[0];
  });

  it('should append correct copyright', () => {
    const currentYear = new Date().getFullYear();
    expect(stackBlitzWriter._appendCopyright('test.ts', 'NoContent')).toBe(`NoContent

/**  Copyright ${currentYear} ALLIANZ */`);

    expect(stackBlitzWriter._appendCopyright('test.html', 'NoContent')).toBe(`NoContent

<!-- Copyright ${currentYear} ALLIANZ -->`);
  });

  describe('openStackBlitzProject', () => {
    // We don't test the StackBlitz SDK itself, only the contract between the writer and the SDK:
    // that we call `sdk.openProject` once with a correctly-assembled `files` map and options. File
    // loading is stubbed so the test is deterministic and network-free, and so we can assert that
    // template files (in particular package.json) are passed through verbatim.
    let openProjectSpy: jasmine.Spy;

    beforeEach(() => {
      openProjectSpy = spyOn(sdk, 'openProject');
      spyOn<any>(stackBlitzWriter, '_fetchFile').and.callFake((filename: string, path: string) =>
        Promise.resolve(
          filename === 'src/index.html'
            ? '<aquila-docs-example></aquila-docs-example>'
            : `content:${path}${filename}`,
        ),
      );
    });

    it('opens a StackBlitz project via the SDK with the assembled files', async () => {
      await stackBlitzWriter.openStackBlitzProject('my-id', 'cdk/my-comp', data);

      expect(openProjectSpy).toHaveBeenCalledTimes(1);
      const [project, options] = openProjectSpy.calls.mostRecent().args;

      expect(project.template).toBe('node');
      expect(project.title).toBe('My Example');
      expect(project.description).toBe('My Example');
      expect(options.newWindow).toBeTrue();
      expect(options.openFile).toBe(`src/app/${data.indexFilename}`);

      // Template files keep their own path, the committed lockfile is included, and example files
      // are nested under src/app/.
      expect(Object.keys(project.files)).toContain('src/index.html');
      expect(Object.keys(project.files)).toContain('package.json');
      expect(Object.keys(project.files)).toContain('package-lock.json');
      expect(project.files['src/app/test.ts']).toContain('content:');
      expect(project.files['src/app/src/detail.ts']).toContain('content:');

      // The template's placeholder selector is replaced with the example's selector.
      expect(project.files['src/index.html']).toContain('<my-example>');
      expect(project.files['src/index.html']).not.toContain('aquila-docs-example');
    });

    it('generates src/main.ts that bootstraps the example component', async () => {
      await stackBlitzWriter.openStackBlitzProject('my-id', 'cdk/my-comp', data);

      const [project] = openProjectSpy.calls.mostRecent().args;
      const mainTs = project.files['src/main.ts'];

      // The example component is bootstrapped and imported from its index file with the
      // extension stripped (indexFilename 'test.ts' -> './app/test').
      expect(mainTs).toContain('bootstrapApplication(MyExampleComponent');
      expect(mainTs).toContain("from './app/test'");
      // Copyright is appended to the generated .ts file.
      expect(mainTs).toContain(`/**  Copyright ${new Date().getFullYear()} ALLIANZ */`);
    });

    it('passes the template package.json through verbatim (no dependency injection)', async () => {
      const templatePackageJson = JSON.stringify(
        { name: 'aquila-docs-example', dependencies: { '@allianz/ng-aquila': '^22.0.0' } },
        null,
        2,
      );
      (stackBlitzWriter as any)._fetchFile.and.callFake((filename: string, path: string) =>
        Promise.resolve(
          filename === 'package.json' ? templatePackageJson : `content:${path}${filename}`,
        ),
      );

      await stackBlitzWriter.openStackBlitzProject('my-id', 'cdk/my-comp', data);

      const [project] = openProjectSpy.calls.mostRecent().args;
      // package.json is a .json file, so _appendCopyright leaves it untouched: it must match the
      // template byte-for-byte.
      expect(project.files['package.json']).toBe(templatePackageJson);
    });

    it('adds the settings icon for the icon-registry-example', async () => {
      data.selectorName = 'icon-registry-example';

      await stackBlitzWriter.openStackBlitzProject('my-id', 'cdk/my-comp', data);

      const [project] = openProjectSpy.calls.mostRecent().args;
      expect(Object.keys(project.files)).toContain('src/assets/icons/settings.svg');
    });

    it('does not open a project when a file fails to load', async () => {
      (stackBlitzWriter as any)._fetchFile.and.callFake((filename: string) =>
        filename === 'src/index.html'
          ? Promise.reject(new Error('boom'))
          : Promise.resolve('content'),
      );

      await expectAsync(
        stackBlitzWriter.openStackBlitzProject('my-id', 'cdk/my-comp', data),
      ).toBeRejected();
      expect(openProjectSpy).not.toHaveBeenCalled();
    });
  });

  describe('replaceImagePath method', () => {
    it('converts path to absolute for images', () => {
      const fakeFileContents = '<img src="assets/images/blah.jpeg" />';
      const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
      expect(result).toBe(
        '<img src="https://allianz.github.io/ng-aquila/assets/images/blah.jpeg" />',
      );
    });

    it('converts path to absolute for logos', () => {
      const fakeFileContents = '<img src="assets/logos/blah.svg" />';
      const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
      expect(result).toBe(
        '<img src="https://allianz.github.io/ng-aquila/assets/logos/blah.svg" />',
      );
    });

    it('does not convert path for other assets', () => {
      const fakeFileContents = '<img src="assets/top-secret-info/blah.svg" />';
      const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
      expect(result).toBe('<img src="assets/top-secret-info/blah.svg" />');
    });
  });
});
