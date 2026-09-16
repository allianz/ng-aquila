import { ChangeDetectionStrategy, Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxSingleProgressIndicatorComponent } from './single-progress-indicator.component';
import { NxSingleProgressIndicatorIntl } from './single-progress-indicator.intl';

describe('NxSingleProgressIndicatorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let indicatorElement: DebugElement;

  function createTestComponent(template: string) {
    TestBed.overrideComponent(TestComponent, { set: { template } });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    indicatorElement = fixture.debugElement.query(By.css('nx-single-progress-indicator'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxSingleProgressIndicatorComponent, TestComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    expect(indicatorElement).toBeTruthy();
  });

  it('forwards value/min/max/colorScheme to the underlying nx-progressbar', () => {
    createTestComponent(`
      <nx-single-progress-indicator
        [value]="2"
        [min]="1"
        [max]="5"
        colorScheme="positive"
      ></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-valuenow')).toBe('2');
    expect(progressbar.getAttribute('aria-valuemin')).toBe('1');
    expect(progressbar.getAttribute('aria-valuemax')).toBe('5');
    expect(progressbar.classList.contains('positive')).toBe(true);
  });

  it('forwards transparentBackground to the underlying nx-progressbar', () => {
    createTestComponent(`
      <nx-single-progress-indicator
        [value]="1"
        [max]="4"
        transparentBackground
      ></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.classList.contains('transparent-background')).toBe(true);
  });

  it('renders a default "Step X of Y" label when nothing is projected', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Step 1 of 4');
  });

  it('renders projected content instead of the default label', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4">Billing Address</nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Billing Address');
  });

  it('hides the default label when the projected content has no text, e.g. an icon', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"><span class="icon"></span></nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('');
  });

  it('builds the default label from a provided NxSingleProgressIndicatorIntl', () => {
    TestBed.overrideProvider(NxSingleProgressIndicatorIntl, {
      useValue: {
        label: signal(
          (currentStep: number, totalSteps: number) => `${totalSteps} adımdan ${currentStep}.`,
        ),
      },
    });
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('4 adımdan 1.');
  });

  it('hides the end label unless labelEnd is set', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    expect(indicatorElement.query(By.css('.nx-single-progress-indicator__label-end'))).toBeFalsy();
  });

  it('shows the end label once labelEnd is set', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4" labelEnd="End"></nx-single-progress-indicator>
    `);
    const labelEnd = indicatorElement.query(By.css('.nx-single-progress-indicator__label-end'));
    expect(labelEnd.nativeElement.textContent.trim()).toBe('End');
  });

  it('points the progressbar at the visible label by default', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.id).toBeTruthy();
  });

  it('does not include labelEnd in the progressbar aria-labelledby', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4" labelEnd="End"></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('lets ariaLabelledBy override the default label association', () => {
    createTestComponent(`
      <h2 id="heading">Order process</h2>
      <nx-single-progress-indicator
        ariaLabelledBy="heading"
        [value]="1"
        [max]="4"
      ></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-labelledby')).toBe('heading');
  });

  it('does not set aria-label on the progressbar when ariaLabel is unset', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4"></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.hasAttribute('aria-label')).toBe(false);
  });

  it('forwards a custom ariaLabel to the progressbar and lets it win over aria-labelledby', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4" ariaLabel="Order process"></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-label')).toBe('Order process');
    expect(progressbar.hasAttribute('aria-labelledby')).toBe(false);
  });

  it('lets an explicit ariaLabelledBy win over ariaLabel when both are set', () => {
    createTestComponent(`
      <h2 id="heading">Order process</h2>
      <nx-single-progress-indicator
        ariaLabelledBy="heading"
        ariaLabel="Ignored"
        [value]="1"
        [max]="4"
      ></nx-single-progress-indicator>
    `);
    const progressbar = indicatorElement.query(By.css('nx-progressbar'))
      .nativeElement as HTMLElement;
    expect(progressbar.getAttribute('aria-labelledby')).toBe('heading');
  });

  it("accounts for min in the default label, matching the bar's fill fraction", () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="3" [min]="2" [max]="6"></nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Step 1 of 4');
  });

  it('updates the default label when value/max change after the first render', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="value" [max]="max"></nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Step 1 of 4');

    fixture.componentInstance.value = 2;
    fixture.detectChanges();
    expect(label.nativeElement.textContent.trim()).toBe('Step 2 of 4');
  });

  it('switches from the default label to projected content added after the first render', () => {
    createTestComponent(`
      <nx-single-progress-indicator [value]="1" [max]="4">{{ projected }}</nx-single-progress-indicator>
    `);
    const label = indicatorElement.query(By.css('.nx-single-progress-indicator__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Step 1 of 4');

    fixture.componentInstance.projected = 'Billing Address';
    fixture.detectChanges();
    expect(label.nativeElement.textContent.trim()).toBe('Billing Address');

    fixture.componentInstance.projected = '';
    fixture.detectChanges();
    expect(label.nativeElement.textContent.trim()).toBe('Step 1 of 4');
  });
});

@Component({
  template: '',
  imports: [NxSingleProgressIndicatorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class TestComponent {
  value = 1;
  max = 4;
  projected = '';
}
