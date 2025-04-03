import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { HeaderExampleComponent } from './header/header-example';
import { HeaderCobrandingExampleComponent } from './header-cobranding/header-cobranding-example';
import { HeaderIconsExampleComponent } from './header-icons/header-icons-example';
import { HeaderIconsResponsiveExampleComponent } from './header-icons-responsive/header-icons-responsive-example';
import { HeaderTwoRowsExampleComponent } from './header-two-rows/header-two-rows-example';
import { HeaderTwoRowsResponsiveExampleComponent } from './header-two-rows-responsive/header-two-rows-responsive-example';
import { HeaderWithSideNavigationExampleComponent } from './header-with-side-navigation/header-with-side-navigation-example';

const EXAMPLES = [
    HeaderExampleComponent,
    HeaderCobrandingExampleComponent,
    HeaderIconsExampleComponent,
    HeaderTwoRowsExampleComponent,
    HeaderTwoRowsResponsiveExampleComponent,
    HeaderIconsResponsiveExampleComponent,
    HeaderWithSideNavigationExampleComponent,
];

@NgModule({
    imports: [
        NxHeaderModule,
        RouterModule,
        NxLinkModule,
        NxButtonModule,
        NxIconModule,
        EXAMPLES,
    ],
    exports: [EXAMPLES],
})
export class HeaderExamplesModule {
    static components() {
        return {
            header: HeaderExampleComponent,
            'header-cobranding': HeaderCobrandingExampleComponent,
            'header-icons': HeaderIconsExampleComponent,
            'header-two-rows': HeaderTwoRowsExampleComponent,
            'header-two-rows-responsive':
                HeaderTwoRowsResponsiveExampleComponent,
            'header-icons-responsive': HeaderIconsResponsiveExampleComponent,
            'header-with-side-navigation':
                HeaderWithSideNavigationExampleComponent,
        };
    }
}
