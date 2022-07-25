import { Component } from '@angular/core';

import { ComponentService } from '../../../service/component.service';

@Component({
    selector: 'nxv-component-examples',
    templateUrl: 'component-examples.html',
})
export class ComponentExamples {
    constructor(readonly componentService: ComponentService) {}
}
