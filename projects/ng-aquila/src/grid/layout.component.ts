import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nxLayout]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['layout.component.scss'],
  host: {
    '[class.nx-grid]': 'grid',
    '[class.nx-grid--no-gutters]': 'noGutters',
    '[class.nx-grid--max-width]': 'maxWidth'
  }
})
export class NxLayoutComponent {
  private _classNames: string = '';

  /** @docs-private */
  grid: boolean = true;

  /** @docs-private */
  noGutters: boolean;

  /** @docs-private */
  maxWidth: boolean;

  /**
   * Type of layout.
   *
   * Values: grid | grid nogutters | grid maxwidth. Default value: grid.
   */
  @Input('nxLayout')
  set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }

    this._classNames = value;
    this.grid = !!this._classNames.match(/grid/);
    this.noGutters = !!this._classNames.match(/nogutters/);
    this.maxWidth = !!this._classNames.match(/maxwidth/);
  }

  get classNames(): string {
    return this._classNames;
  }
}
