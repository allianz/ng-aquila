import { NgModule } from '@angular/core';
import { NX_DATE_FORMATS, NX_DATE_LOCALE, NX_DATE_LOCALE_PROVIDER, NxDateAdapter } from '@aposin/ng-aquila/datefield';

import { NxMomentDateAdapter } from './moment-date-adapter';
import { NX_MOMENT_DATE_FORMATS } from './moment-date-formats';

export * from './moment-date-adapter';
export * from './moment-date-formats';

@NgModule({
    providers: [NX_DATE_LOCALE_PROVIDER, { provide: NxDateAdapter, useClass: NxMomentDateAdapter, deps: [NX_DATE_LOCALE] }],
})
export class MomentDateModule {}

@NgModule({
    imports: [MomentDateModule],
    providers: [{ provide: NX_DATE_FORMATS, useValue: NX_MOMENT_DATE_FORMATS }],
})
export class NxMomentDateModule {}
