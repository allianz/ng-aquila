import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { ErrorStateMatcher } from '@allianz/ng-aquila/utils';
import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxToggleButtonComponent } from './toggle-button.component';
import {
  NxToggleButtonColumnSizing,
  NxToggleButtonGroupComponent,
} from './toggle-button-group.component';

@Component({
  imports: [NxToggleButtonGroupComponent, NxToggleButtonComponent, NxLabelComponent],
  template: `
    <nx-toggle-button-group
      [(value)]="value"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [negative]="negative()"
      [maxColumns]="maxColumns()"
      [columnSizing]="columnSizing()"
      [autoGrid]="autoGrid()"
    >
      <nx-label>Payment interval</nx-label>
      <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
      <nx-toggle-button value="quarterly" [disabled]="secondDisabled()">Quarterly</nx-toggle-button>
      <nx-toggle-button value="yearly" [readonly]="thirdReadonly()">Yearly</nx-toggle-button>
    </nx-toggle-button-group>
  `,
})
class BasicToggleButtons {
  group = viewChild.required(NxToggleButtonGroupComponent);
  value = signal<string | null>(null);
  disabled = signal(false);
  readonly = signal(false);
  negative = signal(false);
  secondDisabled = signal(false);
  thirdReadonly = signal(false);
  maxColumns = signal<number | null>(null);
  columnSizing = signal<NxToggleButtonColumnSizing>('content');
  autoGrid = signal(true);
}

@Component({
  imports: [NxToggleButtonGroupComponent, NxToggleButtonComponent],
  template: `
    <nx-toggle-button-group name="interval">
      <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
      <nx-toggle-button value="yearly">Yearly</nx-toggle-button>
    </nx-toggle-button-group>
  `,
})
class NamedToggleButtons {}

@Component({
  imports: [
    ReactiveFormsModule,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxErrorComponent,
  ],
  template: `
    <form [formGroup]="form">
      <nx-toggle-button-group formControlName="interval">
        <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
        <nx-toggle-button value="yearly">Yearly</nx-toggle-button>
        <nx-error>Please choose an interval</nx-error>
      </nx-toggle-button-group>
    </form>
  `,
})
class ReactiveToggleButtons {
  group = viewChild.required(NxToggleButtonGroupComponent);
  form = new FormGroup({
    interval: new FormControl('', Validators.required),
  });
}

@Component({
  imports: [FormsModule, NxToggleButtonGroupComponent, NxToggleButtonComponent],
  template: `
    <nx-toggle-button-group [(ngModel)]="interval">
      <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
      <nx-toggle-button value="yearly">Yearly</nx-toggle-button>
    </nx-toggle-button-group>
  `,
})
class TemplateDrivenToggleButtons {
  interval: string | null = null;
}

/** Matches on `dirty`, for which the group has no input, so only the matcher can know it. */
class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null): boolean {
    return !!control?.invalid && !!control.dirty;
  }
}

