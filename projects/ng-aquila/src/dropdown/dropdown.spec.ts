import { B, D, DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW, V } from '@angular/cdk/keycodes';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxFormfieldComponent, NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { createFakeEvent, dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxDropdownComponent } from './dropdown';
import { NxDropdownModule } from './dropdown.module';
import { NxDropdownItemComponent } from './item/dropdown-item';

describe('NxDropdownComponent', () => {
    let fixture: ComponentFixture<DropdownTest>;
    let testInstance: DropdownTest;
    let dropdownInstance: NxDropdownComponent;
    let overlayContainer: OverlayContainer;
    let trigger: HTMLDivElement;
    let renderedResult: HTMLDivElement;
    let dropdownElement: HTMLElement;

    /**
     * Configures the test module for NxDropdown with the given declarations. This is broken out so
     * that we're only compiling the necessary test components for each test in order to speed up
     * overall test time.
     * @param declarations Components to declare for this block.
     */
    function configureNxDropdownTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [CommonModule, OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
            declarations,
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
        })();
    }

    function createTestComponent(component: Type<DropdownTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        dropdownInstance = testInstance.dropdown;
        trigger = fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLDivElement;
        renderedResult = fixture.nativeElement.querySelector('.nx-dropdown__rendered') as HTMLDivElement;
        dropdownElement = fixture.debugElement.query(By.css('nx-dropdown')).nativeElement;
    }

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    function openDropdownByClick() {
        trigger.click();
        fixture.detectChanges();
        flush();
    }

    function openDropdownByKeyboard() {
        dispatchKeyboardEvent(dropdownElement, 'keydown', ENTER);
        fixture.detectChanges();
        flush();
    }

    function clickOnBackdrop() {
        getBackdrop().click();
        fixture.detectChanges();
        flush();
    }

    function getDropdown() {
        return overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel');
    }

    function getOverlayPane() {
        return overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane') as HTMLElement;
    }

    function getBackdrop() {
        return overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLDivElement;
    }

    function getDropdownItems(): NodeListOf<Element> {
        return overlayContainer.getContainerElement().querySelectorAll('.nx-dropdown-results__option-label');
    }

    function getVisibleItems(): NodeListOf<Element> {
        return overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item:not(.nx-hidden)');
    }

    function getMultiselectCheckboxesElements(): HTMLElement[] {
        return Array.from(overlayContainer.getContainerElement().querySelectorAll('.nx-checkbox'));
    }

    function getMultiselectCheckboxes(): HTMLInputElement[] {
        return Array.from(overlayContainer.getContainerElement().querySelectorAll('.nx-checkbox__input')).map(item => item as HTMLInputElement);
    }

    function getMultiselectCheckboxeStates(): boolean[] {
        return getMultiselectCheckboxes().map(input => input.checked);
    }

    function getFilterInput(): HTMLInputElement {
        return overlayContainer.getContainerElement().querySelector('.nx-dropdown__filter-input') as HTMLInputElement;
    }

    function clickOnItem(index: number) {
        const items: NodeListOf<Element> = getDropdownItems();
        (items.item(index) as HTMLDivElement).click();
        fixture.detectChanges();
        flush();
    }

    function getNotificationInfo(): HTMLElement {
        return fixture.nativeElement.querySelector('.c-notification--info');
    }

    function getNotificationError(): HTMLElement {
        return fixture.nativeElement.querySelector('.c-notification--error');
    }

    function getDropdownGroups(): NodeListOf<Element> {
        return overlayContainer.getContainerElement().querySelectorAll('.nx-dropdown-results__group');
    }

    function expectDropdownOpen() {
        expect(getDropdown()).toBeTruthy();
    }

    function expectDropdownClose() {
        expect(getDropdown()).toBeFalsy();
    }

    function expectItemsHighlighted(highlightedIndexes: number[]) {
        let check = true;

        testInstance.dropdownItems.forEach((item: { active: any }, itemIndex: number) => {
            if (highlightedIndexes.includes(itemIndex) && !item.active) {
                check = false;
            }
            if (!highlightedIndexes.includes(itemIndex) && item.active) {
                check = false;
            }
        });
        expect(check).toBeTrue();
    }

    function expectItemsHighlightedOnFilter(activeItem: Element) {
        let check = true;
        const activeItems = testInstance.dropdownItems.filter((item: { active: any }) => item.active);

        // don't allow more than one active item
        if (activeItems.length > 1) {
            check = false;
        }

        // the active item in the view and internally should be the same
        if (activeItem.textContent!.trim() !== activeItems[0].viewValue) {
            check = false;
        }

        expect(check).toBeTrue();
    }

    describe('basic dropdown', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([
                SimpleDropdownComponent,
                DynamicDropdownComponent,
                CustomClosedLabelComponent,
                ReactiveDropdownUpdateOnBlurComponent,
            ]);
        }));

        it('should open the dropdown by click and close it by click on the backdrop', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            expectDropdownOpen();
            clickOnBackdrop();
            expectDropdownClose();
        }));

        it('should add a class to the form field', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            fixture.detectChanges();
            tick();
            const formField = fixture.debugElement.query(By.css('.nx-formfield')).nativeElement;
            expect(formField).toHaveClass('nx-formfield--type-nx-dropdown');
        }));

        it('should not float label', () => {
            createTestComponent(SimpleDropdownComponent);
            expect(dropdownInstance.shouldLabelFloat).toBeFalse();
        });

        it('should float label on focus', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            const hostElement: HTMLElement = fixture.nativeElement.querySelector('nx-dropdown');
            hostElement.focus();
            fixture.detectChanges();
            tick();
            flush();
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();
        }));

        it('should restore focus to the host element', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            clickOnBackdrop();
            const dropdown = fixture.debugElement.nativeElement.querySelector('nx-dropdown');
            expect(document.activeElement).withContext('Expected host element to be focused.').toBe(dropdown);
        }));

        it('should float label on opening overlay', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();
        }));

        it('should use formfield label as the overlay label', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            const overlayLabel = overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel-header');
            expect(overlayLabel!.textContent!.trim()).toBe('Car brand');
        }));

        it('should be possible to override the overlay label', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            (testInstance as SimpleDropdownComponent).overlayLabel = 'My custom label';
            fixture.detectChanges();
            tick();
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            const overlayLabel = overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel-header');
            expect(overlayLabel!.textContent!.trim()).toBe('My custom label');
        }));

        it('should show the correct label for truthy and falsy values', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            testInstance.items = [{ value: '0' }, { value: '1' }, { value: 'true' }, { value: 'false' }];
            fixture.detectChanges();
            openDropdownByClick();
            clickOnItem(0);
            fixture.detectChanges();
            flush();
            expect(renderedResult.textContent).toBe('0');
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();

            openDropdownByClick();
            clickOnItem(1);
            expect(renderedResult.textContent).toBe('1');
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();

            openDropdownByClick();
            clickOnItem(2);
            expect(renderedResult.textContent).toBe('true');
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();

            openDropdownByClick();
            clickOnItem(3);
            expect(renderedResult.textContent).toBe('false');
            expect(dropdownInstance.shouldLabelFloat).toBeTrue();
        }));

        it('should create when the items are built in a ngFor loop', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            flush();
            fixture.detectChanges();
            tick();
            expect(testInstance).toBeTruthy();
            expect(renderedResult.textContent).toBe('BMW');
        }));

        it('should not render checkboxes in singleselect mode in the dropdown', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();
            expect(getMultiselectCheckboxesElements()).toHaveSize(0);
        }));

        it('should not throw if triggerValue accessed with no selected value', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            fixture.detectChanges();
            tick();
            expect(() => fixture.componentInstance.dropdown.triggerValue).not.toThrow();
        }));

        it('should display the custom element as dropdown label', fakeAsync(() => {
            createTestComponent(CustomClosedLabelComponent);
            flush();
            fixture.detectChanges();
            flush();
            const customElement = renderedResult.querySelector('i');
            expect(customElement).toBeTruthy();
            expect(customElement!.textContent).toBe('BMW');
        }));

        it('should display the correct trigger value with nxValue options', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            testInstance.items = [
                { value: 'BMW', label: undefined },
                { value: 'Audi', label: undefined },
            ];
            fixture.detectChanges();
            openDropdownByClick();
            clickOnItem(1);
            expect(fixture.componentInstance.dropdown.triggerValue).toBe('Audi');
            expect(renderedResult.textContent).toBe('Audi');
        }));

        it('should display the items in the dropdown correctly without content projection', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            testInstance.items = [
                { value: 'BMW', label: undefined },
                { value: 'Audi', label: undefined },
            ];
            fixture.detectChanges();
            openDropdownByClick();
            const items: NodeListOf<Element> = getDropdownItems();
            expect(items.item(0).textContent!.trim()).toBe('BMW');
            expect(items.item(1).textContent!.trim()).toBe('Audi');
        }));

        it('should update the trigger when the selected option label is changed', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            testInstance.items[0].label = 'BMW';
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(trigger.textContent!.trim()).toBe('BMW');

            testInstance.items[0].label = 'BayMoWerk';
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(trigger.textContent!.trim()).toBe('BayMoWerk');
        }));

        it('should go into error state when error state matcher is true', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            fixture.detectChanges();
            const spy = jasmine.createSpy();
            const stateChangesSubscription = dropdownInstance.stateChanges.subscribe(spy);
            // quick hack to replace the default matcher without any large
            // TestBed magic
            // eslint-disable-next-line @typescript-eslint/dot-notation
            (dropdownInstance['_errorStateMatcher'] as any) = { isErrorState: () => true }; // workaround: accessing private class member
            fixture.detectChanges();
            flush();
            expect(dropdownInstance.errorState).toBeTrue();
            expect(spy).toHaveBeenCalled();

            stateChangesSubscription.unsubscribe();
        }));

        it('should update the item label when projected content is deferred', fakeAsync(() => {
            // material uses the MutationObserverFactory that you can call the mutationCallbacks like
            // the _onLabelChange() callback from dropdown-item manually. Otherwise they are run too late
            // and you can't test it properly.

            TestBed.resetTestingModule()
                .configureTestingModule({
                    imports: [CommonModule, OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
                    declarations: [DeferredTestComponent],
                    providers: [
                        {
                            provide: MutationObserverFactory,
                            useValue: {
                                // Stub out the factory that creates mutation observers for the underlying directive
                                // to allows us to flush out the callbacks asynchronously.
                                create: (callback: () => void) => {
                                    mutationCallbacks.push(callback);

                                    return {
                                        observe: () => {},
                                        disconnect: () => {},
                                    };
                                },
                            },
                        },
                    ],
                })
                .compileComponents();

            inject([OverlayContainer], (oc: OverlayContainer) => {
                overlayContainer = oc;
            })();

            createTestComponent(DeferredTestComponent);

            trigger.click();
            fixture.detectChanges();
            let items: NodeListOf<Element> = getDropdownItems();
            expect(items.item(0).textContent!.trim()).toBe('value');
            tick(100);
            fixture.detectChanges();
            mutationCallbacks.forEach(callback => callback());
            // mutationCallback should have run the change detection of the dropdown item and this
            // needs to be reflected in the component template now
            fixture.detectChanges();
            items = getDropdownItems();
            expect(items.item(0).textContent!.trim()).toBe('deferred label');
        }));

        it('should display the items in the dropdown correctly for content projection', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();

            const items: NodeListOf<Element> = getDropdownItems();
            expect(items.item(0).textContent!.trim()).toBe('B');
            expect(items.item(1).textContent!.trim()).toBe('A');
            expect(items.item(2).textContent!.trim()).toBe('V');
            expect(items.item(3).textContent!.trim()).toBe('M');

            clickOnItem(2);

            flush();
            expect(fixture.componentInstance.dropdown.triggerValue).toBe('V');
            expect(renderedResult.textContent).toBe('V');
        }));

        it('should trigger valueChange if you select a new value', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);

            openDropdownByClick();

            let changed = false;
            dropdownInstance.valueChange.subscribe(() => {
                changed = true;
            });

            clickOnItem(0);
            expect(changed).toBeTruthy();

            // if you select the same value twice, there should no event be triggered
            changed = false;
            openDropdownByClick();
            clickOnItem(0);
            expect(changed).toBeFalsy();
        }));

        it('should trigger touched event on open and close the dropdown without selecting element', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            let touched = false;
            dropdownInstance.registerOnTouched(() => {
                touched = true;
            });
            openDropdownByClick();
            expect(touched).toBeFalsy();
            clickOnBackdrop();
            expect(touched).toBeTruthy();
        }));

        it('should trigger touched event on open and close the dropdown with selecting element', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            let touched = false;
            dropdownInstance.registerOnTouched(() => {
                touched = true;
            });
            openDropdownByClick();
            expect(touched).toBeFalsy();
            clickOnItem(0);
            expect(touched).toBeTruthy();
        }));

        it('should should select the value by clicking on a dropdown item and close the dropdown', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();

            const items: NodeListOf<Element> = getDropdownItems();
            (items.item(0) as HTMLDivElement).click();
            fixture.detectChanges();
            flush();

            expectDropdownClose();
            expect(dropdownInstance.value).toBe('BMW');
        }));

        it('overlay should have same min width as the formfield', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            const formfieldElement = fixture.debugElement.query(By.css('nx-formfield')).nativeElement;
            formfieldElement.style.width = '400px';
            openDropdownByClick();

            expect(getOverlayPane()!.style.minWidth).toBe('400px');
        }));

        it('should not set a min width when panelMinWidth is "none"', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            testInstance.panelMinWidth = 'none';
            fixture.detectChanges();
            openDropdownByClick();
            expect(getOverlayPane()!.style.minWidth).toBeFalsy();
        }));

        it('should not autofill monitor dropdown', () => {
            createTestComponent(SimpleDropdownComponent);
            const autofillTriggerEvent: any = createFakeEvent('animationstart');
            autofillTriggerEvent.animationName = 'cdk-text-field-autofill-start';
            // Dispatch an "animationstart" event on the input to trigger the
            // autofill monitor.
            dropdownElement.dispatchEvent(autofillTriggerEvent);
            expect(dropdownElement).not.toHaveClass('cdk-text-field-autofilled');
        });
    });

    describe('with placeholder', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DynamicDropdownComponent]);
        }));

        it('should show placeholder', () => {
            createTestComponent(DynamicDropdownComponent);
            expect(renderedResult.textContent).toBe('Choose a car');
        });

        it('should not show placeholder when item is selected', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            openDropdownByClick();
            clickOnItem(0);
            fixture.detectChanges();
            flush();
            expect(renderedResult.textContent).toBe('BMW');
        }));

        it('should show placeholder when selection is reset', fakeAsync(() => {
            createTestComponent(DynamicDropdownComponent);
            tick();
            expect(fixture.nativeElement.querySelector('.nx-dropdown__rendered')).not.toBe('Choose a car');
            testInstance.selected = '';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            expect(renderedResult.textContent).toBe('Choose a car');
        }));
    });

    describe('in form field with outline', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DropdownInOutlineFieldComponent]);
            createTestComponent(DropdownInOutlineFieldComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick(500);
            flush();
        }));

        it('should adapt to the outline style of the formfield', fakeAsync(() => {
            const dropdownOverlayDiv = getDropdown();
            expect(dropdownOverlayDiv).toHaveClass('nx-dropdown__panel--in-outline-field');
        }));
    });

    describe('overlay width with long option label', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([LongOptionLabelDropdownComponent]);
            createTestComponent(LongOptionLabelDropdownComponent);
            dropdownElement.style.width = '200px';
        }));

        it('should not use the whole viewport width by default', fakeAsync(() => {
            openDropdownByClick();
            fixture.detectChanges();
            flush();

            expect(getDropdown()!.clientWidth).toBe(453);
        }));

        it('should use the whole viewport width with _truncateItems', fakeAsync(() => {
            dropdownInstance.ignoreItemTruncation = true;
            openDropdownByClick();
            fixture.detectChanges();
            flush();

            expect(getDropdown()!.clientWidth).toBe(document.body.clientWidth - dropdownInstance._overlayViewportMargin);
        }));
    });

    describe('with scrolling', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([ScrollingTestComponent]);
        }));

        it('should scroll the selected item in the middle of the panel on dropdown opening', fakeAsync(() => {
            createTestComponent(ScrollingTestComponent);
            openDropdownByKeyboard();
            flush();
            fixture.detectChanges();
            tick(1);
            // 4 * 44 + 22 (half of item height) + 12 (firstItemPaddingTop) - 100 (middle of panel)
            expect(dropdownInstance.panelBody?.nativeElement.scrollTop).toBe(110);
        }));

        it('should scroll the selected item in the middle of the panel on dropdown change', fakeAsync(() => {
            createTestComponent(ScrollingTestComponent);
            trigger.click();
            tick(500);
            flush();
            fixture.detectChanges();
            tick(1);
            // 4 * 44 + 22 (half of item height) + 12 (firstItemPaddingTop) - 100 (middle of panel)
            expect(dropdownInstance.panelBody?.nativeElement.scrollTop).toBe(110);
        }));
    });

    describe('multiselect dropdown', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([
                MultiSelectDropdownComponent,
                MultiselectReactiveBinding,
                MultiSelectDropdownContentProjectionComponent,
                MultiSelectDropdownRenderFunctionComponent,
            ]);
        }));

        it('should render checkboxes in multiselect mode in the dropdown', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByClick();
            expect(getMultiselectCheckboxesElements()).toHaveSize(4);
        }));

        it('should not close the dropdown if a element is selected in multiselect', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByClick();
            clickOnItem(0);
            expect(getDropdown()).toBeTruthy();
        }));

        it('should not check the checkboxes in multiselect if nothing is selected', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByClick();
            getMultiselectCheckboxeStates().forEach(state => expect(state).toBeFalsy());
        }));

        it('should select and deselect the checkboxes correctly in multiselect', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByClick();

            clickOnItem(0);
            expect(getMultiselectCheckboxeStates()).toEqual([true, false, false, false]);

            clickOnItem(0);
            expect(getMultiselectCheckboxeStates()).toEqual([false, false, false, false]);
        }));

        it('should render the selected values correctly in multiselect for default rendering', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByClick();

            clickOnItem(0);
            clickOnItem(1);
            getBackdrop().click();
            flush();

            expect(fixture.componentInstance.dropdown.triggerValue).toBe('BMW, Audi');
            expect(renderedResult.textContent).toBe('BMW, Audi');
        }));

        it('should support binding in reactive forms for multiselect', fakeAsync(() => {
            createTestComponent(MultiselectReactiveBinding);
            openDropdownByClick();
            clickOnItem(3);
            expect((testInstance as MultiselectReactiveBinding).testForm.controls.dropdown.value).toEqual(['Audi']);
            clickOnItem(0);
            expect((testInstance as MultiselectReactiveBinding).testForm.controls.dropdown.value).toEqual(['BMW', 'Audi']);
        }));

        it('should render the selected values correctly in multiselect for content projection', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownContentProjectionComponent);
            openDropdownByClick();

            clickOnItem(0);
            clickOnItem(1);
            getBackdrop().click();
            flush();

            expect(fixture.componentInstance.dropdown.triggerValue).toBe('B, A');
            expect(renderedResult.textContent).toBe('B, A');
        }));

        it('should render the selected values correctly in multiselect for custom rendering', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownRenderFunctionComponent);
            openDropdownByClick();

            clickOnItem(0);
            clickOnItem(1);
            getBackdrop().click();
            flush();

            expect(fixture.componentInstance.dropdown.triggerValue).toBe('BMW, AUDI');
            expect(renderedResult.textContent).toBe('BMW, AUDI');
        }));
    });

    describe('filter dropdown', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([FilterDropdownComponent, CustomFilterDropdownComponent, FilterDropdownNoLabelComponent]);
        }));

        it('should handle filtering correctly', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            expectDropdownOpen();

            const filterInput = getFilterInput();
            expect(filterInput).toBeTruthy();

            let items: NodeListOf<Element> = getVisibleItems();
            expect(items).toHaveSize(5);

            filterInput.value = 'G';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();

            items = getVisibleItems();
            expect(items).toHaveSize(1);
            expect(items.item(0).textContent!.trim()).toBe('Germany');

            filterInput.value = '';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();

            items = getVisibleItems();
            expect(items).toHaveSize(5);
        }));

        it('should pass explicit label provided by user', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            spyOn(dropdownInstance, 'filterFn');
            openDropdownByClick();
            const filterInput = getFilterInput();
            filterInput.value = 'Ge';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            expect(dropdownInstance.filterFn).toHaveBeenCalledWith('Ge', 'Germany');
        }));

        it('should pass formatted value if no label is given', fakeAsync(() => {
            createTestComponent(FilterDropdownNoLabelComponent);
            spyOn(dropdownInstance, 'filterFn');
            openDropdownByClick();
            const filterInput = getFilterInput();
            filterInput.value = 'Ge';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            expect(dropdownInstance.filterFn).toHaveBeenCalledWith('Ge', 'DE');
        }));

        it('should focus filterInput after dropdown is opened', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();
            expect(document.activeElement).toBe(filterInput);
        }));

        it('should not throw when selected value is hidden by filter', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            clickOnItem(1);
            openDropdownByClick();

            const filterInput = getFilterInput();
            expect(() => {
                filterInput.value = 'G';
                dispatchFakeEvent(filterInput, 'input');
                fixture.detectChanges();
                flush();
            }).not.toThrow();
        }));

        it('should emit visible items on filter change', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const instance = testInstance as FilterDropdownComponent;
            spyOn(instance, 'filterResultChanged');
            const filterInput = getFilterInput();
            expect(document.activeElement).toBe(filterInput);
            filterInput.value = 'i';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            flush();
            const visibleItems = instance.dropdownItems.filter((item: { _hidden: any }) => !item._hidden);
            expect(visibleItems).toHaveSize(2);
            expect(instance.filterResultChanged).toHaveBeenCalledWith(visibleItems);
        }));

        it('should reset hidden states after dropdown is closed', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();
            filterInput.value = 'asdf';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            flush();
            let visibleItems = getVisibleItems();
            expect(visibleItems).toHaveSize(0);
            clickOnBackdrop();
            openDropdownByClick();
            visibleItems = getVisibleItems();
            expect(visibleItems.length).toBe(fixture.componentInstance.dropdownItems.length);
        }));

        it('should support custom filter functions', fakeAsync(() => {
            // custom function filters by start of string
            createTestComponent(CustomFilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();
            filterInput.value = 'MW';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            let visibleItems = getVisibleItems();
            expect(visibleItems).toHaveSize(0);
            filterInput.value = 'BM';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            visibleItems = getVisibleItems();
            flush();
            expect(visibleItems).toHaveSize(1);
            expect(visibleItems[0].textContent!.trim()).toBe('BMW');
        }));

        it('should set filter input type if filterInputType is present', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            dropdownInstance.filterInputType = 'tel';
            fixture.detectChanges();
            const filterInput = getFilterInput();

            expect(filterInput.getAttribute('type')).toBe('tel');
        }));

        it('should be text type by default for filter input', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();

            expect(filterInput.getAttribute('type')).toBe('text');
        }));

        it('should filter space', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();

            const dropdownOverlayDiv = getDropdown();
            const filterInput = getFilterInput();
            filterInput.value = ' ';
            // simulate the users keypress to see if the dropdown closes (it shouldn't)
            dispatchKeyboardEvent(filterInput, 'keydown', SPACE);
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            flush();
            tick(300);
            expectDropdownOpen();
            expect(getVisibleItems()).toHaveSize(1);
        }));

        it('should not move item focus on LEFT and RIGHT arrow keys', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();
            dispatchKeyboardEvent(getDropdown()!, 'keydown', RIGHT_ARROW);

            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', LEFT_ARROW);

            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            filterInput.value = 'E';
            dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            flush();
            tick(300);
            dispatchKeyboardEvent(getDropdown()!, 'keydown', RIGHT_ARROW);

            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', LEFT_ARROW);

            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);
        }));

        it('should not move item focus with HOME AND END keys', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByClick();
            const filterInput = getFilterInput();
            dispatchKeyboardEvent(getDropdown()!, 'keydown', HOME);
            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', END);
            // dispatchFakeEvent(filterInput, 'input');
            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            filterInput.value = 'E';
            dispatchFakeEvent(filterInput, 'input');
            dispatchKeyboardEvent(getDropdown()!, 'keydown', HOME);
            fixture.detectChanges();
            flush();
            tick(300);
            dispatchKeyboardEvent(getDropdown()!, 'keydown', HOME);
            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', END);
            fixture.detectChanges();
            flush();
            tick(300);
            expectItemsHighlighted([0]);
        }));
    });

    describe('group dropdown', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([GroupDropdownComponent]);
        }));

        it('should display dropdown groups correctly', fakeAsync(() => {
            createTestComponent(GroupDropdownComponent);
            openDropdownByClick();

            const dropdownGroups = getDropdownGroups();
            expect(dropdownGroups).toHaveSize(2);

            let groupLabel = dropdownGroups.item(0).querySelector('.nx-dropdown-results__group-label')!.textContent;
            expect(groupLabel).toBe('German');

            groupLabel = dropdownGroups.item(1).querySelector('.nx-dropdown-results__group-label')!.textContent;
            expect(groupLabel).toBe('Swedish');
        }));
    });

    describe('with value formatting', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DropdownCustomToTextFunctionComponent]);
        }));

        it('should apply a custom to text function', fakeAsync(() => {
            createTestComponent(DropdownCustomToTextFunctionComponent);
            openDropdownByClick();

            const items: NodeListOf<Element> = getDropdownItems();
            expect(items.item(0).textContent!.trim()).toBe('BMW');
            expect(items.item(1).textContent!.trim()).toBe('AUDI');
            expect(items.item(2).textContent!.trim()).toBe('VOLVO');
            expect(items.item(3).textContent!.trim()).toBe('MINI');
        }));
    });

    describe('with simple binding', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([SimpleBindingDropdownComponent, MultiSelectSimpleBinding]);
        }));

        it('should support simple value binding by nxValue', fakeAsync(() => {
            createTestComponent(SimpleBindingDropdownComponent);
            openDropdownByClick();
            expect(dropdownInstance.value).toBe('BMW');

            clickOnItem(3);
            expect(dropdownInstance.value).toBe('Mini');
        }));

        it('should set initial values with nxValue for multiselect', fakeAsync(() => {
            createTestComponent(MultiSelectSimpleBinding);
            flush();
            expect(testInstance.dropdownItems.toArray()[1].selected).toBeTrue();
            expect(testInstance.dropdownItems.toArray()[3].selected).toBeTrue();
        }));

        it('should support binding with nxValue for multiselect', fakeAsync(() => {
            createTestComponent(MultiSelectSimpleBinding);
            openDropdownByClick();
            clickOnItem(3);
            expect((testInstance as MultiSelectSimpleBinding).value).toEqual(['Audi']);
            clickOnItem(0);
            expect((testInstance as MultiSelectSimpleBinding).value).toEqual(['BMW', 'Audi']);
        }));

        it('should throw an error when value is no array for multiselect', fakeAsync(async () => {
            createTestComponent(MultiSelectSimpleBinding);
            (testInstance as MultiSelectSimpleBinding).value = 'string';
            fixture.detectChanges();

            return new Promise(() => flush()).catch((error: any) => {
                expect((error as any).rejection.message).toBe('Value must be an array in multiselect mode.');
            });
        }));
    });

    describe('with ngModel', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([MultiSelectTemplateBinding, PreselectedTestComponent]);
        }));

        it('should support binding with ngModel for multiselect', fakeAsync(() => {
            createTestComponent(MultiSelectTemplateBinding);
            openDropdownByClick();
            clickOnItem(3);
            expect((testInstance as MultiSelectTemplateBinding).value).toEqual(['Audi']);
            clickOnItem(0);
            expect((testInstance as MultiSelectTemplateBinding).value).toEqual(['BMW', 'Audi']);
        }));

        it('should set the correct class when a value is preselected', fakeAsync(() => {
            createTestComponent(PreselectedTestComponent);
            flush();
            fixture.detectChanges();
            tick();
            expect(dropdownElement).toHaveClass('is-filled');
        }));
    });

    describe('with reactive forms', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([ReactiveBindingDropdownComponent]);
        }));

        it('should set initial value with reactive forms', fakeAsync(() => {
            createTestComponent(ReactiveBindingDropdownComponent);
            tick();
            expect(testInstance.dropdownItems.toArray()[0].selected).toBeTrue();
        }));

        it('should support reactive forms binding', fakeAsync(() => {
            createTestComponent(ReactiveBindingDropdownComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            clickOnItem(3);
            expect((testInstance as ReactiveBindingDropdownComponent).testForm.controls.dropdown.value).toBe('Mini');
        }));
    });

    describe('with a disabled item', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DisabledItemDropdown, DisabledItemMultiDropdown, DropdownOnPush]);
        }));

        it('should correctly reflect disabled styles on disabled change in standard dropdown', fakeAsync(() => {
            createTestComponent(DisabledItemDropdown);
            openDropdownByClick();
            fixture.detectChanges();
            tick(300);

            const dropdownItem = overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item').item(0) as HTMLElement;
            expect(dropdownItem).toHaveClass('nx-dropdown-item--disabled');
            expect(dropdownItem.getAttribute('tabindex')).toBe('-1');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('true');

            (testInstance as DisabledItemDropdown).disabled = false;
            fixture.detectChanges();
            expect(dropdownItem).not.toHaveClass('nx-dropdown-item--disabled');
            expect(dropdownItem.getAttribute('tabindex')).toBe('0');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('false');
        }));

        it('should not select disabled items on click', fakeAsync(() => {
            createTestComponent(DisabledItemDropdown);
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            clickOnItem(0);
            fixture.detectChanges();

            expect(dropdownInstance.value).toBeUndefined();
        }));

        it('should correctly reflect disabled styles on disabled change in multi dropdown', fakeAsync(() => {
            createTestComponent(DisabledItemMultiDropdown);
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            const dropdownItem = overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item').item(0) as HTMLElement;
            const checkboxItem = overlayContainer.getContainerElement().querySelectorAll('.nx-checkbox').item(0) as HTMLElement;
            expect(dropdownItem).toHaveClass('nx-dropdown-item--disabled');
            expect(checkboxItem).toHaveClass('disabled');
            expect(dropdownItem.getAttribute('tabindex')).toBe('-1');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('true');

            (testInstance as DisabledItemMultiDropdown).disabled = false;
            fixture.detectChanges();
            expect(dropdownItem).not.toHaveClass('nx-dropdown-item--disabled');
            expect(checkboxItem).not.toHaveClass('disabled');

            expect(dropdownItem.getAttribute('tabindex')).toBe('0');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('false');
        }));

        it('should correctly reflect disabled styles on programmatic disabled change', fakeAsync(() => {
            createTestComponent(DropdownOnPush);
            openDropdownByClick();
            fixture.detectChanges();
            tick();

            const dropdownItem = overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item').item(0) as HTMLElement;
            expect(dropdownItem).not.toHaveClass('nx-dropdown-item--disabled');
            expect(dropdownItem.getAttribute('tabindex')).toBe('0');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('false');

            Array.from(dropdownInstance.dropdownItems)[0].disabled = true;
            fixture.detectChanges();
            expect(dropdownItem).toHaveClass('nx-dropdown-item--disabled');
            expect(dropdownItem.getAttribute('tabindex')).toBe('-1');
            expect(dropdownItem.getAttribute('aria-disabled')).toBe('true');
        }));
    });

    describe('with readonly state', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DropdownOnPush]);
        }));

        it('should correctly reflect readonly styles on programmatic setReadonly change', fakeAsync(() => {
            createTestComponent(DropdownOnPush);
            tick();

            dropdownInstance.setReadonly(true);
            fixture.detectChanges();
            expect(dropdownElement).toHaveClass('is-readonly');

            flush();

            dropdownInstance.setReadonly(false);
            fixture.detectChanges();
            expect(dropdownElement).not.toHaveClass('is-readonly');
        }));
    });

    describe('with formfield', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([FormFieldDropdownComponent]);
        }));

        it('should support formfield features', fakeAsync(() => {
            createTestComponent(FormFieldDropdownComponent);
            expect(getNotificationInfo()).toBeTruthy();
            openDropdownByClick();
            clickOnItem(0);
            flush();
            expect(getNotificationInfo()).toBeTruthy();
            expect(getNotificationError()).toBeFalsy();
        }));
    });

    describe('keyboard support', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([SimpleDropdownComponent, FilterDropdownComponent, MultiSelectDropdownComponent]);
        }));

        it('should auto select value, when dropdown is close + focused then typing keyboard', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);

            const hostElement: HTMLElement = fixture.nativeElement.querySelector('nx-dropdown');
            hostElement.focus();
            dispatchKeyboardEvent(hostElement, 'keydown', B);
            fixture.detectChanges();
            tick(500);
            flush();

            expectDropdownClose();
            expect(dropdownInstance.value).toBe('BMW');
        }));

        it('should close the dropdown on TAB if opened', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', TAB);
            fixture.detectChanges();
            flush();
            expectDropdownClose();
        }));

        it('should set aria-activedescendant based on the focused option', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick(300);
            const items = overlayContainer.getContainerElement().querySelectorAll('nx-dropdown-item');
            expect(dropdownInstance.panelBody?.nativeElement.getAttribute('aria-activedescendant')).toBe(items.item(0).id);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            tick(300);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            tick(300);

            expect(dropdownInstance.panelBody?.nativeElement.getAttribute('aria-activedescendant')).toBe(items.item(2).id);

            dispatchKeyboardEvent(getDropdown()!, 'keydown', UP_ARROW);
            fixture.detectChanges();
            tick(300);

            expect(dropdownInstance.panelBody?.nativeElement.getAttribute('aria-activedescendant')).toBe(items.item(1).id);
        }));

        it('should highlight options via UP/DOWN arrows', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByKeyboard();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            tick(300);
            flush();
            expectItemsHighlighted([1]);
        }));

        it('should not move over item array boundaries', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByKeyboard();
            fixture.detectChanges();
            tick(300);
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', UP_ARROW);
            fixture.detectChanges();
            tick(300);
            expectItemsHighlighted([0]);
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            tick(300);
            expectItemsHighlighted([1]);
        }));

        it('should select the highlighted value via ENTER key', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByKeyboard();
            fixture.detectChanges();
            tick(300);
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', ENTER);
            fixture.detectChanges();
            flush();
            expectDropdownClose();
            expect(dropdownInstance.value).toBe('Audi');
        }));

        it('should select the highlighted value via SPACE key', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByKeyboard();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', SPACE);
            fixture.detectChanges();
            flush();
            expectDropdownClose();
            expect(dropdownInstance.value).toBe('Audi');
        }));

        it('should highlight options via UP/DOWN arrows for filter select', fakeAsync(() => {
            createTestComponent(FilterDropdownComponent);
            openDropdownByKeyboard();
            tick(300);
            fixture.detectChanges();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            tick(300);
            fixture.detectChanges();
            expectItemsHighlighted([1]);

            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            tick(300);
            fixture.detectChanges();
            expectItemsHighlighted([2]);

            const filterInput = getFilterInput();
            filterInput.value = 'I';
            dispatchFakeEvent(filterInput, 'input');
            tick(300);
            fixture.detectChanges();

            const items = getVisibleItems();
            expect(items).toHaveSize(2);
            expect(items.item(0).textContent!.trim()).toBe('Ireland');
            expect(items[0]).toHaveClass('nx-dropdown-item--active');
            expectItemsHighlightedOnFilter(items.item(0));
        }));

        it('should open the dropdown via ENTER key', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByKeyboard();
            fixture.detectChanges();
            tick();
            expectDropdownOpen();
        }));

        it('should highlight the first item after opening when no value is selected', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByKeyboard();
            fixture.detectChanges();
            tick();
            expectDropdownOpen();
            expectItemsHighlighted([0]);
        }));

        it('should not close dropdown on keyboard selection for multi select', fakeAsync(() => {
            createTestComponent(MultiSelectDropdownComponent);
            openDropdownByKeyboard();
            tick(300);
            fixture.detectChanges();
            expectDropdownOpen();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', SPACE);
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', DOWN_ARROW);
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', SPACE);
            tick(300);
            expectDropdownOpen();
            expect(dropdownInstance.value).toEqual(['BMW', 'Audi']);
        }));

        it('should highlight value via KEYBOARD key', fakeAsync(() => {
            createTestComponent(SimpleDropdownComponent);
            openDropdownByKeyboard();
            const dropdownOverlayDiv = getDropdown();
            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', V);
            fixture.detectChanges();
            tick(500);
            flush();
            expectItemsHighlighted([2]);

            dispatchKeyboardEvent(dropdownOverlayDiv as Node, 'keydown', B);
            fixture.detectChanges();
            tick(500);
            flush();
            expectItemsHighlighted([0]);
        }));
    });

    describe('lazy', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([DropdownLazy]);
            createTestComponent(DropdownLazy);
            flush();
        }));

        it('renders options', fakeAsync(() => {
            openDropdownByClick();
            const options = getDropdownItems();
            expect(options).toHaveSize(3);
        }));

        it('renders labels', fakeAsync(() => {
            openDropdownByClick();
            const options = getDropdownItems();
            expect(options[0].textContent).toBe('one');
            expect(options[1].textContent).toBe('two');
            expect(options[2].textContent).toBe('three');
        }));

        it('selects option', fakeAsync(() => {
            openDropdownByClick();
            clickOnItem(1);
            expect(renderedResult.textContent).toBe('two');
        }));
    });

    describe('accessibility', () => {
        beforeEach(fakeAsync(() => {
            configureNxDropdownTestingModule([
                SimpleDropdownComponent,
                TabIndexTestComponent,
                PlainTabIndexTestComponent,
                DropdownCustomLabelComponent,
                ReactiveBindingDropdownComponent,
            ]);
        }));

        it('has no accessibility violations', async () => {
            createTestComponent(SimpleDropdownComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('sets aria-labelledby to label if formfiled label is set', () => {
            createTestComponent(SimpleDropdownComponent);

            const localDropdownElement = fixture.nativeElement.querySelector('nx-dropdown');
            const labelledby = localDropdownElement.attributes.getNamedItem('aria-labelledby').value.split(' ');
            expect(labelledby).toHaveSize(1);
            expect(labelledby[0]).toContain('nx-formfield-label-');
        });

        it('sets aria-labelledby to 1 id if formfiled label is not set', () => {
            createTestComponent(DropdownCustomLabelComponent);

            const localDropdownElement = fixture.nativeElement.querySelector('nx-dropdown');
            const labelledby = localDropdownElement.attributes.getNamedItem('aria-labelledby').value.split(' ');
            expect(labelledby).toHaveSize(1);
            expect(labelledby[0]).toContain('nx-dropdown-rendered-');
        });

        it('sets aria-invalid', () => {
            createTestComponent(ReactiveBindingDropdownComponent);
            testInstance.testForm.controls.dropdown.setValue('');
            testInstance.testForm.controls.dropdown.markAllAsTouched();
            fixture.detectChanges();

            const ariaInvalid = dropdownElement.getAttribute('aria-invalid');
            expect(ariaInvalid).toBe('true');
        });

        it('should set the tabindex of the select to 0 by default', fakeAsync(() => {
            createTestComponent(TabIndexTestComponent);
            expect(dropdownElement.getAttribute('tabindex')).toBe('0');
        }));

        it('should be able to override the tabindex', fakeAsync(() => {
            createTestComponent(TabIndexTestComponent);
            (fixture.componentInstance as TabIndexTestComponent).tabIndex = 3;
            fixture.detectChanges();

            expect(dropdownElement.getAttribute('tabindex')).toBe('3');
        }));

        it('should set the tabindex of the select to -1 if disabled', fakeAsync(() => {
            createTestComponent(TabIndexTestComponent);
            (fixture.componentInstance as TabIndexTestComponent).disabled = true;
            fixture.detectChanges();
            expect(dropdownElement.getAttribute('tabindex')).toBe('-1');

            (fixture.componentInstance as TabIndexTestComponent).disabled = false;
            fixture.detectChanges();
            expect(dropdownElement.getAttribute('tabindex')).toBe('0');
        }));

        it('should be able to set the tabindex via the native attribute', fakeAsync(() => {
            createTestComponent(PlainTabIndexTestComponent);
            flush();
            expect(dropdownElement.getAttribute('tabindex')).toBe('5');
        }));

        it('should not select item in a disabled dropdown', fakeAsync(() => {
            createTestComponent(TabIndexTestComponent);
            expect(dropdownInstance.disabled).toBeFalse();

            (fixture.componentInstance as TabIndexTestComponent).disabled = true;
            fixture.detectChanges();
            expect(dropdownInstance.disabled).toBeTrue();
            expect(dropdownInstance.value).toBeUndefined();

            const renderedElement = fixture.nativeElement.querySelector('.nx-dropdown__rendered');
            renderedElement.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(renderedElement, 'keydown', DOWN_ARROW);
            tick(500);
            fixture.detectChanges();
            flush();

            expect(dropdownInstance.value).toBeUndefined();
        }));

        it('should be able to jump to an item by typing', fakeAsync(() => {
            createTestComponent(DropdownCustomLabelComponent);
            openDropdownByClick();
            fixture.detectChanges();
            tick();
            expect(dropdownInstance.value).toBeUndefined();
            const panel = getDropdown();
            dispatchKeyboardEvent(panel as Node, 'keydown', D);
            tick(500);
            dispatchKeyboardEvent(panel as Node, 'keydown', ENTER);
            fixture.detectChanges();
            flush();
            expect(renderedResult.textContent).toBe('DE');
        }));
    });
});

interface DropdownTestItem {
    value: string;
    label?: string;
}

@Directive()
abstract class DropdownTest {
    @ViewChild(NxFormfieldComponent) formfield!: NxFormfieldComponent;
    @ViewChild(NxDropdownComponent) dropdown!: NxDropdownComponent;
    @ViewChildren(NxDropdownItemComponent) dropdownItems!: {
        forEach(arg0: (item: any, itemIndex: any) => void): void;
        filter(arg0: { (item: any): any; (item: any): boolean }): any;
        length: jasmine.Expected<number>;
        toArray(): { selected: any }[];
    };

    items: DropdownTestItem[] = [{ value: 'BMW' }, { value: 'Audi' }, { value: 'Volvo' }, { value: 'Mini' }];
    label = '';
    multiselect = false;
    showFilter = false;
    selected: any = 'BMW';
    placeholder = 'Choose a car';
    testForm!: UntypedFormGroup;
    panelMinWidth = 'trigger';
}

@Component({
    template: `<nx-formfield label="Car brand">
        <nx-dropdown [overlayLabel]="overlayLabel">
            <nx-dropdown-item value="BMW">B</nx-dropdown-item>
            <nx-dropdown-item value="Audi">A</nx-dropdown-item>
            <nx-dropdown-item value="Volvo">V</nx-dropdown-item>
            <nx-dropdown-item value="Mini">M</nx-dropdown-item>
        </nx-dropdown>
    </nx-formfield>`,
})
class SimpleDropdownComponent extends DropdownTest {
    overlayLabel = '';
}

@Component({
    template: `<nx-formfield label="Car brand" appearance="outline">
        <nx-dropdown [placeholder]="placeholder">
            <nx-dropdown-item value="BMW">B</nx-dropdown-item>
        </nx-dropdown>
    </nx-formfield>`,
})
class DropdownInOutlineFieldComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [placeholder]="placeholder">
        <nx-dropdown-item value="Lorem ipsum">
            Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut
            labore et dolore magna aliqua.
        </nx-dropdown-item>
    </nx-dropdown>`,
})
class LongOptionLabelDropdownComponent extends DropdownTest {}

@Component({
    template: `
        <nx-dropdown [(ngModel)]="value" [placeholder]="placeholder">
            <ng-template nxClosedLabel
                ><i>{{ value }}</i></ng-template
            >
            <nx-dropdown-item *ngFor="let item of items" [value]="item.value">{{ item.label }}</nx-dropdown-item>
        </nx-dropdown>
    `,
})
class CustomClosedLabelComponent extends DropdownTest {
    value = 'BMW';
}

@Component({
    template: `<nx-dropdown [(ngModel)]="selected" [placeholder]="placeholder" [panelMinWidth]="panelMinWidth">
        <nx-dropdown-item *ngFor="let item of items" [value]="item.value">{{ item.label }}</nx-dropdown-item>
    </nx-dropdown>`,
})
class DynamicDropdownComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown [isMultiSelect]="true" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW"></nx-dropdown-item>
        <nx-dropdown-item value="Audi"></nx-dropdown-item>
        <nx-dropdown-item value="Volvo"></nx-dropdown-item>
        <nx-dropdown-item value="Mini"></nx-dropdown-item>
    </nx-dropdown>`,
})
class MultiSelectDropdownComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown [isMultiSelect]="true" [(value)]="value" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW"></nx-dropdown-item>
        <nx-dropdown-item value="Audi"></nx-dropdown-item>
        <nx-dropdown-item value="Volvo"></nx-dropdown-item>
        <nx-dropdown-item value="Mini"></nx-dropdown-item>
    </nx-dropdown>`,
})
class MultiSelectSimpleBinding extends DropdownTest {
    value: any = ['Audi', 'Mini'];
}

@Component({
    template: `<nx-dropdown [isMultiSelect]="true" [(ngModel)]="value" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW"></nx-dropdown-item>
        <nx-dropdown-item value="Audi"></nx-dropdown-item>
        <nx-dropdown-item value="Volvo"></nx-dropdown-item>
        <nx-dropdown-item value="Mini"></nx-dropdown-item>
    </nx-dropdown>`,
})
class MultiSelectTemplateBinding extends DropdownTest {
    value: any = ['Audi', 'Mini'];
}

@Component({
    template: `<form [formGroup]="testForm">
        <nx-dropdown nxLabel="Car brand" formControlName="dropdown" [isMultiSelect]="true" [placeholder]="placeholder">
            <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
            <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
            <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
            <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
        </nx-dropdown>
    </form>`,
})
class MultiselectReactiveBinding extends DropdownTest {
    testForm = new FormBuilder().group({
        dropdown: [['Audi', 'Mini'], Validators.required],
    });
}

@Component({
    template: `<nx-dropdown [isMultiSelect]="true" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">B</nx-dropdown-item>
        <nx-dropdown-item value="Audi">A</nx-dropdown-item>
        <nx-dropdown-item value="Volvo">V</nx-dropdown-item>
        <nx-dropdown-item value="Mini">M</nx-dropdown-item>
    </nx-dropdown>`,
})
class MultiSelectDropdownContentProjectionComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown [isMultiSelect]="true" [valueFormatter]="toTextMulti" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW"></nx-dropdown-item>
        <nx-dropdown-item value="Audi"></nx-dropdown-item>
        <nx-dropdown-item value="Volvo"></nx-dropdown-item>
        <nx-dropdown-item value="Mini"></nx-dropdown-item>
    </nx-dropdown>`,
})
class MultiSelectDropdownRenderFunctionComponent extends DropdownTest {
    toTextMulti(value: { map(arg0: (item: any) => any): any[]; toUpperCase(): any }): any {
        if (value) {
            if (Array.isArray(value)) {
                return value.map(item => item.toUpperCase()).join(', ');
            }
            return value.toUpperCase();
        }
        return '';
    }
}
@Component({
    template: `<nx-dropdown nxLabel="Car brand" [valueFormatter]="toText" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW"></nx-dropdown-item>
        <nx-dropdown-item value="Audi"></nx-dropdown-item>
        <nx-dropdown-item value="Volvo"></nx-dropdown-item>
        <nx-dropdown-item value="Mini"></nx-dropdown-item>
    </nx-dropdown>`,
})
class DropdownCustomToTextFunctionComponent extends DropdownTest {
    toText(value: string): string {
        return value ? value.toUpperCase() : '';
    }
}

