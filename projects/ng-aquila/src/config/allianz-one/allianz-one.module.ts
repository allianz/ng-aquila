import { InjectionToken, NgModule } from '@angular/core';
import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';

export interface AllianzOneOptions {}

export const ALLIANZ_ONE = new InjectionToken<AllianzOneOptions>('ALLIANZ_ONE');

const formfieldDefaultOptions: FormfieldDefaultOptions = {
    nxFloatLabel: 'always',
    appearance: 'outline',
};

const allianzOneOptions: AllianzOneOptions = {};

@NgModule({
    providers: [
        { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDefaultOptions },
        { provide: ALLIANZ_ONE, useValue: allianzOneOptions },
    ],
})
export class NxAllianzOneModule {}
