import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@allianz/ng-aquila/formfield';
import { InjectionToken, NgModule, Signal, signal } from '@angular/core';

export interface AllianzOneOptions {
  enabled?: Signal<boolean>;
}

export const ALLIANZ_ONE = new InjectionToken<AllianzOneOptions>('ALLIANZ_ONE');

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
