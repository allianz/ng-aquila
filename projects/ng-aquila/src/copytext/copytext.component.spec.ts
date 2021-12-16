import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxCopytextComponent } from './copytext.component';
import { NxCopytextModule } from './copytext.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class CopytextTest {
    @ViewChild(NxCopytextComponent) textInstance!: NxCopytextComponent;
    size = '';
}

describe('NxCopytextDirective', () => {
    let fixture: ComponentFixture<CopytextTest>;
    let testInstance: CopytextTest;
    let copytextInstance: NxCopytextComponent;
    let textNativeElement: HTMLButtonElement;

    function createTestComponent(component: Type<CopytextTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        copytextInstance = testInstance.textInstance;
        textNativeElement = fixture.nativeElement.querySelector('p') as HTMLButtonElement;
    }

    function setSize(value: any) {
        fixture.componentInstance.size = value;
        fixture.detectChanges();
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BasicCopytext],
                imports: [NxCopytextModule],
            }).compileComponents();
        }),
    );

    it(
        'creates the component',
        waitForAsync(() => {
            createTestComponent(BasicCopytext);
            expect(copytextInstance).toBeTruthy();
        }),
    );

    it(
        'should use size normal by default',
        waitForAsync(() => {
            createTestComponent(BasicCopytext);
            expect(textNativeElement.classList.contains('nx-copy--normal')).toBe(true);
        }),
    );

    it(
        'creates full modifier class from a correct keyword',
        waitForAsync(() => {
            createTestComponent(BasicCopytext);
            setSize('small');
            expect(textNativeElement.classList.contains('nx-copy--small')).toBe(true);
            setSize('normal');
            expect(textNativeElement.classList.contains('nx-copy--normal')).toBe(true);
            setSize('medium');
            expect(textNativeElement.classList.contains('nx-copy--medium')).toBe(true);
            setSize('large');
            expect(textNativeElement.classList.contains('nx-copy--large')).toBe(true);
            setSize('negative');
            expect(textNativeElement.classList.contains('nx-copy--negative')).toBe(true);
            setSize('medium negative');
            expect(textNativeElement.classList.contains('nx-copy--medium')).toBe(true);
            expect(textNativeElement.classList.contains('nx-copy--negative')).toBe(true);
        }),
    );

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicCopytext);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: ` <p [nxCopytext]="size">Hello Text</p> `,
})
class BasicCopytext extends CopytextTest {}
