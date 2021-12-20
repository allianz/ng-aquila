import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NxTabGroupComponent } from './tab-group';
import { NxTabsModule } from './tabs.module';
import { NxTabNavBarComponent } from './tab-nav-bar';
import { dispatchFakeEvent } from '../cdk-test-utils';

declare var viewport: any;
const THROTTLE_TIME = 200;

@Directive()
abstract class TabHeaderScrollableTest {
    direction: any;
    tabs: any;

    @ViewChild(NxTabGroupComponent) tabGroupInstance!: NxTabGroupComponent;
    @ViewChild(NxTabNavBarComponent) tabNavBarInstance!: NxTabNavBarComponent;
}

describe('Scrollable TabHeader', () => {
    let fixture: ComponentFixture<TabHeaderScrollableTest>;
    let testInstance: TabHeaderScrollableTest;
    let tabHeaderNativeElement: HTMLElement;

    const createTestComponent = (component: Type<TabHeaderScrollableTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tabHeaderNativeElement = fixture.debugElement.nativeElement.querySelector('nx-tab-header');
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NotScrollableTabGroupTest, ScrollableTabGroupTest],
                imports: [NxTabsModule, BrowserAnimationsModule],
            }).compileComponents();
        }),
    );

    function getStartScrollElement(): HTMLElement {
        return fixture.debugElement.nativeElement.querySelector('nx-tab-scroll-indicator.start-button');
    }

    function getEndScrollElement(): HTMLElement {
        return fixture.debugElement.nativeElement.querySelector('nx-tab-scroll-indicator.end-button');
    }

    it('does not show scroll buttons if not scrollable', fakeAsync(() => {
        createTestComponent(NotScrollableTabGroupTest);
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(tabHeaderNativeElement.classList).not.toContain('scrollable');
        expect(getStartScrollElement()).toBeNull();
        expect(getEndScrollElement()).toBeNull();
    }));

    describe('scrollable', () => {
        beforeEach(fakeAsync(() => {
            createTestComponent(ScrollableTabGroupTest);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
        }));

        it('shows scroll buttons if scrollable', fakeAsync(() => {
            expect(tabHeaderNativeElement.classList).toContain('scrollable');
            expect(getStartScrollElement()).toBeTruthy();
            expect(getEndScrollElement()).toBeTruthy();
        }));

        it('updates scrollable on tabs change', fakeAsync(() => {
            testInstance.tabs = [
                { label: 'Tab Label 1', content: 'Content 1' },
                { label: 'Tab Label 2', content: 'Content 2' },
                { label: 'Tab Label 3', content: 'Content 3' },
            ];
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            expect(tabHeaderNativeElement.classList).not.toContain('scrollable');
        }));

        it('hides scroll-to-start indicator', fakeAsync(() => {
            expect(tabHeaderNativeElement.querySelector('.nx-tab-header')?.scrollLeft).toBe(0);
            expect(getStartScrollElement().classList).toContain('is-scrolled-to-start');
        }));

        it('shows scroll-to-start indicator when scrolled', fakeAsync(() => {
            const scrollableContainer = tabHeaderNativeElement.querySelector('.nx-tab-header');
            scrollableContainer!.scrollTo({ left: 50 });
            dispatchFakeEvent(scrollableContainer as Node, 'scroll');
            fixture.detectChanges();
            expect(getStartScrollElement().classList).not.toContain('is-scrolled-to-start');
        }));

        it('shows scroll-to-end indicator', fakeAsync(() => {
            expect(getEndScrollElement().classList).not.toContain('is-scrolled-to-end');
        }));

        it('hides scroll-to-end indicator when at end', fakeAsync(() => {
            const scrollableContainer = tabHeaderNativeElement.querySelector('.nx-tab-header');
            scrollableContainer!.scrollTo({ left: 1000 });
            dispatchFakeEvent(scrollableContainer as Node, 'scroll');
            fixture.detectChanges();
            expect(getEndScrollElement().classList).toContain('is-scrolled-to-end');
        }));
    });

    describe('responsive', () => {
        beforeEach(fakeAsync(() => {
            viewport.set('mobile');
            createTestComponent(ScrollableTabGroupTest);
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            fixture.detectChanges();
        }));

        it('marks scrollButtons as mobile', fakeAsync(() => {
            expect(getStartScrollElement().classList).toContain('is-mobile');
            expect(getStartScrollElement().classList).not.toContain('is-desktop-button');
        }));

        it('switches from mobile to desktop', fakeAsync(() => {
            viewport.set('desktop');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            expect(getStartScrollElement().classList).not.toContain('is-mobile');
            expect(getStartScrollElement().classList).toContain('is-desktop-button');
        }));

        afterEach(fakeAsync(() => {
            viewport.reset();
        }));
    });
});

@Directive()
abstract class TabNavBarScrollableTest {
    direction: any;
    links: any;

    @ViewChild(NxTabNavBarComponent) tabNavBarInstance!: NxTabNavBarComponent;
}

