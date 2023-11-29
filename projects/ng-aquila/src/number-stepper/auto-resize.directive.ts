import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer2 } from '@angular/core';
import { getFontShorthand } from '@aposin/ng-aquila/utils';

/** @docs-private */
@Directive({
    selector: 'input[nxAutoResize]',
})
export class NxAutoResizeDirective implements AfterViewInit, OnDestroy {
    @HostBinding('style.width.px') width!: number;

    @Input('nxAutoResize') set resize(value: BooleanInput) {
        this._resize = coerceBooleanProperty(value);
        if (this._resize) {
            this._addEventListener();
            this.updateInputWidth();
        } else {
            this._removeEventListener();
        }
    }
    get resize(): boolean {
        return this._resize;
    }
    private _resize = true;

    constructor(
        private readonly _element: ElementRef,
        private readonly _renderer: Renderer2,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        this.updateInputWidth = this.updateInputWidth.bind(this);
    }

    ngAfterViewInit(): void {
        if (this.resize) {
            this._addEventListener();
        }
    }

    ngOnDestroy(): void {
        this._removeEventListener();
    }

    updateInputWidth() {
        const measureCanvas = this._renderer.createElement('canvas');

        const ctx = measureCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const styles = window.getComputedStyle(this._element.nativeElement);

        ctx.font = getFontShorthand(styles);

        const metrics = ctx.measureText(this._element.nativeElement.value);

        const padding = this.sumStyles(styles.paddingLeft, styles.paddingRight);
        const border = this.sumStyles(styles.borderLeftWidth, styles.borderRightWidth);
        // the pixels are needed, because despite the correct calculation the last pixels of a number are always cut
        const newWidth = metrics.width + padding + border + 16;

        // Limit to own given minimal width
        const parsed = parseFloat(styles.minWidth);
        this.width = Math.max(Number.isNaN(parsed) ? 0 : parsed, newWidth);

        // needed when the outer component is onPush
        this._cdr.markForCheck();
    }

    _addEventListener() {
        this._element.nativeElement.addEventListener('input', this.updateInputWidth, true);
        this._element.nativeElement.addEventListener('change', this.updateInputWidth, true);
    }

    _removeEventListener() {
        this._element.nativeElement.removeEventListener('input', this.updateInputWidth, true);
        this._element.nativeElement.removeEventListener('change', this.updateInputWidth, true);
    }

    sumStyles(left: string, right: string) {
        return (parseInt(left, 10) || 0) + (parseInt(right, 10) || 0);
    }
}
