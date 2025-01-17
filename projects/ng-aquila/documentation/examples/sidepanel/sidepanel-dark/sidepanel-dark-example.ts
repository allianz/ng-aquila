import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';
import {
    NxSidepanelCloseButtonComponent,
    NxSidepanelComponent,
    NxSidepanelContentComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelOuterContainerComponent,
} from '@aposin/ng-aquila/sidepanel';

/**
 * @title Default appearance
 */
@Component({
    selector: 'sidepanel-dark-example',
    templateUrl: './sidepanel-dark-example.html',
    styleUrls: ['sidepanel-dark-example.css'],
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
export class SidepanelDarkExampleComponent {
    opened = true;
}
