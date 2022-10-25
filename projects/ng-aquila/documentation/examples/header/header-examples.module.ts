import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { HeaderExampleComponent } from './header/header-example';
import { HeaderCobrandingExampleComponent } from './header-cobranding/header-cobranding-example';
import { HeaderIconsExampleComponent } from './header-icons/header-icons-example';
import { HeaderTwoRowsExampleComponent } from './header-two-rows/header-two-rows-example';

const EXAMPLES = [
    HeaderExampleComponent,
    HeaderCobrandingExampleComponent,
    HeaderIconsExampleComponent,
    HeaderTwoRowsExampleComponent,
];

@NgModule({
    imports: [
        NxHeaderModule,
        RouterModule,
        NxLinkModule,
        NxButtonModule,
        NxIconModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class HeaderExamplesModule {
    static components() {
        return {
            header: HeaderExampleComponent,
            'header-cobranding': HeaderCobrandingExampleComponent,
            'header-icons': HeaderIconsExampleComponent,
            'header-two-rows': HeaderTwoRowsExampleComponent,
        };
    }
}
