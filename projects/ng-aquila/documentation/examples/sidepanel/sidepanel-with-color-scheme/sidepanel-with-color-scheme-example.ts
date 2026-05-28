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
 * @title Sidepanel with color scheme example
 */
@Component({
  selector: 'sidepanel-with-color-scheme-example',
  templateUrl: './sidepanel-with-color-scheme-example.html',
  styleUrls: ['sidepanel-with-color-scheme-example.css'],
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
export class SidepanelWithColorSchemeExampleComponent {
  opened = true;
}
