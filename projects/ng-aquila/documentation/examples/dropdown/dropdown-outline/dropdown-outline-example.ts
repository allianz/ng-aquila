import {
  NxErrorComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import {
  NxDropdownComponent,
  NxDropdownComponent as NxDropdownComponent_1,
  NxDropdownGroupComponent,
  NxDropdownItemComponent,
  NxMultiSelectComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  FORMFIELD_DEFAULT_OPTIONS,
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Outline formfield example
 */
@Component({
  selector: 'dropdown-outline-example',
  templateUrl: './dropdown-outline-example.html',
  styleUrls: ['./dropdown-outline-example.css'],
  providers: [
    {
      provide: FORMFIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', nxFloatLabel: 'always' },
    },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
    NxFormfieldComponent,
    NxDropdownComponent_1,
    NxDropdownItemComponent,
    FormsModule,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxDropdownGroupComponent,
    NxMultiSelectComponent,
    NxInfoIconComponent,
    NxLabelInfoDirective,
  ],
})
export class DropdownOutlineExampleComponent implements AfterContentInit {
  options: string[] = [
    'BMW',
    'Audi',
    'VW',
    'Mercedes',
    'Porsche',
    'Tesla',
    'Lada',
    'Opel',
    'Fiat',
    'Ford',
    'Kia',
    'Toyota',
    'Ferrari',
  ];

  groups = [
    {
      label: 'Birds',
      items: ['Parrot', 'Pidgin', 'Swallow'],
    },
    {
      label: 'Fish',
      items: ['Salmon', 'Mackerel', 'Catfish'],
    },
  ];

  model = 'Catfish';
  modelBlank!: '';

  brands: string[] = [];

  @ViewChild('exampleErrorNgModel', { static: true })
  exampleErrorNgModel!: NxDropdownComponent;

  ngAfterContentInit(): void {
    this.exampleErrorNgModel.ngControl?.control?.markAsTouched();
  }
}
