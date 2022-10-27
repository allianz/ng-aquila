import { NgModule } from '@angular/core';
import { NxIconModule, NxIconRegistry } from '@aposin/ng-aquila/icon';

import { ICON_MAPPINGS } from './icon-list';

@NgModule({
    imports: [NxIconModule],
    exports: [],
    providers: [],
})
export class NxDocumentationIconModule {
    constructor(private readonly _iconRegistry: NxIconRegistry) {
        this._iconRegistry.registerFont('far', 'far', 'fa-');
        this._iconRegistry.registerFont('fas', 'fas', 'fa-');
        this._iconRegistry.registerFont('fab', 'fab', 'fa-');
        this._iconRegistry.setDefaultFont('far');

        Object.entries(ICON_MAPPINGS).forEach(([iconName, { alias, font }]) => this._iconRegistry.addFontIcon(iconName, alias, font));
    }
}
