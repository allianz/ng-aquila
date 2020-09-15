import { Observable ,  Subject } from 'rxjs';
import { NgModule } from '@angular/core';

/** @docs-private */
export abstract class NxDateAdapter<D> {
  protected locale = 'de-DE';
  protected _localeChanges = new Subject<string>();
  abstract toIso8601(date: D): string;
  abstract format(date: D, displayFormat: any): string;
  abstract parse(value: any, format: string|string[], strict: boolean): D | null;
  abstract isValid(date: D): boolean;
  abstract clone(date: D): D;
  abstract isDateInstance(obj: any): boolean;
  abstract invalid(): D;

  abstract getYear(date: D): number;
  abstract getMonth(date: D): number;
  abstract getDate(date: D): number;

  get localeChanges(): Observable<string> { return this._localeChanges; }

  deserialize(value: any): D | null {
    if (value == null || this.isDateInstance(value) && this.isValid(value)) {
      return value;
    }
    return this.invalid();
  }

  sameDate(first: D | null, second: D | null): boolean {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);

      if (firstValid && secondValid) {
        return !this.compareDate(first, second);
      }
      return firstValid === secondValid;
    }
    return first === second;
  }

  compareDate(first: D, second: D): number {
    return this.getYear(first) - this.getYear(second) ||
        this.getMonth(first) - this.getMonth(second) ||
        this.getDate(first) - this.getDate(second);
  }

  setLocale(locale: string) {
    this.locale = locale;
    this._localeChanges.next(this.locale);
  }

  getLocale(): string {
    return this.locale;
  }

  abstract getYearName(date: D): string;
  abstract createDate(year: number, month: number, date: number): D;
  abstract getNumDaysInMonth(date: D): number;
  abstract getDateNames(): string[];
  abstract getDayOfWeek(date: D): number;
  abstract getFirstDayOfWeek(): number;
  abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
  abstract today(): D;
  abstract addCalendarMonths(date: D, months: number): D;
  abstract addCalendarYears(date: D, years: number): D;
  abstract addCalendarDays(date: D, days: number): D;
  abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

  clampDate(date: D, min?: D | null, max?: D | null): D {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }
}
