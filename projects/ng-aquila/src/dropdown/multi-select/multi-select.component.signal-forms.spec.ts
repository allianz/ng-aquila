import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { disabled, form, FormField, validate } from '@angular/forms/signals';

import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectComponent } from './multi-select.component';

/**
 * Signal forms (Angular 22) coverage for `NxMultiSelectComponent` when bound with `[formField]`.
 * The multi-select value is an array, so the model field is typed `string[]`.
 * The component is a `ControlValueAccessor`, bound through the `[formField]` interop path.
 */

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brands">
      <nx-multi-select
        [formField]="myForm.brands"
        [options]="options"
        [filter]="false"
      ></nx-multi-select>
    </nx-formfield>
  `,
})
class BasicSignalFormMultiSelect {
  @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<string, string>;
  readonly options = ['BMW', 'Audi', 'Volvo', 'Mini', 'Mercedes'];
  readonly model = signal({ brands: [] as string[] });
  readonly myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brands">
      <nx-multi-select
        [formField]="myForm.brands"
        [options]="options"
        [filter]="false"
      ></nx-multi-select>
    </nx-formfield>
  `,
})
class DisabledSignalFormMultiSelect {
  @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<string, string>;
  readonly options = ['BMW', 'Audi', 'Volvo'];
  readonly model = signal({ brands: [] as string[] });
  readonly myForm = form(this.model, (schema) => {
    disabled(schema.brands, { when: () => true });
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brands">
      <nx-multi-select
        [formField]="myForm.brands"
        [options]="options"
        [filter]="false"
      ></nx-multi-select>
    </nx-formfield>
  `,
})
class RequiredSignalFormMultiSelect {
  @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<string, string>;
  readonly options = ['BMW', 'Audi', 'Volvo'];
  readonly model = signal({ brands: [] as string[] });
  readonly myForm = form(this.model, (schema) => {
    // The built-in `required` validator treats an empty array as a value, so use an
    // explicit non-empty check that a correct multi-select "required" should satisfy.
    validate(schema.brands, ({ value }) =>
      value().length === 0 ? { kind: 'required', message: 'Pick at least one brand' } : undefined,
    );
  });
}

describe('NxMultiSelectComponent signal forms', () => {
  let overlayContainer: OverlayContainer;

  function setup<T>(component: new (...args: any[]) => T): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  function trigger(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-multi-select .value') as HTMLElement;
  }

  function valueText(fixture: ComponentFixture<unknown>): string {
    return (
      fixture.nativeElement.querySelector('nx-multi-select .value-text') as HTMLElement
    ).textContent!.trim();
  }

  function open(fixture: ComponentFixture<unknown>) {
    trigger(fixture).click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function options(): HTMLElement[] {
    return Array.from(
      overlayContainer.getContainerElement().querySelectorAll('nx-multi-select-option'),
    ) as HTMLElement[];
  }

  function clickOption(fixture: ComponentFixture<unknown>, index: number) {
    options()[index].click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function getBackdrop(): HTMLElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.cdk-overlay-backdrop') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicSignalFormMultiSelect,
        DisabledSignalFormMultiSelect,
        RequiredSignalFormMultiSelect,
      ],
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('reflects the model array into the selected options (model -> view)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormMultiSelect);
    const host = fixture.componentInstance;

    host.model.update((m) => ({ ...m, brands: ['BMW', 'Mini'] }));
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(host.multiSelect.value).toEqual(['BMW', 'Mini']);
    expect(valueText(fixture)).toBe('BMW, Mini');
  }));

  it('adds a clicked option to the model array (view -> model, add)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormMultiSelect);
    const host = fixture.componentInstance;

    expect(host.myForm.brands().value()).toEqual([]);

    open(fixture);
    clickOption(fixture, 0); // BMW
    clickOption(fixture, 3); // Mini

    expect(host.myForm.brands().value()).toEqual(['BMW', 'Mini']);
  }));

  it('removes a re-clicked option from the model array (view -> model, remove)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormMultiSelect);
    const host = fixture.componentInstance;

    open(fixture);
    clickOption(fixture, 0); // BMW -> add
    clickOption(fixture, 1); // Audi -> add
    expect(host.myForm.brands().value()).toEqual(['BMW', 'Audi']);

    clickOption(fixture, 0); // BMW -> remove
    expect(host.myForm.brands().value()).toEqual(['Audi']);
  }));

  it('marks the field as touched on blur after the panel closes', fakeAsync(() => {
    const fixture = setup(BasicSignalFormMultiSelect);
    const host = fixture.componentInstance;

    open(fixture);
    expect(host.myForm.brands().touched()).toBeFalse();

    // Close the overlay, then blur the trigger.
    getBackdrop().click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    trigger(fixture).dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    flush();

    expect(host.myForm.brands().touched()).toBeTrue();
  }));

  it('wires up the required validator (empty array is invalid)', fakeAsync(() => {
    const fixture = setup(RequiredSignalFormMultiSelect);
    const host = fixture.componentInstance;
    tick();

    expect(host.myForm().invalid()).toBeTrue();
    expect(host.myForm.brands().errors().length).toBeGreaterThan(0);

    open(fixture);
    clickOption(fixture, 0); // BMW

    expect(host.myForm.brands().value()).toEqual(['BMW']);
    expect(host.myForm().valid()).toBeTrue();
    expect(host.myForm.brands().errors().length).toBe(0);
  }));

  it('disables the multi-select via the disabled() schema rule', fakeAsync(() => {
    const fixture = setup(DisabledSignalFormMultiSelect);
    const host = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(host.myForm.brands().disabled()).toBeTrue();
    expect(host.multiSelect.disabled).toBeTrue();

    // A disabled multi-select must not open on click.
    trigger(fixture).click();
    fixture.detectChanges();
    flush();
    expect(overlayContainer.getContainerElement().querySelector('.panel')).toBeFalsy();
  }));
});
