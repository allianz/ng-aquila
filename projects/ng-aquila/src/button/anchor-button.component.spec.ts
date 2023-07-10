import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxButtonModule } from '.';
import { NxAnchorButtonComponent } from './anchor-button.component';

@Directive()
abstract class AnchorButtonTest {
    @ViewChild('button') buttonInstance!: NxAnchorButtonComponent;
}

@Component({
    template: `<a nxButton #button href="#" class="some-arbitrary-class-name">Hello Anchor Button</a>`,
})
class TestInstance extends AnchorButtonTest {
    clickBindingSpy = jasmine.createSpy('clickSpy');
}

describe('NxAnchorButtonComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestInstance],
            imports: [NxButtonModule],
        }).compileComponents();
    }));

    let fixture: ComponentFixture<TestInstance>;
    let testInstance: TestInstance;
    let buttonInstance: NxAnchorButtonComponent;
    let buttonNativeElement: HTMLAnchorElement;

    function createTestComponent(component: Type<TestInstance>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonInstance = fixture.componentInstance.buttonInstance;
        buttonNativeElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    }

    it('creates the button', waitForAsync(() => {
        createTestComponent(TestInstance);
        expect(buttonInstance).toBeTruthy();
    }));

    it('has correct base class', waitForAsync(() => {
        createTestComponent(TestInstance);
        expect(buttonNativeElement).toHaveClass('nx-button');
    }));

    it('disabled state prevents click binding on host element from firing', () => {
        createTestComponent(TestInstance);
        fixture.detectChanges();
        buttonInstance.disabled = true;
        buttonNativeElement.click();

        expect(testInstance.clickBindingSpy).not.toHaveBeenCalled();
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(TestInstance);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});
