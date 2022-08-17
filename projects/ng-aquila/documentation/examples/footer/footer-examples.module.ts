import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxFooterModule } from '@aposin/ng-aquila/footer';

import { FooterBasicExampleComponent } from './footer-basic/footer-basic-example';

const EXAMPLES = [FooterBasicExampleComponent];

@NgModule({
    imports: [NxFooterModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class FooterExamplesModule {
    static components() {
        return {
            'footer-basic': FooterBasicExampleComponent,
        };
    }
}
