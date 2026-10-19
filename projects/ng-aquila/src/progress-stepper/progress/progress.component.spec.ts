import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxProgressStepperDirective } from '../progress-stepper.component';
import { NxProgressStepperModule } from '../progress-stepper.module';
import { NxProgressStepperIntl } from '../progress-stepper-intl';
import { NxProgressStepperComponent } from './progress.component';

@Directive({ standalone: true })
abstract class ProgressTest {
  @ViewChild(NxProgressStepperDirective)
  componentInstance!: NxProgressStepperDirective;
  @ViewChild(NxProgressStepperDirective, { read: ElementRef })
  componentInstanceRef!: ElementRef;
  progress = 1;
}

describe('NxProgressStepperComponent', () => {
  let fixture: ComponentFixture<ProgressTest>;
  let testInstance: ProgressTest;
  let componentInstance: NxProgressStepperDirective;
  let componentInstanceRef: ElementRef;
  let progressInstance: NxProgressStepperComponent;

  function createTestComponent(component: Type<ProgressTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.componentInstance;
    componentInstanceRef = testInstance.componentInstanceRef;
    progressInstance = fixture.debugElement.query(By.css('nx-progress-stepper')).componentInstance;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxProgressStepperModule, ProgressBasicTest, ProgressBindingTest, ProgressClampTest],
    }).compileComponents();
  }));

  it('should create the component', fakeAsync(() => {
    createTestComponent(ProgressBasicTest);
    expect(progressInstance).toBeTruthy();
  }));

  it('should set the progress to 0', fakeAsync(() => {
    createTestComponent(ProgressBasicTest);
    expect(progressInstance.progress).toBe(0);
  }));

  it('should bind the progress', fakeAsync(() => {
    createTestComponent(ProgressBindingTest);
    expect(progressInstance.progress).toBe(0.33);
  }));

  it('should clamp the progress between 0 and 1', fakeAsync(() => {
    createTestComponent(ProgressClampTest);
    expect(progressInstance.progress).toBe(1);
    testInstance.progress = -1;
    fixture.detectChanges();
    expect(progressInstance.progress).toBe(0);
  }));

  it('prefixes the step labels with a visually-hidden state', () => {
    createTestComponent(ProgressBasicTest);
    const prefixes = () =>
      Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll('.nx-subprogress__label .nx-visually-hidden'),
      ).map((prefix) => prefix.textContent);
    expect(prefixes()).toEqual(['Current: ', 'Not completed: ']);

    componentInstance.next();
    fixture.detectChanges();

    expect(prefixes()).toEqual(['Completed: ', 'Current: ']);
  });

  it('reads the state prefixes from a provided NxProgressStepperIntl', () => {
    TestBed.overrideProvider(NxProgressStepperIntl, {
      useValue: {
        completedLabel: signal('Abgeschlossen: '),
        currentLabel: signal('Aktuell: '),
        notCompletedLabel: signal('Nicht abgeschlossen: '),
      },
    });
    createTestComponent(ProgressBasicTest);

    const prefix = fixture.nativeElement.querySelector(
      '.nx-subprogress__label .nx-visually-hidden',
    );
    expect(prefix.textContent).toBe('Aktuell: ');
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(ProgressBasicTest);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-progress-basic-test',
  template: `
    <nx-progress-stepper>
      <nx-step label="Step 1"> step 1 content </nx-step>
      <nx-step label="Step 2"> step 2 content </nx-step> </nx-progress-stepper
    >>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressStepperModule],
})
class ProgressBasicTest extends ProgressTest {}

@Component({
  selector: 'test-progress-binding-test',
  template: `
    <nx-progress-stepper progress="0.33">
      <nx-step label="Step 1"> step 1 content </nx-step>
      <nx-step label="Step 2"> step 2 content </nx-step>
    </nx-progress-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressStepperModule],
})
class ProgressBindingTest extends ProgressTest {}
@Component({
  selector: 'test-progress-clamp-test',
  template: `
    <nx-progress-stepper [progress]="progress">
      <nx-step label="Step 1"> step 1 content </nx-step>
      <nx-step label="Step 2"> step 2 content </nx-step>
    </nx-progress-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressStepperModule],
})
class ProgressClampTest extends ProgressTest {}
