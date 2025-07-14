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
 * @title Licence plate expert states
 */
@Component({
  selector: 'licence-plate-expert-states-example',
  templateUrl: 'licence-plate-expert-states-example.html',
  styleUrls: ['licence-plate-expert-states-example.css'],
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
export class LicencePlateExpertStatesExampleComponent {
  disabled = false;
  readonly = false;
  value = '';
}
