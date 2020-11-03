import { ViewChild, Directive } from '@angular/core';
import { ElementRef } from '@angular/core';

import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Component, Type } from '@angular/core';
import { NxAutocompleteModule } from './autocomplete.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import * as axe from 'axe-core';

import { NxAutocompleteComponent } from '.';
import { NxInputModule } from '../input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { dispatchFakeEvent } from '../cdk-test-utils';

describe('NxAutocompleteComponent:', () => {

  let fixture: ComponentFixture<AutocompleteComponent>;
  let testInstance: AutocompleteComponent;
  let input: HTMLInputElement;
  let overlayContainer: OverlayContainer;

  function createTestComponent(component: Type<AutocompleteComponent>) {
    fixture = TestBed.createComponent(component);
    fixture.autoDetectChanges();
    testInstance = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
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
    return getAutocompletePanel().querySelectorAll('.nx-autocomplete-option') as NodeListOf<HTMLElement>;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicAutocompleteComponent,
        CustomAutocompleteComponent,
        ComplexDataAutocompleteComponent,
        NgModelBindingAutocompleteComponent,
        ReactiveAutocompleteComponent,
        AutocompleteInModalComponent
      ],
      imports: [
        CommonModule,
        OverlayModule,
        NxAutocompleteModule,
        NxInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        NxModalModule.forRoot()
      ]
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
    expect(getAutocompleteItems().length).toBe(2);
    expect(getAutocompleteItems().item(0).textContent.trim()).toBe('A');
  }));

  it('should handle complex data correctly', fakeAsync(() => {
    createTestComponent(ComplexDataAutocompleteComponent);
    typeInput('A');
    flush();
    expect(getAutocompletePanel()).toBeTruthy();
    expect(getAutocompleteItems().length).toBe(2);
    expect(getAutocompleteItems().item(0).textContent.trim()).toBe('a descr');
    expect(getAutocompleteItems().item(1).textContent.trim()).toBe('aa descr');
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
    expect(getAutocompleteItems().length).toBe(2);
    expect(getAutocompleteItems().item(0).textContent.trim()).toBe('a');
  }));

  it('should support binding by ngModel', (done) => {
    createTestComponent(NgModelBindingAutocompleteComponent);
    fixture.whenStable().then(() => {
      typeInput('A');
      fixture.whenStable().then(() => {
        getAutocompleteItems().item(1).click();
        const component = testInstance as NgModelBindingAutocompleteComponent;
        expect(component.aValue).toBe('AA');
        done();
      });
    });
  });

  it('should support reactive forms', (done) => {
    createTestComponent(ReactiveAutocompleteComponent);
    typeInput('A');
    fixture.whenStable().then(() => {
      getAutocompleteItems().item(1).click();
      const component = testInstance as ReactiveAutocompleteComponent;
      expect(component.testForm.get('autocomplete').value).toBe('AA');
      done();
    });

  });

  it('Should fit to content width', fakeAsync(() => {
    createTestComponent(BasicAutocompleteComponent);
    typeInput('A');
    flush();
    getAutocompleteItems().forEach(item => {
      expect(item.offsetWidth < fixture.elementRef.nativeElement.getBoundingClientRect().width).toBe(true);
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
    expect(getAutocompleteItems().length).toBe(2);

    document.dispatchEvent(new Event('mouseup'));
    flush();

    expect(getAutocompletePanel()).toBeFalsy();

    const openedModal = fixture.nativeElement.querySelector('#basicModal');

    // expect modal to be still open
    expect(openedModal).toBeTruthy();
  }));

  describe('a11y', () => {

    it('has no accessibility violations', function (done) {
      createTestComponent(BasicAutocompleteComponent);
      typeInput('A');
      fixture.whenStable().then(() => {
        axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
          expect(results.violations.length).toBe(0);
          done();
        });
      });
    });
  });
});

const DATA = [
  'A',
  'AA',
  'B',
  'C'
];

const COMPLEX_DATA = [
  { id: 'A', desc: 'A descr' },
  { id: 'AA', desc: 'AA descr' },
  { id: 'C', desc: 'C descr' }
];

