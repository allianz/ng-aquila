import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxCheckboxIndicatorComponent } from './checkbox-indicator.component';
import { NxCheckboxIndicatorColorScheme } from './types';

@Component({
  selector: 'test-checkbox-indicator-host',
  template: `<nx-checkbox-indicator
    [checked]="checked"
    [disabled]="disabled"
    [readonly]="readonly"
    [critical]="critical"
    [inverse]="inverse"
    [indeterminate]="indeterminate"
    [colorScheme]="colorScheme"
  />`,
  imports: [NxCheckboxIndicatorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
  checked = false;
  disabled = false;
  readonly = false;
  critical = false;
  inverse = false;
  indeterminate = false;
  colorScheme: NxCheckboxIndicatorColorScheme = 'default';
}

describe('NxCheckboxIndicatorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let indicator: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    indicator = fixture.debugElement.query(By.directive(NxCheckboxIndicatorComponent));
    fixture.detectChanges();
  });

  const classes = () => (indicator.nativeElement as HTMLElement).classList;
  const control = () =>
    indicator.query(By.css('.nx-checkbox__control')).nativeElement as HTMLElement;

  it('applies no state classes by default', () => {
    expect(classes()).not.toContain('disabled');
    expect(classes()).not.toContain('readonly');
    expect(classes()).not.toContain('critical');
    expect(classes()).not.toContain('inverse');
    expect(classes()).not.toContain('on-selection');
    expect(control().classList).not.toContain('checked');
  });

  for (const input of ['disabled', 'readonly', 'critical', 'inverse'] as const) {
    it(`reflects the ${input} input as a host class`, () => {
      host[input] = true;
      fixture.detectChanges();

      expect(classes()).toContain(input);
    });
  }

  // The SCSS keys off `:has(.checked)` on the control rather than a host class, so the state has
  // to stay on the inner element.
  it('marks the control as checked and shows the tick', () => {
    host.checked = true;
    fixture.detectChanges();

    expect(control().classList).toContain('checked');
    expect(indicator.query(By.css('nx-icon'))).not.toBeNull();
  });

  it('shows the indeterminate indicator', () => {
    expect(indicator.query(By.css('.nx-checkbox__indeterminate-indicator'))).toBeNull();

    host.indeterminate = true;
    fixture.detectChanges();

    expect(indicator.query(By.css('.nx-checkbox__indeterminate-indicator'))).not.toBeNull();
  });

  it('applies the on-selection class only for that color scheme', () => {
    host.colorScheme = 'on-selection';
    fixture.detectChanges();
    expect(classes()).toContain('on-selection');

    host.colorScheme = 'default';
    fixture.detectChanges();
    expect(classes()).not.toContain('on-selection');
  });

  for (const state of ['checked', 'disabled', 'readonly'] as const) {
    it(`keeps the on-selection class when ${state}`, () => {
      host.colorScheme = 'on-selection';
      host[state] = true;
      fixture.detectChanges();

      expect(classes()).toContain('on-selection');
    });
  }

  it('combines inverse with the on-selection, checked and critical states', () => {
    host.colorScheme = 'on-selection';
    host.inverse = true;
    host.checked = true;
    host.critical = true;
    fixture.detectChanges();

    expect(classes()).toContain('inverse');
    expect(classes()).toContain('on-selection');
    expect(classes()).toContain('critical');
    expect(control().classList).toContain('checked');
  });

  it('is accessible', async () => {
    await expect(fixture.nativeElement).toBeAccessible();
  });
});
