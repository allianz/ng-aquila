import { Direction, Directionality } from '@angular/cdk/bidi';
import { END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, EventEmitter, NgZone, QueryList, Type, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NxButtonComponent, NxButtonModule } from '@aposin/ng-aquila/button';
import { Subject } from 'rxjs';

import { createKeyboardEvent, createMouseEvent, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent } from '../cdk-test-utils';
import { NxIconModule } from '../icon/public-api';
import {
    MENU_PANEL_OFFSET_X,
    MENU_PANEL_OFFSET_Y,
    MENU_PANEL_TOP_PADDING,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuModule,
    NxContextMenuTriggerDirective,
} from './public-api';

@Component({
    template: `
        <nx-context-menu #menu="nxContextMenu">
            <button nxContextMenuItem>Settings</button>
            <button nxContextMenuItem>Preferences</button>
        </nx-context-menu>
        <button nxButton="tertiary small" [nxContextMenuTriggerFor]="menu" #trigger>Open</button>
    `,
    encapsulation: ViewEncapsulation.ShadowDom,
})
class ShadowDomTestComponent {
    @ViewChild('trigger', { static: true, read: ElementRef }) trigger?: ElementRef<HTMLButtonElement>;
    @ViewChild('menu', { static: true, read: NxContextMenuComponent }) menu?: NxContextMenuComponent;
}

class MockNgZone extends NgZone {
    readonly onStable = new EventEmitter<any>(false);

    constructor() {
        super({ enableLongStackTrace: false });
    }

    run(fn: () => any): any {
        return fn();
    }

    runOutsideAngular(fn: () => any): any {
        return fn();
    }

    simulateZoneExit(): void {
        this.onStable.emit(null);
    }
}

