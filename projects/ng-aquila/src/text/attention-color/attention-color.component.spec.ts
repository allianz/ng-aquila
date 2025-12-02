import { Component, Directive, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAttentionColorComponent, NxAttentionColorOption } from './attention-color.component';

@Directive({ standalone: true })
abstract class AttentionColorTest {
  @ViewChild(NxAttentionColorComponent) attentionColorInstance!: NxAttentionColorComponent;
  color: NxAttentionColorOption = 'purple';
  neg: boolean = false;
}

describe('NxAttentionColorComponent', () => {
  let fixture: ComponentFixture<AttentionColorTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAttentionColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAttentionColorTestComponent);
    fixture.detectChanges();
  });

  it('should set attention-color attribute for color', () => {
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('nx-attention-color')).toBe('purple');
  });

  it('should update color', () => {
    fixture.componentInstance.color = 'red';
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('nx-attention-color')).toBe('red');
  });

  it('should apply negative class when negative=true', () => {
    fixture.componentInstance.neg = true;
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('nx-attention-color--negative')).toBeTrue();
  });
});

@Component({
  template: `<span [nx-attention-color]="color" [negative]="neg">highlight</span>`,
  imports: [NxAttentionColorComponent],
})
class TextAttentionColorTestComponent extends AttentionColorTest {}
