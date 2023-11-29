import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, RouteReuseStrategy, RouterModule, ROUTES } from '@angular/router';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';

import { ExampleFullScreenModule } from '../example-full-screen/example-full-screen.module';
import { ComponentService } from '../service/component.service';
import { ManifestService } from '../service/manifest.service';
import { NXV_FOOTER } from './../core/tokens';
import { NxvDocumentationConfig } from './../core/types';
import { NxvComponentPage } from './component-documentation/component-page/component-page';
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

class DestroyComponentPageRouteReuseStrategy extends BaseRouteReuseStrategy {
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // the default router settings reuse a component if the route config doesn't change
        // meaning if e.g. only the path param like our component name changes angular is reusing
        // the component behind it and doesn't destroy it. this has the effect on us that all the
        // dynamically injected example components are also not destroyed.
        // so if the route is using the component page we don't want the router to reuse it but instead
        // destroy it properly on every route change.
        if (future.component === NxvComponentPage) {
            return false;
        }
        return super.shouldReuseRoute(future, curr);
    }
}

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
        NxMessageModule,
        NxErrorModule,
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
                { provide: RouteReuseStrategy, useClass: DestroyComponentPageRouteReuseStrategy },
                { provide: ROUTES, useValue: createViewerRoutes(args), multi: true },
                { provide: NXV_FOOTER, useValue: args.footerComponent },
            ],
        };
    }
}
