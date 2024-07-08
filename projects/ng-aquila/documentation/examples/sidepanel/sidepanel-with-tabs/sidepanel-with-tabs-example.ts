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
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Example with tabs
 */
@Component({
    selector: 'sidepanel-with-tabs-example',
    templateUrl: './sidepanel-with-tabs-example.html',
    styleUrls: ['sidepanel-with-tabs-example.css'],
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
        NxTabGroupComponent,
        NxTabComponent,
    ],
})
export class SidepanelWithTabsExampleComponent {
    opened = true;
}
