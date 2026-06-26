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
      :root:has(nx-grid-styles-loader.nx-grid--functional),
      :host:has(nx-grid-styles-loader.nx-grid--functional) {
        --layout-inset-mobile: var(--layout-inset-mobile-functional);
        --layout-inset-base: var(--layout-inset-base-functional);
        --grid-gutter-width-mobile: var(--layout-inset-mobile-functional);
        --grid-gutter-width-base: var(--layout-inset-base-functional);
        --grid-gutter-width-large: var(--layout-inset-large-functional);
        --grid-column-gap: var(--grid-column-gap-functional);
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
