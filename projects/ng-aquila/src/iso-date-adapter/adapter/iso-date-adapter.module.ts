import { NgModule } from '@angular/core';
import { NX_DATE_FORMATS, NX_DATE_LOCALE, NX_DATE_LOCALE_PROVIDER, NxDateAdapter } from '@aposin/ng-aquila/datefield';

import { NxIsoDateAdapter } from './iso-date-adapter';
import { NX_ISO_DATE_FORMATS } from './iso-date-formats';

@NgModule({
    providers: [NX_DATE_LOCALE_PROVIDER, { provide: NxDateAdapter, useClass: NxIsoDateAdapter, deps: [NX_DATE_LOCALE] }],
})
export class IsoDateModule {}

@NgModule({
    imports: [IsoDateModule],
    providers: [{ provide: NX_DATE_FORMATS, useValue: NX_ISO_DATE_FORMATS }],
})
export class NxIsoDateModule {}
