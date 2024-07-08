import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

/** @docs-private */
@Directive({
    selector: '[nxTabLabel]',
    standalone: true,
})
export class NxTabLabelDirective extends CdkPortal {}
