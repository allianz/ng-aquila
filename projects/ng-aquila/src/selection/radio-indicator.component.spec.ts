import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxRadioIndicatorComponent } from './radio-indicator.component';
import { NxSelectionIndicatorColorScheme } from './types';

@Component({
  template: `<nx-radio-indicator
    [checked]="checked"
    [disabled]="disabled"
    [readonly]="readonly"
    [critical]="critical"
    [inverse]="inverse"
    [animations]="animations"
    [colorScheme]="colorScheme"
  />`,
  imports: [NxRadioIndicatorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
  checked = false;
  disabled = false;
  readonly = false;
  critical = false;
  inverse = false;
  animations = true;
  colorScheme: NxSelectionIndicatorColorScheme = 'default';
}

describe('NxRadioIndicatorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let indicator: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    indicator = fixture.debugElement.query(By.directive(NxRadioIndicatorComponent));
    fixture.detectChanges();
  });

  const classes = () => (indicator.nativeElement as HTMLElement).classList;

  it('applies no state classes by default', () => {
    expect(classes()).not.toContain('checked');
    expect(classes()).not.toContain('disabled');
    expect(classes()).not.toContain('readonly');
    expect(classes()).not.toContain('critical');
    expect(classes()).not.toContain('inverse');
    expect(classes()).not.toContain('on-selection');
  });

  for (const input of ['checked', 'disabled', 'readonly', 'critical', 'inverse'] as const) {
    it(`reflects the ${input} input as a host class`, () => {
      host[input] = true;
      fixture.detectChanges();

      expect(classes()).toContain(input);
    });
  }

  it('applies the on-selection class only for the on-selection color scheme', () => {
    host.colorScheme = 'on-selection';
    fixture.detectChanges();
    expect(classes()).toContain('on-selection');

    host.colorScheme = 'default';
    fixture.detectChanges();
    expect(classes()).not.toContain('on-selection');
  });

  it('applies no-animation when animations are off', () => {
    expect(classes()).not.toContain('no-animation');

    host.animations = false;
    fixture.detectChanges();

    expect(classes()).toContain('no-animation');
  });

  it('combines inverse with the checked and critical states', () => {
    host.inverse = true;
    host.checked = true;
    host.critical = true;
    fixture.detectChanges();

    expect(classes()).toContain('inverse');
    expect(classes()).toContain('checked');
    expect(classes()).toContain('critical');
  });

  it('is accessible', async () => {
    await expect(fixture.nativeElement).toBeAccessible();
  });
});
