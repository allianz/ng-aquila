import { FocusableOption } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input } from '@angular/core';

/** @docs-private */
@Directive({ selector: '[nxTabLabelWrapper]' })
export class NxTabLabelWrapperDirective implements FocusableOption {
    /** Whether the tab group is disabled. Default: false. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.disabled !== newValue) {
            this._disabled = newValue;
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    constructor(readonly elementRef: ElementRef) {}

    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
