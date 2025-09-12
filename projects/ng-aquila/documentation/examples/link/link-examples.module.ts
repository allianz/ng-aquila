import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkBlackExampleComponent } from './link-black/link-black-example';
import { LinkDefaultExampleComponent } from './link-default/link-default-example';
import { LinkIconsExampleComponent } from './link-icons/link-icons-example';
import { LinkMultipleExampleComponent } from './link-multiple/link-multiple-example';
import { LinkNegativeExampleComponent } from './link-negative/link-negative-example';
import { LinkProminenceExampleComponent } from './link-prominence/link-prominence-example';
import { LinkSizeExampleComponent } from './link-size/link-size-example';
import { LinkTypeExampleComponent } from './link-type/link-type-example';
import { LinkWithinTextExampleComponent } from './link-within-text/link-within-text-example';

const EXAMPLES = [
  LinkBlackExampleComponent,
  LinkDefaultExampleComponent,
  LinkIconsExampleComponent,
  LinkMultipleExampleComponent,
  LinkNegativeExampleComponent,
  LinkProminenceExampleComponent,
  LinkSizeExampleComponent,
  LinkTypeExampleComponent,
  LinkWithinTextExampleComponent,
];

@NgModule({
  imports: [
    NxLinkModule,
    NxIconModule,
    NxCopytextModule,
    RouterModule,
    EXAMPLES,
  ],
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
      'link-type': LinkTypeExampleComponent,
      'link-prominence': LinkProminenceExampleComponent,
      'link-within-text': LinkWithinTextExampleComponent,
    };
  }
}
