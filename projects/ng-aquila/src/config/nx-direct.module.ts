import { NgModule } from '@angular/core';
import { FormfieldDefaultOptions, FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';

const formfieldDirectOptions: FormfieldDefaultOptions = {
    nxFloatLabel: 'always',
};

@NgModule({
    providers: [{ provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDirectOptions }],
})
export class NxDirectModule {}
