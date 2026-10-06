import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';

import { NxMultiProgressIndicatorComponent } from './multi-progress-indicator.component';
import { NxMultiProgressStepComponent } from './multi-progress-step.component';
import { NxProgressIndicatorStepActionComponent } from './progress-indicator-step-action.component';

function labelText(stepElement: DebugElement): string {
  return (stepElement.query(By.css('.nx-multi-progress-step__label')).nativeElement as HTMLElement)
    .textContent!.replace(/\s+/g, ' ')
    .trim();
}

describe('NxProgressIndicatorStepActionComponent', () => {
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
      imports: [
        NxMultiProgressIndicatorComponent,
        NxMultiProgressStepComponent,
        NxProgressIndicatorStepActionComponent,
        TestComponent,
      ],
      providers: [provideRouter([])],
    }).compileComponents();
  }));

  it('renders a plain, enabled link once the step is completed', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.hasAttribute('aria-disabled')).toBe(false);
    expect(link.hasAttribute('tabindex')).toBe(false);
    expect(link.hasAttribute('disabled')).toBe(false);
    expect(link.classList.contains('nx-progress-indicator-step-action--disabled')).toBe(false);
    expect(link.textContent).toBe('Ship it');
    expect(labelText(stepElement)).toBe('Completed: Ship it');
  });

  it('disables the link via aria-disabled/tabindex, keeping its content readable, when current (not completed)', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('tabindex')).toBe('-1');
    expect(link.classList.contains('nx-progress-indicator-step-action--disabled')).toBe(true);
    expect(link.textContent).toBe('Ship it');
    expect(labelText(stepElement)).toBe('Current: Ship it');
  });

  // `disabled` is only valid on form controls, so an anchor must never receive it.
  it('never sets a disabled attribute on a link', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.hasAttribute('disabled')).toBe(false);
  });

  it('disables the button natively when incomplete', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step>
          <button type="button" nxProgressIndicatorStepAction>Ship it</button>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const button = stepElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    // Native `disabled` already conveys the state, and a disabled button is not tabbable anyway.
    expect(button.hasAttribute('aria-disabled')).toBe(false);
    expect(button.hasAttribute('tabindex')).toBe(false);
    expect(button.classList.contains('nx-progress-indicator-step-action--disabled')).toBe(true);
    expect(button.textContent).toBe('Ship it');
  });

  it('enables the button once its step is completed', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>
          <button type="button" nxProgressIndicatorStepAction>Ship it</button>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const button = stepElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(false);
    expect(button.classList.contains('nx-progress-indicator-step-action--disabled')).toBe(false);
  });

  it('prevents navigation when a disabled link is clicked', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    const event = new MouseEvent('click', { cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  // The guard is registered in the constructor, i.e. before any host listener on the same element,
  // so `stopImmediatePropagation` also reaches `RouterLink` - which navigates through the router
  // rather than through the anchor's default action and would otherwise ignore `preventDefault`.
  it('does not navigate when a disabled link carrying routerLink is clicked', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>
          <a [routerLink]="'/target'" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;

    link.dispatchEvent(new MouseEvent('click', { cancelable: true }));

    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigates when a completed link carrying routerLink is clicked', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step completed>
          <a [routerLink]="'/target'" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;

    link.dispatchEvent(new MouseEvent('click', { cancelable: true }));

    expect(navigate).toHaveBeenCalled();
  });

  it('drops the href when routerLink is bound to null', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current>
          <a [routerLink]="null" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.textContent).toBe('Ship it');
  });

  it('removes aria-disabled/tabindex once the step transitions from current to completed', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step [current]="isCurrent" [completed]="!isCurrent">
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.getAttribute('aria-disabled')).toBe('true');

    fixture.componentInstance.isCurrent = false;
    fixture.detectChanges();

    // Same element, not a recreated one.
    expect(stepElement.query(By.css('a')).nativeElement).toBe(link);
    expect(link.hasAttribute('aria-disabled')).toBe(false);
    expect(link.hasAttribute('tabindex')).toBe(false);
    expect(link.textContent).toBe('Ship it');
    expect(labelText(stepElement)).toBe('Completed: Ship it');
  });

  it('keeps toggling aria-disabled/tabindex correctly across many repeated completed/incomplete toggles', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step [current]="isCurrent" [completed]="!isCurrent">
          <a href="#" nxProgressIndicatorStepAction>Ship it</a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);

    for (let i = 0; i < 5; i++) {
      fixture.componentInstance.isCurrent = false;
      fixture.detectChanges();
      const link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
      expect(link.hasAttribute('aria-disabled'), `completed, iteration ${i}`).toBe(false);
      expect(link.textContent, `completed, iteration ${i}`).toBe('Ship it');

      fixture.componentInstance.isCurrent = true;
      fixture.detectChanges();
      const link2 = stepElement.query(By.css('a')).nativeElement as HTMLElement;
      expect(link2.getAttribute('aria-disabled'), `incomplete, iteration ${i}`).toBe('true');
      expect(link2.textContent, `incomplete, iteration ${i}`).toBe('Ship it');
      expect(labelText(stepElement), `incomplete, iteration ${i}`).toBe('Current: Ship it');
    }
  });

  it('leaves plain projected content without the directive untouched', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step current><span>Ship it</span></nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    const span = stepElement.query(
      By.css('.nx-multi-progress-step__label span:not(.nx-visually-hidden)'),
    ).nativeElement as HTMLElement;
    expect(span.hasAttribute('aria-disabled')).toBe(false);
    expect(span.textContent).toBe('Ship it');
  });

  it('keeps working for projected content with its own structural directive across state changes', () => {
    createTestComponent(`
      <nx-multi-progress-indicator>
        <nx-multi-progress-step [current]="isCurrent" [completed]="!isCurrent">
          <a href="#" nxProgressIndicatorStepAction><span *ngIf="showText">Ship it</span></a>
        </nx-multi-progress-step>
      </nx-multi-progress-indicator>
    `);
    let link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(labelText(stepElement)).toContain('Ship it');

    fixture.componentInstance.isCurrent = false;
    fixture.detectChanges();

    link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.hasAttribute('aria-disabled')).toBe(false);
    expect(link.textContent).toBe('Ship it');

    fixture.componentInstance.showText = false;
    fixture.detectChanges();

    link = stepElement.query(By.css('a')).nativeElement as HTMLElement;
    expect(link.hasAttribute('aria-disabled')).toBe(false);
    expect(link.textContent).toBe('');
  });
});

@Component({
  selector: 'test-progress-indicator-step-action',
  template: '',
  imports: [
    CommonModule,
    NxMultiProgressStepComponent,
    NxMultiProgressIndicatorComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
class TestComponent {
  isCurrent = true;
  showText = true;
}
