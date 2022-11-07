import { Component } from '@angular/core';
import { NxDropdownIntl } from '@aposin/ng-aquila/dropdown';

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
})
export class MultiSelectIntlExampleComponent {
    options = ['Apple', 'Orange', 'Plum', 'Cherry'];
}
