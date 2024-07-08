import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxAnchorPlainButtonComponent, NxButtonModule } from '.';
import { NxAnchorButtonComponent } from './anchor-button.component';

@Directive({ standalone: true })
abstract class AnchorButtonTest {
    @ViewChild('button') buttonInstance!: NxAnchorButtonComponent;
}

@Component({
    template: `<a nxPlainButton #button href="#" class="some-arbitrary-class-name">Link Text</a>`,
    standalone: true,
    imports: [NxButtonModule],
})
class TestInstance extends AnchorButtonTest {
    clickBindingSpy = jasmine.createSpy('clickSpy');
}

describe('NxAnchorButtonComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxButtonModule, TestInstance],
        }).compileComponents();
    }));

    let fixture: ComponentFixture<TestInstance>;
    let testInstance: TestInstance;
    let buttonInstance: NxAnchorPlainButtonComponent;
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
        expect(buttonNativeElement).toHaveClass('nx-plain-button');
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
