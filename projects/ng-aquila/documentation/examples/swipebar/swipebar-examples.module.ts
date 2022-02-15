import { NgModule } from '@angular/core';
import { SwipebarExampleComponent } from './swipebar/swipebar-example';
import { NxSwipebarModule } from '@aposin/ng-aquila/swipebar';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';

const EXAMPLES = [SwipebarExampleComponent];

@NgModule({
    imports: [NxSwipebarModule, NxCopytextModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SwipebarExamplesModule {
    static components() {
        return {
            swipebar: SwipebarExampleComponent,
        };
    }
}
