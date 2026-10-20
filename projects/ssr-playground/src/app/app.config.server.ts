import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { appConfig } from './app.config';
import { SERVER_ROUTES } from './app.routes.server';
import { provideSsrErrorReporting } from './ssr-errors';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(SERVER_ROUTES)), provideSsrErrorReporting()],
};

export const serverAppConfig = mergeApplicationConfig(appConfig, serverConfig);
