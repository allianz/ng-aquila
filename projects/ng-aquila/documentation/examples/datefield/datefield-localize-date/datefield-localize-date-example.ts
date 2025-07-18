import 'moment/locale/de';
import 'moment/locale/ja';
import 'moment/locale/ar';

import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NX_DATE_LOCALE,
  NxDateAdapter,
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Localizing date example
 */
@Component({
  selector: 'datefield-localize-date-example',
  templateUrl: './datefield-localize-date-example.html',
  styleUrls: ['./datefield-localize-date-example.css'],
  imports: [
    NxMessageComponent,
    FormsModule,
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldLocalizeDateExampleComponent
  implements OnInit, OnDestroy
{
  currentDate: Moment | null = null;
  currentLocale = this.nxDateLocale;

  private readonly _destroyed = new Subject<void>();

  constructor(
    readonly nxDateAdapter: NxDateAdapter<Moment>,
    @Inject(NX_DATE_LOCALE) readonly nxDateLocale: string,
  ) {}

  ngOnInit(): void {
    this.nxDateAdapter.localeChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((locale) => {
        this.currentLocale = locale;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  changeLocal(value: string) {
    this.nxDateAdapter.setLocale(value);
  }
}
