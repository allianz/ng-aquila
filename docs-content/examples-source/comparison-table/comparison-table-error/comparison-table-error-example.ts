import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'comparison-table-error-example',
    templateUrl: './comparison-table-error-example.html',
    styleUrls: ['./comparison-table-error-example.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableErrorExample {
    constructor() {}
    control = new FormControl(null);

    select(v: any) {
        this.control.setValue(v);
    }
}
