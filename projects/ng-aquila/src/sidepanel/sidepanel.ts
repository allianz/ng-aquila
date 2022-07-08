import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
} from '@angular/core';

import { nxSidepanelAnimations } from './sidepanel-animations';
import { NxSidepanelHeaderComponent } from './sidepanel-header';

/** Type for the available position values. */
export type PositionType = 'floating' | 'static';

/** Type for the appearance of the sidepanel. */
export type Appearance = 'light' | 'dark';

@Component({
    selector: 'nx-sidepanel',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sidepanel.scss'],
    animations: [nxSidepanelAnimations.sidepanelExpansion],
    host: {
        '[class.is-closed]': '!opened',
        '[class.is-static]': 'position === "static"',
        '[class.is-floating]': 'position === "floating"',
        '[class.light]': 'appearance === "light"',
        role: 'complementary',
        // if no wrapper is used, the sidepanel currently is not animated when opening closing,
        // since a controlled environment is needed so that the animation works as expected.
        '[@sidepanelExpansion]': '{ value: _wrapper ? _getOpenState() : "", params: { transformX: dir === "rtl" ? "-100%" : "100%" } }',
        '(@sidepanelExpansion.done)': 'onAnimationDone($event)',
        '[class.without-wrapper]': '!this._wrapper',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelComponent {
    /** Whether the sidepanel should be opened and visible. */
    @Input()
    set opened(value: BooleanInput) {
        this._opened = coerceBooleanProperty(value);
        this._setOpenState(this._opened);
        this._wrapper?._update();
        this._cdr.markForCheck();
    }
    get opened(): boolean {
        return this._opened;
    }

    /** Sets the position of the sidepanel. */
    @Input()
    set position(value: PositionType) {
        this._position = value;
        this._cdr.markForCheck();
        this._wrapper?._update();
    }
    get position(): PositionType {
        return this._position;
    }

    /** Sets the appearance of the sidepanel. Default: dark. */
    @Input()
    set appearance(value: Appearance) {
        this._appearance = value;
        this._cdr.markForCheck();
    }
    get appearance(): Appearance {
        return this._appearance;
    }

    triggerElem?: HTMLElement | null;

    constructor(
        private _cdr: ChangeDetectorRef,
        protected _elementRef: ElementRef,
        private _dir: Directionality,
        @Optional() @Inject(forwardRef(() => NxSidepanelOuterContainerComponent)) public _wrapper: NxSidepanelOuterContainerComponent | null,
    ) {
        if (this._wrapper == null) {
            console.warn(`NxSidepanelComponent needs a wrapping NxSidepanelOuterContainerComponent to work as expected.`);
        }
    }

    private _opened = true;

    @ContentChild(NxSidepanelHeaderComponent, { read: ElementRef, static: false }) _header!: ElementRef;

    /**
     * An event emitted when the opened value has changed.
     *
     * Emits the boolean value.
     */
    @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _position: PositionType = 'floating';

    private _appearance: Appearance = 'dark';

    private _openState = 'open-instant';

    /** Toggles the opened state of the sidepanel. */
    toggle() {
        this.opened = !this.opened;
        this.openedChange.emit(this._opened);
    }

    /** Sets the opened state of the sidepanel to true. */
    open() {
        if (!this.opened) {
            this.toggle();
        }
    }

    /** Sets the opened state of the sidepanel to false. */
    close() {
        if (this.opened) {
            this.toggle();
        }
    }

    _getWidth(): number {
        return this._elementRef.nativeElement.offsetWidth;
    }

    _getOpenState() {
        return this._openState;
    }

    _setOpenState(opened: boolean) {
        if (this._openState === 'open-instant' && opened) {
            return;
        }
        this._openState = opened ? 'open' : 'closed';
        if (opened) {
            this.triggerElem = document.activeElement as HTMLElement;
        }
    }

    onAnimationDone(event: AnimationEvent) {
        this.openedChange.emit(this._opened);
        this.focusTrigger(this._opened);
    }

    focusTrigger(opened: boolean) {
        if (!opened && this.triggerElem) {
            this.triggerElem.focus();
            this.triggerElem = null;
        }
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
}

@Component({
    selector: 'nx-sidepanel-outer-container',
    template: `
        <div
            class="nx-sidepanel-outer-container__content"
            [class.with-margin]="_getOpenState() === 'open'"
            [class.without-margin]="_getOpenState() === 'closed'"
            [style.margin-right.px]="dir === 'ltr' ? _getSidepanelWidth() : 0"
            [style.margin-left.px]="dir === 'rtl' ? _getSidepanelWidth() : 0"
        >
            <ng-content></ng-content>
        </div>
        <ng-content select="nx-sidepanel"></ng-content>
    `,
    styleUrls: ['./sidepanel-outer-container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelOuterContainerComponent {
    @ContentChild(NxSidepanelComponent) _sidepanel!: NxSidepanelComponent;

    constructor(@Optional() private _dir: Directionality, private _cdr: ChangeDetectorRef) {
        this._dir.change.subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    _update() {
        this._cdr.markForCheck();
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    _getOpenState() {
        if (this._sidepanel?.position === 'static') {
            return this._sidepanel._getOpenState();
        }
        return 'closed';
    }

    _getSidepanelWidth() {
        if (this._sidepanel?.position === 'static' && this._sidepanel?.opened) {
            return this._sidepanel._getWidth();
        }
        return 0;
    }
}
