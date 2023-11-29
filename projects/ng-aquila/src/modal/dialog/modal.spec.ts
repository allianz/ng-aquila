import { Directionality } from '@angular/cdk/bidi';
import { A, ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayContainer, ScrollStrategy } from '@angular/cdk/overlay';
import { _supportsShadowDom } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    Directive,
    Inject,
    Injector,
    NgModule,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NX_MODAL_DATA, NX_MODAL_DEFAULT_OPTIONS, NxDialogService, NxModalModule, NxModalRef, NxModalState } from '@aposin/ng-aquila/modal';
import { Subject } from 'rxjs';

import { createKeyboardEvent, dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxModalContainer } from './modal-container.component';

describe('NxDialog', () => {
    let dialog: NxDialogService;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    const scrolledSubject = new Subject();

    let testViewContainerRef: ViewContainerRef;
    let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
    let mockLocation: SpyLocation;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxModalModule, DialogTestModule],
            providers: [
                { provide: Location, useClass: SpyLocation },
                {
                    provide: ScrollDispatcher,
                    useFactory: () => ({
                        scrolled: () => scrolledSubject.asObservable(),
                    }),
                },
            ],
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([NxDialogService, Location, OverlayContainer], (d: NxDialogService, l: Location, oc: OverlayContainer) => {
        dialog = d;
        mockLocation = l as SpyLocation;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    beforeEach(() => {
        viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });

    it('should open a dialog with a component', () => {
        const dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef,
        });

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(dialogRef.componentInstance instanceof PizzaMsg).toBeTrue();
        expect(dialogRef.componentInstance.dialogRef).toEqual(dialogRef);

        viewContainerFixture.detectChanges();
        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    });

    it('should open a dialog with a template', () => {
        const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
        templateRefFixture.componentInstance.localValue = 'Bees';
        templateRefFixture.detectChanges();

        const data = { value: 'Knees' };

        const dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, { data });

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
        expect(templateRefFixture.componentInstance.modalRef).toBe(dialogRef);

        viewContainerFixture.detectChanges();

        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');

        dialogRef.close();
    });

    it('should emit when dialog opening animation is complete', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        const spy = jasmine.createSpy('afterOpen spy');

        dialogRef.afterOpened().subscribe(spy);

        viewContainerFixture.detectChanges();

        // callback should not be called before animation is complete
        expect(spy).not.toHaveBeenCalled();

        flushMicrotasks();
        expect(spy).toHaveBeenCalled();
    }));

    it('should use injector from viewContainerRef for DialogInjector', () => {
        const dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef,
        });

        viewContainerFixture.detectChanges();

        const dialogInjector = dialogRef.componentInstance.dialogInjector;

        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
        expect(dialogInjector.get<DirectiveWithViewContainer>(DirectiveWithViewContainer))
            .withContext('Expected the dialog component to be created with the injector from the viewContainerRef.')
            .toBeTruthy();
    });

    it('should open a dialog with a component and no ViewContainerRef', () => {
        const dialogRef = dialog.open(PizzaMsg);

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(dialogRef.componentInstance instanceof PizzaMsg).toBeTrue();
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

        viewContainerFixture.detectChanges();
        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    });

    it('should apply the configured role to the dialog element', () => {
        dialog.open(PizzaMsg, { role: 'alertdialog' });

        viewContainerFixture.detectChanges();

        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
    });

    it('should apply the specified `aria-describedby`', () => {
        dialog.open(PizzaMsg, { ariaDescribedBy: 'description-element' });

        viewContainerFixture.detectChanges();

        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement.getAttribute('aria-describedby')).toBe('description-element');
    });

    it('should close a dialog and get back a result', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        const afterCloseCallback = jasmine.createSpy('afterClose callback');

        dialogRef.afterClosed().subscribe(afterCloseCallback);
        dialogRef.close('test value');
        viewContainerFixture.detectChanges();
        flush();

        expect(afterCloseCallback).toHaveBeenCalledWith('test value');
        expect(overlayContainerElement.querySelector('nx-modal-container')).toBeNull();
    }));

    it('should dispose of dialog if view container is destroyed while animating', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

        dialogRef.close();
        viewContainerFixture.detectChanges();
        viewContainerFixture.destroy();
        flush();

        expect(overlayContainerElement.querySelector('nx-modal-container')).toBeNull();
    }));

    it('should dispatch the beforeClosed and afterClosed events when the overlay is detached externally', fakeAsync(
        inject([Overlay], (overlay: Overlay) => {
            const dialogRef = dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                scrollStrategy: overlay.scrollStrategies.close(),
            });
            const beforeClosedCallback = jasmine.createSpy('beforeClosed callback');
            const afterCloseCallback = jasmine.createSpy('afterClosed callback');

            dialogRef.beforeClosed().subscribe(beforeClosedCallback);
            dialogRef.afterClosed().subscribe(afterCloseCallback);

            scrolledSubject.next();
            viewContainerFixture.detectChanges();
            flush();

            expect(beforeClosedCallback).toHaveBeenCalledTimes(1);
            expect(afterCloseCallback).toHaveBeenCalledTimes(1);
        }),
    ));

    it('should apply ltr direction to the modal if none provided', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect((dialogRef as any)._overlayRef.getDirection()).toBe('ltr');
    }));

    it('should apply passed direction to the modal', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef, direction: 'rtl' });
        viewContainerFixture.detectChanges();
        expect((dialogRef as any)._overlayRef.getDirection()).toBe('rtl');
    }));

    describe('closing', () => {
        it('should close a dialog and get back a result before it is closed', fakeAsync(() => {
            const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

            flush();
            viewContainerFixture.detectChanges();

            // beforeClose should emit before dialog container is destroyed
            const beforeCloseHandler = jasmine.createSpy('beforeClose callback').and.callFake(() => {
                expect(overlayContainerElement.querySelector('nx-modal-container'))
                    .withContext('dialog container exists when beforeClose is called')
                    .not.toBeNull();
            });

            dialogRef.beforeClosed().subscribe(beforeCloseHandler);
            dialogRef.close('Bulbasaur');
            viewContainerFixture.detectChanges();
            flush();

            expect(beforeCloseHandler).toHaveBeenCalledWith('Bulbasaur');
            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeNull();
        }));

        it('should close a dialog via the escape key', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
            });

            const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeNull();
            expect(event.defaultPrevented).toBeTrue();
        }));

        it('should not close a dialog via the escape key with a modifier', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
            });

            const event = createKeyboardEvent('keydown', ESCAPE);
            Object.defineProperty(event, 'altKey', { get: () => true });
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();
            expect(event.defaultPrevented).toBeFalse();
        }));

        it('should close from a ViewContainerRef with OnPush change detection', fakeAsync(() => {
            const onPushFixture = TestBed.createComponent(ComponentWithOnPushViewContainer);

            onPushFixture.detectChanges();

            const dialogRef = dialog.open(PizzaMsg, {
                viewContainerRef: onPushFixture.componentInstance.viewContainerRef,
            });

            flushMicrotasks();
            onPushFixture.detectChanges();
            flushMicrotasks();

            expect(overlayContainerElement.querySelectorAll('nx-modal-container')).withContext('Expected one open dialog.').toHaveSize(1);

            dialogRef.close();
            flushMicrotasks();
            onPushFixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.querySelectorAll('nx-modal-container')).withContext('Expected no open dialogs.').toHaveSize(0);
        }));

        it('should close when clicking on the overlay backdrop', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeFalsy();
        }));

        it('should close when clicking on the close icon button', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                showCloseIcon: true,
            });

            viewContainerFixture.detectChanges();

            const closeIconButton = overlayContainerElement.querySelector('.nx-modal__close') as HTMLElement;
            expect(closeIconButton.getAttribute('aria-label')).toBe('Close dialog');

            closeIconButton.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeFalsy();
        }));

        it('should add a custom aria-label to the close icon button', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                showCloseIcon: true,
                closeIconButtonLabel: 'best label',
            });

            viewContainerFixture.detectChanges();

            const closeIconButton = overlayContainerElement.querySelector('.nx-modal__close') as HTMLElement;

            expect(closeIconButton.getAttribute('aria-label')).toBe('best label');
        }));

        it('should not close modal and emit closeDenied stream when shouldClose return false', fakeAsync(() => {
            const modalRef = dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                showCloseIcon: true,
                closeIconButtonLabel: 'best label',
                shouldClose: () => false,
            });

            const spy = jasmine.createSpy('closeDenied spy');
            modalRef.closeDenied.subscribe(spy);
            viewContainerFixture.detectChanges();

            const closeIconButton = overlayContainerElement.querySelector('.nx-modal__close') as HTMLElement;
            closeIconButton.click();

            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });

    it('should emit the backdropClick stream when clicking on the overlay backdrop', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef,
        });

        const spy = jasmine.createSpy('backdropClick spy');
        dialogRef.backdropClick().subscribe(spy);

        viewContainerFixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);

        viewContainerFixture.detectChanges();
        flush();

        // Additional clicks after the dialog has closed should not be emitted
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should emit the keyboardEvent stream when key events target the overlay', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

        const spy = jasmine.createSpy('keyboardEvent spy');
        dialogRef.keydownEvents().subscribe(spy);

        viewContainerFixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        const container = overlayContainerElement.querySelector('nx-modal-container') as HTMLElement;
        dispatchKeyboardEvent(document.body, 'keydown', A);
        dispatchKeyboardEvent(backdrop, 'keydown', A);
        dispatchKeyboardEvent(container, 'keydown', A);

        expect(spy).toHaveBeenCalledTimes(3);
    }));

    it('should notify the observers if a dialog has been opened', () => {
        dialog.afterOpened.subscribe(ref => {
            expect(
                dialog.open(PizzaMsg, {
                    viewContainerRef: testViewContainerRef,
                }),
            ).toBe(ref);
        });
    });

    it('should notify the observers if all open dialogs have finished closing', fakeAsync(() => {
        const ref1 = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        const ref2 = dialog.open(ContentElementDialog, { viewContainerRef: testViewContainerRef });
        const spy = jasmine.createSpy('afterAllClosed spy');

        dialog.afterAllClosed.subscribe(spy);

        ref1.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(spy).not.toHaveBeenCalled();

        ref2.close();
        viewContainerFixture.detectChanges();
        flush();
        expect(spy).toHaveBeenCalled();
    }));

    it('should emit the afterAllClosed stream on subscribe if there are no open dialogs', () => {
        const spy = jasmine.createSpy('afterAllClosed spy');

        dialog.afterAllClosed.subscribe(spy);

        expect(spy).toHaveBeenCalled();
    });

    it('should override the width of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            width: '500px',
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.width).toBe('500px');
    });

    it('should override the height of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            height: '100px',
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.height).toBe('100px');
    });

    it('should override the min-width of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            minWidth: '500px',
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.minWidth).toBe('500px');
    });

    it('should override the max-width of the overlay pane', fakeAsync(() => {
        let dialogRef = dialog.open(PizzaMsg);

        viewContainerFixture.detectChanges();

        let overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.maxWidth).withContext('Expected dialog to set a default max-width on overlay pane').toBe('736px');

        dialogRef.close();

        tick(500);
        viewContainerFixture.detectChanges();
        flushMicrotasks();

        dialogRef = dialog.open(PizzaMsg, {
            maxWidth: '100px',
        });

        viewContainerFixture.detectChanges();

        overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.maxWidth).toBe('100px');
    }));

    it('should override the min-height of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            minHeight: '300px',
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.minHeight).toBe('300px');
    });

    it('should override the max-height of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            maxHeight: '100px',
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.maxHeight).toBe('100px');
    });

    it('should override the top offset of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            position: {
                top: '100px',
            },
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.marginTop).toBe('100px');
    });

    it('should override the bottom offset of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            position: {
                bottom: '200px',
            },
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.marginBottom).toBe('200px');
    });

    it('should override the left offset of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            position: {
                left: '250px',
            },
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.marginLeft).toBe('250px');
    });

    it('should override the right offset of the overlay pane', () => {
        dialog.open(PizzaMsg, {
            position: {
                right: '125px',
            },
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.marginRight).toBe('125px');
    });

    it('should allow for the position to be updated', () => {
        const dialogRef = dialog.open(PizzaMsg, {
            position: {
                left: '250px',
            },
        });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.marginLeft).toBe('250px');

        dialogRef.updatePosition({ left: '500px' });

        expect(overlayPane.style.marginLeft).toBe('500px');
    });

    it('should allow for the dimensions to be updated', () => {
        const dialogRef = dialog.open(PizzaMsg, { width: '100px' });

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.width).toBe('100px');

        dialogRef.updateSize('200px');

        expect(overlayPane.style.width).toBe('200px');
    });

    it('should reset the overlay dimensions to their initial size', () => {
        const dialogRef = dialog.open(PizzaMsg);

        viewContainerFixture.detectChanges();

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

        expect(overlayPane.style.width).toBe('736px');
        expect(overlayPane.style.height).toBeFalsy();

        dialogRef.updateSize('200px', '200px');

        expect(overlayPane.style.width).toBe('200px');
        expect(overlayPane.style.height).toBe('200px');

        dialogRef.updateSize();

        expect(overlayPane.style.width).toBeFalsy();
        expect(overlayPane.style.height).toBeFalsy();
    });

    it('should fall back to injecting the global direction if none is passed by the config', () => {
        const dialogRef = dialog.open(PizzaMsg, {});

        viewContainerFixture.detectChanges();

        expect(dialogRef.componentInstance.directionality.value).toBe('ltr');
    });

    it('should use the passed in ViewContainerRef from the config', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        flush();

        // One view ref is for the container and one more for the component with the content.
        expect(testViewContainerRef).toHaveSize(2);

        dialogRef.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(testViewContainerRef).toHaveSize(0);
    }));

    it('should close all of the dialogs', fakeAsync(() => {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(3);

        dialog.closeAll();
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(0);
    }));

    it('should set the proper animation states', () => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        const dialogContainer: NxModalContainer = viewContainerFixture.debugElement.query(By.directive(NxModalContainer))!.componentInstance;

        expect(dialogContainer._state).toBe('enter');

        dialogRef.close();

        expect(dialogContainer._state).toBe('exit');
    });

    it('should close all dialogs when the user goes forwards/backwards in history', fakeAsync(() => {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(2);

        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(0);
    }));

    it('should close all open dialogs when the location hash changes', fakeAsync(() => {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(2);

        mockLocation.simulateHashChange('');
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(0);
    }));

    it('should close all of the dialogs when the injectable is destroyed', fakeAsync(() => {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg);

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(3);

        dialog.ngOnDestroy();
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(0);
    }));

    it('should complete open and close streams when the injectable is destroyed', fakeAsync(() => {
        const afterOpenedSpy = jasmine.createSpy('after opened spy');
        const afterAllClosedSpy = jasmine.createSpy('after all closed spy');
        const afterOpenedSubscription = dialog.afterOpened.subscribe({ complete: afterOpenedSpy });
        const afterAllClosedSubscription = dialog.afterAllClosed.subscribe({
            complete: afterAllClosedSpy,
        });

        dialog.ngOnDestroy();

        expect(afterOpenedSpy).toHaveBeenCalled();
        expect(afterAllClosedSpy).toHaveBeenCalled();

        afterOpenedSubscription.unsubscribe();
        afterAllClosedSubscription.unsubscribe();
    }));

    it('should allow the consumer to disable closing a dialog on navigation', fakeAsync(() => {
        dialog.open(PizzaMsg);
        dialog.open(PizzaMsg, { closeOnNavigation: false });

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(2);

        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelectorAll('nx-modal-container')).toHaveSize(1);
    }));

    it('should have the componentInstance available in the afterClosed callback', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg);
        const spy = jasmine.createSpy('afterClosed spy');

        flushMicrotasks();
        viewContainerFixture.detectChanges();
        flushMicrotasks();

        dialogRef.afterClosed().subscribe(() => {
            spy();
            expect(dialogRef.componentInstance).withContext('Expected component instance to be defined.').toBeTruthy();
        });

        dialogRef.close();

        flushMicrotasks();
        viewContainerFixture.detectChanges();
        tick(500);

        // Ensure that the callback actually fires.
        expect(spy).toHaveBeenCalled();
    }));

    it('should be able to attach a custom scroll strategy', fakeAsync(() => {
        const scrollStrategy: ScrollStrategy = {
            attach: () => {},
            enable: jasmine.createSpy('scroll strategy enable spy'),
            disable: () => {},
        };

        dialog.open(PizzaMsg, { scrollStrategy });
        expect(scrollStrategy.enable).toHaveBeenCalled();
    }));

    it('should be able to pass in an alternate ComponentFactoryResolver', inject([ComponentFactoryResolver], (resolver: ComponentFactoryResolver) => {
        spyOn(resolver, 'resolveComponentFactory').and.callThrough();

        dialog.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef,
            componentFactoryResolver: resolver,
        });
        viewContainerFixture.detectChanges();

        expect(resolver.resolveComponentFactory).toHaveBeenCalledWith(PizzaMsg);
    }));

    it('should return the current state of the dialog', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

        expect(dialogRef.getState()).toBe(NxModalState.OPEN);
        dialogRef.close();
        viewContainerFixture.detectChanges();

        expect(dialogRef.getState()).toBe(NxModalState.CLOSING);
        flush();

        expect(dialogRef.getState()).toBe(NxModalState.CLOSED);
    }));

    describe('passing in data', () => {
        it('should be able to pass in data', () => {
            const config = {
                data: {
                    stringParam: 'hello',
                    dateParam: new Date(),
                },
            };

            const instance = dialog.open(DialogWithInjectedData, config).componentInstance;

            expect(instance.data.stringParam).toBe(config.data.stringParam);
            expect(instance.data.dateParam).toBe(config.data.dateParam);
        });

        it('should default to null if no data is passed', () => {
            expect(() => {
                const dialogRef = dialog.open(DialogWithInjectedData);
                expect(dialogRef.componentInstance.data).toBeNull();
            }).not.toThrow();
        });
    });

    it('should not keep a reference to the component after the dialog is closed', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg);

        expect(dialogRef.componentInstance).toBeTruthy();

        dialogRef.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(dialogRef.componentInstance).withContext('Expected reference to have been cleared.').toBeFalsy();
    }));

    it('should assign a unique id to each dialog', () => {
        const one = dialog.open(PizzaMsg);
        const two = dialog.open(PizzaMsg);

        expect(one.id).toBeTruthy();
        expect(two.id).toBeTruthy();
        expect(one.id).not.toBe(two.id);
    });

    it('should allow for the id to be overwritten', () => {
        const dialogRef = dialog.open(PizzaMsg, { id: 'pizza' });
        expect(dialogRef.id).toBe('pizza');
    });

    it('should throw when trying to open a dialog with the same id as another dialog', () => {
        dialog.open(PizzaMsg, { id: 'pizza' });
        expect(() => dialog.open(PizzaMsg, { id: 'pizza' })).toThrowError(/must be unique/g);
    });

    it('should be able to find a dialog by id', () => {
        const dialogRef = dialog.open(PizzaMsg, { id: 'pizza' });
        expect(dialog.getModalById('pizza')).toBe(dialogRef);
    });

    it('should toggle `aria-hidden` on the overlay container siblings', fakeAsync(() => {
        const sibling = document.createElement('div');
        overlayContainerElement.parentNode!.appendChild(sibling);

        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        flush();

        expect(sibling.getAttribute('aria-hidden')).withContext('Expected sibling to be hidden').toBe('true');
        expect(overlayContainerElement.hasAttribute('aria-hidden')).withContext('Expected overlay container not to be hidden.').toBeFalse();

        dialogRef.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(sibling.hasAttribute('aria-hidden')).withContext('Expected sibling to no longer be hidden.').toBeFalse();
        sibling.parentNode!.removeChild(sibling);
    }));

    it('should restore `aria-hidden` to the overlay container siblings on close', fakeAsync(() => {
        const sibling = document.createElement('div');

        sibling.setAttribute('aria-hidden', 'true');
        overlayContainerElement.parentNode!.appendChild(sibling);

        const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        flush();

        expect(sibling.getAttribute('aria-hidden')).withContext('Expected sibling to be hidden.').toBe('true');

        dialogRef.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(sibling.getAttribute('aria-hidden')).withContext('Expected sibling to remain hidden.').toBe('true');
        sibling.parentNode!.removeChild(sibling);
    }));

    it('should not set `aria-hidden` on `aria-live` elements', fakeAsync(() => {
        const sibling = document.createElement('div');

        sibling.setAttribute('aria-live', 'polite');
        overlayContainerElement.parentNode!.appendChild(sibling);

        dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        flush();

        expect(sibling.hasAttribute('aria-hidden')).withContext('Expected live element not to be hidden.').toBeFalse();
        sibling.parentNode!.removeChild(sibling);
    }));

    it('should add and remove classes while open', () => {
        const dialogRef = dialog.open(PizzaMsg, {
            disableClose: true,
            viewContainerRef: testViewContainerRef,
        });

        const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
        expect(pane).withContext('Expected class to be initially missing').not.toHaveClass('custom-class-one');

        dialogRef.addPanelClass('custom-class-one');
        expect(pane).withContext('Expected class to be added').toHaveClass('custom-class-one');

        dialogRef.removePanelClass('custom-class-one');
        expect(pane).withContext('Expected class to be removed').not.toHaveClass('custom-class-one');
    });

    it('has expert appearance', fakeAsync(() => {
        const dialogRef = dialog.open(PizzaMsg, {
            appearance: 'expert',
        });
        viewContainerFixture.detectChanges();
        flush();

        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        expect(dialogContainerElement).toHaveClass('is-expert');
    }));

    it('should show correct class for status and title', fakeAsync(() => {
        const dialogRef = dialog.open(TitleStatusDialog);
        viewContainerFixture.detectChanges();
        flush();

        const dialogContainerElement = overlayContainerElement.querySelector('nx-modal-container')!;
        const status = dialogContainerElement.querySelector('.nx-modal__status')!;
        const title = dialogContainerElement.querySelector('.nx-modal__title')!;
        expect(status).toBeTruthy();
        expect(title).toBeTruthy();
    }));

    describe('disableClose option', () => {
        it('should prevent closing via clicks on the backdrop', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();
        }));

        it('should prevent closing via the escape key', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();
            dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();
        }));

        it('should allow for the disableClose option to be updated while open', fakeAsync(() => {
            const dialogRef = dialog.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
            backdrop.click();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();

            dialogRef.disableClose = false;
            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('nx-modal-container')).toBeFalsy();
        }));
    });

    describe('hasBackdrop option', () => {
        it('should have a backdrop', () => {
            dialog.open(PizzaMsg, {
                hasBackdrop: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
        });

        it('should not have a backdrop', () => {
            dialog.open(PizzaMsg, {
                hasBackdrop: false,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
        });
    });

    describe('panelClass option', () => {
        it('should have custom panel class', () => {
            dialog.open(PizzaMsg, {
                panelClass: 'custom-panel-class',
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.custom-panel-class')).toBeTruthy();
        });
    });

    describe('backdropClass option', () => {
        it('should have default backdrop class', () => {
            dialog.open(PizzaMsg, {
                backdropClass: '',
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop')).toBeTruthy();
        });

        it('should have custom backdrop class', () => {
            dialog.open(PizzaMsg, {
                backdropClass: 'custom-backdrop-class',
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.custom-backdrop-class')).toBeTruthy();
        });
    });

    describe('focus management', () => {
        // When testing focus, all of the elements must be in the DOM.
        beforeEach(() => document.body.appendChild(overlayContainerElement));

        afterEach(() => document.body.removeChild(overlayContainerElement));

        it('should focus the first tabbable element of the dialog on open', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.tagName).withContext('Expected first tabbable element (input) in the dialog to be focused.').toBe('INPUT');
        }));

        it('should allow disabling focus of the first tabbable element', fakeAsync(() => {
            dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                autoFocus: false,
            });

            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.tagName).not.toBe('INPUT');
        }));

        it('should re-focus trigger element when dialog closes', fakeAsync(() => {
            // Create a element that has focus before the dialog is opened.
            const button = document.createElement('button');
            button.id = 'dialog-trigger';
            document.body.appendChild(button);
            button.focus();

            const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.id).withContext('Expected the focus to change when dialog was opened.').not.toBe('dialog-trigger');

            dialogRef.close();
            expect(document.activeElement!.id).withContext('Expcted the focus not to have changed before the animation finishes.').not.toBe('dialog-trigger');

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            tick(500);

            expect(document.activeElement!.id).withContext('Expected that the trigger was refocused after the dialog is closed.').toBe('dialog-trigger');

            document.body.removeChild(button);
        }));

        it('should re-focus trigger element inside the shadow DOM when dialog closes', fakeAsync(() => {
            if (!_supportsShadowDom()) {
                return;
            }

            viewContainerFixture.destroy();
            const fixture = TestBed.createComponent(ShadowDomComponent);
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'))!.nativeElement;

            button.focus();

            const dialogRef = dialog.open(PizzaMsg);
            flushMicrotasks();
            fixture.detectChanges();
            flushMicrotasks();

            const spy = spyOn(button, 'focus').and.callThrough();
            dialogRef.close();
            flushMicrotasks();
            fixture.detectChanges();
            tick(500);

            expect(spy).toHaveBeenCalled();
        }));

        it('should allow the consumer to shift focus in afterClosed', fakeAsync(() => {
            // Create a element that has focus before the dialog is opened.
            const button = document.createElement('button');
            const input = document.createElement('input');

            button.id = 'dialog-trigger';
            input.id = 'input-to-be-focused';

            document.body.appendChild(button);
            document.body.appendChild(input);
            button.focus();

            const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

            tick(500);
            viewContainerFixture.detectChanges();

            dialogRef.afterClosed().subscribe(() => input.focus());
            dialogRef.close();

            tick(500);
            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.id).withContext('Expected that the trigger was refocused after the dialog is closed.').toBe('input-to-be-focused');

            document.body.removeChild(button);
            document.body.removeChild(input);
            flush();
        }));

        it('should move focus to the container if there are no focusable elements in the dialog', fakeAsync(() => {
            dialog.open(DialogWithoutFocusableElements);

            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.tagName).withContext('Expected dialog container to be focused.').toBe('NX-MODAL-CONTAINER');
        }));

        it('should be able to disable focus restoration', fakeAsync(() => {
            // Create a element that has focus before the dialog is opened.
            const button = document.createElement('button');
            button.id = 'dialog-trigger';
            document.body.appendChild(button);
            button.focus();

            const dialogRef = dialog.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                restoreFocus: false,
            });

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.id).withContext('Expected the focus to change when dialog was opened.').not.toBe('dialog-trigger');

            dialogRef.close();
            flushMicrotasks();
            viewContainerFixture.detectChanges();
            tick(500);

            expect(document.activeElement!.id).withContext('Expected focus not to have been restored.').not.toBe('dialog-trigger');

            document.body.removeChild(button);
        }));

        it('should not move focus if it was moved outside the dialog while animating', fakeAsync(() => {
            // Create a element that has focus before the dialog is opened.
            const button = document.createElement('button');
            const otherButton = document.createElement('button');
            const body = document.body;
            button.id = 'dialog-trigger';
            otherButton.id = 'other-button';
            body.appendChild(button);
            body.appendChild(otherButton);
            button.focus();

            const dialogRef = dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            flushMicrotasks();

            expect(document.activeElement!.id).withContext('Expected the focus to change when dialog was opened.').not.toBe('dialog-trigger');

            // Start the closing sequence and move focus out of dialog.
            dialogRef.close();
            otherButton.focus();

            expect(document.activeElement!.id).withContext('Expected focus to be on the alternate button.').toBe('other-button');

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            flush();

            expect(document.activeElement!.id).withContext('Expected focus to stay on the alternate button.').toBe('other-button');

            body.removeChild(button);
            body.removeChild(otherButton);
        }));
    });

    describe('dialog content elements', () => {
        let dialogRef: NxModalRef<any>;

        describe('inside component dialog', () => {
            beforeEach(fakeAsync(() => {
                dialogRef = dialog.open(ContentElementDialog, { viewContainerRef: testViewContainerRef });
                viewContainerFixture.detectChanges();
                flush();
            }));

            runContentElementTests();
        });

        describe('inside template portal', () => {
            beforeEach(fakeAsync(() => {
                const fixture = TestBed.createComponent(ComponentWithContentElementTemplateRef);
                fixture.detectChanges();

                dialogRef = dialog.open(fixture.componentInstance.templateRef, {
                    viewContainerRef: testViewContainerRef,
                });

                viewContainerFixture.detectChanges();
                flush();
            }));

            runContentElementTests();
        });

        function runContentElementTests() {
            it('should add the respective classes for content and action sections', fakeAsync(() => {
                expect(overlayContainerElement.querySelectorAll('.nx-modal__content')).toHaveSize(1);
                expect(overlayContainerElement.querySelectorAll('.nx-modal__actions')).toHaveSize(1);
            }));

            it('should close the dialog when clicking on the close button', fakeAsync(() => {
                expect(overlayContainerElement.querySelectorAll('.nx-modal__container')).toHaveSize(1);

                (overlayContainerElement.querySelector('button[nxModalClose]') as HTMLElement).click();
                viewContainerFixture.detectChanges();
                flush();

                expect(overlayContainerElement.querySelectorAll('.nx-modal__container')).toHaveSize(0);
            }));

            it('should not close if [nxModalClose] is applied on a non-button node', () => {
                expect(overlayContainerElement.querySelectorAll('.nx-modal__container')).toHaveSize(1);

                (overlayContainerElement.querySelector('div[nxModalClose]') as HTMLElement).click();

                expect(overlayContainerElement.querySelectorAll('.nx-modal__container')).toHaveSize(1);
            });

            it('should allow for a user-specified aria-label on the close button', fakeAsync(() => {
                const button = overlayContainerElement.querySelector('.close-with-aria-label')!;
                expect(button.getAttribute('aria-label')).toBe('Best close button ever');
            }));

            it('should set the "type" attribute of the close button if not set manually', () => {
                const button = overlayContainerElement.querySelector('button[nxModalClose]')!;

                expect(button.getAttribute('type')).toBe('button');
            });

            it('should not override type attribute of the close button if set manually', () => {
                const button = overlayContainerElement.querySelector('button.with-submit')!;

                expect(button.getAttribute('type')).toBe('submit');
            });

            it('should return the [nxModalClose] result when clicking the close button', fakeAsync(() => {
                const afterCloseCallback = jasmine.createSpy('afterClose callback');
                dialogRef.afterClosed().subscribe(afterCloseCallback);

                (overlayContainerElement.querySelector('button.close-with-true') as HTMLElement).click();
                viewContainerFixture.detectChanges();
                flush();

                expect(afterCloseCallback).toHaveBeenCalledWith(true);
            }));
        }
    });

    describe('aria-labelledby', () => {
        it('should be able to set a custom aria-labelledby', () => {
            dialog.open(PizzaMsg, {
                ariaLabelledBy: 'Labelled By',
                viewContainerRef: testViewContainerRef,
            });
            viewContainerFixture.detectChanges();

            const container = overlayContainerElement.querySelector('nx-modal-container')!;
            expect(container.getAttribute('aria-labelledby')).toBe('Labelled By');
        });

        it('should not set the aria-labelledby automatically if it has an aria-label and an aria-labelledby', fakeAsync(() => {
            dialog.open(ContentElementDialog, {
                ariaLabel: 'Hello there',
                ariaLabelledBy: 'Labelled By',
                viewContainerRef: testViewContainerRef,
            });
            viewContainerFixture.detectChanges();
            tick();
            viewContainerFixture.detectChanges();

            const container = overlayContainerElement.querySelector('nx-modal-container')!;
            expect(container.hasAttribute('aria-labelledby')).toBeFalse();
        }));
    });

    describe('aria-label', () => {
        it('should be able to set a custom aria-label', () => {
            dialog.open(PizzaMsg, {
                ariaLabel: 'Hello there',
                viewContainerRef: testViewContainerRef,
            });
            viewContainerFixture.detectChanges();

            const container = overlayContainerElement.querySelector('nx-modal-container')!;
            expect(container.getAttribute('aria-label')).toBe('Hello there');
        });

        it('should not set the aria-labelledby automatically if it has an aria-label', fakeAsync(() => {
            dialog.open(ContentElementDialog, {
                ariaLabel: 'Hello there',
                viewContainerRef: testViewContainerRef,
            });
            viewContainerFixture.detectChanges();
            tick();
            viewContainerFixture.detectChanges();

            const container = overlayContainerElement.querySelector('nx-modal-container')!;
            expect(container.hasAttribute('aria-labelledby')).toBeFalse();
        }));
    });

    describe('fullscreen', () => {
        it('should have custom panelClass', () => {
            dialog.open(PizzaMsg, {
                fullscreen: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
            expect(pane).toHaveClass('is-fullscreen');
        });

        it('should be shown in fullscreen', () => {
            dialog.open(PizzaMsg, {
                fullscreen: true,
                viewContainerRef: testViewContainerRef,
            });

            viewContainerFixture.detectChanges();

            const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
            expect(pane.style.width).toBe('100%');
            expect(pane.style.height).toBe('100%');
            expect(pane.style.maxWidth).toBe('');
            expect(pane.style.maxHeight).toBe('');
        });
    });
});

