import { DOCUMENT } from '@angular/common';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  forwardRef,
  Inject,
  Input,
  QueryList,
  SkipSelf,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

// tslint:disable:use-input-property-decorator

// We need to reference steps in stepper and stepper in steps. To prevent circular depenedency errors
// Provide both components in a single file. Otherwise we would have to introduce interface/abstract classes
// shared between both implementations.

@Component({
  selector: 'nx-step',
  templateUrl: 'progress-stepper.component.html',
  exportAs: 'nxStep',
  providers: [{provide: ErrorStateMatcher, useExisting: NxStepComponent}],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxStepComponent extends CdkStep implements ErrorStateMatcher, OnDestroy {
  _destroyed: Subject<boolean> = new Subject();

  constructor(
      @Inject(forwardRef(() => NxProgressStepperDirective)) public stepper: NxProgressStepperDirective,
      @SkipSelf() private _errorStateMatcher: ErrorStateMatcher) {
    super(stepper);
  }

  set stepControl(value: any) {
    this._stepControl = value;

    // If a step control changes its state, the stepper needs to update.
    if (this._stepControl) {
      this._stepControl.statusChanges
        .pipe(
          takeUntil(this._destroyed),
          takeWhile(() => this._stepControl === value)
        )
        .subscribe(() => {
          this.stepper._stateChanged();
        });
    }
  }
  /** The top level abstract control of the step. */
  get stepControl() {
    return this._stepControl;
  }
  private _stepControl: any;

  set interacted(value: boolean) {
    this._interacted = value;

    if (this.stepper) {
      this.stepper._stateChanged();
    }
  }

  /** Whether the user has seen the expanded step content or not. */
  get interacted(): boolean {
    return this._interacted;
  }
  private _interacted: boolean = false;

  /** Custom error state matcher that checks for validity of the step form. */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);

    // Checks for the validity of a step form that is not submitted or touched,
    // e.g when the user directly clicks the "next" button or directly on the step
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }

  ngOnDestroy() {
    this._destroyed.next(true);
    this._destroyed.complete();
  }
}

/** @docs-private */
@Directive({
  selector: '[nxProgressStepper]',
  exportAs: 'nxProgressStepper',
})
export class NxProgressStepperDirective extends CdkStepper implements AfterContentInit {
  // Do not initialize with an empty QueryList or the hasNext() function produces
  // wrong results on init
  /** Full list of steps inside the stepper, including inside nested steppers */
  @ContentChildren(NxStepComponent, { descendants: true }) _steps: QueryList<NxStepComponent>;

    /** Steps that belong to the current stepper, excluding ones from nested steppers. */
    readonly steps: QueryList<NxStepComponent> = new QueryList<NxStepComponent>();

  _stepHeader: QueryList<null> = new QueryList();

  /** Sets the label on the left side showing the current step label. Used for mobile viewports. */
  @Input() currentStepLabel: string;

  /** Sets the title to be rendered above the progress bar.
   * @deletion-target 10.0.0
   * @deprecated Use `nx-label` instead */
  @Input() title: string;

  constructor(
    private _cdRef: ChangeDetectorRef,
    _dir: Directionality,
    _elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document?: any) {
      super(_dir, _cdRef, _elementRef, _document);
    }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._stateChanged();
      });

    // If a step control changes its state, the stepper needs to update.
    this.steps.filter(s => !!s.stepControl)
      .forEach(step => {
        step.stepControl.statusChanges
          .pipe(takeUntil(step._destroyed))
          .subscribe(() => {
            this._stateChanged();
          });
      });

    // we need to defer change detection that the nxStepperNext and NxStepperPrevious buttons
    // can run change detection again, because they are initialized before the stepper content
    Promise.resolve().then(() => {
      this._cdRef.detectChanges();
    });
  }

  /** @docs-private */
  get hasPrevious() {
    return (this.selectedIndex - 1) >= 0;
  }

  /** @docs-private */
  get hasNext() {
    return (this.selectedIndex + 1) < this.count;
  }

  /** @docs-private */
  get count() {
    return this.steps ? this.steps.length : 0;
  }

  /** @docs-private */
  get currentStep(): NxStepComponent | null {
    if (this.count === 0 || this.selectedIndex === -1 || !this.steps) {
      return null;
    }

    const steps = this.steps.toArray();
    return steps[this.selectedIndex];
  }

  /** @docs-private */
  get nextStep(): NxStepComponent | null {
    if (this.selectedIndex + 1 >= this.steps.length) {
      return null;
    }

    return this.steps.toArray()[this.selectedIndex + 1];
  }

  /** @docs-private */
  get currentLabel() {
    const step = this.currentStep;
    if (!step) {
      return '';
    }

    const label = step.stepLabel || step.label;

    return `${this.currentStepLabel} ${this.selectedIndex + 1}/${this.count}: ${label}`;
  }
}
