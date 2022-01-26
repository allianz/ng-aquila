import { Component } from '@angular/core';
import { NxFlatTreeControl, NxFlatTreeNode, NxTreeFlatDataSource } from '@aposin/ng-aquila/tree';

import { ComponentDescriptor } from '../../../core/manifest';
import { ManifestService } from '../../../service/manifest.service';

export interface NxTreeNode {
    children?: NxTreeNode[];
    label: string;
    component?: ComponentDescriptor;
}

class MyFlatTreeNode {
    constructor(public label: string, public expandable: boolean, public level: number, public component?: ComponentDescriptor) {}
}

@Component({
    selector: 'nxv-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

    _dataSource: NxTreeFlatDataSource<any, any>;

    constructor(public manifestService: ManifestService) {
        this._treeControl = new NxFlatTreeControl();
        this._dataSource = new NxTreeFlatDataSource(this._treeControl);

        manifestService.manifest.subscribe(() => {
            this._dataSource.data = this.manifestService.getGroupedComponents();
            this._treeControl.expandAll();
        });
    }

    _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;
}
