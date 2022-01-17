import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

/** @docs-private */
@Directive({ selector: '[nxTabLabel]' })
export class NxTabLabelDirective extends CdkPortal {}
