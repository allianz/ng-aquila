import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxBodyTextComponent, NxBodyTextSize, NxBodyTextType } from './body-text.component';

describe('NxBodyTextComponent', () => {
  let fixture: ComponentFixture<BodyTextTestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTextTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyTextTestComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('p');
  });

  it('should default to size m and primary type', () => {
    expect(element.classList.contains('nx-body-text--m')).toBe(true);
    expect(element.classList.contains('nx-body-text--secondary')).toBe(false);
    expect(element.classList.contains('nx-body-text--inverse')).toBe(false);
  });

  it('should apply the size class', () => {
    for (const size of ['s', 'm', 'l'] as NxBodyTextSize[]) {
      fixture.componentInstance.size = size;
      fixture.detectChanges();
      expect(element.classList.contains(`nx-body-text--${size}`)).toBe(true);
    }
  });

  it('should apply the secondary class only for the secondary type', () => {
    fixture.componentInstance.type = 'secondary';
    fixture.detectChanges();
    expect(element.classList.contains('nx-body-text--secondary')).toBe(true);

    fixture.componentInstance.type = 'primary';
    fixture.detectChanges();
    expect(element.classList.contains('nx-body-text--secondary')).toBe(false);
  });

  it('should apply the inverse class when inverse is set', () => {
    fixture.componentInstance.inverse = true;
    fixture.detectChanges();
    expect(element.classList.contains('nx-body-text--inverse')).toBe(true);
  });
});

@Component({
  selector: 'test-body-text-test-component',
  template: `<p nxBodyText [size]="size" [type]="type" [inverse]="inverse">Body text</p>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBodyTextComponent],
})
class BodyTextTestComponent {
  size: NxBodyTextSize = 'm';
  type: NxBodyTextType = 'primary';
  inverse = false;
}
