import {
  NX_DROPDOWN_SCROLL_STRATEGY,
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
  selector: 'dropdown-scroll-strategy-provider-example',
  templateUrl: './dropdown-scroll-strategy-provider-example.html',
  styleUrls: ['./dropdown-scroll-strategy-provider-example.css'],
  providers: [
    {
      provide: NX_DROPDOWN_SCROLL_STRATEGY,
      useFactory: scrollStrategyFactory,
      deps: [Overlay],
    },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class DropdownScrollStrategyProviderExampleComponent {}
