import { Inject, Optional } from '@angular/core';
import { NX_DATE_LOCALE, NxDateAdapter } from '@aposin/ng-aquila/datefield';
import { pad } from '@aposin/ng-aquila/utils';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

import { convertToDayjsLocale, getDayjsLocaleData } from './dayjs-locale-utils';

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);

const ISO_STRING_FORMAT = 'YYYY-MM-DD';
const ISO_REGEX = /^(\d{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12]\d)$/;

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}

/** @docs-private */
export class NxIsoDateAdapter extends NxDateAdapter<string> {
    private _localeData!: {
        firstDayOfWeek: number;
        longMonths: string[];
        shortMonths: string[];
        dates: string[];
        longDaysOfWeek: string[];
        shortDaysOfWeek: string[];
        narrowDaysOfWeek: string[];
    };

    private _dayjsLocale!: string;

    constructor(@Optional() @Inject(NX_DATE_LOCALE) dateLocale: string | null) {
        super();
        this.setLocale(dateLocale || dayjs.locale());
    }

    toIso8601(date: string): string {
        return dayjs.utc(date).format();
    }

    deserialize(value: any): string | null {
        let date;

        // TODO should we accept that or only take strings?
        if (value instanceof Date) {
            date = dayjs(value).locale(this._dayjsLocale);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = dayjs(value).locale(this._dayjsLocale);
        }

        if (date && this.isValid(date.toString())) {
            return dayjs(date).locale(this._dayjsLocale).format(ISO_STRING_FORMAT);
        }

        return super.deserialize(value);
    }

    format(date: string, displayFormat: any): string {
        return this._createDayjs(date).format(displayFormat);
    }

    /**
     * If the given formats include a localized format we have to map
     * it manually to a dayjs format as dayjs recognizes locale
     * format only for formatting not for parsing
     * see https://github.com/iamkun/dayjs/issues/694#issuecomment-543209946.
     */
    normalizeFormat(format: string | string[]): string[] {
        let availableLocalFormats: { [key: string]: any } = dayjs.Ls[this._dayjsLocale]?.formats;
        if (!availableLocalFormats) {
            availableLocalFormats = dayjs.Ls[dayjs.locale()]?.formats;
            console.warn(
                `NxIsoDateAdapter: The used locale "${this._dayjsLocale}" is not available in this day.js instance. Please make sure the locale is imported.`,
            );
        }
        let normalizedFormat = format;

        if (!Array.isArray(normalizedFormat)) {
            normalizedFormat = [normalizedFormat];
        }

        normalizedFormat = normalizedFormat.map(formatString => {
            if (Object.keys(availableLocalFormats).includes(formatString)) {
                return availableLocalFormats[formatString];
            }

            return formatString;
        });

        return normalizedFormat;
    }

    parse(value: any, format: string | string[], strict: boolean): string {
        let obj!: Dayjs;

        const normalizedFormats = this.normalizeFormat(format);
        if (value && typeof value === 'string') {
            if (strict) {
                obj = dayjs(value, normalizedFormats, this._dayjsLocale, true);
            } else {
                // The non strict parsing of day.js is rather strict when it comes to separators.
                // For example, this format: YYYY-MM-DD still requires the user to type in the -
                // To get a little closer to the behavior of momentjs, the following code extends
                // the list of given formats with versions were all the separators were removed
                const formatsWithoutSeparators = [...normalizedFormats].map(normalizedformat => normalizedformat.replace(/\W/g, ''));
                obj = dayjs(value, [...formatsWithoutSeparators, ...normalizedFormats], this._dayjsLocale, false);
            }
        }

        if (!obj?.isValid()) {
            return '';
        }

        return obj ? obj.format(ISO_STRING_FORMAT) : '';
    }

    isValid(date: string): boolean {
        return dayjs(date).isValid();
    }

    clone(date: string): string {
        return date;
    }

    isDateInstance(obj: any): boolean {
        return obj === '' || (typeof obj === 'string' && ISO_REGEX.test(obj));
    }

    invalid(): string {
        return '';
    }

    getYear(date: string): number {
        return this._createDayjs(date).year();
    }

    getMonth(date: string): number {
        return this._createDayjs(date).month();
    }

    getDate(date: string): number {
        return this._createDayjs(date).date();
    }

    getYearName(date: string): string {
        return this._createDayjs(date).format('YYYY');
    }

    createDate(year: number, month: number, date: number): string {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }

        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        // dayjs adds overflows up instead of creating invalid dates so we have to check that here
        const obj = this._createDayjs(this._createString(year, month + 1, date));
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (obj.month() !== month || obj.year() !== year) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return obj.format(ISO_STRING_FORMAT);
    }

    getNumDaysInMonth(date: string): number {
        return this._createDayjs(date).daysInMonth();
    }

    getDateNames(): string[] {
        return this._localeData.dates;
    }

    getDayOfWeek(date: string): number {
        return this._createDayjs(date).day();
    }

    getFirstDayOfWeek(): number {
        return this._localeData.firstDayOfWeek;
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
    }

    today(): string {
        return dayjs().format(ISO_STRING_FORMAT);
    }

    addCalendarMonths(date: string, months: number): string {
        return this._createDayjs(date).add(months, 'M').format(ISO_STRING_FORMAT);
    }

    addCalendarYears(date: string, years: number): string {
        return this._createDayjs(date).add(years, 'y').format(ISO_STRING_FORMAT);
    }

    addCalendarDays(date: string, days: number): string {
        return this._createDayjs(date).add(days, 'd').format(ISO_STRING_FORMAT);
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

    async setLocale(locale: string) {
        this._dayjsLocale = convertToDayjsLocale(locale);
        const data = await getDayjsLocaleData(this._dayjsLocale);

        this._localeData = {
            firstDayOfWeek: data.firstDayOfWeek(),
            longMonths: data.months(),
            shortMonths: data.monthsShort(),
            dates: range(31, i => this._createDayjs(this.createDate(2017, 0, i + 1)).format('D')),
            longDaysOfWeek: data.weekdays(),
            shortDaysOfWeek: data.weekdaysShort(),
            narrowDaysOfWeek: data.weekdaysMin(),
        };

        super.setLocale(locale);
    }

    private _createDayjs(value: string) {
        return dayjs.utc(value).locale(this._dayjsLocale);
    }

    private _createString(year: number, month: number, date: number) {
        return `${year}-${pad(month.toString())}-${pad(date.toString())}`;
    }
}
