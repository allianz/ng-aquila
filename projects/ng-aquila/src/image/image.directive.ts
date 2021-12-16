import { Directive } from '@angular/core';

@Directive({
    selector: 'img[nxImg]',
})
export class NxImageDirective {
    constructor() {
        console.warn(
            'Directive nxImg which was used together with nxFigure ' +
                'is now deprecated and not required anymore. Please remove it from your ' +
                'tag. Check the documentation for more details.',
        );
    }
}
