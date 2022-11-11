import { Routes } from '@angular/router';

import { ExampleFullScreenComponent } from './../example-full-screen/example-full-screen.component';
import { ComponentApi } from './component-documentation/component-page/component-api';
import { ComponentExamples } from './component-documentation/component-page/component-examples';
import { ComponentOverview } from './component-documentation/component-page/component-overview';
import { NxvComponentPage } from './component-documentation/component-page/component-page';
import { NxvDocumentationComponent } from './component-documentation/documentation-page.component';
import { NxvOverviewComponent } from './component-documentation/overview/overview.component';
import { DocumentationFrameComponent } from './documentation-frame.component';
import { NxvGuideViewComponent } from './guides/guide-view/guide-view.component';
import { NxvGuidesComponent } from './guides/guides.component';

export const createViewerRoutes: (args: any) => Routes = args => [
    {
        path: 'my-viewer',
        redirectTo: '',
    },
    {
        path: '',
        component: DocumentationFrameComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'welcome',
            },
            {
                path: 'search',
                loadChildren: () => import('./search-results/search-results.module').then(m => m.SearchResultsModule),
            },
            {
                path: 'welcome',
                component: args.welcomeComponent,
            },
            {
                path: 'guides',
                component: NxvGuidesComponent,
                children: [
                    {
                        path: ':id',
                        component: NxvGuideViewComponent,
                    },
                ],
            },
            {
                path: 'documentation',
                component: NxvDocumentationComponent,
                children: [
                    {
                        path: '',
                        component: NxvOverviewComponent,
                    },
                    {
                        path: ':id',
                        component: NxvComponentPage,
                        children: [
                            { path: '', redirectTo: 'overview', pathMatch: 'full' },
                            { path: 'overview', component: ComponentOverview, pathMatch: 'full' },
                            { path: 'api', component: ComponentApi, pathMatch: 'full' },
                            { path: 'examples', component: ComponentExamples, pathMatch: 'full' },
                            { path: '**', redirectTo: 'overview' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: 'examples/:id',
        component: ExampleFullScreenComponent,
    },
];
