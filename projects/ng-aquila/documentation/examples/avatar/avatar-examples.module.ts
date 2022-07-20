import { NgModule } from '@angular/core';
import { NxAvatarModule } from '@aposin/ng-aquila/avatar';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxImageModule } from '@aposin/ng-aquila/image';

import { AvatarExampleComponent } from './avatar/avatar-example';
import { AvatarButtonExampleComponent } from './avatar-button/avatar-button-example';
import { AvatarColorsExampleComponent } from './avatar-colors/avatar-colors-example';
import { AvatarSizeExampleComponent } from './avatar-size/avatar-size-example';

const EXAMPLES = [
    AvatarExampleComponent,
    AvatarButtonExampleComponent,
    AvatarSizeExampleComponent,
    AvatarColorsExampleComponent,
];

@NgModule({
    imports: [NxAvatarModule, NxIconModule, NxImageModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class AvatarExamplesModule {
    static components() {
        return {
            avatar: AvatarExampleComponent,
            'avatar-button': AvatarButtonExampleComponent,
            'avatar-size': AvatarSizeExampleComponent,
            'avatar-colors': AvatarColorsExampleComponent,
        };
    }
}
