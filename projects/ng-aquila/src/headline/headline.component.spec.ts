import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxHeadlineComponent, NxHeadlineSize } from './headline.component';
import { NxHeadlineModule } from './headline.module';

@Directive()
abstract class HeadlineTest {
    @ViewChild(NxHeadlineComponent) headlineInstance!: NxHeadlineComponent;
    size = '';
    typedSize: NxHeadlineSize = undefined;
    negative = false;
}

describe('NxHeadlineDirective', () => {
    let fixture: ComponentFixture<HeadlineTest>;
    let testInstance: HeadlineTest;
    let headlineInstance: NxHeadlineComponent;
    let headlineNativeElement: HTMLHeadingElement;

    function createTestComponent(component: Type<HeadlineTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        headlineInstance = testInstance.headlineInstance;
        headlineNativeElement = fixture.nativeElement.querySelector('h1') as HTMLHeadingElement;
    }

    function setSize(value: any) {
        fixture.componentInstance.size = value;
        fixture.detectChanges();
    }

    function setTypedSize(value: NxHeadlineSize) {
        fixture.componentInstance.typedSize = value;
        fixture.detectChanges();
    }

    function expectNewApiClass() {
        expect(headlineNativeElement).toHaveClass('nx-heading--new-api');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicHeadline, HeadlineWithArbitraryClass, DynamicHeadline],
            imports: [NxHeadlineModule],
        }).compileComponents();
    }));

    it('creates the Headline', waitForAsync(() => {
        createTestComponent(BasicHeadline);
        expect(headlineInstance).toBeTruthy();
    }));

    it('should use type section by default', waitForAsync(() => {
        createTestComponent(BasicHeadline);
        setSize('section');
        expect(headlineNativeElement).toHaveClass('nx-heading--section');
    }));

    it('creates full modifier class from a correct keyword', waitForAsync(() => {
        createTestComponent(BasicHeadline);
        setSize('page');
        expect(headlineNativeElement).toHaveClass('nx-heading--page');

        setSize('page-bold-caps');
        expect(headlineNativeElement).toHaveClass('nx-heading--page-bold-caps');

        setSize('section');
        expect(headlineNativeElement).toHaveClass('nx-heading--section');

        setSize('subsection-large');
        expect(headlineNativeElement).toHaveClass('nx-heading--subsection-large');

        setSize('subsection-medium');
        expect(headlineNativeElement).toHaveClass('nx-heading--subsection-medium');

        setSize('subsection-small');
        expect(headlineNativeElement).toHaveClass('nx-heading--subsection-small');

        setSize('subsection-xsmall');
        expect(headlineNativeElement).toHaveClass('nx-heading--subsection-xsmall');

        setSize('negative');
        expect(headlineNativeElement).toHaveClass('nx-heading--negative');

        setSize('section negative');
        expect(headlineNativeElement).toHaveClass('nx-heading--section');
        expect(headlineNativeElement).toHaveClass('nx-heading--negative');
    }));

    it('should add classes for size input', () => {
        createTestComponent(DynamicHeadline);

        setTypedSize('s');
        expect(headlineNativeElement).toHaveClass('nx-heading--s');
        expectNewApiClass();
        setTypedSize('m');
        expect(headlineNativeElement).toHaveClass('nx-heading--m');
        expectNewApiClass();
        setTypedSize('l');
        expect(headlineNativeElement).toHaveClass('nx-heading--l');
        expectNewApiClass();
        setTypedSize('xl');
        expect(headlineNativeElement).toHaveClass('nx-heading--xl');
        expectNewApiClass();
        setTypedSize('2xl');
        expect(headlineNativeElement).toHaveClass('nx-heading--2xl');
        expectNewApiClass();
        setTypedSize('3xl');
        expect(headlineNativeElement).toHaveClass('nx-heading--3xl');
        expectNewApiClass();
        setTypedSize('4xl');
        expect(headlineNativeElement).toHaveClass('nx-heading--4xl');
        expectNewApiClass();
    });

    it('should set class for negative input', () => {
        createTestComponent(DynamicHeadline);
        fixture.componentInstance.negative = true;
        fixture.detectChanges();
        expect(headlineNativeElement).toHaveClass('nx-heading--negative');
    });

    it('passes through an unknown class', waitForAsync(() => {
        createTestComponent(HeadlineWithArbitraryClass);
        expect(headlineNativeElement).toHaveClass('some-arbitray-class-name');
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicHeadline);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<h1 [nxHeadline]="size">Hello Headline</h1>`,
})
class BasicHeadline extends HeadlineTest {}

@Component({
    template: `<h1 nxHeadline="page" class="some-arbitray-class-name">With arbitrary class</h1>`,
})
class HeadlineWithArbitraryClass extends HeadlineTest {}

@Component({
    template: `<h1 nxHeadline [size]="typedSize" [negative]="negative">Hello Headline</h1>`,
})
class DynamicHeadline extends HeadlineTest {}
