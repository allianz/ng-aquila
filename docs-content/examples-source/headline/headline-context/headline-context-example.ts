import {
  NX_HEADLINE_CONTEXT,
  NxHeadlineComponent,
  type NxHeadlineContext,
  type NxHeadlineSize,
} from '@allianz/ng-aquila/headline';
import { Component, input, signal } from '@angular/core';

/**
 * @title Imposing a size via NX_HEADLINE_CONTEXT
 */

/** Wrapper that owns the size of any `nxHeadline` rendered inside it, e.g. for a card grid. */
@Component({
  selector: 'headline-context-card-example',
  template: `
    <div class="example-card">
      <ng-content />
    </div>
  `,
  styleUrls: ['./headline-context-example.css'],
  providers: [
    {
      provide: NX_HEADLINE_CONTEXT,
      useExisting: HeadlineContextCardExampleComponent,
    },
  ],
})
export class HeadlineContextCardExampleComponent implements NxHeadlineContext {
  readonly headlineSize = input<NxHeadlineSize>('2xl');
}

@Component({
  selector: 'headline-context-example',
  templateUrl: './headline-context-example.html',
  styleUrls: ['./headline-context-example.css'],
  imports: [NxHeadlineComponent, HeadlineContextCardExampleComponent],
})
export class HeadlineContextExampleComponent {
  readonly cardSize = signal<NxHeadlineSize>('2xl');
  readonly sizes: NxHeadlineSize[] = ['m', 'l', 'xl', '2xl', '3xl'];
}
