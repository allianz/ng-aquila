import { Observable, Subject } from 'rxjs';

/** Base class for all adapter implementations */
export abstract class NxDateAdapter<D> {
    protected locale = 'de-DE';
    protected readonly _localeChanges = new Subject<string>();

    /**
     * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
     * This method is used to generate date strings that are compatible with native HTML attributes
     * such as the `min` or `max` attribute of an `<input>`.
     * @param date The date to get the ISO date string for.
     * @returns The ISO date string date string.
     */
    abstract toIso8601(date: D): string;

    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    abstract format(date: D, displayFormat: any): string;

    /**
     * Parses a date from a user-provided value.
     * @param value The value to parse.
     * @param format The expected format of the value being parsed.
     * @param strict Whether strict parsing should be used (if supported).
     * @returns The parsed date.
     */
    abstract parse(value: any, format: string | string[], strict: boolean): D | null;

    /**
     * Checks whether the given date is valid.
     * @param date The date to check.
     * @returns True if the date is valid.
     */
    abstract isValid(date: D): boolean;

    /**
     * Clones the given date.
     * @param date The date to clone.
     * @returns A new date equal to the given date.
     */
    abstract clone(date: D): D;

    /**
     * Checks whether the given object is considered a date instance by this DateAdapter.
     * @param obj The object to check.
     * @returns True if the object is a date instance.
     */
    abstract isDateInstance(obj: any): boolean;

    /**
     * Checks whether the given date is valid.
     * @param date The date to check.
     * @returns True if the date is valid.
     */
    abstract invalid(): D;

    /**
     * Gets the year component of the given date.
     * @param date The date to extract the year from.
     * @returns The year component.
     */
    abstract getYear(date: D): number;

    /**
     * Gets the month component of the given date.
     * @param date The date to extract the month from.
     * @returns The month component (0-indexed, 0 = January).
     */
    abstract getMonth(date: D): number;

    /**
     * Gets the date of the month component of the given date.
     * @param date The date to extract the date of the month from.
     * @returns The month component (1-indexed, 1 = first of month).
     */
    abstract getDate(date: D): number;

    /** A stream that emits when the locale changes. */
    get localeChanges(): Observable<string> {
        return this._localeChanges;
    }

    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. an ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<nx-datefield>` will call this
     * method on all of its `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value: any): D | null {
        if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    }

    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns True if the two dates are equal. Null dates are considered equal to other null dates.
     */
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

    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier, a number greater than 0 if the first date is later.
     */
    compareDate(first: D, second: D): number {
        return this.getYear(first) - this.getYear(second) || this.getMonth(first) - this.getMonth(second) || this.getDate(first) - this.getDate(second);
    }

    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale: string) {
        this.locale = locale;
        this._localeChanges.next(this.locale);
    }

    /** Returns the current set locale of the adapter. */
    getLocale(): string {
        return this.locale;
    }

    /**
     * Gets the name for the year of the given date.
     * @param date The date to get the year name for.
     * @returns The name of the given year (e.g. '2017').
     */
    abstract getYearName(date: D): string;

    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @param year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param date The date of month of the date. Must be an integer 1 - length of the given month.
     * @returns The new date, or null if invalid.
     */
    abstract createDate(year: number, month: number, date: number): D;

    /**
     * Gets the number of days in the month of the given date.
     * @param date The date whose month should be checked.
     * @returns The number of days in the month of the given date.
     */
    abstract getNumDaysInMonth(date: D): number;

    /**
     * Gets a list of names for the dates of the month.
     * @returns An ordered list of all date of the month names, starting with '1'.
     */
    abstract getDateNames(): string[];

    /**
     * Gets the day of the week component of the given date.
     * @param date The date to extract the day of the week from.
     * @returns The month component (0-indexed, 0 = Sunday).
     */
    abstract getDayOfWeek(date: D): number;

    /**
     * Gets the first day of the week.
     * @returns The first day of the week (0-indexed, 0 = Sunday).
     */
    abstract getFirstDayOfWeek(): number;

    /**
     * Gets a list of names for the months.
     * @param style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @returns An ordered list of all month names, starting with January.
     */
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Gets today's date.
     * @returns Today's date.
     */
    abstract today(): D;

    /**
     * Adds the given number of months to the date.
     * @param date The date to add months to.
     * @param months The number of months to add (may be negative).
     * @returns A new date equal to the given one with the specified number of months added.
     */
    abstract addCalendarMonths(date: D, months: number): D;

    /**
     * Adds the given number of years to the date.
     * @param date The date to add years to.
     * @param years The number of years to add (may be negative).
     * @returns A new date equal to the given one with the specified number of years added.
     */
    abstract addCalendarYears(date: D, years: number): D;

    /**
     * Adds the given number of days to the date.
     * @param date The date to add days to.
     * @param days The number of days to add (may be negative).
     * @returns A new date equal to the given one with the specified number of days added.
     */
    abstract addCalendarDays(date: D, days: number): D;

    /**
     * Gets a list of names for the days of the week.
     * @param style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @returns An ordered list of all weekday names, starting with Sunday.
     */
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     * otherwise `date`.
     */
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
