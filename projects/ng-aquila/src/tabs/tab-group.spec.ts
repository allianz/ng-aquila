import { NxAccordionDirective } from '@allianz/ng-aquila/accordion';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DELETE, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  OnDestroy,
  QueryList,
  signal,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTabChangeEvent, NxTabGroupComponent } from './tab-group';
import { NxTabsAppearance, TAB_GROUP_DEFAULT_OPTIONS, TabGroupDefaultOptions } from './tabs.models';
import { NxTabsModule } from './tabs.module';

declare let viewport: any;
const THROTTLE_TIME = 200;

const tabsDefaultOptions: TabGroupDefaultOptions = {
  appearance: 'expert',
};

@Directive({ standalone: true })
abstract class TabsTest {
  @ViewChildren(NxAccordionDirective)
  accordion!: QueryList<NxAccordionDirective>;

  selectedIndex: any;
  autoselect: any;
  negative = false;
  customLabel = 'First label';
  showAccordion = true;
  appearance: NxTabsAppearance = 'expert';

  @ViewChild(NxTabGroupComponent)
  tabGroupInstance!: NxTabGroupComponent;
}

describe('NxTabGroupComponent', () => {
  let fixture: ComponentFixture<TabsTest>;
  let testInstance: TabsTest;
  let tabGroupInstance: NxTabGroupComponent;
  let tabGroupDebugElement: DebugElement;

  const createTestComponent = (component: Type<TabsTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    tabGroupInstance = testInstance.tabGroupInstance;
    tabGroupDebugElement = fixture.debugElement.query(By.directive(NxTabGroupComponent));
  };

  /**
   * Checks that the `selectedIndex` has been updated; checks that the label and body have their respective `active` classes.
   */
  function checkSelectedIndex(expectedIndex: number) {
    fixture.detectChanges();

    expect(tabGroupInstance.selectedIndex).toBe(expectedIndex);

    const tabLabelElement = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[
      expectedIndex
    ].nativeElement;
    expect(tabLabelElement).toHaveClass('nx-tab-header__item--active');
  }

  describe('no preset options', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NxTabsModule,
          BasicTabs,
          OnPushTabs,
          ConfigurableTabs,
          DynamicTabTest,
          CustomElementTest,
          TestComponent,
          BindingTabs,
          EventTabsTest,
          DisabledTabs,
          TemplateTabs,
          NestedTabGroups,
          PreselectedTabs,
          ClosableTabs,
          ClosableWithDisabledTabs,
        ],
      }).compileComponents();
    }));

    describe('basic tabs', () => {
      it('creates the tab group', waitForAsync(() => {
        createTestComponent(BasicTabs);
        expect(tabGroupInstance).toBeTruthy();
      }));

      it('should default to the first tab', () => {
        createTestComponent(BasicTabs);
        fixture.detectChanges();
        checkSelectedIndex(0);
      });

      it('should update tab labels', () => {
        createTestComponent(ConfigurableTabs);
        expect(
          fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent,
        ).toMatch('First label');
        testInstance.customLabel = 'Cars';
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent,
        ).toMatch('Cars');
      });

      it('should accept a template with nxTabLabel directive', () => {
        createTestComponent(TemplateTabs);
        expect(
          fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent,
        ).toMatch('One');
      });

      it('should change tab on click', () => {
        createTestComponent(BasicTabs);
        // select the second tab
        let tabLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[1];
        tabLabel.nativeElement.click();
        checkSelectedIndex(1);
        // select the first tab
        tabLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[0];
        tabLabel.nativeElement.click();
        checkSelectedIndex(0);
      });

      it('should support two-way binding on selectedIndex', fakeAsync(() => {
        createTestComponent(BindingTabs);
        tick(THROTTLE_TIME);
        (testInstance as BindingTabs).selectedIndex = 1;
        checkSelectedIndex(1);
        const tabLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[0];
        tabLabel.nativeElement.click();
        fixture.detectChanges();
        tick();
        expect((testInstance as BindingTabs).selectedIndex).toBe(0);
        flush();
      }));

      it('emit selectedTabChange event when tab is changed', fakeAsync(() => {
        createTestComponent(EventTabsTest);
        tick(THROTTLE_TIME);
        const eventTestInstance = testInstance as EventTabsTest;
        vi.spyOn(eventTestInstance, 'tabChanged');
        const tabLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[1];
        tabLabel.nativeElement.click();
        fixture.detectChanges();
        tick();
        expect(eventTestInstance.tabChanged).toHaveBeenCalledTimes(1);
        expect(eventTestInstance.tabChangeEvent.index).toBe(1);
        flush();
      }));

      describe('autoselect', () => {
        it('should be turned on by default', () => {
          createTestComponent(BasicTabs);
          expect(tabGroupInstance.autoselect).toBe(true);
        });
      });

      describe('negative', () => {
        it('should update negative on programmatic change', () => {
          createTestComponent(OnPushTabs);
          expect(tabGroupInstance.negative).toBe(false);
          expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-negative');

          tabGroupInstance.negative = true;
          fixture.detectChanges();
          expect(tabGroupDebugElement.nativeElement).toHaveClass('is-negative');
        });
      });
    });

    describe('lazy loaded tabs', () => {
      it('should lazy load the second tab', fakeAsync(() => {
        createTestComponent(TemplateTabs);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const secondLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[1];
        secondLabel.nativeElement.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        const child = fixture.debugElement.query(By.css('.child'))!;
        expect(child.nativeElement).toBeDefined();
        flush();
      }));
    });

    describe('disabled tabs', () => {
      it('should set the disabled class on the group', () => {
        createTestComponent(DisabledTabs);
        (testInstance as DisabledTabs).disabled = true;
        fixture.detectChanges();

        const tabGroup = fixture.nativeElement.querySelector('nx-tab-group');
        expect(tabGroup).toHaveClass('is-disabled');
      });

      it('should set the disabled class on the tab items', () => {
        createTestComponent(DisabledTabs);
        (testInstance as DisabledTabs).disabled = true;
        fixture.detectChanges();

        const tabItems = fixture.nativeElement.querySelectorAll('.nx-tab__item');
        Array.from(tabItems).forEach((item) =>
          expect(item as HTMLElement).toHaveClass('is-disabled'),
        );
      });

      it('should update disabled on programmatic change', () => {
        createTestComponent(OnPushTabs);
        expect(tabGroupInstance.disabled).toBe(false);
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-disabled');

        tabGroupInstance.disabled = true;
        fixture.detectChanges();
        expect(tabGroupDebugElement.nativeElement).toHaveClass('is-disabled');
      });

      it('should set the disabled class on a single item', () => {
        createTestComponent(DisabledTabs);
        (testInstance as DisabledTabs).singleDisabled = true;
        fixture.detectChanges();

        const tabItem = fixture.nativeElement.querySelector('.nx-tab-header__item');
        expect(tabItem).toHaveClass('nx-tab-header__item--disabled');
        expect(fixture.nativeElement.querySelector('nx-tab-group')).not.toHaveClass('is-disabled');
      });

      it('should set the first selectable item as active', () => {
        createTestComponent(DisabledTabs);
        (testInstance as DisabledTabs).singleDisabled = true;
        fixture.detectChanges();

        const selectedTabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[1];
        expect(selectedTabItem).toHaveClass('nx-tab-header__item--active');
      });
    });

    describe('closable tabs', () => {
      it('should render a close button for each closable tab', () => {
        createTestComponent(ClosableTabs);
        const closeButtons = fixture.nativeElement.querySelectorAll('.nx-tab-header__close');
        expect(closeButtons.length).toBe(2);
      });

      it('should keep the close buttons out of the natural tab order', () => {
        createTestComponent(ClosableTabs);
        const closeButtons = fixture.nativeElement.querySelectorAll('.nx-tab-header__close');
        closeButtons.forEach((button: HTMLElement) => {
          expect(button.getAttribute('tabindex')).toBe('-1');
        });
      });

      it('should move focus from the selected tab to its close button on TAB', () => {
        createTestComponent(ClosableTabs);
        document.body.appendChild(fixture.nativeElement);

        const tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', TAB, 'Tab');
        fixture.detectChanges();

        expect(document.activeElement).toBe(closeButton);
        document.body.removeChild(fixture.nativeElement);
      });

      it('should move focus from the close button back to its tab on SHIFT+TAB', () => {
        createTestComponent(ClosableTabs);
        document.body.appendChild(fixture.nativeElement);

        const tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        dispatchKeyboardEvent(closeButton, 'keydown', TAB, 'Tab', { shift: true });
        fixture.detectChanges();

        expect(document.activeElement).toBe(tabItem);
        document.body.removeChild(fixture.nativeElement);
      });

      it('should emit tabClose with the tab index when the close button is clicked', () => {
        createTestComponent(ClosableTabs);
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[1];
        closeButton.click();
        fixture.detectChanges();

        expect((testInstance as ClosableTabs).closedIndex).toBe(1);
      });

      it('should emit `closed` on the tab whose close button is clicked', () => {
        createTestComponent(ClosableTabs);
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[1];
        closeButton.click();
        fixture.detectChanges();

        expect((testInstance as ClosableTabs).closedLabels).toEqual(['Second label']);
      });

      it('should still move between tabs with the arrow keys while a close button is focused', () => {
        createTestComponent(ClosableTabs);
        document.body.appendChild(fixture.nativeElement);

        const tabItems = fixture.nativeElement.querySelectorAll('.nx-tab-header__item');
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.focus();
        dispatchKeyboardEvent(closeButton, 'keydown', RIGHT_ARROW, 'ArrowRight');
        fixture.detectChanges();

        expect(document.activeElement).toBe(tabItems[1]);
        document.body.removeChild(fixture.nativeElement);
      });

      it('should move focus to the next tab when the close button is activated via ENTER/SPACE', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);

        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        const remainingTabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        expect(document.activeElement).toBe(remainingTabItem);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should not move focus onto the remaining disabled tab after closing the last enabled tab via keyboard', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);

        // Close the first enabled tab via keyboard so only the second enabled tab remains.
        let tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        // Close the remaining enabled tab via keyboard; only the disabled tab is left.
        tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        const disabledTabItem = fixture.nativeElement.querySelector('.nx-tab-header__item');
        expect(document.activeElement).not.toBe(disabledTabItem);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should move focus to the next focusable element when no tab is focusable anymore', fakeAsync(() => {
        createTestComponent(ClosableTabsWithTrailingButton);
        document.body.appendChild(fixture.nativeElement);

        // Close both enabled tabs; only the disabled one is left, so no tab is focusable.
        let tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        // Without the fallback, focus would land on the body instead.
        const trailingButton = fixture.nativeElement.querySelector('#trailing-button');
        expect(document.activeElement).toBe(trailingButton);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should skip elements that are not tabbable', fakeAsync(() => {
        createTestComponent(ClosableTabsWithUntabbableButtons);
        document.body.appendChild(fixture.nativeElement);

        let tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        const reachableButton = fixture.nativeElement.querySelector('#reachable-button');
        expect(document.activeElement).toBe(reachableButton);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should not move focus when the tab list changes after a declined close', fakeAsync(() => {
        createTestComponent(ClosableTabsDeclinedClose);
        const declined = testInstance as ClosableTabsDeclinedClose;
        const focusSpy = vi.spyOn(tabGroupInstance.tabHeader, 'focusTab');

        // The user cancels the confirmation, so nothing is removed.
        fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0].click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        // A later, unrelated change to the tab list must not act on the cancelled close.
        declined.addTab();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(focusSpy).not.toHaveBeenCalled();
        flush();
      }));

      it('should not emit `selectedTabChange` when no tab is selectable anymore', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);
        const tabChangeSpy = vi.fn<(event: NxTabChangeEvent) => void>();
        const indexChangeSpy = vi.fn();
        tabGroupInstance.selectedTabChange.subscribe(tabChangeSpy);
        tabGroupInstance.selectedIndexChange.subscribe(indexChangeSpy);

        // Close both enabled tabs; only the disabled one is left, so nothing is selectable.
        let tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        tabItem = fixture.nativeElement.querySelectorAll('.nx-tab-header__item')[0];
        dispatchKeyboardEvent(tabItem, 'keydown', DELETE, 'Delete');
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(-1);
        expect(indexChangeSpy).toHaveBeenCalledWith(-1);
        // Every emitted event must carry a tab instance, so -1 is reported via the index only.
        tabChangeSpy.mock.calls.forEach(([event]) => expect(event.tab).toBeTruthy());
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should emit `selectedTabChange` and update `isActive`, but not `selectedIndexChange`, when the active tab is closed and another tab takes its numeric index', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);
        const indexChangeSpy = vi.fn();
        const tabChangeSpy = vi.fn();
        tabGroupInstance.selectedIndexChange.subscribe(indexChangeSpy);
        tabGroupInstance.selectedTabChange.subscribe(tabChangeSpy);

        // The first tab is active by default. Close it; the second tab shifts into index 0.
        // The numeric `selectedIndex` stays 0, so only `selectedTabChange` reports the swap.
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(0);
        expect(indexChangeSpy).not.toHaveBeenCalled();
        expect(tabChangeSpy).toHaveBeenCalledTimes(1);
        expect(tabChangeSpy.mock.lastCall![0].index).toBe(0);
        expect(tabGroupInstance.tabs.toArray()[0].isActive).toBe(true);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should emit `selectedIndexChange` when the active tab shifts to a new numeric index because an earlier sibling was closed', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);

        // Select the second tab, then close the first tab so the second tab (still active)
        // shifts from index 1 down to index 0 without its identity changing.
        tabGroupInstance.selectedIndex = 1;
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        const activeTabBeforeClose = tabGroupInstance.tabs.toArray()[1];

        const indexChangeSpy = vi.fn();
        tabGroupInstance.selectedIndexChange.subscribe(indexChangeSpy);

        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(0);
        expect(tabGroupInstance.tabs.toArray()[0]).toBe(activeTabBeforeClose);
        expect(indexChangeSpy).toHaveBeenCalledWith(0);
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should not emit `selectedIndexChange` or `selectedTabChange` when closing a tab that is not active', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        document.body.appendChild(fixture.nativeElement);
        const activeTabBeforeClose = tabGroupInstance.tabs.toArray()[0];
        const indexChangeSpy = vi.fn();
        const tabChangeSpy = vi.fn();
        tabGroupInstance.selectedIndexChange.subscribe(indexChangeSpy);
        tabGroupInstance.selectedTabChange.subscribe(tabChangeSpy);

        // The first tab is active by default. Close the second (non-active) tab instead;
        // the active tab's identity and index are both unaffected.
        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[1];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(0);
        expect(tabGroupInstance.tabs.toArray()[0]).toBe(activeTabBeforeClose);
        expect(indexChangeSpy).not.toHaveBeenCalled();
        expect(tabChangeSpy).not.toHaveBeenCalled();
        document.body.removeChild(fixture.nativeElement);
        flush();
      }));

      it('should announce the closed tab once it is removed', fakeAsync(() => {
        createTestComponent(ClosableWithDisabledTabs);
        const announcer = TestBed.inject(LiveAnnouncer);
        const announceSpy = vi.spyOn(announcer, 'announce').mockResolvedValue(undefined);

        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(announceSpy).toHaveBeenCalledWith('First tab closed');
        flush();
      }));

      it('should not announce anything when the consumer keeps the tab', fakeAsync(() => {
        createTestComponent(ClosableTabs);
        const announcer = TestBed.inject(LiveAnnouncer);
        const announceSpy = vi.spyOn(announcer, 'announce').mockResolvedValue(undefined);

        const closeButton = fixture.nativeElement.querySelectorAll('.nx-tab-header__close')[0];
        closeButton.click();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(announceSpy).not.toHaveBeenCalled();
        flush();
      }));
    });

    describe('dynamic binding tabs', () => {
      it('should be able to add a new tab and select it', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        tick(THROTTLE_TIME);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        dynamicTest.tabs.push({ label: 'new label', content: 'new content' });
        fixture.detectChanges();
        tick();
        dynamicTest.selectedIndex = 3;
        fixture.detectChanges();
        tick();
        expect(tabGroupInstance.tabBodyChildren.toArray()[3].active).toBe(true);
        flush();
      }));

      it('should update selected index if the first tab is removed while selected', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        fixture.componentInstance.selectedIndex = 0;
        fixture.detectChanges();
        tick();

        // Remove last tab while last tab is selected, expect next tab over to be selected
        dynamicTest.tabs.shift();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(0);
        expect(fixture.nativeElement.querySelector('.nx-tab__body--active').textContent).toMatch(
          'Content 2',
        );
        flush();
      }));

      it('should update selected index if the last tab is removed while selected', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        const numberOfTabs = tabGroupInstance.tabs.length;
        fixture.componentInstance.selectedIndex = numberOfTabs - 1;
        fixture.detectChanges();
        tick();

        // Remove last tab while last tab is selected, expect next tab over to be selected
        dynamicTest.tabs.pop();
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(numberOfTabs - 2);
        expect(fixture.nativeElement.querySelector('.nx-tab__body--active').textContent).toMatch(
          'Content 2',
        );
        flush();
      }));

      it('should maintain the selected tab if a new tab is added', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        tick(THROTTLE_TIME);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        fixture.componentInstance.selectedIndex = 1;
        fixture.detectChanges();
        tick();

        // Add a new tab at the beginning.
        dynamicTest.tabs.unshift({ label: 'New tab', content: 'at the start' });
        fixture.detectChanges();
        tick();

        expect(tabGroupInstance.selectedIndex).toBe(2);
        expect(tabGroupInstance.tabBodyChildren.toArray()[2].active).toBe(true);
        flush();
      }));

      it('should maintain the selected tab if a tab is removed', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        tick(THROTTLE_TIME);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        fixture.componentInstance.selectedIndex = 1;
        fixture.detectChanges();
        tick();

        // Remove the first tab that is right before the selected one.
        dynamicTest.tabs.splice(0, 1);
        fixture.detectChanges();
        tick(THROTTLE_TIME);

        expect(tabGroupInstance.selectedIndex).toBe(0);
        expect(tabGroupInstance.tabBodyChildren.toArray()[0].active).toBe(true);
        flush();
      }));

      it('should not fire `selectedTabChange` when the amount of tabs changes', fakeAsync(() => {
        createTestComponent(DynamicTabTest);
        tick(THROTTLE_TIME);
        const dynamicTest = fixture.componentInstance as DynamicTabTest;
        fixture.detectChanges();
        fixture.componentInstance.selectedIndex = 1;
        fixture.detectChanges();

        // Add a new tab at the beginning.
        vi.spyOn(dynamicTest, 'handleSelection').mockReturnValue(undefined);
        dynamicTest.tabs.unshift({ label: 'New tab', content: 'at the start' });
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(dynamicTest.handleSelection).not.toHaveBeenCalled();
        flush();
      }));
    });

    describe('appearance', () => {
      beforeEach(() => {
        tabsDefaultOptions.appearance = 'expert';
      });

      it('should set the appearance to "default" by default', () => {
        createTestComponent(BasicTabs);
        expect(tabGroupInstance.appearance).toBe('default');
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
      });

      it('should change appearance on input change', () => {
        createTestComponent(ConfigurableTabs);
        expect(tabGroupInstance.appearance).toBe('expert');
        expect(tabGroupDebugElement.nativeElement).toHaveClass('is-expert');

        testInstance.appearance = 'default';
        fixture.detectChanges();
        expect(tabGroupInstance.appearance).toBe('default');
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
      });

      it('should change appearance on programmatic change', () => {
        createTestComponent(OnPushTabs);
        expect(tabGroupInstance.appearance).toBe('default');
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');

        tabGroupInstance.appearance = 'expert';
        fixture.detectChanges();
        expect(tabGroupDebugElement.nativeElement).toHaveClass('is-expert');
      });
    });

    describe('responsive', () => {
      it('should show accordion instead of tabs on viewport change', fakeAsync(() => {
        createTestComponent(BasicTabs);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('nx-accordion')).toBeTruthy();
        flush();
      }));

      it('should not show accordion if mobileAccordion is false', fakeAsync(() => {
        createTestComponent(ConfigurableTabs);
        testInstance.showAccordion = false;
        fixture.detectChanges();
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(fixture.nativeElement.querySelector('nx-accordion')).toBeFalsy();
        flush();
      }));

      it('should switch to accordion on init', fakeAsync(() => {
        viewport.set('mobile');
        createTestComponent(BasicTabs);
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        flush();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('nx-accordion')).toBeTruthy();
      }));

      it('should not destroy components in body on switch', fakeAsync(() => {
        createTestComponent(CustomElementTest);
        vi.spyOn((testInstance as CustomElementTest).customElement, 'ngOnDestroy').mockReturnValue(
          undefined,
        );
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(
          (testInstance as CustomElementTest).customElement.ngOnDestroy,
        ).not.toHaveBeenCalled();
        flush();
      }));

      it('should not destroy contents of ngTabContent on switch', fakeAsync(() => {
        createTestComponent(TemplateTabs);
        tick();
        const instance = testInstance as TemplateTabs;
        instance.selectedIndex = 1;
        fixture.detectChanges();
        tick();
        expect(instance.testComponents).toHaveLength(1);
        const element = instance.testComponents.toArray()[0];
        vi.spyOn(element, 'ngOnDestroy').mockReturnValue(undefined);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(element.ngOnDestroy).not.toHaveBeenCalled();
        flush();
      }));

      it('should not destroy nxTabLabel contents on switch', fakeAsync(() => {
        createTestComponent(CustomElementTest);
        tick();
        const instance = testInstance as CustomElementTest;
        expect(instance.customElementInHeader).toHaveLength(2);
        const elementInHeader = instance.customElementInHeader.toArray()[0];
        vi.spyOn(elementInHeader, 'ngOnDestroy').mockReturnValue(undefined);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(elementInHeader.ngOnDestroy).not.toHaveBeenCalled();
        flush();
      }));

      it('should mirror negative property on the accordion', fakeAsync(() => {
        createTestComponent(ConfigurableTabs);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        testInstance.negative = true;
        tick(THROTTLE_TIME);
        fixture.detectChanges();
        expect(tabGroupInstance.accordion.negative).toBeTruthy();
        flush();
      }));

      it('should mirror output events', fakeAsync(() => {
        // at the moment the (focusChanged) event is not supported in accordion
        // so we skip that one
        createTestComponent(DynamicTabTest);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        fixture.detectChanges();
        vi.spyOn(testInstance as DynamicTabTest, 'handleSelection').mockReturnValue(undefined);
        vi.spyOn(testInstance as DynamicTabTest, 'onIndexChange').mockReturnValue(undefined);
        // click on 2nd tab
        fixture.nativeElement.querySelectorAll('nx-expansion-panel-header')[1].click();
        fixture.detectChanges();
        tick();
        expect((testInstance as DynamicTabTest).handleSelection).toHaveBeenCalled();
        expect((testInstance as DynamicTabTest).onIndexChange).toHaveBeenCalled();
        flush();
      }));

      it('Should keep disabled tabs state in mobile', fakeAsync(() => {
        createTestComponent(DisabledTabs);
        (testInstance as DisabledTabs).singleDisabled = true;
        fixture.detectChanges();
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        fixture.detectChanges();
        const expansionPanelHeaders = fixture.nativeElement.querySelectorAll(
          'nx-expansion-panel-header',
        );
        expect(expansionPanelHeaders[0]).toHaveClass('is-disabled');
        expect(expansionPanelHeaders[1]).not.toHaveClass('is-disabled');
        (testInstance as DisabledTabs).disabled = true;
        fixture.detectChanges();
        tick();
        expect(expansionPanelHeaders[0]).toHaveClass('is-disabled');
        expect(expansionPanelHeaders[1]).toHaveClass('is-disabled');
        flush();
      }));

      it('should only emit `_appearanceChange` when the change happens', fakeAsync(() => {
        createTestComponent(BasicTabs);
        const spy = vi.fn().mockName('appearence changed');
        const subscription: Subscription = tabGroupInstance._appearanceChange.subscribe(spy);
        // it shouldn't emit _appearenceChange on every single resize
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick();
        expect(spy).not.toHaveBeenCalled();
        spy.mockClear();
        // it should emit _appearenceChange on resize to mobile
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(spy).toHaveBeenCalled();
        spy.mockClear();
        // it should emit _appearenceChange on resize to desktop
        viewport.set('desktop');
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(THROTTLE_TIME);
        expect(spy).toHaveBeenCalled();
        spy.mockClear();
        subscription.unsubscribe();
        flush();
      }));
    });

    describe('a11y', () => {
      it('has no accessibility violations', async () => {
        createTestComponent(BasicTabs);
        await expect(fixture.nativeElement).toBeAccessible();
      });
    });

    describe('preselected tab', () => {
      // see https://github.developer.allianz.io/ilt/ngx-brand-kit/issues/5518
      it('should initialize the key manager with the selected tab', () => {
        createTestComponent(PreselectedTabs);
        expect(tabGroupInstance.tabHeader.focusIndex).toBe(1);
      });

      it('should keep the selection when tabbing out of the tab list', () => {
        createTestComponent(PreselectedTabs);
        const tabList = fixture.debugElement.query(By.css('.nx-tab-header')).nativeElement;
        dispatchKeyboardEvent(tabList, 'keydown', TAB);
        checkSelectedIndex(1);
      });
    });

    describe('nested tab groups', () => {
      it('should handle destruction of unactivated nested tabs', fakeAsync(() => {
        // see https://github.developer.allianz.io/ilt/ngx-brand-kit/issues/5118
        createTestComponent(NestedTabGroups);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        // Keep the first tab selected
        expect(tabGroupInstance.selectedIndex).toBe(0);

        // Destroy without ever activating the second tab
        expect(() => {
          fixture.destroy();
        }).not.toThrow();
        flush();
      }));
    });
  });

  describe('default options injection token', () => {
    beforeEach(waitForAsync(() => {
      tabsDefaultOptions.appearance = 'expert';
      TestBed.configureTestingModule({
        imports: [NxTabsModule, BasicTabs, ConfigurableTabs],
        providers: [{ provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: tabsDefaultOptions }],
      }).compileComponents();
    }));

    it('should have an "default" appearance if empty default options are provided', inject(
      [TAB_GROUP_DEFAULT_OPTIONS],
      (defaultOptions: TabGroupDefaultOptions) => {
        delete defaultOptions.appearance;
        createTestComponent(BasicTabs);
        expect(tabGroupInstance.appearance).toBe('default');
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
      },
    ));

    it('should have a custom default appearance if default options contain a custom appearance', () => {
      createTestComponent(BasicTabs);
      expect(tabGroupInstance.appearance).toBe('expert');
      expect(tabGroupDebugElement.nativeElement).toHaveClass('is-expert');
    });

    it('should override a custom default appearance', () => {
      createTestComponent(ConfigurableTabs);
      expect(tabGroupInstance.appearance).toBe('expert');

      testInstance.appearance = 'default';
      fixture.detectChanges();
      expect(tabGroupInstance.appearance).toBe('default');
      expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
    });

    it('changes appearance on injection token change', inject(
      [TAB_GROUP_DEFAULT_OPTIONS],
      (defaultOptions: TabGroupDefaultOptions) => {
        createTestComponent(BasicTabs);
        testInstance.appearance = undefined!;
        fixture.detectChanges();
        expect(tabGroupInstance.appearance).toBe('expert');
        expect(tabGroupDebugElement.nativeElement).toHaveClass('is-expert');

        defaultOptions.appearance = 'default';
        fixture.detectChanges();
        expect(tabGroupInstance.appearance).toBe('default');
        expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
      },
    ));
  });

  describe('with A1', () => {
    const a1Enabled = signal(true);

    beforeEach(waitForAsync(() => {
      a1Enabled.set(true);
      TestBed.configureTestingModule({
        imports: [NxTabsModule, BasicTabs, ConfigurableTabs],
        providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: a1Enabled } }],
      }).compileComponents();
    }));

    it('should not show accordion on viewport change', fakeAsync(() => {
      createTestComponent(BasicTabs);
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-accordion')).toBeFalsy();
      flush();
    }));

    it('should ignore an explicit mobileAccordion="true" input', fakeAsync(() => {
      createTestComponent(ConfigurableTabs);
      testInstance.showAccordion = true;
      fixture.detectChanges();

      expect(tabGroupInstance.mobileAccordion).toBe(false);

      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      expect(fixture.nativeElement.querySelector('nx-accordion')).toBeFalsy();
      flush();
    }));

    it('should hide an already-shown accordion once A1 gets enabled at runtime', fakeAsync(() => {
      a1Enabled.set(false);
      createTestComponent(BasicTabs);
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-accordion')).toBeTruthy();

      a1Enabled.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-accordion')).toBeFalsy();
      flush();
    }));
  });
});

