import { NxErrorComponent } from '@allianz/ng-aquila/base';
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
 * @title Licence plate ngModel
 */
@Component({
  selector: 'licence-plate-ngmodel-example',
  templateUrl: 'licence-plate-ngmodel-example.html',
  styleUrls: ['licence-plate-ngmodel-example.css'],
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
  ],
})
export class LicencePlateNgmodelExampleComponent {
  model = '';
}
