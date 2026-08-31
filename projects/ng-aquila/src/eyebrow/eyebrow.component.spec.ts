import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxEyebrowColorScheme, NxEyebrowComponent } from './eyebrow.component';

describe('NxEyebrowComponent', () => {
  let fixture: ComponentFixture<EyebrowExampleComponent>;
  let testInstance: EyebrowExampleComponent;

  const createTestComponent = (component: Type<EyebrowExampleComponent>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxEyebrowComponent],
    }).compileComponents();
  }));

  it('creates the Eyebrow', waitForAsync(() => {
    createTestComponent(EyebrowExampleComponent);
    expect(testInstance).toBeTruthy();
  }));

  it('should not set on-accent-attention class by default', waitForAsync(() => {
    createTestComponent(EyebrowExampleComponent);
    const nativeElement: HTMLElement = fixture.nativeElement.querySelector('nx-eyebrow');
    expect(nativeElement).not.toHaveClass('nx-eyebrow-on-accent-attention');
  }));

  it('should set on-accent-attention class when colorScheme is on-accent-attention', waitForAsync(() => {
    createTestComponent(EyebrowExampleComponent);
    const nativeElement: HTMLElement = fixture.nativeElement.querySelector('nx-eyebrow');
    testInstance.colorScheme = 'on-accent-attention';
    fixture.detectChanges();
    expect(nativeElement).toHaveClass('nx-eyebrow-on-accent-attention');
  }));
});

@Component({
  selector: 'eyebrow-example',
  template: ` <nx-eyebrow size="s" [colorScheme]="colorScheme">Eyebrow Text</nx-eyebrow> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxEyebrowComponent],
})
export class EyebrowExampleComponent {
  colorScheme: NxEyebrowColorScheme = 'default';
}