@Component({
  selector: 'test-basic-tabs',
  template: `
    <nx-tab-group>
      <nx-tab label="First label">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class BasicTabs extends TabsTest {}

@Component({
  selector: 'test-on-push-tabs',
  template: `
    <nx-tab-group>
      <nx-tab label="First label">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxTabsModule],
})
class OnPushTabs extends TabsTest {}

@Component({
  selector: 'test-configurable-tabs',
  template: `
    <nx-tab-group (tabClose)="tabClosed($event)">
      <nx-tab label="First label" [closable]="true" (closed)="closedLabels.push('First label')">
        First
      </nx-tab>
      <nx-tab label="Second label" [closable]="true" (closed)="closedLabels.push('Second label')">
        Second
      </nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxTabsModule],
})
class ClosableTabs extends TabsTest {
  closedIndex: number | null = null;
  closedLabels: string[] = [];
  tabClosed(event: NxTabChangeEvent) {
    this.closedIndex = event.index;
  }
}

@Component({
  template: `
    <nx-tab-group (tabClose)="closeTab($event.index)">
      @for (tab of tabs; track tab) {
        <nx-tab [label]="tab.label" [closable]="tab.closable" [disabled]="tab.disabled">{{
          tab.label
        }}</nx-tab>
      }
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class ClosableWithDisabledTabs extends TabsTest {
  tabs = [
    { label: 'First tab', closable: true, disabled: false },
    { label: 'Second tab', closable: true, disabled: false },
    { label: 'Third tab', closable: false, disabled: true },
  ];

  closeTab(index: number) {
    this.tabs = this.tabs.filter((_, i) => i !== index);
  }
}

@Component({
  template: `
    <nx-tab-group (tabClose)="closeTab($event.index)">
      @for (tab of tabs; track tab) {
        <nx-tab [label]="tab.label" [closable]="tab.closable" [disabled]="tab.disabled">{{
          tab.label
        }}</nx-tab>
      }
    </nx-tab-group>
    <button id="trailing-button" type="button">After the tabs</button>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class ClosableTabsWithTrailingButton extends ClosableWithDisabledTabs {}

@Component({
  template: `
    <nx-tab-group (tabClose)="closeTab($event.index)">
      @for (tab of tabs; track tab) {
        <nx-tab [label]="tab.label" [closable]="tab.closable" [disabled]="tab.disabled">{{
          tab.label
        }}</nx-tab>
      }
    </nx-tab-group>
    <button id="disabled-button" type="button" disabled>Disabled</button>
    <button id="hidden-button" type="button" style="display: none">Hidden</button>
    <button id="untabbable-button" type="button" tabindex="-1">Not in tab order</button>
    <button id="reachable-button" type="button">Reachable</button>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class ClosableTabsWithUntabbableButtons extends ClosableWithDisabledTabs {}

@Component({
  template: `
    <nx-tab-group (tabClose)="confirmClose()">
      @for (tab of tabs; track tab.label) {
        <nx-tab [label]="tab.label" [closable]="true">{{ tab.label }}</nx-tab>
      }
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class ClosableTabsDeclinedClose extends TabsTest {
  tabs = [{ label: 'First tab' }, { label: 'Second tab' }, { label: 'Third tab' }];

  /** Mimics a confirm dialog the user cancels, so the tab stays. */
  confirmClose() {}

  /** An unrelated change to the tab list, e.g. the app adding a tab later on. */
  addTab() {
    this.tabs = [...this.tabs, { label: 'Fourth tab' }];
  }
}

@Component({
  template: `
    <nx-tab-group [negative]="negative" [mobileAccordion]="showAccordion" [appearance]="appearance">
      <nx-tab [label]="customLabel">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class ConfigurableTabs extends TabsTest {}

@Component({
  selector: 'test-binding-tabs',
  template: `
    <nx-tab-group [(selectedIndex)]="selectedIndex">
      <nx-tab label="First label">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class BindingTabs extends TabsTest {
  selectedIndex: any;
}

@Component({
  selector: 'test-event-tabs-test',
  template: `
    <nx-tab-group [(selectedIndex)]="selectedIndex" (selectedTabChange)="tabChanged($event)">
      <nx-tab label="First label">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class EventTabsTest extends TabsTest {
  selectedIndex: any;
  tabChangeEvent: any;

  tabChanged(event: NxTabChangeEvent) {
    this.tabChangeEvent = event;
  }
}

@Component({
  selector: 'test-dynamic-tab-test',
  template: `
    <nx-tab-group
      [autoselect]="autoselect"
      [(selectedIndex)]="selectedIndex"
      (focusChange)="handleFocus($event)"
      (selectedIndexChange)="onIndexChange($event)"
      (selectedTabChange)="handleSelection($event)"
    >
      @for (tab of tabs; track tab) {
        <nx-tab [label]="tab.label">
          {{ tab.content }}
        </nx-tab>
      }
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class DynamicTabTest extends TabsTest {
  autoselect = true;
  focusEvent: any;
  selectEvent: any;

  tabs = [
    { label: 'Label 1', content: 'Content 1' },
    { label: 'Label 2', content: 'Content 2' },
    { label: 'Label 3', content: 'Content 3' },
  ];

  handleFocus(event: any) {
    this.focusEvent = event;
  }
  handleSelection(event: any) {
    this.selectEvent = event;
  }

  onIndexChange(event: any) {}
}

@Component({
  template: '<span>I am a test component</span>',
  selector: 'my-test-component',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class TestComponent implements OnDestroy {
  ngOnDestroy(): void {}
}

@Component({
  selector: 'test-custom-element-test',
  template: `
    <nx-tab-group [negative]="negative">
      <nx-tab>
        <ng-template nxTabLabel
          ><my-test-component #customHeader></my-test-component>First label</ng-template
        >
        <my-test-component #customElement></my-test-component>
      </nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule, TestComponent],
})
class CustomElementTest extends TabsTest {
  @ViewChild('customElement', { read: TestComponent })
  customElement!: TestComponent;
  @ViewChildren(TestComponent)
  customElementInHeader!: QueryList<TestComponent>;
}

@Component({
  selector: 'test-disabled-tabs',
  template: `
    <nx-tab-group [disabled]="disabled" [mobileAccordion]="showAccordion">
      <nx-tab disabled="singleDisabled" [label]="customLabel">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class DisabledTabs extends TabsTest {
  disabled = false;
  singleDisabled = false;
}

@Component({
  selector: 'test-template-tabs',
  template: `
    <nx-tab-group [(selectedIndex)]="selectedIndex">
      <nx-tab>
        <ng-template nxTabLabel>One</ng-template>
        Eager
      </nx-tab>
      <nx-tab>
        <ng-template nxTabLabel>Two</ng-template>
        <ng-template nxTabContent>
          <div class="child">Hi</div>
          <my-test-component #testComponent></my-test-component>
        </ng-template>
      </nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule, TestComponent],
})
class TemplateTabs extends TabsTest {
  selectedIndex = 0;
  @ViewChildren(TestComponent)
  testComponents!: QueryList<TestComponent>;
}

@Component({
  selector: 'test-nested-tab-groups',
  template: `
    <nx-tab-group>
      <nx-tab label="First tab">
        <p>First tab content</p>
      </nx-tab>
      <nx-tab label="Second tab">
        <ng-template nxTabContent>
          <nx-tab-group>
            <nx-tab label="Nested First">
              <ng-template nxTabContent>
                <p>Nested first tab content</p>
              </ng-template>
            </nx-tab>
            <nx-tab label="Nested Second">
              <ng-template nxTabContent>
                <p>Nested second tab content</p>
              </ng-template>
            </nx-tab>
          </nx-tab-group>
        </ng-template>
      </nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class NestedTabGroups extends TabsTest {}

@Component({
  selector: 'test-preselected-tabs',
  template: `
    <nx-tab-group [(selectedIndex)]="selectedIndex">
      <nx-tab label="First label">First</nx-tab>
      <nx-tab label="Second label">Second</nx-tab>
      <nx-tab label="Third label">Third</nx-tab>
    </nx-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTabsModule],
})
class PreselectedTabs extends TabsTest {
  selectedIndex = 1;
}