describe('nxContextMenu', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function createComponent<T>(component: Type<T>, providers: any[] = []): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [NxContextMenuModule, NoopAnimationsModule, NxIconModule, NxButtonModule],
            declarations: [component],
            providers,
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        const fixture = TestBed.createComponent<T>(component);
        fixture.detectChanges();
        return fixture;
    }

    function fakeDirectionalityFactory(dir: Direction, activeEmitter = false): [Partial<Directionality>, EventEmitter<Direction>] {
        const changeEmitter = new EventEmitter<Direction>();
        const fakeDirectionality = {
            value: dir,
            change: changeEmitter,
        };
        if (!activeEmitter) {
            changeEmitter.complete();
        }
        return [fakeDirectionality, changeEmitter];
    }

    function getContextMenuElement(): HTMLDivElement | null {
        return overlayContainer.getContainerElement().querySelector('.nx-context-menu');
    }

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    it('should open the menu in ShadowDom mode', fakeAsync(() => {
        const fixture = createComponent(ShadowDomTestComponent);
        expect(getContextMenuElement()).toBeNull();
        fixture.componentInstance.trigger!.nativeElement.click();
        fixture.detectChanges();
        flush();
        expect(getContextMenuElement()).toBeTruthy();
        fixture.componentInstance.trigger!.nativeElement.click();
        fixture.detectChanges();
        flush();
        expect(getContextMenuElement()).toBeNull();
    }));

    it('should open the menu as an idempotent operation', () => {
        const fixture = createComponent(SimpleMenu);
        expect(overlayContainerElement.textContent).toBe('');
        expect(() => {
            fixture.componentInstance.trigger.openContextMenu();
            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toContain('Item');
            expect(overlayContainerElement.textContent).toContain('Disabled');
        }).not.toThrowError();
    });

    it('should close the menu when a click occurs outside the menu', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);
        fixture.componentInstance.trigger.openContextMenu();

        document.body.click();
        fixture.detectChanges();
        tick(500);

        expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should restore focus to the root trigger when the menu was opened', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);
        const triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        dispatchMouseEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();

        expect(overlayContainerElement.querySelector('.nx-context-menu')).toBeTruthy();

        fixture.componentInstance.trigger.closeContextMenu();
        fixture.detectChanges();
        tick(500);

        expect(document.activeElement).toBe(triggerEl);
    }));

    it('should scroll the panel to the top on open, when it is scrollable', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);

        // Add 50 items to make the menu scrollable
        fixture.componentInstance.extraItems = new Array(50).fill('Hello there');
        fixture.detectChanges();

        const triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        dispatchMouseEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();

        // Flush due to the additional tick that is necessary for the FocusMonitor.
        flush();

        expect(overlayContainerElement.querySelector('.nx-context-menu')!.scrollTop).toBe(0);
    }));

    it('should close the menu when pressing ESCAPE', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);
        fixture.componentInstance.trigger.openContextMenu();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');
        dispatchKeyboardEvent(panel!, 'keydown', ESCAPE);
        fixture.detectChanges();
        tick(500);

        expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should not close the menu when pressing ESCAPE with a modifier', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);
        fixture.componentInstance.trigger.openContextMenu();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');

        const event = createKeyboardEvent('keydown', ESCAPE);
        Object.defineProperty(event, 'altKey', { get: () => true });

        panel!.dispatchEvent(event);
        fixture.detectChanges();
        tick(500);

        expect(overlayContainerElement.textContent).toBeTruthy();
        expect(event.defaultPrevented).toBeFalse();
    }));

    it('should set the "menu" role on the overlay panel', () => {
        const fixture = createComponent(SimpleMenu);
        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        const menuPanel = overlayContainerElement.querySelector('.nx-context-menu');

        expect(menuPanel).withContext('Expected to find a menu panel.').toBeTruthy();

        const role = menuPanel ? menuPanel.getAttribute('role') : '';
        expect(role).withContext('Expected panel to have the "menu" role.').toBe('menu');
    });

    it('should set the "menuitem" role on the items by default', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);
        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();
        tick(500);

        const items = Array.from(overlayContainerElement.querySelectorAll('.nx-context-menu-item'));

        expect(items).not.toHaveSize(0);
        expect(items.every(item => item.getAttribute('role') === 'menuitem')).toBeTrue();
    }));

    it('should not throw an error on destroy', () => {
        const fixture = createComponent(SimpleMenu);
        expect(fixture.destroy.bind(fixture)).not.toThrow();
    });

    it('should be able to extract the menu item text', () => {
        const fixture = createComponent(SimpleMenu);
        expect(fixture.componentInstance.items.first.getLabel()).toBe('Item');
    });

    it('should filter out non-text nodes when figuring out the label', () => {
        const fixture = createComponent(SimpleMenu);
        expect(fixture.componentInstance.items.last.getLabel()).toBe('Item with an icon');
    });

    it('should close the menu when using the close scroll strategy', fakeAsync(() => {
        const scrolledSubject = new Subject();
        const fixture = createComponent(SimpleMenu, [
            {
                provide: ScrollDispatcher,
                useFactory: () => ({ scrolled: () => scrolledSubject }),
            },
        ]);

        const trigger = fixture.componentInstance.trigger;
        trigger.scrollStrategy = 'close';

        trigger.openContextMenu();
        fixture.detectChanges();

        expect(trigger.contextMenuOpen).toBeTrue();

        scrolledSubject.next();
        tick(500);

        expect(trigger.contextMenuOpen).toBeFalse();
    }));

    it('should not close the menu when using the reposition scroll strategy', fakeAsync(() => {
        const scrolledSubject = new Subject();
        const fixture = createComponent(SimpleMenu, [
            {
                provide: ScrollDispatcher,
                useFactory: () => ({ scrolled: () => scrolledSubject }),
            },
        ]);

        const trigger = fixture.componentInstance.trigger;
        trigger.scrollStrategy = 'reposition';

        trigger.openContextMenu();
        fixture.detectChanges();

        expect(trigger.contextMenuOpen).toBeTrue();

        scrolledSubject.next();
        tick(500);

        expect(trigger.contextMenuOpen).toBeTrue();
    }));

    it('should toggle the aria-expanded attribute on the trigger', () => {
        const fixture = createComponent(SimpleMenu);
        const triggerEl = fixture.componentInstance.triggerEl.nativeElement;

        expect(triggerEl.hasAttribute('aria-expanded')).toBeFalse();

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        expect(triggerEl.getAttribute('aria-expanded')).toBe('true');

        fixture.componentInstance.trigger.closeContextMenu();
        fixture.detectChanges();

        expect(triggerEl.hasAttribute('aria-expanded')).toBeFalse();
    });

    it('should throw the correct error if the menu is not defined after init', () => {
        const fixture = createComponent(SimpleMenu);

        // @ts-expect-error fix nullability
        fixture.componentInstance.trigger.contextMenu = null;
        fixture.detectChanges();

        expect(() => {
            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();
        }).toThrowError(/must pass in an nx-context-menu instance/);
    });

    it('should be able to swap out a menu after the first time it is opened', fakeAsync(() => {
        const fixture = createComponent(DynamicPanelMenu);
        expect(overlayContainerElement.textContent).toBe('');

        fixture.componentInstance.trigger.openContextMenu();
        tick();
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('One');
        expect(overlayContainerElement.textContent).not.toContain('Two');

        fixture.componentInstance.trigger.closeContextMenu();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe('');

        fixture.componentInstance.trigger.contextMenu = fixture.componentInstance.secondMenu;
        fixture.componentInstance.trigger.openContextMenu();
        tick();
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).not.toContain('One');
        expect(overlayContainerElement.textContent).toContain('Two');

        fixture.componentInstance.trigger.closeContextMenu();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should focus the first item when pressing home', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');
        const items = Array.from(panel!.querySelectorAll('.nx-context-menu-item')) as HTMLElement[];

        // Focus the last item since focus starts from the first one.
        items[items.length - 1].focus();
        fixture.detectChanges();

        spyOn(items[0], 'focus').and.callThrough();

        const event = createKeyboardEvent('keydown', HOME);
        panel!.dispatchEvent(event);

        fixture.detectChanges();

        expect(items[0].focus).toHaveBeenCalled();
        expect(event.defaultPrevented).toBeTrue();
        flush();
    }));

    it('should not focus the first item when pressing home with a modifier key', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');
        const items = Array.from(panel!.querySelectorAll('.nx-context-menu-item')) as HTMLElement[];

        // Focus the last item since focus starts from the first one.
        items[items.length - 1].focus();
        fixture.detectChanges();

        spyOn(items[0], 'focus').and.callThrough();

        const event = createKeyboardEvent('keydown', HOME);
        Object.defineProperty(event, 'altKey', { get: () => true });
        panel!.dispatchEvent(event);

        fixture.detectChanges();

        expect(items[0].focus).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBeFalse();
        flush();
    }));

    it('should focus the last item when pressing end', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');
        const items = Array.from(panel!.querySelectorAll('.nx-context-menu-item')) as HTMLElement[];

        spyOn(items[items.length - 1], 'focus').and.callThrough();

        const event = createKeyboardEvent('keydown', END);
        panel!.dispatchEvent(event);

        fixture.detectChanges();

        expect(items[items.length - 1].focus).toHaveBeenCalled();
        expect(event.defaultPrevented).toBeTrue();
        flush();
    }));

    it('should not focus the last item when pressing end with a modifier key', fakeAsync(() => {
        const fixture = createComponent(SimpleMenu);

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();

        const panel = overlayContainerElement.querySelector('.nx-context-menu');
        const items = Array.from(panel!.querySelectorAll('.nx-context-menu-item')) as HTMLElement[];

        spyOn(items[items.length - 1], 'focus').and.callThrough();

        const event = createKeyboardEvent('keydown', END);
        Object.defineProperty(event, 'altKey', { get: () => true });
        panel!.dispatchEvent(event);

        fixture.detectChanges();

        expect(items[items.length - 1].focus).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBeFalse();
        flush();
    }));

    it('should set trigger button active state', () => {
        const fixture = createComponent(SimpleMenu);

        fixture.componentInstance.trigger.openContextMenu();
        fixture.detectChanges();
        expect(fixture.componentInstance.button.active).toBeTrue();

        fixture.componentInstance.trigger.closeContextMenu();
        fixture.detectChanges();
        expect(fixture.componentInstance.button.active).toBeFalse();
    });

    describe('lazy rendering', () => {
        it('should be able to render the menu content lazily', fakeAsync(() => {
            const fixture = createComponent(SimpleLazyMenu);

            fixture.componentInstance.triggerEl.nativeElement.click();
            fixture.detectChanges();
            tick(500);

            const panel = overlayContainerElement.querySelector('.nx-context-menu');

            expect(panel).withContext('Expected panel to be defined').toBeTruthy();
            expect(panel!.textContent).withContext('Expected panel to have correct content').toContain('Another item');
            expect(fixture.componentInstance.trigger.contextMenuOpen).withContext('Expected menu to be open').toBeTrue();
        }));

        it('should detach the lazy content when the menu is closed', fakeAsync(() => {
            const fixture = createComponent(SimpleLazyMenu);

            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            expect(fixture.componentInstance.items).not.toHaveSize(0);

            fixture.componentInstance.trigger.closeContextMenu();
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            expect(fixture.componentInstance.items).toHaveSize(0);
        }));

        it('should wait for the close animation to finish before considering the panel as closed', fakeAsync(() => {
            const fixture = createComponent(SimpleLazyMenu);
            const trigger = fixture.componentInstance.trigger;

            expect(trigger.contextMenuOpen).withContext('Expected menu to start off closed').toBeFalse();

            trigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            expect(trigger.contextMenuOpen).withContext('Expected menu to be open').toBeTrue();

            trigger.closeContextMenu();
            fixture.detectChanges();

            expect(trigger.contextMenuOpen).withContext('Expected menu to be considered open while the close animation is running').toBeTrue();
            tick(500);
            fixture.detectChanges();

            expect(trigger.contextMenuOpen).withContext('Expected menu to be closed').toBeFalse();
        }));

        it('should focus the first menu item when opening a lazy menu via keyboard', fakeAsync(() => {
            let zone!: MockNgZone;
            const fixture = createComponent(SimpleLazyMenu, [
                {
                    provide: NgZone,
                    useFactory: () => (zone = new MockNgZone()),
                },
            ]);

            fixture.detectChanges();

            // A click without a mousedown before it is considered a keyboard open.
            fixture.componentInstance.triggerEl.nativeElement.click();
            fixture.detectChanges();
            tick(500);
            zone.simulateZoneExit();

            // Flush due to the additional tick that is necessary for the FocusMonitor.
            flush();

            const item = document.querySelector('.nx-context-menu [nxContextMenuItem]');

            expect(document.activeElement).withContext('Expected first item to be focused').toBe(item);
        }));

        it('should be able to open the same menu with a different context', fakeAsync(() => {
            const fixture = createComponent(LazyMenuWithContext);

            fixture.componentInstance.triggerOne.openContextMenu();
            fixture.detectChanges();
            tick(500);

            let item = overlayContainerElement.querySelector('.nx-context-menu [nxContextMenuItem]');

            expect(item!.textContent!.trim()).toBe('one');

            fixture.componentInstance.triggerOne.openContextMenu();
            fixture.detectChanges();
            tick(500);

            fixture.componentInstance.triggerTwo.openContextMenu();
            fixture.detectChanges();
            tick(500);
            item = overlayContainerElement.querySelector('.nx-context-menu [nxContextMenuItem]');

            expect(item!.textContent!.trim()).toBe('two');
        }));
    });

    describe('fallback positions', () => {
        it('should fall back to "before" mode if not fit on screen', () => {
            const fixture = createComponent(SimpleMenu);
            const trigger = fixture.componentInstance.triggerEl.nativeElement;

            // Push trigger to the right side of viewport, so it doesn't have space to open
            // in its default "after" position on the right side.
            trigger.style.position = 'fixed';
            trigger.style.right = '0';
            trigger.style.top = '200px';

            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();
            const overlayPane = getOverlayPane();
            const triggerRect = trigger.getBoundingClientRect();
            const overlayRect = overlayPane.getBoundingClientRect();

            // In "before" position, the right sides of the overlay and the origin are aligned.
            // To find the overlay left, subtract the menu width from the origin's right side.
            const expectedLeft = triggerRect.right - overlayRect.width;
            expect(Math.floor(overlayRect.left))
                .withContext('Expected menu to open in "before" position if "after" position wouldn\'t fit.')
                .toBe(Math.floor(expectedLeft));

            // The y-position of the overlay should be unaffected, as it can already fit vertically
            expect(Math.floor(overlayRect.top))
                .withContext('Expected menu top position to be unchanged if it can fit in the viewport.')
                .toBe(Math.floor(triggerRect.bottom + MENU_PANEL_OFFSET_Y));
        });

        it('should fall back to "above" mode if not fit on screen', () => {
            const fixture = createComponent(SimpleMenu);
            const trigger = fixture.componentInstance.triggerEl.nativeElement;

            // Push trigger to the bottom part of viewport, so it doesn't have space to open
            // in its default "below" position below the trigger.
            trigger.style.position = 'fixed';
            trigger.style.bottom = '65px';

            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();
            const overlayPane = getOverlayPane();
            const triggerRect = trigger.getBoundingClientRect();
            const overlayRect = overlayPane.getBoundingClientRect();

            expect(Math.floor(overlayRect.bottom))
                .withContext('Expected menu to open in "above" position if "below" position wouldn\'t fit.')
                .toBe(Math.floor(triggerRect.top - MENU_PANEL_OFFSET_Y));

            // The x-position of the overlay should be unaffected, as it can already fit horizontally
            expect(Math.floor(overlayRect.left))
                .withContext('Expected menu x position to be unchanged if it can fit in the viewport.')
                .toBe(Math.floor(triggerRect.left));
        });

        it('should re-position menu on both axes if both defaults would not fit', () => {
            const fixture = createComponent(SimpleMenu);
            const trigger = fixture.componentInstance.triggerEl.nativeElement;

            // push trigger to the bottom, right part of viewport, so it doesn't have space to open
            // in its default "after below" position.
            trigger.style.position = 'fixed';
            trigger.style.right = '0';
            trigger.style.bottom = '0';

            fixture.componentInstance.trigger.openContextMenu();
            fixture.detectChanges();
            const overlayPane = getOverlayPane();
            const triggerRect = trigger.getBoundingClientRect();
            const overlayRect = overlayPane.getBoundingClientRect();

            const expectedLeft = triggerRect.right - overlayRect.width;

            expect(Math.floor(overlayRect.left))
                .withContext('Expected menu to open in "before" position if "after" position wouldn\'t fit.')
                .toBe(Math.floor(expectedLeft));

            expect(Math.floor(overlayRect.bottom))
                .withContext('Expected menu to open in "above" position if "below" position wouldn\'t fit.')
                .toBe(Math.floor(triggerRect.top - MENU_PANEL_OFFSET_Y));
        });

        function getOverlayPane(): HTMLElement {
            return overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
        }
    });

    describe('close event', () => {
        let fixture: ComponentFixture<SimpleMenu>;

        beforeEach(() => {
            fixture = createComponent(SimpleMenu);
            fixture.componentInstance.trigger.openContextMenu();
        });

        it('should emit an event when a menu item is clicked', () => {
            const menuItem = overlayContainerElement.querySelector('[nxContextMenuItem]') as HTMLElement;

            menuItem.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith('click');
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        });

        it('should emit a close event when clicked outside of the context menu', fakeAsync(() => {
            dispatchMouseEvent(document, 'click');
            fixture.detectChanges();
            tick(500);

            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith(undefined);
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        }));

        it('should emit an event when pressing ESCAPE', () => {
            const menu = overlayContainerElement.querySelector('.nx-context-menu') as HTMLElement;

            dispatchKeyboardEvent(menu, 'keydown', ESCAPE);
            fixture.detectChanges();

            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith('keydown');
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        });

        it('should complete the callback when the menu is destroyed', () => {
            const emitCallback = jasmine.createSpy('emit callback');
            const completeCallback = jasmine.createSpy('complete callback');

            fixture.componentInstance.menu.closed.subscribe(emitCallback, null, completeCallback);
            fixture.destroy();

            expect(emitCallback).toHaveBeenCalledWith(undefined);
            expect(emitCallback).toHaveBeenCalledTimes(1);
            expect(completeCallback).toHaveBeenCalled();
        });
    });

    describe('nested menu', () => {
        let fixture: ComponentFixture<NestedMenu>;
        let instance: NestedMenu;
        let overlay: HTMLElement;
        const compileTestComponent = (direction: Direction = 'ltr') => {
            const [fakeDirectionality] = fakeDirectionalityFactory(direction);
            fixture = createComponent(NestedMenu, [
                {
                    provide: Directionality,
                    useValue: fakeDirectionality,
                },
            ]);

            instance = fixture.componentInstance;
            overlay = overlayContainerElement;
        };

        it('should set the "triggersSubmenu" flags on the triggers', () => {
            compileTestComponent();
            expect(instance.rootTrigger.triggersSubmenu()).toBeFalse();
            expect(instance.levelOneTrigger.triggersSubmenu()).toBeTrue();
            expect(instance.levelTwoTrigger.triggersSubmenu()).toBeTrue();
        });

        it('should set the "parentMenu" on the sub-menu instances', () => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            fixture.detectChanges();

            expect(instance.rootMenu.parentMenu).toBeFalsy();
            expect(instance.levelOneMenu.parentMenu).toBe(instance.rootMenu);
            expect(instance.levelTwoMenu.parentMenu).toBe(instance.levelOneMenu);
        });

        it('should pass the layout direction the nested menus', () => {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            fixture.detectChanges();

            expect(instance.rootMenu.direction).toBe('rtl');
            expect(instance.levelOneMenu.direction).toBe('rtl');
            expect(instance.levelTwoMenu.direction).toBe('rtl');
        });

        it('should emit an event when the hover state of the menu items changes', () => {
            compileTestComponent();
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            const spy = jasmine.createSpy('hover spy');
            const subscription = instance.rootMenu._hovered().subscribe(spy);
            const menuItems = overlay.querySelectorAll('[nxContextMenuItem]');

            dispatchMouseEvent(menuItems[0], 'mouseenter');
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledTimes(1);

            dispatchMouseEvent(menuItems[1], 'mouseenter');
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledTimes(2);

            subscription.unsubscribe();
        });

        it('should toggle a nested menu when its trigger is hovered', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const items = Array.from(overlay.querySelectorAll('.nx-context-menu [nxContextMenuItem]'));
            const levelOneTrigger = overlay.querySelector('#level-one-trigger');

            dispatchMouseEvent(levelOneTrigger as Node, 'mouseenter');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(levelOneTrigger!).withContext('Expected the trigger to be highlighted').toHaveClass('is-highlighted');
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);

            dispatchMouseEvent(items[items.indexOf(levelOneTrigger as Element) + 1], 'mouseenter');
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);
            expect(levelOneTrigger!).not.withContext('Expected the trigger to not be highlighted').toHaveClass('is-highlighted');
        }));

        it('should close all the open sub-menus when the hover state is changed at the root', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();

            const items = Array.from(overlay.querySelectorAll('.nx-context-menu [nxContextMenuItem]'));
            const levelOneTrigger = overlay.querySelector('#level-one-trigger');

            dispatchMouseEvent(levelOneTrigger as Node, 'mouseenter');
            fixture.detectChanges();
            tick();

            const levelTwoTrigger = overlay.querySelector('#level-two-trigger') as HTMLElement;
            dispatchMouseEvent(levelTwoTrigger, 'mouseenter');
            fixture.detectChanges();
            tick();

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected three open menus').toHaveSize(3);

            dispatchMouseEvent(items[items.indexOf(levelOneTrigger as Element) + 1], 'mouseenter');
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);
        }));

        it('should close submenu when hovering over disabled sibling item', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            tick(500);

            const items = fixture.debugElement.queryAll(By.directive(NxContextMenuItemComponent));

            dispatchFakeEvent(items[0].nativeElement, 'mouseenter');
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);

            items[1].componentInstance.disabled = true;
            fixture.detectChanges();

            // Invoke the handler directly since the fake events are flaky on disabled elements.
            items[1].componentInstance._handleMouseEnter();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);
        }));

        it('should not open submenu when hovering over disabled trigger', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const item = fixture.debugElement.query(By.directive(NxContextMenuItemComponent));

            item.componentInstance.disabled = true;
            fixture.detectChanges();

            // Invoke the handler directly since the fake events are flaky on disabled elements.
            item.componentInstance._handleMouseEnter();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected to remain at one open menu').toHaveSize(1);
        }));

        it('should open a nested menu when its trigger is clicked', () => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const levelOneTrigger = overlay.querySelector('#level-one-trigger') as HTMLElement;

            levelOneTrigger.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);

            levelOneTrigger.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected repeat clicks not to close the menu.').toHaveSize(2);
        });

        it('should open and close a nested menu with arrow keys in ltr', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const levelOneTrigger = overlay.querySelector('#level-one-trigger') as HTMLElement;

            dispatchKeyboardEvent(levelOneTrigger, 'keydown', RIGHT_ARROW);
            fixture.detectChanges();

            const panels = overlay.querySelectorAll('.nx-context-menu');

            expect(panels).withContext('Expected two open menus').toHaveSize(2);
            dispatchKeyboardEvent(panels[1], 'keydown', LEFT_ARROW);
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).toHaveSize(1);
        }));

        it('should open and close a nested menu with the arrow keys in rtl', fakeAsync(() => {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const levelOneTrigger = overlay.querySelector('#level-one-trigger') as HTMLElement;

            dispatchKeyboardEvent(levelOneTrigger, 'keydown', LEFT_ARROW);
            fixture.detectChanges();

            const panels = overlay.querySelectorAll('.nx-context-menu');

            expect(panels).withContext('Expected two open menus').toHaveSize(2);
            dispatchKeyboardEvent(panels[1], 'keydown', RIGHT_ARROW);
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).toHaveSize(1);
        }));

        it('should not do anything with the arrow keys for a top-level menu', () => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();

            const menu = overlay.querySelector('.nx-context-menu');

            dispatchKeyboardEvent(menu as Node, 'keydown', RIGHT_ARROW);
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one menu to remain open').toHaveSize(1);

            dispatchKeyboardEvent(menu as Node, 'keydown', LEFT_ARROW);
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one menu to remain open').toHaveSize(1);
        });

        it('should close all of the menus when clicked outside the context menu', fakeAsync(() => {
            compileTestComponent();
            dispatchMouseEvent(instance.rootTriggerEl.nativeElement, 'click');
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            fixture.detectChanges();

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected three open menus').toHaveSize(3);

            document.body.click();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected no open menus').toHaveSize(0);
        }));

        it('should shift focus between the sub-menus', () =>
            fakeAsync(() => {
                compileTestComponent();
                instance.rootTrigger.openContextMenu();

                tick(500);
                fixture.detectChanges();

                expect(overlay.querySelector('.nx-context-menu')!.contains(document.activeElement))
                    .withContext('Expected focus to be inside the root menu')
                    .toBeTrue();

                instance.levelOneTrigger.openContextMenu();
                tick(500);
                fixture.detectChanges();

                expect(overlay.querySelectorAll('.nx-context-menu')[1].contains(document.activeElement))
                    .withContext('Expected focus to be inside the first nested menu')
                    .toBeTrue();

                instance.levelTwoTrigger.openContextMenu();
                tick(500);
                fixture.detectChanges();

                expect(overlay.querySelectorAll('.nx-context-menu')[2].contains(document.activeElement))
                    .withContext('Expected focus to be inside the second nested menu')
                    .toBeTrue();

                instance.levelTwoTrigger.closeContextMenu();
                tick(500);
                fixture.detectChanges();

                expect(overlay.querySelectorAll('.nx-context-menu')[1].contains(document.activeElement))
                    .withContext('Expected focus to be back inside the first nested menu')
                    .toBeTrue();
                instance.levelOneTrigger.closeContextMenu();
                tick(500);
                fixture.detectChanges();

                expect(overlay.querySelector('.nx-context-menu')!.contains(document.activeElement))
                    .withContext('Expected focus to be back inside the root menu')
                    .toBeTrue();
            }));

        it('should position the sub-menu to the right edge of the trigger in ltr', () => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '50px';
            instance.rootTriggerEl.nativeElement.style.top = '50px';
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
            const panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();

            expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left) - MENU_PANEL_OFFSET_X);
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
        });

        it('should fall back to aligning to the left edge of the trigger in ltr', () => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.right = '10px';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
            const panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();

            expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right) + MENU_PANEL_OFFSET_X);
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
        });

        it('should position the sub-menu to the left edge of the trigger in rtl', () => {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '50%';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
            const panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();

            expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right) + MENU_PANEL_OFFSET_X);
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
        });

        it('should fall back to aligning to the right edge of the trigger in rtl', fakeAsync(() => {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '10px';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
            const panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();

            expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left) - MENU_PANEL_OFFSET_X);
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
        }));

        it('should close all of the menus when an item is clicked', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            fixture.detectChanges();

            const menus = overlay.querySelectorAll('.nx-context-menu');

            expect(menus).withContext('Expected three open menus').toHaveSize(3);

            (menus[2].querySelector('.nx-context-menu-item') as HTMLElement).click();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected no open menus').toHaveSize(0);
        }));

        it('should close all of the menus when the user tabs away', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            tick();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            tick();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            tick();
            fixture.detectChanges();

            const menus = overlay.querySelectorAll('.nx-context-menu');

            expect(menus).withContext('Expected three open menus').toHaveSize(3);

            dispatchKeyboardEvent(menus[menus.length - 1], 'keydown', TAB);
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected no open menus').toHaveSize(0);
            expect(instance.rootButtonEl.active).toBeFalse();
        }));

        it('should add an expand icon to the menu items that trigger a sub-menu', fakeAsync(() => {
            compileTestComponent();
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();
            tick(500);

            const menuItems = overlay.querySelectorAll('[nxContextMenuItem]');

            expect(menuItems[0].querySelector('.nx-context-menu-item__expand')).toBeTruthy();
        }));

        it('should close all of the menus when the root is closed programmatically', fakeAsync(() => {
            compileTestComponent();
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelOneTrigger.openContextMenu();
            fixture.detectChanges();

            instance.levelTwoTrigger.openContextMenu();
            fixture.detectChanges();

            const menus = overlay.querySelectorAll('.nx-context-menu');

            expect(menus).withContext('Expected three open menus').toHaveSize(3);

            instance.rootTrigger.closeContextMenu();
            fixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected no open menus').toHaveSize(0);
        }));

        it('should toggle a nested menu when its trigger is added after init', fakeAsync(() => {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            instance.showLazy = true;
            fixture.detectChanges();

            const lazyTrigger = overlay.querySelector('#lazy-trigger');

            dispatchMouseEvent(lazyTrigger as Node, 'mouseenter');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            expect(lazyTrigger!).withContext('Expected the trigger to be highlighted').toHaveClass('is-highlighted');
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);
        }));

        it('should prevent the default mousedown action if the menu item opens a sub-menu', () => {
            compileTestComponent();
            instance.rootTrigger.openContextMenu();
            fixture.detectChanges();

            const event = createMouseEvent('mousedown');

            Object.defineProperty(event, 'buttons', { get: () => 1 });
            event.preventDefault = jasmine.createSpy('preventDefault spy');

            dispatchMouseEvent(overlay.querySelector('[nxContextMenuItem]') as Node, 'mousedown', 0, 0, event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should handle the items being rendered in a repeater', fakeAsync(() => {
            const repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;

            expect(() => {
                repeaterFixture.detectChanges();
                flush();
            }).not.toThrow();

            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            dispatchMouseEvent(overlay.querySelector('.level-one-trigger') as Node, 'mouseenter');
            repeaterFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);
        }));

        it('should be able to trigger the same nested menu from different triggers', fakeAsync(() => {
            const repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;

            repeaterFixture.detectChanges();
            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const triggers = overlay.querySelectorAll('.level-one-trigger');

            dispatchMouseEvent(triggers[0], 'mouseenter');
            repeaterFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);

            dispatchMouseEvent(triggers[1], 'mouseenter');
            repeaterFixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);
        }));

        it('should close the initial menu if the user moves away while animating', fakeAsync(() => {
            const repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;

            repeaterFixture.detectChanges();
            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            const triggers = overlay.querySelectorAll('.level-one-trigger');

            dispatchMouseEvent(triggers[0], 'mouseenter');
            repeaterFixture.detectChanges();
            tick(100);
            dispatchMouseEvent(triggers[1], 'mouseenter');
            repeaterFixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);
        }));

        it('should be able to open a submenu through an item that is not a direct descendant of the panel', fakeAsync(() => {
            const nestedFixture = createComponent(SubmenuDeclaredInsideParentMenu);
            overlay = overlayContainerElement;

            nestedFixture.detectChanges();
            nestedFixture.componentInstance.rootTriggerEl.nativeElement.click();
            nestedFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            dispatchMouseEvent(overlay.querySelector('.level-one-trigger') as Node, 'mouseenter');
            nestedFixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);
        }));

        it('should not close when hovering over a menu item inside a sub-menu panel that is declared inside the root menu', fakeAsync(() => {
            const nestedFixture = createComponent(SubmenuDeclaredInsideParentMenu);
            overlay = overlayContainerElement;

            nestedFixture.detectChanges();
            nestedFixture.componentInstance.rootTriggerEl.nativeElement.click();
            nestedFixture.detectChanges();
            tick(500);
            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected one open menu').toHaveSize(1);

            dispatchMouseEvent(overlay.querySelector('.level-one-trigger') as Node, 'mouseenter');
            nestedFixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus').toHaveSize(2);

            dispatchMouseEvent(overlay.querySelector('.level-two-item') as Node, 'mouseenter');
            nestedFixture.detectChanges();
            tick(500);

            expect(overlay.querySelectorAll('.nx-context-menu')).withContext('Expected two open menus to remain').toHaveSize(2);
        }));
    });

    describe('directionality of overlay', () => {
        it('should be set to ltr by default', fakeAsync(() => {
            const fixture = createComponent(SimpleMenu);
            const trigger = fixture.componentInstance.trigger;
            trigger.openContextMenu();
            fixture.detectChanges();
            flush();

            const direction = (trigger as any)._overlayRef.getDirection();
            expect(direction).toBe('ltr');
        }));

        it('should be set to rtl if ancestor direction is rtl', fakeAsync(() => {
            const [fakeDirectionality] = fakeDirectionalityFactory('rtl');
            const fixture = createComponent(SimpleMenu, [
                {
                    provide: Directionality,
                    useValue: fakeDirectionality,
                },
            ]);
            const trigger = fixture.componentInstance.trigger;
            trigger.openContextMenu();
            fixture.detectChanges();
            flush();
            const direction = (trigger as any)._overlayRef.getDirection();
            expect(direction).toBe('rtl');
        }));
    });

    describe('when ancestor direction changes', () => {
        it('the context menu should be closed', fakeAsync(() => {
            const [fakeDirectionality, changeEmitter] = fakeDirectionalityFactory('rtl', true);
            const fixture = createComponent(SimpleMenu, [
                {
                    provide: Directionality,
                    useValue: fakeDirectionality,
                },
            ]);
            const trigger = fixture.componentInstance.trigger;
            spyOn(trigger, 'closeContextMenu');
            trigger.openContextMenu();
            fixture.detectChanges();
            flush();
            changeEmitter.emit('ltr');
            expect(trigger.closeContextMenu).toHaveBeenCalledTimes(1);
            changeEmitter.complete();
        }));
    });

    describe('cursor mode', () => {
        let fixture: ComponentFixture<RightClickMenu>;

        beforeEach(() => {
            fixture = createComponent(RightClickMenu);
        });

        it('is not opening on click', fakeAsync(() => {
            fixture.componentInstance.triggerArea!.nativeElement.click();
            fixture.detectChanges();
            flush();
            expect(getContextMenuElement()).toBeNull();
        }));

        describe('when opening with right click', () => {
            beforeEach(fakeAsync(() => {
                const event = new MouseEvent('contextmenu', { clientX: 100, clientY: 100 });
                fixture.componentInstance.triggerArea!.nativeElement.dispatchEvent(event);
                fixture.detectChanges();
                flush();
            }));

            it('opens the menu at click position', fakeAsync(() => {
                const contextMenu = getContextMenuElement() as HTMLElement;
                expect(contextMenu).not.toBeNull();
                const rect = contextMenu.getBoundingClientRect();
                expect(rect.top).toBe(100);
                expect(rect.left).toBe(100);
            }));

            describe('and right clicking again', () => {
                beforeEach(fakeAsync(() => {
                    const event = new MouseEvent('contextmenu', { clientX: 50, clientY: 50 });
                    fixture.componentInstance.triggerArea!.nativeElement.dispatchEvent(event);
                    fixture.detectChanges();
                    flush();
                }));

                it('opens the menu at click position', fakeAsync(() => {
                    const contextMenu = getContextMenuElement() as HTMLElement;
                    expect(contextMenu).not.toBeNull();
                    const rect = contextMenu.getBoundingClientRect();
                    expect(rect.top).toBe(50);
                    expect(rect.left).toBe(50);
                }));
            });

            describe('and clicking outside the menu', () => {
                it('closed the menu', fakeAsync(() => {
                    fixture.componentInstance.triggerArea!.nativeElement.click();
                    fixture.detectChanges();
                    flush();
                    expect(getContextMenuElement()).toBeNull();
                }));
            });
        });
    });
});

