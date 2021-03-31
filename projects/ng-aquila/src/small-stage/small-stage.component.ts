import { Component, Input, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import { NxSmallStageEndImageDirective } from './directives/end-image.directive';
import { NxSmallStageStartImageDirective } from './directives/start-image.directive';
import { NxSmallStageNarrowScreenImageDirective } from './directives/narrow-screen-image.directive';
import { NxSmallStageContentDirective } from './directives/content.directive';
import { NxSmallStageHeaderDirective } from './directives/header.directive';

@Component({
  selector: 'nx-small-stage',
  templateUrl: './small-stage.component.html',
  styleUrls: ['./small-stage.component.scss'],
  host: {
    '[class.nx-small-stage]': 'true',
    '[class.nx-small-stage--content-narrow]': '_isContentNarrow',
    '[class.nx-small-stage--only-start-image]': '_startImage && !_endImage',
    '[class.nx-small-stage--only-end-image]': '!_startImage && _endImage',
    '[class.nx-small-stage--two-images]': '_startImage && _endImage',
    '[class.nx-small-stage--w-header]': '_header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSmallStageComponent {
  @ContentChild(NxSmallStageEndImageDirective) _endImage: NxSmallStageEndImageDirective;
  @ContentChild(NxSmallStageStartImageDirective) _startImage: NxSmallStageStartImageDirective;
  @ContentChild(NxSmallStageNarrowScreenImageDirective) _narrowScreenImage: NxSmallStageNarrowScreenImageDirective;
  @ContentChild(NxSmallStageContentDirective) _content: NxSmallStageContentDirective;
  @ContentChild(NxSmallStageHeaderDirective) _header: NxSmallStageHeaderDirective;

  /** @docs-private */
  get _startImageInlineStyle(): string {
    return `url(${this._startImage?.src})`;
  }
  /** @docs-private */
  get _endImageInlineStyle(): string {
    return `url(${this._endImage?.src})`;
  }

  /** @docs-private */
  get _narrowScreenImageInlineStyle(): string {
    return `url(${this._narrowScreenImage?.src || this._endImage?.src || this._startImage?.src})`;
  }

  /** @docs-private */
  get _isContentNarrow(): boolean {
    return this._content?.narrow;
  }

  /** @docs-private */
  get narrowScreenImageInnerClassNames(): string[] {
    return [
      'image-container-narrow-screen__inner',
      `image-container-narrow-screen__inner--${this._narrowScreenImage?.position || 'end'}`,
    ];
  }
}
