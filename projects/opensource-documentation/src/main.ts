import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxMaskModule } from '@allianz/ng-aquila/mask';
import {
  BaseLazyLoadingService,
  DocVersions,
  GithubLinkConfig,
  LogoPath,
  NX_DOC_VERSIONS,
  NX_DOCS_FEATURE_FLAGS,
  NX_DOCS_GITHUB_LINK,
  NX_DOCS_LOGO_PATH,
  NX_DOCS_SELECTABLE_THEMES,
  NXV_MANIFEST_TOKEN,
  NxvDocumentationModule,
} from '@allianz/ngx-docs-ui';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { LazyLoadingService } from 'projects/ng-aquila/documentation/generated/lazy-loading.service';
import MANIFEST from 'projects/ng-aquila/documentation/generated/manifest.json';
import PACKAGE from 'projects/ng-aquila/src/package.json';
import VERSIONS from 'versions.json';

import { AppComponent } from './app/app.component';
import { FooterComponent } from './app/footer/footer.component';
import { WelcomeComponent } from './app/welcome/welcome.component';

const LOGO_PATH: LogoPath = {
  logoWithTitlePath: 'assets/logos/aposin_logo.svg',
};
const DOC_VERSIONS: DocVersions = {
  currentVersion: PACKAGE.version,
  currentChannel: 'stable',
  channels: VERSIONS.channels.map((channel) => ({
    name: channel,
    url: (VERSIONS.urls as { [key: string]: string })[channel],
  })),
};
const DOCS_THEMES = [
  { name: 'docs-dark', displayName: 'Default', url: 'assets/aquila.css' },
  { name: 'expert', displayName: 'Expert', url: 'assets/expert.css' },
];
const GITHUB_REPO_LINK: GithubLinkConfig = {
  repoLink: 'https://github.com/allianz/ng-aquila',
  logoAltText: 'Github Brand Logo',
};
const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    path: 'my-viewer',
    pathMatch: 'full',
    redirectTo: '',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      NxvDocumentationModule.forRoot({
        welcomeComponent: WelcomeComponent,
        footerComponent: FooterComponent,
      }),
      ColorPickerModule,
      NxDocumentationIconModule,
      NxFooterModule,
      NxButtonModule,
      NxGridModule,
      ReactiveFormsModule,
      NxFormfieldModule,
      NxInputModule,
      NxMaskModule,
    ),
    { provide: NX_DOCS_LOGO_PATH, useValue: LOGO_PATH },
    { provide: NXV_MANIFEST_TOKEN, useValue: MANIFEST },
    { provide: NX_DOC_VERSIONS, useValue: DOC_VERSIONS },
    { provide: NX_DOCS_SELECTABLE_THEMES, useValue: DOCS_THEMES },
    { provide: NX_DOCS_FEATURE_FLAGS, useValue: { themeSwitcher: true } },
    { provide: NX_DOCS_GITHUB_LINK, useValue: GITHUB_REPO_LINK },
    { provide: BaseLazyLoadingService, useExisting: LazyLoadingService },
    provideRouter(ROUTES),
    provideZonelessChangeDetection(),
  ],
}).catch((err) => console.error(err));
