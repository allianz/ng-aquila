import { OverlayContainer, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule, JsonPipe, LowerCasePipe } from '@angular/common';
import { Component, Directive, ElementRef, Inject, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { fakeScrollStrategyFunction } from '@aposin/ng-aquila/utils';
import { Observable, of } from 'rxjs';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxInputModule } from '../input';
import { NX_AUTOCOMPLETE_SCROLL_STRATEGY, NxAutocompleteComponent, NxAutocompleteTriggerDirective } from '.';
import { NxAutocompleteModule } from './autocomplete.module';

describe('NxAutocompleteComponent:', () => {
    let fixture: ComponentFixture<AutocompleteComponent>;
    let testInstance: AutocompleteComponent;
    let input: HTMLInputElement;
    let overlayContainer: OverlayContainer;
    let triggerInstance: NxAutocompleteTriggerDirective;

    function createTestComponent(component: Type<AutocompleteComponent>, isShadow?: boolean) {
        fixture = TestBed.createComponent(component);
        fixture.autoDetectChanges();
        testInstance = fixture.componentInstance;
        input = isShadow ? fixture.nativeElement.shadowRoot.querySelector('input') : fixture.nativeElement.querySelector('input');
        triggerInstance = fixture.componentInstance.autocompleteTrigger;
    }

    function flush() {
        tick();
        fixture.detectChanges();
    }

    function typeInput(value: string) {
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }

    function getAutocompletePanel(): HTMLElement {
        return overlayContainer.getContainerElement().querySelector('.nx-autocomplete-panel') as HTMLElement;
    }

    function getAutocompleteItems(): NodeListOf<HTMLElement> {
        return getAutocompletePanel().querySelectorAll('.nx-autocomplete-option');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                OverlayModule,
                NxAutocompleteModule,
                NxInputModule,
                FormsModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                NxModalModule.forRoot(),
                BasicAutocompleteComponent,
                LongContentComponent,
                ShadowAutoCompleteComponent,
                CustomAutocompleteComponent,
                ComplexDataAutocompleteComponent,
                NgModelBindingAutocompleteComponent,
                ReactiveAutocompleteComponent,
                AutocompleteInModalComponent,
                AutocompleteComponentWithDirection,
            ],
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
        })();
    }));

    it('should open the overlay when typing into the input field', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        typeInput('A');
        flush();
        expect(isVisible(getAutocompletePanel())).toBeTruthy();
    }));

    it('should open the overlay when typing into the shadow input field', fakeAsync(() => {
        createTestComponent(ShadowAutoCompleteComponent, true);
        typeInput('A');
        flush();
        expect(isVisible(getAutocompletePanel())).toBeTruthy();
    }));

    it('should open the overlay when focus the shadow input field', fakeAsync(() => {
        createTestComponent(ShadowAutoCompleteComponent, true);
        input.focus();
        flush();

        expect(getAutocompletePanel()).toBeTruthy();
    }));

    it('should close the overlay', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        input.dispatchEvent(new Event('focus'));
        typeInput('A');
        flush();

        expect(isVisible(getAutocompletePanel())).toBeTruthy();

        getAutocompleteItems().item(1).click();
        flush();

        expect(getAutocompletePanel()).toBeFalsy();
    }));

    it('should not focus item when mousedown', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        input.dispatchEvent(new Event('focus'));
        typeInput('A');
        flush();
        const event = new MouseEvent('mousedown', { bubbles: true });

        const item = getAutocompleteItems().item(1) as any;
        spyOn(item, 'focus');

        item.dispatchEvent(event);
        flush();

        expect(item.focus).not.toHaveBeenCalled();
    }));

    it('should close the overlay when clicking outside', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        input.dispatchEvent(new Event('focus'));
        typeInput('A');
        flush();

        document.dispatchEvent(new Event('mouseup'));
        flush();

        expect(getAutocompletePanel()).toBeFalsy();
    }));

    it('should not open the overlay when no result is found', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        typeInput('X');
        flush();
        expect(isVisible(getAutocompletePanel())).toBeFalsy();
    }));

    it('should not open the overlay when disabled', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        testInstance.autocompleteDisabled = true;
        flush();
        typeInput('A');
        flush();
        const panel = getAutocompletePanel();
        expect(panel).toBeFalsy();
    }));

    it('should render default items correctly', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        typeInput('A');
        flush();
        expect(getAutocompletePanel()).toBeTruthy();
        expect(getAutocompleteItems()).toHaveSize(2);
        expect(getAutocompleteItems().item(0).textContent!.trim()).toBe('A');
    }));

    it('should handle complex data correctly', fakeAsync(() => {
        createTestComponent(ComplexDataAutocompleteComponent);
        typeInput('A');
        flush();
        expect(getAutocompletePanel()).toBeTruthy();
        expect(getAutocompleteItems()).toHaveSize(2);
        expect(getAutocompleteItems().item(0).textContent!.trim()).toBe('a descr');
        expect(getAutocompleteItems().item(1).textContent!.trim()).toBe('aa descr');
        getAutocompleteItems().item(0).click();
        flush();
        expect(testInstance.inputVal).toBe(COMPLEX_DATA[0]);
        expect(input.value).toBe('A descr');
    }));

    it('should render custom items correctly', fakeAsync(() => {
        createTestComponent(CustomAutocompleteComponent);
        typeInput('A');
        flush();
        expect(getAutocompletePanel()).toBeTruthy();
        expect(getAutocompleteItems()).toHaveSize(2);
        expect(getAutocompleteItems().item(0).textContent!.trim()).toBe('a');
    }));

    it('should support binding by ngModel', done => {
        createTestComponent(NgModelBindingAutocompleteComponent);
        fixture
            .whenStable()
            .then(() => {
                typeInput('A');
                fixture
                    .whenStable()
                    .then(() => {
                        getAutocompleteItems().item(1).click();
                        const component = testInstance as NgModelBindingAutocompleteComponent;
                        expect(component.aValue).toBe('AA');
                        done();
                    })
                    .catch(done.fail);
            })
            .catch(done.fail);
    });

    it('should support reactive forms', done => {
        createTestComponent(ReactiveAutocompleteComponent);
        typeInput('A');
        fixture
            .whenStable()
            .then(() => {
                getAutocompleteItems().item(1).click();
                const component = testInstance as ReactiveAutocompleteComponent;
                expect(component.testForm.get('autocomplete')!.value).toBe('AA');
                done();
            })
            .catch(done.fail);
    });

    it('Should fit to content width', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        typeInput('A');
        flush();

        const contentWidth = fixture.elementRef.nativeElement.getBoundingClientRect().width;
        getAutocompleteItems().forEach(item => {
            expect(item.offsetWidth).toBeLessThan(contentWidth);
        });
    }));

    it('should not reopen a closed autocomplete when returning to a blurred tab', fakeAsync(() => {
        createTestComponent(BasicAutocompleteComponent);
        typeInput('A');
        flush();
        expect(isVisible(getAutocompletePanel())).toBeTruthy();

        // close the autocomplete by clicking outside
        document.dispatchEvent(new Event('mouseup'));
        flush();
        expect(getAutocompletePanel()).toBeFalsy();

        // Simulate the user going to a different tab.
        dispatchFakeEvent(window, 'blur');
        input.blur();
        fixture.detectChanges();

        // Simulate the user coming back.
        dispatchFakeEvent(window, 'focus');
        input.focus();
        fixture.detectChanges();
        // autocomplete should be closed
        expect(getAutocompletePanel()).toBeFalsy();
    }));

    it('Should close the overlay inside a modal when clicking outside', fakeAsync(() => {
        createTestComponent(AutocompleteInModalComponent);
        typeInput('A');
        flush();

        expect(getAutocompletePanel()).toBeTruthy();
        expect(getAutocompleteItems()).toHaveSize(2);

        document.dispatchEvent(new Event('mouseup'));
        flush();

        expect(getAutocompletePanel()).toBeFalsy();

        const openedModal = fixture.nativeElement.querySelector('#basicModal');

        // expect modal to be still open
        expect(openedModal).toBeTruthy();
    }));

    it('should be able to override the scroll strategy in parent injector', () => {
        TestBed.resetTestingModule()
            .configureTestingModule({
                imports: [ScrollStrategyOverrideComponent, NxAutocompleteModule, NxInputModule, NoopAnimationsModule],
                providers: [
                    {
                        provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY,
                        useFactory: () => fakeScrollStrategyFunction,
                    },
                ],
            })
            .compileComponents();
        createTestComponent(ScrollStrategyOverrideComponent);
        expect((testInstance as ScrollStrategyOverrideComponent).scrollStrategy).toBe(fakeScrollStrategyFunction);
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicAutocompleteComponent);
            typeInput('A');
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });

    describe('directionality of overlay', () => {
        it('should be set to ltr by default', fakeAsync(() => {
            createTestComponent(BasicAutocompleteComponent);
            typeInput('A');
            flush();
            const direction = (triggerInstance as any)._overlayRef.getDirection();
            expect(direction).toBe('ltr');
        }));

        it('should be set to rtl if container direction is rtl', fakeAsync(() => {
            createTestComponent(AutocompleteComponentWithDirection);
            typeInput('A');
            flush();
            const direction = (triggerInstance as any)._overlayRef.getDirection();
            expect(direction).toBe('rtl');
        }));
    });

    describe('when container direction changes', () => {
        it('overlay direction should be updated respectively', fakeAsync(() => {
            createTestComponent(AutocompleteComponentWithDirection);
            typeInput('A');
            flush();
            (testInstance as AutocompleteComponentWithDirection).direction = 'ltr';
            typeInput('A');
            flush();
            const direction = (triggerInstance as any)._overlayRef.getDirection();
            expect(direction).toBe('ltr');
        }));

        it('overlay position strategy should be updated', fakeAsync(() => {
            createTestComponent(AutocompleteComponentWithDirection);
            typeInput('A');
            flush();
            spyOn((triggerInstance as any)._overlayRef, 'updatePositionStrategy');
            (testInstance as AutocompleteComponentWithDirection).direction = 'ltr';
            typeInput('A');
            flush();
            expect((triggerInstance as any)._overlayRef.updatePositionStrategy).toHaveBeenCalledTimes(1);
        }));
    });

    describe('panelWidth and panelMaxWidth', () => {
        it('should have panel width longer than input trigger when panelGrow is true', fakeAsync(() => {
            createTestComponent(LongContentComponent);
            flush();
            typeInput('A');
            flush();

            const panel = getAutocompletePanel();
            const inputWidth = input.getBoundingClientRect().width;
            const panelWidth = panel.getBoundingClientRect().width;
            expect(panelWidth).toBeGreaterThan(inputWidth);
        }));

        it('should not have panel width longer than input trigger when panelGrow is false', fakeAsync(() => {
            createTestComponent(LongContentComponent);
            const component = testInstance as LongContentComponent;
            component.panelGrow = false;

            flush();
            typeInput('A');
            flush();

            const panel = getAutocompletePanel();
            const inputWidth = input.getBoundingClientRect().width;
            const panelWidth = panel.getBoundingClientRect().width;

            expect(panelWidth).toEqual(inputWidth);
        }));

        it('should not have panel width longer than maxPanelWidth when panelMaxWidth is set', fakeAsync(() => {
            createTestComponent(LongContentComponent);
            const component = testInstance as LongContentComponent;
            component.panelGrow = true;
            component.panelMaxWidth = 400;

            flush();
            typeInput('A');
            flush();

            const panel = getAutocompletePanel();
            const panelWidth = panel.getBoundingClientRect().width;

            expect(panelWidth).toBeLessThanOrEqual(400);
        }));
    });
});

