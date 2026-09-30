import { NxNativeDateModule } from '@allianz/ng-aquila/datefield';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withJsonpSupport(), withInterceptorsFromDi()),
    // The example components are rendered standalone, so root-level providers their
    // documentation module would normally contribute have to be repeated here.
    importProvidersFrom(NxNativeDateModule, NxModalModule.forRoot(), NxMessageModule),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideClientHydration(),
  ],
};
