import { Component, ElementRef, Type, ViewChild, ChangeDetectionStrategy, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NxMessageModule } from '../message.module';
import { dispatchMouseEvent } from '../../cdk-test-utils';
import { NxMessageBannerComponent, BANNER_CONTEXT } from './message-banner.component';
import { FormsModule } from '@angular/forms';

@Directive()
abstract class MessageBannerTest {
  public context: BANNER_CONTEXT = 'info';

  @ViewChild(NxMessageBannerComponent) componentInstance: NxMessageBannerComponent;
  @ViewChild(NxMessageBannerComponent,  { read: ElementRef }) formInscomponentInstanceRef: ElementRef;
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
    expect(fixture.nativeElement.querySelector('nx-message-banner').getAttribute('class')).toContain(className);
  }

  function setContextProgrammaticlyAndAssertClass(context: BANNER_CONTEXT, className: string) {
    componentInstance.context = context;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nx-message-banner').getAttribute('class')).toContain(className);
    expect(fixture.nativeElement.querySelector('.nx-message-banner__icon')).toBeTruthy();
  }

  function setContextAndAssertIcon(context: BANNER_CONTEXT, iconName: string) {
    testInstance.context = context;
    fixture.detectChanges();
    expect(componentInstance.getIconName()).toBe(iconName);
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          BasicMessageBannerComponent,
          MessageBannerOnPushComponent,
          ClosableMessageBannerComponent,
          ClosableMessageBannerWithFormComponent
        ],
        imports: [
          NxMessageModule,
          FormsModule
        ]
      }).compileComponents();

    })
  );

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
      expect(componentInstance.getIconName()).toBe('info-circle');
    });

    it('should show the icon', () => {
      createTestComponent(BasicMessageBannerComponent);
      setContextAndAssertClass('warning', 'context-warning');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-message-banner__icon')).toBeTruthy();
    });

    it('should change the icon on context change', () => {
      createTestComponent(BasicMessageBannerComponent);
      fixture.detectChanges();
      setContextAndAssertIcon('error', 'exclamation-triangle');
      setContextAndAssertIcon('info', 'info-circle');
      setContextAndAssertIcon('warning', 'exclamation-circle');
    });
  });

  describe('closable', () => {

    it('should emit a `close` event on click', () => {
      createTestComponent(ClosableMessageBannerComponent);
      spyOn(componentInstance.closeEvent, 'emit');
      const closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      dispatchMouseEvent(closeButton, 'click');
      fixture.detectChanges();
      expect(componentInstance.closeEvent.emit).toHaveBeenCalled();
    });

    it('should have the proper closable class', () => {
      createTestComponent(ClosableMessageBannerComponent);
      expect(fixture.nativeElement.querySelector('nx-message-banner').classList).toContain('nx-message-banner--closable');
    });

    it('should not submit form on closing', () => {
      createTestComponent(ClosableMessageBannerWithFormComponent);
      const closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      closeButton.click();
      expect((testInstance as ClosableMessageBannerWithFormComponent).submitted).toBe(false);
    });
  });

  describe('programmatic tests', () => {

    it('should update after closable change', () => {
      createTestComponent(MessageBannerOnPushComponent);
      let closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      expect(closeButton).not.toBeNull();
      componentInstance.closable = false;
      fixture.detectChanges();
      closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      expect(closeButton).toBeNull();
    });

    it('should update ariaLabel for close button', () => {
      createTestComponent(MessageBannerOnPushComponent);
      componentInstance.closable = true;
      fixture.detectChanges();
      let closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      expect(closeButton.getAttribute('aria-label')).toEqual('Close dialog');

      componentInstance.closeButtonLabel = 'Close dialog 2';
      fixture.detectChanges();
      closeButton = fixture.nativeElement.querySelector('.nx-message-banner__close-icon');
      expect(closeButton.getAttribute('aria-label')).toEqual('Close dialog 2');
    });

    it('should set proper icon on context change', () => {
      createTestComponent(MessageBannerOnPushComponent);
      setContextProgrammaticlyAndAssertClass('info', 'context-info');
      setContextProgrammaticlyAndAssertClass('warning', 'context-warning');
    });

  });
});

@Component({
  template: `
    <nx-message-banner [context]="context">
      lorem ipsum
    </nx-message-banner>
  `
})
class BasicMessageBannerComponent extends MessageBannerTest { }

@Component({
  template: `
    <nx-message-banner [context]="context">
      lorem ipsum
    </nx-message-banner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class MessageBannerOnPushComponent extends MessageBannerTest { }

@Component({
  template: `
  <nx-message-banner [closable]="closable">
    lorem ipsum
  </nx-message-banner>
  `
})
class ClosableMessageBannerComponent extends MessageBannerTest {
  closable = true;
}

@Component({
  template: `
  <form (ngSubmit)="submitted = true">
    <nx-message-banner [closable]="closable">
      lorem ipsum
    </nx-message-banner>
  </form>
  `
})
class ClosableMessageBannerWithFormComponent extends MessageBannerTest {
  closable = true;
  submitted = false;
}