const DATA = ['A', 'AA', 'B', 'C'];

const COMPLEX_DATA = [
    { id: 'A', desc: 'A descr' },
    { id: 'AA', desc: 'AA descr' },
    { id: 'C', desc: 'C descr' },
];

@Directive({ standalone: true })
class AutocompleteComponent {
    @ViewChild(NxAutocompleteComponent, { read: ElementRef }) autocompleteInstanceRef!: ElementRef;
    @ViewChild(NxAutocompleteComponent) autocompleteInstance!: NxAutocompleteComponent;
    @ViewChild(NxAutocompleteTriggerDirective) autocompleteTrigger!: NxAutocompleteTriggerDirective;

    inputVal: any;

    autocompleteDisabled = false;

    searchData(value: string): string[] {
        return DATA.filter(item => item.includes(value));
    }

    searchComplexData(value: string): any[] {
        return COMPLEX_DATA.filter(item => item.desc.includes(value));
    }

    searchFunction(value: string): Observable<any[]> {
        return of(DATA.filter(item => item.includes(value)));
    }
}

@Component({
    template: `
        <input
            type="text"
            [nxAutocomplete]="auto1"
            [nxAutocompleteItems]="searchFunction"
            [nxAutocompleteDisabled]="autocompleteDisabled"
            nxAutocompleteDebounce="0"
            aria-label="atcmpl"
        />
        <nx-autocomplete #auto1></nx-autocomplete>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class BasicAutocompleteComponent extends AutocompleteComponent {}

@Component({
    template: `
        <div style="width: 100px">
            <input type="text" [panelMaxWidth]="panelMaxWidth" [panelGrow]="panelGrow" [nxAutocomplete]="auto1" aria-label="atcmpl" />
        </div>
        <nx-autocomplete #auto1>
            <nx-autocomplete-option [value]="option"> A very long autocomplete option that exceeds the input width </nx-autocomplete-option>
        </nx-autocomplete>
    `,
    standalone: true,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class LongContentComponent extends AutocompleteComponent {
    panelGrow = true;
    panelMaxWidth: number | null = null;
}

@Component({
    template: `
        <input
            type="text"
            [nxAutocomplete]="auto1"
            [nxAutocompleteItems]="searchFunction"
            [nxAutocompleteDisabled]="autocompleteDisabled"
            nxAutocompleteDebounce="0"
            aria-label="atcmpl"
        />
        <nx-autocomplete #auto1></nx-autocomplete>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class ScrollStrategyOverrideComponent extends AutocompleteComponent {
    constructor(@Inject(NX_AUTOCOMPLETE_SCROLL_STRATEGY) readonly scrollStrategy: () => ScrollStrategy) {
        super();
    }
}

@Component({
    template: `
        <input type="text" [nxAutocomplete]="auto1" [(ngModel)]="inputVal" />
        <nx-autocomplete #auto1>
            @for (item of searchData(inputVal); track item) {
                <nx-autocomplete-option [value]="item">
                    {{ item | lowercase }}
                </nx-autocomplete-option>
            }
        </nx-autocomplete>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule, LowerCasePipe],
})
class CustomAutocompleteComponent extends AutocompleteComponent {}

@Component({
    template: `
        <input type="text" [nxAutocomplete]="auto1" [(ngModel)]="inputVal" />
        <nx-autocomplete #auto1 [valueFormatter]="valFormatter">
            @for (item of searchComplexData(inputVal); track item) {
                <nx-autocomplete-option [value]="item">
                    {{ item.desc | lowercase }}
                </nx-autocomplete-option>
            }
        </nx-autocomplete>
        {{ inputVal | json }}
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule, JsonPipe, LowerCasePipe],
})
class ComplexDataAutocompleteComponent extends AutocompleteComponent {
    valFormatter = (val: any) => (val ? val.desc : null);
}

