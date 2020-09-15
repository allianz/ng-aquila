import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

export interface NxExpandable {
  /** Indicates if this expandable instance is open or not.  */
  expanded: BehaviorSubject<boolean>;

  /** Toggles the open state. */
  toggle: () => void;

  /** Expands this component. */
  expand: () => void;

  /** Closes this component. */
  close: () => void;
}

/**
 * This toggle button can be clicked and toggles expandable elements.
 * e.g. it can toggle a expandable table row or anything else that implements the `NxExpandable` interface.
 */
@Component({
  selector: 'nx-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxToggleButtonComponent implements OnDestroy {
  _expanded: boolean = false;

  /**
   * This is the expandable target that will be toggled when the user clicks the button.
   */
  @Input()
  set target(value: NxExpandable) {
    this._target = value;

    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    if (this._target) {
      this._subscription = this._target.expanded.subscribe(expanded => {
          this._expanded = expanded;
          this._changeDetectorRef.markForCheck();
        });
    }
  }
  _target: NxExpandable;

  @Input()
  set ariaLabel(value: string) {
    this._ariaLabel = value;
    this._changeDetectorRef.markForCheck();
  }
  _ariaLabel: string = '';

  private _subscription: Subscription;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  _onClick() {
    if (this._target) {
      this._target.toggle();
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