@Component({
    template: `
        <button nxButton="tertiary small" [nxContextMenuTriggerFor]="menu" #triggerEl>Toggle menu</button>
        <nx-context-menu #menu="nxContextMenu" [class]="panelClass" (closed)="closeCallback($event)">
            <button nxContextMenuItem>Item</button>
            <button nxContextMenuItem disabled>Disabled</button>
            <button nxContextMenuItem>
                <nx-icon name="settings"></nx-icon>
                Item with an icon
            </button>
            <button *ngFor="let item of extraItems" nxContextMenuItem>{{ item }}</button>
        </nx-context-menu>
    `,
})
class SimpleMenu {
    @ViewChild(NxContextMenuTriggerDirective) trigger!: NxContextMenuTriggerDirective;
    @ViewChild('triggerEl', { read: ElementRef }) triggerEl!: ElementRef<HTMLElement>;
    @ViewChild(NxButtonComponent) button!: NxButtonComponent;
    @ViewChild(NxContextMenuComponent) menu!: NxContextMenuComponent;
    @ViewChildren(NxContextMenuItemComponent) items!: QueryList<NxContextMenuItemComponent>;
    extraItems: string[] = [];
    closeCallback = jasmine.createSpy('menu closed callback');
}

@Component({
    template: `
        <button nxButton="tertiary small" [nxContextMenuTriggerFor]="root" #rootTrigger="nxContextMenuTrigger" #rootTriggerEl #rootTriggerButton>
            Toggle menu
        </button>

        <button [nxContextMenuTriggerFor]="levelTwo" #alternateTrigger="nxContextMenuTrigger">Toggle alternate menu</button>

        <nx-context-menu #root="nxContextMenu" (closed)="rootCloseCallback($event)">
            <button nxContextMenuItem id="level-one-trigger" [nxContextMenuTriggerFor]="levelOne" #levelOneTrigger="nxContextMenuTrigger">One</button>
            <button nxContextMenuItem>Two</button>
            <button nxContextMenuItem *ngIf="showLazy" id="lazy-trigger" [nxContextMenuTriggerFor]="lazy" #lazyTrigger="nxContextMenuTrigger">Three</button>
        </nx-context-menu>

        <nx-context-menu #levelOne="nxContextMenu" (closed)="levelOneCloseCallback($event)">
            <button nxContextMenuItem>Four</button>
            <button nxContextMenuItem id="level-two-trigger" [nxContextMenuTriggerFor]="levelTwo" #levelTwoTrigger="nxContextMenuTrigger">Five</button>
            <button nxContextMenuItem>Six</button>
        </nx-context-menu>

        <nx-context-menu #levelTwo="nxContextMenu" (closed)="levelTwoCloseCallback($event)">
            <button nxContextMenuItem>Seven</button>
            <button nxContextMenuItem>Eight</button>
            <button nxContextMenuItem>Nine</button>
        </nx-context-menu>

        <nx-context-menu #lazy="nxContextMenu">
            <button nxContextMenuItem>Ten</button>
            <button nxContextMenuItem>Eleven</button>
            <button nxContextMenuItem>Twelve</button>
        </nx-context-menu>
    `,
})
class NestedMenu {
    @ViewChild('root') rootMenu!: NxContextMenuComponent;
    @ViewChild('rootTrigger') rootTrigger!: NxContextMenuTriggerDirective;
    @ViewChild('rootTriggerEl', { read: ElementRef }) rootTriggerEl!: ElementRef<HTMLElement>;
    @ViewChild('rootTriggerEl', { read: NxButtonComponent }) rootButtonEl!: NxButtonComponent;
    @ViewChild('alternateTrigger') alternateTrigger!: NxContextMenuTriggerDirective;
    readonly rootCloseCallback = jasmine.createSpy('root menu closed callback');

