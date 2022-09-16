import { NxPopoverIntl } from '@allianz/ng-aquila/popover';
import { Component, Injectable } from '@angular/core';

@Injectable()
export class MyPopoverIntl extends NxPopoverIntl {
    closeIconLabel = 'Schließen';
}

/** @title Popover Internationalization */
@Component({
    selector: 'popover-i18n-example',
    templateUrl: 'popover-i18n-example.html',
    styleUrls: ['popover-i18n-example.css'],
    providers: [
        {
            provide: NxPopoverIntl,
            useClass: MyPopoverIntl,
        },
    ],
})
export class PopoverI18nExampleComponent {}
