import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchTouchEvent } from '../../cdk-test-utils';
import { NxCircleToggleModule } from '../circle-toggle.module';
import { NxCircleToggleComponent } from './circle-toggle.component';

describe('NxCircleToggle', () => {
    let fixture: ComponentFixture<AbstractButtonToggleComponent>;
    let toggleComponent: NxCircleToggleComponent;
    let nativeToggleComponent: HTMLElement;
    let input: HTMLInputElement;
    let label: HTMLLabelElement;

    function createTestComponent(component: Type<AbstractButtonToggleComponent>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        toggleComponent = fixture.componentInstance.buttonToggle;
        input = fixture.nativeElement.querySelector('input');
        label = fixture.nativeElement.querySelector('label');
        nativeToggleComponent = fixture.nativeElement.querySelector('nx-circle-toggle');
    }

    function click() {
        input.click();
        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SimpleCircleToggleButtonComponent,
                PreselectedCircleToggleButtoncComponent,
                NgModelToggleButtonComponent,
                ReactiveToggleButtonComponent,
                DisabledToggleButtonComponent,
                SvgCircleToggleButtonComponent,
                CircleToggleButtonOnPushComponent,
                TextCircleToggleButtonComponent,
            ],
            imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('should change the checked attribute of the toggle button when clicked', () => {
        createTestComponent(SimpleCircleToggleButtonComponent);
        click();
        expect(toggleComponent.checked).toBeTruthy();
    });

    it('should fire change events', () => {
        createTestComponent(SimpleCircleToggleButtonComponent);
        spyOn(toggleComponent.checkedChange, 'emit');
        click();
        expect(toggleComponent.checkedChange.emit).toHaveBeenCalled();
    });

    it('should support preselection', () => {
        createTestComponent(PreselectedCircleToggleButtoncComponent);
        expect(input.checked).toBeTrue();
    });

    it('can be disabled', () => {
        createTestComponent(DisabledToggleButtonComponent);
        expect(input.disabled).toBeTrue();
    });

    it('should link the label with the input field', () => {
        createTestComponent(SimpleCircleToggleButtonComponent);
        expect(input.id).toBe(label.htmlFor);
    });

    it('should display the label', () => {
        createTestComponent(SimpleCircleToggleButtonComponent);
        const textElement = nativeToggleComponent.querySelector('.nx-toggle-circle__label-text');
        expect(textElement).toBeTruthy();
    });

    it('should show check icon', () => {
        createTestComponent(PreselectedCircleToggleButtoncComponent);
        expect(fixture.nativeElement.querySelector('.nx-toggle-circle__check-icon')).toBeTruthy();
    });

    it('should work in template driven forms using ngModel', fakeAsync(() => {
        function setValueInModel(value: boolean) {
            fixture.componentInstance.toggleModel = value;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
        }

        createTestComponent(NgModelToggleButtonComponent);
        expect(input.checked).toBeFalse();

        setValueInModel(true);
        expect(toggleComponent.checked).toBeTrue();

        setValueInModel(false);
        expect(input.checked).toBeFalse();
    }));

    it('should work with reactive forms', fakeAsync(() => {
        createTestComponent(ReactiveToggleButtonComponent);

        const reactComp: ReactiveToggleButtonComponent = fixture.componentInstance as ReactiveToggleButtonComponent;

        function setValue(value: boolean) {
            reactComp.testGroup.controls.reactiveToggle.setValue(value);
            fixture.detectChanges();
            tick();
        }

        setValue(true);
        expect(toggleComponent.checked).toBeTruthy();

        click();
        expect(reactComp.testGroup.value.reactiveToggle).toBeFalsy();
    }));

    it('focuses the toggle button when calling focus()', () => {
        createTestComponent(SimpleCircleToggleButtonComponent);
        toggleComponent.focus();
        expect(nativeToggleComponent.querySelector('.nx-circle-toggle__input')).toEqual(document.activeElement);
    });

    it('should go into errorState when control invalid', fakeAsync(() => {
        createTestComponent(ReactiveToggleButtonComponent);

        const reactComp: ReactiveToggleButtonComponent = fixture.componentInstance as ReactiveToggleButtonComponent;

        reactComp.testGroup.controls.reactiveToggle.setValue(null);
        fixture.detectChanges();
        tick();

        expect(toggleComponent.errorState).toBeTrue();
    }));

    describe('programmatic change', () => {
        it('should update view on checked change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            toggleComponent.checked = true;
            fixture.detectChanges();
            expect(circleButton!).toHaveClass('is-flipped');
        });

        it('should update view on label change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const textElement = nativeToggleComponent.querySelector('.nx-toggle-circle__label-text');
            toggleComponent.label = 'New label';
            fixture.detectChanges();
            expect(textElement!.textContent?.trim()).toBe('New label');

            toggleComponent.label = '';
            fixture.detectChanges();
            const emptyTextElement = nativeToggleComponent.querySelector('.nx-toggle-circle__label-text');
            expect(emptyTextElement).toBeFalsy();
        });

        it('should update view on hint change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const hintElement = nativeToggleComponent.querySelector('.nx-toggle-circle__label-hint');
            toggleComponent.hint = 'New hint';
            fixture.detectChanges();
            expect(hintElement!.textContent?.trim()).toBe('New hint');
        });

        it('should update view on circleText change', () => {
            createTestComponent(TextCircleToggleButtonComponent);
            const textElement = nativeToggleComponent.querySelector('.nx-toggle-circle__content-text');
            expect(textElement!.textContent?.trim()).toBe('TEXT');

            toggleComponent.circleText = 'abc';
            fixture.detectChanges();
            expect(textElement!.textContent?.trim()).toBe('abc');
        });

        it('should update view on name change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            toggleComponent.name = 'newName';
            fixture.detectChanges();
            expect(input.name).toBe('newName');
        });

        it('should update view on id change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            toggleComponent.id = 'newId';
            fixture.detectChanges();
            expect(input.id).toBe('newId-input');
        });

        it('should update on icon change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            toggleComponent.iconName = 'product-bike';
            fixture.detectChanges();
            const iconEl = fixture.debugElement.query(By.css('.nx-toggle-circle__icon nx-icon'));
            expect(iconEl.componentInstance.name).toBe('product-bike');
        });

        it('should update view on svg/svgChecked change', () => {
            createTestComponent(SvgCircleToggleButtonComponent);
            const imageElement = nativeToggleComponent.querySelector('.nx-toggle-circle__icon-image') as HTMLImageElement;
            toggleComponent.svg = 'new.svg';
            fixture.detectChanges();
            expect(imageElement.src).toContain('new.svg');
            toggleComponent.svgChecked = 'newInverted.svg';
            click();
            fixture.detectChanges();
            expect(imageElement.src).toContain('newInverted.svg');
        });

        it('should update svg on hover change', () => {
            createTestComponent(SvgCircleToggleButtonComponent);
            expect(toggleComponent.svgUrl).toBe('test.svg');

            dispatchFakeEvent(nativeToggleComponent, 'mouseenter');
            fixture.detectChanges();
            expect(toggleComponent.svgUrl).toBe('testInverted.svg');

            dispatchFakeEvent(nativeToggleComponent, 'mouseleave');
            fixture.detectChanges();
            expect(toggleComponent.svgUrl).toBe('test.svg');
        });

        it('should update svg on negative change', () => {
            createTestComponent(SvgCircleToggleButtonComponent);
            const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            expect(toggleComponent.svgUrl).toBe('test.svg');
            expect(circleButton!).not.toHaveClass('is-negative');

            toggleComponent.negative = true;
            fixture.detectChanges();
            expect(toggleComponent.svgUrl).toBe('testInverted.svg');
            expect(circleButton!).toHaveClass('is-negative');
        });

        it('should update on touched change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            expect(toggleComponent._touched).toBeFalse();
            expect(circleButton!).not.toHaveClass('is-touched');

            dispatchTouchEvent(nativeToggleComponent, 'touchstart');
            fixture.detectChanges();
            expect(toggleComponent._touched).toBeTrue();
            expect(circleButton!).toHaveClass('is-touched');
        });

        it('should display correct svg on hover change (mobile)', () => {
            createTestComponent(SvgCircleToggleButtonComponent);
            dispatchTouchEvent(nativeToggleComponent, 'touchstart');
            fixture.detectChanges();
            expect(toggleComponent._touched).toBeTrue();

            // touch devices dispatch a mouseenter event on click if the element
            // was not active before; here svg should not change
            dispatchFakeEvent(nativeToggleComponent, 'mouseenter');
            fixture.detectChanges();
            expect(toggleComponent.svgUrl).toBe('test.svg');

            // mouseleave is triggered when the element is no longer active on touch devices
            dispatchFakeEvent(nativeToggleComponent, 'mouseleave');
            fixture.detectChanges();
            expect(toggleComponent.svgUrl).toBe('test.svg');
        });

        it('should display correct svg on checked change (mobile)', () => {
            createTestComponent(SvgCircleToggleButtonComponent);
            dispatchTouchEvent(nativeToggleComponent, 'touchstart');
            fixture.detectChanges();
            expect(toggleComponent._touched).toBeTrue();

            click();
            fixture.detectChanges();
            expect(toggleComponent.checked).toBeTrue();
            expect(toggleComponent.svgUrl).toBe('testInverted.svg');

            click();
            fixture.detectChanges();
            expect(toggleComponent.checked).toBeFalse();
            expect(toggleComponent.svgUrl).toBe('test.svg');
        });

        it('should update on disabled change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            toggleComponent.disabled = true;
            fixture.detectChanges();
            expect(circleButton).toHaveClass('is-disabled');
        });

        it('should update on negative change', () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            toggleComponent.negative = true;
            fixture.detectChanges();
            expect(circleButton).toHaveClass('is-negative');
        });

        it('should update on responsive change', () => {
            createTestComponent(CircleToggleButtonOnPushComponent);
            // const circleButton = nativeToggleComponent.querySelector('nx-icon-toggle-button');
            toggleComponent.responsive = true;
            fixture.detectChanges();
            expect(nativeToggleComponent).toHaveClass('is-responsive');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(SimpleCircleToggleButtonComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should set aria-required', () => {
            createTestComponent(ReactiveToggleButtonComponent);
            expect(input.getAttribute('aria-required')).toBe('true');
        });
    });
});

