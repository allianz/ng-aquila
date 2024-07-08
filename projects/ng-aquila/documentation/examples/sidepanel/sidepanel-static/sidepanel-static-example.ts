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
 * @title Static sidepanel example
 */
@Component({
    selector: 'sidepanel-static-example',
    templateUrl: './sidepanel-static-example.html',
    styleUrls: ['sidepanel-static-example.css'],
    standalone: true,
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
