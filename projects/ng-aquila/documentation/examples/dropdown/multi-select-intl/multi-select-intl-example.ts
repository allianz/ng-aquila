import { Component } from '@angular/core';
import {
    NxDropdownIntl,
    NxMultiSelectComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

class MyDropdownIntl extends NxDropdownIntl {
    selectAll = `Alle auswählen`;
    clearAll = `Alle abwählen`;
}
/**
 * @title Multi select intl example
 */
@Component({
    selector: 'multi-select-intl-example',
    templateUrl: './multi-select-intl-example.html',
    styleUrls: ['./multi-select-intl-example.css'],
    providers: [{ provide: NxDropdownIntl, useClass: MyDropdownIntl }],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxMultiSelectComponent,
    ],
})
export class MultiSelectIntlExampleComponent {
    options = ['Apple', 'Orange', 'Plum', 'Cherry'];
}
