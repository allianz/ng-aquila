import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PLAYGROUND_PAGES } from '../playground-pages';

@Component({
  selector: 'ssr-home',
  templateUrl: './home.component.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly _renderedOnServer = isPlatformServer(inject(PLATFORM_ID));
  protected readonly _pages = PLAYGROUND_PAGES;
  protected readonly _exampleCount = PLAYGROUND_PAGES.reduce(
    (total, page) => total + Object.keys(page.examples).length,
    0,
  );
}