    @ViewChild('levelOne') levelOneMenu!: NxContextMenuComponent;
    @ViewChild('levelOneTrigger') levelOneTrigger!: NxContextMenuTriggerDirective;
    readonly levelOneCloseCallback = jasmine.createSpy('level one menu closed callback');

    @ViewChild('levelTwo') levelTwoMenu!: NxContextMenuComponent;
    @ViewChild('levelTwoTrigger') levelTwoTrigger!: NxContextMenuTriggerDirective;
    readonly levelTwoCloseCallback = jasmine.createSpy('level one menu closed callback');

    @ViewChild('lazy') lazyMenu!: NxContextMenuComponent;
    @ViewChild('lazyTrigger') lazyTrigger!: NxContextMenuTriggerDirective;
    showLazy = false;
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="root" #rootTrigger="nxContextMenuTrigger">Toggle menu</button>

        <nx-context-menu #root="nxContextMenu">
            <button nxContextMenuItem [nxContextMenuTriggerFor]="levelOne" #levelOneTrigger="nxContextMenuTrigger">One</button>
        </nx-context-menu>

        <nx-context-menu #levelOne="nxContextMenu" class="mat-elevation-z24">
            <button nxContextMenuItem>Two</button>
        </nx-context-menu>
    `,
})
class NestedMenuCustomElevation {
    @ViewChild('rootTrigger') rootTrigger!: NxContextMenuTriggerDirective;
    @ViewChild('levelOneTrigger') levelOneTrigger!: NxContextMenuTriggerDirective;
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="root" #rootTriggerEl>Toggle menu</button>
        <nx-context-menu #root="nxContextMenu">
            <button nxContextMenuItem class="level-one-trigger" *ngFor="let item of items" [nxContextMenuTriggerFor]="levelOne">{{ item }}</button>
        </nx-context-menu>

        <nx-context-menu #levelOne="nxContextMenu">
            <button nxContextMenuItem>Four</button>
            <button nxContextMenuItem>Five</button>
        </nx-context-menu>
    `,
})
class NestedMenuRepeater {
    @ViewChild('rootTriggerEl') rootTriggerEl!: ElementRef<HTMLElement>;
    @ViewChild('levelOneTrigger') levelOneTrigger!: NxContextMenuTriggerDirective;

