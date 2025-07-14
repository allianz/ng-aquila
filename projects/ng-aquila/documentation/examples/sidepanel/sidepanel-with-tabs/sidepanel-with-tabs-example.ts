import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import {
  NxSidepanelCloseButtonComponent,
  NxSidepanelComponent,
  NxSidepanelContentComponent,
  NxSidepanelHeaderComponent,
  NxSidepanelOuterContainerComponent,
} from '@allianz/ng-aquila/sidepanel';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Example with tabs
 */
@Component({
  selector: 'sidepanel-with-tabs-example',
  templateUrl: './sidepanel-with-tabs-example.html',
  styleUrls: ['sidepanel-with-tabs-example.css'],
  imports: [
    NxSidepanelOuterContainerComponent,
    NxRadioToggleComponent,
    FormsModule,
    NxRadioToggleButtonComponent,
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelCloseButtonComponent,
    NxSidepanelContentComponent,
    NxTabGroupComponent,
    NxTabComponent,
  ],
})
export class SidepanelWithTabsExampleComponent {
  opened = true;
}