@Component({
    template: `
        <nx-formfield>
            <input nxInput type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" nxAutocompleteDebounce="0" [(ngModel)]="aValue" />
            <nx-autocomplete #auto1></nx-autocomplete>
        </nx-formfield>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class NgModelBindingAutocompleteComponent extends AutocompleteComponent {
    aValue: any;
}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-formfield>
                <input nxInput type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" formControlName="autocomplete" />
                <nx-autocomplete #auto1></nx-autocomplete>
                <div class="c-notification c-notification--error" nxFormfieldError>
                    <div class="c-notification__content"></div>
                </div>
                <div class="c-notification c-notification--info" nxFormfieldNote>
                    <div class="c-notification__content"></div>
                </div>
            </nx-formfield>
        </form>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class ReactiveAutocompleteComponent extends AutocompleteComponent {
    testForm = new FormBuilder().group({
        autocomplete: new FormControl(
            {
                value: '',
                disabled: false,
            },
            {
                validators: Validators.required,
            },
        ),
    });
}

@Component({
    template: `
        <ng-template #basicModalBody>
            <input type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" nxAutocompleteDebounce="0" aria-label="atcmpl" />
            <nx-autocomplete #auto1></nx-autocomplete>
        </ng-template>

        @if (open) {
            <nx-modal #basicModal id="basicModal" [modalBody]="basicModalBody"> </nx-modal>
        }
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule, NxModalModule],
})
class AutocompleteInModalComponent extends AutocompleteComponent {
    open = true;
}

