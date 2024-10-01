import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

const DD_ITEM_SIZE: number = 40;
const DD_MIN_BUFER_PX: number = 200;
const DD_MAX_BUFER_PX: number = 400;

export class DropdownVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    private _ddviewport: CdkVirtualScrollViewport | null = null;

    constructor() {
        super(DD_ITEM_SIZE, DD_MIN_BUFER_PX, DD_MAX_BUFER_PX);
    }

    attach(viewport: CdkVirtualScrollViewport) {
        super.attach(viewport);
        this._ddviewport = viewport;
    }

    onDataLengthChanged() {
        super.onDataLengthChanged();
        this._updateViewportHeight();
        this.scrollToIndex(0, 'auto');
    }

    onContentRendered() {
        this._updateViewportHeight();
    }

    private _updateViewportHeight() {
        this._ddviewport?.elementRef.nativeElement.style.setProperty('min-height', `${Math.min(6, this._ddviewport.getDataLength()) * DD_ITEM_SIZE}px`);
    }
}
