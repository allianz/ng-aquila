import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NX_DATE_LOCALE_PROVIDER } from './adapter/index';
import { NxDatefieldDirective } from './datefield.directive';
import { NxCalendarComponent } from './datepicker/calendar';
import { NxCalendarBodyComponent } from './datepicker/calendar-body';
import { NxDatepickerComponent, NxDatepickerContentComponent } from './datepicker/datepicker.component';
import { NxDatepickerToggleComponent, NxDatepickerToggleIconComponent } from './datepicker/datepicker-toggle';
import { NxMonthViewComponent } from './datepicker/month-view';
import { NxMultiYearViewComponent } from './datepicker/multi-year-view';
import { NxYearViewComponent } from './datepicker/year-view';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        A11yModule,
        NxIconModule,
        NxDatefieldDirective,
        NxDatepickerComponent,
        NxDatepickerToggleIconComponent,
        NxDatepickerToggleComponent,
        NxDatepickerContentComponent,
        NxCalendarComponent,
        NxCalendarBodyComponent,
        NxMonthViewComponent,
        NxMultiYearViewComponent,
        NxYearViewComponent,
    ],
    providers: [
        // Provide our NX_DATE_LOCALE to determine the current language
        NX_DATE_LOCALE_PROVIDER,
    ],
    exports: [
        NxDatefieldDirective,
        NxDatepickerComponent,
        NxDatepickerToggleIconComponent,
        NxDatepickerToggleComponent,
        NxCalendarComponent,
        NxCalendarBodyComponent,
        NxMonthViewComponent,
        NxMultiYearViewComponent,
        NxYearViewComponent,
    ],
})
export class NxDatefieldModule {}