@Component({
    template: `
        <div [dir]="direction">
            <input
                type="text"
                [nxAutocomplete]="auto1"
                [nxAutocompleteItems]="searchFunction"
                [nxAutocompleteDisabled]="autocompleteDisabled"
                nxAutocompleteDebounce="0"
                aria-label="atcmpl"
            />
            <nx-autocomplete #auto1></nx-autocomplete>
        </div>
    `,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class AutocompleteComponentWithDirection extends AutocompleteComponent {
    direction = 'rtl';
}
@Component({
    template: `
        <input type="text" #animalInput [nxAutocomplete]="auto1" (input)="filter(animalInput.value)" />
        <nx-autocomplete #auto1="nxAutocomplete">
            @for (option of filteredOptions; track option) {
                <nx-autocomplete-option [value]="option">
                    {{ option }}
                </nx-autocomplete-option>
            }
        </nx-autocomplete>
    `,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [OverlayModule, NxAutocompleteModule, NxInputModule, FormsModule, ReactiveFormsModule],
})
class ShadowAutoCompleteComponent extends AutocompleteComponent {
    options = ['Abacus', 'Bell', 'Chipmunk'];
    filteredOptions = this.options.slice();

    filter(value: any) {
        this.filteredOptions = this.options.filter(s => new RegExp(value, 'gi').test(s));
    }
}

function isVisible(el: any) {
    if (getComputedStyle(el).visibility === 'hidden') {
        return false;
    }
    return el.offsetWidth > 0 || el.offsetHeight > 0;
}
