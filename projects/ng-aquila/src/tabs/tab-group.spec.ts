import { ChangeDetectionStrategy, Component, DebugElement, Directive, OnDestroy, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxAccordionDirective } from '@aposin/ng-aquila/accordion';
import { Subscription } from 'rxjs';

import { NxTabGroupComponent } from './tab-group';
import { TAB_GROUP_DEFAULT_OPTIONS, TabGroupDefaultOptions } from './tabs.models';
import { NxTabsModule } from './tabs.module';

declare let viewport: any;
const THROTTLE_TIME = 200;

const tabsDefaultOptions: TabGroupDefaultOptions = {
    appearance: 'expert',
};

@Directive()
abstract class TabsTest {
    @ViewChildren(NxAccordionDirective) accordion!: QueryList<NxAccordionDirective>;

    selectedIndex: any;
    autoselect: any;
    negative = false;
    customLabel = 'First label';
    showAccordion = true;
    appearance = 'expert';

    @ViewChild(NxTabGroupComponent) tabGroupInstance!: NxTabGroupComponent;
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

        const tabLabelElement = fixture.debugElement.query(By.css(`.nx-tab-header__item:nth-of-type(${expectedIndex + 1})`)).nativeElement;
        expect(tabLabelElement).toHaveClass('nx-tab-header__item--active');
    }

    describe('no preset options', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NxTabsModule, BrowserAnimationsModule],
                declarations: [
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
                expect(fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent).toMatch('First label');
                testInstance.customLabel = 'Cars';
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent).toMatch('Cars');
            });

            it('should accept a template with nxTabLabel directive', () => {
                createTestComponent(TemplateTabs);
                expect(fixture.nativeElement.querySelector('.nx-tab-header__item--active').textContent).toMatch('One');
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
            }));

            it('emit selectedTabChange event when tab is changed', fakeAsync(() => {
                createTestComponent(EventTabsTest);
                tick(THROTTLE_TIME);
                const eventTestInstance = testInstance as EventTabsTest;
                spyOn(eventTestInstance, 'tabChanged').and.callThrough();
                const tabLabel = fixture.debugElement.queryAll(By.css('.nx-tab-header__item'))[1];
                tabLabel.nativeElement.click();
                fixture.detectChanges();
                tick();
                expect(eventTestInstance.tabChanged).toHaveBeenCalledTimes(1);
                expect(eventTestInstance.tabChangeEvent.index).toBe(1);
            }));

            describe('autoselect', () => {
                it('should be turned on by default', () => {
                    createTestComponent(BasicTabs);
                    expect(tabGroupInstance.autoselect).toBeTrue();
                });
            });

            describe('negative', () => {
                it('should update negative on programmatic change', () => {
                    createTestComponent(OnPushTabs);
                    expect(tabGroupInstance.negative).toBeFalse();
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
                Array.from(tabItems).forEach(item => expect(item as HTMLElement).toHaveClass('is-disabled'));
            });

            it('should update disabled on programmatic change', () => {
                createTestComponent(OnPushTabs);
                expect(tabGroupInstance.disabled).toBeFalse();
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
                expect(tabGroupInstance.tabBodyChildren.toArray()[3].active).toBeTrue();
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
                expect(fixture.nativeElement.querySelector('.nx-tab__body--active').textContent).toMatch('Content 2');
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
                expect(fixture.nativeElement.querySelector('.nx-tab__body--active').textContent).toMatch('Content 2');
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
                expect(tabGroupInstance.tabBodyChildren.toArray()[2].active).toBeTrue();
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
                expect(tabGroupInstance.tabBodyChildren.toArray()[0].active).toBeTrue();
            }));

            it('should not fire `selectedTabChange` when the amount of tabs changes', fakeAsync(() => {
                createTestComponent(DynamicTabTest);
                tick(THROTTLE_TIME);
                const dynamicTest = fixture.componentInstance as DynamicTabTest;
                fixture.detectChanges();
                fixture.componentInstance.selectedIndex = 1;
                fixture.detectChanges();

                // Add a new tab at the beginning.
                spyOn(dynamicTest, 'handleSelection');
                dynamicTest.tabs.unshift({ label: 'New tab', content: 'at the start' });
                fixture.detectChanges();
                tick();
                fixture.detectChanges();

                expect(dynamicTest.handleSelection).not.toHaveBeenCalled();
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
            }));

            it('should switch to accordion on init', fakeAsync(() => {
                viewport.set('mobile');
                createTestComponent(BasicTabs);
                window.dispatchEvent(new Event('resize'));
                tick(THROTTLE_TIME);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('nx-accordion')).toBeTruthy();
            }));

            it('should not destroy components in body on switch', fakeAsync(() => {
                createTestComponent(CustomElementTest);
                spyOn((testInstance as CustomElementTest).customElement, 'ngOnDestroy');
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick(THROTTLE_TIME);
                expect((testInstance as CustomElementTest).customElement.ngOnDestroy).not.toHaveBeenCalled();
            }));

            it('should not destroy contents of ngTabContent on switch', fakeAsync(() => {
                createTestComponent(TemplateTabs);
                tick();
                const instance = testInstance as TemplateTabs;
                instance.selectedIndex = 1;
                fixture.detectChanges();
                tick();
                expect(instance.testComponents).toHaveSize(1);
                const element = instance.testComponents.toArray()[0];
                spyOn(element, 'ngOnDestroy');
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick(THROTTLE_TIME);
                expect(element.ngOnDestroy).not.toHaveBeenCalled();
            }));

            it('should not destroy nxTabLabel contents on switch', fakeAsync(() => {
                createTestComponent(CustomElementTest);
                tick();
                const instance = testInstance as CustomElementTest;
                expect(instance.customElementInHeader).toHaveSize(2);
                const elementInHeader = instance.customElementInHeader.toArray()[0];
                spyOn(elementInHeader, 'ngOnDestroy');
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick(THROTTLE_TIME);
                expect(elementInHeader.ngOnDestroy).not.toHaveBeenCalled();
            }));

            it('should mirror negative property on the accordion', fakeAsync(() => {
                createTestComponent(ConfigurableTabs);
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                testInstance.negative = true;
                tick(THROTTLE_TIME);
                fixture.detectChanges();
                expect(tabGroupInstance.accordion.negative).toBeTruthy();
            }));

            it('should mirror output events', fakeAsync(() => {
                // at the moment the (focusChanged) event is not supported in accordion
                // so we skip that one
                createTestComponent(DynamicTabTest);
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                tick(THROTTLE_TIME);
                fixture.detectChanges();
                spyOn(testInstance as DynamicTabTest, 'handleSelection');
                spyOn(testInstance as DynamicTabTest, 'onIndexChange');
                // click on 2nd tab
                fixture.nativeElement.querySelectorAll('nx-expansion-panel-header')[1].click();
                fixture.detectChanges();
                tick();
                expect((testInstance as DynamicTabTest).handleSelection).toHaveBeenCalled();
                expect((testInstance as DynamicTabTest).onIndexChange).toHaveBeenCalled();
            }));

            it('Should keep disabled tabs state in mobile', fakeAsync(() => {
                createTestComponent(DisabledTabs);
                (testInstance as DisabledTabs).singleDisabled = true;
                fixture.detectChanges();
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                tick(THROTTLE_TIME);
                fixture.detectChanges();
                const expansionPanelHeaders = fixture.nativeElement.querySelectorAll('nx-expansion-panel-header');
                expect(expansionPanelHeaders[0]).toHaveClass('is-disabled');
                expect(expansionPanelHeaders[1]).not.toHaveClass('is-disabled');
                (testInstance as DisabledTabs).disabled = true;
                fixture.detectChanges();
                tick();
                expect(expansionPanelHeaders[0]).toHaveClass('is-disabled');
                expect(expansionPanelHeaders[1]).toHaveClass('is-disabled');
            }));

            it('should only emit `_appearanceChange` when the change happens', fakeAsync(() => {
                createTestComponent(BasicTabs);
                const spy = jasmine.createSpy('appearence changed');
                const subscription: Subscription = tabGroupInstance._appearanceChange.subscribe(spy);
                // it shouldn't emit _appearenceChange on every single resize
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick();
                expect(spy).not.toHaveBeenCalled();
                spy.calls.reset();
                // it should emit _appearenceChange on resize to mobile
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick(THROTTLE_TIME);
                expect(spy).toHaveBeenCalled();
                spy.calls.reset();
                // it should emit _appearenceChange on resize to desktop
                viewport.set('desktop');
                window.dispatchEvent(new Event('resize'));
                fixture.detectChanges();
                tick(THROTTLE_TIME);
                expect(spy).toHaveBeenCalled();
                spy.calls.reset();
                subscription.unsubscribe();
            }));

            afterEach(() => {
                viewport.reset();
            });
        });

        describe('a11y', () => {
            it('has no accessibility violations', async () => {
                createTestComponent(BasicTabs);
                await expectAsync(fixture.nativeElement).toBeAccessible();
            });
        });
    });

    describe('default options injection token', () => {
        beforeEach(waitForAsync(() => {
            tabsDefaultOptions.appearance = 'expert';
            TestBed.configureTestingModule({
                imports: [NxTabsModule, BrowserAnimationsModule],
                declarations: [BasicTabs, ConfigurableTabs],
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

        it('changes appearance on injection token change', inject([TAB_GROUP_DEFAULT_OPTIONS], (defaultOptions: TabGroupDefaultOptions) => {
            createTestComponent(BasicTabs);
            testInstance.appearance = undefined!;
            fixture.detectChanges();
            expect(tabGroupInstance.appearance).toBe('expert');
            expect(tabGroupDebugElement.nativeElement).toHaveClass('is-expert');

            defaultOptions.appearance = 'default';
            fixture.detectChanges();
            expect(tabGroupInstance.appearance).toBe('default');
            expect(tabGroupDebugElement.nativeElement).not.toHaveClass('is-expert');
        }));
    });
});

@Component({
    template: `
        <nx-tab-group>
            <nx-tab label="First label">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class BasicTabs extends TabsTest {}

@Component({
    template: `
        <nx-tab-group>
            <nx-tab label="First label">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushTabs extends TabsTest {}

@Component({
    template: `
        <nx-tab-group [negative]="negative" [mobileAccordion]="showAccordion" [appearance]="appearance">
            <nx-tab [label]="customLabel">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class ConfigurableTabs extends TabsTest {}

@Component({
    template: `
        <nx-tab-group [(selectedIndex)]="selectedIndex">
            <nx-tab label="First label">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class BindingTabs extends TabsTest {
    selectedIndex: any;
}

@Component({
    template: `
        <nx-tab-group [(selectedIndex)]="selectedIndex" (selectedTabChange)="tabChanged($event)">
            <nx-tab label="First label">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class EventTabsTest extends TabsTest {
    selectedIndex: any;
    tabChangeEvent: any;

    tabChanged(event: Event) {
        this.tabChangeEvent = event;
    }
}

@Component({
    template: `
        <nx-tab-group
            [autoselect]="autoselect"
            [(selectedIndex)]="selectedIndex"
            (focusChange)="handleFocus($event)"
            (selectedIndexChange)="onIndexChange($event)"
            (selectedTabChange)="handleSelection($event)"
        >
            <nx-tab *ngFor="let tab of tabs" [label]="tab.label">
                {{ tab.content }}
            </nx-tab>
        </nx-tab-group>
    `,
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
})
class TestComponent implements OnDestroy {
    ngOnDestroy(): void {}
}

@Component({
    template: `
        <nx-tab-group [negative]="negative">
            <nx-tab>
                <ng-template nxTabLabel><my-test-component #customHeader></my-test-component>First label</ng-template>
                <my-test-component #customElement></my-test-component>
            </nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class CustomElementTest extends TabsTest {
    @ViewChild('customElement', { read: TestComponent }) customElement!: TestComponent;
    @ViewChildren(TestComponent) customElementInHeader!: QueryList<TestComponent>;
}

@Component({
    template: `
        <nx-tab-group [disabled]="disabled" [mobileAccordion]="showAccordion">
            <nx-tab disabled="singleDisabled" [label]="customLabel">First</nx-tab>
            <nx-tab label="Second label">Second</nx-tab>
        </nx-tab-group>
    `,
})
class DisabledTabs extends TabsTest {
    disabled = false;
    singleDisabled = false;
}

@Component({
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
})
class TemplateTabs extends TabsTest {
    selectedIndex = 0;
    @ViewChildren(TestComponent) testComponents!: QueryList<TestComponent>;
}
