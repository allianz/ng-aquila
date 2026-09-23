import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { dispatchMouseEvent } from '../../cdk-test-utils';
import { NxMessageModule } from '../message.module';
import { CONTEXT, NxMessageComponent, ResolvedContext } from './message.component';

@Directive({ standalone: true })
abstract class MessageTest {
  context = signal<CONTEXT>('regular');
  contained = signal(true);

  @ViewChild(NxMessageComponent)
  componentInstance!: NxMessageComponent;
  @ViewChild(NxMessageComponent, { read: ElementRef })
  formInscomponentInstanceRef!: ElementRef;
}

describe('NxMessageComponent', () => {
  let fixture: ComponentFixture<MessageTest>;
  let testInstance: MessageTest;
  let componentInstance: NxMessageComponent;

  function createTestComponent(component: Type<MessageTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.componentInstance;
  }

  function setContextAndAssertClass(context: CONTEXT, className: string) {
    testInstance.context.set(context);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nx-message').getAttribute('class')).toBe(className);
  }

  function setContextProgrammaticlyAndAssertClass(context: CONTEXT, className: string) {
    componentInstance.context = context;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nx-message').getAttribute('class')).toBe(className);
    expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
  }

  function setContextAndAssertIcon(context: CONTEXT, iconName: string) {
    testInstance.context.set(context);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.nx-message__icon') as HTMLButtonElement;
    expect(icon).toBeTruthy();
    expect(componentInstance._iconName()).toBe(iconName);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxMessageModule,
        FormsModule,
        MessageBasicComponent,
        MessageOnPushComponent,
        ClosableMessageComponent,
        ClosableFormMessageComponent,
        PlainMessageTestComponent,
        PlainClosableMessageComponent,
        A1MessageComponent,
        ShowContextIconMessageComponent,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('should create the component', () => {
      createTestComponent(MessageBasicComponent);
      expect(componentInstance).toBeTruthy();
    });

    it('should set proper context', () => {
      createTestComponent(MessageBasicComponent);
      setContextAndAssertClass('info', 'context-info');
      setContextAndAssertClass('error', 'context-error');
      setContextAndAssertClass('success', 'context-success');
      setContextAndAssertClass('warning', 'context-warning');
    });

    it('should render a regular context without icon', () => {
      createTestComponent(MessageBasicComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).not.toBeTruthy();
    });

    it('should show the icon', () => {
      createTestComponent(MessageBasicComponent);
      setContextAndAssertClass('info', 'context-info');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should change the icon on context change', () => {
      createTestComponent(MessageBasicComponent);
      fixture.detectChanges();
      setContextAndAssertIcon('info', 'info-circle');
      setContextAndAssertIcon('error', 'exclamation-triangle');
      setContextAndAssertIcon('success', 'check-circle');
      setContextAndAssertIcon('warning', 'exclamation-circle-warning');
    });
  });

  describe('contexts', () => {
    // Every supported context, with the class and icon the design system pins to it.
    const CONTEXTS: { context: ResolvedContext; className: string; icon: string }[] = [
      { context: 'info', className: 'context-info', icon: 'info-circle' },
      { context: 'positive', className: 'context-success', icon: 'check-circle' },
      { context: 'warning', className: 'context-warning', icon: 'exclamation-circle-warning' },
      { context: 'critical', className: 'context-error', icon: 'exclamation-triangle' },
    ];

    for (const { context, className, icon } of CONTEXTS) {
      it(`should render the ${context} context`, () => {
        createTestComponent(MessageBasicComponent);
        setContextAndAssertClass(context, className);
        setContextAndAssertIcon(context, icon);
      });
    }

    // A1 swaps the critical and warning icons; the rest are shared with the other themes.
    const A1_ICONS: { context: ResolvedContext; icon: string }[] = [
      { context: 'info', icon: 'info-circle' },
      { context: 'positive', icon: 'check-circle' },
      { context: 'warning', icon: 'exclamation-triangle' },
      { context: 'critical', icon: 'exclamation-circle' },
    ];

    for (const { context, icon } of A1_ICONS) {
      it(`should render the A1 icon for the ${context} context`, () => {
        createTestComponent(A1MessageComponent);
        testInstance.context.set(context);
        fixture.detectChanges();
        expect(componentInstance._iconName()).toBe(icon);
      });
    }

    it('should map the deprecated names onto their replacements', () => {
      createTestComponent(MessageBasicComponent);

      setContextAndAssertClass('error', 'context-error');
      setContextAndAssertClass('success', 'context-success');
    });

    it('should read the context back exactly as it was set', () => {
      createTestComponent(MessageBasicComponent);

      for (const context of ['error', 'success', 'critical', 'positive', 'info'] as const) {
        testInstance.context.set(context);
        fixture.detectChanges();
        expect(componentInstance.context).toBe(context);
      }
    });
  });

  describe('showContextIcon', () => {
    it('should show the icon by default', () => {
      createTestComponent(MessageBasicComponent);
      setContextAndAssertClass('info', 'context-info');
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should hide the icon when showContextIcon is false', () => {
      createTestComponent(ShowContextIconMessageComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeFalsy();
    });

    it('should show the icon again when showContextIcon flips back to true', () => {
      createTestComponent(ShowContextIconMessageComponent);
      (testInstance as ShowContextIconMessageComponent).showContextIcon.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });
  });

  describe('contained', () => {
    it('should be contained by default', () => {
      createTestComponent(MessageBasicComponent);
      expect(componentInstance.contained()).toBe(true);
      expect(fixture.nativeElement.querySelector('nx-message')).not.toHaveClass(
        'nx-message--plain',
      );
    });

    it('should add the text class when contained is set to false', () => {
      createTestComponent(PlainMessageTestComponent);
      testInstance.contained.set(false);
      fixture.detectChanges();
      expect(componentInstance.contained()).toBe(false);
      expect(fixture.nativeElement.querySelector('nx-message')).toHaveClass('nx-message--plain');
    });
  });

  describe('closable', () => {
    it('should emit a `close` event on click', () => {
      createTestComponent(ClosableMessageComponent);
      vi.spyOn(componentInstance.closeEvent, 'emit').mockReturnValue(undefined);

      const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      dispatchMouseEvent(closeButton, 'click');
      fixture.detectChanges();
      expect(componentInstance.closeEvent.emit).toHaveBeenCalled();
    });

    it('should have the proper closable class', () => {
      createTestComponent(ClosableMessageComponent);
      expect(fixture.nativeElement.querySelector('nx-message')).toHaveClass('nx-message--closable');
    });

    it('does not render a close button on a plain message', () => {
      createTestComponent(PlainClosableMessageComponent);

      expect(fixture.nativeElement.querySelector('.nx-message__close-icon')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('nx-message')).not.toHaveClass(
        'nx-message--closable',
      );
    });

    it('does not submit form on closing', () => {
      createTestComponent(ClosableFormMessageComponent);
      const closeButton = fixture.nativeElement.querySelector(
        '.nx-message__close-icon',
      ) as HTMLButtonElement;
      closeButton.click();
      expect((testInstance as ClosableFormMessageComponent).submitted()).toBe(false);
    });
  });

  describe('programmatic tests', () => {
    it('should update after closable change', () => {
      createTestComponent(MessageOnPushComponent);
      let closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton).toBeNull();
      componentInstance.closable = true;
      fixture.detectChanges();
      closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton).not.toBeNull();
    });

    it('should update ariaLabel for close button', () => {
      createTestComponent(MessageOnPushComponent);
      componentInstance.closable = true;
      fixture.detectChanges();
      let closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton.getAttribute('aria-label')).toBe('Close dialog');

      componentInstance.closeButtonLabel = 'Close dialog 2';
      fixture.detectChanges();
      closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton.getAttribute('aria-label')).toBe('Close dialog 2');
    });

    it('should set proper icon on context change', () => {
      createTestComponent(MessageOnPushComponent);

      setContextProgrammaticlyAndAssertClass('info', 'context-info');
      setContextProgrammaticlyAndAssertClass('warning', 'context-warning');

      componentInstance.context = 'regular';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-message').getAttribute('class')).not.toContain(
        'context-info',
      );
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).not.toBeTruthy();
    });
  });
});

