import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxImageModule } from '@allianz/ng-aquila/image';
import { NgModule } from '@angular/core';

import { ImageAttributeExampleComponent } from './image-attribute/image-attribute-example';
import { ImageDefaultExampleComponent } from './image-default/image-default-example';
import { ImageFixedRatiosExampleComponent } from './image-fixed-ratios/image-fixed-ratios-example';
import { ImageRoundedExampleComponent } from './image-rounded/image-rounded-example';

const EXAMPLES = [
    ImageAttributeExampleComponent,
    ImageDefaultExampleComponent,
    ImageFixedRatiosExampleComponent,
    ImageRoundedExampleComponent,
];

@NgModule({
    imports: [NxImageModule, NxGridModule, NxCopytextModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ImageExamplesModule {
    static components() {
        return {
            'image-attribute': ImageAttributeExampleComponent,
            'image-default': ImageDefaultExampleComponent,
            'image-fixed-ratios': ImageFixedRatiosExampleComponent,
            'image-rounded': ImageRoundedExampleComponent,
        };
    }
}
