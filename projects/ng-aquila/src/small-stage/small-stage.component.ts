import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'nx-small-stage',
  templateUrl: './small-stage.component.html',
  styleUrls: ['./small-stage.component.scss'],
  host: {
    '[class.nx-small-stage--content-narrow]': 'contentNarrow',
    '[class.nx-small-stage--w-end-offset]': 'offsetEnd',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSmallStageComponent {
  /** Sets the url of the image to be displayed within small stage */
  @Input()
  get imageUrl(): string { return this._imageUrl; }
  set imageUrl(value: string) { this._imageUrl = value; }
  private _imageUrl: string;

  /** Changes appearance of the component for narrow content */
  @Input()
  get contentNarrow(): boolean { return this._contentNarrow; }
  set contentNarrow(value: boolean) { this._contentNarrow = coerceBooleanProperty(value); }
  private _contentNarrow: boolean;

  /** Adds offset to the end of image container */
  @Input()
  get offsetEnd(): boolean { return this._offsetEnd; }
  set offsetEnd(value: boolean) { this._offsetEnd = coerceBooleanProperty(value); }
  private _offsetEnd: boolean;

  /** @docs-private */
  get _imageInlineStyle(): string {
    return `backgroundImage: url(${this._imageUrl})`;
  }

  static ngAcceptInputType_contentNarrow: BooleanInput;
  static ngAcceptInputType_offsetEnd: BooleanInput;
}
