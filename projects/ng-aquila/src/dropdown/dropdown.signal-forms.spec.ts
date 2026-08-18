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
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { NxDropdownComponent } from './dropdown';
import { NxDropdownModule } from './dropdown.module';

/**
 * Signal forms (Angular 22) coverage for `NxDropdownComponent` when bound with `[formField]`.
 * The dropdown is a `ControlValueAccessor` (registers itself via `ngControl.valueAccessor`),
 * so `[formField]` binds through the backwards-compat interop path.
 */

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brand">
      <nx-dropdown [formField]="myForm.brand">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
        <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
        <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
      </nx-dropdown>
    </nx-formfield>
  `,
})
class BasicSignalFormDropdown {
  @ViewChild(NxDropdownComponent) dropdown!: NxDropdownComponent;
  readonly model = signal({ brand: '' });
  readonly myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brand">
      <nx-dropdown [formField]="myForm.brand">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
      </nx-dropdown>
    </nx-formfield>
  `,
})
class RequiredSignalFormDropdown {
  @ViewChild(NxDropdownComponent) dropdown!: NxDropdownComponent;
  readonly model = signal({ brand: '' });
  readonly myForm = form(this.model, (schema) => {
    required(schema.brand, { message: 'Brand is required' });
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxDropdownModule, NxFormfieldModule, FormField],
  template: `
    <nx-formfield label="Car brand">
      <nx-dropdown [formField]="myForm.brand">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
      </nx-dropdown>
    </nx-formfield>
  `,
})
class DisabledSignalFormDropdown {
  @ViewChild(NxDropdownComponent) dropdown!: NxDropdownComponent;
  readonly model = signal({ brand: '' });
  readonly myForm = form(this.model, (schema) => {
    disabled(schema.brand, { when: () => true });
  });
}

describe('NxDropdownComponent signal forms', () => {
  let overlayContainer: OverlayContainer;

  function setup<T>(component: new (...args: any[]) => T): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  function trigger(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement;
  }

  function rendered(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('.nx-dropdown__rendered') as HTMLElement;
  }

  function open(fixture: ComponentFixture<unknown>) {
    trigger(fixture).click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function overlayItems(): HTMLElement[] {
    return Array.from(
      overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item'),
    ) as HTMLElement[];
  }

  function clickItem(fixture: ComponentFixture<unknown>, index: number) {
    overlayItems()[index].click();
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
      imports: [BasicSignalFormDropdown, RequiredSignalFormDropdown, DisabledSignalFormDropdown],
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('reflects the model value into the selected option (model -> view)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormDropdown);
    const host = fixture.componentInstance;

    host.model.update((m) => ({ ...m, brand: 'Audi' }));
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(rendered(fixture).textContent!.trim()).toBe('Audi');
    expect(host.dropdown.triggerValue).toBe('Audi');
  }));

  it('writes the clicked option back into the form model (view -> model)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormDropdown);
    const host = fixture.componentInstance;

    expect(host.myForm.brand().value()).toBe('');

    open(fixture);
    clickItem(fixture, 2); // Volvo

    expect(host.myForm.brand().value()).toBe('Volvo');
    expect(rendered(fixture).textContent!.trim()).toBe('Volvo');
  }));

  it('marks the field as touched once the panel closes (blur)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormDropdown);
    const host = fixture.componentInstance;

    open(fixture);
    expect(host.myForm.brand().touched()).toBeFalse();

    getBackdrop().click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(host.myForm.brand().touched()).toBeTrue();
  }));

  it('wires up the required validator', fakeAsync(() => {
    const fixture = setup(RequiredSignalFormDropdown);
    const host = fixture.componentInstance;
    tick();

    expect(host.myForm().invalid()).toBeTrue();
    expect(host.myForm.brand().errors().length).toBeGreaterThan(0);

    open(fixture);
    clickItem(fixture, 0); // BMW

    expect(host.myForm.brand().value()).toBe('BMW');
    expect(host.myForm().valid()).toBeTrue();
    expect(host.myForm.brand().errors().length).toBe(0);
  }));

  it('disables the dropdown via the disabled() schema rule', fakeAsync(() => {
    const fixture = setup(DisabledSignalFormDropdown);
    const host = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(host.myForm.brand().disabled()).toBeTrue();
    expect(host.dropdown.disabled).toBeTrue();

    const dropdownEl = fixture.nativeElement.querySelector('nx-dropdown') as HTMLElement;
    expect(dropdownEl).toHaveClass('nx-dropdown--disabled');

    // A disabled dropdown must not open on click.
    trigger(fixture).click();
    fixture.detectChanges();
    flush();
    expect(overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel')).toBeFalsy();
  }));
});
