import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@allianz/ng-aquila/formfield';
import { InjectionToken, NgModule } from '@angular/core';

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