describe('Scrollable TabNavBar', () => {
    let fixture: ComponentFixture<TabNavBarScrollableTest>;
    let testInstance: TabNavBarScrollableTest;
    let tabNavBarNativeElement: HTMLElement;

    const createTestComponent = (component: Type<TabNavBarScrollableTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tabNavBarNativeElement = fixture.debugElement.query(By.directive(NxTabNavBarComponent)).nativeElement;
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NotScrollableTabNavBarTest, ScrollableTabNavBarTest],
                imports: [NxTabsModule, BrowserAnimationsModule],
            }).compileComponents();
        }),
    );

    function getStartScrollElement(): HTMLElement {
        return fixture.debugElement.nativeElement.querySelector('nx-tab-scroll-indicator.start-button');
    }

    function getEndScrollElement(): HTMLElement {
        return fixture.debugElement.nativeElement.querySelector('nx-tab-scroll-indicator.end-button');
    }

    it('does not show scroll buttons if not scrollable', fakeAsync(() => {
        createTestComponent(NotScrollableTabNavBarTest);
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(tabNavBarNativeElement.classList).not.toContain('scrollable');
        expect(getStartScrollElement()).toBeNull();
        expect(getEndScrollElement()).toBeNull();
    }));

    describe('scrollable', () => {
        beforeEach(fakeAsync(() => {
            createTestComponent(ScrollableTabNavBarTest);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
        }));

        it('shows scroll buttons if scrollable', fakeAsync(() => {
            expect(tabNavBarNativeElement.classList).toContain('scrollable');
            expect(getStartScrollElement()).toBeTruthy();
            expect(getEndScrollElement()).toBeTruthy();
            tick(THROTTLE_TIME);
        }));

        it('updates scrollable on tabs change', fakeAsync(() => {
            testInstance.links = [
                { label: 'Tab Label 1', active: true },
                { label: 'Tab Label 2', active: false },
                { label: 'Tab Label 3', active: false },
            ];
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            tick(THROTTLE_TIME);
            expect(tabNavBarNativeElement.classList).not.toContain('scrollable');
        }));

        it('hides scroll-to-start indicator', fakeAsync(() => {
            expect(tabNavBarNativeElement.querySelector('.nx-tab-nav-bar')!.scrollLeft).toBe(0);
            expect(getStartScrollElement().classList).toContain('is-scrolled-to-start');
        }));

        it('shows scroll-to-start indicator when scrolled', fakeAsync(() => {
            const scrollableContainer = tabNavBarNativeElement.querySelector('.nx-tab-nav-bar');
            scrollableContainer!.scrollTo({ left: 50 });
            dispatchFakeEvent(scrollableContainer!, 'scroll');
            fixture.detectChanges();
            expect(scrollableContainer!.scrollLeft).toBe(50);
            expect(getStartScrollElement().classList).not.toContain('is-scrolled-to-start');
        }));

        it('shows scroll-to-end indicator', fakeAsync(() => {
            expect(getEndScrollElement().classList).not.toContain('is-scrolled-to-end');
        }));

        it('hides scroll-to-end indicator when at end', fakeAsync(() => {
            const scrollableContainer = tabNavBarNativeElement.querySelector('.nx-tab-nav-bar');
            scrollableContainer!.scrollTo({ left: 1000 });
            dispatchFakeEvent(scrollableContainer!, 'scroll');
            fixture.detectChanges();
            expect(getEndScrollElement().classList).toContain('is-scrolled-to-end');
        }));
    });
});

@Component({
    template: `
        <nx-tab-group mobileAccordion="false">
            <nx-tab *ngFor="let tab of tabs" [label]="tab.label">
                {{ tab.content }}
            </nx-tab>
        </nx-tab-group>
    `,
})
class NotScrollableTabGroupTest extends TabHeaderScrollableTest {
    tabs = [
        { label: 'Tab Label 1', content: 'Content 1' },
        { label: 'Tab Label 2', content: 'Content 2' },
        { label: 'Tab Label 3', content: 'Content 3' },
    ];
}

@Component({
    template: `
        <div style="max-width: 400px" [dir]="direction">
            <nx-tab-group mobileAccordion="false">
                <nx-tab *ngFor="let tab of tabs" [label]="tab.label">
                    {{ tab.content }}
                </nx-tab>
            </nx-tab-group>
        </div>
    `,
})
class ScrollableTabGroupTest extends TabHeaderScrollableTest {
    tabs = [
        { label: 'Tab Label 1', content: 'Content 1' },
        { label: 'Tab Label 2', content: 'Content 2' },
        { label: 'Tab Label 3', content: 'Content 3' },
        { label: 'Tab Label 4', content: 'Content 4' },
        { label: 'Tab Label 5', content: 'Content 5' },
    ];
}

@Component({
    template: `
        <nx-tab-nav-bar>
            <a nxTabLink *ngFor="let link of links" [active]="link.active">
                {{ link.label }}
            </a>
        </nx-tab-nav-bar>
    `,
})
class NotScrollableTabNavBarTest extends TabNavBarScrollableTest {
    links = [
        { label: 'Tab Label 1', active: true },
        { label: 'Tab Label 2', active: false },
        { label: 'Tab Label 3', active: false },
    ];
}

@Component({
    template: `
        <div style="max-width: 400px" [dir]="direction">
            <nx-tab-nav-bar>
                <a nxTabLink *ngFor="let link of links" [active]="link.active">
                    {{ link.label }}
                </a>
            </nx-tab-nav-bar>
        </div>
    `,
})
class ScrollableTabNavBarTest extends TabNavBarScrollableTest {
    links = [
        { label: 'Tab Label 1', active: true },
        { label: 'Tab Label 2', active: false },
        { label: 'Tab Label 3', active: false },
        { label: 'Tab Label 4', active: false },
        { label: 'Tab Label 5', active: false },
    ];
}
