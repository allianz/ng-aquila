import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * This is an image that can be placed into the small stage component.
 */
@Directive({
    selector: 'nx-small-stage-image',
})
export class NxSmallStageImageDirective {
    /**
     * The source url of the image.
     */
    @Input() set src(value: string) {
        this._renderer.setStyle(this._elementRef.nativeElement, 'backgroundImage', `url('${value}')`);
    }

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _renderer: Renderer2,
    ) {}
}