    items = ['one', 'two', 'three'];
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="root" #rootTriggerEl>Toggle menu</button>

        <nx-context-menu #root="nxContextMenu">
            <button nxContextMenuItem class="level-one-trigger" [nxContextMenuTriggerFor]="levelOne">One</button>

            <nx-context-menu #levelOne="nxContextMenu">
                <button nxContextMenuItem class="level-two-item">Two</button>
            </nx-context-menu>
        </nx-context-menu>
    `,
})
class SubmenuDeclaredInsideParentMenu {
    @ViewChild('rootTriggerEl') rootTriggerEl!: ElementRef;
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="menu" #triggerEl>Toggle menu</button>

        <nx-context-menu #menu="nxContextMenu">
            <ng-template nxContextMenuContent>
                <button nxContextMenuItem>Item</button>
                <button nxContextMenuItem>Another item</button>
            </ng-template>
        </nx-context-menu>
    `,
})
class SimpleLazyMenu {
    @ViewChild(NxContextMenuTriggerDirective) trigger!: NxContextMenuTriggerDirective;
    @ViewChild('triggerEl') triggerEl!: ElementRef<HTMLElement>;
    @ViewChildren(NxContextMenuItemComponent) items!: QueryList<NxContextMenuItemComponent>;
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="menu" [nxContextMenuTriggerData]="{ label: 'one' }" #triggerOne="nxContextMenuTrigger">One</button>

