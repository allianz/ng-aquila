import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective } from './footer.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective],
    exports: [NxFooterComponent, NxFooterCopyrightDirective, NxFooterLinkDirective, NxFooterNavigationDirective],
})
export class NxFooterModule {}
