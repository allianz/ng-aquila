import { LoadableStyle } from '@allianz/ng-aquila/config';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';

import { LAYOUT_DEFAULT_OPTIONS } from './layout-appearance.model';

@Component({
  selector: 'nx-grid-styles-loader',
  standalone: true,
  template: '',
  styles: [
    `
      /* The functional appearance swaps for grid spacing token */
      :root:has(nx-grid-styles-loader.nx-grid--functional),
      :host:has(nx-grid-styles-loader.nx-grid--functional) {
        /* outer inset of the container: media-query, container-query grids */
        --layout-inset-mobile: var(--layout-inset-mobile-functional);
        --layout-inset-base: var(--layout-inset-base-functional);
        --layout-inset-container-mobile: var(--layout-inset-container-mobile-functional);
        --layout-inset-container-base: var(--layout-inset-container-base-functional);
        --layout-inset-container-large: var(--layout-inset-container-large-functional);

        /* Gutter between columns */
        --grid-gutter-width-mobile: var(--grid-gutter-width-mobile-functional);
        --grid-gutter-width-base: var(--grid-gutter-width-base-functional);
        --grid-gutter-width-large: var(--grid-gutter-width-large-functional);
      }
    `,
  ],
  host: {
    '[class.nx-grid--functional]': 'functionalGrid()',
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class GridStylesLoaderComponent implements LoadableStyle {
  readonly addHtmlElement = true;

  private readonly layoutOptions = inject(LAYOUT_DEFAULT_OPTIONS, { optional: true });
  protected readonly functionalGrid = computed(
    () => this.layoutOptions?.appearance() === 'functional',
  );
}
