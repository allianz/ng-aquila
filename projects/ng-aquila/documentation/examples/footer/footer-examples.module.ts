import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { FooterExampleComponent } from './footer/footer-example';

const EXAMPLES = [FooterExampleComponent];

@NgModule({
    imports: [NxFooterModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class FooterExamplesModule {
    static components() {
        return {
            footer: FooterExampleComponent,
        };
    }
}
