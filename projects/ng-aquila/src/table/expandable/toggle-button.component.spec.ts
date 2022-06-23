import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { NxTableModule } from '../table.module';
import { NxExpandable, NxToggleButtonComponent } from './toggle-button.component';

@Directive()
abstract class ToggleButtonTest {
    @ViewChild(NxToggleButtonComponent) toggleButtonInstance!: NxToggleButtonComponent;
    target!: NxExpandable;
}

describe(NxToggleButtonComponent.name, () => {
    let fixture: ComponentFixture<ToggleButtonTest>;
    let testInstance: ToggleButtonTest;
    let toggleButtonInstance: NxToggleButtonComponent;
    let toggleButtonElement: DebugElement;

    function createTestComponent(component: Type<ToggleButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        toggleButtonInstance = testInstance.toggleButtonInstance;
        toggleButtonElement = fixture.debugElement.query(By.css('.nx-toggle-button'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicToggleButtonComponent],
            imports: [NxTableModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicToggleButtonComponent);
        });

        it('creates the component', () => {
            expect(toggleButtonInstance).toBeTruthy();
        });

        it("doesn't have the expanded state", () => {
            expect(toggleButtonElement.nativeElement).not.toHaveClass('is-expanded');
        });

        describe('when clicking the button', () => {
            beforeEach(() => {
                toggleButtonElement.triggerEventHandler('click', {});
                fixture.detectChanges();
            });

            it('toggled the target', () => {
                expect(testInstance.target.toggle).toHaveBeenCalled();
            });

            it('has the expanded state', () => {
                expect(toggleButtonElement.nativeElement).toHaveClass('is-expanded');
            });

            describe('and clicking the button again', () => {
                beforeEach(() => {
                    toggleButtonElement.triggerEventHandler('click', {});
                    fixture.detectChanges();
                });

                it('toggled the target', () => {
                    expect(testInstance.target.toggle).toHaveBeenCalled();
                });

                it("doesn't have the expanded state", () => {
                    expect(toggleButtonElement.nativeElement).not.toHaveClass('is-expanded');
                });
            });
        });
    });
});

@Component({
    template: `<nx-toggle-button [target]="target" ariaLabel="toggle all rows"></nx-toggle-button>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicToggleButtonComponent extends ToggleButtonTest {
    target: NxExpandable;

    constructor() {
        super();
        const expanded = new BehaviorSubject(false);
        this.target = {
            expanded,
            toggle: jasmine.createSpy('toggle').and.callFake(() => expanded.next(!expanded.value)),
            expand: jasmine.createSpy('expand'),
            close: jasmine.createSpy('close'),
        };
    }
}
