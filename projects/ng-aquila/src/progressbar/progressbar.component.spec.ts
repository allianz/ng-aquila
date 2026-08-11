import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  ElementRef,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxProgressbarComponent } from './progressbar.component';
import { NxProgressbarModule } from './progressbar.module';

@Directive({ standalone: true })
abstract class ProgressBarTest {
  @ViewChild(NxProgressbarComponent) componentInstance!: NxProgressbarComponent;
  @ViewChild(NxProgressbarComponent, { read: ElementRef }) componentInstanceRef!: ElementRef;
}

describe('NxProgressbarComponent', () => {
  let fixture: ComponentFixture<ProgressBarTest>;
  let testInstance: ProgressBarTest;
  let componentInstance: NxProgressbarComponent;
  let componentInstanceRef: ElementRef;
  let barElement: DebugElement;

  function createTestComponent(component: Type<ProgressBarTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.componentInstance;
    componentInstanceRef = testInstance.componentInstanceRef;
    barElement = fixture.debugElement.query(By.css('nx-progressbar'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxProgressbarModule,
        FormsModule,
        ProgressBarBasicComponent,
        ProgressBarValueComponent,
      ],
    }).compileComponents();
  }));

  it('should create the component', fakeAsync(() => {
    createTestComponent(ProgressBarBasicComponent);
    expect(componentInstance).toBeTruthy();
  }));

  it('value should default to 0', fakeAsync(() => {
    createTestComponent(ProgressBarBasicComponent);
    expect(componentInstance.value()).toBe(0);

    expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('0');
    expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
    expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('1');
  }));

  it('value should reflect binding', fakeAsync(() => {
    createTestComponent(ProgressBarValueComponent);
    expect(componentInstance.value()).toBe(0.5);
    expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('0.5');
    expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
    expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('1');
  }));

  it('value should reflect custom range', fakeAsync(() => {
    createTestComponent(ProgressBarCustomRangeComponent);
    expect(componentInstance.value()).toBe(15);
    expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('15');
    expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('12');
    expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('33');
  }));

  it('has no accessibility violations', async () => {
    createTestComponent(ProgressBarBasicComponent);
    await expectAsync(fixture.nativeElement).toBeAccessible();
  });

  it('colorScheme should default to "default" and not set the positive class', fakeAsync(() => {
    createTestComponent(ProgressBarBasicComponent);
    expect(componentInstance.colorScheme()).toBe('default');
    expect(barElement.nativeElement.classList.contains('positive')).toBe(false);
  }));

  it('colorScheme "positive" should set the positive class', fakeAsync(() => {
    createTestComponent(ProgressBarPositiveComponent);
    expect(componentInstance.colorScheme()).toBe('positive');
    expect(barElement.nativeElement.classList.contains('positive')).toBe(true);
  }));

  it('transparentBackground should default to false and not set the transparent-background class', fakeAsync(() => {
    createTestComponent(ProgressBarBasicComponent);
    expect(componentInstance.transparentBackground()).toBe(false);
    expect(barElement.nativeElement.classList.contains('transparent-background')).toBe(false);
  }));

  it('transparentBackground should coerce the string attribute to true and set the transparent-background class', fakeAsync(() => {
    createTestComponent(ProgressBarTransparentComponent);
    expect(componentInstance.transparentBackground()).toBe(true);
    expect(barElement.nativeElement.classList.contains('transparent-background')).toBe(true);
  }));
});

@Component({
  template: `<nx-progressbar></nx-progressbar>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarBasicComponent extends ProgressBarTest {}

@Component({
  template: `<nx-progressbar value="0.5"></nx-progressbar>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarValueComponent extends ProgressBarTest {}
@Component({
  template: `<nx-progressbar value="15" min="12" max="33"></nx-progressbar>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarCustomRangeComponent extends ProgressBarTest {}

@Component({
  template: `<nx-progressbar value="0.5" colorScheme="positive"></nx-progressbar>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarPositiveComponent extends ProgressBarTest {}

@Component({
  template: `<nx-progressbar value="0.5" transparentBackground="true"></nx-progressbar>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarTransparentComponent extends ProgressBarTest {}
