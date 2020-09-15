import { NxInputDirective, NxInputModule } from '@aposin/ng-aquila/input';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ElementRef, QueryList, Type, ViewChild, ViewChildren, Directive } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, async } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import * as axe from 'axe-core';

import { NxNaturalLanguageFormComponent } from './natural-language-form.component';
import { NxNaturalLanguageFormModule } from './natural-language-form.module';
import { NxWordComponent } from './word.component';

@Directive()
abstract class NaturalLanguageFormTest {
  public size: string = 'regular';
  public value: string;

  @ViewChild(NxNaturalLanguageFormComponent) formInstance: NxNaturalLanguageFormComponent;
  @ViewChild(NxNaturalLanguageFormComponent,  { read: ElementRef }) formInstanceNative: ElementRef;
  @ViewChild(NgControl) control: NgControl;
  @ViewChildren(NxInputDirective) inputs: QueryList<NxInputDirective>;
  @ViewChildren(NxWordComponent, {read: ElementRef}) words: QueryList<ElementRef>;
}

describe('NxNaturalLanguageFormComponent', () => {
  let fixture: ComponentFixture<NaturalLanguageFormTest>;
  let testInstance: NaturalLanguageFormTest;
  let formInstance: NxNaturalLanguageFormComponent;
  let overlayContainer: OverlayContainer;

  function createTestComponent(component: Type<NaturalLanguageFormTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    formInstance = testInstance.formInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          NxNaturalLanguageFormModule,
          FormsModule,
          ReactiveFormsModule,
          NxInputModule
      ],
      declarations: [
        NaturalLanguageFormBasicComponent,
        NaturalLanguageFormErrorComponent,
        NaturalLanguageFormSizesComponent,
        NaturalLanguageFormSmallComponent,
        FormWithPreviousFormfieldComponent
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    // Since we're resetting the testing module in some of the tests,
    // we can potentially have multiple overlay containers.
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic natural language form', () => {

    it(
      'should create the component',
      fakeAsync(() => {
        createTestComponent(NaturalLanguageFormBasicComponent);
        expect(formInstance).toBeTruthy();
      })
    );

    it('should show an error in a popover', fakeAsync(() => {
        createTestComponent(NaturalLanguageFormBasicComponent);
        const formControl = testInstance.inputs.first.ngControl.control as FormControl;
        formControl.markAsTouched();

        fixture.detectChanges();
        tick();

        const popover: HTMLElement = overlayContainer.getContainerElement();
        expect(popover.innerText.trim()).toBe('This field is required.');
      })
    );

    it('should dispose overlay container for word popover upon destroy', fakeAsync(() => {
      createTestComponent(NaturalLanguageFormBasicComponent);
      const formControl = testInstance.inputs.first.ngControl.control as FormControl;
      formControl.markAsTouched();

      fixture.detectChanges();
      tick();

      const popover: HTMLElement = overlayContainer.getContainerElement();
      expect(popover.innerText.trim()).toBe('This field is required.');

      fixture.destroy();

      expect(overlayContainer.getContainerElement().childElementCount).toBe(0);
      expect(overlayContainer.getContainerElement().textContent).toBe('');
    })
  );

    it('should update the positions of error popovers when everything is stable', fakeAsync(() => {
      // on submit, a nx-error pops up for the formfield on top of the nlf.
      // this needs additional space and the error-popover should reposition itself.
      createTestComponent(FormWithPreviousFormfieldComponent);

      // get position of popover after touch
      (testInstance as FormWithPreviousFormfieldComponent).nlfInput.markAsTouched();
      fixture.detectChanges();
      tick();
      const popover: HTMLElement = overlayContainer.getContainerElement().querySelector('.nx-popover__content');
      const yAfterTouch = popover.getBoundingClientRect().y;

      // get position of popover after submit
      const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;
      button.click();
      fixture.detectChanges();
      tick();
      const yAfterSubmit = popover.getBoundingClientRect().y;
      const errorDiv = fixture.debugElement.nativeElement.querySelector('nx-error');

      expect(popover.innerText.trim()).toBe('This word is required!');
      // use lessThan because margin is not included in height of errorDiv
      expect(yAfterTouch + errorDiv.getBoundingClientRect().height).toBeLessThan(yAfterSubmit);
    }));
  });

  describe('with errors', () => {

    it('should throw an error if a word has no input', fakeAsync(() => {
      expect(() => {
        createTestComponent(NaturalLanguageFormErrorComponent);
      }).toThrowError('NxWordComponent requires an NxFormfieldControl compatible input.');
    })
  );
  });

  describe('sizing', () => {

    it('words should apply different sizes', fakeAsync(() => {
      let word: ElementRef;

      createTestComponent(NaturalLanguageFormSizesComponent);

      testInstance.size = 'long';
      fixture.detectChanges();
      tick();

      word = testInstance.words.first;
      expect(word.nativeElement.classList.contains('size-long')).toBe(true);

      testInstance.size = 'short';
      fixture.detectChanges();
      tick();

      expect(word.nativeElement.classList.contains('size-short')).toBe(true);
      })
    );

    it('should grow and shrink words with input', fakeAsync(() => {
        let word: ElementRef;

        createTestComponent(NaturalLanguageFormSizesComponent);

        fixture.detectChanges();
        tick();

        word = testInstance.words.first;
        const dimensionA = (<HTMLElement>word.nativeElement).getBoundingClientRect();

        // let's test if it's growing
        testInstance.value = 'lorem ipsum dolar sit amet';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const dimensionB = (<HTMLElement>word.nativeElement).getBoundingClientRect();
        expect(dimensionB.width).toBeGreaterThan(dimensionA.width);

        // should shrink too
        testInstance.value = '';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const dimensionC = (<HTMLElement>word.nativeElement).getBoundingClientRect();
        expect(dimensionC.width).toBeCloseTo(dimensionA.width);
      })
    );

    it('never grow larger than the container', fakeAsync(() => {
      let word: ElementRef;

      createTestComponent(NaturalLanguageFormSizesComponent);
      testInstance.value = 'lorem ipsum dolar sit amet lorem  ipsum dolar sit amet';

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      word = testInstance.words.first;
      const dimensionWord = (<HTMLElement>word.nativeElement).getBoundingClientRect();
      const dimensionForm = (<HTMLElement>testInstance.formInstanceNative.nativeElement).getBoundingClientRect();

      expect(dimensionWord.width).toBeLessThanOrEqual(dimensionForm.width);
    }));
  });

  describe('a11y', () => {

    it('has no accessbility violations', done => {
      createTestComponent(NaturalLanguageFormBasicComponent);
      fixture.detectChanges();

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(
          item => item
        );

        expect(violationMessages.length).toBe(0);
        done();
      });
    });

    it('assigns given nxLabel to the control via aria-label', fakeAsync(() => {
      createTestComponent(NaturalLanguageFormBasicComponent);
      fixture.detectChanges();
      tick();

      const input = testInstance.inputs.first.elementRef.nativeElement;
      expect(input.attributes.getNamedItem('aria-label').value).toBe('Label for the form');
    }));
  });

  describe('NLF Sizes', () => {

    it('NLF should apply the change of size', () => {
      createTestComponent(NaturalLanguageFormSmallComponent);
      const nlfElement = <HTMLButtonElement>fixture.nativeElement.querySelector('nx-natural-language-form');

      expect(testInstance.formInstance.size).toBe('small');
      expect(nlfElement.classList).toContain('nx-natural-language-form--small');

      testInstance.formInstance.size = 'large';
      fixture.detectChanges();

      expect(testInstance.formInstance.size).toBe('large');
      expect(nlfElement.classList.contains('nx-natural-language-form--large')).toBe(true);
    });
  });
});

