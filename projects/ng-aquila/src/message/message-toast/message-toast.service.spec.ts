import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxMessageModule } from '../message.module';
import { NxMessageToastService } from './message-toast.service';

describe('NxMessageToast', () => {
    let messageToastService: NxMessageToastService;
    let liveAnnouncer: LiveAnnouncer;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let fixture: ComponentFixture<BasicMessageToastTest>;
    const text = 'MessageToast message!';

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxMessageToastTestModule, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(inject([NxMessageToastService, LiveAnnouncer, OverlayContainer], (ns: NxMessageToastService, la: LiveAnnouncer, oc: OverlayContainer) => {
        messageToastService = ns;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
        liveAnnouncer.ngOnDestroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicMessageToastTest);
        fixture.detectChanges();
    });

    describe('open with text', () => {
        it('should be closed at the beginning', () => {
            const containerElement = overlayContainerElement.querySelector('nx-message-toast');
            expect(containerElement).toBeFalsy();
        });

        it('should open a simple message from text', () => {
            messageToastService.open(text);

            const containerElement = overlayContainerElement.querySelector('nx-message-toast');
            expect(containerElement?.textContent?.trim()).toBe(text);
        });

        it('should open and close a message toast', fakeAsync(() => {
            const toastRef = messageToastService.open(text);
            fixture.detectChanges();

            const messageElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(messageElement.textContent).toContain(text);

            toastRef.dismiss();
            fixture.detectChanges();
            flush();

            expect(overlayContainerElement.childNodes).toHaveSize(0);
        }));

        it('should remove past message toasts when opening new message toasts', fakeAsync(() => {
            messageToastService.open('First message toast', { duration: 0 });
            fixture.detectChanges();

            messageToastService.open('Second message toast', { duration: 0 });
            fixture.detectChanges();
            flush();

            messageToastService.open('Third message toast', { duration: 0 });
            fixture.detectChanges();
            flush();

            expect(overlayContainerElement.textContent!.trim()).toBe('Third message toast');
        }));

        it('should reflect config in the template', () => {
            messageToastService.open(text, { context: 'success', duration: 0 });
            fixture.detectChanges();

            const messageElement = overlayContainerElement.querySelector('nx-message.context-success')!;
            expect(messageElement.textContent).toBeTruthy();
        });
    });

    describe('open from template', () => {
        let templateFixture: ComponentFixture<ComponentWithTemplateRef>;

        beforeEach(() => {
            templateFixture = TestBed.createComponent(ComponentWithTemplateRef);
            templateFixture.detectChanges();
        });

        it('should be able to open', () => {
            messageToastService.openFromTemplate(templateFixture.componentInstance.templateRef);
            templateFixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;

            expect(containerElement.textContent).toContain('Testing template');
        });

        it('should reflect config in the template', () => {
            messageToastService.openFromTemplate(templateFixture.componentInstance.templateRef, { context: 'success' });
            templateFixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message.context-success')!;
            expect(containerElement.textContent).toContain('Testing template');
        });

        it('should be able to open and close', fakeAsync(() => {
            const toastRef = messageToastService.openFromTemplate(templateFixture.componentInstance.templateRef, { context: 'success' });
            templateFixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(containerElement.textContent).toContain('Testing template');

            toastRef.dismiss();
            fixture.detectChanges();
            flush();

            expect(overlayContainerElement.childNodes).toHaveSize(0);
        }));
    });

    describe('open from component', () => {
        let componentFixture: ComponentFixture<BasicMessageToastTest>;

        beforeEach(() => {
            componentFixture = TestBed.createComponent(BasicMessageToastTest);
            componentFixture.detectChanges();
        });

        it('should be able to open', () => {
            messageToastService.openFromComponent(SimpleMessageToastComponent);
            componentFixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;

            expect(containerElement.textContent).toContain('Message from a component');
        });

        it('should be able to open and close', fakeAsync(() => {
            const toastRef = messageToastService.openFromComponent(SimpleMessageToastComponent, { context: 'success' });
            componentFixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(containerElement.textContent).toContain('Message from a component');

            toastRef.dismiss();
            fixture.detectChanges();
            flush();

            expect(overlayContainerElement.childNodes).toHaveSize(0);
        }));
    });

    it('should dismiss automatically after a specified timeout', fakeAsync(() => {
        const toastRef = messageToastService.open('content', { duration: 300 });
        const afterDismissSpy = jasmine.createSpy('after dismiss spy');
        toastRef.afterDismissed().subscribe(afterDismissSpy);

        fixture.detectChanges();
        tick();
        expect(afterDismissSpy).not.toHaveBeenCalled();

        tick(300);
        fixture.detectChanges();
        tick();
        expect(afterDismissSpy).toHaveBeenCalled();
    }));

    it('should emit afterDismissed after dismiss', fakeAsync(() => {
        const toastRef = messageToastService.open('content');
        const afterDismissSpy = jasmine.createSpy('after dismiss spy');
        toastRef.afterDismissed().subscribe(afterDismissSpy);

        toastRef.dismiss();
        fixture.detectChanges();
        tick();

        expect(afterDismissSpy).toHaveBeenCalled();
    }));

    it('should dismiss the open message toast on service destroy', fakeAsync(() => {
        messageToastService.open(text);
        fixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

        messageToastService.ngOnDestroy();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.childElementCount).toBe(0);
    }));

    it('should be able to get dismissed through the service', fakeAsync(() => {
        messageToastService.open('test');
        fixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBe(1);

        messageToastService.dismiss();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.childElementCount).toBe(0);
    }));

    it('should set the animation state to visible on entry', () => {
        const toastRef = messageToastService.open('test');
        fixture.detectChanges();

        expect(toastRef.toastInstance._animationState).toBe('visible');
        toastRef.dismiss();

        fixture.detectChanges();
        expect(toastRef.toastInstance._animationState).toBe('hidden');
    });

    it('should set the animation state to complete on exit', () => {
        const toastRef = messageToastService.open('');
        toastRef.dismiss();

        fixture.detectChanges();
        expect(toastRef.toastInstance._animationState).toBe('hidden');
    });

    describe('a11y', () => {
        it('should have the role of `alert` with an `assertive` politeness if no announcement message is provided', () => {
            messageToastService.open('test', { announcementMessage: '', politeness: 'assertive' });
            fixture.detectChanges();

            const messageToastElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(messageToastElement.getAttribute('role')).toBe('alert');
        });

        it('should have the role of `status` with an `assertive` politeness if an announcement message is provided', () => {
            messageToastService.open('', { announcementMessage: 'Yay Burritos', politeness: 'assertive' });
            fixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(containerElement.getAttribute('role')).toBe('status');
        });

        it('should have the role of `status` with a `polite` politeness', () => {
            messageToastService.open('test', { politeness: 'polite' });
            fixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(containerElement.getAttribute('role')).toBe('status');
        });

        it('should remove the role if the politeness is turned off', () => {
            messageToastService.open('test', { politeness: 'off' });
            fixture.detectChanges();

            const containerElement = overlayContainerElement.querySelector('nx-message-toast')!;
            expect(containerElement.getAttribute('role')).toBeFalsy();
        });

        it('has no accessibility violations', async () => {
            messageToastService.open('test');
            fixture.detectChanges();
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

describe('NxMessageToast with parent and child service', () => {
    let parentService: NxMessageToastService;
    let childService: NxMessageToastService;
    let liveAnnouncer: LiveAnnouncer;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    let fixture: ComponentFixture<ComponentProvidingService>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxMessageToastTestModule, NoopAnimationsModule],
            declarations: [ComponentProvidingService],
        }).compileComponents();
    }));

    beforeEach(inject([NxMessageToastService, LiveAnnouncer, OverlayContainer], (ns: NxMessageToastService, la: LiveAnnouncer, oc: OverlayContainer) => {
        parentService = ns;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
        liveAnnouncer.ngOnDestroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentProvidingService);
        childService = fixture.componentInstance.messageToastService;
        fixture.detectChanges();
    });

    it('should close message toasts opened by child when opening from parent', fakeAsync(() => {
        childService.open('Child message toast', { duration: 0 });
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent!.trim()).toBe('Child message toast');

        parentService.open('Parent message toast', { duration: 0 });
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent!.trim()).toBe('Parent message toast');
    }));

    it('should close message toasts opened by parent when opening from child', fakeAsync(() => {
        parentService.open('Parent message toast', { duration: 0 });
        fixture.detectChanges();

        expect(overlayContainerElement.textContent!.trim()).toBe('Parent message toast');

        childService.open('Child message toast', { duration: 0 });
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent!.trim()).toBe('Child message toast');
    }));

    it('should not dismiss parent message toast if child is destroyed', fakeAsync(() => {
        parentService.open('Parent', { duration: 0 });
        fixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBe(1);

        childService.ngOnDestroy();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.childElementCount).toBe(1);
        expect(overlayContainerElement.textContent!.trim()).toBe('Parent');
    }));
});

@Component({
    template: ``,
})
class BasicMessageToastTest {}

@Component({
    template: `<ng-template> Testing template </ng-template>`,
})
class ComponentWithTemplateRef {
    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
}

@Component({
    template: '',
    providers: [NxMessageToastService],
})
class ComponentProvidingService {
    constructor(readonly messageToastService: NxMessageToastService) {}
}

@NgModule({
    imports: [CommonModule, NxMessageModule],
    exports: [BasicMessageToastTest, ComponentWithTemplateRef],
    declarations: [BasicMessageToastTest, ComponentWithTemplateRef],
})
class NxMessageToastTestModule {}

@Component({
    template: `<div class="u-text-center">
        <h3>Message from a component</h3>
        <p>This text comes from the SimpleMessageToastComponent.</p>
    </div>`,
})
class SimpleMessageToastComponent {}