describe('NxToggleButtonComponent', () => {
  function inputs(fixture: ComponentFixture<unknown>): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('input.nx-toggle-button__input'));
  }

  function hosts(fixture: ComponentFixture<unknown>): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('nx-toggle-button'));
  }

  function groupElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-toggle-button-group');
  }

  function radiogroupElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('.nx-toggle-button-group__buttons');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicToggleButtons,
        NamedToggleButtons,
        ReactiveToggleButtons,
        TemplateDrivenToggleButtons,
      ],
    }).compileComponents();
  }));

  describe('selection', () => {
    it('selects the clicked button and updates the value of the group', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      inputs(fixture)[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value()).toBe('quarterly');
      expect(inputs(fixture)[1].checked).toBe(true);
      expect(hosts(fixture)[1].classList).toContain('is-selected');
    });

    it('reflects the value of the group into the buttons', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.value.set('yearly');
      fixture.detectChanges();

      expect(inputs(fixture)[2].checked).toBe(true);
      expect(hosts(fixture)[0].classList).not.toContain('is-selected');
    });

    it('gives all buttons of a group the same input name', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      const names = new Set(inputs(fixture).map((input) => input.name));

      expect(names.size).toBe(1);
      expect(names.has(fixture.componentInstance.group().id)).toBe(true);
    });

    it('uses the name of the group for the inputs', () => {
      const fixture = TestBed.createComponent(NamedToggleButtons);
      fixture.detectChanges();

      inputs(fixture).forEach((input) => expect(input.name).toBe('interval'));
    });
  });

  describe('disabled', () => {
    it('disables all buttons when the group is disabled', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      inputs(fixture).forEach((input) => expect(input.disabled).toBe(true));
      hosts(fixture).forEach((host) => expect(host.classList).toContain('is-disabled'));
    });

    it('disables a single button', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.secondDisabled.set(true);
      fixture.detectChanges();

      expect(inputs(fixture)[1].disabled).toBe(true);
      expect(inputs(fixture)[0].disabled).toBe(false);
    });

    it('does not select a disabled button', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.secondDisabled.set(true);
      fixture.detectChanges();

      inputs(fixture)[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value()).toBeNull();
    });
  });

  describe('readonly', () => {
    it('does not change the value when a readonly group is clicked', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.value.set('monthly');
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      inputs(fixture)[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value()).toBe('monthly');
      expect(inputs(fixture)[1].checked).toBe(false);
    });

    it('does not change the value when a readonly button is clicked', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.thirdReadonly.set(true);
      fixture.detectChanges();

      inputs(fixture)[2].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value()).toBeNull();
      expect(hosts(fixture)[2].classList).toContain('is-readonly');
    });

    it('keeps the buttons focusable while readonly', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      inputs(fixture).forEach((input) => expect(input.disabled).toBe(false));
    });

    it('is switched on and off through the abstract control', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      fixture.componentInstance.group().setReadonly(true);
      fixture.detectChanges();

      expect(radiogroupElement(fixture).getAttribute('aria-readonly')).toBe('true');

      fixture.componentInstance.group().setReadonly(false);
      fixture.detectChanges();

      expect(radiogroupElement(fixture).getAttribute('aria-readonly')).toBeNull();
    });
  });

  describe('negative', () => {
    it('marks every button of a negative group', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.negative.set(true);
      fixture.detectChanges();

      hosts(fixture).forEach((host) => expect(host.classList).toContain('is-negative'));
    });

    it('is off by default', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      hosts(fixture).forEach((host) => expect(host.classList).not.toContain('is-negative'));
    });
  });

  describe('error state', () => {
    it('shows the error once the control is invalid and touched', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();

      fixture.componentInstance.form.controls.interval.markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('nx-error')).not.toBeNull();
      expect(radiogroupElement(fixture).getAttribute('aria-invalid')).toBe('true');
      hosts(fixture).forEach((host) => expect(host.classList).toContain('has-error'));
    });

    it('describes the buttons by the error', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.componentInstance.form.controls.interval.markAsTouched();
      fixture.detectChanges();

      const errorId = fixture.nativeElement.querySelector('.nx-error__content').id;

      expect(errorId).toBeTruthy();
      inputs(fixture).forEach((input) =>
        expect(input.getAttribute('aria-describedby')).toBe(errorId),
      );
    });

    it('hides the error again once the control becomes valid', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.componentInstance.form.controls.interval.markAsTouched();
      fixture.detectChanges();

      inputs(fixture)[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.form.value.interval).toBe('monthly');
      expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();
    });

    it('shows the error of an untouched control once the parent form was submitted', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      dispatchFakeEvent(fixture.nativeElement.querySelector('form'), 'submit');
      fixture.detectChanges();

      expect(fixture.componentInstance.form.controls.interval.touched).toBe(false);
      expect(fixture.nativeElement.querySelector('nx-error')).not.toBeNull();
    });
  });

  describe('custom error state matcher', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
      });
    });

    it('is used instead of the default one', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.componentInstance.form.controls.interval.markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();

      fixture.componentInstance.form.controls.interval.markAsDirty();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('nx-error')).not.toBeNull();
    });
  });

  describe('forms integration', () => {
    it('writes the value of the control into the group', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.componentInstance.form.setValue({ interval: 'yearly' });
      fixture.detectChanges();

      expect(inputs(fixture)[1].checked).toBe(true);
    });

    it('marks the control as touched when the focus leaves the group', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      dispatchFakeEvent(groupElement(fixture), 'focusout');
      fixture.detectChanges();

      expect(fixture.componentInstance.form.controls.interval.touched).toBe(true);
    });

    it('keeps the control untouched while the focus stays inside the group', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      groupElement(fixture).dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs(fixture)[1] }),
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.form.controls.interval.touched).toBe(false);
    });

    it('disables the group through the control', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.componentInstance.form.controls.interval.disable();
      fixture.detectChanges();

      expect(fixture.componentInstance.group().disabled()).toBe(true);
      inputs(fixture).forEach((input) => expect(input.disabled).toBe(true));
    });

    it('marks the group as required through the validators of the control', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      expect(radiogroupElement(fixture).getAttribute('aria-required')).toBe('true');
    });

    // The group is a pure signal forms control: reactive and template-driven forms drive it through
    // the `FormValueControl` contract, not through a control value accessor.
    it('does not register a control value accessor', () => {
      const fixture = TestBed.createComponent(ReactiveToggleButtons);
      fixture.detectChanges();

      const ngControl = fixture.debugElement
        .query((node) => node.nativeElement === groupElement(fixture))
        .injector.get(NgControl);

      expect(ngControl.valueAccessor).toBeNull();
    });

    it('writes the selection into a template-driven model', fakeAsync(() => {
      const fixture = TestBed.createComponent(TemplateDrivenToggleButtons);
      fixture.detectChanges();
      tick();

      inputs(fixture)[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.interval).toBe('yearly');
    }));

    it('writes a template-driven model into the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(TemplateDrivenToggleButtons);
      fixture.componentInstance.interval = 'monthly';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(inputs(fixture)[0].checked).toBe(true);
    }));
  });

  describe('accessibility', () => {
    it('is a radio group labelled by the label', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('nx-label label');

      expect(radiogroupElement(fixture).getAttribute('role')).toBe('radiogroup');
      expect(radiogroupElement(fixture).getAttribute('aria-labelledby')).toBe(label.id);
    });

    it('marks a readonly group as readonly, not as disabled', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(radiogroupElement(fixture).getAttribute('aria-readonly')).toBe('true');
      expect(radiogroupElement(fixture).getAttribute('aria-disabled')).toBeNull();
    });
  });

  describe('layout', () => {
    function rowsOf(fixture: ComponentFixture<unknown>, width: string): number {
      groupElement(fixture).style.width = width;
      return new Set(hosts(fixture).map((host) => host.offsetTop)).size;
    }

    it('sizes the buttons by their content by default', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.detectChanges();

      expect(radiogroupElement(fixture).classList).toContain(
        'nx-toggle-button-group__buttons--content',
      );
    });

    it('switches to equally wide columns', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.columnSizing.set('equal');
      fixture.detectChanges();

      expect(radiogroupElement(fixture).classList).toContain(
        'nx-toggle-button-group__buttons--equal',
      );
      expect(radiogroupElement(fixture).classList).not.toContain(
        'nx-toggle-button-group__buttons--content',
      );
    });

    // Without the auto grid no layout is applied at all, not even the one of the content sizing, so
    // that the consumer can lay the buttons out themselves.
    it('applies no layout while the auto grid is switched off', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.autoGrid.set(false);
      fixture.componentInstance.columnSizing.set('equal');
      fixture.detectChanges();

      expect(radiogroupElement(fixture).classList).not.toContain(
        'nx-toggle-button-group__buttons--content',
      );
      expect(radiogroupElement(fixture).classList).not.toContain(
        'nx-toggle-button-group__buttons--equal',
      );
    });

    it('passes the maximum number of columns to the styles', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.maxColumns.set(3);
      fixture.detectChanges();

      expect(groupElement(fixture).style.getPropertyValue('--nx-auto-grid-max-columns')).toBe('3');
    });

    // The column cap is a minimum width, which is the opposite of sizing the buttons by their
    // content, so it only applies to the equal sizing.
    it('ignores the maximum number of columns while the buttons are sized by their content', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.maxColumns.set(2);
      fixture.detectChanges();

      expect(rowsOf(fixture, '600px')).toBe(1);
    });

    it('wraps into the next row once the columns are capped with equal sizing', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.maxColumns.set(2);
      fixture.componentInstance.columnSizing.set('equal');
      fixture.detectChanges();

      expect(rowsOf(fixture, '600px')).toBe(2);
    });
  });

  describe('focus', () => {
    it('focuses the selected button', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.value.set('yearly');
      fixture.detectChanges();

      fixture.componentInstance.group().focus();

      expect(document.activeElement).toBe(inputs(fixture)[2]);
    });

    it('focuses the first selectable button when nothing is selected', () => {
      const fixture = TestBed.createComponent(BasicToggleButtons);
      fixture.componentInstance.secondDisabled.set(true);
      fixture.detectChanges();

      fixture.componentInstance.group().focus();

      expect(document.activeElement).toBe(inputs(fixture)[0]);
    });
  });
});
