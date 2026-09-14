import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxMultiProgressIndicatorComponent } from './multi-progress-indicator.component';
import { NxMultiProgressIndicatorIntl } from './multi-progress-indicator.intl';
import { NxMultiProgressStepComponent } from './multi-progress-step.component';

describe('NxMultiProgressStepComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let stepElement: DebugElement;

  function createTestComponent(template: string) {
    TestBed.overrideComponent(TestComponent, { set: { template } });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    stepElement = fixture.debugElement.query(By.css('nx-multi-progress-step'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxMultiProgressStepComponent, NxMultiProgressIndicatorComponent, TestComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement).toBeTruthy();
  });

  it('is not interactive by default: no role, tabindex, or click handling', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement.nativeElement.getAttribute('role')).toBe('listitem');
    expect(stepElement.nativeElement.getAttribute('tabindex')).toBeNull();
  });

  it('projects a link as the only interactive element', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed><a href="#">Step</a></nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a'));
    expect(link).toBeTruthy();
    expect(stepElement.nativeElement.querySelector('[role="button"]')).toBeNull();
  });

  it('numbered bullet shows the index and never a checkmark, even when completed', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Billing</nx-multi-progress-step>
        <nx-multi-progress-step>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step completed>Review</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const thirdStep = fixture.debugElement.queryAll(By.css('nx-multi-progress-step'))[2];

    const bullet = thirdStep.query(By.css('.nx-multi-progress-step__bullet'));
    expect(bullet.nativeElement.textContent.trim()).toBe('3');
    expect(bullet.query(By.css('nx-icon'))).toBeFalsy();
  });

  it('unnumbered + completed shows a checkmark instead of the index', () => {
    createTestComponent(`
      <nx-multi-progress-indicator numbered="false">
        <nx-multi-progress-step completed>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);

    const bullet = stepElement.query(By.css('.nx-multi-progress-step__bullet'));
    expect(bullet.query(By.css('nx-icon'))).toBeTruthy();
  });

  it('critical takes precedence over the checkmark/number, even when also completed and numbered', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed critical>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bullet = stepElement.query(By.css('.nx-multi-progress-step__bullet'));
    expect(bullet.nativeElement.textContent.trim()).toBe('!');
    expect(bullet.query(By.css('nx-icon'))).toBeFalsy();
    expect(stepElement.nativeElement.classList.contains('is-critical')).toBe(true);
  });

  it('shows a visually-hidden "Completed: " prefix when completed', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const hidden = stepElement.query(By.css('.nx-visually-hidden'));
    expect(hidden.nativeElement.textContent.trim()).toBe('Completed:');
  });

  it('shows a visually-hidden "Current: " prefix when current and sets aria-current', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const hidden = stepElement.query(By.css('.nx-visually-hidden'));
    expect(hidden.nativeElement.textContent.trim()).toBe('Current:');
    expect(stepElement.nativeElement.getAttribute('aria-current')).toBe('step');
  });

  it('reads the visually-hidden prefixes from a provided NxMultiProgressIndicatorIntl', () => {
    TestBed.overrideProvider(NxMultiProgressIndicatorIntl, {
      useValue: {
        completedLabel: signal('Abgeschlossen: '),
        currentLabel: signal('Aktuell: '),
      },
    });
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>Step 1</nx-multi-progress-step>
        <nx-multi-progress-step current>Step 2</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);

    const hidden = fixture.debugElement.queryAll(By.css('.nx-visually-hidden'));
    expect(hidden[0].nativeElement.textContent.trim()).toBe('Abgeschlossen:');
    expect(hidden[1].nativeElement.textContent.trim()).toBe('Aktuell:');
  });

  it('does not set aria-current when not the current step', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement.nativeElement.getAttribute('aria-current')).toBeNull();
  });

  it('does not render a trailing bar for a plain incomplete step', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement.query(By.css('.nx-multi-progress-step__bar'))).toBeFalsy();
  });

  it('does not render a trailing bar for a completed step', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement.query(By.css('.nx-multi-progress-step__bar'))).toBeFalsy();
  });

  it('renders a trailing bar only for the current step, unless it is the last step', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>Step</nx-multi-progress-step>
        <nx-multi-progress-step>Next</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    expect(stepElement.query(By.css('.nx-multi-progress-step__bar'))).toBeTruthy();
  });

  it('does not render a trailing bar for the current step when it is also the last step', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>Step</nx-multi-progress-step>
        <nx-multi-progress-step current>Last</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const lastStep = fixture.debugElement.queryAll(By.css('nx-multi-progress-step'))[1];
    expect(lastStep.query(By.css('.nx-multi-progress-step__bar'))).toBeFalsy();
  });
});

@Component({
  template: '',
  imports: [NxMultiProgressStepComponent, NxMultiProgressIndicatorComponent],
})
class TestComponent {
  isCurrent = true;
}
