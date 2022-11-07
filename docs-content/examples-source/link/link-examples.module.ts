import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { LinkBlackExampleComponent } from './link-black/link-black-example';
import { LinkDefaultExampleComponent } from './link-default/link-default-example';
import { LinkIconsExampleComponent } from './link-icons/link-icons-example';
import { LinkMultipleExampleComponent } from './link-multiple/link-multiple-example';
import { LinkNegativeExampleComponent } from './link-negative/link-negative-example';
import { LinkSizeExampleComponent } from './link-size/link-size-example';
import { LinkWithinTextExampleComponent } from './link-within-text/link-within-text-example';

const EXAMPLES = [
    LinkBlackExampleComponent,
    LinkDefaultExampleComponent,
    LinkIconsExampleComponent,
    LinkMultipleExampleComponent,
    LinkNegativeExampleComponent,
    LinkSizeExampleComponent,
    LinkWithinTextExampleComponent,
];

@NgModule({
    imports: [NxLinkModule, NxIconModule, NxCopytextModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class LinkExamplesModule {
    static components() {
        return {
            'link-black': LinkBlackExampleComponent,
            'link-default': LinkDefaultExampleComponent,
            'link-icons': LinkIconsExampleComponent,
            'link-multiple': LinkMultipleExampleComponent,
            'link-negative': LinkNegativeExampleComponent,
            'link-size': LinkSizeExampleComponent,
            'link-within-text': LinkWithinTextExampleComponent,
        };
    }
}
