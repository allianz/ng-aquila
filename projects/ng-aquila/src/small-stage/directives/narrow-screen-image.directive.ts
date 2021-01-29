import { Directive, Input } from '@angular/core';

/** A directive for passing info about image for narrow screens to small stage component. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-small-stage-narrow-screen-image'
})
export class NxSmallStageNarrowScreenImageDirective {
  /* Sets the source for loading the image */
  @Input() src: string;

  /* Control horizontal positioning of the image on screen */
  @Input() position: 'start' | 'center' | 'end' = 'end';
}
