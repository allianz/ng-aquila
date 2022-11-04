import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';

export const MAX_WIDTH = 400;
export const MIN_WIDTH = 56;
export const AUTO_COLLAPSE_WIDTH = 168;
export const RESIZE_STEP_SIZE = 20;

@Component({
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.scss'],
    selector: 'nx-sidebar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-resizing]': '_resizing',
        '[class.is-closed]': '!open',
        '[style.width.px]': `_sidebarElementWidth`,
    },
})
export class NxSidebarComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild('resizeHandle') _resizeHandle!: ElementRef;

    /** Emits the new width of the sidebar on resize or on close/open event.*/
    @Output() readonly widthChange = new EventEmitter<number>();

    /** If set to `true` this will enable dynamic resizing of the sidebar. */
    @Input() set resizeable(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this._resizeable) {
            this._resizeable = newValue;
            this._cdr.markForCheck();
        }
    }
    get resizeable() {
        return this._resizeable;
    }
    private _resizeable = false;

    /** Sets the minimal width (in pixel) of the sidebar. */
    @Input() set minWidth(value: NumberInput) {
        this._minWidth = coerceNumberProperty(value) || MIN_WIDTH;
    }
    get minWidth(): number {
        return this._minWidth;
    }
    private _minWidth: number = MIN_WIDTH;

    /** Sets the maximal width (in pixel) of the sidebar. */
    @Input() set maxWidth(value: NumberInput) {
        this._maxWidth = coerceNumberProperty(value) || MAX_WIDTH;
    }
    get maxWidth(): number {
        return this._maxWidth;
    }
    private _maxWidth: number = MAX_WIDTH;

    /** This sets the accessibility label for the resize handle of the sidebar. */
    @Input() set resizeHandleAriaLabel(value: string) {
        if (value !== this._resizeHandleAriaLabel) {
            this._resizeHandleAriaLabel = value;
            this._cdr.markForCheck();
        }
    }
    get resizeHandleAriaLabel() {
        return this._resizeHandleAriaLabel;
    }
    private _resizeHandleAriaLabel = '';

    /**
     * This reflects the current open state of the sidebar.
     *
     * It will be `true` if the sidebar is expanded and `false` if the sidebar is closed.
     */
    set open(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this._open) {
            this._open = newValue;
            this._cdr.markForCheck();
        }
    }
    get open(): boolean {
        return this._open;
    }
    private _open = true;

    /** This sets the width of the sidebar in an expanded state. */
    set width(value: number) {
        const newValue = Math.max(value, this.minWidth);

        if (newValue !== this._width) {
            this._width = newValue;
            this._cdr.markForCheck();
        }
    }
    get width(): number {
        return this._width;
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    _width = 0;

    _resizing = false;

    _previousWidth = 0;

    _isMobile = false;

    _resizeWidth = 0;

    private _resizeStartX!: number;

    private _resizeStartWidth!: number;

    private readonly _unsubscribeListeners: (() => void)[] = [];

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly renderer: Renderer2,
        private readonly _element: ElementRef,
        @Optional() private readonly _dir: Directionality | null,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._onResize = this._onResize.bind(this);
        this._onResizeEnd = this._onResizeEnd.bind(this);
    }

    ngOnInit(): void {
        this.width = this._element.nativeElement.clientWidth;
    }

    ngAfterViewInit(): void {
        if (this.resizeable) {
            this._focusMonitor.monitor(this._resizeHandle);
        }
    }

    ngOnDestroy(): void {
        this._removeDragEventListeners();
        this._focusMonitor.stopMonitoring(this._resizeHandle);
    }

    /** This will expand the sidebar to its full width. */
    expand(expandedWidth?: number) {
        this.open = true;
        if (expandedWidth) {
            this.width = expandedWidth;
        }
    }

    /** This will close the sidebar to its minimal width. */
    close() {
        this.open = false;
    }

    /** This will close or expand the sidebar depending if it is expanded or closed. */
    toggle() {
        if (this.open) {
            this.close();
        } else {
            this.expand();
        }
        this._emitWidthChange(this._sidebarElementWidth);
    }

    get _sidebarElementWidth() {
        if (this._resizing) {
            return this._resizeWidth;
        }

        return this.open ? this.width : this.minWidth;
    }

    _onResizeStart(event: any) {
        if (event.type.startsWith('touch')) {
            event = event.changedTouches[0];
        }

        this._resizeStartX = event.screenX;
        this._resizeStartWidth = this.open ? this.width : this.minWidth;
        this._resizeWidth = this.width;

        this._attachDragEventListeners();
    }

    _onResize(event: any) {
        this._resizing = true;

        if (event.type.startsWith('touch')) {
            event = event.changedTouches[0];
        }

        let dx = event.screenX - this._resizeStartX;
        if (this.dir === 'rtl') {
            dx *= -1;
        }

        this._resizeWidth = Math.max(this.minWidth, this._resizeStartWidth + dx);
        this.open = this._resizeWidth > this.minWidth;
        this._cdr.markForCheck();
    }

    _onResizeEnd(event: MouseEvent) {
        this._resizing = false;
        this._removeDragEventListeners();

        if (this._isMouseDrag(this._resizeStartX, event.screenX)) {
            if (this._resizeWidth < AUTO_COLLAPSE_WIDTH) {
                this.open = false;
                this._emitWidthChange(this._sidebarElementWidth);
            } else {
                this.open = true;
                this.width = Math.min(this._maxWidth, this._resizeWidth);
                this._emitWidthChange(this.width);
            }
        }
        this._resizeWidth = 0;
    }

    _onResizeHandleClick(event: MouseEvent) {
        if (this._isMouseDrag(this._resizeStartX, event.screenX)) {
            return;
        }

        this.toggle();
    }

    _onSidebarKeydown(event: KeyboardEvent) {
        if (event.which === SPACE) {
            event.preventDefault();
            this.toggle();
        } else if (event.which === LEFT_ARROW) {
            this.width -= RESIZE_STEP_SIZE;

            if (this.width <= AUTO_COLLAPSE_WIDTH) {
                this.open = false;
                this.width = AUTO_COLLAPSE_WIDTH + 1;
            }
            this._emitWidthChange(this.width);
        } else if (event.which === RIGHT_ARROW) {
            if (this.open) {
                this.width = Math.min(this._maxWidth, this.width + RESIZE_STEP_SIZE);
            } else {
                this.open = true;
                this.width = Math.max(this.width, AUTO_COLLAPSE_WIDTH);
            }
            this._emitWidthChange(this.width);
        }
    }

    private _emitWidthChange(width: number) {
        this.widthChange.emit(width);
    }

    private _isMouseDrag(startX: number, endX: number): boolean {
        return Math.abs(endX - startX) > 5;
    }

    private _attachDragEventListeners() {
        this._unsubscribeListeners.push(this.renderer.listen('document', 'mousemove', this._onResize));
        this._unsubscribeListeners.push(this.renderer.listen('document', 'mouseup', this._onResizeEnd));
        this._unsubscribeListeners.push(this.renderer.listen('document', 'touchmove', this._onResize));
        this._unsubscribeListeners.push(this.renderer.listen('document', 'touchend', this._onResizeEnd));
    }

    private _removeDragEventListeners() {
        this._unsubscribeListeners.forEach(unsubscribe => unsubscribe());
    }
}
