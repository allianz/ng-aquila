import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
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
  NxLicencePlateEuroPrefixComponent,
  NxLicencePlateSeasonSuffixComponent,
  NxLicencePlateValidatorDirective,
} from '@allianz/ng-aquila/licence-plate';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Licence plate standard disabled (Germany)
 */
@Component({
  selector: 'licence-plate-disabled-example',
  templateUrl: 'licence-plate-disabled-example.html',
  styleUrls: ['licence-plate-disabled-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxLicencePlateEuroPrefixComponent,
    NxFormfieldPrefixDirective,
    NxInputDirective,
    FormsModule,
    NxLicencePlateValidatorDirective,
    NxLicencePlateSeasonSuffixComponent,
    NxFormfieldSuffixDirective,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxCheckboxComponent,
  ],
})
export class LicencePlateDisabledExampleComponent {
  disabled = true;
  value = '';
}
