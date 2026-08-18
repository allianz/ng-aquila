import { NxInputModule } from '@allianz/ng-aquila/input';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal, ViewChild } from '@angular/core';
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

import { NxAutocompleteModule } from './autocomplete.module';
import { NxAutocompleteTriggerDirective } from './autocomplete-trigger.directive';

/**
 * Signal forms (Angular 22) coverage for the `nxAutocomplete` trigger directive when bound with
 * `[formField]`. The directive lives on a native `<input>` and provides `NG_VALUE_ACCESSOR`, so
 * `[formField]` binds to it through the backwards-compat interop path. The model field is a single
 * string value.
 *
 * Note: the options are projected and filtered from the model signal (rather than using the
 * `nxAutocompleteItems` callback) because `[formField]` overrides the directive's internal
 * `_onChange`, which the `nxAutocompleteItems` value stream relies on for a bare input.
 */

const DATA = ['Apple', 'Apricot', 'Banana', 'Cherry'];

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxAutocompleteModule, NxInputModule, FormField],
  template: `
    <input type="text" aria-label="fruit" [formField]="myForm.fruit" [nxAutocomplete]="auto" />
    <nx-autocomplete #auto>
      @for (item of filtered(); track item) {
        <nx-autocomplete-option [value]="item">{{ item }}</nx-autocomplete-option>
      }
    </nx-autocomplete>
  `,
})
class BasicSignalFormAutocomplete {
  @ViewChild(NxAutocompleteTriggerDirective) trigger!: NxAutocompleteTriggerDirective;
  readonly model = signal({ fruit: '' });
  readonly myForm = form(this.model);
  readonly filtered = computed(() => {
    const query = this.model().fruit.toLowerCase();
    return DATA.filter((item) => item.toLowerCase().includes(query));
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxAutocompleteModule, NxInputModule, FormField],
  template: `
    <input type="text" aria-label="fruit" [formField]="myForm.fruit" [nxAutocomplete]="auto" />
    <nx-autocomplete #auto>
      @for (item of filtered(); track item) {
        <nx-autocomplete-option [value]="item">{{ item }}</nx-autocomplete-option>
      }
    </nx-autocomplete>
  `,
})
class RequiredSignalFormAutocomplete {
  @ViewChild(NxAutocompleteTriggerDirective) trigger!: NxAutocompleteTriggerDirective;
  readonly model = signal({ fruit: '' });
  readonly myForm = form(this.model, (schema) => {
    required(schema.fruit, { message: 'Fruit is required' });
  });
  readonly filtered = computed(() => {
    const query = this.model().fruit.toLowerCase();
    return DATA.filter((item) => item.toLowerCase().includes(query));
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, NxAutocompleteModule, NxInputModule, FormField],
  template: `
    <input type="text" aria-label="fruit" [formField]="myForm.fruit" [nxAutocomplete]="auto" />
    <nx-autocomplete #auto>
      @for (item of DATA; track item) {
        <nx-autocomplete-option [value]="item">{{ item }}</nx-autocomplete-option>
      }
    </nx-autocomplete>
  `,
})
class DisabledSignalFormAutocomplete {
  @ViewChild(NxAutocompleteTriggerDirective) trigger!: NxAutocompleteTriggerDirective;
  readonly DATA = DATA;
  readonly model = signal({ fruit: '' });
  readonly myForm = form(this.model, (schema) => {
    disabled(schema.fruit, { when: () => true });
  });
}

describe('NxAutocompleteTriggerDirective signal forms', () => {
  let overlayContainer: OverlayContainer;

  function setup<T>(component: new (...args: any[]) => T): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  function input(fixture: ComponentFixture<unknown>): HTMLInputElement {
    return fixture.nativeElement.querySelector('input') as HTMLInputElement;
  }

  function typeInto(fixture: ComponentFixture<unknown>, value: string) {
    const el = input(fixture);
    el.focus();
    el.value = value;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function panel(): HTMLElement | null {
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-autocomplete-panel') as HTMLElement | null;
  }

  function items(): HTMLElement[] {
    return Array.from(
      overlayContainer.getContainerElement().querySelectorAll('.nx-autocomplete-option'),
    ) as HTMLElement[];
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicSignalFormAutocomplete,
        RequiredSignalFormAutocomplete,
        DisabledSignalFormAutocomplete,
      ],
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('reflects the model value into the input (model -> view)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormAutocomplete);
    const host = fixture.componentInstance;

    host.model.update((m) => ({ ...m, fruit: 'Banana' }));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(input(fixture).value).toBe('Banana');
  }));

  it('filters as the user types and writes the picked option back into the model (view -> model)', fakeAsync(() => {
    const fixture = setup(BasicSignalFormAutocomplete);
    const host = fixture.componentInstance;

    typeInto(fixture, 'Ap');
    expect(panel()).toBeTruthy();
    // 'Apple' and 'Apricot' match 'Ap'.
    expect(items().length).toBe(2);

    items()[1].click(); // Apricot
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(host.myForm.fruit().value()).toBe('Apricot');
    expect(input(fixture).value).toBe('Apricot');
    expect(panel()).toBeFalsy();
  }));

  it('marks the field as touched on blur', fakeAsync(() => {
    const fixture = setup(BasicSignalFormAutocomplete);
    const host = fixture.componentInstance;

    expect(host.myForm.fruit().touched()).toBeFalse();

    input(fixture).dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();

    expect(host.myForm.fruit().touched()).toBeTrue();
  }));

  it('wires up the required validator', fakeAsync(() => {
    const fixture = setup(RequiredSignalFormAutocomplete);
    const host = fixture.componentInstance;
    tick();

    expect(host.myForm().invalid()).toBeTrue();
    expect(host.myForm.fruit().errors().length).toBeGreaterThan(0);

    typeInto(fixture, 'Ba');
    items()[0].click(); // Banana
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(host.myForm.fruit().value()).toBe('Banana');
    expect(host.myForm().valid()).toBeTrue();
    expect(host.myForm.fruit().errors().length).toBe(0);
  }));

  it('disables the input via the disabled() schema rule', fakeAsync(() => {
    const fixture = setup(DisabledSignalFormAutocomplete);
    const host = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(host.myForm.fruit().disabled()).toBeTrue();
    expect(input(fixture).disabled).toBeTrue();

    // A disabled input must not open the autocomplete panel.
    input(fixture).focus();
    input(fixture).dispatchEvent(new Event('focusin'));
    fixture.detectChanges();
    tick();
    flush();
    expect(panel()).toBeFalsy();
  }));
});