        <button [nxContextMenuTriggerFor]="menu" [nxContextMenuTriggerData]="{ label: 'two' }" #triggerTwo="nxContextMenuTrigger">Two</button>

        <nx-context-menu #menu="nxContextMenu">
            <ng-template let-label="label" nxContextMenuContent>
                <button nxContextMenuItem>{{ label }}</button>
            </ng-template>
        </nx-context-menu>
    `,
})
class LazyMenuWithContext {
    @ViewChild('triggerOne') triggerOne!: NxContextMenuTriggerDirective;
    @ViewChild('triggerTwo') triggerTwo!: NxContextMenuTriggerDirective;
}

@Component({
    template: `
        <button [nxContextMenuTriggerFor]="one">Toggle menu</button>
        <nx-context-menu #one="nxContextMenu">
            <button nxContextMenuItem>One</button>
        </nx-context-menu>

        <nx-context-menu #two="nxContextMenu">
            <button nxContextMenuItem>Two</button>
        </nx-context-menu>
    `,
})
class DynamicPanelMenu {
    @ViewChild(NxContextMenuTriggerDirective) trigger!: NxContextMenuTriggerDirective;
    @ViewChild('one') firstMenu!: NxContextMenuComponent;
    @ViewChild('two') secondMenu!: NxContextMenuComponent;
}

@Component({
    template: `
        <div #triggerArea [nxContextMenuTriggerFor]="menu" nxContextMenuTriggerMode="cursor" style="height: 200px;"></div>
        <nx-context-menu #menu="nxContextMenu">
            <button nxContextMenuItem>Item</button>
        </nx-context-menu>
    `,
})
class RightClickMenu {
    @ViewChild(NxContextMenuTriggerDirective) trigger!: NxContextMenuTriggerDirective;
    @ViewChild('triggerArea', { read: ElementRef }) triggerArea!: ElementRef<HTMLElement>;
    @ViewChild(NxContextMenuComponent) menu!: NxContextMenuComponent;
}
