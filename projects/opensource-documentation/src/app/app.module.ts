import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMaskModule } from '@aposin/ng-aquila/mask';
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
} from '@aposin/ngx-docs-ui';
import { ColorPickerModule } from 'ngx-color-picker';
import { LazyLoadingService } from 'projects/ng-aquila/documentation/generated/lazy-loading.service';
import MANIFEST from 'projects/ng-aquila/documentation/generated/manifest.json';
import PACKAGE from 'projects/ng-aquila/src/package.json';
import VERSIONS from 'versions.json';

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

const DOC_VERSIONS: DocVersions = {
    currentVersion: PACKAGE.version,
    currentChannel: 'stable',
    channels: VERSIONS.channels.map(channel => ({
        name: channel,
        url: (VERSIONS.urls as { [key: string]: string })[channel],
    })),
};

const DOCS_THEMES = [
    { name: 'docs-dark', displayName: 'Default', url: 'assets/aposin.css' },
    { name: 'expert', displayName: 'Expert', url: 'assets/expert.css' },
];

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
        RouterModule.forRoot(ROUTES, { enableTracing: false }),
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
        ReactiveFormsModule,
        NxFormfieldModule,
        NxInputModule,
        NxMaskModule,
    ],
    providers: [
        { provide: NX_DOCS_LOGO_PATH, useValue: LOGO_PATH },
        { provide: NXV_MANIFEST_TOKEN, useValue: MANIFEST },
        { provide: NX_DOC_VERSIONS, useValue: DOC_VERSIONS },
        { provide: NX_DOCS_SELECTABLE_THEMES, useValue: DOCS_THEMES },
        { provide: NX_DOCS_FEATURE_FLAGS, useValue: { themeSwitcher: true } },
        { provide: NX_DOCS_GITHUB_LINK, useValue: GITHUB_REPO_LINK },
        { provide: BaseLazyLoadingService, useExisting: LazyLoadingService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
