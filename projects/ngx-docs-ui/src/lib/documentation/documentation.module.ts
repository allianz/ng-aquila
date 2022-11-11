import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ROUTES } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { ExampleFullScreenModule } from '../example-full-screen/example-full-screen.module';
import { ComponentService } from '../service/component.service';
import { ManifestService } from '../service/manifest.service';
import { NXV_FOOTER } from './../core/tokens';
import { NxvDocumentationConfig } from './../core/types';
import { ComponentPageModule } from './component-documentation/component-page/component-page.module';
import { NxvDocumentationPageModule } from './component-documentation/documentation-page.module';
import { NxvOverviewModule } from './component-documentation/overview/overview.module';
import { NxvVersionSelectModule } from './component-documentation/version-select/version-select.module';
import { CssVarSidebarModule } from './css-vars-sandbox/css-var-sandbox.module';
import { DocumentationFrameComponent } from './documentation-frame.component';
import { NxvGuideViewModule } from './guides/guide-view/guide-view.module';
import { NxvGuidesModule } from './guides/guides.module';
import { UploadInterceptor } from './http-interceptors/upload-interceptor';
import { createViewerRoutes } from './routes';
import { NxvSearchInputModule } from './search-input/search-input.module';
import { NxvTableOfContentsModule } from './table-of-contents/table-of-contents.module';
import { NxvThemeSwitcherModule } from './theme-switcher/theme-switcher.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentPageModule,
        NxvGuidesModule,
        NxvGuideViewModule,
        NxvTableOfContentsModule,
        NxvOverviewModule,
        NxvDocumentationPageModule,
        NxHeaderModule,
        NxIconModule,
        NxButtonModule,
        NxLinkModule,
        FormsModule,
        NxvVersionSelectModule,
        NxvThemeSwitcherModule,
        CssVarSidebarModule,
        ExampleFullScreenModule,
        NxvSearchInputModule,
    ],
    exports: [RouterModule],
    declarations: [DocumentationFrameComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UploadInterceptor,
            multi: true,
        },
    ],
})
export class NxvDocumentationModule {
    static forRoot(args: NxvDocumentationConfig): ModuleWithProviders<NxvDocumentationModule> {
        return {
            ngModule: NxvDocumentationModule,
            providers: [
                ManifestService,
                ComponentService,
                { provide: ROUTES, useValue: createViewerRoutes(args), multi: true },
                { provide: NXV_FOOTER, useValue: args.footerComponent },
            ],
        };
    }
}
