import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxCopytextComponent } from './copytext.component';
import { NxCopytextModule } from './copytext.module';

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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicCopytext],
            imports: [NxCopytextModule],
        }).compileComponents();
    }));

    it('creates the component', waitForAsync(() => {
        createTestComponent(BasicCopytext);
        expect(copytextInstance).toBeTruthy();
    }));

    it('should use size normal by default', waitForAsync(() => {
        createTestComponent(BasicCopytext);
        expect(textNativeElement).toHaveClass('nx-copy--normal');
    }));

    it('creates full modifier class from a correct keyword', waitForAsync(() => {
        createTestComponent(BasicCopytext);
        setSize('small');
        expect(textNativeElement).toHaveClass('nx-copy--small');
        setSize('normal');
        expect(textNativeElement).toHaveClass('nx-copy--normal');
        setSize('medium');
        expect(textNativeElement).toHaveClass('nx-copy--medium');
        setSize('large');
        expect(textNativeElement).toHaveClass('nx-copy--large');
        setSize('negative');
        expect(textNativeElement).toHaveClass('nx-copy--negative');
        setSize('medium negative');
        expect(textNativeElement).toHaveClass('nx-copy--medium');
        expect(textNativeElement).toHaveClass('nx-copy--negative');
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicCopytext);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<p [nxCopytext]="size">Hello Text</p>`,
})
class BasicCopytext extends CopytextTest {}
