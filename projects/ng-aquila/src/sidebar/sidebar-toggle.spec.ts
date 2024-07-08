import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

import { NxSidebarToggleComponent } from './sidebar-toggle';

@Directive({ standalone: true })
abstract class ToggleTest {
    @ViewChild(NxSidebarToggleComponent) buttonInstance!: NxSidebarToggleComponent;
}

describe('NxSidebarToggleButton', () => {
    let fixture: ComponentFixture<ToggleTest>;
    let testInstance: ToggleTest;
    let buttonInstance: NxSidebarToggleComponent;
    let buttonNativeElement: HTMLButtonElement;

    function createTestComponent(component: Type<ToggleTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonInstance = testInstance.buttonInstance;
        buttonNativeElement = fixture.nativeElement.querySelector('.nx-sidebar__toggle-button') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxButtonModule, NxSidebarModule, BasicSidebarToggleComponent],
        }).compileComponents();
    }));

    it('creates the toggle with the correct base class bindings', () => {
        createTestComponent(BasicSidebarToggleComponent);
        expect(buttonInstance.type).toBe('tertiary');
        expect(buttonInstance.size).toBe('small-medium');
        expect(buttonNativeElement).toHaveClass('nx-button--tertiary');
        expect(buttonNativeElement).toHaveClass('nx-button--small-medium');
    });
});

@Component({
    template: `
        <nx-sidebar>
            <nx-sidebar-footer>
                <button nxSidebarToggle>Toggle</button>
            </nx-sidebar-footer>
        </nx-sidebar>
    `,
    standalone: true,
    imports: [NxButtonModule, NxSidebarModule],
})
class BasicSidebarToggleComponent extends ToggleTest {}
