import { NxButtonBase } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

import { NxComparisonTableCell } from '../cell/cell.component';

@Component({
  selector: 'button[nxComparisonTableSelectButton]',
  templateUrl: './select-button.component.html',
  styleUrls: ['../../button/button.scss', './select-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[disabled]': '_cell._isCellDisabled',
    class: 'nx-comparison-table__select-button',
    '(click)': '_selectCell()',
    '[attr.aria-pressed]': '_cell._isSelected()',
  },
  imports: [NxIconModule],
})
export class NxComparisonTableSelectButton extends NxButtonBase implements OnDestroy {
  protected readonly _cell = inject(NxComparisonTableCell);
  /** Sets the label that is displayed when the column is selected. Default: 'Selected'. */
  @Input() set selectedLabel(value: string) {
    this._selectedLabel = value;
  }
  get selectedLabel(): string {
    return this._selectedLabel;
  }
  private _selectedLabel = 'Selected';

  /** Sets the label that is displayed when the column is not selected. Default: 'Select'. */
  @Input() set unselectedLabel(value: string) {
    this._unselectedLabel = value;
  }
  get unselectedLabel(): string {
    return this._unselectedLabel;
  }
  private _unselectedLabel = 'Select';

  /** Sets the classNames (style, size and negative) of the unselected button. Default: 'secondary small'. */
  @Input() set unselectedClassNames(value: string) {
    if (value !== this._unselectedClassNames) {
      this._unselectedClassNames = value;
      this._setClassNames();
    }
  }
  get unselectedClassNames(): string {
    return this._unselectedClassNames;
  }
  private _unselectedClassNames = 'secondary small';

  /** Sets the classNames (style, size and negative) of the selected button. Default: 'primary small'. */
  @Input() set selectedClassNames(value: string) {
    if (value !== this._selectedClassNames) {
      this._selectedClassNames = value;
      this._setClassNames();
    }
  }
  get selectedClassNames(): string {
    return this._selectedClassNames;
  }
  private _selectedClassNames = 'primary small';

  _ariaPressed = false;

  private readonly _destroyed = new Subject<void>();

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(...args: unknown[]);
  constructor() {
    super();
    this._setClassNames();

    effect(() => {
      this._setClassNames();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _setClassNames() {
    this.classNames = this._cell._isSelected()
      ? this.selectedClassNames
      : this.unselectedClassNames;
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
