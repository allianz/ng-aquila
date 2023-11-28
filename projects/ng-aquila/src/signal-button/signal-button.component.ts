import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverDirection, PopoverTriggerScrollStrategy } from '@aposin/ng-aquila/popover';

/** The contextual type of a signal button. */
export type NxSignalButtonContext = 'success' | 'warning' | 'error';

const ICONS: { [k: string]: string } = {
    error: 'exclamation-triangle',
    success: 'check-circle',
    warning: 'exclamation-circle',
};

@Component({
    selector: 'nx-signal-button',
    templateUrl: './signal-button.component.html',
    styleUrls: ['./signal-button.component.scss'],
    host: {
        '[class.context-success]': 'this._context === "success"',
        '[class.context-warning]': 'this._context === "warning"',
        '[class.context-error]': 'this._context === "error"',
    },
})
export class NxSignalButtonComponent {
    private _popoverDirection: PopoverDirection = 'bottom';
    private _scrollStrategy: PopoverTriggerScrollStrategy = 'close';

    private _ariaLabel = 'signal button';
    private _ariaLabelledby = '';
    private _allowedContexts: NxSignalButtonContext[] = ['success', 'warning', 'error'];

    /** The event emitter for open. */
    @Output() opened = new EventEmitter<boolean>();

    /** The event emitter for close. */
    @Output() closed = new EventEmitter<boolean>();

    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    get active(): boolean {
        return this._active;
    }
    private _active = false;

    /**
     * Sets the context of the signal button.
     */
    @Input() set context(value: NxSignalButtonContext) {
        this._updateContext(value);
    }
    get context(): NxSignalButtonContext {
        return this._context;
    }
    _context: NxSignalButtonContext = 'success';

    /** Which aria-label will be reading from screen reader.  */
    @Input('aria-label')
    set ariaLabel(ariaLabel: string) {
        this._ariaLabel = ariaLabel;
    }

    get ariaLabel(): string {
        return this._ariaLabel;
    }

    /** Which aria-labelledby will be reading from screen reader.  */
    @Input('aria-labelledby')
    set ariaLabelledby(ariaLabelledby: string) {
        this._ariaLabelledby = ariaLabelledby;
    }

    get ariaLabelledby(): string {
        return this._ariaLabelledby;
    }

    /**
     * The direction of the popover. The options are `left` | `top` | `right` | `bottom`.
     */
    @Input()
    set popoverDirection(value: PopoverDirection) {
        this._popoverDirection = value;
    }
    get popoverDirection() {
        return this._popoverDirection;
    }

    /**
     * Sets the scroll strategy. 'close' closes the popover on scroll while 'reposition' scrolls the popover with the origin.
     */
    @Input()
    set scrollStrategy(value: PopoverTriggerScrollStrategy) {
        this._scrollStrategy = value;
    }
    get scrollStrategy() {
        return this._scrollStrategy;
    }

    _onActiveChange(active: boolean) {
        this._active = active;

        if (this._active) {
            this.opened.emit();
        } else {
            this.closed.emit();
        }
    }

    _updateContext(value: NxSignalButtonContext) {
        if (value !== this._context) {
            this._context = value;
        }
    }

    get _iconName(): string {
        const context = this._allowedContexts.includes(this._context) ? this._context : this._allowedContexts[0];

        return ICONS[context];
    }
}
