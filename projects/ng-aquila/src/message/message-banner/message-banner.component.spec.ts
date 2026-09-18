import { NxButtonModule } from '@allianz/ng-aquila/button';
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
import {
  BANNER_ACTION_LAYOUT,
  BANNER_CONTEXT,
  NxMessageBannerComponent,
} from './message-banner.component';

const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

@Directive({ standalone: true })
abstract class MessageBannerTest {
  context: BANNER_CONTEXT = 'info';

  @ViewChild(NxMessageBannerComponent)
  componentInstance!: NxMessageBannerComponent;
  @ViewChild(NxMessageBannerComponent, { read: ElementRef })
  formInscomponentInstanceRef!: ElementRef;
}

describe('NxMessageBannerComponent', () => {
  let fixture: ComponentFixture<MessageBannerTest>;
  let testInstance: MessageBannerTest;
  let componentInstance: NxMessageBannerComponent;

  function createTestComponent(component: Type<MessageBannerTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.componentInstance;
  }

  function setContextAndAssertClass(context: BANNER_CONTEXT, className: string) {
    testInstance.context = context;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('nx-message-banner').getAttribute('class'),
    ).toContain(className);
  }

  function setContextProgrammaticlyAndAssertClass(context: BANNER_CONTEXT, className: string) {
    componentInstance.context = context;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('nx-message-banner').getAttribute('class'),
    ).toContain(className);
    expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
  }

  function assertStatusIconType(type: string) {
    expect(fixture.nativeElement.querySelector('nx-status-icon')).toHaveClass(
      `nx-status-icon--${type}`,
    );
  }

  function setContextAndAssertIcon(context: BANNER_CONTEXT, type: string) {
    testInstance.context = context;
    fixture.detectChanges();
    assertStatusIconType(type);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxMessageModule,
        FormsModule,
        BasicMessageBannerComponent,
        MessageBannerOnPushComponent,
        ClosableMessageBannerComponent,
        ClosableMessageBannerWithFormComponent,
        A1MessageBannerComponent,
        A1ShowContextIconMessageBannerComponent,
        ShowContextIconMessageBannerComponent,
        BannerWithActionsComponent,
        NonClosableMessageBannerComponent,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('should create the component', () => {
      createTestComponent(BasicMessageBannerComponent);
      expect(componentInstance).toBeTruthy();
    });

    it('should set proper context', () => {
      createTestComponent(BasicMessageBannerComponent);
      setContextAndAssertClass('warning', 'context-warning');
      setContextAndAssertClass('info', 'context-info');
      setContextAndAssertClass('error', 'context-error');
    });

    it('should render an info context per default', () => {
      createTestComponent(BasicMessageBannerComponent);
      assertStatusIconType('info');
    });

    it('should show the icon', () => {
      createTestComponent(BasicMessageBannerComponent);
      setContextAndAssertClass('warning', 'context-warning');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should change the icon on context change', () => {
      createTestComponent(BasicMessageBannerComponent);
      fixture.detectChanges();
      setContextAndAssertIcon('error', 'error');
      setContextAndAssertIcon('info', 'info');
      setContextAndAssertIcon('warning', 'warning');
    });
  });

  describe('closable', () => {
    it('should emit a `close` event on click', () => {
      createTestComponent(ClosableMessageBannerComponent);
      vi.spyOn(componentInstance.closeEvent, 'emit').mockReturnValue(undefined);
      const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      dispatchMouseEvent(closeButton, 'click');
      fixture.detectChanges();
      expect(componentInstance.closeEvent.emit).toHaveBeenCalled();
    });

    it('should have the proper closable class', () => {
      createTestComponent(ClosableMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('nx-message-banner')).toHaveClass(
        'nx-message--closable',
      );
    });

    it('should not submit form on closing', () => {
      createTestComponent(ClosableMessageBannerWithFormComponent);
      const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      closeButton.click();
      expect((testInstance as ClosableMessageBannerWithFormComponent).submitted).toBe(false);
    });

    it('should drop the close button and its padding when not closable', () => {
      createTestComponent(NonClosableMessageBannerComponent);
      const banner = fixture.nativeElement.querySelector('nx-message-banner');

      expect(banner).not.toHaveClass('nx-message--closable');
      expect(fixture.nativeElement.querySelector('.nx-message__close-icon')).toBeFalsy();
      // Without the close button the inline padding is symmetric again.
      const style = getComputedStyle(banner);
      expect(style.paddingInlineEnd).toBe(style.paddingInlineStart);
    });
  });

  describe('programmatic tests', () => {
    it('should update after closable change', () => {
      createTestComponent(MessageBannerOnPushComponent);
      let closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton).not.toBeNull();
      componentInstance.closable = false;
      fixture.detectChanges();
      closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
      expect(closeButton).toBeNull();
    });

    it('should update ariaLabel for close button', () => {
      createTestComponent(MessageBannerOnPushComponent);
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
      createTestComponent(MessageBannerOnPushComponent);
      setContextProgrammaticlyAndAssertClass('info', 'context-info');
      setContextProgrammaticlyAndAssertClass('warning', 'context-warning');
    });
  });

  describe('contexts', () => {
    // Banners take every message context except the deprecated `regular`.
    const CONTEXTS: { context: BANNER_CONTEXT; className: string; statusIconType: string }[] = [
      { context: 'info', className: 'context-info', statusIconType: 'info' },
      { context: 'positive', className: 'context-success', statusIconType: 'success' },
      { context: 'warning', className: 'context-warning', statusIconType: 'warning' },
      { context: 'critical', className: 'context-error', statusIconType: 'error' },
    ];

    for (const { context, className, statusIconType } of CONTEXTS) {
      it(`should render the ${context} context`, () => {
        createTestComponent(BasicMessageBannerComponent);
        setContextAndAssertClass(context, className);
        assertStatusIconType(statusIconType);
      });
    }

    it('should map the deprecated names onto their replacements', () => {
      createTestComponent(BasicMessageBannerComponent);

      setContextAndAssertClass('error', 'context-error');
      setContextAndAssertClass('success', 'context-success');
    });

    it('should read the context back exactly as it was set', () => {
      createTestComponent(BasicMessageBannerComponent);

      for (const context of ['error', 'success', 'critical', 'positive', 'info'] as const) {
        testInstance.context = context;
        fixture.detectChanges();
        expect(componentInstance.context).toBe(context);
      }
    });
  });

  // `showContextIcon` is tri-state on the banner: unset follows the theme, an explicit value always wins.
  describe('showContextIcon', () => {
    it('should show the icon by default outside of A1', () => {
      createTestComponent(BasicMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should hide the icon by default in A1', () => {
      createTestComponent(A1MessageBannerComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeFalsy();
    });

    it('should show the icon in A1 when asked to', () => {
      createTestComponent(A1ShowContextIconMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should let an explicit value win over the theme default', () => {
      createTestComponent(ShowContextIconMessageBannerComponent);
      const host = testInstance as ShowContextIconMessageBannerComponent;

      host.showContextIcon = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeFalsy();

      host.showContextIcon = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    });

    it('should size the icon with the s step outside of A1', () => {
      createTestComponent(BasicMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toHaveClass(
        'nx-status-icon--s',
      );
    });

    it('should size the icon with the xl step in A1', () => {
      createTestComponent(A1ShowContextIconMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('.nx-message__icon')).toHaveClass(
        'nx-status-icon--xl',
      );
    });

    it('should pass the status through under A1 as well', () => {
      createTestComponent(A1ShowContextIconMessageBannerComponent);
      testInstance.context = 'critical';
      fixture.detectChanges();
      assertStatusIconType('error');
    });
  });

  describe('actions', () => {
    it('should project the actions', () => {
      createTestComponent(BannerWithActionsComponent);
      expect(fixture.nativeElement.querySelector('.nx-message-banner__actions')).toBeTruthy();
    });

    it('should place the actions beside the content by default', () => {
      createTestComponent(BannerWithActionsComponent);
      const actions = fixture.nativeElement.querySelector('.nx-message-banner__actions');
      const content = fixture.nativeElement.querySelector('.nx-message__content');

      expect(fixture.nativeElement.querySelector('nx-message-banner')).toHaveClass(
        'nx-message-banner--actions-horizontal',
      );
      expect(getComputedStyle(actions).display).toBe('flex');
      expect(actions.offsetTop).toBeLessThan(content.offsetTop + content.offsetHeight);
      expect(actions.offsetLeft).toBeGreaterThan(content.offsetLeft);
    });

    it('should place the actions below the content on request', () => {
      createTestComponent(BannerWithActionsComponent);
      (testInstance as BannerWithActionsComponent).actionLayout = 'vertical';
      fixture.detectChanges();
      const actions = fixture.nativeElement.querySelector('.nx-message-banner__actions');
      const content = fixture.nativeElement.querySelector('.nx-message__content');

      expect(fixture.nativeElement.querySelector('nx-message-banner')).toHaveClass(
        'nx-message-banner--actions-vertical',
      );
      expect(actions.offsetTop).toBeGreaterThanOrEqual(content.offsetTop + content.offsetHeight);
      // Aligned with the text, not indented under the context icon.
      expect(actions.offsetLeft).toBe(content.offsetLeft);
    });
  });
});

@Component({
  selector: 'test-basic-message-banner-component',
  template: `<nx-message-banner [context]="context"> lorem ipsum </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class BasicMessageBannerComponent extends MessageBannerTest {}

@Component({
  selector: 'test-message-banner-on-push-component',
  template: `<nx-message-banner [context]="context"> lorem ipsum </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxMessageModule, FormsModule],
})
class MessageBannerOnPushComponent extends MessageBannerTest {}

@Component({
  selector: 'test-closable-message-banner-component',
  template: `<nx-message-banner [closable]="closable"> lorem ipsum </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class ClosableMessageBannerComponent extends MessageBannerTest {
  closable = true;
}

@Component({
  selector: 'test-closable-message-banner-with-form-component',
  template: `
    <form (ngSubmit)="submitted = true">
      <nx-message-banner [closable]="closable"> lorem ipsum </nx-message-banner>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, FormsModule],
})
class ClosableMessageBannerWithFormComponent extends MessageBannerTest {
  closable = true;
  submitted = false;
}

