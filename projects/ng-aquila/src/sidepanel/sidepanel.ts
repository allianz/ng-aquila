import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ContentChild, ElementRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { NxSidepanelHeaderComponent } from './sidepanel-header';
import { nxSidepanelAnimations } from './sidepanel-animations';
import { Direction, Directionality } from '@angular/cdk/bidi';

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
        '[class.without-wrapper]': '!this._wrapper',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelComponent {
    /** Whether the sidepanel should be opened and visible. */
    @Input()
    set opened(value: boolean) {
        this._opened = coerceBooleanProperty(value);
        this._setOpenState(this._opened);
        this._wrapper?._update();
        this._changeDetectorRef.markForCheck();
    }
    get opened(): boolean {
        return this._opened;
    }

    /** Sets the position of the sidepanel. */
    @Input()
    set position(value: PositionType) {
        this._position = value;
        this._changeDetectorRef.markForCheck();
        this._wrapper?._update();
    }
    get position(): PositionType {
        return this._position;
    }

    /** Sets the appearance of the sidepanel. Default: dark. */
    @Input()
    set appearance(value: Appearance) {
        this._appearance = value;
        this._changeDetectorRef.markForCheck();
    }
    get appearance(): Appearance {
        return this._appearance;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef, protected _elementRef: ElementRef, private _dir: Directionality, @Optional() public _wrapper: NxSidepanelOuterContainerComponent) {
        if (!this._wrapper) {
            console.warn(`NxSidepanelComponent needs a wrapping NxSidepanelOuterContainerComponent to work as expected.`);
        }
    }

    static ngAcceptInputType_opened: BooleanInput;

    private _opened: boolean = true;

    @ContentChild(NxSidepanelHeaderComponent, { read: ElementRef, static: false }) _header!: ElementRef;

    /**
     * An event emitted when the opened value has changed.
     *
     * Emits the boolean value.
     */
    @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _position: PositionType = 'floating';

    private _appearance: Appearance = 'dark';

    private _openState: string = 'open-instant';

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

    constructor(@Optional() private _dir: Directionality, private _changeDetectorRef: ChangeDetectorRef) {
        this._dir.change.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    _update() {
        this._changeDetectorRef.markForCheck();
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
