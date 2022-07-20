import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { IconEssentialIconsExampleComponent } from './icon-essential-icons/icon-essential-icons-example';
import { IconEssentialOverrideExampleComponent } from './icon-essential-override/icon-essential-override-example';
import { IconFilledExampleComponent } from './icon-filled/icon-filled-example';
import { IconGeneralExampleComponent } from './icon-general/icon-general-example';
import { IconOutlineExampleComponent } from './icon-outline/icon-outline-example';
import { IconRegistryExampleComponent } from './icon-registry/icon-registry-example';
import { IconSizesExampleComponent } from './icon-sizes/icon-sizes-example';

const EXAMPLES = [
    IconEssentialIconsExampleComponent,
    IconEssentialOverrideExampleComponent,
    IconFilledExampleComponent,
    IconGeneralExampleComponent,
    IconOutlineExampleComponent,
    IconRegistryExampleComponent,
    IconSizesExampleComponent,
];

@NgModule({
    imports: [NxIconModule, CommonModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class IconExamplesModule {
    static components() {
        return {
            'icon-essential-icons': IconEssentialIconsExampleComponent,
            'icon-essential-override': IconEssentialOverrideExampleComponent,
            'icon-filled': IconFilledExampleComponent,
            'icon-general': IconGeneralExampleComponent,
            'icon-outline': IconOutlineExampleComponent,
            'icon-registry': IconRegistryExampleComponent,
            'icon-sizes': IconSizesExampleComponent,
        };
    }
}
