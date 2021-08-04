import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Types of figures. */
export type FigureType = 'auto' | '1by1' | '1dot8by1' | '1dot2by1' | '1by1dot1' | '2dot6by1' | 'rounded';
/** @docs-private */
export type figureSizes = 'auto' | '1by1' | '1dot8by1' | '1dot2by1' | '1by1dot1' | '2dot6by1';

const DEFAULT_SIZE = 'auto';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'figure[nxFigure]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./figure.component.scss'],
  host: {
    '[class.nx-image]': 'true',
    '[class.nx-image--auto]': 'size === "auto" && !rounded',
    '[class.nx-image--1by1]': 'size === "1by1"',
    '[class.nx-image--1dot8by1]': 'size === "1dot8by1"',
    '[class.nx-image--1dot2by1]': 'size === "1dot2by1"',
    '[class.nx-image--1by1dot1]': 'size === "1by1dot1"',
    '[class.nx-image--2dot6by1]': 'size === "2dot6by1"',
    '[class.nx-image--rounded]': 'rounded'
  }
})
export class NxFigureComponent {
  private _classNames!: FigureType;

  /** @docs-private */
  rounded: boolean = false;

  /** @docs-private */
  size: figureSizes = DEFAULT_SIZE;

  /**
   * Sets the type of the visual appearance of the image.
   * The default value  is 'auto'.
   */
  @Input('nxFigure')
  set classNames(value: FigureType) {
    if (this._classNames === value) {
      return;
    }

    this._classNames = value;
    const sizeRegex = /^(auto|1by1|1dot8by1|1dot2by1|1by1dot1|2dot6by1)$/;
    const [size = null] = this._classNames.match(sizeRegex) || [DEFAULT_SIZE];
    this.size = size as any;

    this.rounded = !!this._classNames.match(/rounded/);
  }

  get classNames(): FigureType {
    return this._classNames;
  }

  static ngAcceptInputType_classNames: FigureType | string | null | undefined;
}
