import { Directive, Input } from '@angular/core';

/** A directive for passing info about start image to small stage component. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-small-stage-start-image'
})
export class NxSmallStageStartImageDirective {
  /* Sets the source for loading the image */
  @Input() src: string;
}
