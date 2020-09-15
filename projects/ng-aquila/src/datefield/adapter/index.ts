import { NX_NATIVE_DATE_FORMATS } from './native-date-formats';
import { NxNativeDateAdapter } from './native-date-adapter';
import { NX_DATE_FORMATS } from './date-formats';
import { NgModule } from '@angular/core';
import {InjectionToken, LOCALE_ID} from '@angular/core';
import { NxDateAdapter } from './date-adapter';
import { NX_DATE_LOCALE } from './date-token';

import { PlatformModule } from '@angular/cdk/platform';

export const NX_DATE_LOCALE_PROVIDER = {provide: NX_DATE_LOCALE, useExisting: LOCALE_ID};

export * from './date-token';
export * from './date-adapter';
export * from './date-formats';

export * from './native-date-adapter';
export * from './native-date-formats';

@NgModule({
  imports: [PlatformModule],
  providers: [
    {provide: NxDateAdapter, useClass: NxNativeDateAdapter},
    NX_DATE_LOCALE_PROVIDER
  ],
})
export class NativeDateModule {}

@NgModule({
  imports: [NativeDateModule],
  providers: [{provide: NX_DATE_FORMATS, useValue: NX_NATIVE_DATE_FORMATS}],
})
export class NxNativeDateModule {}
