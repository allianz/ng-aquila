import { END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabsModule } from './tabs.module';

@Directive()
abstract class TabHeaderTest {
    selectedIndex = 0;
    autoselect = true;
    tabs: any;

    @ViewChild(NxTabHeaderComponent) tabHeaderInstance!: NxTabHeaderComponent;
}

describe('NxTabHeaderComponent', () => {
    let fixture: ComponentFixture<TabHeaderTest>;
    let testInstance: TabHeaderTest;
    let tabHeaderInstance: NxTabHeaderComponent;
    let tabHeaderDebugElement: DebugElement;
    let tabHeaderNativeElement: HTMLElement;
    let tabListContainer: HTMLDivElement;

    const createTestComponent = (component: Type<TabHeaderTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tabHeaderInstance = testInstance.tabHeaderInstance;
        tabHeaderDebugElement = fixture.debugElement.query(By.directive(NxTabHeaderComponent));
        tabHeaderNativeElement = tabHeaderDebugElement.nativeElement;
        tabListContainer = tabHeaderNativeElement.querySelector('.nx-tab-header') as HTMLDivElement;
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicHeader, SimpleHeader],
            imports: [NxTabsModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('creates the tab header', waitForAsync(() => {
        createTestComponent(BasicHeader);
        expect(tabHeaderInstance).toBeTruthy();
    }));

    describe('keyboard support', () => {
        describe('auto select mode', () => {
            it('should be turned on by default', () => {
                createTestComponent(BasicHeader);
                expect(tabHeaderInstance.autoselect).toBeTrue();
            });

            it('should emit selectFocusedIndex event', () => {
                createTestComponent(BasicHeader);
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                // we simply set the testInstances' selectedIndex when the event is fired
                // so if the value is reflected in selectedIndex we can be sure the event emitted
                expect(testInstance.selectedIndex).toBe(1);
            });

            it('should select tabs on LEFT and RIGHT arrow', () => {
                createTestComponent(BasicHeader);
                testInstance.selectedIndex = 1;
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(2);
                dispatchKeyboardEvent(tabListContainer, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(1);
            });

            it('should wrap on LEFT and RIGHT arrow', () => {
                createTestComponent(BasicHeader);
                dispatchKeyboardEvent(tabListContainer, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(2);
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(0);
            });

            it('should select first tab when pressing HOME key', () => {
                createTestComponent(BasicHeader);
                testInstance.selectedIndex = 1;
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', HOME);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(0);
            });

            it('should select last tab when pressing END key', () => {
                createTestComponent(BasicHeader);
                dispatchKeyboardEvent(tabListContainer, 'keydown', END);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(2);
            });

            it('should not focus on navigation button when pressing TAB key', () => {
                createTestComponent(BasicHeader);
                testInstance.selectedIndex = 1;
                testInstance.tabHeaderInstance._isScrolledToEnd = false;
                fixture.detectChanges();

                dispatchKeyboardEvent(tabListContainer, 'keydown', TAB);
                fixture.detectChanges();
                const navigationButton = tabHeaderNativeElement.querySelector('.end-button button');
                expect(document.activeElement).not.toBe(navigationButton);
            });
        });

        describe('manual select mode', () => {
            beforeEach(() => {
                createTestComponent(BasicHeader);
                testInstance.autoselect = false;
                fixture.detectChanges();
            });

            it('autoselect should be turned off', () => {
                expect(tabHeaderInstance.autoselect).toBeFalse();
            });

            it('should move focus on LEFT and RIGHT arrow', () => {
                testInstance.selectedIndex = 1;
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(2);
                dispatchKeyboardEvent(tabListContainer, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(1);
            });

            it('should wrap on LEFT and RIGHT arrow', () => {
                dispatchKeyboardEvent(tabListContainer, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(2);
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(0);
            });

            it('should focus first tab when pressing HOME key', () => {
                testInstance.selectedIndex = 1;
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', HOME);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(0);
            });

            it('should focus last tab when pressing END key', () => {
                dispatchKeyboardEvent(tabListContainer, 'keydown', END);
                fixture.detectChanges();
                expect(tabHeaderInstance.focusIndex).toBe(2);
            });

            it('should select focused tab when pressing SPACE or ENTER', () => {
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', SPACE);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(1);
                dispatchKeyboardEvent(tabListContainer, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                dispatchKeyboardEvent(tabListContainer, 'keydown', ENTER);
                fixture.detectChanges();
                expect(testInstance.selectedIndex).toBe(0);
            });

            it('should emit indexFocused event', () => {
                spyOn(testInstance as BasicHeader, 'onFocus').and.callThrough();
                dispatchKeyboardEvent(tabListContainer, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();
                expect((testInstance as BasicHeader).onFocus).toHaveBeenCalledTimes(1);
                expect((testInstance as BasicHeader).focusEvent).toBe(1);
            });
        });
    });
});

@Component({
    template: `
        <nx-tab-header [selectedIndex]="selectedIndex" (selectFocusedIndex)="selectedIndex = $event" (indexFocused)="onFocus($event)" [autoselect]="autoselect">
            <button
                nxTabLabelWrapper
                *ngFor="let tab of tabs; let i = index"
                (click)="selectedIndex = i"
                class="nx-tab-header__item"
                [class.nx-tab-header__item--active]="selectedIndex === i"
            >
                {{ tab.label }}
            </button>
        </nx-tab-header>
    `,
})
class BasicHeader extends TabHeaderTest {
    tabs = [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }];
    focusEvent: any;

    onFocus(event: Event) {
        this.focusEvent = event;
    }
}

@Component({
    template: `
        <nx-tab-header (selectFocusedIndex)="selectedIndex = $event" [selectedIndex]="selectedIndex">
            <button
                nxTabLabelWrapper
                *ngFor="let tab of tabs; let i = index"
                (click)="selectedIndex = i"
                class="nx-tab-header__item"
                [class.nx-tab-header__item--active]="selectedIndex === i"
            >
                {{ tab.label }}
            </button>
        </nx-tab-header>
    `,
})
class SimpleHeader extends TabHeaderTest {
    tabs = [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }];
}