@Component({
  selector: 'test-a1-message-banner-component',
  template: `<nx-message-banner> lorem ipsum </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
  providers: A1_PROVIDERS,
})
class A1MessageBannerComponent extends MessageBannerTest {}

@Component({
  selector: 'test-a1-show-context-icon-message-banner-component',
  template: `<nx-message-banner [context]="context" showContextIcon>
    lorem ipsum
  </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
  providers: A1_PROVIDERS,
})
class A1ShowContextIconMessageBannerComponent extends MessageBannerTest {}

@Component({
  selector: 'test-show-context-icon-message-banner-component',
  template: `<nx-message-banner [showContextIcon]="showContextIcon">
    lorem ipsum
  </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
})
class ShowContextIconMessageBannerComponent extends MessageBannerTest {
  showContextIcon = true;
}

@Component({
  selector: 'test-non-closable-message-banner-component',
  template: `<nx-message-banner [closable]="false"> lorem ipsum </nx-message-banner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule],
})
class NonClosableMessageBannerComponent extends MessageBannerTest {}

@Component({
  selector: 'test-message-banner-with-actions-component',
  template: `
    <nx-message-banner showContextIcon [actionLayout]="actionLayout">
      lorem ipsum
      <div nxMessageBannerActions>
        <button nxButton type="button">Primary</button>
      </div>
    </nx-message-banner>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMessageModule, NxButtonModule],
})
class BannerWithActionsComponent extends MessageBannerTest {
  actionLayout: BANNER_ACTION_LAYOUT = 'horizontal';
}
