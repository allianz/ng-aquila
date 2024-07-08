import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxLicencePlateValidatorDirective } from './licence-plate.validator';
import { NxLicencePlateEuroPrefixComponent } from './licence-plate-euro-prefix.component';
import { NxLicencePlateSeasonSuffixComponent } from './licence-plate-season-suffix.component';

@NgModule({
    imports: [CommonModule, NxLicencePlateValidatorDirective, NxLicencePlateEuroPrefixComponent, NxLicencePlateSeasonSuffixComponent],
    exports: [NxLicencePlateValidatorDirective, NxLicencePlateEuroPrefixComponent, NxLicencePlateSeasonSuffixComponent],
})
export class NxLicencePlateModule {}