@Component({
    template: `<nx-dropdown showFilter="true" nxLabel="Car brand" [placeholder]="placeholder" (filterResult)="filterResultChanged($event)">
        <nx-dropdown-item value="DE">Germany</nx-dropdown-item>
        <nx-dropdown-item value="IRL">Ireland</nx-dropdown-item>
        <nx-dropdown-item value="SWE">Sweden</nx-dropdown-item>
        <nx-dropdown-item value="IT">Italy</nx-dropdown-item>
        <nx-dropdown-item value="NZ">New Zealand</nx-dropdown-item>
    </nx-dropdown>`,
})
class FilterDropdownComponent extends DropdownTest {
    filterResultChanged(event: any) {}
}

@Component({
    template: `<nx-dropdown showFilter="true" nxLabel="Car brand" [placeholder]="placeholder">
        <nx-dropdown-item value="DE"></nx-dropdown-item>
        <nx-dropdown-item value="IRL"></nx-dropdown-item>
        <nx-dropdown-item value="SWE"></nx-dropdown-item>
        <nx-dropdown-item value="IT"></nx-dropdown-item>
    </nx-dropdown>`,
})
class FilterDropdownNoLabelComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown showFilter="true" nxLabel="Car brand" [filterFn]="myFilter" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
        <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
        <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
    </nx-dropdown>`,
})
class CustomFilterDropdownComponent extends DropdownTest {
    myFilter(search: string, itemValue: { match(arg0: RegExp): null }) {
        return itemValue.match(new RegExp('^' + search)) !== null;
    }
}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [placeholder]="placeholder">
        <nx-dropdown-group label="German">
            <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        </nx-dropdown-group>
        <nx-dropdown-group label="Swedish">
            <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
        </nx-dropdown-group>
    </nx-dropdown>`,
})
class GroupDropdownComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [(value)]="theValue" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
        <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
        <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
    </nx-dropdown>`,
})
class SimpleBindingDropdownComponent extends DropdownTest {
    theValue = 'BMW';
}

@Component({
    template: `<form [formGroup]="testForm">
        <nx-dropdown nxLabel="Car brand" formControlName="dropdown" [placeholder]="placeholder">
            <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
            <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
            <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
            <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
        </nx-dropdown>
    </form>`,
})
class ReactiveBindingDropdownComponent extends DropdownTest {
    testForm = new FormBuilder().group({
        dropdown: ['BMW', Validators.required],
    });
}

@Component({
    template: `<form [formGroup]="testForm">
        <nx-dropdown nxLabel="Car brand" formControlName="dropdown">
            <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
            <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
            <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
            <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
        </nx-dropdown>
    </form>`,
})
class ReactiveDropdownUpdateOnBlurComponent extends DropdownTest {
    testForm = new UntypedFormBuilder().group({
        dropdown: new UntypedFormControl(undefined, {
            updateOn: 'blur',
        }),
    });
}

@Component({
    template: `<form [formGroup]="testForm">
        <nx-formfield label="Car brand">
            <nx-dropdown nxLabel="Car brand" formControlName="dropdown" [placeholder]="placeholder">
                <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
                <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
                <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
                <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
            </nx-dropdown>
            <div class="c-notification c-notification--error" nxFormfieldError>
                <div class="c-notification__content">
                    <p class="c-copy ">Please select a value</p>
                </div>
            </div>
            <div class="c-notification c-notification--info" nxFormfieldNote>
                <div class="c-notification__content">
                    <p class="c-copy ">This field is required</p>
                </div>
            </div>
        </nx-formfield>
    </form>`,
})
class FormFieldDropdownComponent extends DropdownTest {
    testForm = new FormBuilder().group({
        dropdown: [null, Validators.required],
    });
}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [(value)]="selectedValue" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
        <nx-dropdown-item value="Audi">Audi</nx-dropdown-item>
        <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
        <nx-dropdown-item value="Mini">Mini</nx-dropdown-item>
        <nx-dropdown-item value="Kia"></nx-dropdown-item>
        <nx-dropdown-item value="Opel"></nx-dropdown-item>
        <nx-dropdown-item value="Vw"></nx-dropdown-item>
        <nx-dropdown-item value="Ferrari"></nx-dropdown-item>
        <nx-dropdown-item value="Porsche"></nx-dropdown-item>
        <nx-dropdown-item value="Lada"></nx-dropdown-item>
    </nx-dropdown>`,
    styles: ['::ng-deep .nx-dropdown__panel-body {max-height: 200px!important;}', '* { box-sizing: border-box; }'],
})
class ScrollingTestComponent extends DropdownTest {
    selectedValue = 'Kia';
    possibleValues = ['BMW', 'Audi', 'Volvo', 'Mini', 'Kia', 'Opel', 'VW', 'Ferrari', 'Porsche', 'Lada'];
}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [(value)]="selectedValue" [tabIndex]="tabIndex" [disabled]="disabled" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
    </nx-dropdown>`,
})
class TabIndexTestComponent extends DropdownTest {
    tabIndex = 0;
    disabled = false;
}

@Component({
    template: `<nx-dropdown nxLabel="Car brand" [(value)]="selectedValue" tabindex="5" [placeholder]="placeholder">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
    </nx-dropdown>`,
})
class PlainTabIndexTestComponent extends DropdownTest {}

@Component({
    template: `<nx-dropdown [(ngModel)]="preselectedValue" [placeholder]="placeholder">
        <nx-dropdown-item value="monarch">a Monarch</nx-dropdown-item>
        <nx-dropdown-item value="dictator">a Dictator</nx-dropdown-item>
    </nx-dropdown>`,
})
class PreselectedTestComponent extends DropdownTest {
    preselectedValue = 'dictator';
}

const mutationCallbacks: (() => void)[] = [];

@Component({
    template: `<nx-dropdown nxLabel="Deferred" [placeholder]="placeholder">
        <nx-dropdown-item [value]="value">{{ asyncLabel | async }}</nx-dropdown-item>
    </nx-dropdown>`,
    providers: [
        {
            provide: MutationObserverFactory,
            useValue: {
                // Stub out the factory that creates mutation observers for the underlying directive
                // to allows us to flush out the callbacks asynchronously.
                create: (callback: () => void) => {
                    mutationCallbacks.push(callback);

                    return {
                        observe: () => {},
                        disconnect: () => {},
                    };
                },
            },
        },
    ],
})
class DeferredTestComponent extends DropdownTest {
    asyncLabel = of('deferred label').pipe(delay(100));
    // label: any = '';
    value = 'value';
}

@Component({
    template: `<nx-dropdown [(ngModel)]="customLabelDropdownValue" [placeholder]="placeholder">
        <ng-template nxClosedLabel>
            <span>{{ customLabelDropdownValue?.prefix }}</span>
        </ng-template>
        <nx-dropdown-item *ngFor="let item of countryList" [value]="item"> {{ item.prefix }} ({{ item.countryId }}) </nx-dropdown-item>
    </nx-dropdown>`,
})
class DropdownCustomLabelComponent extends DropdownTest {
    customLabelDropdownValue: any;

    countryList = [
        {
            prefix: 'USA',
            countryId: 'United States of America',
        },
        {
            prefix: 'DE',
            countryId: 'Germany',
        },
        {
            prefix: 'FR',
            countryId: 'France',
        },
    ];
}

@Component({
    template: `<nx-formfield>
        <nx-dropdown>
            <nx-dropdown-item [disabled]="disabled" value="test"><span>label</span></nx-dropdown-item>
        </nx-dropdown>
    </nx-formfield>`,
})
class DisabledItemDropdown extends DropdownTest {
    disabled = true;
}

@Component({
    template: `<nx-formfield>
        <nx-dropdown isMultiSelect="true">
            <nx-dropdown-item [disabled]="disabled" value="test"><span>label</span></nx-dropdown-item>
        </nx-dropdown>
    </nx-formfield>`,
})
class DisabledItemMultiDropdown extends DropdownTest {
    disabled = true;
}

@Component({
    template: `<nx-formfield>
        <nx-dropdown>
            <nx-dropdown-item value="test"><span>label</span></nx-dropdown-item>
        </nx-dropdown>
    </nx-formfield>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownOnPush extends DropdownTest {}

@Component({
    template: `<nx-formfield>
        <nx-dropdown [options]="options" [(ngModel)]="model" name="dropdown"></nx-dropdown>
    </nx-formfield>`,
})
class DropdownLazy extends DropdownTest {
    model: number | null = null;

    options = [
        {
            value: 1,
            label: 'one',
        },
        {
            value: 2,
            label: 'two',
        },
        {
            value: 3,
            label: 'three',
        },
    ];
}
