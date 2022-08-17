import { ChangeDetectionStrategy, Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { dispatchMouseEvent } from '../../cdk-test-utils';
import { NxMessageModule } from '../message.module';
import { BANNER_CONTEXT, NxMessageBannerComponent } from './message-banner.component';

@Directive()
abstract class MessageBannerTest {
    context: BANNER_CONTEXT = 'info';

    @ViewChild(NxMessageBannerComponent) componentInstance!: NxMessageBannerComponent;
    @ViewChild(NxMessageBannerComponent, { read: ElementRef }) formInscomponentInstanceRef!: ElementRef;
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
        expect(fixture.nativeElement.querySelector('.nx-message__icon')).toBeTruthy();
    }

    function setContextAndAssertIcon(context: BANNER_CONTEXT, iconName: string) {
        testInstance.context = context;
        fixture.detectChanges();
        expect(componentInstance._iconName).toBe(iconName);
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicMessageBannerComponent, MessageBannerOnPushComponent, ClosableMessageBannerComponent, ClosableMessageBannerWithFormComponent],
            imports: [NxMessageModule, FormsModule],
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
            expect(componentInstance._iconName).toBe('info-circle');
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
            setContextAndAssertIcon('error', 'exclamation-triangle');
            setContextAndAssertIcon('info', 'info-circle');
            setContextAndAssertIcon('warning', 'exclamation-circle-warning');
        });
    });

    describe('closable', () => {
        it('should emit a `close` event on click', () => {
            createTestComponent(ClosableMessageBannerComponent);
            spyOn(componentInstance.closeEvent, 'emit');
            const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
            dispatchMouseEvent(closeButton, 'click');
            fixture.detectChanges();
            expect(componentInstance.closeEvent.emit).toHaveBeenCalled();
        });

        it('should have the proper closable class', () => {
            createTestComponent(ClosableMessageBannerComponent);
            expect(fixture.nativeElement.querySelector('nx-message-banner')).toHaveClass('nx-message--closable');
        });

        it('should not submit form on closing', () => {
            createTestComponent(ClosableMessageBannerWithFormComponent);
            const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
            closeButton.click();
            expect((testInstance as ClosableMessageBannerWithFormComponent).submitted).toBeFalse();
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
});

@Component({
    template: `<nx-message-banner [context]="context"> lorem ipsum </nx-message-banner>`,
})
class BasicMessageBannerComponent extends MessageBannerTest {}

@Component({
    template: `<nx-message-banner [context]="context"> lorem ipsum </nx-message-banner>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class MessageBannerOnPushComponent extends MessageBannerTest {}

@Component({
    template: `<nx-message-banner [closable]="closable"> lorem ipsum </nx-message-banner>`,
})
class ClosableMessageBannerComponent extends MessageBannerTest {
    closable = true;
}

@Component({
    template: `
        <form (ngSubmit)="submitted = true">
            <nx-message-banner [closable]="closable"> lorem ipsum </nx-message-banner>
        </form>
    `,
})
class ClosableMessageBannerWithFormComponent extends MessageBannerTest {
    closable = true;
    submitted = false;
}
