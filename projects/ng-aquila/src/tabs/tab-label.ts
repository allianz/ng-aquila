import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

/** @docs-private */
@Directive({ selector: '[nxTabLabel]' })
export class NxTabLabelDirective extends CdkPortal {}