@Component({
  template: `
    <nx-natural-language-form>
      A Word
      <nx-word nxLabel='Label for the form'>
        <input nxInput ngModel required />
        <div nxError>This field is required.</div>
      </nx-word>
      with copy.
    </nx-natural-language-form>
  `
})
class NaturalLanguageFormBasicComponent extends NaturalLanguageFormTest {}

@Component({
  template: `
    <nx-natural-language-form>
      <nx-word></nx-word>
    </nx-natural-language-form>
  `
})
class NaturalLanguageFormErrorComponent extends NaturalLanguageFormTest {}

@Component({
  template: `
    <nx-natural-language-form [ngStyle]="{'width':'500px'}">
      <nx-word [nxSize]="size">
        <input nxInput [(ngModel)]="value" required />
      </nx-word>
    </nx-natural-language-form>
  `
})
class NaturalLanguageFormSizesComponent extends NaturalLanguageFormTest {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nx-natural-language-form size="small">
      <nx-word>
        <input nxInput [(ngModel)]="value" required />
      </nx-word>
    </nx-natural-language-form>
  `
})
class NaturalLanguageFormSmallComponent extends NaturalLanguageFormTest {}

@Component({
  template: `
    <form [formGroup]="form">
      <nx-formfield [nxLabel]="'some label'">
        <input nxInput [formControl]='input'/>
        <nx-error nxFormfieldError>
          This field is required!
        </nx-error>
      </nx-formfield>
      <nx-natural-language-form>
        <span>text text text text text text text text</span>
        <nx-word nxSize='short' nxLabel='Always a label'>
          <input nxInput [formControl]='nlfInput'/>
          <div nxError>This word is required!</div>
        </nx-word>
      </nx-natural-language-form>
      <button type="submit">submit</button>
    </form>
  `
})
class FormWithPreviousFormfieldComponent extends NaturalLanguageFormTest {
  input = new FormControl(null, Validators.required);
  nlfInput = new FormControl(null, Validators.required);
  form = new FormGroup({
    input: this.input,
    nlfInput: this.nlfInput
  });
}
