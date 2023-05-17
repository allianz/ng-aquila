import { Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { removeClasses } from '@aposin/ng-aquila/utils';

let nextId = 0;

/** @docs-private */
@Directive()
export class NxRadioToggleButtonBaseComponent {
    /** @docs-private */
    toggleButtonId: string = 'nx-radio-toggle-button-' + nextId++;

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
        this.renderer.addClass(this.labelContainer.nativeElement, 'nx-radio-toggle__label-container--first');
    }

    /** @docs-private */
    setLastButton() {
        this.renderer.addClass(this.labelContainer.nativeElement, 'nx-radio-toggle__label-container--last');
    }

    /** @docs-private */
    resetClasses() {
        removeClasses(this.renderer, this.labelContainer, 'nx-radio-toggle__label-container--first nx-radio-toggle__label-container--last');
    }
}
