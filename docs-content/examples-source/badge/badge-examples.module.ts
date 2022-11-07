import { NgModule } from '@angular/core';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';

import { BadgeExampleComponent } from './badge/badge-example';
import { BadgeVibrantExampleComponent } from './badge-vibrant/badge-vibrant-example';

const EXAMPLES = [BadgeExampleComponent, BadgeVibrantExampleComponent];

@NgModule({
    imports: [NxBadgeModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class BadgeExamplesModule {
    static components() {
        return {
            badge: BadgeExampleComponent,
            'badge-vibrant': BadgeVibrantExampleComponent,
        };
    }
}
