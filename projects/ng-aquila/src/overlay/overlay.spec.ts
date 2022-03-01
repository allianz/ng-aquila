import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NxButtonComponent, NxButtonModule } from '@aposin/ng-aquila/button';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxOverlayModule } from './overlay.module';
import { NxOverlayRef } from './overlay-ref';
import { NxOverlayService } from './overlay-service';

describe('NxOverlayService', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let overlayService: NxOverlayService;
    let fixture: ComponentFixture<ComponentWithTemplateRef>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxOverlayModule, OverlayTestModule, RouterTestingModule.withRoutes([]), NxButtonModule],
            declarations: [TestRootComponent],
            providers: [],
        });

        TestBed.compileComponents();

        inject([OverlayContainer, NxOverlayService], (oc: OverlayContainer, o: NxOverlayService) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            overlayService = o;
        })();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentWithTemplateRef);
        fixture.detectChanges();
    });

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
        overlayService.openOverlays.forEach(o => o.close());
    }));

    it('should open a template', fakeAsync(() => {
        const template = fixture.componentInstance.templateRef;
        const trigger = fixture.componentInstance.trigger;
        const overlayRef = overlayService.open(template, trigger, { direction: 'bottom' });
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.textContent).toContain('Hello');
    }));

    it('should open a component', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.textContent).toContain('Hello World');
    }));

    it('should close overlays when service is destroyed', fakeAsync(() => {
        overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelectorAll('.nx-overlay-container')).toHaveSize(2);
        overlayService.ngOnDestroy();
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelectorAll('.nx-overlay-container')).toHaveSize(0);
    }));

    it('should show backdrop', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger, { hasBackdrop: true });
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
    }));

    it('should not show backdrop by default', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
    }));

    it('should close on escape', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        fixture.detectChanges();
        flush();
        const containerElement = overlayContainerElement.querySelector('.nx-overlay-container');
        dispatchKeyboardEvent(containerElement as Node, 'keydown', ESCAPE, 'Escape');
        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeFalsy();
        flush();
    }));

    it('should close on click outside the overlay', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('.nx-overlay-container')).toBeTruthy();
        document.dispatchEvent(new MouseEvent('click'));

        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeFalsy();
    }));

    it('should not close on click outside when closeOnClickOutside is false', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger, { closeOnClickOutside: false });
        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeTruthy();
        document.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeTruthy();
    }));

    it('should close on backdrop click', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger, { hasBackdrop: true });
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeTruthy();
        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        backdrop.click();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeFalsy();
    }));

    it('should not close on backdrop click when closeOnClickOutside is false ', fakeAsync(() => {
        overlayService.open(PlainComponent, fixture.componentInstance.trigger, { hasBackdrop: true, closeOnClickOutside: false });
        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeTruthy();
        fixture.detectChanges();
        flush();
        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        backdrop.click();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelector('nx-overlay-container')).toBeTruthy();
    }));

    it('should set active styles on trigger button', fakeAsync(() => {
        const overlayRef = overlayService.open(PlainComponent, fixture.componentInstance.trigger, { triggerButton: fixture.componentInstance.button });
        fixture.detectChanges();
        flush();
        expect(fixture.componentInstance.button.active).toBeTrue();
        overlayRef.close();
        fixture.detectChanges();
        flush();
        expect(fixture.componentInstance.button.active).toBeFalse();
    }));
});

@Component({
    template: `<button #button nxButton="tertiary small">Trigger</button>

        <ng-template let-data let-overlayRef="overlayRef"> Hello {{ localValue }} {{ data?.value }}{{ setDialogRef(overlayRef) }}</ng-template>`,
})
class ComponentWithTemplateRef {
    localValue!: string;
    overlayRef!: NxOverlayRef<any>;

    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
    @ViewChild('button') trigger!: ElementRef;
    @ViewChild(NxButtonComponent) button!: NxButtonComponent;

    setDialogRef(overlayRef: NxOverlayRef<any>): string {
        this.overlayRef = overlayRef;
        return '';
    }
}

@Component({
    template: `<button #button>Trigger</button> <router-outlet></router-outlet>`,
})
export class TestRootComponent {
    @ViewChild('button') trigger!: ElementRef;
}

@Component({
    template: `<div class="hello">Hello World</div>`,
})
class PlainComponent {}

@NgModule({
    imports: [NxOverlayModule, NxButtonModule],
    exports: [ComponentWithTemplateRef, PlainComponent],
    declarations: [ComponentWithTemplateRef, PlainComponent],
})
class OverlayTestModule {}
