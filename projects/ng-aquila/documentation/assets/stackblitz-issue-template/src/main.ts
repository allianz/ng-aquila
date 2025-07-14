import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxIsoDateModule } from '@allianz/ng-aquila/iso-date-adapter';

import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { ExampleComponent } from './app/example.component';

bootstrapApplication(ExampleComponent, {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    provideRouter([]),
    importProvidersFrom(NxDocumentationIconModule),
    importProvidersFrom(NxIsoDateModule),
  ],
});
