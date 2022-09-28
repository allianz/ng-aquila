import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { NxGridModule } from '@allianz/ng-aquila/grid';
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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { LazyLoadingService } from 'projects/ng-aquila/documentation/generated/lazy-loading.service';
import MANIFEST from 'projects/ng-aquila/documentation/generated/manifest.json';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';

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

const channels = environment.VERSIONS.channels.map((channel: any) => ({
    name: channel,
    url: (environment.VERSIONS.urls as { [key: string]: string })[channel],
}));

const VERSIONS: DocVersions = {
    currentVersion: environment.CURRENT_VERSION,
    currentChannel: environment.CURRENT_CHANNEL,
    channels,
};

const LOGO_PATH: LogoPath = {
    logoWithTitlePath: 'assets/logos/aposin_logo.svg',
};

const GITHUB_REPO_LINK: GithubLinkConfig = {
    repoLink: 'https://github.com/allianz/ng-aquila',
    logoAltText: 'Github Brand Logo',
};

@NgModule({
    declarations: [AppComponent, WelcomeComponent, FooterComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, { enableTracing: false, relativeLinkResolution: 'legacy' }),
        NxvDocumentationModule.forRoot({
            welcomeComponent: WelcomeComponent,
            footerComponent: FooterComponent,
        }),
        BrowserAnimationsModule,
        ColorPickerModule,
        NxDocumentationIconModule,
        NxFooterModule,
        NxButtonModule,
        NxGridModule,
    ],
    providers: [
        { provide: NX_DOCS_LOGO_PATH, useValue: LOGO_PATH },
        { provide: NXV_MANIFEST_TOKEN, useValue: MANIFEST },
        { provide: NX_DOC_VERSIONS, useValue: VERSIONS },
        {
            provide: NX_DOCS_SELECTABLE_THEMES,
            useValue: [
                { name: 'docs-dark', displayName: 'Default', url: 'assets/aposin.css' },
                { name: 'expert', displayName: 'Expert', url: 'assets/expert.css' },
            ],
        },
        { provide: NX_DOCS_FEATURE_FLAGS, useValue: { themeSwitcher: true } },
        { provide: NX_DOCS_GITHUB_LINK, useValue: GITHUB_REPO_LINK },
        { provide: BaseLazyLoadingService, useExisting: LazyLoadingService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
