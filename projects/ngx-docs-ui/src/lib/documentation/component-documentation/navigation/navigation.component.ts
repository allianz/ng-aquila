import { Component, OnDestroy } from '@angular/core';
import { NxFlatTreeControl, NxFlatTreeNode, NxTreeFlatDataSource } from '@aposin/ng-aquila/tree';
import { Subject } from 'rxjs';

import { ComponentDescriptor } from '../../../core/manifest';
import { ManifestService } from '../../../service/manifest.service';

export interface NxTreeNode {
    children?: NxTreeNode[];
    label: string;
    component?: ComponentDescriptor;
}

class MyFlatTreeNode {
    constructor(
        readonly label: string,
        readonly expandable: boolean,
        readonly level: number,
        readonly component?: ComponentDescriptor,
    ) {}
}

@Component({
    selector: 'nxv-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy {
    _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

    _dataSource: NxTreeFlatDataSource<any, any>;

    private readonly _destroyed = new Subject<void>();

    constructor(readonly manifestService: ManifestService) {
        this._treeControl = new NxFlatTreeControl();
        this._dataSource = new NxTreeFlatDataSource(this._treeControl);

        manifestService.manifest.subscribe(() => {
            this._dataSource.data = this.manifestService.getGroupedComponents();
            this._treeControl.expandAll();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;
}
