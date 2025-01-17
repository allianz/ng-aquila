import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';

/**
 * @title Readonly Toggle Button Example
 */
@Component({
    selector: 'radio-toggle-readonly-example',
    imports: [NxRadioToggleButtonComponent, NxRadioToggleComponent],
    templateUrl: './radio-toggle-readonly-example.html',
    styleUrl: './radio-toggle-readonly-example.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioToggleReadonlyExampleComponent {}
