import { ChangeDetectionStrategy, Component, Directive, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAccentColorComponent, NxAccentColorOption } from './accent-color.component';

@Directive({ standalone: true })
abstract class AccentColorTest {
  @ViewChild(NxAccentColorComponent)
  accentColorInstance!: NxAccentColorComponent;
  color: NxAccentColorOption = 'purple';
  neg: boolean = false;
}

describe('NxAccentColorComponent', () => {
  let fixture: ComponentFixture<AccentColorTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAccentColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAccentColorTestComponent);
    fixture.detectChanges();
  });

  it('should set accent-color attribute for color', () => {
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('nx-accent-color')).toBe('purple');
  });

  it('should update color', () => {
    fixture.componentInstance.color = 'red';
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('nx-accent-color')).toBe('red');
  });

  it('should apply negative class when negative=true', () => {
    fixture.componentInstance.neg = true;
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('nx-accent-color--negative')).toBe(true);
  });
});

@Component({
  selector: 'test-text-accent-color-test-component',
  template: `<span [nx-accent-color]="color" [negative]="neg">highlight</span>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccentColorComponent],
})
class TextAccentColorTestComponent extends AccentColorTest {}
