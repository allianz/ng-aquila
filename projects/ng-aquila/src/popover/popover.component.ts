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
import { PopoverTriggerType } from './popover-trigger.directive';

@Component({
    selector: 'nx-popover',
    templateUrl: './popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./popover.component.scss'],
    exportAs: 'nxPopover',
})
export class NxPopoverComponent implements OnDestroy, OnInit {
    /** @docs-private */
    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

    /** Content that will be rendered lazily. */
    @ContentChild(NxPopoverContentDirective) _lazyContent?: NxPopoverContentDirective;

    /** Event emitted when the popover is closed. */
    @Output() readonly closed = new EventEmitter<void>();

    /** @docs-private */
    readonly closeButtonClick = new Subject<void>();

    /** @docs-private */
    id!: string;

    /** @docs-private */
    direction!: string;

    /** @docs-private */
    hidePopoverArrow = false;

    /** @docs-private */
    showCloseButton = false;

    /** @docs-private */
    triggerType: PopoverTriggerType = 'click';

    /** @docs-private */
    arrowStyle = {};

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly _intl: NxPopoverIntl,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this.closed.complete();
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
    _onCloseKeydown($event: KeyboardEvent) {
        if ($event.keyCode === SPACE) {
            $event.preventDefault();
        }
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
        }
        return '';
    }

    /** Prevent the popover from closing when the user clicks on the popover content. */
    _onClick(event: Event) {
        event.stopPropagation();
    }
}
