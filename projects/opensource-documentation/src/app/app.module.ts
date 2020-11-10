import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NX_DOCS_SELECTABLE_THEMES, NX_DOCS_FEATURE_FLAGS, NX_DOCS_LOGO_PATH, LogoPath, NX_DOCS_GITHUB_LINK, GithubLinkConfig } from '@aposin/ngx-docs-ui';
import { DocVersions, NXV_MANIFEST_TOKEN, NxvDocumentationModule, NX_DOC_VERSIONS } from '@aposin/ngx-docs-ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import MANIFEST from 'projects/ng-aquila/documentation/generated/manifest.json';
import { ColorPickerModule } from 'ngx-color-picker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { DemoThemingService } from './demo-theming.service';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { LazyLoadingService } from 'projects/ng-aquila/documentation/generated/lazy-loading.service';
import { BaseLazyLoadingService } from '@aposin/ngx-docs-ui';

const ROUTES = [
  {
    path: '', pathMatch: 'full', redirectTo: '/welcome'
  },
  {
    path: 'my-viewer', pathMatch: 'full', redirectTo: ''
  }
];

const channels = environment.VERSIONS.channels.map(channel => {
  return { name: channel, url: environment.VERSIONS.urls[channel]};
});

const VERSIONS: DocVersions = {
  currentVersion: environment.CURRENT_VERSION,
  currentChannel: environment.CURRENT_CHANNEL,
  channels
};

const LOGO_PATH: LogoPath = {
  logoWithTitlePath: 'assets/logos/aposin_logo_with_text.svg',
};

const GITHUB_REPO_LINK: GithubLinkConfig = {
  repoLink: 'https://github.com/aposin/ng-aquila',
  logoAltText: 'Github Brand Logo'
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false }),
    NxvDocumentationModule.forRoot(
      {
        welcomeComponent: WelcomeComponent,
        footerComponent: FooterComponent
      }
    ),
    BrowserAnimationsModule,
    ColorPickerModule,
    NxDocumentationIconModule,
    NxFooterModule,
    NxButtonModule
  ],
  providers: [
    { provide: NX_DOCS_LOGO_PATH, useValue: LOGO_PATH },
    { provide: NXV_MANIFEST_TOKEN, useValue: MANIFEST },
    { provide: NX_DOC_VERSIONS, useValue: VERSIONS},
    { provide: NX_DOCS_SELECTABLE_THEMES, useValue: [
      { name: 'docs-dark', displayName: 'Default', url: 'assets/aposin.css' },
      { name: 'expert', displayName: 'Expert', url: 'assets/expert.css' }
    ]},
    { provide: NX_DOCS_FEATURE_FLAGS, useValue: { themeSwitcher: true} },
    { provide: NX_DOCS_GITHUB_LINK, useValue: GITHUB_REPO_LINK },
    { provide: BaseDemoThemingService, useClass: DemoThemingService },
    { provide: BaseLazyLoadingService, useExisting: LazyLoadingService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
