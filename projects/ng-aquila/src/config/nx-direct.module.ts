import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@allianz/ng-aquila/formfield';
import { NgModule } from '@angular/core';

const formfieldDirectOptions: FormfieldDefaultOptions = {
    nxFloatLabel: 'always',
};

@NgModule({
    providers: [{ provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDirectOptions }],
})
export class NxDirectModule {}
