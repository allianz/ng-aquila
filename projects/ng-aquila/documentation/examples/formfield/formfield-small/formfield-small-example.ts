import {
  NxAutocompleteComponent,
  NxAutocompleteOptionComponent,
  NxAutocompleteTriggerDirective,
} from '@allianz/ng-aquila/autocomplete';
import {
  NX_DATE_FORMATS,
  NX_DATE_LOCALE,
  NX_DATE_LOCALE_PROVIDER,
  NxDateAdapter,
  NxDatefieldDirective,
  NxDatemaskComponent,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
  NxDateRangeComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
  NxMultiSelectComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
  NxFormfieldLabelDirective,
  NxFormfieldPrefixDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NX_ISO_DATE_FORMATS,
  NxIsoDateAdapter,
} from '@allianz/ng-aquila/iso-date-adapter';
import {
  NxLicencePlateEuroPrefixComponent,
  NxLicencePlateValidatorDirective,
} from '@allianz/ng-aquila/licence-plate';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FruitOption {
  label: string;
  id: number;
}

/**
 * @title Small formfield example
 */
@Component({
  selector: 'formfield-small-example',
  templateUrl: './formfield-small-example.html',
  styleUrls: ['./formfield-small-example.css'],
  providers: [
    NX_DATE_LOCALE_PROVIDER,
    {
      provide: NxDateAdapter,
      useClass: NxIsoDateAdapter,
      deps: [NX_DATE_LOCALE],
    },
    { provide: NX_DATE_FORMATS, useValue: NX_ISO_DATE_FORMATS },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxFormfieldPrefixDirective,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
    NxInputDirective,
    NxAutocompleteTriggerDirective,
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxMultiSelectComponent,
    NxPhoneInputComponent,
    NxLicencePlateEuroPrefixComponent,
    NxLicencePlateValidatorDirective,
    NxTimefieldComponent,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxDatemaskComponent,
    NxDateRangeComponent,
    FormsModule,
  ],
})
export class FormfieldSmallExampleComponent {
  autocompleteOptions = [
    'Chimpanzee',
    'Chinchilla',
    'Chipmunk',
    'Coati',
    'Cicada',
  ];

  dropdownOptions = ['BMW', 'Audi', 'VW', 'Mercedes', 'Porsche'];

  multiSelectOptions: FruitOption[] = [
    { label: 'Apple', id: 1 },
    { label: 'Banana', id: 2 },
    { label: 'Strawberry', id: 3 },
    { label: 'Orange', id: 4 },
  ];

  licenceValue = '';

  timeValue = '12:30';

  currentDate = '2020-01-01';

  customDate = '2020-01-01';

  dateRange: { start: string | null; end: string | null } | null = null;
}
