import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Checkbox States
 */
@Component({
    selector: 'checkbox-states-example',
    templateUrl: './checkbox-states-example.html',
    styleUrls: ['./checkbox-states-example.css'],
    imports: [NxCheckboxComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxStatesExampleComponent {}
