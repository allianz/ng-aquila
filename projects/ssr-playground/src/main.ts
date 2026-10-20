import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => appRef.whenStable())
  // The e2e test waits for this attribute to know hydration has finished.
  .then(() => document.documentElement.setAttribute('data-ssr-stable', ''))
  .catch((err) => console.error(err));
