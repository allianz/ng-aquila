import { NgModule } from '@angular/core';
import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';

const formfieldDirectOptions: FormfieldDefaultOptions = {
    nxFloatLabel: 'always',
};

@NgModule({
    providers: [{ provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDirectOptions }],
})
export class NxDirectModule {}
