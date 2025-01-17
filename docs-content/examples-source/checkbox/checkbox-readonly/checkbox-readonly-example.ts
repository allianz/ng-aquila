import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Readonly checkbox
 */
@Component({
    selector: 'checkbox-readonly-example',
    templateUrl: './checkbox-readonly-example.html',
    styleUrls: ['./checkbox-readonly-example.css'],
    imports: [NxCheckboxComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxReadonlyExampleComponent {
    readonly = true;
}
