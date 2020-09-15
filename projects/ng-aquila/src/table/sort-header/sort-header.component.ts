import { Component, Input, Optional, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NxSortDirective } from './sort.directive';
import { Subscription } from 'rxjs';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { NxSortHeaderIntl } from './sort-header-intl';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'th[nxSortHeaderCell]',
  exportAs: 'nxSortHeaderComponent',
  templateUrl: 'sort-header.component.html',
  styleUrls: ['sort-header.component.scss'],
  host: {
    '(click)': '_handleClick()',
    '(keydown)': '_onKeydown($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSortHeaderComponent implements OnInit, OnDestroy {

  private _parentChangeSubscription: Subscription;
  private _intlSubscription: Subscription;
  private _key: string;

  /** Sets the key of this sort header. */
  @Input('nxSortHeaderCell')
  set key(value: string) {
    if (this._key !== value) {
      this._key = value;
    }
  }
  get key(): string {
    return this._key;
  }

  constructor(@Optional() public _sort: NxSortDirective,
    public _intl: NxSortHeaderIntl,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._intlSubscription = this._intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
  }

  ngOnInit() {
    this._parentChangeSubscription = this._sort._stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this._parentChangeSubscription) {
      this._parentChangeSubscription.unsubscribe();
    }
    this._intlSubscription.unsubscribe();
  }

  _handleClick() {
    this._sort.sort(this._key);
  }

  _onKeydown($event) {
    if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
      this._sort.sort(this._key);

      // prevent page from scrolling down
      if ($event.keyCode === SPACE) {
        $event.preventDefault();
      }
    }
  }

  _isSortedAscending() {
    return (this._sort.active === this._key && this._sort.direction === 'asc');
  }

  _isSortedDescending() {
    return (this._sort.active === this._key && this._sort.direction === 'desc');
  }

  _getAriaLabel(): string {
    if (this._sort.active === this._key && this._sort.direction === 'asc') {
      return `${this._intl.sortDescendingAriaLabel}`;
    }
    return `${this._intl.sortAscendingAriaLabel}`;
  }
}
