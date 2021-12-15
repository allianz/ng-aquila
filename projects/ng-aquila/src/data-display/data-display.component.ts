import { Component, Inject, InjectionToken, Input, Optional } from '@angular/core';

/**
 * Layout direction of the NxDataDisplayComponent.
 * 'vertical': label and value are vertically stacked.
 * 'horizontal': label and value are on the same line.
 */
export type NxDataDisplayDirection = 'vertical' | 'horizontal';

/**
 * Sizes of the NxDataDisplayComponent.
 */
export type NxDataDisplaySize = 'small' | 'medium' | 'large';

/**
 * Default options for the NxDataDisplayComponent.
 */
export interface DataDisplayDefaultOptions {
  size: NxDataDisplaySize;
}

/**
 * Injection token for the default options of the NxDataDisplayComponent.
 */
export const DATA_DISPLAY_DEFAULT_OPTIONS = new InjectionToken<DataDisplayDefaultOptions>('DATA_DISPLAY_DEFAULT_OPTIONS');

/**
 * Data display component.
 */
@Component({
  selector: 'nx-data-display',
  template: '<ng-content></ng-content>',
  styleUrls: ['./data-display.component.scss'],
  host: {
    '[class.is-horizontal]': 'direction === "horizontal"',
    '[class.is-small]': 'size === "small"',
    '[class.is-medium]': 'size === "medium"',
    '[class.is-large]': 'size === "large"',
  }
})
export class NxDataDisplayComponent {
  /**
   * Size of this data display.
   */
  @Input()
  size: NxDataDisplaySize = this._defaultOptions?.size ?? 'large';

  /**
   * Alignment of the label and value.
   * 'vertical': label and value are vertically stacked.
   * 'horizontal': label and value are on the same line.
   */
  @Input()
  direction: NxDataDisplayDirection = 'vertical';

  constructor(@Optional() @Inject(DATA_DISPLAY_DEFAULT_OPTIONS) private _defaultOptions: DataDisplayDefaultOptions | null) {}
}

/**
 * Value within a `<nx-data-display>`.
 */
@Component({
  selector: 'nx-data-display-value',
  template: '<ng-content></ng-content>',
  styleUrls: ['./data-display-value.component.scss']
})
export class NxDataDisplayValueComponent {}

/**
 * Label within a `<nx-data-display>`.
 */
@Component({
  selector: 'nx-data-display-label',
  template: '<ng-content></ng-content>',
  styleUrls: ['./data-display-label.component.scss']
})
export class NxDataDisplayLabelComponent {}
