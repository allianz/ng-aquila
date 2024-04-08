import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { MappedStyles } from '@aposin/ng-aquila/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/** The size of the link. */
export type NxLinkSize = 'xsmall' | 'small' | 'large';

const MAPPING = {
    black: 'nx-link--black',
    negative: 'nx-link--negative',
    text: 'nx-link--text',
    'icon-right': 'nx-link--icon-right',
    'icon-only': 'nx-link--icon-only',
};

const DEFAULT_CLASSES = ['nx-link'];

/**
 * `Input('nxStyle') classNames` sets the style of the link, thereby altering the visual appearance.
 * You can use any combination of 'black', 'icon-right', 'icon-only', 'negative' or 'text'.
 */
@Component({
    selector: 'nx-link',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '<ng-content></ng-content>',
    inputs: ['classNames: nxStyle'],
    host: {
        '[class.nx-link--xsmall]': 'this.size === "xsmall"',
        '[class.nx-link--small]': 'this.size === "small"',
        '[class.nx-link--large]': 'this.size === "large"',
    },
})
export class NxLinkComponent extends MappedStyles implements AfterContentInit, OnDestroy {
    /** @docs-private */
    @ContentChild(NxIconComponent) icon!: NxIconComponent;

    /** Sets the size of the link. Default: 'small'. */
    @Input() set size(value: NxLinkSize) {
        if (this._size !== value) {
            this._size = value;
            this._cdr.markForCheck();
        }
    }
    get size(): NxLinkSize {
        return this._size;
    }
    private _size: NxLinkSize = 'small';

    constructor(
        _elementRef: ElementRef,
        _renderer: Renderer2,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        super(MAPPING, _elementRef, _renderer, DEFAULT_CLASSES);
        this._focusMonitor.monitor(this._elementRef, true);
    }

    ngAfterContentInit(): void {
        // Add a specific link class that the css gets more specific than the nx-icon css
        const icons = this.elementRef.nativeElement.querySelectorAll('nx-icon');
        for (let i = 0; i < icons.length; i++) {
            this._renderer.addClass(icons[i], 'nx-link__icon');
        }
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    /**
     * @docs-private
     * getter used for the modal component as a quickfix
     * since button got changed from directive to component the reference used by the ngOpenModelOnClick directive
     * for nxButtons is a reference to component instance instead of an element reference. As a workaround we need a
     * way to reach the elementRef of the component until the modal gets refactored.
     */
    get elementRef() {
        return this._elementRef;
    }
}
