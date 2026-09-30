import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, Type } from '@angular/core';

import { PLAYGROUND_PAGES } from '../playground-pages';

interface ExampleEntry {
  readonly name: string;
  readonly component: Type<unknown>;
}

@Component({
  selector: 'ssr-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  readonly id = input.required<string>();

  protected readonly _page = computed(() => PLAYGROUND_PAGES.find((page) => page.id === this.id()));

  protected readonly _examples = computed<readonly ExampleEntry[]>(() =>
    Object.entries(this._page()?.examples ?? {}).map(([name, component]) => ({ name, component })),
  );
}
