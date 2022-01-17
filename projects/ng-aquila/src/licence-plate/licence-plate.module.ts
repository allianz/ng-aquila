import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxLicencePlateEuroPrefixComponent } from './licence-plate-euro-prefix.component';
import { NxLicencePlateSeasonSuffixComponent } from './licence-plate-season-suffix.component';
import { NxLicencePlateValidatorDirective } from './licence-plate.validator';

@NgModule({
    declarations: [NxLicencePlateValidatorDirective, NxLicencePlateEuroPrefixComponent, NxLicencePlateSeasonSuffixComponent],
    imports: [CommonModule],
    exports: [NxLicencePlateValidatorDirective, NxLicencePlateEuroPrefixComponent, NxLicencePlateSeasonSuffixComponent],
})
export class NxLicencePlateModule {}
