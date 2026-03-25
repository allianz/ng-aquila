import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@allianz/ng-aquila/formfield';
import { NgModule, signal } from '@angular/core';

const formfieldDefaultOptions: FormfieldDefaultOptions = {
  nxFloatLabel: 'always',
  appearance: 'outline',
};

const allianzOneOptions: AllianzOneOptions = {
  enabled: signal(true),
};

@NgModule({
  providers: [
    { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDefaultOptions },
    { provide: ALLIANZ_ONE, useValue: allianzOneOptions },
  ],
})
export class NxAllianzOneModule {}
