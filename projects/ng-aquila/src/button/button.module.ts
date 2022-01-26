import { NgModule } from '@angular/core';

import { NxAnchorButtonComponent } from './anchor-button.component';
import { NxAnchorIconButtonComponent } from './anchor-icon-button.component';
import { NxAnchorPlainButtonComponent } from './anchor-plain-button.component';
import { NxButtonComponent } from './button.component';
import { NxIconButtonComponent } from './icon-button.component';
import { NxPlainButtonComponent } from './plain-button.component';

@NgModule({
    declarations: [
        NxButtonComponent,
        NxIconButtonComponent,
        NxPlainButtonComponent,
        NxAnchorButtonComponent,
        NxAnchorIconButtonComponent,
        NxAnchorPlainButtonComponent,
    ],
    exports: [
        NxButtonComponent,
        NxIconButtonComponent,
        NxPlainButtonComponent,
        NxAnchorButtonComponent,
        NxAnchorIconButtonComponent,
        NxAnchorPlainButtonComponent,
    ],
})
export class NxButtonModule {}