@Directive()
class AutocompleteComponent {
  @ViewChild(NxAutocompleteComponent, { read: ElementRef }) autocompleteInstanceRef: ElementRef;
  @ViewChild(NxAutocompleteComponent) autocompleteInstance: NxAutocompleteComponent;

  public inputVal: any;

  public autocompleteDisabled = false;

  searchData(value: string): string[] {
    return DATA.filter((item) => item.indexOf(value) >= 0);
  }

  searchComplexData(value: string): any[] {
    return COMPLEX_DATA.filter((item) => item.desc.indexOf(value) >= 0);
  }

  searchFunction(value: string): Observable<any[]> {
    return of(DATA.filter((item) => item.indexOf(value) >= 0));
  }
}

@Component({
  template: `
    <input type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" [nxAutocompleteDisabled]="autocompleteDisabled"
      nxAutocompleteDebounce="0" aria-label="atcmpl" />
    <nx-autocomplete #auto1></nx-autocomplete>
  `
})
class BasicAutocompleteComponent extends AutocompleteComponent {
}

@Component({
  template: `
    <input type="text" [nxAutocomplete]="auto1" [(ngModel)]="inputVal" />
    <nx-autocomplete #auto1>
      <nx-autocomplete-option *ngFor="let item of searchData(inputVal)" [value]="item">
        {{item | lowercase}}
      </nx-autocomplete-option>
    </nx-autocomplete>
  `
})
class CustomAutocompleteComponent extends AutocompleteComponent {
}

@Component({
  template: `
    <input type="text" [nxAutocomplete]="auto1" [(ngModel)]="inputVal" />
    <nx-autocomplete #auto1 [nxValueFormatter]="valFormatter">
      <nx-autocomplete-option *ngFor="let item of searchComplexData(inputVal)" [value]="item">
        {{item.desc | lowercase}}
      </nx-autocomplete-option>
    </nx-autocomplete>
    {{ inputVal | json}}
  `
})
class ComplexDataAutocompleteComponent extends AutocompleteComponent {
  valFormatter = (val: any) => val ? val.desc : null;
}

@Component({
  template: `
    <nx-formfield>
    <input nxInput type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" nxAutocompleteDebounce="0"
      [(ngModel)]="aValue" />
    <nx-autocomplete #auto1></nx-autocomplete>
    </nx-formfield>
  `
})
class NgModelBindingAutocompleteComponent extends AutocompleteComponent {
  aValue;
}

@Component({
  template: `
    <form [formGroup]="testForm">
      <nx-formfield>
        <input nxInput type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction" formControlName="autocomplete" />
        <nx-autocomplete #auto1></nx-autocomplete>
        <div class="c-notification c-notification--error" nxFormfieldError>
          <div class="c-notification__content">
          </div>
        </div>
        <div class="c-notification c-notification--info" nxFormfieldNote>
          <div class="c-notification__content">
          </div>
        </div>
      </nx-formfield>
    </form>
  `
})
class ReactiveAutocompleteComponent extends AutocompleteComponent {
  testForm = new FormBuilder().group({
    autocomplete: new FormControl(
      {
        value: null
      },
      {
        validators: Validators.required
      }
    )
  });
}

@Component({
  template: `
    <ng-template #basicModalBody>
        <input type="text" [nxAutocomplete]="auto1" [nxAutocompleteItems]="searchFunction"
               nxAutocompleteDebounce="0" aria-label="atcmpl" />
        <nx-autocomplete #auto1></nx-autocomplete>
    </ng-template>

    <nx-modal #basicModal id="basicModal"
              [nxBody]="basicModalBody"
              *ngIf="open">
    </nx-modal>
  `
})
class AutocompleteInModalComponent extends AutocompleteComponent {
  open = true;
}

function isVisible(el) {
  if (getComputedStyle(el).visibility === 'hidden') {
    return false;
  }
  return (el.offsetWidth > 0 || el.offsetHeight > 0);
}
