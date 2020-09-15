import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
/**
 * This is a table.
 * The table supports a `zebra` and a `condensed` mode.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'table[nxTable]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table.component.scss'],
  host: {
    'class': 'nx-table',
    '[class.nx-table--condensed]': 'condensed',
    '[class.nx-table--zebra]': 'zebra'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableComponent {

  private _condensed: boolean;

  private _zebra: boolean;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

   /** Change the table mode to condensed  */
  @Input() set condensed(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (value !== this._condensed) {
      this._condensed = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  get condensed(): boolean {
    return this._condensed;
  }

   /** Change the table mode to zebra  */
  @Input() set zebra(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (value !== this._zebra) {
      this._zebra = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  get zebra(): boolean {
    return this._zebra;
  }

  static ngAcceptInputType_condensed: BooleanInput;
  static ngAcceptInputType_zebra: BooleanInput;
}
