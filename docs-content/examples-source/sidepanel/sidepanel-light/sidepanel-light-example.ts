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
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Light color variant
 */
@Component({
  selector: 'sidepanel-light-example',
  templateUrl: './sidepanel-light-example.html',
  styleUrls: ['sidepanel-light-example.css'],
  imports: [
    NxSidepanelOuterContainerComponent,
    NxRadioToggleComponent,
    FormsModule,
    NxRadioToggleButtonComponent,
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelCloseButtonComponent,
    NxSidepanelContentComponent,
  ],
})
export class SidepanelLightExampleComponent {
  opened = true;
}
