import { Directive, inject } from '@angular/core';

import { NxCardComponent } from './card.component';

@Directive({
    selector: '[nxCardMainLink]',
    exportAs: 'nxCardMainLink',
    host: {
        '[class.nx-card-main-link]': 'true',
        role: 'link',
        '[attr.aria-disabled]': 'card.disabled || null',
    },
    standalone: true,
})
export class NxCardMainLinkDirective {
    private readonly card = inject(NxCardComponent);
}

@Directive({
    selector: '[nxCardSecondaryInfo]',
    exportAs: 'nxCardSecondaryInfo',
    host: {
        '[class.nx-card-secondary-info]': 'true',
    },
    standalone: true,
})
export class NxCardSecondaryInfoDirective {}
