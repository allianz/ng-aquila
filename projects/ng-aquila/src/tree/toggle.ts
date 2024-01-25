import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive } from '@angular/core';

/**
 * Wrapper for the CdkTree's toggle with custom design styles.
 */
@Directive({
    selector: '[nxTreeNodeToggle]',
    inputs: ['recursive: nxTreeNodeToggleRecursive'],
    providers: [{ provide: CdkTreeNodeToggle, useExisting: NxTreeNodeToggleDirective }],
})
export class NxTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {}