describe('NxDialog with a parent NxDialog', () => {
    let parentDialog: NxDialogService;
    let childDialog: NxDialogService;
    let overlayContainerElement: HTMLElement;
    let fixture: ComponentFixture<ComponentThatProvidesNxDialog>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxModalModule, DialogTestModule],
            declarations: [ComponentThatProvidesNxDialog],
            providers: [
                {
                    provide: OverlayContainer,
                    useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: () => overlayContainerElement };
                    },
                },
                { provide: Location, useClass: SpyLocation },
            ],
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([NxDialogService], (d: NxDialogService) => {
        parentDialog = d;

        fixture = TestBed.createComponent(ComponentThatProvidesNxDialog);
        childDialog = fixture.componentInstance.dialog;
        fixture.detectChanges();
    }));

    afterEach(() => {
        overlayContainerElement.innerHTML = '';
    });

    it('should close dialogs opened by a parent when calling closeAll on a child NxDialog', fakeAsync(() => {
        parentDialog.open(PizzaMsg);
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent).withContext('Expected a dialog to be opened').toContain('Pizza');

        childDialog.closeAll();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent!.trim()).withContext('Expected closeAll on child NxDialog to close dialog opened by parent').toBe('');
    }));

    it('should close dialogs opened by a child when calling closeAll on a parent NxDialog', fakeAsync(() => {
        childDialog.open(PizzaMsg);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).withContext('Expected a dialog to be opened').toContain('Pizza');

        parentDialog.closeAll();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent!.trim()).withContext('Expected closeAll on parent NxDialog to close dialog opened by child').toBe('');
    }));

    it('should close the top dialog via the escape key', fakeAsync(() => {
        childDialog.open(PizzaMsg);

        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelector('nx-modal-container')).toBeNull();
    }));

    it('should not close the parent dialogs when a child is destroyed', fakeAsync(() => {
        parentDialog.open(PizzaMsg);
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent).withContext('Expected a dialog to be opened').toContain('Pizza');

        childDialog.ngOnDestroy();
        fixture.detectChanges();
        flush();

        expect(overlayContainerElement.textContent).withContext('Expected a dialog to be opened').toContain('Pizza');
    }));
});

