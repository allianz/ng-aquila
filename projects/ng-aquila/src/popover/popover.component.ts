import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NxPopoverContentDirective } from './popover-content';
import { NxPopoverIntl } from './popover-intl';

@Component({
    selector: 'nx-popover',
    templateUrl: './popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./popover.component.scss'],
    exportAs: 'nxPopover',
})
export class NxPopoverComponent implements OnDestroy, OnInit {
    private _destroyed = new Subject();

    /** @docs-private */
    @ViewChild(TemplateRef)
    templateRef!: TemplateRef<any>;

    /** Content that will be rendered lazily. */
    @ContentChild(NxPopoverContentDirective) _lazyContent!: NxPopoverContentDirective;

    /** Event emitted when the popover is closed. */
    @Output('nxClosed')
    closed = new EventEmitter<void>();

    /** @docs-private */
    closeButtonClick = new Subject<void>();

    /** @docs-private */
    id!: string;

    /** @docs-private */
    direction!: string;

    /** @docs-private */
    showCloseButton: boolean = false;

    /** @docs-private */
    arrowStyle = {};

    constructor(public _intl: NxPopoverIntl, private _cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngOnDestroy() {
        this.closed.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }

    /**
     * Emits event to notify the popover trigger directive that the close button was clicked.
     * @docs-private
     */
    emitCloseButtonClick() {
        this.closeButtonClick.next();
    }

    /** @docs-private */
    _onCloseKeyup($event: KeyboardEvent) {
        if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
            this.emitCloseButtonClick();
        }
        $event.preventDefault();
    }

    /** @docs-private */
    emitClosedEvent() {
        this.closed.emit();
    }

    /** @docs-private */
    get classList(): string {
        if (this.direction) {
            // Returning an array here caused an error that the classes were not set
            // after a prod build. Couldn't reproduce it properly in an isolated way.
            // As it doesn't make sense to return an array for a single value anyway
            // changed it to a string and that seems to work.
            return `nx-popover--${this.direction}`;
        } else {
            return '';
        }
    }

    /** Prevent the popover from closing when the user clicks on the popover content. */
    _onClick(event: Event) {
        event.stopPropagation();
    }
}
