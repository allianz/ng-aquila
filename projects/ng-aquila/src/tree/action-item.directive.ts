import { CdkTreeNode } from '@angular/cdk/tree';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[nxTreeNodeActionItem]',

    host: {
        '[attr.tabindex]': '-1',
        '[attr.role]': '"treeitem"',
        '[attr.aria-level]': '_treeNode?.level + 1',
    },
})
export class NxTreeNodeActionItem<T> {
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _treeNode: CdkTreeNode<T>,
    ) {}

    focus() {
        this._elementRef.nativeElement.focus();
    }
}
