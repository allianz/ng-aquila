import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  NxUtilityTextComponent,
  NxUtilityTextSize,
  NxUtilityTextType,
} from './utility-text.component';

describe('NxUtilityTextComponent', () => {
  let fixture: ComponentFixture<UtilityTextTestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilityTextTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilityTextTestComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('span');
  });

  it('should default to size m, primary type and no attention', () => {
    expect(element.classList.contains('nx-utility-text--m')).toBe(true);
    expect(element.classList.contains('nx-utility-text--secondary')).toBe(false);
    expect(element.classList.contains('nx-utility-text--attention')).toBe(false);
    expect(element.classList.contains('nx-utility-text--inverse')).toBe(false);
  });

  it('should apply the size class', () => {
    for (const size of ['s', 'm', 'l'] as NxUtilityTextSize[]) {
      fixture.componentInstance.size = size;
      fixture.detectChanges();
      expect(element.classList.contains(`nx-utility-text--${size}`)).toBe(true);
    }
  });

  it('should apply the secondary class only for the secondary type', () => {
    fixture.componentInstance.type = 'secondary';
    fixture.detectChanges();
    expect(element.classList.contains('nx-utility-text--secondary')).toBe(true);

    fixture.componentInstance.type = 'primary';
    fixture.detectChanges();
    expect(element.classList.contains('nx-utility-text--secondary')).toBe(false);
  });

  it('should apply the attention class when attention is set', () => {
    fixture.componentInstance.attention = true;
    fixture.detectChanges();
    expect(element.classList.contains('nx-utility-text--attention')).toBe(true);
  });

  it('should apply the inverse class when inverse is set', () => {
    fixture.componentInstance.inverse = true;
    fixture.detectChanges();
    expect(element.classList.contains('nx-utility-text--inverse')).toBe(true);
  });
});

@Component({
  selector: 'test-utility-text-test-component',
  template: `<span
    nxUtilityText
    [size]="size"
    [type]="type"
    [attention]="attention"
    [inverse]="inverse"
    >Utility text</span
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxUtilityTextComponent],
})
class UtilityTextTestComponent {
  size: NxUtilityTextSize = 'm';
  type: NxUtilityTextType = 'primary';
  attention = false;
  inverse = false;
}
