import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleData } from './example-data';
import { StackBlitzWriter } from './stack-blitz-writer';

const testExampleId = 'my-test-example-id';

describe('StackBlitzWriter', () => {
    let stackBlitzWriter: StackBlitzWriter;
    let data: ExampleData;
    let http: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [],
            providers: [StackBlitzWriter],
        }).compileComponents();
    }));

    beforeEach(inject([HttpTestingController], (h: HttpTestingController) => {
        http = h;
    }));

    beforeEach(() => {
        stackBlitzWriter = TestBed.inject(StackBlitzWriter);

        data = new ExampleData('', '');
        data.componentNames = [];
        data.exampleFiles = ['test.ts', 'test.html', 'src/detail.ts'];
        data.indexFilename = data.exampleFiles[0];
    });

    it('should append correct copyright', () => {
        const currentYear = new Date().getFullYear();
        expect(stackBlitzWriter._appendCopyright('test.ts', 'NoContent')).toBe(`NoContent

/**  Copyright ALLIANZ ${currentYear} */`);

        expect(stackBlitzWriter._appendCopyright('test.html', 'NoContent')).toBe(`NoContent

<!-- Copyright ALLIANZ ${currentYear} -->`);
    });

    it('should create form element', () => {
        expect(stackBlitzWriter._createFormElement('index.ts').outerHTML).toBe(
            `<form action="https://run.stackblitz.com/api/angular/v1?file=index.ts" method="post" target="_blank"></form>`,
        );
    });

    it('should add files to form input', () => {
        const form = stackBlitzWriter._createFormElement('index.ts');

        stackBlitzWriter._addFileToForm(form, data, 'NoContent', 'test.ts', 'path/to/file', false);
        stackBlitzWriter._addFileToForm(form, data, 'Test', 'test.html', 'path/to/file', false);
        stackBlitzWriter._addFileToForm(form, data, 'Detail', 'src/detail.ts', 'path/to/file', false);

        expect(form.elements).toHaveSize(3);
        expect(form.elements[0].getAttribute('name')).toBe('files[src/app/test.ts]');
        expect(form.elements[1].getAttribute('name')).toBe('files[src/app/test.html]');
        expect(form.elements[2].getAttribute('name')).toBe('files[src/app/src/detail.ts]');
    });

    it('should open a new window with stackblitz url', fakeAsync(() => {
        let form: HTMLFormElement;
        stackBlitzWriter.constructStackBlitzForm(testExampleId, 'cdk/my-comp', data, false).then(result => {
            form = result;
            flushMicrotasks();

            for (const url of TEST_URLS) {
                http.expectOne(url).flush(FAKE_DOCS[url] || '');
            }
            flushMicrotasks();

            expect(form.elements).toHaveSize(13);

            // Should have correct tags
            expect(form.elements[0].getAttribute('name')).toBe('tags[0]');
            expect(form.elements[0].getAttribute('value')).toBe('allianz');
            expect(form.elements[1].getAttribute('name')).toBe('tags[1]');
            expect(form.elements[1].getAttribute('value')).toBe('aquila');
            expect(form.elements[2].getAttribute('name')).toBe('tags[2]');
            expect(form.elements[2].getAttribute('value')).toBe('example');

            // Should bet set as private and have description and dependencies.
            expect(form.elements[3].getAttribute('name')).toBe('private');
            expect(form.elements[3].getAttribute('value')).toBe('true');
            expect(form.elements[4].getAttribute('name')).toBe('description');
            expect(form.elements[5].getAttribute('name')).toBe('dependencies');

            // Should have files needed for example.
            expect(form.elements[6].getAttribute('name')).toBe('files[src/index.html]');
            expect(form.elements[7].getAttribute('name')).toBe('files[src/styles.scss]');
            expect(form.elements[8].getAttribute('name')).toBe('files[src/main.ts]');
            expect(form.elements[9].getAttribute('name')).toBe('files[src/app/aquila-module.ts]');
            expect(form.elements[10].getAttribute('name')).toBe('files[src/app/test.ts]');
            expect(form.elements[11].getAttribute('name')).toBe('files[src/app/test.html]');
            expect(form.elements[12].getAttribute('name')).toBe('files[src/app/src/detail.ts]');
        });
    }));

    describe('replaceImagePath method', () => {
        it('converts path to absolute for images', () => {
            const fakeFileContents = '<img src="assets/images/blah.jpeg" />';
            const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
            expect(result).toBe('<img src="https://allianz.github.io/ng-aquila/assets/images/blah.jpeg" />');
        });

        it('converts path to absolute for logos', () => {
            const fakeFileContents = '<img src="assets/logos/blah.svg" />';
            const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
            expect(result).toBe('<img src="https://allianz.github.io/ng-aquila/assets/logos/blah.svg" />');
        });

        it('does not convert path for other assets', () => {
            const fakeFileContents = '<img src="assets/top-secret-info/blah.svg" />';
            const result = stackBlitzWriter._replaceImagePaths(fakeFileContents);
            expect(result).toBe('<img src="assets/top-secret-info/blah.svg" />');
        });
    });
});

const FAKE_DOCS: { [key: string]: string } = {
    '/docs-content/examples-source/test.ts': 'ExampleComponent',
    '/docs-content/examples-source/test.html': `<example></example>`,
    '/docs-content/examples-source/src/detail.ts': 'DetailComponent',
};

const TEST_URLS = [
    '/assets/stack-blitz/src/index.html',
    '/assets/stack-blitz/src/styles.scss',
    '/assets/stack-blitz/src/main.ts',
    '/assets/stack-blitz/src/app/aquila-module.ts',
    `/docs-content/examples-source/cdk/my-comp/${testExampleId}/test.ts`,
    `/docs-content/examples-source/cdk/my-comp/${testExampleId}/test.html`,
    `/docs-content/examples-source/cdk/my-comp/${testExampleId}/src/detail.ts`,
];
