import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Directive for select text from current focus element
 */
@Directive({
    selector: '[selectOnFocus]',
})
export class SelectOnFocusDirective {
    constructor(private elementRef: ElementRef) {}

    @HostListener('focusin')
    handleFocus(): void {
        const nativeElement = this.elementRef.nativeElement;
        if (nativeElement && nativeElement.select) {
            nativeElement.select();
        } else if (nativeElement && document.createRange) {
            const range = document.createRange();
            range.selectNodeContents(nativeElement);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
}
