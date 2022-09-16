import { NxIconModule } from '@allianz/ng-aquila/icon';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { NxButtonModule } from '.';
import { NxAnchorButtonComponent } from './anchor-button.component';

@Directive()
abstract class AnchorButtonTest {
    @ViewChild('button') buttonInstance!: NxAnchorButtonComponent;
}

@Component({
    template: `<a nxButton #button href="#" class="some-arbitray-class-name">Hello Anchor Button</a>`,
})
class AnchorButton extends AnchorButtonTest {}

describe('NxAnchorButtonComponent', () => {
    let fixture: ComponentFixture<AnchorButton>;
    let testInstance: AnchorButton;
    let buttonInstance: NxAnchorButtonComponent;
    let buttonNativeElement: HTMLAnchorElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AnchorButton],
            imports: [NxIconModule, NxButtonModule],
        }).compileComponents();
    }));

    function createTestComponent(component: Type<AnchorButton>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonInstance = testInstance.buttonInstance;
        buttonNativeElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    }

    it('creates the button', waitForAsync(() => {
        createTestComponent(AnchorButton);
        expect(buttonInstance).toBeTruthy();
    }));

    it('prevents default when the anchor button is disabled', fakeAsync(() => {
        createTestComponent(AnchorButton);
        const clickSpy = jasmine.createSpy('clickSpy');
        buttonNativeElement.addEventListener('click', clickSpy);
        buttonInstance.disabled = true;
        buttonNativeElement.click();
        expect(clickSpy).toHaveBeenCalledTimes(0);
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(AnchorButton);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});
