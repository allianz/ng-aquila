import { DOWN_ARROW, END, ENTER, ESCAPE, HOME, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxMultiProgressStepComponent } from '../multi/multi-progress-step.component';
import { NxProgressIndicatorStepActionComponent } from '../multi/progress-indicator-step-action.component';
import { NxCompactProgressIndicatorComponent } from './compact-progress-indicator.component';
import { NxCompactProgressIndicatorIntl } from './compact-progress-indicator.intl';

describe('NxCompactProgressIndicatorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let indicator: NxCompactProgressIndicatorComponent;
  let indicatorElement: DebugElement;

  function createTestComponent(template: string) {
    TestBed.overrideComponent(TestComponent, { set: { template } });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    indicatorElement = fixture.debugElement.query(By.css('nx-compact-progress-indicator'));
    indicator = indicatorElement.componentInstance;
  }

  /** The panel renders into the overlay container, not the fixture. */
  function panel(): HTMLElement | null {
    return document.querySelector('.nx-compact-progress-indicator__panel');
  }

  function triggerButton(): HTMLButtonElement | null {
    return indicatorElement.nativeElement.querySelector('button');
  }

  /** What a screen reader reads for the button, resolved from its `aria-labelledby`. */
  function buttonAccessibleName(): string {
    return triggerButton()!
      .getAttribute('aria-labelledby')!
      .split(' ')
      .map((id) => indicatorElement.nativeElement.querySelector(`#${id}`).textContent.trim())
      .join(' ');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxCompactProgressIndicatorComponent,
        NxMultiProgressStepComponent,
        NxProgressIndicatorStepActionComponent,
        TestComponent,
      ],
    }).compileComponents();
  }));

  afterEach(() => {
    indicator?.close();
    fixture?.destroy();
  });

  const BASIC_TEMPLATE = `
    <nx-compact-progress-indicator [currentStep]="currentStep" expandLabel="Steps">
      <nx-multi-progress-step>Billing</nx-multi-progress-step>
      <nx-multi-progress-step>Shipping</nx-multi-progress-step>
      <nx-multi-progress-step>Review</nx-multi-progress-step>
    </nx-compact-progress-indicator>
  `;

  it('renders an "X of Y" counter from currentStep and the number of steps', () => {
    createTestComponent(BASIC_TEMPLATE);
    const counter = indicatorElement.query(By.css('.nx-compact-progress-indicator__counter'))
      .nativeElement as HTMLElement;
    expect(counter.textContent?.trim()).toBe('2 of 3');
  });

  it('falls back to the step that sets its own "current" when no currentStep is given', () => {
    createTestComponent(`
      <nx-compact-progress-indicator>
        <nx-multi-progress-step>Billing</nx-multi-progress-step>
        <nx-multi-progress-step current>Shipping</nx-multi-progress-step>
        <nx-multi-progress-step>Review</nx-multi-progress-step>
      </nx-compact-progress-indicator>
    `);
    const counter = indicatorElement.query(By.css('.nx-compact-progress-indicator__counter'))
      .nativeElement as HTMLElement;
    expect(counter.textContent?.trim()).toBe('2 of 3');
  });

  it('keeps the panel closed until the button is clicked', () => {
    createTestComponent(BASIC_TEMPLATE);
    expect(panel()).toBeNull();
    expect(triggerButton()!.getAttribute('aria-expanded')).toBe('false');

    triggerButton()!.click();
    fixture.detectChanges();

    expect(panel()).toBeTruthy();
    expect(triggerButton()!.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes the panel again on a second click', () => {
    createTestComponent(BASIC_TEMPLATE);
    triggerButton()!.click();
    fixture.detectChanges();
    triggerButton()!.click();
    fixture.detectChanges();

    expect(panel()).toBeNull();
    expect(indicator.opened).toBe(false);
  });

  it('closes the panel on escape', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    dispatchKeyboardEvent(
      indicatorElement.nativeElement.querySelector('button'),
      'keydown',
      ESCAPE,
    );
    fixture.detectChanges();

    expect(panel()).toBeNull();
  });

  it('closes the panel on a click outside, even if the click does not propagate', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();
    const outside = document.createElement('div');
    outside.addEventListener('click', (event) => event.stopPropagation());
    document.body.appendChild(outside);

    outside.click();
    fixture.detectChanges();
    outside.remove();

    expect(panel()).toBeNull();
  });

  it('keeps the panel open on a click inside it', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    panel()!.click();
    fixture.detectChanges();

    expect(panel()).not.toBeNull();
  });

  it('emits openedChange for both directions', () => {
    createTestComponent(BASIC_TEMPLATE);
    const emitted: boolean[] = [];
    indicator.openedChange.subscribe((value) => emitted.push(value));

    indicator.open();
    fixture.detectChanges();
    indicator.close();
    fixture.detectChanges();

    expect(emitted).toEqual([true, false]);
  });

  it('handles a close() from the openedChange handler itself', () => {
    createTestComponent(BASIC_TEMPLATE);
    const emitted: boolean[] = [];
    const subscription = indicator.openedChange.subscribe((opened) => {
      emitted.push(opened);
      if (opened) {
        indicator.close();
      }
    });

    indicator.open();
    fixture.detectChanges();

    expect(emitted).toEqual([true, false]);
    expect(indicator.opened).toBe(false);
    expect(panel()).toBeNull();

    // A stale overlay ref would make this a no-op.
    subscription.unsubscribe();
    indicator.open();
    fixture.detectChanges();

    expect(panel()).toBeTruthy();
  });

  // As in a disclosure, opening reveals the panel without moving focus into it.
  it('keeps focus on the button when the panel opens', async () => {
    createTestComponent(BASIC_TEMPLATE);
    triggerButton()!.focus();
    triggerButton()!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(panel()).toBeTruthy();
    expect(document.activeElement).toBe(triggerButton());
  });

  it('points the button at the panel only while it is open', () => {
    createTestComponent(BASIC_TEMPLATE);
    expect(triggerButton()!.hasAttribute('aria-controls')).toBe(false);

    indicator.open();
    fixture.detectChanges();

    expect(triggerButton()!.getAttribute('aria-controls')).toBe(panel()!.id);
  });

  it('renders the projected steps in the panel as a role="list"', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    const list = panel()!.querySelector('ol[role="list"]')!;
    const steps = list.querySelectorAll('nx-multi-progress-step');
    expect(steps.length).toBe(3);
    steps.forEach((step) => expect(step.getAttribute('role')).toBe('listitem'));
  });

  // Proves the layout reaches the steps through this component's provider.
  it('renders the steps in the "vertical-no-bars" layout', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    const steps = panel()!.querySelectorAll('nx-multi-progress-step');
    steps.forEach((step) => {
      expect(step.classList).toContain('is-vertical');
      expect(step.querySelector('.nx-multi-progress-step__bar')).toBeNull();
    });
  });

  // Fixed here and read only by the steps, through `NX_MULTI_PROGRESS_INDICATOR`.
  it('renders the steps numbered and in the default color scheme', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    const steps = Array.from(panel()!.querySelectorAll('nx-multi-progress-step'));
    steps.forEach((step) => expect(step.classList).not.toContain('is-positive'));

    const bullets = steps.map((step) =>
      step.querySelector('.nx-multi-progress-step__bullet')!.textContent?.trim(),
    );
    expect(bullets).toEqual(['1', '2', '3']);
  });

  it('derives completed and current state from currentStep', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();

    const steps = Array.from(panel()!.querySelectorAll('nx-multi-progress-step'));
    expect(steps[0].classList).toContain('is-completed');
    expect(steps[1].classList).toContain('is-current');
    expect(steps[1].getAttribute('aria-current')).toBe('step');
    expect(steps[2].classList).not.toContain('is-completed');
  });

  // A disclosure, not a dialog: the revealed content carries the name and list semantics.
  it('forwards the aria inputs to the list and leaves the overlay container unlabelled', () => {
    createTestComponent(`
      <p id="hint">You can return to any completed step.</p>
      <nx-compact-progress-indicator aria-label="Order process" aria-describedby="hint">
        <nx-multi-progress-step current>Billing</nx-multi-progress-step>
      </nx-compact-progress-indicator>
    `);
    indicator.open();
    fixture.detectChanges();

    const container = document.querySelector('.nx-overlay-container')!;
    expect(container.hasAttribute('role')).toBe(false);
    expect(container.hasAttribute('aria-label')).toBe(false);

    const list = panel()!.querySelector('ol')!;
    expect(list.getAttribute('aria-label')).toBe('Order process');
    expect(list.getAttribute('aria-describedby')).toBe('hint');
  });

  it('strips the aria inputs from its own host element', () => {
    createTestComponent(`
      <nx-compact-progress-indicator aria-label="Order process">
        <nx-multi-progress-step current>Billing</nx-multi-progress-step>
      </nx-compact-progress-indicator>
    `);
    expect(indicatorElement.nativeElement.hasAttribute('aria-label')).toBe(false);
  });

  it('uses the expandLabel input for the button', () => {
    createTestComponent(BASIC_TEMPLATE);
    expect(triggerButton()!.textContent).toContain('Steps');
  });

  it('falls back to the intl default when no expandLabel is given', () => {
    createTestComponent(`
      <nx-compact-progress-indicator>
        <nx-multi-progress-step current>Billing</nx-multi-progress-step>
      </nx-compact-progress-indicator>
    `);
    expect(triggerButton()!.textContent).toContain('steps');
  });

  // The counter sits outside the button, so on focus the button would otherwise read just "Steps".
  it('names the button with the counter and the label', () => {
    createTestComponent(BASIC_TEMPLATE);

    expect(buttonAccessibleName()).toBe('2 of 3 Steps');
    expect(
      indicatorElement
        .query(By.css('.nx-compact-progress-indicator__counter'))
        .nativeElement.getAttribute('aria-hidden'),
    ).toBe('true');
  });

  it('reads the button label and the counter from a provided NxCompactProgressIndicatorIntl', () => {
    TestBed.overrideProvider(NxCompactProgressIndicatorIntl, {
      useValue: {
        expandLabel: signal('Schritte anzeigen'),
        stepCounterLabel: signal((current: number, total: number) => `${current} von ${total}`),
      },
    });
    createTestComponent(BASIC_TEMPLATE.replace(' expandLabel="Steps"', ''));

    expect(triggerButton()!.textContent).toContain('Schritte anzeigen');
    expect(
      indicatorElement.query(By.css('.nx-compact-progress-indicator__counter')).nativeElement
        .textContent,
    ).toContain('2 von 3');
  });

  it('flips the chevron while the panel is open', () => {
    const iconName = () =>
      triggerButton()!.querySelector('nx-icon')!.getAttribute('data-nx-icon-name');

    createTestComponent(BASIC_TEMPLATE);
    expect(iconName()).toBe('chevron-down');

    indicator.open();
    fixture.detectChanges();

    expect(iconName()).toBe('chevron-up');
  });

  describe('keyboard navigation', () => {
    // Steps 1-3 are focusable; 4 (current) and 5 (upcoming) are disabled options to skip.
    const ACTIONS_TEMPLATE = `
      <nx-compact-progress-indicator [currentStep]="currentStep">
        <nx-multi-progress-step>
          <a href="#billing" nxProgressIndicatorStepAction>Billing</a>
        </nx-multi-progress-step>
        <nx-multi-progress-step>
          <a href="#shipping" nxProgressIndicatorStepAction>Shipping</a>
        </nx-multi-progress-step>
        <nx-multi-progress-step>
          <a href="#gift" nxProgressIndicatorStepAction>Gift Wrapping</a>
        </nx-multi-progress-step>
        <nx-multi-progress-step>
          <a nxProgressIndicatorStepAction>Review</a>
        </nx-multi-progress-step>
        <nx-multi-progress-step>
          <a nxProgressIndicatorStepAction>Payment</a>
        </nx-multi-progress-step>
      </nx-compact-progress-indicator>
    `;

    function openWithActions() {
      createTestComponent(ACTIONS_TEMPLATE);
      fixture.componentInstance.currentStep = 4;
      fixture.detectChanges();
      indicator.open();
      fixture.detectChanges();
    }

    function actions(): HTMLAnchorElement[] {
      return Array.from(panel()!.querySelectorAll('a'));
    }

    // `ListKeyManager` switches on `keyCode`, which a hand-built `KeyboardEvent` leaves at 0.
    function arrow(keyCode: number) {
      dispatchKeyboardEvent(panel()!.querySelector('ol')!, 'keydown', keyCode);
      fixture.detectChanges();
    }

    function tab(shift = false): KeyboardEvent {
      const event = dispatchKeyboardEvent(document.activeElement!, 'keydown', TAB, 'Tab', {
        shift,
      });
      fixture.detectChanges();
      return event;
    }

    function focusedText(): string | undefined {
      return document.activeElement?.textContent?.trim();
    }

    it('moves focus from the button into the panel with the down and up arrows', () => {
      openWithActions();
      const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      trigger.focus();

      const down = dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW, 'ArrowDown');
      expect(focusedText()).toBe('Billing');
      expect(down.defaultPrevented).toBe(true);

      trigger.focus();
      dispatchKeyboardEvent(trigger, 'keydown', UP_ARROW, 'ArrowUp');
      expect(focusedText()).toBe('Gift Wrapping');
    });

    it('leaves the arrows alone on the button while the panel is closed', () => {
      createTestComponent(ACTIONS_TEMPLATE);
      const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      trigger.focus();

      const down = dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW, 'ArrowDown');
      expect(down.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('moves focus down and up between the completed steps', () => {
      openWithActions();
      actions()[0].focus();

      arrow(DOWN_ARROW);
      expect(focusedText()).toBe('Shipping');

      arrow(DOWN_ARROW);
      expect(focusedText()).toBe('Gift Wrapping');

      arrow(UP_ARROW);
      expect(focusedText()).toBe('Shipping');
    });

    it('skips the current and upcoming steps and wraps around', () => {
      openWithActions();
      actions()[2].focus();

      arrow(DOWN_ARROW);
      expect(focusedText()).toBe('Billing');
    });

    it('jumps to the first and last focusable step with home and end', () => {
      openWithActions();
      actions()[1].focus();

      arrow(END);
      expect(focusedText()).toBe('Gift Wrapping');

      arrow(HOME);
      expect(focusedText()).toBe('Billing');
    });

    it('continues from wherever focus actually is, not from the last key-manager move', () => {
      openWithActions();
      actions()[0].focus();
      arrow(DOWN_ARROW);
      expect(focusedText()).toBe('Shipping');

      // A Tab or pointer landing elsewhere in the list.
      actions()[2].focus();

      arrow(UP_ARROW);
      expect(focusedText()).toBe('Shipping');
    });

    it('moves focus from the button into the panel on tab', async () => {
      openWithActions();
      triggerButton()!.focus();

      const event = tab();

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(actions()[0]);
    });

    it('closes on tab from the button when the panel has nothing to focus', () => {
      createTestComponent(BASIC_TEMPLATE);
      indicator.open();
      fixture.detectChanges();
      triggerButton()!.focus();

      const event = tab();

      expect(panel()).toBeNull();
      expect(event.defaultPrevented).toBe(false);
    });

    it('keeps the panel open while tab moves between the completed steps', () => {
      openWithActions();
      actions()[1].focus();

      expect(tab().defaultPrevented).toBe(false);
      expect(tab(true).defaultPrevented).toBe(false);
      expect(panel()).toBeTruthy();
    });

    it('closes on tab past the last completed step and lets the browser move on', () => {
      openWithActions();
      triggerButton()!.focus();
      tab();
      actions()[2].focus();

      const event = tab();

      expect(panel()).toBeNull();
      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(triggerButton());
    });

    it('returns focus to the button on shift+tab from the first step and stays open', async () => {
      openWithActions();
      actions()[0].focus();

      const event = tab(true);
      // A focus trap would only pull focus back in after a tick.
      await new Promise((resolve) => setTimeout(resolve));

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(triggerButton());
      expect(panel()).toBeTruthy();
    });

    it('leaves other keys to the elements themselves', () => {
      openWithActions();
      actions()[0].focus();

      const event = dispatchKeyboardEvent(panel()!.querySelector('ol')!, 'keydown', ENTER);

      expect(event.defaultPrevented).toBe(false);
    });
  });

  it('closes the panel when the indicator is destroyed', () => {
    createTestComponent(BASIC_TEMPLATE);
    indicator.open();
    fixture.detectChanges();
    expect(panel()).toBeTruthy();

    fixture.destroy();

    expect(panel()).toBeNull();
  });
});

@Component({
  selector: 'test-compact-progress-indicator',
  template: '',
  imports: [
    NxCompactProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
  ],
})
class TestComponent {
  currentStep: number | undefined = 2;
}
