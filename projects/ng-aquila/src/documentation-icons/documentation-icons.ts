import { ICON_MAPPINGS } from './icon-list';

import { NxIconModule, NxIconRegistry } from '@aposin/ng-aquila/icon';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [NxIconModule],
    exports: [],
    providers: [],
})
export class NxDocumentationIconModule {
    constructor(private _iconRegistry: NxIconRegistry) {
        this._iconRegistry.registerFont('far', 'far', 'fa-');
        this._iconRegistry.registerFont('fas', 'fas', 'fa-');
        this._iconRegistry.registerFont('fab', 'fab', 'fa-');
        this._iconRegistry.setDefaultFont('far');

        Object.keys(ICON_MAPPINGS).forEach(iconName => this._iconRegistry.addFontIcon(iconName, ICON_MAPPINGS[iconName].alias, ICON_MAPPINGS[iconName].font));
    }
}
