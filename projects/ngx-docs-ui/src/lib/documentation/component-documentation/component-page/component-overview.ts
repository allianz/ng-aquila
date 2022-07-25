import { Component } from '@angular/core';

import { ComponentDescriptor } from '../../../core/manifest';
import { ComponentService } from '../../../service/component.service';

@Component({
    selector: 'nxv-component-overview',
    templateUrl: 'component-overview.html',
    styleUrls: ['component-overview.scss'],
})
export class ComponentOverview {
    componentDescriptor!: ComponentDescriptor;

    constructor(readonly componentService: ComponentService) {}
}
