import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NxSidepanelComponent } from './sidepanel';
import { NxSidepanelModule } from './sidepanel.module';
import { NxSidepanelCloseButtonComponent } from './sidepanel-close-button';

@Directive()
abstract class SidepanelCloseButtonTest {
    @ViewChild(NxSidepanelComponent) sidebarInstance!: NxSidepanelComponent;
    @ViewChild(NxSidepanelCloseButtonComponent) buttonInstance!: NxSidepanelCloseButtonComponent;
}

describe('NxSidepanelCloseButtonComponent', () => {
    let fixture: ComponentFixture<SidepanelCloseButtonTest>;
    let testInstance: SidepanelCloseButtonTest;
    let sidepanelInstance: NxSidepanelComponent;
    let sidepanelElement: DebugElement;
    let buttonElement: HTMLButtonElement;

    function createTestComponent(component: Type<SidepanelCloseButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        sidepanelInstance = testInstance.sidebarInstance;
        sidepanelElement = fixture.debugElement.query(By.css('nx-sidepanel'));
        buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSidepanel],
            imports: [BrowserAnimationsModule, NxSidepanelModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicSidepanel);
        });

        it('creates the sidepanel', () => {
            expect(sidepanelInstance).toBeTruthy();
        });

        it('closes the panel on button click', () => {
            buttonElement.click();
            fixture.detectChanges();
            expect(sidepanelInstance.opened).toBeFalse();
            expect(sidepanelElement.nativeElement).toHaveClass('is-closed');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicSidepanel);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-sidepanel>
            Hello Sidepanel
            <button nxSidepanelCloseButton aria-label="Close Sidepanel"></button>
        </nx-sidepanel>
    `,
})
class BasicSidepanel extends SidepanelCloseButtonTest {}
