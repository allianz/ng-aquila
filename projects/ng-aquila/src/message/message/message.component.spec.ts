import { ChangeDetectionStrategy, Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { dispatchMouseEvent } from '../../cdk-test-utils';
import { NxMessageModule } from '../message.module';
import { CONTEXT, NxMessageComponent } from './message.component';

@Directive()
abstract class MessageTest {
    context: CONTEXT = 'regular';

    @ViewChild(NxMessageComponent) componentInstance!: NxMessageComponent;
    @ViewChild(NxMessageComponent, { read: ElementRef }) formInscomponentInstanceRef!: ElementRef;
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
        testInstance.context = context;
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
        testInstance.context = context;
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('.nx-message__icon') as HTMLButtonElement;
        expect(icon).toBeTruthy();
        expect(componentInstance._iconName).toBe(iconName);
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessageBasicComponent, MessageOnPushComponent, ClosableMessageComponent, ClosableFormMessageComponent],
            imports: [NxMessageModule, FormsModule],
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

    describe('closable', () => {
        it('should emit a `close` event on click', () => {
            createTestComponent(ClosableMessageComponent);
            spyOn(componentInstance.closeEvent, 'emit');

            const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon');
            dispatchMouseEvent(closeButton, 'click');
            fixture.detectChanges();
            expect(componentInstance.closeEvent.emit).toHaveBeenCalled();
        });

        it('should have the proper closable class', () => {
            createTestComponent(ClosableMessageComponent);
            expect(fixture.nativeElement.querySelector('nx-message')).toHaveClass('nx-message--closable');
        });

        it('does not submit form on closing', () => {
            createTestComponent(ClosableFormMessageComponent);
            const closeButton = fixture.nativeElement.querySelector('.nx-message__close-icon') as HTMLButtonElement;
            closeButton.click();
            expect((testInstance as ClosableFormMessageComponent).submitted).toBeFalse();
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
            expect(fixture.nativeElement.querySelector('nx-message').getAttribute('class')).not.toContain('context-info');
            expect(fixture.nativeElement.querySelector('.nx-message__icon')).not.toBeTruthy();
        });
    });
});

@Component({
    template: `<nx-message [context]="context"> lorem ipsum </nx-message>`,
})
class MessageBasicComponent extends MessageTest {}

@Component({
    template: `<nx-message [context]="context"> lorem ipsum </nx-message>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class MessageOnPushComponent extends MessageTest {}

@Component({
    template: `<nx-message [closable]="closable"> lorem ipsum </nx-message>`,
})
class ClosableMessageComponent extends MessageTest {
    closable = true;
}

@Component({
    template: `
        <form (ngSubmit)="submitted = true">
            <nx-message [closable]="closable"> lorem ipsum </nx-message>
        </form>
    `,
})
class ClosableFormMessageComponent extends MessageTest {
    closable = true;
    submitted = false;
}
