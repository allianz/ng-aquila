import { NgModule } from '@angular/core';

import { NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective } from './footer.component';

@NgModule({
    imports: [],
    declarations: [NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective],
    exports: [NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective],
})
export class NxFooterModule {}
