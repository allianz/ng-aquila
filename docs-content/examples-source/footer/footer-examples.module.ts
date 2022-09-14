import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxFooterModule } from '@aposin/ng-aquila/footer';

import { FooterBasicExampleComponent } from './footer-basic/footer-basic-example';
import { FooterDefaultCopyrightExampleComponent } from './footer-default-copyright/footer-default-copyright-example';

const EXAMPLES = [
    FooterBasicExampleComponent,
    FooterDefaultCopyrightExampleComponent,
];

@NgModule({
    imports: [NxFooterModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class FooterExamplesModule {
    static components() {
        return {
            'footer-basic': FooterBasicExampleComponent,
            'footer-default-copyright': FooterDefaultCopyrightExampleComponent,
        };
    }
}