@Component({
  selector: 'test-message-basic-component',
  template: `<nx-message [context]="context()"> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class MessageBasicComponent extends MessageTest {}

@Component({
  selector: 'test-message-on-push-component',
  template: `<nx-message [context]="context()"> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxMessageModule, FormsModule],
})
class MessageOnPushComponent extends MessageTest {}

@Component({
  selector: 'test-plain-message-test-component',
  template: `<nx-message [contained]="contained()"> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class PlainMessageTestComponent extends MessageTest {
  contained = signal(false);
}

@Component({
  selector: 'test-closable-message-component',
  template: `<nx-message [closable]="closable()"> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class ClosableMessageComponent extends MessageTest {
  closable = signal(true);
}

@Component({
  selector: 'test-plain-closable-message-component',
  template: `<nx-message [contained]="false" closable> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
})
class PlainClosableMessageComponent extends MessageTest {}

@Component({
  selector: 'test-closable-form-message-component',
  template: `
    <form (ngSubmit)="submitted.set(true)">
      <nx-message [closable]="closable()"> lorem ipsum </nx-message>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class ClosableFormMessageComponent extends MessageTest {
  closable = signal(true);
  submitted = signal(false);
}

@Component({
  selector: 'test-a1-message-component',
  template: `<nx-message [context]="context()"> lorem ipsum </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
  providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
})
class A1MessageComponent extends MessageTest {}

@Component({
  selector: 'test-show-context-icon-message-component',
  template: `<nx-message context="info" [showContextIcon]="showContextIcon()">
    lorem ipsum
  </nx-message>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
})
class ShowContextIconMessageComponent extends MessageTest {
  showContextIcon = signal(false);
}
