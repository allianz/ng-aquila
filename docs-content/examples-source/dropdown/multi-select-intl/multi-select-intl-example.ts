import {
  NxDropdownIntl,
  NxMultiSelectComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

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
