import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NX_CONTEXT_MENU_SCROLL_STRATEGY,
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
  selector: 'context-menu-scroll-strategy-provider-example',
  templateUrl: './context-menu-scroll-strategy-provider-example.html',
  styleUrls: ['./context-menu-scroll-strategy-provider-example.css'],
  providers: [
    {
      provide: NX_CONTEXT_MENU_SCROLL_STRATEGY,
      useFactory: scrollStrategyFactory,
      deps: [Overlay],
    },
  ],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
  ],
})
export class ContextMenuScrollStrategyProviderExampleComponent {}