@Directive()
abstract class AbstractButtonToggleComponent {
    @ViewChild(NxCircleToggleComponent) buttonToggle!: NxCircleToggleComponent;

    toggleModel!: boolean;
}

@Component({
    template: `<nx-circle-toggle value="A" icon="product-heart" label="text1" hint="hint1"></nx-circle-toggle>`,
})
class SimpleCircleToggleButtonComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle value="A" icon="product-heart" label="text1"></nx-circle-toggle>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class CircleToggleButtonOnPushComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle value="A" svg="test.svg" svgChecked="testInverted.svg" label="text1"></nx-circle-toggle>`,
})
class SvgCircleToggleButtonComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle value="A" circleText="TEXT" label="text1"></nx-circle-toggle>`,
})
class TextCircleToggleButtonComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle [checked]="true" value="A" icon="product-heart" label="text1"></nx-circle-toggle>`,
})
class PreselectedCircleToggleButtoncComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle disabled="true"></nx-circle-toggle>`,
})
class DisabledToggleButtonComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `<nx-circle-toggle [(ngModel)]="toggleModel" value="A" icon="product-heart" label="text1"></nx-circle-toggle>`,
})
class NgModelToggleButtonComponent extends AbstractButtonToggleComponent {}

@Component({
    template: `
        <form [formGroup]="testGroup">
            <nx-circle-toggle formControlName="reactiveToggle"></nx-circle-toggle>
        </form>
    `,
})
class ReactiveToggleButtonComponent extends AbstractButtonToggleComponent {
    fb: FormBuilder = new FormBuilder();

    testGroup = this.fb.group({
        reactiveToggle: new FormControl(
            {
                value: false,
                disabled: false,
            },
            {
                validators: Validators.required,
            },
        ),
    });
}