describe('NxDialog with default options', () => {
    let dialog: NxDialogService;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    let testViewContainerRef: ViewContainerRef;
    let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

    beforeEach(fakeAsync(() => {
        const defaultConfig = {
            hasBackdrop: false,
            disableClose: true,
            width: '100px',
            height: '100px',
            minWidth: '50px',
            minHeight: '50px',
            maxWidth: '150px',
            maxHeight: '150px',
            autoFocus: false,
        };

        TestBed.configureTestingModule({
            imports: [NxModalModule, DialogTestModule],
            providers: [{ provide: NX_MODAL_DEFAULT_OPTIONS, useValue: defaultConfig }],
        });

        TestBed.compileComponents();
    }));

    beforeEach(inject([NxDialogService, OverlayContainer], (d: NxDialogService, oc: OverlayContainer) => {
        dialog = d;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    beforeEach(() => {
        viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });

    it('should use the provided defaults', () => {
        dialog.open(PizzaMsg, { viewContainerRef: testViewContainerRef });

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();

        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(overlayContainerElement.querySelector('nx-modal-container')).toBeTruthy();

        expect(document.activeElement!.tagName).not.toBe('INPUT');

        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
        expect(overlayPane.style.width).toBe('100px');
        expect(overlayPane.style.height).toBe('100px');
        expect(overlayPane.style.minWidth).toBe('50px');
        expect(overlayPane.style.minHeight).toBe('50px');
        expect(overlayPane.style.maxWidth).toBe('150px');
        expect(overlayPane.style.maxHeight).toBe('150px');
    });

    it('should be overridable by open() options', fakeAsync(() => {
        dialog.open(PizzaMsg, {
            hasBackdrop: true,
            disableClose: false,
            viewContainerRef: testViewContainerRef,
        });

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();

        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        viewContainerFixture.detectChanges();
        flush();

        expect(overlayContainerElement.querySelector('nx-modal-container')).toBeFalsy();
    }));
});

@Directive({ selector: 'nx-with-view-container' })
class DirectiveWithViewContainer {
    constructor(readonly viewContainerRef: ViewContainerRef) {}
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello',
})
class ComponentWithOnPushViewContainer {
    constructor(readonly viewContainerRef: ViewContainerRef) {}
}

@Component({
    template: `<nx-with-view-container></nx-with-view-container>`,
})
class ComponentWithChildViewContainer {
    @ViewChild(DirectiveWithViewContainer) childWithViewContainer!: DirectiveWithViewContainer;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}

@Component({
    template: `<ng-template let-data let-modalRef="modalRef"> Cheese {{ localValue }} {{ data?.value }}{{ setDialogRef(modalRef) }}</ng-template>`,
})
class ComponentWithTemplateRef {
    localValue!: string;
    modalRef!: NxModalRef<any>;

    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

    setDialogRef(modalRef: NxModalRef<any>): string {
        this.modalRef = modalRef;
        return '';
    }
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '<p>Pizza</p> <input> <button>Close</button>' })
class PizzaMsg {
    constructor(
        readonly dialogRef: NxModalRef<PizzaMsg>,
        readonly dialogInjector: Injector,
        readonly directionality: Directionality,
    ) {}
}

/** Simple component for testing title and status headline. */
@Component({
    template: `
        <h2 nxModalTitle status="error">
            {{ headline }}
        </h2>
    `,
})
class TitleStatusDialog {
    headline = 'hello world';

    constructor(
        readonly dialogRef: NxModalRef<TitleStatusDialog>,
        readonly dialogInjector: Injector,
        readonly directionality: Directionality,
    ) {}
}

@Component({
    template: `
        <div nxModalContent>Lorem ipsum dolor sit amet.</div>
        <div nxModalActions>
            <button nxModalClose>Close</button>
            <button class="close-with-true" [nxModalClose]="true">Close and return true</button>
            <button class="close-with-aria-label" aria-label="Best close button ever" [nxModalClose]="true"></button>
            <div nxModalClose>Should not close</div>
            <button class="with-submit" type="submit" nxModalClose>Should have submit</button>
        </div>
    `,
})
class ContentElementDialog {}

@Component({
    template: `
        <ng-template>
            <div nxModalContent>Lorem ipsum dolor sit amet.</div>
            <div nxModalActions>
                <button nxModalClose>Close</button>
                <button class="close-with-true" [nxModalClose]="true">Close and return true</button>
                <button class="close-with-aria-label" aria-label="Best close button ever" [nxModalClose]="true"></button>
                <div nxModalClose>Should not close</div>
                <button class="with-submit" type="submit" nxModalClose>Should have submit</button>
            </div>
        </ng-template>
    `,
})
class ComponentWithContentElementTemplateRef {
    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
}

@Component({
    template: '',
    providers: [NxDialogService],
})
class ComponentThatProvidesNxDialog {
    constructor(readonly dialog: NxDialogService) {}
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '' })
class DialogWithInjectedData {
    constructor(@Inject(NX_MODAL_DATA) readonly data: any) {}
}

@Component({ template: '<p>Pasta</p>' })
class DialogWithoutFocusableElements {}

@Component({
    template: `<button>I'm a button</button>`,
    encapsulation: ViewEncapsulation.ShadowDom,
})
class ShadowDomComponent {}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_DIRECTIVES = [
    ComponentWithChildViewContainer,
    ComponentWithTemplateRef,
    PizzaMsg,
    DirectiveWithViewContainer,
    ComponentWithOnPushViewContainer,
    ContentElementDialog,
    DialogWithInjectedData,
    DialogWithoutFocusableElements,
    ComponentWithContentElementTemplateRef,
    ShadowDomComponent,
    TitleStatusDialog,
];

@NgModule({
    imports: [NxModalModule, NoopAnimationsModule],
    exports: TEST_DIRECTIVES,
    declarations: TEST_DIRECTIVES,
})
class DialogTestModule {}
