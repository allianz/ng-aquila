import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Outlet for nested CdkNode. Put `[nxTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
@Directive({
    selector: '[nxTreeNodeOutlet]',
})
export class NxTreeNodeOutletDirective implements CdkTreeNodeOutlet {
    constructor(readonly viewContainer: ViewContainerRef) {}
}
