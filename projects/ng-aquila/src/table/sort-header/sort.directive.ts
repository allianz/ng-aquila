import { Directive, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export type SortDirection = 'asc' | 'desc';

export class SortEvent {
    /** The name of the column that is being sorted by. */
    active: string;

    /** The sort direction. */
    direction: SortDirection;

    constructor(active: string, direction: SortDirection) {
        this.active = active;
        this.direction = direction;
    }
}

@Directive({
    selector: 'table[nxSort]',
    exportAs: 'NxSortDirective',
})
export class NxSortDirective implements OnDestroy {
    readonly _stateChanges = new Subject<void>();

    private _active!: string;

    /** Sets the key of the most recently sorted column. */
    @Input()
    set active(value: string) {
        if (this._active !== value) {
            this._active = value;
            this.sortChange.emit(new SortEvent(this.active, this.direction));
            this._stateChanges.next();
        }
    }
    get active(): string {
        return this._active;
    }

    private _direction: SortDirection = 'asc';

    /** Sets the direction of the currently active sorted column. Default: 'asc'. */
    @Input()
    set direction(value: SortDirection) {
        if (this._direction !== value) {
            this._direction = value;
            this.sortChange.emit(new SortEvent(this.active, this.direction));
            this._stateChanges.next();
        }
    }
    get direction(): SortDirection {
        return this._direction;
    }

    /**
     * @docs-private
     * An event emitted when the active value has changed.
     */
    @Output() readonly activeChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * @docs-private
     * An event emitted when the direction value has changed.
     */
    @Output() readonly directionChange: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

    /** An event emitted when either the active sort or sort direction changes. */
    @Output() readonly sortChange: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

    ngOnDestroy() {
        this._stateChanges.complete();
    }

    /**
     * Sets the active sort key and determines the new sort direction.
     * Afterwards the output event `sortChange` is called.
     *
     * If `sortable` is not the key of the active sort header, the initial direction to sort is 'asc'.
     * Otherwise the direction of the sorted column changes.
     */
    sort(sortable: string): void {
        if (this._active !== sortable) {
            this._active = sortable;
            this.activeChange.emit(this.active);
            this._direction = 'asc';
            this.directionChange.emit(this.direction);
        } else if (this._direction === 'asc') {
            this._direction = 'desc';
            this.directionChange.emit(this.direction);
        } else {
            this._direction = 'asc';
            this.directionChange.emit(this.direction);
        }

        this.sortChange.emit(new SortEvent(this.active, this.direction));
        this._stateChanges.next();
    }
}
