import { Component, Input } from '@angular/core';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';

import { STATUS_TYPE } from '../../../core/manifest';

@Component({
    selector: 'nxv-status-dot',
    template: `<nx-icon name="{{ iconName }}" attr.alt="{{ message }}" size="s"></nx-icon>`,
    styleUrls: ['./status-dot.component.scss'],
    host: {
        '[class.checkmark]': 'iconName === "check"',
    },
})
export class NxvStatusDotComponent {
    message = 'Not applicable';
    iconName = '';

    constructor(readonly iconRegistry: NxIconRegistry) {
        this.iconRegistry.registerFont('fa', 'fas', 'fa-');
        this.iconRegistry.addFontIcon('docs-progress', 'hourglass-half', 'fa');
        this.iconRegistry.addFontIcon('docs-not-applicable', 'minus', 'fa');
    }

    @Input() set status(value: STATUS_TYPE) {
        if (value === 'done') {
            this.message = 'Done';
            this.iconName = 'check';
        } else if (value === 'progress') {
            this.message = 'In progress';
            this.iconName = 'docs-progress';
        } else {
            this.message = 'n/a';
            this.iconName = 'docs-not-applicable';
        }
    }
}
