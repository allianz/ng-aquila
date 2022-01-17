import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { NxButtonBase } from '@aposin/ng-aquila/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NxComparisonTableCell } from '../cell/cell.component';
import { NxComparisonTableBase } from '../comparison-table-base';

@Component({
    selector: 'button[nxComparisonTableSelectButton]',
    templateUrl: './select-button.component.html',
    styleUrls: ['../../button/button.scss', './select-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[disabled]': '_cell._isCellDisabled',
        class: 'nx-comparison-table__select-button',
        '(click)': '_selectCell()',
        '[attr.aria-pressed]': '_ariaPressed',
    },
})
export class NxComparisonTableSelectButton extends NxButtonBase implements OnDestroy {
    private _destroyed = new Subject();

    private _selectedLabel: string = 'Selected';

    _ariaPressed: boolean = false;

    /** Sets the label that is displayed when the column is selected. Default: 'Selected'. */
    @Input()
    set selectedLabel(value: string) {
        this._selectedLabel = value;
    }
    get selectedLabel(): string {
        return this._selectedLabel;
    }

    private _unselectedLabel: string = 'Select';

    /** Sets the label that is displayed when the column is not selected. Default: 'Select'. */
    @Input()
    set unselectedLabel(value: string) {
        this._unselectedLabel = value;
    }
    get unselectedLabel(): string {
        return this._unselectedLabel;
    }

    private _unselectedClassNames: string = 'secondary small';

    /** Sets the classNames (style, size and negative) of the unselected button. Default: 'secondary small'. */
    @Input()
    set unselectedClassNames(value: string) {
        if (value !== this._unselectedClassNames) {
            this._unselectedClassNames = value;
            this._setClassNames();
        }
    }
    get unselectedClassNames(): string {
        return this._unselectedClassNames;
    }

    private _selectedClassNames: string = 'primary small';

    /** Sets the classNames (style, size and negative) of the selected button. Default: 'primary small'. */
    @Input()
    set selectedClassNames(value: string) {
        if (value !== this._selectedClassNames) {
            this._selectedClassNames = value;
            this._setClassNames();
        }
    }
    get selectedClassNames(): string {
        return this._selectedClassNames;
    }

    constructor(
        _cdr: ChangeDetectorRef,
        _elementRef: ElementRef,
        public _cell: NxComparisonTableCell,
        private _table: NxComparisonTableBase,
        _focusMonitor: FocusMonitor,
    ) {
        super(_cdr, _elementRef, _focusMonitor);
        this._setClassNames();

        this._cell.indexChange.pipe(takeUntil(this._destroyed)).subscribe(index => {
            setTimeout(() => {
                this._setClassNames();
                this._setAriaPressed();
            });
        });

        this._table.selectedIndexChange.pipe(takeUntil(this._destroyed)).subscribe(index => {
            this._setClassNames();
            this._setAriaPressed();
        });
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private _setClassNames() {
        this.classNames = this._cell._isSelected() ? this.selectedClassNames : this.unselectedClassNames;
    }

    _selectCell() {
        this._cell._selectCell();
    }

    _getButtonLabel() {
        return this._cell._isSelected() ? this._selectedLabel : this._unselectedLabel;
    }

    private _setAriaPressed() {
        this._ariaPressed = this._cell._isSelected();
    }
}
