import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

export type NxIndicatorPosition = 'over-text' | 'over-icon' | 'after-text' | 'with-overlap';
@Component({
  selector: 'nx-indicator',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./indicator.component.scss'],
  host: {
    '[class.nx-indicator]': 'true',
    '[class.nx-indicator--over-text]': 'this._hasPosition("over-text")',
    '[class.nx-indicator--over-icon]': 'this._hasPosition("over-icon")',
    '[class.nx-indicator--after-text]': 'this._hasPosition("after-text")',
    '[class.nx-indicator--with-overlap]': 'this._hasPosition("with-overlap")',
    '[class.single-letter]': 'this._getTextLength() === 1',
  },
  standalone: true,
})
export class NxIndicatorComponent {
  private readonly _elementRef = inject(ElementRef);

  /**
   * Sets the indicator positioning preset.
   * Should be one or more of 'over-text', 'over-icon', 'after-text', 'with-overlap'.
   */
  @Input() set position(value: string) {
    this._position = value.split(' ') as NxIndicatorPosition[];
  }
  get position(): string {
    return this._position.join(' ');
  }
  private _position: NxIndicatorPosition[] = [];

  _hasPosition(position: NxIndicatorPosition) {
    return this._position.includes(position);
  }

  _getTextLength(): number {
    return this._elementRef.nativeElement.textContent?.trim().length ?? 0;
  }
}
