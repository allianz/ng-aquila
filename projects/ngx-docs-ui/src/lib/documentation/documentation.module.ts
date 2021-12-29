import { NxvDocumentationConfig } from './../core/types';
import { NXV_FOOTER, NXV_TOP_INFO } from './../core/tokens';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ROUTES } from '@angular/router';

import { ComponentService } from '../service/component.service';
import { ManifestService } from '../service/manifest.service';
import { ComponentApi } from './component-documentation/component-page/component-api';
import { ComponentExamples } from './component-documentation/component-page/component-examples';
import { ComponentOverview } from './component-documentation/component-page/component-overview';
import { NxvComponentPage } from './component-documentation/component-page/component-page';
import { ComponentPageModule } from './component-documentation/component-page/component-page.module';
import { NxvDocumentationComponent } from './component-documentation/documentation-page.component';
import { NxvDocumentationPageModule } from './component-documentation/documentation-page.module';
import { NxvOverviewComponent } from './component-documentation/overview/overview.component';
import { NxvOverviewModule } from './component-documentation/overview/overview.module';
import { NxvVersionSelectModule } from './component-documentation/version-select/version-select.module';
import { NxvGuideViewComponent } from './guides/guide-view/guide-view.component';
import { NxvGuideViewModule } from './guides/guide-view/guide-view.module';
import { NxvGuidesComponent } from './guides/guides.component';
import { NxvGuidesModule } from './guides/guides.module';
import { createViewerRoutes } from './routes';
import { NxvTableOfContentsModule } from './table-of-contents/table-of-contents.module';
import { DocumentationFrameComponent } from './documentation-frame.component';
import { NxvThemeSwitcherModule } from './theme-switcher/theme-switcher.module';
import { ExampleFullScreenModule } from '../example-full-screen/example-full-screen.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadInterceptor } from './http-interceptors/upload-interceptor';
import { CssVarSidebarModule } from './css-vars-sandbox/css-var-sandbox.module';

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
                { provide: NXV_TOP_INFO, useValue: args.topInfoComponent },
            ],
        };
    }
}
