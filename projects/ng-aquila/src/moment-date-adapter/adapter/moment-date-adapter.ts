import { NX_DATE_LOCALE, NxDateAdapter } from '@allianz/ng-aquila/datefield';
import { Inject, Optional } from '@angular/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// https://github.com/angular/components/blob/master/src/material-moment-adapter/adapter/moment-date-adapter.ts
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

/** @docs-private */
export class NxMomentDateAdapter extends NxDateAdapter<Moment> {
  private _localeData!: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  };

  constructor(@Optional() @Inject(NX_DATE_LOCALE) dateLocale: string | null) {
    super();
    this.setLocale(dateLocale || moment.locale());
  }

  setLocale(locale: string) {
    super.setLocale(locale);

    const momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  toIso8601(date: Moment): string {
    return this.clone(date).format();
  }

  parse(value: any, format: string | string[], strict: boolean): Moment | null {
    if (value && typeof value === 'string') {
      return moment.utc(value, format, this.locale, strict);
    }
    return value ? moment.utc(value).locale(this.locale) : null;
  }

  format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  isValid(date: Moment): boolean {
    return this.clone(date).isValid();
  }

  clone(date: Moment): Moment {
    return date.clone().locale(this.locale);
  }

  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  getYear(date: Moment): number {
    return this.clone(date).year();
  }

  getMonth(date: Moment): number {
    return this.clone(date).month();
  }

  getDate(date: Moment): number {
    return this.clone(date).date();
  }

  deserialize(value: any): Moment | null {
    let date;
    if (value instanceof Date) {
      date = moment.utc({
        year: value.getFullYear(),
        month: value.getMonth(),
        date: value.getDate(),
      });
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = moment.utc(value, moment.ISO_8601).locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }

  invalid(): Moment {
    return moment.invalid();
  }

  getYearName(date: Moment): string {
    return this.clone(date).format('YYYY');
  }

  createDate(year: number, month: number, date: number): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = moment.utc({ year, month, date }).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  getNumDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
    return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  today(): Moment {
    return moment().utc(true).locale(this.locale);
  }

  addCalendarMonths(date: Moment, months: number): Moment {
    return this.clone(date).add({ months });
  }

  addCalendarDays(date: Moment, days: number): Moment {
    return this.clone(date).add({ days });
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style === 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  addCalendarYears(date: Moment, years: number): Moment {
    return this.clone(date).add({ years });
  }
}
