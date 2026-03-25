import { InjectionToken, Signal } from '@angular/core';

export interface AllianzOneOptions {
  enabled?: Signal<boolean>;
}

export const ALLIANZ_ONE = new InjectionToken<AllianzOneOptions>('ALLIANZ_ONE');
