import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverIntl,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
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
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverI18nExampleComponent {}
