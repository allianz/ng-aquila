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
 * @title Static sidepanel example
 */
@Component({
  selector: 'sidepanel-static-example',
  templateUrl: './sidepanel-static-example.html',
  styleUrls: ['sidepanel-static-example.css'],
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
export class SidepanelStaticExampleComponent {
  opened = true;
}
