import { NgModule } from '@angular/core';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { BadgeVibrantExampleComponent } from './badge-vibrant/badge-vibrant-example';
import { BadgeExampleComponent } from './badge/badge-example';

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
