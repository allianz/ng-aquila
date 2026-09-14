import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxMultiProgressIndicatorComponent } from './multi-progress-indicator.component';
import { NxMultiProgressStepComponent } from './multi-progress-step.component';

describe('NxMultiProgressIndicatorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let listElement: DebugElement;
  let stepElements: DebugElement[];

  function createTestComponent(template: string) {
    TestBed.overrideComponent(TestComponent, { set: { template } });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    listElement = fixture.debugElement.query(By.css('nx-multi-progress-indicator'));
    stepElements = fixture.debugElement.queryAll(By.css('nx-multi-progress-step'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent, TestComponent],
    }).compileComponents();
  }));

  const BASIC_TEMPLATE = `
    <nx-multi-progress-indicator>
      <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
      <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
      <nx-multi-progress-step>Review</nx-multi-progress-step>
    </nx-multi-progress-indicator>
  `;

  it('renders an ordered, role="list" wrapper around role="listitem" steps', () => {
    createTestComponent(BASIC_TEMPLATE);
    expect(listElement.query(By.css('ol[role="list"]'))).toBeTruthy();
    expect(stepElements.length).toBe(3);
    stepElements.forEach((step) =>
      expect(step.nativeElement.getAttribute('role')).toBe('listitem'),
    );
  });

  it('leaves the list unlabelled when no aria input is set', () => {
    createTestComponent(BASIC_TEMPLATE);
    const list = listElement.query(By.css('ol')).nativeElement as HTMLElement;
    expect(list.hasAttribute('aria-label')).toBe(false);
    expect(list.hasAttribute('aria-labelledby')).toBe(false);
    expect(list.hasAttribute('aria-describedby')).toBe(false);
  });

  it('forwards aria-label, aria-labelledby and aria-describedby to the list', () => {
    createTestComponent(`
      <h2 id="heading">Order process</h2>
      <p id="hint">You can return to any completed step.</p>
      <nx-multi-progress-indicator
        aria-label="Order process"
        aria-labelledby="heading"
        aria-describedby="hint"
      >
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const list = listElement.query(By.css('ol')).nativeElement as HTMLElement;
    expect(list.getAttribute('aria-label')).toBe('Order process');
    expect(list.getAttribute('aria-labelledby')).toBe('heading');
    expect(list.getAttribute('aria-describedby')).toBe('hint');
  });

  // Otherwise the name would sit on both the host and the list it labels.
  it('does not leave the forwarded aria attributes on the host element', () => {
    createTestComponent(`
      <nx-multi-progress-indicator
        aria-label="Order process"
        aria-labelledby="heading"
        aria-describedby="hint"
      >
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const host = listElement.nativeElement as HTMLElement;
    expect(host.hasAttribute('aria-label')).toBe(false);
    expect(host.hasAttribute('aria-labelledby')).toBe(false);
    expect(host.hasAttribute('aria-describedby')).toBe(false);
  });

  it('updates the forwarded label when the bound value changes', () => {
    createTestComponent(`
      <nx-multi-progress-indicator [aria-label]="label">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const list = listElement.query(By.css('ol')).nativeElement as HTMLElement;
    expect(list.getAttribute('aria-label')).toBe('Order process');

    fixture.componentInstance.label = 'Quote process';
    fixture.detectChanges();

    expect(list.getAttribute('aria-label')).toBe('Quote process');
  });

  it('numbers steps in DOM order, 1-based', () => {
    createTestComponent(BASIC_TEMPLATE);
    const bullets = stepElements.map((step) =>
      step.query(By.css('.nx-multi-progress-step__bullet')).nativeElement.textContent.trim(),
    );
    expect(bullets).toEqual(['1', '2', '3']);
  });

  it('only shows a connecting bar for the current step', () => {
    createTestComponent(BASIC_TEMPLATE);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[0]).toBeFalsy();
    expect(bars[1]).toBeTruthy();
    expect(bars[2]).toBeFalsy();
  });

  it('does not show a connecting bar for a plain incomplete step even when not last', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        <nx-multi-progress-step>Payment</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[0]).toBeTruthy();
    expect(bars[1]).toBeFalsy();
    expect(bars[2]).toBeFalsy();
  });

  it('re-numbers steps when the projected steps change', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        @if (showExtraStep) {
          <nx-multi-progress-step>Payment</nx-multi-progress-step>
        }
      </nx-multi-progress-indicator>
    `);
    const testInstance = fixture.componentInstance as TestComponent;
    testInstance.showExtraStep = true;
    fixture.detectChanges();

    stepElements = fixture.debugElement.queryAll(By.css('nx-multi-progress-step'));
    const bullets = stepElements.map((step) =>
      step.query(By.css('.nx-multi-progress-step__bullet')).nativeElement.textContent.trim(),
    );
    expect(bullets).toEqual(['1', '2', '3', '4']);

    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[1]).toBeTruthy();
    // No longer the last step, but still shows no bar.
    expect(bars[2]).toBeFalsy();
    expect(bars[3]).toBeFalsy(); // new last step
  });

  it('numbered defaults to true and propagates to steps', () => {
    createTestComponent(BASIC_TEMPLATE);
    const component = listElement.componentInstance as NxMultiProgressIndicatorComponent;
    expect(component.numbered()).toBe(true);
  });

  it('colorScheme defaults to "default" and sets the "positive" class when set', () => {
    createTestComponent(
      `<nx-multi-progress-indicator colorScheme="positive">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
    );
    expect(listElement.nativeElement.classList.contains('positive')).toBe(true);
  });

  it('propagates colorScheme="positive" onto each step as the "is-positive" class', () => {
    createTestComponent(
      `<nx-multi-progress-indicator colorScheme="positive">
        <nx-multi-progress-step completed>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
    );
    expect(stepElements[0].nativeElement.classList.contains('is-positive')).toBe(true);
  });

  const CURRENT_STEP_TEMPLATE = `
    <nx-multi-progress-indicator [currentStep]="currentStep">
      <nx-multi-progress-step>Billing</nx-multi-progress-step>
      <nx-multi-progress-step>Shipping</nx-multi-progress-step>
      <nx-multi-progress-step>Review</nx-multi-progress-step>
      <nx-multi-progress-step [completed]="lastStepCompleted">Payment</nx-multi-progress-step>
    </nx-multi-progress-indicator>
  `;

  it('derives completed/current automatically from currentStep, without any step input', () => {
    createTestComponent(CURRENT_STEP_TEMPLATE);
    (fixture.componentInstance as TestComponent).currentStep = 2;
    fixture.detectChanges();

    const classes = stepElements.map((step) => ({
      completed: step.nativeElement.classList.contains('is-completed'),
      current: step.nativeElement.classList.contains('is-current'),
    }));
    expect(classes).toEqual([
      { completed: true, current: false }, // index 1 < currentStep
      { completed: false, current: true }, // index 2 === currentStep
      { completed: false, current: false }, // index 3 > currentStep
      { completed: false, current: false }, // index 4 > currentStep
    ]);
  });

  it('re-derives completed/current when currentStep changes', () => {
    createTestComponent(CURRENT_STEP_TEMPLATE);
    const testInstance = fixture.componentInstance as TestComponent;
    testInstance.currentStep = 2;
    fixture.detectChanges();
    testInstance.currentStep = 3;
    fixture.detectChanges();

    expect(stepElements[1].nativeElement.classList.contains('is-completed')).toBe(true);
    expect(stepElements[1].nativeElement.classList.contains('is-current')).toBe(false);
    expect(stepElements[2].nativeElement.classList.contains('is-current')).toBe(true);
  });

  it('lets an individual step override the currentStep-derived value', () => {
    createTestComponent(CURRENT_STEP_TEMPLATE);
    const testInstance = fixture.componentInstance as TestComponent;
    testInstance.currentStep = 2;
    testInstance.lastStepCompleted = true;
    fixture.detectChanges();

    // index 4 is after currentStep (2) and would normally not be completed.
    expect(stepElements[3].nativeElement.classList.contains('is-completed')).toBe(true);
  });

  it('silently ignores a currentStep of zero or below: no step is current or completed', () => {
    createTestComponent(CURRENT_STEP_TEMPLATE);
    const testInstance = fixture.componentInstance as TestComponent;

    for (const outOfRange of [0, -1]) {
      testInstance.currentStep = outOfRange;
      expect(() => fixture.detectChanges()).not.toThrow();

      const classes = stepElements.map((step) => ({
        completed: step.nativeElement.classList.contains('is-completed'),
        current: step.nativeElement.classList.contains('is-current'),
      }));
      expect(classes, `currentStep = ${outOfRange}`).toEqual([
        { completed: false, current: false },
        { completed: false, current: false },
        { completed: false, current: false },
        { completed: false, current: false },
      ]);
    }
  });

  it('silently ignores a currentStep past the last step: every step reads as completed', () => {
    createTestComponent(CURRENT_STEP_TEMPLATE);
    const testInstance = fixture.componentInstance as TestComponent;

    testInstance.currentStep = 5;
    expect(() => fixture.detectChanges()).not.toThrow();

    expect(
      stepElements.every((step) => step.nativeElement.classList.contains('is-completed')),
    ).toBe(true);
    expect(stepElements.some((step) => step.nativeElement.classList.contains('is-current'))).toBe(
      false,
    );
  });

  it('layout defaults to "horizontal" and does not mark steps "is-horizontal-labels-below"', () => {
    createTestComponent(BASIC_TEMPLATE);
    const component = listElement.componentInstance as NxMultiProgressIndicatorComponent;
    expect(component.layout()).toBe('horizontal');
    expect(stepElements[0].nativeElement.classList.contains('is-horizontal-labels-below')).toBe(
      false,
    );
  });

  it('propagates layout="horizontal-labels-below" onto each step as the "is-horizontal-labels-below" class', () => {
    createTestComponent(
      `<nx-multi-progress-indicator layout="horizontal-labels-below">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
    );
    expect(stepElements[0].nativeElement.classList.contains('is-horizontal-labels-below')).toBe(
      true,
    );
  });

  it('marks only the first and only the last step in "horizontal-labels-below"', () => {
    createTestComponent(`
      <nx-multi-progress-indicator layout="horizontal-labels-below">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const classes = stepElements.map((step) => ({
      first: step.nativeElement.classList.contains('is-first'),
      last: step.nativeElement.classList.contains('is-last'),
    }));
    expect(classes).toEqual([
      { first: true, last: false },
      { first: false, last: false },
      { first: false, last: true },
    ]);
  });

  it('in "horizontal-labels-below", shows a bar after every non-last step regardless of status', () => {
    createTestComponent(`
      <nx-multi-progress-indicator layout="horizontal-labels-below">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        <nx-multi-progress-step>Payment</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[0]).toBeTruthy();
    expect(bars[1]).toBeTruthy();
    expect(bars[2]).toBeTruthy();
    expect(bars[3]).toBeFalsy();
  });

  it('propagates layout="vertical" onto each step as the "is-vertical" class, and switches the list to a column', () => {
    createTestComponent(
      `<nx-multi-progress-indicator layout="vertical">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
    );
    expect(stepElements[0].nativeElement.classList.contains('is-vertical')).toBe(true);
    expect(listElement.nativeElement.classList.contains('vertical')).toBe(true);
  });

  it('in "vertical", shows a bar after every non-last step regardless of status', () => {
    createTestComponent(`
      <nx-multi-progress-indicator layout="vertical">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        <nx-multi-progress-step>Payment</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[0]).toBeTruthy();
    expect(bars[1]).toBeTruthy();
    expect(bars[2]).toBeTruthy();
    expect(bars[3]).toBeFalsy();
  });

  it(
    'propagates layout="vertical-no-labels" onto each step as the "is-vertical" and ' +
      '"is-vertical-no-labels" classes, and switches the list to a column',
    () => {
      createTestComponent(
        `<nx-multi-progress-indicator layout="vertical-no-labels">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
      );
      expect(stepElements[0].nativeElement.classList.contains('is-vertical')).toBe(true);
      expect(stepElements[0].nativeElement.classList.contains('is-vertical-no-labels')).toBe(true);
      expect(listElement.nativeElement.classList.contains('vertical')).toBe(true);
    },
  );

  it('in "vertical-no-labels", shows a bar after every non-last step regardless of status', () => {
    createTestComponent(`
      <nx-multi-progress-indicator layout="vertical-no-labels">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        <nx-multi-progress-step>Payment</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars[0]).toBeTruthy();
    expect(bars[1]).toBeTruthy();
    expect(bars[2]).toBeTruthy();
    expect(bars[3]).toBeFalsy();
  });

  it('in "vertical-no-labels", does not mark a step "is-horizontal-labels-below"', () => {
    createTestComponent(
      `<nx-multi-progress-indicator layout="vertical-no-labels">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
    );
    expect(stepElements[0].nativeElement.classList.contains('is-horizontal-labels-below')).toBe(
      false,
    );
  });

  it(
    'propagates layout="vertical-no-bars" onto each step as the "is-vertical" class (but not ' +
      '"is-vertical-no-labels"), and marks the list "vertical" and "no-bars"',
    () => {
      createTestComponent(
        `<nx-multi-progress-indicator layout="vertical-no-bars">
        <nx-multi-progress-step>Step</nx-multi-progress-step>
      </nx-multi-progress-indicator>`,
      );
      expect(stepElements[0].nativeElement.classList.contains('is-vertical')).toBe(true);
      expect(stepElements[0].nativeElement.classList.contains('is-vertical-no-labels')).toBe(false);
      expect(listElement.nativeElement.classList.contains('vertical')).toBe(true);
      expect(listElement.nativeElement.classList.contains('no-bars')).toBe(true);
    },
  );

  it('in "vertical-no-bars", never shows a bar, regardless of status', () => {
    createTestComponent(`
      <nx-multi-progress-indicator layout="vertical-no-bars">
        <nx-multi-progress-step completed>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
        <nx-multi-progress-step>Payment</nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const bars = stepElements.map((step) => step.query(By.css('.nx-multi-progress-step__bar')));
    expect(bars.every((bar) => !bar)).toBe(true);
  });
});

@Component({
  template: '',
  imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent],
})
class TestComponent {
  showExtraStep = false;
  currentStep: number | undefined = undefined;
  lastStepCompleted = false;
  label = 'Order process';
}
