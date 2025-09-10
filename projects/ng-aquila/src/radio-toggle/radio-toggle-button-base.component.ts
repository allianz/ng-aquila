import { IdGenerationService, removeClasses } from '@allianz/ng-aquila/utils';
import { Directive, ElementRef, inject, Input, Renderer2, ViewChild } from '@angular/core';

/** @docs-private */
@Directive({ standalone: true })
export class NxRadioToggleButtonBaseComponent {
  /** @docs-private */
  toggleButtonId: string = inject(IdGenerationService).nextId('nx-radio-toggle-button');

  /** @docs-private */
  @Input() value: any;

  /** @docs-private */
  @ViewChild('toggleButtonLabelContainer', { static: true }) labelContainer!: ElementRef;

  /** @docs-private */
  @ViewChild('toggleInput', { static: true }) toggleInput!: ElementRef;

  constructor(/** @docs-private */ protected readonly renderer: Renderer2) {}

  /** @docs-private */
  triggerInputClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleInput.nativeElement.click();
  }

  /** @docs-private */
  setFirstButton() {
    this.renderer.addClass(
      this.labelContainer.nativeElement,
      'nx-radio-toggle__label-container--first',
    );
  }

  /** @docs-private */
  setLastButton() {
    this.renderer.addClass(
      this.labelContainer.nativeElement,
      'nx-radio-toggle__label-container--last',
    );
  }

  /** @docs-private */
  resetClasses() {
    removeClasses(
      this.renderer,
      this.labelContainer,
      'nx-radio-toggle__label-container--first nx-radio-toggle__label-container--last',
    );
  }
}
